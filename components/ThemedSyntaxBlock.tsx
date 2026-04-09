"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "@/lib/useTheme";

type Props = {
  language: string;
  text: string;
};

export function ThemedSyntaxBlock({ language, text }: Props) {
  const theme = useTheme();
  const isLight = theme === "light";

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-theme-medium shadow-lg transition-[border-color] duration-300">
      <SyntaxHighlighter
        language={language}
        style={isLight ? oneLight : oneDark}
        customStyle={{
          margin: 0,
          padding: "1rem 1.25rem",
          background: isLight ? "#F0EDE8" : "#0d1117",
          fontSize: "0.875rem",
          lineHeight: 1.6,
          ...(isLight ? { color: "#1E293B" } : {}),
        }}
        codeTagProps={{
          className: "font-mono",
        }}
      >
        {text}
      </SyntaxHighlighter>
    </div>
  );
}
