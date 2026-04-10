import type { LessonModule } from "./lessonTypes";

/** Модул 9: React асосӣ — дарсҳои 39–46 */
export const webModule9ReactBasics: LessonModule = {
  id: "m9",
  title: "Модул 9: React асосӣ",
  titleEn: "Китобхонаи муосир",
  locked: false,
  lessons: [
    {
      id: "39",
      number: 39,
      title: "React чист ва чаро?",
      description: "Компонент, JSX, create-react-app / Vite",
      theory: `То ҳол шумо **HTML**, **CSS** ва **JS**-ро алоҳида менавистед. **React** ин ҳамаро **як ҷо** мекунад!

**React** — ин **китобхонаи JavaScript** аз Meta (пештар Facebook). **Instagram**, **WhatsApp Web**, **Netflix** — бисёр ҷойҳо бо React сохта шудаанд.

React **саҳифаро ба қисмҳои хурд тақсим мекунад** — ин **компонент** ном дорад. Мисли **ЛЕГО** 🧱 — аз **порчаҳои хурд** чизи **калон** месозед!

**JSX** шабеҳи HTML аст, вале дар дохили JavaScript навишта мешавад. Браузер онро ба \`React.createElement(...)\` табдил медиҳад.

**create-react-app** ё **Vite** лоиҳаро бо як фармон оғоз мекунанд — папка, сервери рушд, JSX омода.`,
      starterCode: `function App() {
  return (
    <div>
      {/* сарлавҳа ва як абзац дар бораи худатон */}
      <h1></h1>
      <p></p>
    </div>
  );
}`,
      task: "Аввалин компоненти React-ро созед: сарлавҳа ва як абзац дар бораи худатон",
      expectedOutput: "App бо h1 ва p пур",
      hint: "return (<div><h1>Номи ман</h1><p>Ман барномасоз мешавам</p></div>)",
      runtime: "web",
      webPreviewMode: "react",
      webChecks: {
        contains: ["return (", "<h1", "</h1>", "<p", "</p>"],
      },
    },
    {
      id: "40",
      number: 40,
      title: "Компонентҳо — порчаҳои ЛЕГО",
      description: "Header, Card, Footer, ҷамъоварӣ",
      theory: `Ҳар **қисми сайт** як **компонент** аст: **Header** — як порча, **Card** — як порча, **Footer** — як порча.

Шумо **як маротиба Card месозед** ва **10 маротиба истифода мебаред**! Ин **қудрати React** аст.

**Компонент** — ин **функсия**, ки **JSX** бармегардонад: \`function Card() { return <article>...</article>; }\`

Компонентҳоро дар файли дигар **export** мекунед ва дар \`App.js\` бо \`import\` меоваред — лоиҳа **тартибдор** мемонад.`,
      starterCode: `function Header() {
  return <header>{/* номи сайт */}</header>;
}

function Card() {
  return <article>{/* ном ва тавсиф */}</article>;
}

function Footer() {
  return <footer>{/* ҳуқуқ */}</footer>;
}

function App() {
  return (
    <div>
      {/* Header, Card, Footer-ро ин ҷо ҷойгир кунед */}
    </div>
  );
}`,
      task: "3 компонент созед: Header (номи сайт), Card (ному тавсиф), Footer (© 2026). Ҳамаро дар App ҷамъ кунед",
      expectedOutput: "Header, Card, Footer дар App",
      hint: "function Header() { return <header><h1>ITomuz TJ</h1></header> }",
      runtime: "web",
      webPreviewMode: "react",
      webChecks: {
        contains: ["function header", "function card", "function footer", "function app", "<footer", "2026", "itomuz"],
      },
    },
    {
      id: "41",
      number: 41,
      title: "Props — маълумот ба компонент",
      description: "Фармоиш ба компонент, children",
      theory: `**Props** мисли **фармоиш дар ресторан** аст 🍽️ Шумо мегӯед: «**Плов бо гӯшт!**» — ошпаз мефаҳмад чӣ пазад.

**Props** ба компонент мегӯяд **чӣ нишон диҳад**. \`<Card ном="Аҳмад" син={25} />\` — ин **фармоиш** аст!

Дар дохили компонент: \`function Card({ ном, син })\` — **destructuring**. \`props.children\` — он чи **байни тегҳо** гузошта шудааст.

**Props** тагйирнопазиранд (immutable) — фарзанд наметавонад онҳоро иваз кунад; барои тағйир **state** лозим аст.`,
      starterCode: `function Card() {
  return (
    <div className="корт">
      <h2>Ном</h2>
      <p>25 сол, Душанбе</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Card />
      <Card />
      <Card />
    </div>
  );
}`,
      task: "Card-ро бо props созед ва 3 корти гуногун нишон диҳед: номи гуногун, сини гуногун, шаҳри гуногун",
      expectedOutput: "Card({ ном, син, шаҳр }) ва се маълумоти гуногун",
      hint: "function Card({ ном, син, шаҳр }) { return <div><h2>{ном}</h2><p>{син} сол, {шаҳр}</p></div> }",
      runtime: "web",
      webPreviewMode: "react",
      webChecks: {
        contains: ["function card", "{ ном", "шаҳр", "син", "ном="],
      },
    },
    {
      id: "42",
      number: 42,
      title: "State — хотираи компонент (useState)",
      description: "useState, навсозӣ, render",
      theory: `**Props** аз **берун** меояд, **State** аз **дохил** аст.

**State** — ин **хотираи компоненти шумо**. Масалан: тугмаро **чанд маротиба пахш кардед**? Ин ҳисобкунӣ **state** аст!

\`useState\` — ин **қалами сеҳрӣ**: **мехонед** ва **менависед**. \`const [шумора, setШумора] = useState(0);\`

Вақте **state** иваз мешавад, React **дубора рендер** мекунад — саҳифа **нав** мешавад, вале **қисми зарури** иваз мегардад.`,
      starterCode: `function App() {
  let шумора = 0; /* ин хато аст — браузер навсозӣ намекунад */

  return (
    <div>
      <p>Шумора: {шумора}</p>
      <button type="button" onClick={() => { шумора = шумора + 1; }}>
        +1
      </button>
      <button type="button">-1</button>
      <button type="button">Reset</button>
    </div>
  );
}`,
      task: "Ҳисобкунак созед бо 3 тугма: +1, -1, ва Reset (ба 0). Шумораро бо useState нигоҳ доред",
      expectedOutput: "useState ва setШумора барои +1, -1, 0",
      hint: "const [шумора, setШумора] = useState(0); onClick={() => setШумора(шумора + 1)}",
      runtime: "web",
      webPreviewMode: "react",
      webChecks: {
        contains: ["usestate", "setшумора", "+", "-"],
        containsLiteral: ["setШумора(0)"],
      },
    },
    {
      id: "43",
      number: 43,
      title: "Рӯйхатҳо ва шартҳо дар React",
      description: ".map(), key, шартҳо",
      theory: `Дар React **рӯйхат**ро бо \`.map()\` нишон медиҳем — **ҳар элемент**ро ба **JSX** ё **компонент** табдил медиҳем.

**key** (\`key={махсус.id}\`) ба React мегӯяд, ки **кадом элемент кадом аст** — барои самаранокӣ муҳим аст.

Бо **шартҳо** (\`&&\`, **тернар**) метавонем чизҳоро **нишон** ё **пинҳон** кунем.

**Мисли:** агар корбар **ворид шуда бошад** — «Салом» нишон диҳед; агар **не** — тугмаи «Ворид шавед».`,
      starterCode: `const маҳсулотҳо = [
  { id: 1, ном: "Нон", нарх: 5 },
  { id: 2, ном: "Шир", нарх: 15 },
  { id: 3, ном: "Панир", нарх: 120 },
  { id: 4, ном: "Об", нарх: 3 },
  { id: 5, ном: "Шоколад", нарх: 45 },
];

function App() {
  return (
    <div>
      <h2>Маҳсулотҳо</h2>
      <ul>{/* рӯйхатро бо .map() кашед */}</ul>
      <button type="button">Танҳо арзонтар аз 100</button>
    </div>
  );
}`,
      task: "Рӯйхати 5 маҳсулотро бо .map() нишон диҳед. Тугмаи филтр илова кунед: танҳо маҳсулотҳои бо нарх < 100",
      expectedOutput: "map, filter, key",
      hint: "маҳсулотҳо.filter((m) => m.нарх < 100).map((m) => <li key={m.id}>…</li>)",
      runtime: "web",
      webPreviewMode: "react",
      webChecks: {
        contains: [".map(", ".filter(", "key=", "нарх"],
      },
    },
    {
      id: "44",
      number: 44,
      title: "useEffect — кор бо API",
      description: "Эффект, вобастагӣ, fetch",
      theory: `**useEffect** мегӯяд: «**Вақте ки компонент пайдо шуд** (ё чизе иваз шуд), **ИН корро кун**!»

Масалан: вақте ки **саҳифа боз шуд** — маълумотро аз **API** гиред. Ё вақте ки **state** иваз шуд — **коре кун**.

**Массиви вобастагӣ** \`[]\` — **як маротиба** пас аз аввалин render (чун componentDidMount). Агар **state** дар дохил бошад — ҳар иваз **эффектро дубора** мезанад.

**useEffect** — ин **гӯши компонент** аст 👂 — шунавандаи рӯйдодҳои зиндагии саҳифа.

Пеш аз нишон додани дода **«Боркунӣ…»** гузоред; дар **catch** паёми хато.`,
      starterCode: `function App() {
  const [корбарон, setКорбарон] = useState([]);
  const [боркунӣ, setБоркунӣ] = useState(true);

  // useEffect + fetch: API-и корбарон дар назария — дар ин ҷо татбиқ кунед

  return (
    <div>
      <h2>Корбарон</h2>
      {боркунӣ ? <p>Боркунӣ…</p> : null}
      <ul>
        {корбарон.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}`,
      task: "Аз API рӯйхати корбаронро гиред ва дар рӯйхат нишон диҳед. Вақти боркунӣ «Боркунӣ…» нишон диҳед",
      expectedOutput: "useEffect, fetch, users",
      hint: "useEffect(() => { fetch(url).then((r) => r.json()).then((data) => setКорбарон(data)).finally(() => setБоркунӣ(false)); }, []);",
      runtime: "web",
      webPreviewMode: "react",
      webChecks: {
        contains: ["useeffect", "fetch(", "jsonplaceholder", ".json(", "then("],
      },
    },
    {
      id: "45",
      number: 45,
      title: "Роутинг — саҳифаҳои гуногун",
      description: "React Router, Link, Route",
      theory: `Сайти шумо **як саҳифа** нест! Бояд **асосӣ**, **дар бора**, **тамос** дошта бошад.

**React Router** ба шумо имкон медиҳад, ки **бе боркунии пурраи саҳифа** (SPA) байни **маршрутҳо** гузаред. Мисли **дарҳои гуногун дар як хона** 🚪

**BrowserRouter** дар лоиҳаҳои воқеӣ бо сервери дуруст маъмул аст. Дар **ин пешнамоиш** аз **HashRouter** истифода мебарем — линкҳо дар **iframe** бидуни сервер кор мекунанд (\`#/\`, \`#/about\`).

**Routes** / **Route** — кадом компонент барои кадом **path**. **Link** — гузариши осон.`,
      starterCode: `function Home() {
  return <main><h1>Асосӣ</h1><p>Хуш омадед!</p></main>;
}

function About() {
  return <main><h1>Дар бора</h1><p>ITomuz TJ</p></main>;
}

function Contact() {
  return <main><h1>Тамос</h1><p>email@example.com</p></main>;
}

function App() {
  return (
    <div>
      {/* HashRouter, навбар бо Link, Routes бо се Route */}
    </div>
  );
}`,
      task: "3 саҳифа созед: Асосӣ (#/), Дар бора (#/about), Тамос (#/contact). Навбар бо линкҳо. Дар ин дарс HashRouter истифода баред",
      expectedOutput: "HashRouter, Routes, Route, Link",
      hint: "<HashRouter><nav><Link to=\"/\">Асосӣ</Link> …</nav><Routes><Route path=\"/\" element={<Home />} /> …</Routes></HashRouter>",
      runtime: "web",
      webPreviewMode: "react",
      webReactRouter: true,
      webChecks: {
        contains: ["hashrouter", "routes", "<route", "<link", "/about", "/contact"],
      },
    },
    {
      id: "46",
      number: 46,
      title: "Формаҳо дар React",
      description: "Controlled inputs, валидатсия",
      theory: `**Формаҳо** дар React каме **фарқ** мекунанд — ҳар **input** бо **state** кор мекунад. Ин **controlled components** ном дорад.

\`value={ном}\` ва \`onChange={(e) => setНом(e.target.value)}\` — шумо **ҳамеша медонед**, ки корбар чӣ навишт.

Пеш аз **ирсол** санҷед: **дарозии ном**, **формати email**, **рамзи қавӣ** — ва паёми **хато** ё **муваффақият** нишон диҳед.`,
      starterCode: `function App() {
  // барои ҳар майдон useState истифода баред (controlled)

  function handleSubmit(e) {
    e.preventDefault();
    // валидатсия: ном > 2, email бо @, рамз > 6
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>
          Ном: <input type="text" />
        </label>
      </p>
      <p>
        <label>
          Email: <input type="text" />
        </label>
      </p>
      <p>
        <label>
          Рамз: <input type="password" />
        </label>
      </p>
      <p id="хато" style={{ color: "crimson" }}></p>
      <p id="муваффақ" style={{ color: "green" }}></p>
      <button type="submit">Сабт</button>
    </form>
  );
}`,
      task: "Формаи сабти номро controlled кунед: ҳар input бо useState, валидатсия (ном > 2 ҳарф, email бо @, рамз > 6 ҳарф), паёми муваффақият",
      expectedOutput: "value, onChange, санҷишҳо",
      hint: "const [ном, setНом] = useState(''); <input value={ном} onChange={(e) => setНом(e.target.value)} />",
      runtime: "web",
      webPreviewMode: "react",
      webChecks: {
        contains: ["value={", "onchange", "target.value", "includes(", "length", "> 2", "> 6", "@"],
      },
    },
  ],
};
