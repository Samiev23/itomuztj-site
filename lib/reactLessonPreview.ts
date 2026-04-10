import { WEB_PREVIEW_CONSOLE_TYPE } from "@/lib/webPreviewConstants";

const REACT = "https://unpkg.com/react@18.3.1/umd/react.development.js";
const REACT_DOM = "https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js";
const BABEL = "https://unpkg.com/@babel/standalone@7.26.0/babel.min.js";
const REMIX_ROUTER = "https://unpkg.com/@remix-run/router@1.21.0/dist/router.umd.min.js";
const REACT_ROUTER = "https://unpkg.com/react-router@6.28.0/dist/umd/react-router.production.min.js";
const REACT_ROUTER_DOM = "https://unpkg.com/react-router-dom@6.28.0/dist/umd/react-router-dom.production.min.js";

function consoleHook(): string {
  const t = WEB_PREVIEW_CONSOLE_TYPE;
  return `<script>(function(){function fmt(a){return Array.prototype.slice.call(a).map(function(x){if(x===null)return"null";if(x===void 0)return"undefined";if(typeof x==="object")try{return JSON.stringify(x)}catch(e){return Object.prototype.toString.call(x)}return String(x)}).join(" ")}function post(lvl,args){try{window.parent.postMessage({type:"${t}",level:lvl,message:fmt(args)},"*")}catch(e){}}var i,methods=["log","warn","error","info","debug"];for(i=0;i<methods.length;i++){(function(method){var orig=console[method];console[method]=function(){post(method,arguments);return orig.apply(console,arguments)}})(methods[i])}})();<\/script>`;
}

function escapeEmbeddedScriptClose(s: string): string {
  return s.replace(/<\/script>/gi, "<\\/script>");
}

export type ReactLessonPreviewOptions = {
  /** React Router DOM + вобастагиҳо (барои дарси роутинг) */
  includeRouter?: boolean;
};

/**
 * Пешнамоиши React/JSX дар iframe: React + ReactDOM + Babel standalone.
 * Коди корбар бояд `function App()` муайян кунад.
 */
export function buildReactLessonPreviewSrcDoc(
  userCode: string,
  options: ReactLessonPreviewOptions = {},
): string {
  const safeUser = escapeEmbeddedScriptClose(userCode);
  const hook = consoleHook();

  const scripts: string[] = [
    `<script crossorigin src="${REACT}"></script>`,
    `<script crossorigin src="${REACT_DOM}"></script>`,
  ];
  if (options.includeRouter) {
    scripts.push(
      `<script src="${REMIX_ROUTER}"></script>`,
      `<script src="${REACT_ROUTER}"></script>`,
      `<script src="${REACT_ROUTER_DOM}"></script>`,
    );
  }
  scripts.push(`<script src="${BABEL}"></script>`);

  let prelude = `const { useState, useEffect, useMemo, useRef } = React;\n`;
  if (options.includeRouter) {
    prelude += `const { HashRouter, Routes, Route, Link, BrowserRouter, useNavigate, useParams } = ReactRouterDOM;\n`;
  }

  const mount = `
(function mountReactLessonPreview(){
  var el = document.getElementById("root");
  if (!el) return;
  if (typeof App === "undefined") {
    console.error("App нест — function App() бисозед");
    return;
  }
  var root = ReactDOM.createRoot(el);
  root.render(<App />);
})();`;

  const babelBlock = `${prelude}\n${safeUser}\n${mount}`;

  return `<!DOCTYPE html><html lang="tg"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><style>html,body{margin:0;background:#fafafa;}body{padding:12px;font-family:system-ui,sans-serif;}</style>${hook}${scripts.join(
    "\n",
  )}</head><body><div id="root"></div><script type="text/babel" data-presets="react">${escapeEmbeddedScriptClose(
    babelBlock,
  )}</script></body></html>`;
}
