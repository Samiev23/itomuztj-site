import type { LessonModule } from "./lessonTypes";

/** Анҷоми ин дарс — гирифтани гувоҳномаи «Сайтсозӣ» */
export const WEB_CAPSTONE_LESSON_ID = "23";

export const webLessonModules: LessonModule[] = [
  {
    id: "m0",
    title: "Модул 0: Муқаддима",
    titleEn: "Оғоз",
    locked: false,
    lessons: [
      {
        id: "1",
        number: 1,
        title: "Вебсайт чист?",
        description: "Хона месозем, сайт мефаҳмем",
        theory: `**Вебсайт чист?** Ин мисли **хона** аст, ки дар интернет зиндагӣ мекунад.

- **HTML** — мисли **хиштҳо**: девор мегузоранд, ҷойҳои асосиро месозанд (сарлавҳа, матн, рӯйхат).
- **CSS** — мисли **рангу рӯй**: хонаро зебо мекунад (ранг, ҳарф, фосила).
- **JavaScript** — мисли **барқ ва об**: чизҳоро зинда мекунад — тугма пахш шуд, чиз ҳаракат кард.

Мисол: як саҳифаи оддӣ — сарлавҳаи калон ва матни хуш омадед.

Дар чап **код** месозед, дар рост **натиҷа**-ро мебинед.`,
        starterCode: `<h1>Салом, ман Аҳмад!</h1>`,
        task: "Номи худро нависед",
        expectedOutput: "Саҳифа бо сарлавҳаи шумо дар пешнамоиш",
        hint: "Ба ҷои Аҳмад номи худро нависед",
        runtime: "web",
        outputValidation: "nonempty",
        webChecks: { contains: ["<h1", "</h1>"] },
      },
    ],
  },
  {
    id: "m1",
    title: "Модул 1: HTML — асоси сайт",
    titleEn: "Асосҳои HTML",
    locked: false,
    lessons: [
      {
        id: "2",
        number: 2,
        title: "Сарлавҳа ва матн",
        description: "Сарлавҳа ва абзац",
        theory: `**Сарлавҳаҳо** (\`h1\` то \`h6\`) — мисли **унвони китоб**: калонтарин \`h1\`, хурдтарин \`h6\`.

**Абзац** (\`p\`) — мисли **саҳифаҳои китоб**: матни оддӣ дар дохилаш меравад.

Мисол: \`<h1>Номи ман</h1>\` ва \`<p>Ман дар Душанбе зиндагӣ мекунам.</p>\``,
        starterCode: `<h1>Номи ман</h1>
<p>Дар ин ҷо дар бораи худатон нависед.</p>`,
        task: "Сарлавҳа ва як абзац дар бораи худатон нависед",
        expectedOutput: "Сарлавҳа ва матн дар пешнамоиш",
        hint: "Тегҳои h1 ва p-ро иваз кунед — матни худатонро гузоред",
        runtime: "web",
        webChecks: { contains: ["<h1", "</h1>", "<p", "</p>"] },
      },
      {
        id: "3",
        number: 3,
        title: "Рӯйхатҳо",
        description: "Рӯйхати харид дар сайт",
        theory: `**Рӯйхат** — мисли **рӯйхати харид дар бозор**: чизҳо як-баъд-як навишта мешаванд.

- \`ul\` — рӯйхати нуқтадор
- \`ol\` — рӯйхати рақамдор
- \`li\` — як сатр дар рӯйхат`,
        starterCode: `<ul>
  <li>Нон</li>
  <li>Шир</li>
  <li>Об</li>
</ul>`,
        task: "Рӯйхати 3 хӯроки дӯстдоштаатонро созед",
        expectedOutput: "Се сатр дар рӯйхат",
        hint: "Се теги li бо номи хӯрокҳои дӯстдоштаатон",
        runtime: "web",
        webChecks: { minLiCount: 3, contains: ["<ul", "</ul>"] },
      },
      {
        id: "4",
        number: 4,
        title: "Суратҳо ва линкҳо",
        description: "Сурат ва пайвандҳо",
        theory: `**Сурат** (\`img\`) — мисли **расми деворӣ**: чизеро нишон медиҳад.

**Линк** (\`a\`) — мисли **дар ба хонаи дигар**: клик кунед, ба ҷои дигар меравед.

\`href\` нишон медиҳад, ба куҷо рафтан лозим аст.`,
        starterCode: `<img src="https://picsum.photos/200" alt="Сурат" width="200">
<p><a href="https://example.com">Ба сайт равед</a></p>`,
        task: "Линк ба Google.com созед",
        expectedOutput: "Линк ба google.com",
        hint: "href=\"https://www.google.com\" истифода баред",
        runtime: "web",
        webChecks: { contains: ["<a", "google.com"] },
      },
      {
        id: "5",
        number: 5,
        title: "Ҷадвалҳо",
        description: "Ҷадвалҳо дар сайт",
        theory: `**Ҷадвал** — мисли **ҷадвали баҳоҳо дар мактаб**: сатрҳо ва сутунҳо.

- \`table\` — худи ҷадвал
- \`tr\` — як сатр
- \`td\` — як хона дар сатр`,
        starterCode: `<table border="1">
  <tr>
    <td>Мева</td>
    <td>Нарх</td>
  </tr>
  <tr>
    <td>Себ</td>
    <td>5 сомонӣ</td>
  </tr>
</table>`,
        task: "Ҷадвали нархҳои мевадор созед: Себ — 5 сомонӣ, Нок — 8 сомонӣ, Олу — 3 сомонӣ",
        expectedOutput: "Се сатри маълумот + сарлавҳа",
        hint: "Баъд аз сатри аввал, се сатр бо Себ, Нок, Олу илова кунед",
        runtime: "web",
        webChecks: {
          contains: ["<table", "Себ", "5", "Нок", "8", "Олу", "3"],
        },
      },
    ],
  },
  {
    id: "m2",
    title: "Модул 2: CSS — зебоии сайт",
    titleEn: "Оро додани сайт",
    locked: false,
    lessons: [
      {
        id: "6",
        number: 6,
        title: "Рангҳо ва фонт",
        description: "Рангҳо ва андозаи ҳарфҳо",
        theory: `**CSS** — мисли **рангрез**: хонаро зебо мекунад.

- \`color\` — ранги матн
- \`background-color\` — ранги пушти матн ё блок
- \`font-size\` — андозаи ҳарф

Мисол дар тег: \`<h1 style="color: red; background-color: lightblue;">\``,
        starterCode: `<h1 style="color: black;">Салом!</h1>
<p style="font-size: 16px;">Матн дар ин ҷо.</p>`,
        task: "Сарлавҳаро сурх ва фонро кабуд кунед",
        expectedOutput: "Сарлавҳаи сурх, фони кабуд",
        hint: "Дар style: color: red; background-color: blue;",
        runtime: "web",
        webChecks: {
          contains: ["color:", "background", "red", "blue"],
        },
      },
      {
        id: "7",
        number: 7,
        title: "Ҷойгиршавӣ",
        description: "Фосила ва ҳошияҳо",
        theory: `**margin** — мисли **ҳавлӣ**: фосила берун аз қуттӣ.

**border** — мисли **девор**: ҳошияи атрофи қуттӣ.

**padding** — мисли **фосила аз девор то мебел**: дохили қуттӣ, наздик ба матн.

Мисол: \`<div style="margin: 20px; padding: 15px; border: 2px solid gold;">\``,
        starterCode: `<div style="border: 1px solid gray; padding: 10px;">
  Қуттии оддӣ
</div>`,
        task: "Қуттии зебо бо ҳошия ва фосила созед",
        expectedOutput: "margin, padding ва border дар style",
        hint: "margin, padding ва border-ро якҷоя дар style илова кунед",
        runtime: "web",
        webChecks: {
          contains: ["margin", "padding", "border"],
        },
      },
    ],
  },
  {
    id: "m3",
    title: "Модул 3: JavaScript — ҷони сайт",
    titleEn: "Ҷони сайт",
    locked: false,
    lessons: [
      {
        id: "8",
        number: 8,
        title: "JavaScript чист?",
        description: "Ақл ва ҳаракати сайт",
        theory: `**HTML** — ин **ҷисми одам**, **CSS** — ин **либос**, **JavaScript** — ин **ақл ва ҳаракат**!

Бе JavaScript сайт мисли **манекен** аст — зебо, вале **ҳаракат намекунад**. Бо JavaScript **тугмаҳо кор мекунанд**, **рангҳо иваз мешаванд**, чизҳо **пайдо ва ғоиб** мешаванд.

Мисоли оддӣ — тугма, ки пахш карда, паём нишон медиҳад:

\`\`\`html
<button onclick="alert('Салом!')">Пахш кун!</button>
\`\`\`

Пахш кунед — браузер паёмро мебарорад. Ин ҳамон JavaScript аст, ки дар як лаҳза иҷро мешавад.`,
        starterCode: `<button onclick="alert('Салом!')">Пахш кун!</button>`,
        task: "Тугмаро тағйир диҳед, ки «Хуш омадед ба ITomuz TJ!» нишон диҳад",
        expectedOutput: "Алерт бо матни «Хуш омадед ба ITomuz TJ!»",
        hint: "Дар дохили alert() матнро иваз кунед",
        runtime: "web",
        webChecks: {
          contains: ["onclick", "alert(", "хуш омадед ба itomuz"],
        },
      },
      {
        id: "9",
        number: 9,
        title: "Тағйирёбандаҳо дар JS",
        description: "let ва const — халтаҳо дар бозор",
        theory: `Боз **ҳамон халтаҳои бозор**! Дар JavaScript ба ҷои \`val\` / \`var\` мо **\`let\`** ва **\`const\`** истифода мебарем.

- **\`const\`** = халтаи **қулфшуда**: чизро гузоштед — дигар иваз намекунед (масалан номи шаҳр).
- **\`let\`** = халтаи **кушода**: метавонед чизи нав гузоред (масалан номи одам).

Мисол:

\`\`\`javascript
let ном = "Аҳмад";
const шаҳр = "Душанбе";
\`\`\`

Баъд ин қимматҳоро метавонед дар саҳифа нишон диҳед (масалан бо \`document.getElementById(...).innerText\`).`,
        starterCode: `<p id="хабар"></p>
<script>
let ном = "";
const шаҳр = "";
document.getElementById("хабар").innerText = "Ман " + ном + " аз " + шаҳр + " ҳастам.";
</script>`,
        task: "Тағйирёбандаҳоро пур кунед ва дар сайт нишон диҳед",
        expectedOutput: "Матн дар пешнамоиш бо ном ва шаҳри шумо",
        hint: 'let ном = "Номи шумо"; const шаҳр = "Шаҳри шумо";',
        runtime: "web",
        webChecks: {
          contains: ["let", "const", "document.getelementbyid", "innertext"],
        },
      },
      {
        id: "10",
        number: 10,
        title: "Функсияҳо дар JS",
        description: "Рецепт дар код",
        theory: `**Ёдатон ҳаст рецепти плов?** Дар JavaScript ҳам **функсия = рецепт** аст. **Як маротиба менависед**, **борҳо истифода мебаред**!

Мисол:

\`\`\`javascript
function салом(ном) {
  alert("Салом, " + ном + "!");
}
\`\`\`

Дар веб мо одатан натиҷаро дар саҳифа мегузорем — на танҳо \`alert\`.`,
        starterCode: `<p id="натиҷа"></p>
<script>
function салом(ном) {
  // ин ҷо: матнро дар #натиҷа гузоред — «Салом, [ном]!»
}
салом("Меҳмон");
</script>`,
        task: "Функсия нависед, ки номро гирифта дар сайт «Салом, [ном]!» нишон диҳад",
        expectedOutput: "Дар пешнамоиш: Салом, Меҳмон!",
        hint: "document.getElementById('натиҷа').innerText = 'Салом, ' + ном + '!'",
        runtime: "web",
        webChecks: {
          contains: ["function", "салом(", "getelementbyid", "innertext", "салом, "],
        },
      },
      {
        id: "11",
        number: 11,
        title: "Шартҳо дар JS",
        description: "Чароғаки роҳ: if / else",
        theory: `**Чароғаки роҳ боз!** 🚦 \`if\` / \`else\` дар JavaScript **ҳам мисли Kotlin** кор мекунад.

- **Агар** шарт дуруст бошад — **як кор**;
- **Агар не** — **кори дигар**.

Мисол: синро санҷем — калонсол ё хурдсол?`,
        starterCode: `<label>Синатон (рақам):</label>
<input id="син" type="number" value="16">
<button onclick="санҷиш()">Санҷиш</button>
<p id="паём"></p>
<script>
function санҷиш() {
  let син = Number(document.getElementById("син").value);
  // ин ҷо if (син >= 18) { ... } else { ... }
  // дар #паём нависед: «Шумо калонсол ҳастед» ё «Шумо хурдсол ҳастед»
}
</script>`,
        task: "Барнома нависед: агар син >= 18 бошад «Шумо калонсол ҳастед» ва агар не «Шумо хурдсол ҳастед» нишон диҳад",
        expectedOutput: "Бо пахши Санҷиш паёми дуруст",
        hint: "if (син >= 18) { document.getElementById('паём').innerText = '...' } else { ... }",
        runtime: "web",
        webChecks: {
          contains: ["if", "else", ">=", "18", "калонсол", "хурдсол"],
        },
      },
      {
        id: "12",
        number: 12,
        title: "Лоиҳаи мини: ҳисобкунаки сомонӣ",
        description: "Сомонӣ ба доллар",
        theory: `Биёед **аввалин лоиҳаи воқеиро** созем!

**Ҳисобкунак**, ки **сомониро ба доллар** табдил медиҳад. Ин лоиҳа **ҳамаи чизҳои омӯхтаатонро** истифода мебарад:

- **HTML** барои шакл (вуруд, тугма),
- **CSS** барои зебоӣ,
- **JavaScript** барои **ҳисобкунӣ**!

Қоида: **1 доллар = 11 сомонӣ**. Пас агар кас **110 сомонӣ** ворид кунад, натиҷа бояд **10 доллар** шавад.

Функсияи \`табдил()\`-ро пурра кунед.`,
        starterCode: `<style>
  input, button { font-size: 1rem; padding: 8px; margin: 6px 0; border-radius: 8px; }
  #натиҷа { margin-top: 12px; font-weight: bold; color: #15803d; }
</style>
<p>🪙 <strong>Ҳисобкунаки сомонӣ</strong> — 1 доллар = 11 сомонӣ</p>
<label>Сомонӣ: <input id="сомонӣ" type="number" value="110"></label><br>
<button onclick="табдил()">Табдил ба доллар</button>
<p id="натиҷа"></p>
<script>
function табдил() {
  let сомонӣ = Number(document.getElementById("сомонӣ").value);
  // ин ҷо тақсим бар 11 кунед ва натиҷаро бо калимаи «доллар» дар #натиҷа нишон диҳед
  document.getElementById("натиҷа").innerText = "";
}
</script>`,
        task: "Функсияро пурра кунед: 1 доллар = 11 сомонӣ. Агар корбар 110 сомонӣ ворид кунад, натиҷа «10 доллар» бошад",
        expectedOutput: "Пахш карда — 10 доллар (бо 110 сомонӣ)",
        hint: "натиҷа = сомонӣ / 11; innerText = натиҷа + ' доллар'",
        runtime: "web",
        webChecks: {
          contains: ["табдил", "доллар", "getelementbyid", "innertext", "number("],
          containsLiteral: [" / 11"],
        },
      },
    ],
  },
  {
    id: "m4",
    title: "Модул 4: CSS пешрафта",
    titleEn: "Advanced CSS",
    locked: false,
    lessons: [
      {
        id: "13",
        number: 13,
        title: "Flexbox — сатрҳои чандир",
        description: "display:flex ва ҷойгиркунӣ дар як сатр",
        theory: `Тасаввур кунед, ки шумо **расмҳоро дар девор мечинед** — мехоҳед як сатр бошанд, ё як сутун, ё дар чап/рост.

**Flexbox** ба шумо имкон медиҳад, ки чизҳоро дар **як сатр ё сутун** ба тартиб дароред — **чап**, **рост**, **мобайн**, **баробар**.

- \`display: flex\` — ин **ҳукм** аст: «**Ҳама дар як сатр!**» (агар \`flex-direction: row\` бошад).
- \`justify-content\` — **чӣ тавр дар сатр** ҷой мегиранд: \`center\`, \`space-between\`, \`space-around\`.
- \`align-items\` — **росткунии амудӣ** (баландӣ).
- \`flex-direction\` — \`row\` (сатр) ё \`column\` (сутун).
- \`gap\` — **фосилаи баробар** байни элементҳо.

Мисли **қатори кӯдакон дар мактаб**: кӣ дар чап, кӣ дар мобайн — Flexbox ҳаминро барои блокҳои сайт мекунад.`,
        starterCode: `<p>Се қуттӣ дар як сатр бо фосилаи баробар:</p>
<div class="container">
  <div class="box a">A</div>
  <div class="box b">B</div>
  <div class="box c">C</div>
</div>
<style>
  .box {
    width: 72px;
    height: 72px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: 10px;
  }
  .a { background: #e11d48; }
  .b { background: #0891b2; }
  .c { background: #059669; }
  .container {
    padding: 16px;
    background: #e2e8f0;
    border-radius: 12px;
    /* ин ҷо: display:flex; justify-content: space-between; align-items:center; */
  }
</style>`,
        task: "3 қуттиро дар як сатр бо фосилаи баробар ҷойгир кунед",
        expectedOutput: "Се ранг дар як сатр бо space-between",
        hint: "justify-content: space-between истифода баред",
        runtime: "web",
        webChecks: {
          contains: [".container", "justify-content", "space-between"],
        },
      },
      {
        id: "14",
        number: 14,
        title: "Flexbox амалӣ — navbar ва card",
        description: "Навбар ва карточкаҳо",
        theory: `Биёед **Flexbox-ро дар амал** истифода барем!

**Навбари сайт** — одатан **лого чап**, **линкҳо рост**; ин бо \`display: flex\` ва \`justify-content: space-between\` осон мешавад.

**Карточкаҳои маҳсулот** — се ё чор корт дар **як сатр**: контейнер бо \`display: flex\`, \`flex-wrap: wrap\`, \`gap\`.

Мисли **ғизофурӯшӣ**: номи мағоза як тараф, рӯйхати кӯчаҳо тарафи дигар; зераш **қуттиҳои мева** паҳн шудаанд.`,
        starterCode: `<nav class="navbar">
  <span class="logo">ITomuz TJ</span>
  <div class="links">
    <a href="#">Асосӣ</a>
    <a href="#">Курсҳо</a>
    <a href="#">Алоқа</a>
  </div>
</nav>
<section class="бахш">
  <h2>Маҳсулотҳо</h2>
  <div class="кортҳо">
    <div class="корт"><h3>Нон</h3><p>3 сомонӣ</p></div>
    <div class="корт"><h3>Шир</h3><p>8 сомонӣ</p></div>
    <div class="корт"><h3>Об</h3><p>1 сомонӣ</p></div>
  </div>
</section>
<style>
  body { font-family: system-ui, sans-serif; margin: 0; background: #f8fafc; }
  .navbar {
    background: #0e7490;
    color: #fff;
    padding: 12px 20px;
    /* ин ҷо: display:flex; justify-content: space-between; align-items:center; */
  }
  .links a { color: #fff; margin-left: 16px; text-decoration: none; }
  .бахш { padding: 24px; max-width: 900px; margin: 0 auto; }
  .кортҳо {
    margin-top: 16px;
    /* ин ҷо: display:flex; flex-wrap:wrap; gap:16px; justify-content:center; */
  }
  .корт {
    flex: 1 1 200px;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 16px;
    background: #fff;
  }
</style>`,
        task: "Навбарро созед: лого чап, линкҳо рост. Ва 3 картро дар як сатр ҷойгир кунед",
        expectedOutput: "Navbar space-between ва кортҳо дар сатр",
        hint: "justify-content: space-between барои navbar, display:flex барои .кортҳо",
        runtime: "web",
        webChecks: {
          contains: [".navbar", "display", "space-between", ".кортҳо", "flex-wrap", "gap"],
        },
      },
      {
        id: "15",
        number: 15,
        title: "CSS Grid — тӯри сайт",
        description: "grid-template ва fr",
        theory: `Агар **Flexbox** — **як сатр** (ё сутун) аст, **Grid** — **тӯри пурра**!

Мисли **варақи дафтар** бо **хатҳои горизонталӣ ва амудӣ**: ҳар хона ҷой дорад.

- \`display: grid\`
- \`grid-template-columns\` — **бар** сутунҳо (масалан \`250px 1fr\` — чап фикс, рост пурра).
- \`grid-template-rows\` — **бар** сатрҳо (\`auto 1fr auto\` — сар ва поён автоматик, мобайн пурра).
- \`gap\` — фосила.
- \`fr\` — **бахши баробар** аз фазои боқимонда.

Grid барои **layout-и калон** аст: **header**, **sidebar**, **content**, **footer**.`,
        starterCode: `<div class="layout">
  <header>Сарлавҳаи сайт</header>
  <aside>Менюи чап</aside>
  <main>Мундариҷаи асосӣ</main>
  <footer>Поёни саҳифа</footer>
</div>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  header { background: #0e7490; color: #fff; padding: 16px; }
  aside { background: #e2e8f0; padding: 16px; }
  main { padding: 16px; background: #fff; }
  footer { background: #334155; color: #fff; padding: 12px; text-align: center; }
  .layout {
    min-height: 100vh;
    /* ин ҷо: display:grid; grid-template-columns: 250px 1fr; grid-template-rows: auto 1fr auto; */
    /* grid-gap ё gap илова кунед */
  }
  header { grid-column: 1 / -1; }
  footer { grid-column: 1 / -1; }
</style>`,
        task: "Layout-и сайт созед: header болои саҳифа, sidebar чап, content рост, footer поён",
        expectedOutput: "Grid бо сутуни чап ва мундариҷа",
        hint: "grid-template-columns: 250px 1fr ва grid-template-rows: auto 1fr auto",
        runtime: "web",
        webChecks: {
          contains: ["display:grid", "grid-template-columns", "250px", "1fr", "grid-template-rows", "auto"],
        },
      },
      {
        id: "16",
        number: 16,
        title: "Анимация ва transition",
        description: "Тағйири мулоим ва ҳаракат",
        theory: `**Сайти зинда** = сайти **зебо**!

- **Transition** — тағйири **мулоим**: масалан ранги тугма **оҳиста** иваз мешавад (\`transition: background-color 0.3s ease\`).
- **@keyframes** + **animation** — **ҳаракати такрорӣ** ё яккарата: элемент аз ҷой ба ҷой меравад.

\`:hover\` — вақте муш болои элемент меравад, CSS-и дигар кор мекунад — бо transition ин **наогаҳ** не, балки **нозук** ба назар мерасад.`,
        starterCode: `<button class="тугма">Нишон диҳед</button>
<div class="қуттӣ">Ҳаракат</div>
<style>
  body { font-family: system-ui, sans-serif; padding: 24px; }
  .тугма {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    background: #64748b;
    color: #fff;
    cursor: pointer;
    /* ин ҷо: муддати тағйири мулоими ранг (масалан 0.3s) барои background */
  }
  .тугма:hover {
    background: #0d9488;
  }
  .қуттӣ {
    position: relative;
    left: 0;
    width: 80px;
    height: 40px;
    margin-top: 24px;
    background: #0891b2;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    /* ин ҷо: ҳаракат бо номи move (блоки keyframes дар поён) */
  }
  /* ин ҷо блоки ҳаракат (keyframes) барои move */
</style>`,
        task: "Тугмаро созед, ки вақти hover рангаш оҳиста иваз шавад ва як элемент аз чап ба рост ҳаракат кунад",
        expectedOutput: "Transition дар тугма ва анимацияи қуттӣ",
        hint: "transition: background-color 0.3s ease ва @keyframes move { from { left:0 } to { left:200px } } — position:relative барои қуттӣ",
        runtime: "web",
        webChecks: {
          contains: ["transition", "@keyframes", "animation"],
        },
      },
      {
        id: "17",
        number: 17,
        title: "Медиа-запросҳо — сайт барои мобайл",
        description: "@media ва экрани хурд",
        theory: `**90% одамони Тоҷикистон** интернетро дар **телефон** истифода мебаранд! Сайти шумо бояд дар **телефон ҳам зебо** бошад.

\`@media (max-width: 768px)\` — ин **дастур** аст: «**Агар экран хурд бошад**, ин корро кун!»

- **Breakpoint** — нуқтаи қатъ: масалан **768px** барои планшет/мобайл.
- **Mobile-first** — аввал барои телефон месозед, баъд барои экрани калон васеъ мекунед (ё баръакс — ҳар ду роҳ вуҷуд дорад).

Мисли **либоси ҷузъӣ**: дар хона як чиз мепӯшед, дар баҳор чизи дигар — медиа-запрос ҳаминро барои CSS мекунад.`,
        starterCode: `<h2>Маҳсулотҳо</h2>
<div class="cards">
  <div class="card">Корт 1</div>
  <div class="card">Корт 2</div>
  <div class="card">Корт 3</div>
</div>
<style>
  body { font-family: system-ui, sans-serif; padding: 16px; }
  .cards {
    display: flex;
    flex-direction: row;
    gap: 16px;
    flex-wrap: wrap;
  }
  .card {
    flex: 1 1 200px;
    background: #e0f2fe;
    border: 1px solid #0891b2;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
  }
  /* ин ҷо блоки шароит барои экрани хурд (768px) илова кунед — .cards ба сутун */
</style>`,
        task: "Сайтро мобайл-friendly созед: дар экрани хурд картҳо як-як дар як сутун бошанд",
        expectedOutput: "Дар ширкати хурд flex-direction: column",
        hint: "@media (max-width: 768px) { .cards { flex-direction: column; } }",
        runtime: "web",
        webChecks: {
          contains: ["@media", "max-width", "768", "flex-direction", "column", ".cards"],
        },
      },
      {
        id: "18",
        number: 18,
        title: "Адаптивный дизайн — амалӣ",
        description: "Десктоп, планшет, мобайл",
        theory: `Биёед **ҳамаи донишро як ҷо** кунем!

Сайти **пурра** бо **Flexbox**, **Grid** (ё flex) ва **медиа-запрос**, ки дар **компютер**, **планшет** ва **телефон** зебо кор мекунад.

Се **нуқтаи қатъ** маъмул:
- **1200px** — экрани калон;
- **768px** — планшет;
- **480px** — мобайл.

Барои ҳар як сатҳ фосила, андозаи ҳарф ё тартиби сутунҳоро **сабук иваз** кунед.`,
        starterCode: `<header><h1>Дӯкони мо</h1></header>
<section class="hero"><p>Хуш омадед!</p></section>
<div class="cards">
  <div class="card">А</div>
  <div class="card">Б</div>
  <div class="card">В</div>
</div>
<footer>© 2026</footer>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  header { background: #0e7490; color: #fff; padding: 20px; text-align: center; }
  .hero { padding: 32px 16px; text-align: center; background: #f1f5f9; }
  .cards { display: flex; gap: 16px; padding: 24px; justify-content: center; flex-wrap: wrap; }
  .card { flex: 1 1 280px; max-width: 320px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; text-align: center; }
  footer { text-align: center; padding: 16px; background: #334155; color: #fff; }
  /* Се блоки шароит барои max-width: 1200px, 768px ва 480px илова кунед */
</style>`,
        task: "Саҳифаро пурра адаптив созед барои десктоп (1200px), планшет (768px) ва мобайл (480px)",
        expectedOutput: "Се @media бо ин breakpoint-ҳо",
        hint: "Се @media блок истифода баред",
        runtime: "web",
        webChecks: {
          minMediaBlocks: 3,
          contains: ["@media", "1200", "768", "480"],
        },
      },
      {
        id: "19",
        number: 19,
        title: "CSS-тағйирёбандаҳо ва :root",
        description: "var() ва темаи торик",
        theory: `Тасаввур кунед, ки **ранги сайтро** мехоҳед дар **50 ҷо** иваз кунед — бе тағйирёбанда **сахт** мешавад!

**CSS custom properties** (\`--ном\`) дар \`:root\` — мисли **тугмаи асосии рангҳо**: як ҷо иваз мекунед, **ҳама ҷо** тағйир меёбад.

\`\`\`css
:root {
  --primary: #22d3ee;
  --фон: #0f172a;
}
h1 { color: var(--primary); }
body { background: var(--фон); }
\`\`\`

**Темаи торик**: \`--фон\`-ро торик, \`--матн\`-ро равшан кунед — як блок иваз, тамоми саҳифа мутобиқ мешавад.`,
        starterCode: `<h1>Сарлавҳа</h1>
<p>Матни оддӣ дар бораи мавзӯъ.</p>
<button class="тугма">Амал</button>
<style>
  h1 { color: #0e7490; }
  p { color: #334155; }
  body { font-family: system-ui, sans-serif; margin: 0; padding: 24px; background: #f8fafc; }
  .тугма {
    background: #0e7490;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
  }
  /* Ҳамаи рангҳоро ба :root + var() гузаронед ва темаи торик илова кунед (body торик, матн равшан) */
</style>`,
        task: "Ҳамаи рангҳоро ба CSS-тағйирёбандаҳо табдил диҳед ва темаи торикро созед",
        expectedOutput: ":root бо -- ва body бо фони торик",
        hint: ":root { --primary: #22d3ee; --bg: #0f172a; } ва color: var(--primary)",
        runtime: "web",
        webChecks: {
          contains: [":root", "var(--"],
        },
      },
    ],
  },
  {
    id: "m7",
    title: "Модул 7: Мини-лоиҳаҳо 2",
    titleEn: "Mini projects 2",
    locked: false,
    capstone: true,
    lessons: [
      {
        id: "20",
        number: 20,
        title: "Лоиҳа: Корти визитӣ (Portfolio Card)",
        description: "Корти визитии онлайн бо HTML ва CSS",
        theory: `Биёед **корти визитии онлайн** созем — ин **лоиҳаи воқеии калон** аст!

Тасаввур кунед, ки **корти худро ба касе медиҳед**, вале ин **дар интернет** аст: номатон, касбатон, сурататон ва **линкҳои шумо** — ҳама дар як саҳифа.

Дар ин лоиҳа шумо **HTML** ва **CSS**-ро якҷоя истифода мебаред — мисли **витринаи хурд** дар пеши мағоза.`,
        starterCode: `<div class="card">
  <img src="https://picsum.photos/120" alt="Сурат" width="120" height="120">
  <h1>Номи шумо</h1>
  <p class="касб">Касби шумо</p>
  <p>Дар ин ҷо як-ду ҷумла дар бораи худатон нависед.</p>
  <div class="пайвандҳо">
    <a href="https://t.me/">Telegram</a>
    <a href="https://instagram.com/">Instagram</a>
  </div>
</div>
<style>
  body { font-family: system-ui, sans-serif; margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f0f4f8; }
  .card {
    max-width: 340px;
    padding: 24px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.12);
    text-align: center;
  }
  .card img { border-radius: 50%; object-fit: cover; margin-bottom: 12px; }
  .касб { color: #0891b2; font-weight: 600; margin: 8px 0; }
  .пайвандҳо { display: flex; justify-content: center; gap: 16px; margin-top: 16px; flex-wrap: wrap; }
  .пайвандҳо a { color: #059669; text-decoration: none; font-weight: 500; }
  .пайвандҳо a:hover { text-decoration: underline; }
</style>`,
        task: "Корти визитии худатонро созед бо номи худатон, касб ва 2 линки иҷтимоӣ",
        expectedOutput: "Корт бо ном, касб, сурат ва ду линк",
        hint: "Номи худро дар <h1> ва касбатонро дар <p> нависед",
        runtime: "web",
        webChecks: {
          contains: ['class="card"', "<h1", "</h1>", "<p", "border-radius", "box-shadow"],
          minAnchorCount: 2,
        },
      },
      {
        id: "21",
        number: 21,
        title: "Лоиҳа: Рӯйхати вазифаҳо (Todo List)",
        description: "Илова кардани вазифа бо JavaScript",
        theory: `Ҳар рӯз мо **корҳо дорем** — мисли **рӯйхати харид**. Биёед **барномае** созем, ки вазифаҳоро ба **рӯйхат илова** кунад.

Ин лоиҳа **HTML**, **CSS** ва **JavaScript**-ро якҷо мекунад.`,
        starterCode: `<h2>Рӯйхати корҳои ман</h2>
<input id="matn" type="text" placeholder="Вазифаи нав нависед...">
<button type="button" onclick="addTask()">Илова кардан</button>
<ul id="рӯйхат"></ul>
<style>
  body { font-family: system-ui, sans-serif; max-width: 420px; margin: 24px auto; padding: 0 16px; }
  h2 { color: #0f766e; }
  input, button { font-size: 1rem; padding: 10px 14px; margin: 8px 4px 8px 0; border-radius: 8px; border: 1px solid #ccc; }
  button { background: #0d9488; color: #fff; border: none; cursor: pointer; }
  button:hover { background: #0f766e; }
  ul { list-style: disc; padding-left: 24px; margin-top: 16px; }
  li { margin: 6px 0; }
</style>
<script>
function addTask() {
  let матн = document.getElementById("matn").value;
  if (!матн.trim()) return;
  // ин ҷо: элементи li созед, матнро гузоред, ба рӯйхат (#рӯйхат) илова кунед, input-ро пок кунед
}
</script>`,
        task: "Функсияи addTask()-ро пурра кунед, ки вазифаи навро ба рӯйхат илова кунад",
        expectedOutput: "Пахш карда — сатри нав дар рӯйхат",
        hint: "document.createElement('li') ва appendChild() истифода баред",
        runtime: "web",
        webChecks: {
          contains: ["function addtask", "createelement", "appendchild", "getelementbyid"],
        },
      },
      {
        id: "22",
        number: 22,
        title: "Лоиҳа: Ҳисобкунаки асъор (Currency Calculator)",
        description: "Сомонӣ ба доллар, рубл ва евро",
        theory: `Дар **бозор** асъор иваз мекунанд — мисли **тарозу**. Биёед **ҳисобкунак** созем: **сомонӣ** ба **доллар**, **рубл**, **евро**.

**1 USD = 11 сомонӣ**, **1 RUB = 0.12 сомонӣ**, **1 EUR = 12 сомонӣ**.`,
        starterCode: `<h3>💱 Ҳисобкунаки асъор</h3>
<p>Маблағро бо сомонӣ ворид кунед ва асъорро интихоб кунед.</p>
<label>Сомонӣ: <input id="маблағ" type="number" value="110"></label><br><br>
<label>Асъор:
  <select id="асъор">
    <option value="USD">Доллар (USD)</option>
    <option value="RUB">Рубл (RUB)</option>
    <option value="EUR">Евро (EUR)</option>
  </select>
</label><br><br>
<button type="button" onclick="табдил()">Ҳисоб кардан</button>
<p id="натиҷа"></p>
<style>
  body { font-family: system-ui, sans-serif; max-width: 400px; margin: 24px auto; padding: 16px; }
  input, select, button { font-size: 1rem; padding: 8px; margin: 4px 0; border-radius: 8px; }
  button { background: #0369a1; color: #fff; border: none; cursor: pointer; }
  #натиҷа { margin-top: 16px; font-weight: bold; color: #047857; }
</style>
<script>
const курсҳо = { USD: 11, RUB: 0.12, EUR: 12 };
function табдил() {
  let маблағ = Number(document.getElementById("маблағ").value);
  let асъор = document.getElementById("асъор").value;
  // ин ҷо: маблағро ба қиммати курс тақсим кунед (аз объекти курсҳо) ва дар #натиҷа нишон диҳед
  document.getElementById("натиҷа").innerText = "";
}
</script>`,
        task: "Функсияи табдилро пурра кунед: 1 USD = 11 сомонӣ, 1 RUB = 0.12 сомонӣ, 1 EUR = 12 сомонӣ",
        expectedOutput: "Бо 110 сомонӣ ва USD — натиҷаи дуруст",
        hint: "натиҷа = маблағ / курсҳо[асъор]",
        runtime: "web",
        webChecks: {
          contains: ["табдил", "курсҳо", "11", "0.12", "12", "getelementbyid", "innertext", "number(", "курсҳо["],
        },
      },
      {
        id: "23",
        number: 23,
        title: "Лоиҳа: Саҳифаи фурӯш (Landing Page)",
        description: "Лоиҳаи ниҳоӣ ва гувоҳнома",
        theory: `Тасаввур кунед, ки шумо **маҳсулот мефурӯшед** ва мехоҳед **сайт дошта бошед**.

Ин **лоиҳаи ниҳоии курс** аст: **ҳамаи донишатон** — сарлавҳа, кортҳо, **тугма**, **ранг**, **JavaScript** барои форм.

Пас аз анҷом **гувоҳномаи Сайтсозӣ**-ро мегиред! 🎓`,
        starterCode: `<header class="hero">
  <h1>Нонҳои хонагӣ «Табарак»</h1>
  <p>Тоза ҳар рӯз — фармоиш бо телефон</p>
  <button type="button">Фармоиш додан</button>
</header>
<section class="имкониятҳо">
  <h2>Чаро мо?</h2>
  <div class="кортҳо">
    <div class="корт"><h3>Тозагӣ</h3><p>Матни кӯтоҳ дар бораи сифат.</p></div>
    <div class="корт"><h3>Нархи одилона</h3><p>Матни кӯтоҳ.</p></div>
    <div class="корт"><h3>Расондан</h3><p>Матни кӯтоҳ.</p></div>
  </div>
</section>
<section class="алока">
  <h2>Пайваст шавед</h2>
  <label>Ном: <input id="ном" type="text"></label><br><br>
  <label>Почта: <input id="почта" type="email"></label><br><br>
  <button type="button" onclick="санҷиш()">Ирсол</button>
</section>
<footer><p>© 2026 — Сайти намунавӣ</p></footer>
<style>
  body { font-family: system-ui, sans-serif; margin: 0; line-height: 1.5; color: #1e293b; }
  .hero { background: linear-gradient(135deg, #0e7490, #059669); color: #fff; padding: 48px 24px; text-align: center; }
  .hero h1 { margin: 0 0 12px; }
  .hero button { margin-top: 16px; padding: 12px 24px; font-size: 1rem; border: none; border-radius: 999px; cursor: pointer; background: #fff; color: #0e7490; font-weight: 600; }
  .имкониятҳо { padding: 40px 24px; max-width: 900px; margin: 0 auto; }
  .кортҳо { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; margin-top: 20px; }
  .корт { flex: 1 1 200px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; background: #f8fafc; }
  .алока { padding: 40px 24px; background: #f1f5f9; text-align: center; }
  .алока input { min-width: 220px; padding: 8px; border-radius: 8px; border: 1px solid #cbd5e1; }
  .алока button { margin-top: 12px; padding: 10px 20px; border-radius: 8px; border: none; background: #0d9488; color: #fff; cursor: pointer; font-weight: 600; }
  footer { text-align: center; padding: 24px; font-size: 0.875rem; color: #64748b; }
</style>
<script>
function санҷиш() {
  let ном = document.getElementById("ном").value;
  // ин ҷо: агар ном холӣ бошад, alert бо паёми «Лутфан номро ворид кунед»
}
</script>`,
        task: "Саҳифаи фурӯшро барои маҳсулоти худатон созед ва валидатсияи формро илова кунед",
        expectedOutput: "Агар ном холӣ — alert",
        hint: "if (ном === '') { alert('Лутфан номро ворид кунед') } истифода баред",
        runtime: "web",
        webChecks: {
          contains: ["function санҷиш", "getelementbyid", "ном", "if", "alert(", "лутфан номро"],
        },
      },
    ],
  },
];
