import type { LessonModule } from "./lessonTypes";

/** Модул 5: JavaScript асосӣ — дарсҳои 26–33 */
export const webModule5JsBasics: LessonModule = {
  id: "m5",
  title: "Модул 5: JavaScript асосӣ",
  titleEn: "Асосҳои JavaScript",
  locked: false,
  lessons: [
    {
      id: "26",
      number: 26,
      title: "JavaScript чист ва чаро лозим?",
      description: "Тугма, alert ва теги script",
      theory: `**HTML** — ин **ҷисми одам**, **CSS** — ин **либос**, **JavaScript** — ин **мағз**!

Бе JS сайт мисли **манекен** аст — **зебо**, вале **ҳеҷ кор карда наметавонад**. JS **тугмаҳоро зинда** мекунад, **маълумотро тағйир** медиҳад ва бо **корбар сӯҳбат** мекунад.

- Теги \`<script>\` — дар ин ҷо **коди JS** менависед (одатан дар поёни \`body\`).
- \`console.log("салом")\` — дар **консол** чиз мепечонад (барои санҷиш).
- \`alert("салом")\` — **паёмчаи хурд** ба корбар нишон медиҳад.

Мисли **занг задан ба дар**: як пахш — ҷавоб омад!`,
      starterCode: `<button>Пахш кунед</button>
<script>
// ин ҷо код нависед — вақти пахш alert нишон диҳад
</script>`,
      task: "Тугмаро зинда кунед — вақти пахш кардан alert('Салом!') нишон диҳад",
      expectedOutput: "Пахш — паёми Салом",
      hint: 'onclick="alert(\'Салом!\')" истифода баред',
      runtime: "web",
      webChecks: {
        contains: ["onclick", "alert(", "салом"],
      },
    },
    {
      id: "27",
      number: 27,
      title: "Тағйирёбандаҳо: let, const, var",
      description: "let, const ва намоиш дар саҳифа",
      theory: `Боз **ҳамон халтаҳои бозор**!

- **\`let\`** — халтаи **кушода**: чизро дохил мекунед, **иваз** карда метавонед.
- **\`const\`** — халтаи **қулфшуда**: як бор гузоштед — **иваз намешавад** (мисли рақами паспорт).
- **\`var\`** — халтаи **кӯҳна** — дар курсҳои нав **истифода набаред**, \`let\` ва \`const\` беҳтаранд.

Дар JS тағйирёбандаҳо **ҳама чизро** нигоҳ медоранд: **матн** (String), **рақам** (Number), **дуруст/нодуруст** (Boolean).

**Template literals** — матн бо \`\${ном}\` дохил кардани тағйирёбанда.

\`typeof\` мегӯяд: ин чӣ навъ аст?`,
      starterCode: `<p>Ном: <span id="ном">—</span></p>
<p>Син: <span id="син">—</span></p>
<p>Шаҳр: <span id="шаҳр">—</span></p>
<script>
// ин ҷо се тағйирёбанда эълон кунед ва spanҳо-ро пур кунед
</script>`,
      task: "3 тағйирёбанда созед (ном, син, шаҳр) ва дар саҳифа нишон диҳед",
      expectedOutput: "Се маълумот дар span",
      hint: "document.getElementById('ном').innerText = ном",
      runtime: "web",
      webChecks: {
        contains: ["let", "const", "getelementbyid", "innertext"],
        containsLiteral: ["ном=", "син=", "шаҳр="],
      },
    },
    {
      id: "28",
      number: 28,
      title: "Шартҳо: if, else, else if",
      description: "Чароғаки роҳ дар код",
      theory: `**Чароғаки роҳ боз!** 🚦

- **\`if\`** — **агар сабз** бошад, мерав.
- **\`else\`** — **агар не**, меист.
- **\`else if\`** — **агар зард** бошад, эҳтиёт шав!

Компютер ҳам **ҳамин тавр қарор** мегирад.

Операторҳои муқоиса: \`<\`, \`>\`, \`<=\`, \`>=\`, \`===\`, \`!==\`.

Логикӣ: **\`&&\`** (ҳамагӣ), **\`||\`** (яке), **\`!\`** (на).`,
      starterCode: `<label>Синатон:</label>
<input id="син" type="number" value="10">
<button type="button" onclick="санҷишСин()">Санҷиш</button>
<p id="натиҷа"></p>
<script>
function санҷишСин() {
  let син = Number(document.getElementById("син").value);
  let натиҷа = "";
  // шартҳо барои син < 7, < 18 ва калонсол
  document.getElementById("натиҷа").innerText = натиҷа;
}
</script>`,
      task: "Функсия нависед: агар син < 7 «Кӯдак», агар < 18 «Наврас», агар >= 18 «Калонсол» нишон диҳад",
      expectedOutput: "Се гурӯҳи син",
      hint: "if (син < 7) { натиҷа = 'Кӯдак' } else if…",
      runtime: "web",
      webChecks: {
        contains: ["if", "else", "син", "кӯдак", "наврас", "калонсол", "getelementbyid"],
        containsLiteral: ["if ("],
      },
    },
    {
      id: "29",
      number: 29,
      title: "Давраҳо: for ва while",
      description: "Такрор бе дасти хаста",
      theory: `**100 мактуб** як-як навиштан — **вақти зиёд**! **Давра** мегӯяд: «Ин корро **100 маротиба** такрор кун!»

- **\`for\`** — вақте ки **шумораро медонед** (\`for (let i = 1; i <= 10; i++)\`).
- **\`while\`** — **то вақте** ки шарт дуруст аст.
- **\`for...of\`** — барои **ҳар элементи рӯйхат**.

**\`break\`** — аз давра мебарояд, **\`continue\`** — ба давраи оянда мепарда.`,
      starterCode: `<p>Рақамҳои 1 то 10:</p>
<ul id="рӯйхат"></ul>
<script>
let рӯйхат = document.getElementById("рӯйхат");
// ин ҷо аз 1 то 10 ҳар рақамро ҳамчун сатри рӯйхат илова кунед
</script>`,
      task: "Бо давраи for рақамҳои 1-то-10-ро дар рӯйхат (<li>) нишон диҳед",
      expectedOutput: "10 сатр дар ul",
      hint: "for (let i = 1; i <= 10; i++) { … createElement('li') … }",
      runtime: "web",
      webChecks: {
        contains: ["<=", "10", "createelement", "appendchild"],
        containsLiteral: ["for ("],
        minLiCount: 10,
      },
    },
    {
      id: "30",
      number: 30,
      title: "Функсияҳо",
      description: "Рецепт дар JavaScript",
      theory: `**Рецепти плов** боз! **Як маротиба менависед**, **борҳо истифода мебаред**.

\`function\` — ин **рецепт** дар JS. **Параметр** медиҳед (масалан чанд кас?) ва **натиҷа** (\`return\`) мегиред.

**Функсияи стрелка** (\`=>\`) — навиштани кӯтоҳ.

Функсияро **ном бурда** кор мекунед: \`ҷамъ(2, 3)\`.`,
      starterCode: `<label>А:</label> <input id="а" type="number" value="5">
<label>Б:</label> <input id="б" type="number" value="7">
<button type="button" onclick="нишонДиҳ()">Ҷамъ кун</button>
<p>Натиҷа: <span id="натиҷа">—</span></p>
<script>
function нишонДиҳ() {
  let а = Number(document.getElementById("а").value);
  let б = Number(document.getElementById("б").value);
}
</script>`,
      task: "Функсияи ҷамъ(а, б) нависед, ки ду рақамро ҷамъ кунад ва натиҷаро дар саҳифа нишон диҳад",
      expectedOutput: "12 бо 5+7",
      hint: "function ҷамъ(а, б) { return а + б }",
      runtime: "web",
      webChecks: {
        contains: ["function", "ҷамъ", "return", "getelementbyid", "innertext", "+"],
        containsLiteral: ["ҷамъ("],
      },
    },
    {
      id: "31",
      number: 31,
      title: "Массивҳо (Array)",
      description: "Рӯйхати тартибнок",
      theory: `**Қатор дар бозор** — ҳар кас **рақами навбат** дорад: **0, 1, 2, 3…**

**Массив** дар JS ҳамин аст — **рӯйхати тартибнок**!

- \`push\` — **охир илова** кардан
- \`pop\` — **охир бардоштан**
- \`length\` — **чандта аст**
- \`forEach\`, \`map\`, \`filter\` — бо ҳар элемент кор кардан`,
      starterCode: `<input id="мева" type="text" placeholder="Номи мева">
<button type="button" onclick="илова()">Илова</button>
<p>Шумора: <span id="шумора">0</span></p>
<ul id="рӯйхат"></ul>
<script>
let меваҳо = [];
function илова() {
  // аз вуруд мегиред, ба массив илова мекунед, рӯйхатро аз нав месозед
}
function навКунонРӯйхат() {
  // рӯйхатро пок кунед, ба ҳар элемент як сатр илова кунед
}
</script>`,
      task: "Рӯйхати мевадорро созед: илова кардан, нишон додан ва шумораи умумиро ҳисоб кардан",
      expectedOutput: "push ва forEach",
      hint: "меваҳо.push(меваиНав) ва forEach барои нишон додан",
      runtime: "web",
      webChecks: {
        contains: ["push", "foreach", "getelementbyid"],
        containsLiteral: [".push(", ".foreach("],
      },
    },
    {
      id: "32",
      number: 32,
      title: "Объектҳо (Object)",
      description: "Паспорт дар код",
      theory: `**Паспорти шумо** чӣ дорад? **Ном**, **фамилия**, **син**, **суратчасп**.

**Объект** дар JS ҳамин аст — **маҷмӯаи маълумот бо номҳо**!

\`\`\`javascript
{ ном: "Аҳмад", син: 25, шаҳр: "Душанбе" }
\`\`\`

**Нуқта** (\`талаба.ном\`) ё **қавс** (\`талаба["ном"]\`).

\`Object.keys\`, \`Object.values\` — рӯйхати калидҳо ва қимматҳо.`,
      starterCode: `<div class="корт">
  <h2 id="номиКорт">—</h2>
  <p>Син: <span id="синКорт">—</span></p>
  <p>Курс: <span id="курсКорт">—</span></p>
</div>
<style>.корт { max-width: 280px; padding: 16px; border: 1px solid #ccc; border-radius: 12px; }</style>
<script>
// ин ҷо объекти профил эълон кунед ва маълумотро дар корт нишон диҳед
</script>`,
      task: "Объекти «талаба» созед бо ном, син, курс, ва маълумотро дар корти профил нишон диҳед",
      expectedOutput: "Объект ва innerText",
      hint: "const талаба = { ном: 'Номи шумо', син: 20, курс: 1 }",
      runtime: "web",
      webChecks: {
        contains: ["getelementbyid", "innertext", "const"],
        containsLiteral: ["const талаба", "ном:", "син:", "курс:"],
      },
    },
    {
      id: "33",
      number: 33,
      title: "Scope ва хатогирӣ (try/catch)",
      description: "Ҳудуд ва амният",
      theory: `**Scope** — ин **ҳудуд**. Тағйирёбанда дар **дохили функсия** «зиндагӣ мекунад» — **берун аз он намебинед**!

**Глобалӣ** — ҳама ҷо; **локалӣ** — танҳо дар блоки худ.

**\`try / catch\`** — **тӯри амният**: агар **хато** шавад, барнома **намеистад**, балки хаторо **мегирад** ва мешуморад.

**\`finally\`** — ҳамеша иҷро мешавад.`,
      starterCode: `<button type="button" onclick="тест()">Санҷиш</button>
<p id="хабар"></p>
<script>
function тест() {
  if (true) {
    let хурд = "танҳо дар блок";
  }
  document.getElementById("хабар").innerText = хурд;

  let нодуруст = "{ ном: ";
  JSON.parse(нодуруст);
}
</script>`,
      task: "Хатоҳои scope-ро ислоҳ кунед ва try/catch илова кунед, ки барнома наистад",
      expectedOutput: "try, catch, scope дуруст",
      hint: "Тағйирёбандаро дар ҷои дуруст эълон кунед ва try { … } catch(e) { console.log(e) }",
      runtime: "web",
      webChecks: {
        contains: ["try", "catch", "console.log"],
      },
    },
  ],
};
