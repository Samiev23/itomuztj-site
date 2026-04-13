import type { LessonModuleInput } from "./lessonPremium";

/** Модул 6: JavaScript ва DOM — дарсҳои 34–40 */
export const webModule6JsDom: LessonModuleInput = {
  id: "m6",
  title: "Модул 6: JavaScript ва DOM",
  titleEn: "JavaScript ва DOM",
  locked: false,
  lessons: [
    {
      id: "34",
      number: 34,
      title: "DOM чист?",
      description: "document, getElementById, querySelector",
      theory: `**DOM** — ин **нақшаи сайти шумо дар хотираи браузер**.

Тасаввур кунед, ки сайт **як дарахт** аст 🌳 — \`html\` **решааш**, \`body\` **танааш**, \`div\` ва \`p\` **шохаҳояш**. **JavaScript** метавонад ҳар як шохро **ёбад**, **тағйир диҳад** ё **нест кунад**!

- Объекти \`document\` — даромадгоҳ ба ҳамаи саҳифа.
- \`document.getElementById('id')\` — элементро бо **id** меёбад.
- \`document.querySelector('.класс')\` — аввалин элементи мувофиқи **CSS-селектор**.
- \`innerHTML\` — **HTML дохил**; \`textContent\` — **танҳо матн** (амният беҳтар).`,
      starterCode: `<h1 id="title">Салом</h1>
<p>Матни оддӣ дар бораи саҳифа.</p>
<button type="button" id="тугма">Тағйир додан</button>
<script>
// вақти пахши тугма: матни #title-ро ба «Хуш омадед!» гузоред (textContent ё innerHTML)
</script>`,
      task: "Бо пахши тугма матни сарлавҳаро аз «Салом» ба «Хуш омадед!» тағйир диҳед",
      expectedOutput: "Пахш — сарлавҳа Хуш омадед!",
      hint: "document.getElementById('title').textContent = 'Хуш омадед!'",
      runtime: "web",
      webChecks: {
        contains: ["getelementbyid", "textcontent", "хуш омадед", "click"],
      },
    },
    {
      id: "35",
      number: 35,
      title: "Элементҳоро тағйир додан",
      description: "style, className, classList",
      theory: `Бо **DOM** шумо метавонед **ҳар чизро дар саҳифа** тағйир диҳед — матн, ранг, андоза, сурат.

Мисли **сеҳргар** — як дастур ва ҳама чиз иваз мешавад! ✨

- \`element.style.color\`, \`backgroundColor\`, \`fontSize\` — ранг ва ҳарф (ба инглисӣ номи хосият).
- \`element.className\` — номи пурраи класс.
- \`element.classList.add()\` / \`remove()\` / \`toggle()\` — классро осон идора кунед.
- \`setAttribute('nom', 'қиммат')\` — атрибут гузоштан.`,
      starterCode: `<div id="корт" class="корт оддӣ">
  <p id="матн">Матни корт</p>
</div>
<button type="button" id="б1">Ранги сурх</button>
<button type="button" id="б2">Ҳарфи калон</button>
<button type="button" id="б3">Класс иваз</button>
<style>
  .корт { padding: 16px; border-radius: 12px; border: 2px solid #ccc; max-width: 280px; margin-bottom: 12px; }
  .оддӣ { background: #f1f5f9; }
  .зебо { background: #d1fae5; border-color: #059669; }
</style>
<script>
const корт = document.getElementById("корт");
const матн = document.getElementById("матн");
// ба ҳар тугма addEventListener: (1) ранги матн сурх (2) андозаи калони ҳарф (3) className ё classList барои класси зебо
</script>`,
      task: "3 тугма созед (ё пайваст кунед): яке рангро сурх кунад, яке фонтро калон кунад, яке классро ба «зебо» иваз кунад",
      expectedOutput: "style ва classList дар амал",
      hint: "element.style.color = 'red' ва element.style.fontSize = '24px'",
      runtime: "web",
      webChecks: {
        contains: ["addeventlistener", ".style.color", ".style.fontsize", "classlist"],
        containsLiteral: ["red", "24px"],
      },
    },
    {
      id: "36",
      number: 36,
      title: "Рӯйдодҳо (Events)",
      description: "addEventListener ва рӯйдодҳо",
      theory: `**Рӯйдод** — ин «**чӣ шуд?**».

Корбар **тугмаро пахш кард** — ин рӯйдод! **Муш ҳаракат кард** — рӯйдод! **Клавиша зад** — рӯйдод!

\`addEventListener\` мегӯяд: «**Вақте ки ИН шавад**, **ИН корро кун**!»

Рӯйдодҳои маъмул: \`click\`, \`mouseover\`, \`mouseout\`, \`keydown\`, \`input\`, \`submit\`.

Объекти \`event\` (\`e\`) — маълумот дар бораи рӯйдод. \`e.preventDefault()\` — амали пешфарзро бозмедоред (масалан фиристодани форм).`,
      starterCode: `<label>Нависед:</label>
<input type="text" id="вуруд" placeholder="Матн...">
<p>Дар вақти воқеӣ:</p>
<p id="намоиш">—</p>
<script>
const вуруд = document.getElementById("вуруд");
const намоиш = document.getElementById("намоиш");
// руйдоди навиштан — қиммати вурудро ба намоиш гузоред
</script>`,
      task: "Вақте ки корбар дар input менависад, матн дар поён дар вақти воқеӣ нишон дода шавад (live preview)",
      expectedOutput: "input → намоиш",
      hint: "вуруд.addEventListener('input', function(e) { намоиш.textContent = e.target.value })",
      runtime: "web",
      webChecks: {
        contains: ["addeventlistener", "e.target.value"],
      },
    },
    {
      id: "37",
      number: 37,
      title: "Элементҳоро сохтан ва нест кардан",
      description: "createElement, appendChild, remove",
      theory: `Шумо метавонед **элементҳои нав** аз нав созед ва ба саҳифа илова кунед — **бе тағйири HTML-и файл**!

Мисли **хиштро гузоштан ба девор**: \`createElement\` → дохилашро пур кунед → \`appendChild\`!

- \`removeChild()\` — фарзандро аз волид нест мекунад.
- \`insertBefore()\` — пеш аз элементи дигар мегузорад.
- \`element.remove()\` — худи элементро нест мекунад.`,
      starterCode: `<p>Рӯйхати харид:</p>
<input type="text" id="ном" placeholder="Номи маҳсулот">
<button type="button" id="илова">Илова</button>
<ul id="рӯйхат"></ul>
<script>
const рӯйхат = document.getElementById("рӯйхат");
const ном = document.getElementById("ном");
document.getElementById("илова").addEventListener("click", function () {
  // сатри рӯйхат созед, матн гузоред, тугмаи ✕ барои нест кардан, ба рӯйхат илова кунед
});
</script>`,
      task: "Рӯйхати харид: ном менависад, илова мезанад → сатр ба рӯйхат; тугмаи ✕ ҳар сатрро нест кунад",
      expectedOutput: "createElement, appendChild, remove",
      hint: "let li = document.createElement('li'); li.textContent = ...; list.appendChild(li)",
      runtime: "web",
      webChecks: {
        contains: ["createelement", "appendchild", "remove"],
        containsLiteral: ["createElement("],
      },
    },
    {
      id: "38",
      number: 38,
      title: "Формаҳо бо JavaScript",
      description: "submit, preventDefault, валидатсия",
      theory: `**Формаҳо** дар ҳама ҷо ҳастанд — логин, сабти ном, тамос.

**JavaScript** метавонад формаро **тафтиш кунад ПЕШ аз фиристодан**: Оё ном навишта шуд? Оё email дуруст аст? Ин **валидатсия** ном дорад.

- Рӯйдоди \`submit\` дар элементи \`form\`.
- \`e.preventDefault()\` — фиристодани пешфарзро бозмедоред, то худатон санҷед.
- Паёмҳои хато дар \`div\` ё \`p\` нишон диҳед.`,
      starterCode: `<form id="алоқа">
  <p><label>Ном: <input type="text" id="номиФорм"></label></p>
  <p><label>Email: <input type="text" id="emailФорм"></label></p>
  <p><label>Паём: <textarea id="паёмФорм" rows="3"></textarea></label></p>
  <p id="хато" style="color:#b91c1c;font-weight:bold;"></p>
  <button type="submit">Ирсол</button>
</form>
<script>
document.getElementById("алоқа").addEventListener("submit", function (e) {
  // ин ҷо: e.preventDefault() ва санҷиши ном, email ва дарозии паём (на камтар аз 10)
});
</script>`,
      task: "Валидатсия: ном набояд холӣ бошад, email бояд @ дошта бошад, паём камтар аз 10 ҳарф набошад",
      expectedOutput: "preventDefault ва се санҷиш",
      hint: "if (ном === '') { document.getElementById('хато').textContent = 'Номро ворид кунед' }",
      runtime: "web",
      webChecks: {
        contains: ["preventdefault", "includes(", "length", "10"],
        containsLiteral: ["@"],
      },
    },
    {
      id: "39",
      number: 39,
      title: "localStorage — хотираи браузер",
      description: "setItem, getItem, JSON",
      theory: `Вақте ки саҳифаро **аз нав мекунед**, ҳама маълумоти JS-и дохили саҳифа **нест мешавад**!

**localStorage** ин мушкилро ҳал мекунад — маълумотро дар **браузер** нигоҳ медорад. Мисли **дафтарчае**, ки ҳеҷ гум намешавад 📓

- \`localStorage.setItem('калид', 'матн')\`
- \`localStorage.getItem('калид')\`
- \`localStorage.removeItem('калид')\`

Барои **массив** ё **объект**: \`JSON.stringify()\` пеш аз нигоҳдорӣ, \`JSON.parse()\` баъд аз гирифтан.`,
      starterCode: `<textarea id="ёддошт" rows="4" cols="40" placeholder="Ёддоштҳои шумо..."></textarea><br>
<button type="button" id="нигоҳ">Нигоҳ доштан</button>
<p id="вазъият"></p>
<script>
// вақте ки «Нигоҳ доштан» пахш мешавад — матнро дар localStorage гузоред. вақте ки саҳифа бор мешавад — аз localStorage бихонед ва дар textarea нишон диҳед
</script>`,
      task: "Барномаи ёддоштро такмил диҳед: пас аз refresh матн нест нашавад",
      expectedOutput: "setItem, getItem",
      hint: "localStorage.setItem('ёддоштҳо', document.getElementById('ёддошт').value) — ва ҳангоми бор DOMContentLoaded getItem",
      runtime: "web",
      webChecks: {
        contains: ["localstorage", "setitem", "getitem", "domcontentloaded"],
      },
    },
    {
      id: "40",
      number: 40,
      title: "Fetch ва API",
      description: "fetch, JSON, async",
      theory: `**API** — ин **пешхизматчии интернет** 🤵 Шумо мегӯед: «**Маълумот деҳ!**» — ва API ҷавоб медиҳад.

\`fetch()\` ин **дархостро мефиристад**. Масалан, рӯйхати корбарон ё обу ҳаво.

- \`.then(response => response.json())\` — ҷавобро ба объекти JS табдил медиҳад.
- \`async/await\` — ҳамон кор, вале хондан осонтар.
- Ҳамеша **хатогирӣ** (сатри шабакавӣ) фикр кунед — паёми «Бор шуда истодааст…» ё хато.`,
      starterCode: `<button type="button" id="бор">Гирифтани корбарон</button>
<pre id="натиҷа" style="background:#f1f5f9;padding:12px;border-radius:8px;max-height:240px;overflow:auto;">Пахш кунед…</pre>
<script>
document.getElementById("бор").addEventListener("click", function () {
  // API-и корбаронро бигиред, json() кунед, дар #натиҷа нишон диҳед
});
</script>`,
      task: "Аз API рӯйхати корбаронро гиред ва дар саҳифа нишон диҳед (https://jsonplaceholder.typicode.com/users)",
      expectedOutput: "fetch ва users",
      hint: "fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()).then(data => { … })",
      runtime: "web",
      webChecks: {
        contains: ["fetch(", "jsonplaceholder", ".json("],
      },
    },
  ],
};
