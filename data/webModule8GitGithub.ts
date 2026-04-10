import type { LessonModule } from "./lessonTypes";

/** Модул 8: Git ва GitHub — дарсҳои 45–48 */
export const webModule8GitGithub: LessonModule = {
  id: "m8",
  title: "Модул 8: Git ва GitHub",
  titleEn: "Назорати версияҳо",
  locked: false,
  lessons: [
    {
      id: "45",
      number: 45,
      title: "Git чист ва чаро лозим?",
      description: "Назорати версия ва commit",
      theory: `Тасаввур кунед, ки шумо **рефератро** менависед. Ҳар рӯз тағйир медиҳед. Як рӯз **хато** мекунед ва мехоҳед ба **версияи дирӯза** баргардед — вале **дер шуд**!

**Git** ин мушкилро ҳал мекунад. Git **ҳар тағйиротро ёд мегирад** ва шумо метавонед ба **ҳар версия** баргардед. Мисли **Ctrl+Z**, вале барои **ҳамаи файлҳо** ва **ҳамеша**! 💾

**Назорати версия** — ин системае, ки тағйироти файлҳоро вақт ба вақт сабт мекунад. **Commit** — чун **акс гирифтан** аз ҳолати лоиҳа дар як лаҳза: шумо ном мегузоред ва баъд метавонед ба он баргардед.

**Чаро барномасозон Git истифода мебаранд?** То якҷоя кор кунанд, хатогиҳоро бозгардонанд ва таърихи лоиҳаро бинанд.`,
      starterCode: `<div class="git-дарс">
  <h2>🔧 Терминал — санҷиши Git</h2>
  <p>Агар Git насб бошад, ин команда версияро нишон медиҳад:</p>
  <pre class="терминал">git --version</pre>
  <p class="вазифа"><strong>Вазифа:</strong> Дар блоки зер ҷаваби пурра нависед: <em>Git барои чӣ лозим аст?</em> (калимаҳои <strong>назорати версия</strong> ва <strong>код</strong>-ро истифода баред.)</p>
  <div class="қуттииҷавоб" contenteditable="true" data-placeholder="Ҷавоби худро ин ҷо нависед…"></div>
</div>
<style>
  .git-дарс { max-width: 520px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif; line-height: 1.5; }
  h2 { color: #0f766e; margin-top: 0; }
  .терминал { background: #1e293b; color: #e2e8f0; padding: 14px 16px; border-radius: 10px; font-family: ui-monospace, monospace; font-size: 0.95rem; overflow-x: auto; }
  .вазифа { margin-top: 20px; padding: 12px; background: #ecfdf5; border-radius: 10px; border: 1px solid #a7f3d0; }
  .қуттииҷавоб { min-height: 72px; margin-top: 10px; padding: 12px; border: 2px dashed #94a3b8; border-radius: 10px; background: #f8fafc; }
  .қуттииҷавоб:empty:before { content: attr(data-placeholder); color: #94a3b8; }
</style>`,
      task: "Мафҳуми Git-ро фаҳмед ва дар код ҷавоби саволро нависед: Git барои чӣ лозим аст?",
      expectedOutput: "Ҷавоб бо назорати версия ва код",
      hint: "Git барои назорати версияҳои код истифода мешавад",
      runtime: "web",
      webChecks: {
        contains: ["назорати", "версия", "код"],
      },
    },
    {
      id: "46",
      number: 46,
      title: "Аввалин репозиторӣ",
      description: "init, add, commit, log",
      theory: `**Репозиторӣ** (**repo**) — ин **папкаи лоиҳаатон**, ки **Git назорат** мекунад.

\`git init\` мегӯяд: «**Ин папкаро назорат кун!**»

Баъд шумо файлҳоро \`git add\` мекунед (**омода кардан ба сабт**) ва \`git commit\` мекунед (**сабт кардан бо паём**).

**Мисли:**
1. **Акс гирифтан** 📸 — \`git add\` (чӣ ба commit дохил мешавад)
2. **Дар албом гузоштан** 📖 — \`git commit -m "паём"\` (аксро бо номи сабт мекунед)

\`git status\` — чӣ омода аст, чӣ не. \`git log\` — рӯйхати commit-ҳои қаблӣ.`,
      starterCode: `<div class="git-дарс">
  <h2>📂 Қадамҳо дар терминал</h2>
  <ol class="қадамҳо">
    <li><code>git init</code> — Git-ро дар папка оғоз кунед</li>
    <li><code>git status</code> — вазъиятро бинед</li>
    <li><code>git add .</code> — ҳамаи файлҳоро омода кунед</li>
    <li><code>git commit -m "Аввалин commit"</code> — сабт кунед</li>
    <li><code>git log</code> — таърихи commit-ҳо</li>
  </ol>
  <p class="вазифа"><strong>Вазифа:</strong> Дар блоки зер <strong>се сатри терминал</strong> бо тартиби дуруст нависед: аввал оғоз, баъд омода кардани файлҳо, баъд сабт бо паём.</p>
  <pre class="терминал"># Сатри 1 (оғози Git дар папка):
# Сатри 2 (омода кардан, масалан ҳамаи файлҳо):
# Сатри 3 (сабт бо паёми дилхоҳ):</pre>
</div>
<style>
  .git-дарс { max-width: 540px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif; }
  h2 { color: #0369a1; margin-top: 0; }
  .қадамҳо { line-height: 1.8; }
  code { background: #e0f2fe; padding: 2px 6px; border-radius: 4px; font-size: 0.9rem; }
  .вазифа { margin-top: 16px; padding: 12px; background: #eff6ff; border-radius: 10px; border: 1px solid #93c5fd; }
  .терминал { display: block; margin-top: 12px; background: #0c4a6e; color: #e0f2fe; padding: 14px; border-radius: 10px; font-family: ui-monospace, monospace; white-space: pre-wrap; min-height: 4.5rem; }
</style>`,
      task: "Тартиби дурусти командаҳоро нависед: init, add, commit",
      expectedOutput: "git init, git add, git commit",
      hint: "git init → git add . → git commit -m 'Аввалин commit'",
      runtime: "web",
      webChecks: {
        contains: ["git init", "git add", "git commit"],
      },
    },
    {
      id: "47",
      number: 47,
      title: "Branch ва Merge",
      description: "Шоха, кор, якшавӣ",
      theory: `**Branch** мисли **роҳи алоҳида** аст 🛤️

Аз роҳи асосӣ (**main** ё **master**) ба як тараф меравед (**branch**), чизи навро **бесаросема санҷед**, ва агар хуб бошад — ба роҳи асосӣ **як мекунед** (**merge**).

- \`git branch\` — шохаҳоро мебинед
- \`git checkout -b feature\` — шохаи нав месозед ва ба он мегузаред
- Пас аз тағйирот: \`git add\` ва \`git commit\`
- \`git checkout main\` — ба асосӣ бармегардед
- \`git merge feature\` — кори шохаро ба main мегузоред`,
      starterCode: `<div class="git-дарс">
  <h2>🛤️ Схемаи кор бо branch</h2>
  <pre class="намуд">main:     A---B---C
              \\
feature:       D---E</pre>
  <p>Баъд аз merge: ҳамаи тағйирот дар main як мешаванд.</p>
  <p class="вазифа"><strong>Вазифа:</strong> Дар блоки зер пайдарпай нависед: эҷоди branch бо номи <code>feature</code>, як commit, баргашт ба <code>main</code>, ва як кардани <code>feature</code>.</p>
  <pre class="терминал"># 1) Шохаи нав + гузариш ба он:
# 2) Сабти тағйирот (баъд аз add):
# 3) Бозгашт ба main:
# 4) Гузоштани кори feature ба main:</pre>
</div>
<style>
  .git-дарс { max-width: 560px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif; }
  h2 { color: #7c3aed; margin-top: 0; }
  .намуд { background: #f5f3ff; padding: 12px; border-radius: 8px; font-family: ui-monospace, monospace; font-size: 0.85rem; overflow-x: auto; }
  .вазифа { margin-top: 14px; padding: 12px; background: #faf5ff; border-radius: 10px; border: 1px solid #ddd6fe; }
  code { background: #ede9fe; padding: 2px 6px; border-radius: 4px; }
  .терминал { margin-top: 10px; background: #1e1b4b; color: #e9d5ff; padding: 14px; border-radius: 10px; font-family: ui-monospace, monospace; white-space: pre-wrap; min-height: 5rem; }
</style>`,
      task: "Тартиби корро бо branch нависед: branch созед, тағйирот кунед, merge кунед",
      expectedOutput: "checkout -b, commit, checkout main, merge",
      hint: "git checkout -b feature → тағйирот → git commit → git checkout main → git merge feature",
      runtime: "web",
      webChecks: {
        contains: ["git checkout -b feature", "git commit", "git checkout main", "git merge feature"],
      },
    },
    {
      id: "48",
      number: 48,
      title: "GitHub ва GitHub Pages",
      description: "Remote, push, сайти бепул",
      theory: `**GitHub** — ин ҷое дар **интернет**, ки **кодатонро нигоҳ медорад**. Мисли **Google Drive**, вале **барои код**! 🌐

Шумо репозиторӣ дар сайти GitHub месозед, ба компютер **пайваст** мекунед (**remote**) ва кодро **мефиристед** (**push**).

**GitHub Pages** — **сайти шуморо бепул** дар интернет мегузорад (аз branch ё папкаи махсус). Барои портфолио ва лоиҳаҳои хурд бисёр муфид аст.`,
      starterCode: `<div class="git-дарс">
  <h2>🌐 Фиристодан ба GitHub</h2>
  <ol>
    <li>Дар github.com репозитории нав бисозед (бидуни README, агар дар компютер аллакай init карда бошед).</li>
    <li>Адреси HTTPS-и репозиториро нусха кунед.</li>
    <li>Дар терминали папкаи лоиҳа:</li>
  </ol>
  <pre class="терминал"># Пайванд ба репозитории GitHub (ба ҷои URL адреси худро гузоред):
# Фиристодани branch-и main:</pre>
  <p class="вазифа"><strong>Вазифа:</strong> Ду сатри дуруст нависед: яке барои <strong>remote add origin</strong> бо URL, дигаре барои <strong>push</strong> ба <code>main</code> (бо <code>-u</code>).</p>
</div>
<style>
  .git-дарс { max-width: 580px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif; }
  h2 { color: #0d9488; margin-top: 0; }
  ol { line-height: 1.7; padding-left: 1.2rem; }
  .терминал { margin-top: 12px; background: #134e4a; color: #ccfbf1; padding: 14px; border-radius: 10px; font-family: ui-monospace, monospace; white-space: pre-wrap; font-size: 0.9rem; }
  .вазифа { margin-top: 16px; padding: 12px; background: #f0fdfa; border-radius: 10px; border: 1px solid #5eead4; }
  code { background: #ccfbf1; color: #115e59; padding: 2px 6px; border-radius: 4px; }
</style>`,
      task: "Қадамҳои push-ро ба GitHub нависед",
      expectedOutput: "remote add origin, push -u origin main",
      hint: "git remote add origin URL → git push -u origin main",
      runtime: "web",
      webChecks: {
        contains: ["git remote add origin", "git push -u origin main"],
      },
    },
  ],
};
