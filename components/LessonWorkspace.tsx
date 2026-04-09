"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Lesson } from "@/data/lessons";
import { getNextLessonIdForCourse } from "@/data/lessons";
import { notifyProgressUpdated, saveLessonCompletion } from "@/lib/lessonProgress";
import { simulateKotlinPrintlnOutput } from "@/lib/simulateKotlinOutput";
import { ThemedSyntaxBlock } from "@/components/ThemedSyntaxBlock";

type Props = {
  lesson: Lesson;
  moduleTitle: string;
  courseId: string;
};

export function LessonWorkspace({ lesson, moduleTitle, courseId }: Props) {
  const [code, setCode] = useState(lesson.starterCode);
  const [showHint, setShowHint] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [hasRun, setHasRun] = useState(false);

  const markedRef = useRef(false);

  useEffect(() => {
    setCode(lesson.starterCode);
    setShowHint(false);
    setOutput(null);
    setHasRun(false);
    markedRef.current = false;
  }, [lesson.id, lesson.starterCode]);

  const success = useMemo(() => {
    if (!hasRun || output === null) return false;
    const trimmed = output.trim();
    if (lesson.outputValidation === "nonempty") return trimmed.length > 0;
    if (lesson.outputValidation === "contains") {
      const needle = lesson.expectedOutput.trim();
      return needle.length > 0 && trimmed.includes(needle);
    }
    const exp = lesson.expectedOutput.trim();
    return exp.length > 0 && trimmed === exp;
  }, [hasRun, output, lesson.expectedOutput, lesson.outputValidation]);

  useEffect(() => {
    if (!success || markedRef.current) return;
    markedRef.current = true;
    void saveLessonCompletion(courseId, lesson.id).then((ok) => {
      if (ok) notifyProgressUpdated();
    });
  }, [success, courseId, lesson.id]);

  const nextId = useMemo(() => getNextLessonIdForCourse(courseId, lesson.id), [courseId, lesson.id]);

  function handleRun() {
    const out = simulateKotlinPrintlnOutput(code);
    setOutput(out);
    setHasRun(true);
  }

  const hasHint = lesson.hint.trim().length > 0;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] transition-colors duration-300">
      <div className="mx-auto flex max-w-[1600px] flex-col lg:h-[calc(100vh-4rem)] lg:flex-row">
        {/* LEFT — назария */}
        <div className="flex flex-col border-b border-theme-medium lg:w-1/2 lg:max-h-none lg:border-b-0 lg:border-r lg:overflow-y-auto lg:pr-2">
          <div className="px-4 pb-6 pt-6 sm:px-6 lg:px-8 lg:pt-8">
            <Link
              href={`/courses/${courseId}/lessons`}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground-secondary transition-colors duration-300 hover:text-cyan"
            >
              <span aria-hidden>←</span>
              Дарсҳо
            </Link>
            <p className="mt-6 font-mono text-xs font-medium uppercase tracking-wider text-cyan">{moduleTitle}</p>
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
                    <a
                      href={href}
                      className="text-cyan underline decoration-cyan/40 underline-offset-2 hover:decoration-cyan"
                    >
                      {children}
                    </a>
                  ),
                  ul: ({ children }) => <ul className="my-4 list-disc space-y-1 pl-5 marker:text-cyan">{children}</ul>,
                  ol: ({ children }) => (
                    <ol className="my-4 list-decimal space-y-1 pl-5 marker:text-cyan">{children}</ol>
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
                      <code className="rounded-md bg-cyan/20 px-1.5 py-0.5 font-mono text-[0.9em] text-cyan">
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

        {/* RIGHT — вазифа ва редактор */}
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
                onClick={handleRun}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-cyan/80 px-5 py-2 text-sm font-bold text-white shadow-md transition-opacity duration-300 hover:opacity-90"
                style={{ boxShadow: "0 4px 14px var(--shadow-cyan)" }}
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

            <div className="flex min-h-0 flex-1 flex-col gap-2">
              <label htmlFor="lesson-code" className="sr-only">
                Коди Kotlin
              </label>
              <textarea
                id="lesson-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="code-editor-textarea min-h-[200px] w-full flex-1 resize-y rounded-xl border border-theme-medium px-4 py-3 font-mono text-sm leading-relaxed shadow-inner outline-none ring-cyan/30 focus:border-cyan/40 focus:ring-2 lg:min-h-[220px]"
              />
            </div>

            {hasRun && (
              <section className="shrink-0 rounded-xl border border-theme-medium bg-background/80 p-4 transition-colors duration-300">
                <p className="font-mono text-xs font-medium uppercase tracking-wider text-foreground-muted">Хуруҷ</p>
                <pre className="mt-2 whitespace-pre-wrap font-mono text-sm text-foreground-secondary">
                  {output === "" ? (
                    <span className="text-foreground-muted">(холӣ — ягон println() ёфт нашуд)</span>
                  ) : (
                    output
                  )}
                </pre>
              </section>
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
                {nextId && (
                  <Link
                    href={`/courses/${courseId}/lessons/${nextId}`}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ring-1 transition-colors duration-300"
                    style={{
                      backgroundColor: "var(--success-link-bg)",
                      color: "var(--success-link-text)",
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
