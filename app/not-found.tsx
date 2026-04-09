import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center transition-colors duration-300">
      <h1 className="text-2xl font-bold text-foreground">404</h1>
      <p className="mt-2 text-foreground-secondary">Саҳифа ёфт нашуд.</p>
      <Link href="/" className="mt-6 text-cyan underline transition-colors duration-300 hover:no-underline">
        Саҳифаи асосӣ
      </Link>
    </main>
  );
}
