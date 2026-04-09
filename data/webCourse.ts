import type { LessonModule } from "./lessonTypes";

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
];
