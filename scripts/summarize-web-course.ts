/**
 * Хулосаи модулҳо ва дарсҳои курси «Сайтсозӣ» (веб).
 * Иҷро: npm run summarize:web ё пеш аз build (prebuild).
 */
import { webLessonModules } from "../data/webCourse";

function main() {
  let total = 0;
  const lines: string[] = [];

  for (const mod of webLessonModules) {
    const m = mod.title.match(/^Модул\s+(\d+)\s*:\s*(.+)$/);
    const modNum = m?.[1] ?? "?";
    const shortName = (m?.[2] ?? mod.title).trim();
    const count = mod.lessons.length;
    total += count;
    const nums = mod.lessons.map((l) => l.number).sort((a, b) => a - b);
    const lo = nums[0]!;
    const hi = nums[nums.length - 1]!;
    const range = lo === hi ? `${lo}` : `${lo}-${hi}`;
    const lessonWord = count === 1 ? "lesson" : "lessons";
    lines.push(`Module ${modNum}: ${shortName} — ${count} ${lessonWord} (lesson numbers ${range})`);
  }

  console.log("\n━━━ Web course (Сайтсозӣ) — module summary ━━━\n");
  for (const line of lines) console.log(line);
  console.log(`\nTotal: ${total} lessons\n`);
}

main();
