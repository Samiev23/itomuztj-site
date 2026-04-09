import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-white">404</h1>
      <p className="mt-2 text-slate-400">Саҳифа ёфт нашуд.</p>
      <Link href="/" className="mt-6 text-cyan underline hover:no-underline">
        Саҳифаи асосӣ
      </Link>
    </main>
  );
}
