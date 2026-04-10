"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Lesson } from "@/data/lessons";
import { getNextLessonIdForCourse } from "@/data/lessons";
import { notifyProgressUpdated, saveLessonCompletion } from "@/lib/lessonProgress";
import { WEB_CAPSTONE_LESSON_ID } from "@/data/lessons";
import { evaluateWebLessonSuccess } from "@/lib/webLessonSuccess";
import { ThemedSyntaxBlock } from "@/components/ThemedSyntaxBlock";

const WEB_PREVIEW_CONSOLE_TYPE = "itomuz-web-console";

/** Wraps console in iframe and forwards lines to parent via postMessage */
function buildWebLessonPreviewSrcDoc(fragment: string): string {
  const hook = `<script>(function(){function fmt(a){return Array.prototype.slice.call(a).map(function(x){if(x===null)return"null";if(x===void 0)return"undefined";if(typeof x==="object")try{return JSON.stringify(x)}catch(e){return Object.prototype.toString.call(x)}return String(x)}).join(" ")}function post(lvl,args){try{window.parent.postMessage({type:"${WEB_PREVIEW_CONSOLE_TYPE}",level:lvl,message:fmt(args)},"*")}catch(e){}}var i,methods=["log","warn","error","info","debug"];for(i=0;i<methods.length;i++){(function(method){var orig=console[method];console[method]=function(){post(method,arguments);return orig.apply(console,arguments)}})(methods[i])}})();<\/script>`;
  return `<!DOCTYPE html><html lang="tg"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;background:#ffffff;}body{margin:12px;font-family:system-ui,sans-serif;}</style>${hook}</head><body>${fragment}</body></html>`;
}

type Props = {
  lesson: Lesson;
  moduleTitle: string;
  courseId: string;
};

type ConsoleLine = { id: string; level: string; message: string };

const accent = {
  link: "text-[#34d399] underline decoration-[#34d399]/40 underline-offset-2 hover:decoration-[#34d399]",
  mono: "text-[#34d399]",
  list: "marker:text-[#34d399]",
  btn: "from-[#34d399] to-[#34d399]/80 shadow-[#34d399]/20",
  ring: "ring-[#34d399]/30 focus:border-[#34d399]/40",
  back: "hover:text-[#34d399]",
};

