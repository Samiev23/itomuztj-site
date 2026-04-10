import type { LessonModule } from "./lessonTypes";

/** Модул 7: Мини-лоиҳаҳо 2 — дарсҳои 41–44 */
export const webModule7MiniProjects2: LessonModule = {
  id: "m7",
  title: "Модул 7: Мини-лоиҳаҳо 2",
  titleEn: "Лоиҳаҳои амалӣ",
  locked: false,
  lessons: [
    {
      id: "41",
      number: 41,
      title: "Лоиҳа: Рӯйхати вазифаҳо (Todo App)",
      description: "Todo бо филтр ва localStorage",
      theory: `Биёед **барномаи пурраи рӯйхати корҳоро** созем!

Ин лоиҳа **ҳамаи чизҳои омӯхтаро** истифода мебарад: **HTML** барои шакл, **CSS** барои зебоӣ, **JS** барои логика, **DOM** барои тағйирот дар саҳифа ва **localStorage** барои нигоҳдорӣ дар браузер.

**Вазифа илова кунед** ✅, **тамом кунед** ☑️, **нест кунед** ❌ — ва **пас аз refresh ҳама чиз боқӣ мемонад**!

Филтрҳо: **Ҳама** / **Фаъол** (навбатдор) / **Тамомшуда**.`,
      starterCode: `<div class="барнома">
  <h2>✅ Рӯйхати корҳо</h2>
  <div class="вуруд">
    <input type="text" id="матнВазифа" placeholder="Вазифаи нав...">
    <button type="button" id="илова">Илова</button>
  </div>
  <div class="филтрҳо">
    <button type="button" data-навбат="ҳама">Ҳама</button>
    <button type="button" data-навбат="фаъол">Фаъол</button>
    <button type="button" data-навбат="тамом">Тамомшуда</button>
  </div>
  <ul id="рӯйхат"></ul>
</div>
<style>
  .барнома { max-width: 420px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif; }
  h2 { color: #0f766e; margin-top: 0; }
  .вуруд { display: flex; gap: 8px; margin-bottom: 12px; }
  .вуруд input { flex: 1; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1; }
  .вуруд button, .филтрҳо button { padding: 8px 14px; border-radius: 8px; border: none; background: #0d9488; color: #fff; cursor: pointer; font-weight: 600; }
  .филтрҳо { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
  .филтрҳо button { background: #64748b; }
  .филтрҳо button.интихобшуда { background: #0d9488; }
  #рӯйхат { list-style: none; padding: 0; margin: 0; }
  #рӯйхат li { display: flex; align-items: center; gap: 8px; padding: 10px; margin-bottom: 8px; background: #f1f5f9; border-radius: 8px; border: 1px solid #e2e8f0; }
  #рӯйхат li.кориТамом { opacity: 0.65; text-decoration: line-through; }
  #рӯйхат button { padding: 4px 10px; font-size: 0.85rem; }
</style>
<script>
let вазифаҳо = [];
let навбатиНамоиш = "ҳама";

document.getElementById("илова").addEventListener("click", function () {
  // вазифаи нав ба массив, нигоҳдорӣ дар хотира, навсозии рӯйхат
});
document.querySelectorAll(".филтрҳо button").forEach(function (б) {
  б.addEventListener("click", function () {
    навбатиНамоиш = б.getAttribute("data-навбат");
    document.querySelectorAll(".филтрҳо button").forEach(function (x) { x.classList.remove("интихобшуда"); });
    б.classList.add("интихобшуда");
    // рӯйхатро аз нав кашед
  });
});
// ҳангоми бор: аз localStorage бихонед, рӯйхат кашед
</script>`,
      task: "Барномаро пурра кунед: илова, нест, тамомкунӣ (класси кориТамом), филтрҳо ва нигоҳдорӣ дар localStorage бо JSON",
      expectedOutput: "Todo бо филтр ва JSON дар localStorage",
      hint: "Массиви вазифаҳоро дар localStorage бо JSON.stringify нигоҳ доред",
      runtime: "web",
      webChecks: {
        contains: ["localstorage", "json.stringify", "json.parse", "createelement", "appendchild", ".push("],
      },
    },
    {
      id: "42",
      number: 42,
      title: "Лоиҳа: Обу ҳавои шаҳр (Weather App)",
      description: "fetch ва API-и wttr.in",
      theory: `Биёед **барнома** созем, ки **обу ҳавои ҳар шаҳрро** нишон диҳад!

Ин лоиҳа **fetch** ва **API**-ро дар амал истифода мебарад. Корбар **номи шаҳрро** менависад — барнома **ҳарорат**, **вазъият** ва матни вазъиятро нишон медиҳад.

Мо аз **API-и бепули wttr.in** бо формати **JSON** (\`format=j1\`) истифода мебарем.

**Эзоҳ:** баъзе браузерҳо барои дархостҳои беруна **CORS** мегузоранд ё намегузоранд; агар дар пешнамоиш хато бинед, коди шумо ҳамоно дуруст аст — санҷишро бо «Иҷро» гузаронед.`,
      starterCode: `<div class="обуҳаво">
  <h2>🌤 Обу ҳаво</h2>
  <div class="ҷустуҷӯ">
    <input type="text" id="шаҳр" placeholder="Масалан: Dushanbe" value="Dushanbe">
    <button type="button" id="ҷустуҷӯ">Ҷустуҷӯ</button>
  </div>
  <div id="корт" class="корт">
    <p id="шаҳрНом">Шаҳрро интихоб кунед</p>
    <p id="ҳарорат">—</p>
    <p id="вазъият">—</p>
  </div>
</div>
<style>
  .обуҳаво { max-width: 360px; margin: 0 auto; padding: 24px; font-family: system-ui, sans-serif; text-align: center; }
  h2 { color: #0369a1; }
  .ҷустуҷӯ { display: flex; gap: 8px; justify-content: center; margin-bottom: 20px; }
  .ҷустуҷӯ input { padding: 10px 14px; border-radius: 10px; border: 1px solid #cbd5e1; width: 160px; }
  .ҷустуҷӯ button { padding: 10px 18px; border-radius: 10px; border: none; background: #0284c7; color: #fff; font-weight: 600; cursor: pointer; }
  .корт { background: linear-gradient(160deg, #e0f2fe, #bae6fd); border-radius: 16px; padding: 24px; box-shadow: 0 8px 24px rgba(3,105,161,0.15); }
  #ҳарорат { font-size: 2.5rem; font-weight: 800; margin: 8px 0; color: #0c4a6e; }
  #вазъият { color: #334155; font-size: 1.1rem; }
</style>
<script>
document.getElementById("ҷустуҷӯ").addEventListener("click", function () {
  let шаҳр = document.getElementById("шаҳр").value.trim();
  if (!шаҳр) return;
  // дархост ба сервиси обу ҳаво бо format=j1, баъд .json() — ҳарорат ва тавсифро дар элементҳо гузоред
});
</script>`,
      task: "Функсияи ҷустуҷӯро пурра кунед: номи шаҳрро гиред, аз API маълумот оваред ва дар карт нишон диҳед",
      expectedOutput: "fetch → wttr.in → ҳарорат ва вазъият",
      hint: "fetch(\`https://wttr.in/\${шаҳр}?format=j1\`).then(r => r.json()).then(data => { … })",
      runtime: "web",
      webChecks: {
        contains: ["fetch(", "wttr.in", ".json(", "temp_c", "weatherdesc"],
      },
    },
    {
      id: "43",
      number: 43,
      title: "Лоиҳа: Quiz-бозӣ",
      description: "Саволҳо, балл, DOM",
      theory: `**Ҳама бозиро дӯст медоранд!**

Биёед **Quiz-бозии IT** созем — **саволҳо бо чор ҷавоб**, **ҳисоби балл** ва **натиҷаи ниҳоӣ**.

Ин лоиҳа **массивҳо**, **объектҳо**, **давраҳо** ва **DOM**-ро як ҷо мекунад.`,
      starterCode: `<div class="quiz">
  <h2>🎮 Quiz IT</h2>
  <p id="савол">—</p>
  <div id="ҷавобҳо"></div>
  <p>Балл: <span id="баллРақам">0</span> / <span id="ҳамагӣ">5</span></p>
  <button type="button" id="навбатӣ" style="display:none">Саволи навбатӣ</button>
  <p id="натиҷа" style="display:none;font-weight:bold;color:#059669;"></p>
</div>
<style>
  .quiz { max-width: 440px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif; }
  h2 { color: #7c3aed; }
  #савол { font-size: 1.15rem; margin: 16px 0; line-height: 1.5; }
  #ҷавобҳо { display: flex; flex-direction: column; gap: 8px; }
  #ҷавобҳо button { padding: 12px; border-radius: 10px; border: 2px solid #c4b5fd; background: #faf5ff; cursor: pointer; text-align: left; font-size: 1rem; }
  #навбатӣ { margin-top: 12px; padding: 10px 20px; border-radius: 10px; border: none; background: #7c3aed; color: #fff; font-weight: 600; cursor: pointer; }
</style>
<script>
let индексСавол = 0;
let баллиБозӣ = 0;
let рӯйхатиСаволҳо = [
  { матн: "HTML чист?", вариантҳо: ["Забони барномасозӣ", "Забони нишонагузории веб", "Забони стил", "Базаи дода"], ҷавобиДуруст: 1 },
  { матн: "CSS барои чӣ аст?", вариантҳо: ["Логика", "Зебоӣ ва ороиш", "Сервер", "Шабака"], ҷавобиДуруст: 1 },
  { матн: "JavaScript дар браузер куҷо иҷро мешавад?", вариантҳо: ["Танҳо сервер", "Дар компютери корбар", "Дар чопгар", "Дар почта"], ҷавобиДуруст: 1 },
  { матн: "DOM чист?", вариантҳо: ["Ранги матн", "Нақшаи элементҳои саҳифа", "Формати сурат", "Шабакаи барқ"], ҷавобиДуруст: 1 },
  { матн: "localStorage чӣ нигоҳ медорад?", вариантҳо: ["Танҳо кукиҳо", "Маълумот дар браузер", "Фақат рақам", "Серверро"], ҷавобиДуруст: 1 }
];

document.getElementById("навбатӣ").addEventListener("click", function () {
  // индексСавол++, агар саволҳо тамом — натиҷаиОхирин; вагарна намоишиСавол
});

// се функсия нависед, охиран аввалинро даъват кунед
</script>`,
      task: "Quiz-бозиро пурра кунед: намоишиСавол, санҷишиИнтихоб, рӯйдоди навбатӣ, натиҷаиОхирин",
      expectedOutput: "Савол, балл, натиҷа",
      hint: "Агар интихоб бо ҷавобиДуруст мувофиқ бошад, баллиБозӣ++ ва тугмаро сабз кунед, вагарна сурх",
      runtime: "web",
      webChecks: {
        contains: ["баллибозӣ++", "индекссавол++", "createelement", "appendchild"],
      },
    },
    {
      id: "44",
      number: 44,
      title: "Лоиҳа: Ҳисобкунаки асъор",
      description: "Табдил, swap, таърих",
      theory: `Дар **бозори Душанбе** ҳар рӯз одамон **асъор иваз** мекунанд.

Биёед **ҳисобкунаки касбӣ** созем! **Сомонӣ** ба **доллар**, **рубл**, **евро** ва **баръакс**. Бо **дизайни зебо**, **анимацияи сабук** ва **нигоҳдории таърихи табдилҳо** дар localStorage.

Пас аз анҷоми ин лоиҳа шумо **гувоҳномаи Сайтсозӣ**-ро мегиред! 🎓`,
      starterCode: `<div class="асъор">
  <h2>💱 Ҳисобкунаки асъор</h2>
  <div class="сатр">
    <label>Маблағ <input type="number" id="маблағ" value="100"></label>
  </div>
  <div class="сатр иваз">
    <select id="аз">
      <option value="TJS">TJS (сомонӣ)</option>
      <option value="USD">USD</option>
      <option value="RUB">RUB</option>
      <option value="EUR">EUR</option>
    </select>
    <button type="button" id="ивазиАсъор" title="Иваз">⇄</button>
    <select id="ба">
      <option value="USD">USD</option>
      <option value="TJS">TJS (сомонӣ)</option>
      <option value="RUB">RUB</option>
      <option value="EUR">EUR</option>
    </select>
  </div>
  <button type="button" id="ҳисоб">Ҳисоб кардан</button>
  <div id="натиҷа" class="натиҷа">Натиҷа ин ҷо</div>
  <h3>Таърих</h3>
  <ul id="таърих"></ul>
</div>
<style>
  .асъор { max-width: 400px; margin: 0 auto; padding: 24px; font-family: system-ui, sans-serif; background: linear-gradient(145deg, #f8fafc, #e2e8f0); border-radius: 16px; box-shadow: 0 10px 40px rgba(15,23,42,0.08); }
  h2 { margin-top: 0; color: #0f766e; }
  .сатр { margin-bottom: 12px; }
  .иваз { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  select, input { padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 1rem; }
  #ивазиАсъор { width: 44px; height: 44px; border-radius: 50%; border: none; background: #0d9488; color: #fff; font-size: 1.25rem; cursor: pointer; transition: transform 0.2s; }
  #ивазиАсъор:hover { transform: rotate(180deg); }
  #ҳисоб { margin-top: 14px; padding: 12px 24px; border: none; border-radius: 10px; background: #0369a1; color: #fff; font-weight: 700; cursor: pointer; }
  .натиҷа { margin-top: 16px; padding: 16px; background: #fff; border-radius: 10px; font-weight: 700; font-size: 1.1rem; color: #047857; border: 1px solid #a7f3d0; }
  #таърих { padding-left: 18px; color: #475569; font-size: 0.95rem; }
  h3 { font-size: 1rem; color: #64748b; margin-top: 20px; }
</style>
<script>
const курсҳо = { TJS: 1, USD: 11, RUB: 0.12, EUR: 12 };

document.getElementById("ҳисоб").addEventListener("click", function () {
  let маблағ = Number(document.getElementById("маблағ").value);
  let аз = document.getElementById("аз").value;
  let ба = document.getElementById("ба").value;
  // ҳисоб бо курсҳо, нишон додани натиҷа, таърих ва нигоҳдорӣ
});

document.getElementById("ивазиАсъор").addEventListener("click", function () {
  let а = document.getElementById("аз");
  let б = document.getElementById("ба");
  let ҷ = а.value;
  а.value = б.value;
  б.value = ҷ;
});

// ҳангоми бор: таърихро аз localStorage бихонед ва рӯйхат кунед
</script>`,
      task: "Ҳисобро пурра кунед (курсҳо[аз] / курсҳо[ба]), таърихро бо JSON дар localStorage нигоҳ доред",
      expectedOutput: "Табдил, таърих, localStorage",
      hint: "натиҷа = маблағ * (курсҳо[аз] / курсҳо[ба])",
      runtime: "web",
      webChecks: {
        contains: ["курсҳо[", "localstorage", "json.stringify", "json.parse"],
      },
    },
  ],
};
