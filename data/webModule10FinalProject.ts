import type { LessonModule } from "./lessonTypes";

/** Модул 10: Лоиҳаи ниҳоӣ — дарсҳои 47–51 */
export const webModule10FinalProject: LessonModule = {
  id: "m10",
  title: "Модул 10: Лоиҳаи ниҳоӣ",
  titleEn: "Портфолиои касбӣ",
  locked: false,
  lessons: [
    {
      id: "47",
      number: 47,
      title: "Нақшакашӣ ва дизайн",
      description: "Wireframe, палитра, саҳифаҳо",
      theory: `Пеш аз код задан — **ФИКР кунед!** Ҳар лоиҳаи хуб аз **нақша** оғоз мешавад.

Мо **сайти портфолиои шахсиро** месозем — ин сайтест, ки шумо ба **корфармо** нишон медиҳед.

Дар ин дарс:
1. **Саҳифаҳоро муайян мекунем** — асосӣ, дар бора, лоиҳаҳо, тамос.
2. **Wireframe** мекашем — расми содаи блокҳо (қалам ё воситаи онлайн).
3. **Рангҳо ва ҳарф** интихоб мекунем — палитра ва фонти хонданаш осон.

**Сохтори папка** (мисол): \`index.html\`, \`css/\`, \`js/\`, \`images/\`.

**Саҳифаҳо:** **Home** (салом ва CTA), **About** (дар бораи шумо), **Projects** (корҳои интихобӣ), **Contact** (форма ё тамос).`,
      starterCode: `<!DOCTYPE html>
<html lang="tg">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Портфолио — нақша</title>
</head>
<body>
  <header>
    <h1>Сайти портфолио (wireframe)</h1>
    <p>Рангҳо: <em>ин ҷо палитраи худро нависед</em> · Фонт: <em>ин ҷо номи фонт</em></p>
  </header>
  <!-- Ҳар саҳифа як block — бо id-и лотинӣ барои якдилигӣ -->
  <section id="home">
    <h2>Асосӣ</h2>
    <p>Wireframe: сарлавҳаи калон, тугма, сурат.</p>
  </section>
  <section>
    <h2>Дар бора</h2>
    <p>Ин секияро пур кунед: id-и \`about\`-ро ба тег гузоред.</p>
  </section>
  <section>
    <h2>Лоиҳаҳо</h2>
    <p>Ин секияро пур кунед: id-и \`projects\`-ро гузоред.</p>
  </section>
  <section>
    <h2>Тамос</h2>
    <p>Ин секияро пур кунед: id-и \`contact\`-ро гузоред.</p>
  </section>
</body>
</html>`,
      task: "Wireframe-и сайти портфолиои худро созед: 4 саҳифа бо сарлавҳаҳо ва тавсифи мухтасар",
      expectedOutput: "Чор section бо id: home, about, projects, contact",
      hint: "Ҳар саҳифа як section бо id ва сарлавҳа дошта бошад",
      runtime: "web",
      webChecks: {
        contains: ['id="about"', 'id="projects"', 'id="contact"', "<h2", "<p"],
      },
    },
    {
      id: "48",
      number: 48,
      title: "HTML ва CSS — вёрстка",
      description: "Navbar, hero, grid, адаптив",
      theory: `Акнун **wireframe-ро ба код** табдил медиҳем!

- **Flexbox** барои **navbar** — элементҳо дар як сатр, байнашон фосила.
- **Grid** барои **кортҳои лоиҳаҳо** — муқаррарӣ ва зебо.
- **@media** барои **мобайл** — вақте экран хурд аст, тартиб иваз мешавад.

Ин ҳама чизҳоеанд, ки дар **модулҳои аввал** омӯхтед — ҳоло дар **лоиҳаи воқеӣ** истифода мебаред.`,
      starterCode: `<!DOCTYPE html>
<html lang="tg">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Портфолио</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, sans-serif; }
    /* Navbar — тартиби уфуқӣ, фосила байни элементҳо */
    .navbar {
      padding: 12px 24px;
      background: #0f172a;
      color: #f8fafc;
    }
    /* Hero — баландии минималӣ ва матн дар марказ */
    .hero { padding: 64px 24px; text-align: center; background: #1e293b; color: #fff; }
    /* Карточкаҳо — чиниши чандсутунӣ, андозаи минималӣ 300px */
    .projects { padding: 32px 24px; }
    .project-grid { }
    .card { border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px; background: #fff; }
    .footer { padding: 24px; background: #0f172a; color: #94a3b8; text-align: center; }
    /* Экрани хурд — сутунҳо зери ҳам */
  </style>
</head>
<body>
  <nav class="navbar" role="navigation" aria-label="Асосӣ">
    <span>Ному насаб</span>
    <div><!-- линкҳо */</div>
  </nav>
  <section class="hero" id="home">
    <h1>Салом! Ман барномасоз ҳастам</h1>
    <p>Як сатр дар бораи шумо</p>
  </section>
  <section class="projects" id="projects">
    <h2>Лоиҳаҳо</h2>
    <div class="project-grid">
      <article class="card"><h3>Лоиҳаи 1</h3><p>Тавсиф</p></article>
      <article class="card"><h3>Лоиҳаи 2</h3><p>Тавсиф</p></article>
    </div>
  </section>
  <footer class="footer"><p>© 2026</p></footer>
</body>
</html>`,
      task: "Саҳифаи асосиро пурра верстка кунед: navbar (Flexbox), hero section, карточкаҳои лоиҳаҳо (Grid), footer. Адаптив барои мобайл",
      expectedOutput: "flex navbar, grid, @media",
      hint: "display: flex барои navbar, display: grid ва grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) барои карточкаҳо",
      runtime: "web",
      webChecks: {
        contains: ["display:flex", "display:grid", "grid-template-columns", "repeat(", "minmax(", "@media"],
      },
    },
    {
      id: "49",
      number: 49,
      title: "JavaScript — интерактивият",
      description: "Меню, scroll, аниматсия, форма",
      theory: `Сайт бояд **зинда** бошад!

Дар ин дарс мо илова мекунем:
- **Менюи мобайлӣ** — тугма менюро мекушояд/мепӯшонад (\`classList.toggle\`).
- **Навигатсияи мулоим** — \`scroll-behavior: smooth\` ё \`scrollIntoView({ behavior: 'smooth' })\`.
- **Аниматсия вақти scroll** — мисол бо \`IntersectionObserver\`.
- **Валидатсияи формаи тамос** — \`preventDefault\`, санҷиши email ва матн.`,
      starterCode: `<!DOCTYPE html>
<html lang="tg">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Портфолио — JS</title>
  <style>
    body { margin: 0; font-family: system-ui, sans-serif; }
    .navbar { display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: #0f172a; color: #fff; }
    .nav-links { display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; }
    .menu-btn { display: none; cursor: pointer; border: none; background: #334155; color: #fff; padding: 8px 12px; border-radius: 6px; }
    @media (max-width: 640px) {
      .menu-btn { display: block; }
      .nav-links { display: none; flex-direction: column; }
      .nav-links.active { display: flex; }
    }
    .fade-in { opacity: 0; transform: translateY(12px); transition: opacity 0.5s, transform 0.5s; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
    .hero { min-height: 40vh; padding: 48px 20px; background: #e2e8f0; }
    section { padding: 32px 20px; }
    footer { padding: 24px; background: #1e293b; color: #94a3b8; }
  </style>
</head>
<body>
  <nav class="navbar">
    <span>Логотип</span>
    <button type="button" class="menu-btn" aria-label="Меню">☰</button>
    <ul class="nav-links">
      <li><a href="#home">Асосӣ</a></li>
      <li><a href="#contact">Тамос</a></li>
    </ul>
  </nav>
  <section class="hero fade-in" id="home"><h1>Салом</h1></section>
  <section id="contact">
    <h2>Тамос</h2>
    <form id="формаТамос">
      <p><input type="email" id="emailТамос" placeholder="Email"></p>
      <button type="submit">Ирсол</button>
    </form>
  </section>
  <footer>© 2026</footer>
  <script>
// 1) тугмаи меню — кушодан/пӯшидани рӯйхат
// 2) гузариши нарм ба #якор
// 3) аниматсия ҳангоми намоиш дар экран
// 4) санҷиши email пеш аз ирсол
  </script>
</body>
</html>`,
      task: "4 корро дар JS татбиқ кунед: менюи мобайлӣ, smooth scroll, scroll animation (IntersectionObserver), валидатсияи форма",
      expectedOutput: "toggle, smooth, observer, preventDefault",
      hint: "document.querySelector('.menu-btn').addEventListener('click', () => nav.classList.toggle('active'))",
      runtime: "web",
      webChecks: {
        contains: [
          "classlist",
          "toggle",
          "smooth",
          "intersectionobserver",
          "preventdefault",
          "includes(",
        ],
      },
    },
    {
      id: "50",
      number: 50,
      title: "React-версия",
      description: "6 компонент, props, state",
      theory: `Акнун ҳамон **портфолиоро бо React** месозем!

Ин нишон медиҳад, ки шумо ҳам **HTML/CSS/JS** ва ҳам **React** медонед — **корфармо** инро дӯст медорад.

**Компонентҳо:** **Header**, **Hero**, **Projects**, **About**, **Contact**, **Footer**.

Маълумоти лоиҳаҳо дар **массив** — бо \`.map()\` ва **props** ба карточка мефиристем. **Формаи тамос** бо \`useState\` (**controlled**).`,
      starterCode: `function Header() {
  return null;
}

function Hero() {
  return null;
}

function Projects() {
  const лоиҳаҳо = [
    { id: 1, унвон: "Сайти шахсӣ", тавсиф: "HTML/CSS" },
    { id: 2, унвон: "Бозиҳо", тавсиф: "JavaScript" },
  ];
  return (
    <section id="projects">
      <h2>Лоиҳаҳо</h2>
    </section>
  );
}

function Card({ унвон, тавсиф }) {
  return (
    <article className="card">
      <h3>{унвон}</h3>
      <p>{тавсиф}</p>
    </article>
  );
}

function About() {
  return null;
}

function Contact() {
  return null;
}

function Footer() {
  return null;
}

function App() {
  return (
    <div>
      {/* Header, Hero, Projects (бо map ва Card), About, Contact, Footer */}
    </div>
  );
}`,
      task: "Портфолиоро ба React табдил диҳед: 6 компонент дар App ҷойгир кунед, лоиҳаҳоро бо .map() ва Card нишон диҳед, формаи тамос бо useState",
      expectedOutput: "Header…Footer, map, useState",
      hint: "Ҳар section як компонент мешавад: function Hero() { return <section>…</section> }",
      runtime: "web",
      webPreviewMode: "react",
      webChecks: {
        contains: ["<header", "<footer", "лоиҳаҳо.map", "usestate(", "value={", "onchange", "<form"],
      },
    },
    {
      id: "51",
      number: 51,
      title: "Деплой — сайтро ба интернет!",
      description: "GitHub Pages, Vercel, линк",
      theory: `Лоиҳа **тайёр аст** — вақти **нашр** расид! 🚀

Мо сайтро дар **интернет** мегузорем, ки **ҳама бубинанд**.

**Ду роҳ:**
1. **GitHub Pages** — бепул, барои лоиҳаи **содда HTML/CSS/JS**.
2. **Vercel** — бепул, барои **React** (\`npm run build\`), пайваст ба **GitHub** — ҳар push **деплойи нав**.

Баъд **линкро** ба **резюме**, **профилҳои шабакавӣ** ё мусоҳиба илова кунед. Домени шахсӣ — интихобӣ, вале муфид аст.

**Фармонҳо (чакра):** \`npm run build\`, фиристодан ба репозиторӣ, **Import** дар Vercel.`,
      starterCode: `<div class="деплой">
  <h2>✅ Чеклисти нашр</h2>
  <ol>
    <li>Git: add, commit</li>
    <li>Фиристодан ба репозитории GitHub</li>
    <li>Интихоби платформаи нашр (саҳифаи статикӣ ё хостинги React)</li>
    <li>Сохтани build барои лоиҳаи React</li>
  </ol>
  <h3>Линки зиндаи сайти шумо</h3>
  <p class="линк"></p>
  <pre class="фармонҳо"><!-- фармони build-ро ин ҷо нависед --></pre>
</div>
<style>
  .деплой { max-width: 560px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif; line-height: 1.6; }
  h2 { color: #0369a1; }
  .линк { padding: 12px; border: 2px dashed #94a3b8; border-radius: 8px; min-height: 2rem; background: #f8fafc; }
  pre { background: #1e293b; color: #e2e8f0; padding: 14px; border-radius: 8px; overflow-x: auto; }
</style>`,
      task: "Чеклистро хонед, фармонҳои build-ро дар код нигоҳ доред ва линки зиндаи deploy-шудаи худро (бо https://) дар блок пурра нависед",
      expectedOutput: "https://..., vercel ё pages",
      hint: "vercel.com → Import Git Repository → Deploy",
      runtime: "web",
      webChecks: {
        contains: ["https://", "vercel", "npm run build"],
      },
    },
  ],
};
