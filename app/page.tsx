import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { CoursesGridClient } from "@/components/CoursesGridClient";
import { EmailSignup } from "@/components/EmailSignup";
import { HeroHtmlPreview } from "@/components/HeroHtmlPreview";

const directions = [
  { icon: "🌐", label: "Сайтсозӣ" },
  { icon: "📱", label: "Android" },
  { icon: "🎨", label: "Дизайн", soon: true },
  { icon: "🤖", label: "AI", soon: true },
  { icon: "🍎", label: "iOS", soon: true },
  { icon: "💾", label: "Backend", soon: true },
] as const;

const features = [
  {
    title: "Забони модарӣ",
    description:
      "Шарҳҳо, матн ва роҳнамо бо забони тоҷикӣ — бе монеаи забонӣ, аз аввал то касбӣ.",
    icon: "✦",
  },
  {
    title: "Аз сифр то лоиҳа",
    description:
      "Сайтсозӣ, мобилӣ ва дигар самтҳо — бо машқҳои амалӣ ва роҳи равшан.",
    icon: "▸",
  },
  {
    title: "Бепул оғоз кунед",
    description:
      "Курсҳои кушодаи Сайтсозӣ ва Kotlin & Android — бидуни пардохт омӯзишро оғоз намоед.",
    icon: "◇",
  },
  {
    title: "Пешрафт",
    description:
      "Рақами дарсҳо, прогресс ва кушодани марҳилаҳо — ҳамеша медонед, дар куҷо истодаед.",
    icon: "⌘",
  },
];

const roadmap = [
  {
    phase: "1",
    title: "Асосҳо",
    items: ["HTML/CSS", "Kotlin асос", "Git", "Фикри барномасоз"],
  },
  {
    phase: "2",
    title: "Қувваи амалӣ",
    items: ["JavaScript", "Android UI", "Layout", "Маълумотҳои маҳаллӣ"],
  },
  {
    phase: "3",
    title: "Пешрафт",
    items: ["API", "Compose чуқур", "Coroutines", "Архитектура"],
  },
  {
    phase: "4",
    title: "Касбӣ",
    items: ["Тестҳо", "Нашр", "Портфолио", "Бозори кор"],
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 bg-grid-pattern bg-grid opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -left-40 top-20 h-96 w-96 rounded-full bg-purple/10 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-40 bottom-40 h-96 w-96 rounded-full bg-cyan/10 blur-[120px]"
        aria-hidden
      />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan-dim px-4 py-1.5 text-center font-mono text-xs font-medium uppercase tracking-wider text-cyan sm:text-sm">
            Платформаи №1 барои омӯзиши IT дар Тоҷикистон
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Аввалин қадамат ба IT аз ин ҷост
          </h1>
          <p className="mt-6 text-pretty text-lg text-slate-400 sm:text-xl">
            Сайтсозӣ, барномасозии мобайл, дизайн ва зиёда — ҳамаро бо забони модарӣ омӯзед. Аз сифр то
            касбӣ.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {directions.map((d) => {
              const isSoon = "soon" in d && d.soon;
              return (
              <span
                key={d.label}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs sm:text-sm ${
                  isSoon
                    ? "border-white/10 bg-white/[0.03] text-slate-500"
                    : "border-cyan/35 bg-cyan/10 text-cyan"
                }`}
              >
                <span aria-hidden>{d.icon}</span>
                {d.label}
                {isSoon ? (
                  <span className="ml-1 rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                    ба зудӣ
                  </span>
                ) : null}
              </span>
            );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/courses"
              className="inline-flex w-full items-center justify-center rounded-full bg-cyan px-8 py-3.5 text-base font-semibold text-background shadow-lg shadow-cyan/30 transition hover:bg-cyan/90 sm:w-auto"
            >
              Бепул оғоз кунед →
            </Link>
            <Link
              href="/#courses"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:border-cyan/40 hover:bg-white/10 sm:w-auto"
            >
              Курсҳоро бинед
            </Link>
          </div>

          <HeroHtmlPreview />
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="relative scroll-mt-20 border-t border-white/5 bg-surface/20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-slate-500">Курсҳо</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Интихоб кунед ва оғоз намоед</h2>
            <p className="mt-4 text-slate-400">
              Ду курс ҳозира бепул дастрас аст; дигар самтҳо ба зудӣ илова мешаванд.
            </p>
          </div>
          <CoursesGridClient />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative border-t border-white/5 bg-surface/30 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Имкониятҳо</h2>
            <p className="mt-4 text-slate-400">
              Ҳама чиз барои омӯзиши самарбахш дар як ҷо — аз HTML то Android ва минбаъда зиёда.
            </p>
          </div>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <li
                key={f.title}
                className="group rounded-2xl border border-white/5 bg-background/60 p-6 transition hover:border-cyan/25 hover:shadow-lg hover:shadow-cyan/5"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-dim font-mono text-xl text-purple transition group-hover:bg-cyan-dim group-hover:text-cyan"
                  aria-hidden
                >
                  {f.icon}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="relative scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Нақшаи омӯзиш</h2>
            <p className="mt-4 text-slate-400">
              Роҳи чанд марҳалаӣ то барноманависи мустақил — бо марҳилаҳои равшан ва мақсадҳои амалӣ.
            </p>
          </div>
          <ol className="mt-14 space-y-8">
            {roadmap.map((step) => (
              <li
                key={step.phase}
                className="relative flex flex-col gap-4 rounded-2xl border border-white/8 bg-surface/50 p-6 sm:flex-row sm:items-start sm:gap-8 sm:p-8"
              >
                <div className="flex shrink-0 items-center justify-center sm:flex-col sm:items-start">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan/20 to-purple/20 font-mono text-xl font-bold text-cyan ring-1 ring-cyan/30">
                    {step.phase}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {step.items.map((item) => (
                      <li key={item}>
                        <span className="inline-flex rounded-lg border border-white/10 bg-background/80 px-3 py-1 font-mono text-xs text-slate-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* About + Signup */}
      <section id="about" className="scroll-mt-20 border-t border-white/5 bg-surface/40 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Дар бораи ITomuz</h2>
              <p className="mt-6 leading-relaxed text-slate-400">
                Мо боварӣ дорем, ки дониши техникӣ бояд барои ҳама дастрас бошад.{" "}
                <BrandLogo className="inline text-base align-baseline" /> барои омӯзгорон, донишҷӯён ва
                касоне сохта шудааст, ки мехоҳанд дар соҳаи IT рушд кунанд — бе монеаи забонӣ. Мундариҷа
                мутобиқ ба стандардҳои индустрия нав мешавад ва курсҳои нав пайваста илова мегарданд.
              </p>
              <p className="mt-4 font-mono text-sm text-purple">
                {"// оянда: видео, вазифаҳои иловагӣ, ҷамъият"}
              </p>
            </div>
            <div id="signup" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-white">Хабарҳои навро гиред</h2>
              <p className="mt-3 text-slate-400">
                Почтаи худро ворид кунед, то аввалин кас бошед, ки дар бораи кушодани курсҳо ва мундариҷаи
                нав огоҳ шавед.
              </p>
              <div className="mt-8">
                <EmailSignup />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-slate-500 sm:flex-row sm:text-left sm:px-6 lg:px-8">
          <p>
            © 2026 <BrandLogo className="inline text-sm" /> — Бо ❤️ барои Тоҷикистон сохта шудааст
          </p>
          <p className="font-mono text-xs text-slate-600">Омӯзиши IT бо забони тоҷикӣ</p>
        </div>
      </footer>
    </main>
  );
}