export function WebLessonWorkspace({ lesson, moduleTitle, courseId }: Props) {
  const [code, setCode] = useState(lesson.starterCode);
  const [showHint, setShowHint] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [checkOk, setCheckOk] = useState(false);
  const [consoleLines, setConsoleLines] = useState<ConsoleLine[]>([]);
  const markedRef = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const previewSrcDoc = useMemo(() => buildWebLessonPreviewSrcDoc(code), [code]);

  useEffect(() => {
    setConsoleLines([]);
  }, [code, lesson.id]);

  useEffect(() => {
    function onMessage(ev: MessageEvent) {
      if (!ev.data || ev.data.type !== WEB_PREVIEW_CONSOLE_TYPE) return;
      if (iframeRef.current?.contentWindow !== ev.source) return;
      const level = typeof ev.data.level === "string" ? ev.data.level : "log";
      const message = typeof ev.data.message === "string" ? ev.data.message : String(ev.data.message ?? "");
      setConsoleLines((prev) =>
        [...prev, { id: `${Date.now()}-${prev.length}`, level, message }].slice(-200),
      );
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    setCode(lesson.starterCode);
    setShowHint(false);
    setHasChecked(false);
    setCheckOk(false);
    markedRef.current = false;
  }, [lesson.id, lesson.starterCode]);

  const success = hasChecked && checkOk;

  useEffect(() => {
    if (!success || markedRef.current) return;
    markedRef.current = true;
    void saveLessonCompletion(courseId, lesson.id).then((ok) => {
      if (ok) notifyProgressUpdated();
    });
  }, [success, courseId, lesson.id]);

  const nextId = useMemo(() => getNextLessonIdForCourse(courseId, lesson.id), [courseId, lesson.id]);

  function handleCheck() {
    setHasChecked(true);
    setCheckOk(evaluateWebLessonSuccess(lesson, code));
  }

  const hasHint = lesson.hint.trim().length > 0;
  const listBack = `/courses/${courseId}/lessons`;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] transition-colors duration-300">
      <div className="mx-auto flex max-w-[1600px] flex-col lg:h-[calc(100vh-4rem)] lg:flex-row">
        <div className="flex flex-col border-b border-theme-medium lg:w-1/2 lg:max-h-none lg:border-b-0 lg:border-r lg:overflow-y-auto lg:pr-2">
          <div className="px-4 pb-6 pt-6 sm:px-6 lg:px-8 lg:pt-8">
            <Link
              href={listBack}
              className={`inline-flex items-center gap-2 text-sm font-medium text-foreground-secondary transition-colors duration-300 ${accent.back}`}
            >
              <span aria-hidden>←</span>
              Дарсҳо
            </Link>
            <p className="mt-6 font-mono text-xs font-medium uppercase tracking-wider text-[#34d399]">
              {moduleTitle}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{lesson.title}</h1>

            <div className="lesson-theory mt-8 max-w-none text-foreground-secondary">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="mt-10 scroll-mt-20 text-xl font-bold text-foreground first:mt-0 sm:text-2xl">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-8 text-lg font-semibold text-foreground">{children}</h3>
                  ),
                  p: ({ children }) => <p className="my-4 leading-relaxed first:mt-0 last:mb-0">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                  a: ({ href, children }) => (
                    <a href={href} className={accent.link}>
                      {children}
                    </a>
                  ),
                  ul: ({ children }) => <ul className={`my-4 list-disc space-y-1 pl-5 ${accent.list}`}>{children}</ul>,
                  ol: ({ children }) => (
                    <ol className={`my-4 list-decimal space-y-1 pl-5 ${accent.list}`}>{children}</ol>
                  ),
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  table: ({ children }) => (
                    <div className="my-6 overflow-x-auto rounded-xl border border-theme-medium">
                      <table className="w-full border-collapse text-left text-sm">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => <thead className="bg-[var(--bg-glass-mid)]">{children}</thead>,
                  th: ({ children }) => (
                    <th className="border border-theme-medium px-3 py-2 font-semibold text-foreground">{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-theme-medium px-3 py-2 text-foreground-secondary">{children}</td>
                  ),
                  tr: ({ children }) => <tr>{children}</tr>,
                  tbody: ({ children }) => <tbody>{children}</tbody>,
                  code(props) {
                    const { children, className } = props;
                    const match = /language-(\w+)/.exec(className ?? "");
                    const text = String(children).replace(/\n$/, "");
                    if (match) {
                      return <ThemedSyntaxBlock language={match[1]} text={text} />;
                    }
                    return (
                      <code className={`rounded-md bg-[#34d399]/20 px-1.5 py-0.5 font-mono text-[0.9em] ${accent.mono}`}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => <>{children}</>,
                }}
              >
                {lesson.theory}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        <div className="flex min-h-[min(70vh,640px)] flex-1 flex-col border-t border-theme-medium bg-surface/50 lg:sticky lg:top-16 lg:max-h-[calc(100vh-4rem)] lg:min-h-0 lg:w-1/2 lg:self-start lg:border-l lg:border-t-0 lg:overflow-y-auto">
          <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6 lg:min-h-0">
            <section className="shrink-0 rounded-xl border border-theme-medium bg-background/60 p-4 transition-colors duration-300">
              <p className="flex items-center gap-2 text-sm font-bold text-[color:var(--warning-text)]">
                <span aria-hidden>📝</span>
                Вазифа
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{lesson.task}</p>
            </section>

            <div className="flex shrink-0 flex-wrap gap-2">
              {hasHint && (
                <button
                  type="button"
                  onClick={() => setShowHint((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors duration-300"
                  style={{
                    borderColor: "var(--warning-border)",
                    backgroundColor: "var(--warning-bg)",
                    color: "var(--warning-text)",
                  }}
                >
                  <span aria-hidden>💡</span>
                  Ишора
                </button>
              )}
              <button
                type="button"
                onClick={handleCheck}
                className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-5 py-2 text-sm font-bold text-white shadow-md transition-opacity duration-300 hover:opacity-90 ${accent.btn}`}
              >
                <span aria-hidden>▶</span>
                Иҷро
              </button>
            </div>

            {hasHint && showHint && (
              <div
                className="shrink-0 rounded-xl border px-4 py-3 text-sm leading-relaxed transition-colors duration-300"
                style={{
                  borderColor: "var(--warning-border)",
                  backgroundColor: "var(--warning-bg)",
                  color: "var(--warning-text)",
                }}
              >
                {lesson.hint}
              </div>
            )}

            <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-2 lg:gap-4">
              <div className="flex min-h-[180px] flex-col gap-2 lg:min-h-0">
                <label htmlFor="web-lesson-code" className="text-xs font-medium uppercase tracking-wider text-foreground-muted">
                  Код (HTML/CSS)
                </label>
                <textarea
                  id="web-lesson-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  className={`code-editor-textarea min-h-[200px] w-full flex-1 resize-y rounded-xl border border-theme-medium px-4 py-3 font-mono text-sm leading-relaxed shadow-inner outline-none focus:ring-2 lg:min-h-[280px] ${accent.ring}`}
                />
              </div>
              <div className="flex min-h-[200px] flex-col gap-2 lg:min-h-0">
                <p className="text-xs font-medium tracking-wider text-foreground-muted">
                  <span className="uppercase">Пешнамоиш</span>{" "}
                  <span className="normal-case tracking-normal">(Дар браузер)</span>
                </p>
                <div
                  className="flex min-h-[200px] flex-1 flex-col overflow-hidden rounded-xl border shadow-inner transition-[border-color,background-color] duration-300 lg:min-h-[280px]"
                  style={{
                    backgroundColor: "var(--preview-bg)",
                    borderColor: "var(--preview-border)",
                  }}
                >
                  <iframe
                    ref={iframeRef}
                    title="Пешнамоиши HTML дар браузер"
                    className="h-full min-h-[160px] w-full flex-1 lg:min-h-[220px]"
                    style={{ backgroundColor: "var(--preview-bg)" }}
                    sandbox="allow-scripts"
                    srcDoc={previewSrcDoc}
                  />
                  <div
                    className="shrink-0 border-t font-mono text-xs transition-[border-color,background-color] duration-300"
                    style={{
                      borderColor: "var(--preview-border)",
                      backgroundColor: "var(--bg-glass-mid)",
                      color: "var(--foreground-secondary)",
                      maxHeight: "min(200px, 28vh)",
                    }}
                  >
                    <p className="border-b px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-foreground-muted">
                      Консол (console.log, warn, error)
                    </p>
                    <div className="max-h-[min(168px,24vh)] overflow-y-auto px-3 py-2">
                      {consoleLines.length === 0 ? (
                        <p className="text-foreground-muted">Ҳоло паём нест — console.log дар код истифода баред.</p>
                      ) : (
                        <ul className="space-y-1">
                          {consoleLines.map((line) => (
                            <li
                              key={line.id}
                              className={
                                line.level === "error"
                                  ? "text-red-600 dark:text-red-400"
                                  : line.level === "warn"
                                    ? "text-amber-700 dark:text-amber-400"
                                    : "text-foreground-secondary"
                              }
                            >
                              <span className="opacity-60">[{line.level}]</span> {line.message}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {hasChecked && !checkOk && (
              <p className="shrink-0 text-sm text-[color:var(--warning-text)]">
                Ҳанӯз пурра нест — коди худро бо вазифа муқоиса кунед ё ишораро бингаред.
              </p>
            )}

            {success && (
              <div
                className="shrink-0 space-y-4 rounded-xl border p-4 transition-colors duration-300"
                style={{
                  borderColor: "var(--success-ring)",
                  backgroundColor: "var(--success-bg)",
                }}
              >
                <p className="font-semibold text-[color:var(--success-text)]">✅ Офарин! Дуруст аст!</p>
                {lesson.id === WEB_CAPSTONE_LESSON_ID ? (
                  <p className="text-sm leading-relaxed text-[color:var(--success-text)]">
                    🎓 Ин лоиҳаи ниҳоии курс аст — шумо <strong>гувоҳномаи Сайтсозӣ</strong>-ро гирифтед. Ба рӯйхати дарсҳо баргардед, то паёми пурраро бинед.
                  </p>
                ) : null}
                {nextId && (
                  <Link
                    href={`/courses/${courseId}/lessons/${nextId}`}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ring-1 transition-colors duration-300"
                    style={{
                      backgroundColor: "var(--success-link-bg)",
                      color: "var(--success-link-text)",
                      borderColor: "var(--success-ring)",
                      boxShadow: "inset 0 0 0 1px var(--success-ring)",
                    }}
                  >
                    Дарси оянда →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
