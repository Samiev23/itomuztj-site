"use client";

import { useMemo, useState } from "react";

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="tg">
<head>
  <meta charset="utf-8">
  <title>Мисол</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      padding: 1rem;
      margin: 0;
      background: #0f172a;
      color: #e2e8f0;
    }
    h1 { color: #22d3ee; font-size: 1.25rem; margin: 0 0 0.5rem; }
    p { margin: 0; line-height: 1.5; }
  </style>
</head>
<body>
  <h1>Хуш омадед ба ITomuz</h1>
  <p>Ин як саҳифаи HTML-и оддӣ аст — ҳаминро дар пешнамои зер мебинед.</p>
</body>
</html>`;

export function HeroHtmlPreview() {
  const [source, setSource] = useState(DEFAULT_HTML);

  const srcDoc = useMemo(() => source, [source]);

  return (
    <div className="mt-14 rounded-2xl border border-white/10 bg-surface/80 p-6 text-left shadow-2xl shadow-black/40 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-purple">Мисоли HTML</p>
        <p className="font-mono text-xs text-slate-500">Пешнамои зинда — кодро тағйир диҳед</p>
      </div>
      <textarea
        value={source}
        onChange={(e) => setSource(e.target.value)}
        spellCheck={false}
        className="mt-4 h-48 w-full resize-y rounded-xl border border-white/10 bg-background/80 p-4 font-mono text-xs leading-relaxed text-cyan focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/30 sm:text-sm"
        aria-label="Коди HTML барои пешнамо"
      />
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-slate-500">Пешнамо</p>
      <iframe
        title="Пешнамои HTML"
        sandbox="allow-scripts"
        srcDoc={srcDoc}
        className="mt-2 h-48 w-full rounded-xl border border-white/10 bg-white"
      />
    </div>
  );
}
