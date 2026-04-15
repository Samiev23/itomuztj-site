import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 bg-grid-pattern bg-grid opacity-30" aria-hidden />
      <div className="relative mx-auto flex max-w-md flex-col items-center px-4 py-16 sm:px-6 sm:py-24">
        <Suspense
          fallback={
            <p className="text-center text-sm text-foreground-muted" aria-live="polite">
              Боргирӣ…
            </p>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
