import type { LessonModuleInput } from "./lessonPremium";

/** Модул 11: Тайёрӣ ба кор — дарсҳои 62–64 (гувоҳнома) */
export const webModule11JobPrep: LessonModuleInput = {
  id: "m11",
  title: "Модул 11: Тайёрӣ ба кор",
  titleEn: "Аз омӯзиш ба кор",
  locked: false,
  capstone: true,
  lessons: [
    {
      id: "62",
      number: 62,
      title: "Резюме ва портфолио",
      description: "CV, GitHub README, LinkedIn",
      theory: `Шумо акнун **барномасоз** ҳастед! Вале **корфармо** инро бояд донад.

**Резюмеи хуб** ва **портфолиои зебо** — ин **калиди кор** аст.

Дар ин дарс:
- **Резюмеи IT** — малакаҳо (технологияҳо), **лоиҳаҳо** бо линк, **таҳсил** ё курсҳо, **тамос**.
- **Профили GitHub** — README дар репозитории ҳамном (\`username/username\`) — кистед, чӣ месозед.
- **Портфолио** — линкҳои зинда, скриншотҳо, тавсифи кӯтоҳ.
- **LinkedIn** — сарлавҳаи касбӣ, калимаҳои калидии соҳа.

Резюме бояд **1–2 саҳифа**, бе хатоҳои ҷиддии имло, бо **PDF** барои фиристодан.`,
      starterCode: `<article class="резюме">
  <header>
    <h1>Ному насаб</h1>
    <p>Frontend · Душанбе</p>
    <p><a href="mailto:email@example.com">email@example.com</a></p>
  </header>
  <section>
    <h2>Малакаҳо</h2>
    <ul>
      <li></li>
    </ul>
  </section>
  <section>
    <h2>Лоиҳаҳо</h2>
    <ul>
      <li></li>
    </ul>
  </section>
  <section>
    <h2>Таҳсил / курсҳо</h2>
    <p></p>
  </section>
  <section class="блок-профил">
    <h2>Матн барои README-и профил</h2>
    <pre></pre>
  </section>
</article>
<style>
  .резюме { max-width: 640px; margin: 0 auto; padding: 24px; font-family: system-ui, sans-serif; line-height: 1.5; }
  h1 { margin-bottom: 0.25rem; }
  section { margin-top: 1.5rem; }
  pre { background: #f1f5f9; padding: 12px; border-radius: 8px; white-space: pre-wrap; min-height: 5rem; }
</style>`,
      task: "Резюмеро пур кунед: ҳадди ақал 4 сатр дар рӯйхати малакаҳо (4 <li>), 2 лоиҳа бо ном ва технология, блок таҳсил пур. Дар pre — README-и кӯтоҳи профил (калимаи readme ва github-ро истифода баред)",
      expectedOutput: "Малакаҳо, лоиҳаҳо, README",
      hint: "Малакаҳо, лоиҳаҳо ва маълумоти тамос — 3 қисми асосии резюме",
      runtime: "web",
      webChecks: {
        contains: ["react", "git", "readme", "github", "портфолио"],
        minLiCount: 4,
      },
    },
    {
      id: "63",
      number: 63,
      title: "Мусоҳиба — саволҳои техникӣ",
      description: "Саволҳо, live coding, рафтор",
      theory: `Дар **мусоҳиба** аз шумо **саволҳои техникӣ** мепурсанд.

**HTML/CSS** — семантика, flex, grid, медиа-запрос. **JavaScript** — массив, \`Promise\`, \`async/await\`, DOM. **React** — props, \`useState\`, \`useEffect\`. **Git** — commit, branch, merge.

**Live-coding** — ором бимонед, фикрро ошкор кунед, хатогиҳоро тафтиш кунед.

**Саволҳои рафторӣ** — кори даста, мӯҳлат, нокомӣ — бо мисоли воқеӣ ҷавоб диҳед.

Дар **код** ҷавобҳои кӯтоҳ ба 10 савол нависед ва **ду масъалаи кодро** пурра кунед.`,
      starterCode: `<div class="мусоиба">
  <h2>Ҷавобҳои хонагӣ (10 савол — ҳар сатр як ҷавоби пурра)</h2>
  <ol>
    <li>Намунаи формат: ин ҷо ҷавоби дароз...</li>
    <li></li>
  </ol>
  <h2>Масъала 1: ҷамъи ададҳои массив</h2>
  <pre><code>function ҷамъ(а) {
  // а — массиви ададҳо; ҷамъро бо усули дурусти массив ҳисоб кунед
}</code></pre>
  <button type="button" id="тугмаШумор">+1</button>
  <span id="намоишиШумор">0</span>
  <script>
  // Масъола 2: пахши тугма — шумораро зиёд кунед (getElementById + addEventListener)
  </script>
</div>
<style>
  .мусоиба { max-width: 640px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif; }
  ol li { min-height: 1.25rem; margin-bottom: 8px; }
  pre { background: #1e293b; color: #e2e8f0; padding: 14px; border-radius: 8px; }
</style>`,
      task: "8 <li>-и дигар ба рӯйхат илова кунед (ҷамъ 10 савол, ҳар ҷавоб на камтар аз 12 ҳарф). Функсияи ҷамъро бо reduce тамом кунед. Дар script тугмаро пайваст кунед: ҳар пахш +1 ба span",
      expectedOutput: "10 ҷавоб, reduce, addEventListener",
      hint: "Ҳар саволро аввал худатон ҷавоб диҳед, баъд ҷавоби дурустро бинед",
      runtime: "web",
      webChecks: {
        contains: ["reduce", "return ", "getelementbyid", "addeventlistener", "click"],
        minLiCount: 10,
      },
    },
    {
      id: "64",
      number: 64,
      title: "Фриланс ва кори аввалин",
      description: "Платформаҳо, ширкатҳо, нарх",
      theory: `Шумо **омодаед**! Акнун ду роҳ дар пеш аст:

1. **Кор дар ширкат** — **Душанбе**, **Хуҷанд** ё **remote** (аз хона ба ҷаҳон).
2. **Фриланс** — худатон **мизоҷ** меҷӯед ва **пул** мегиред.

Дар **Тоҷикистон** IT **рушд** мекунад — ширкатҳои **зиёд** барномасозони **frontend**, **backend**, **мобил** ҷустуҷӯ мекунанд.

**Платформаҳо:** Upwork, Fiverr, Kwork (русӣ) — профили пурра, **портфолио**, **нархи оғоз** разонанда.

**Кори аввалин:** бо **нархи муқобили паст** оғоз кунед, **5 ситора** гиред, баъд нархро боло баред. **Эътимод** ба вақт меравад.`,
      starterCode: `<article class="фриланс">
  <h1>Профили фрилансӣ (намуна)</h1>
  <section>
    <h2>Малакаҳо</h2>
    <ul>
      <li></li>
    </ul>
  </section>
  <section>
    <h2>Тарифҳо (USD ё сомонӣ)</h2>
    <table border="1" cellpadding="8">
      <tr><th>Хизмат</th><th>Арзиш</th></tr>
      <tr><td>Саҳифаи лендинг</td><td></td></tr>
      <tr><td>Сайти пурра</td><td></td></tr>
    </table>
  </section>
  <section>
    <h2>Намунаи корҳо</h2>
    <p><!-- линкҳо ё тавсиф --></p>
  </section>
  <section>
    <h2>Нақша барои кори аввал</h2>
    <p></p>
  </section>
</article>
<style>
  .фриланс { max-width: 640px; margin: 0 auto; padding: 24px; font-family: system-ui, sans-serif; line-height: 1.6; }
  table { border-collapse: collapse; width: 100%; margin-top: 12px; }
</style>`,
      task: "Профили фрилансии худро пур кунед: ҳадди ақал 3 малака, ду нарх дар ҷадвал, зикри портфолио, як стратегияи кӯтоҳ барои мизоҷи аввал",
      expectedOutput: "Малака, нарх, портфолио",
      hint: "Бо нархи паст оғоз кунед, портфолио нишон диҳед, ва 5-ситораи аввалинро гиред",
      runtime: "web",
      webChecks: {
        contains: ["нарх", "портфолио", "мизоҷ", "сомонӣ", "арзон"],
        minLiCount: 3,
      },
    },
  ],
};
