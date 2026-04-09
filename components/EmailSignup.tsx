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
      <p className="rounded-xl border border-cyan/30 bg-cyan-dim px-6 py-4 text-center text-slate-200">
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
        className="min-h-12 flex-1 rounded-xl border border-white/10 bg-surface-elevated px-4 font-sans text-slate-100 placeholder:text-slate-500 focus:border-cyan focus:ring-1 focus:ring-cyan"
      />
      <button
        type="submit"
        className="min-h-12 shrink-0 rounded-xl bg-cyan px-8 font-semibold text-background shadow-md shadow-cyan/25 transition hover:bg-cyan/90"
      >
        Обуна шавед
      </button>
    </form>
  );
}
