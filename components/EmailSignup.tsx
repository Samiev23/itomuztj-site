"use client";

import { FormEvent, useState } from "react";

export function EmailSignup() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="rounded-xl border border-cyan/30 bg-cyan-dim px-6 py-4 text-center text-foreground-secondary transition-colors duration-300">
        Ташаккур! Шумо ба рӯйхати интизорӣ илова шудед. Мо ба зудӣ бо шумо тамос мегирем.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:items-stretch"
    >
      <label htmlFor="email-signup" className="sr-only">
        Почтаи электронӣ
      </label>
      <input
        id="email-signup"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="почта@мисол.tj"
        className="min-h-12 flex-1 rounded-xl border border-[rgb(var(--rgb-input-border))] bg-[rgb(var(--rgb-input-bg))] px-4 font-sans text-foreground placeholder:text-foreground-muted transition-colors duration-300 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
      />
      <button
        type="submit"
        className="min-h-12 shrink-0 rounded-xl bg-cyan px-8 font-semibold text-white shadow-md transition-colors duration-300 hover:bg-cyan-hover"
        style={{ boxShadow: "0 4px 14px var(--shadow-cyan)" }}
      >
        Обуна шавед
      </button>
    </form>
  );
}
