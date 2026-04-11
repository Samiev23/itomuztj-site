/** Ададҳои бутун — бехатар барои иҷрои ифодаҳои одӣ */

function safeEvalIntExpression(expr: string): number {
  const cleaned = expr.replace(/\s/g, "");
  if (!/^[\d+\-*/().]+$/.test(cleaned)) {
    throw new Error("invalid");
  }
  return Function(`"use strict"; return (${cleaned})`)() as number;
}

function unescapeKotlinString(s: string): string {
  return s.replace(/\\(.)/g, (_, c: string) => {
    if (c === "n") return "\n";
    if (c === "t") return "\t";
    if (c === "r") return "\r";
    if (c === '"') return '"';
    if (c === "\\") return "\\";
    return `\\${c}`;
  });
}

/** Лотинӣ + кириллӣ (барои номҳои Kotlin) */
const KOTLIN_ID = "[a-zA-Z_\\u0400-\\u04FF][a-zA-Z0-9_\\u0400-\\u04FF]*";

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type Ctx = Record<string, string | number>;

const classMethodReturn = new Map<string, string>();

function evalStringTemplate(quotedInner: string, ctx: Ctx, objFields: Record<string, Record<string, string | number>>): string {
  let s = quotedInner;
  s = s.replace(/\$\{([^}]+)\}/g, (_, raw: string) => {
    const expr = raw.trim();
    const dot = new RegExp(`^(${KOTLIN_ID})\\.(${KOTLIN_ID})$`).exec(expr);
    if (dot) {
      const o = objFields[dot[1]!];
      if (o && dot[2]! in o) return String(o[dot[2]!]!);
    }
    let e = expr;
    for (const [k, v] of Object.entries(ctx)) {
      e = e.replace(new RegExp(`\\b${k}\\b`, "g"), String(v));
    }
    e = e.replace(/\s/g, "");
    if (/^[\d+\-*/().]+$/.test(e)) {
      try {
        return String(safeEvalIntExpression(e));
      } catch {
        return raw;
      }
    }
    if (expr in ctx) return String(ctx[expr]!);
    return raw;
  });
  for (const [k, v] of Object.entries(ctx)) {
    s = s.replace(
      new RegExp(`\\$${escapeRegExp(k)}(?![a-zA-Z0-9_\\u0400-\\u04FF])`, "g"),
      String(v),
    );
  }
  return unescapeKotlinString(s);
}

/** Дастгирӣ барои дарси функсия: баръакс("Салом") → Kotlin .reversed() */
function tryBaraksCall(a: string): string | null {
  const m = /^баръакс\s*\(\s*"((?:\\.|[^"\\])*)"\s*\)$/.exec(a.trim());
  if (!m) return null;
  const inner = m[1] ?? "";
  const str = unescapeKotlinString(inner);
  return Array.from(str).reverse().join("");
}

function resolvePrintlnArg(arg: string, ctx: Ctx, objFields: Record<string, Record<string, string | number>>): string {
  const a = arg.trim();
  const baraks = tryBaraksCall(a);
  if (baraks !== null) return baraks;

  const chainCall = new RegExp(`^(${KOTLIN_ID})\\(\\)\\.(${KOTLIN_ID})\\(\\)\\s*$`).exec(a);
  if (chainCall) {
    const cls = chainCall[1]!;
    const method = chainCall[2]!;
    const key = `${cls}.${method}`;
    const ret = classMethodReturn.get(key);
    if (ret !== undefined) return ret;
  }

  if (a.startsWith('"') && a.endsWith('"') && a.length >= 2) {
    return evalStringTemplate(a.slice(1, -1), ctx, objFields);
  }

  const prop = new RegExp(`^(${KOTLIN_ID})\\.(${KOTLIN_ID})$`).exec(a);
  if (prop) {
    const o = objFields[prop[1]!];
    if (o && prop[2]! in o) return String(o[prop[2]!]!);
  }

  if (a in ctx) return String(ctx[a]!);

  let expr = a;
  for (const [k, v] of Object.entries(ctx)) {
    expr = expr.replace(new RegExp(`\\b${k}\\b`, "g"), String(v));
  }
  expr = expr.replace(/\s/g, "");
  if (/^[\d+\-*/().]+$/.test(expr)) {
    try {
      return String(safeEvalIntExpression(expr));
    } catch {
      return "";
    }
  }
  return "";
}

const KOTLIN_ID_TAIL = /[a-zA-Z0-9_\u0400-\u04FF]/;

function skipWhitespace(code: string, i: number): number {
  let j = i;
  while (j < code.length && /\s/.test(code[j]!)) j++;
  return j;
}

/** Калимаи Kotlin (val, if, else, println, …), на қисми нишонаи дарозтар */
function startsWithKotlinKeyword(code: string, pos: number, word: string): boolean {
  if (!code.startsWith(word, pos)) return false;
  const after = pos + word.length;
  if (after < code.length && KOTLIN_ID_TAIL.test(code[after]!)) return false;
  return true;
}

function substituteCtxInExpr(expr: string, ctx: Ctx): string {
  let e = expr;
  for (const [k, v] of Object.entries(ctx)) {
    const re = new RegExp(
      `(?<![a-zA-Z0-9_\\u0400-\\u04FF])${escapeRegExp(k)}(?![a-zA-Z0-9_\\u0400-\\u04FF])`,
      "gu",
    );
    e = e.replace(re, String(v));
  }
  return e;
}

function parseOperandValue(s: string): string | number | boolean | null {
  const t = s.trim();
  if (t === "true") return true;
  if (t === "false") return false;
  const strM = /^"((?:\\.|[^"\\])*)"$/.exec(t);
  if (strM) return unescapeKotlinString(strM[1]!);
  if (/^-?\d+$/.test(t)) return parseInt(t, 10);
  if (/^-?\d+\.\d+$/.test(t)) return parseFloat(t);
  return null;
}

function evalKotlinCondition(expr: string, ctx: Ctx, objFields: Record<string, Record<string, string | number>>): boolean {
  let e = substituteCtxInExpr(expr.trim(), ctx);
  e = e.replace(/\s/g, "");

  if (e === "true") return true;
  if (e === "false") return false;

  const ops = [">=", "<=", "==", "!=", ">", "<"] as const;
  let bestIdx = -1;
  let bestOp: (typeof ops)[number] | null = null;
  for (const op of ops) {
    const idx = e.indexOf(op);
    if (idx !== -1 && (bestIdx === -1 || idx < bestIdx)) {
      bestIdx = idx;
      bestOp = op;
    }
  }
  if (bestOp === null || bestIdx === -1) return false;

  const leftRaw = e.slice(0, bestIdx);
  const rightRaw = e.slice(bestIdx + bestOp.length);
  const left = parseOperandValue(leftRaw);
  const right = parseOperandValue(rightRaw);
  if (left === null || right === null) return false;

  switch (bestOp) {
    case ">=":
      return Number(left) >= Number(right);
    case "<=":
      return Number(left) <= Number(right);
    case ">":
      return Number(left) > Number(right);
    case "<":
      return Number(left) < Number(right);
    case "==":
      return left === right || String(left) === String(right);
    case "!=":
      return left !== right && String(left) !== String(right);
    default:
      return false;
  }
}

function parseUntilStatementEnd(code: string, start: number): [number, string] {
  let j = start;
  let paren = 0;
  let inStr = false;
  let strEscape = false;
  while (j < code.length) {
    const c = code[j]!;
    if (strEscape) {
      strEscape = false;
      j++;
      continue;
    }
    if (inStr) {
      if (c === "\\") strEscape = true;
      else if (c === '"') inStr = false;
      j++;
      continue;
    }
    if (c === '"') {
      inStr = true;
      j++;
      continue;
    }
    if (c === "(") paren++;
    else if (c === ")") paren--;
    if (paren === 0 && (c === ";" || c === "\n")) {
      return [j + (c === ";" ? 1 : 1), code.slice(start, j).trim()];
    }
    j++;
  }
  return [j, code.slice(start, j).trim()];
}

function evalAssignmentRhs(expr: string, ctx: Ctx, objFields: Record<string, Record<string, string | number>>): string | number {
  const r = resolvePrintlnArg(expr.trim(), ctx, objFields).trim();
  if (/^-?\d+$/.test(r)) return parseInt(r, 10);
  if (/^-?\d+\.\d+$/.test(r)) return parseFloat(r);
  return r;
}

type IfBranch = { condition: string; body: string } | { elseBody: string };

/**
 * Аз индекси `if` то охири занҷири if / else if / else — баданҳо бе `{`/`}`.
 * Бозгашт: индекси баъд аз охири занҷир.
 */
function parseIfElseChain(code: string, start: number): [number, IfBranch[]] | null {
  if (!startsWithKotlinKeyword(code, start, "if")) return null;
  const branches: IfBranch[] = [];
  let i = start + 2;
  i = skipWhitespace(code, i);
  if (code[i] !== "(") return null;
  const condClose = findMatchingParen(code, i);
  if (condClose === -1) return null;
  const condition = code.slice(i + 1, condClose).trim();
  i = skipWhitespace(code, condClose + 1);
  if (code[i] !== "{") return null;
  const thenClose = findMatchingBrace(code, i);
  if (thenClose === -1) return null;
  const thenBody = code.slice(i + 1, thenClose).trim();
  branches.push({ condition, body: thenBody });
  i = skipWhitespace(code, thenClose + 1);

  while (i < code.length && startsWithKotlinKeyword(code, i, "else")) {
    i += 4;
    i = skipWhitespace(code, i);
    if (startsWithKotlinKeyword(code, i, "if")) {
      i += 2;
      i = skipWhitespace(code, i);
      if (code[i] !== "(") return [i, branches];
      const ec = findMatchingParen(code, i);
      if (ec === -1) return [i, branches];
      const cond = code.slice(i + 1, ec).trim();
      i = skipWhitespace(code, ec + 1);
      if (code[i] !== "{") return [i, branches];
      const bc = findMatchingBrace(code, i);
      if (bc === -1) return [i, branches];
      branches.push({ condition: cond, body: code.slice(i + 1, bc).trim() });
      i = skipWhitespace(code, bc + 1);
    } else if (code[i] === "{") {
      const bc = findMatchingBrace(code, i);
      if (bc === -1) return [i, branches];
      branches.push({ elseBody: code.slice(i + 1, bc).trim() });
      return [skipWhitespace(code, bc + 1), branches];
    } else {
      break;
    }
  }
  return [i, branches];
}

function extractNextPrintln(code: string, start: number): { end: number; arg: string } | null {
  const idx = code.indexOf("println", start);
  if (idx === -1) return null;
  const afterWord = idx + 7;
  if (afterWord < code.length && KOTLIN_ID_TAIL.test(code[afterWord]!)) {
    return extractNextPrintln(code, afterWord);
  }
  let j = afterWord;
  j = skipWhitespace(code, j);
  if (code[j] !== "(") return extractNextPrintln(code, afterWord);
  j++;
  let depth = 1;
  const argStart = j;
  let inStr = false;
  let strEscape = false;
  while (j < code.length && depth > 0) {
    const c = code[j]!;
    if (strEscape) {
      strEscape = false;
      j++;
      continue;
    }
    if (inStr) {
      if (c === "\\") strEscape = true;
      else if (c === '"') inStr = false;
      j++;
      continue;
    }
    if (c === '"') {
      inStr = true;
      j++;
      continue;
    }
    if (c === "(") depth++;
    else if (c === ")") depth--;
    j++;
  }
  if (depth !== 0) return null;
  return { end: j, arg: code.slice(argStart, j - 1).trim() };
}

function runStatements(
  code: string,
  ctx: Ctx,
  objFields: Record<string, Record<string, string | number>>,
): string[] {
  const out: string[] = [];
  const merged: Ctx = { ...ctx };
  let i = 0;
  const len = code.length;

  while (i < len) {
    i = skipWhitespace(code, i);
    if (i >= len) break;

    const kwVal = startsWithKotlinKeyword(code, i, "val");
    const kwVar = !kwVal && startsWithKotlinKeyword(code, i, "var");
    if (kwVal || kwVar) {
      i += 3;
      i = skipWhitespace(code, i);
      const idM = new RegExp(`^(${KOTLIN_ID})`).exec(code.slice(i));
      if (!idM) {
        i++;
        continue;
      }
      const name = idM[1]!;
      i += idM[0]!.length;
      i = skipWhitespace(code, i);
      if (code[i] !== "=") {
        i++;
        continue;
      }
      i++;
      i = skipWhitespace(code, i);
      const [nextPos, exprStr] = parseUntilStatementEnd(code, i);
      merged[name] = evalAssignmentRhs(exprStr, merged, objFields);
      i = nextPos;
      continue;
    }

    const ifChain = parseIfElseChain(code, i);
    if (ifChain) {
      const [endIf, branches] = ifChain;
      for (const br of branches) {
        if ("elseBody" in br) {
          out.push(...runStatements(br.elseBody, merged, objFields));
          break;
        }
        if (evalKotlinCondition(br.condition, merged, objFields)) {
          out.push(...runStatements(br.body, merged, objFields));
          break;
        }
      }
      i = endIf;
      continue;
    }

    if (startsWithKotlinKeyword(code, i, "println")) {
      const pl = extractNextPrintln(code, i);
      if (pl) {
        out.push(resolvePrintlnArg(pl.arg, merged, objFields));
        i = pl.end;
      } else {
        i += 7;
      }
      continue;
    }

    i++;
  }

  return out;
}

function stripLineComments(src: string): string {
  return src.replace(/\/\/[^\n]*/g, "");
}

function findMatchingParen(src: string, openParenIdx: number): number {
  let depth = 0;
  let inStr = false;
  let strEscape = false;
  for (let j = openParenIdx; j < src.length; j++) {
    const c = src[j]!;
    if (strEscape) {
      strEscape = false;
      continue;
    }
    if (inStr) {
      if (c === "\\") strEscape = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') {
      inStr = true;
      continue;
    }
    if (c === "(") depth++;
    else if (c === ")") {
      depth--;
      if (depth === 0) return j;
    }
  }
  return -1;
}

function parseStringLiteralsFromListInner(inner: string): string[] {
  const out: string[] = [];
  let i = 0;
  const t = inner.trim();
  while (i < t.length) {
    while (i < t.length && /[\s,]/.test(t[i]!)) i++;
    if (i >= t.length) break;
    if (t[i] === '"') {
      i++;
      let s = "";
      while (i < t.length) {
        if (t[i] === "\\") {
          i++;
          s += t[i] || "";
          i++;
          continue;
        }
        if (t[i] === '"') {
          i++;
          break;
        }
        s += t[i]!;
        i++;
      }
      out.push(unescapeKotlinString(s));
    } else break;
  }
  return out;
}

function extractMapPairs(inner: string): [string, string][] {
  const pairs: [string, string][] = [];
  const re = /"((?:\\.|[^"\\])*)"\s+to\s+"((?:\\.|[^"\\])*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(inner)) !== null) {
    pairs.push([unescapeKotlinString(m[1]!), unescapeKotlinString(m[2]!)]);
  }
  return pairs;
}

function buildCollectionsAndOop(cleaned: string): {
  lists: Map<string, string[]>;
  maps: Map<string, [string, string][]>;
  objFields: Record<string, Record<string, string | number>>;
} {
  const lists = new Map<string, string[]>();
  const maps = new Map<string, [string, string][]>();
  const objFields: Record<string, Record<string, string | number>> = {};
  classMethodReturn.clear();

  const listRe = new RegExp(`(?:val|var)\\s+(${KOTLIN_ID})\\s*=\\s*(?:mutableListOf|listOf)\\s*\\(`, "g");
  let lm: RegExpExecArray | null;
  while ((lm = listRe.exec(cleaned)) !== null) {
    const name = lm[1]!;
    const open = lm.index + lm[0].length - 1;
    const close = findMatchingParen(cleaned, open);
    if (close === -1) continue;
    const inner = cleaned.slice(open + 1, close);
    lists.set(name, parseStringLiteralsFromListInner(inner));
  }

  const mapRe = new RegExp(`(?:val|var)\\s+(${KOTLIN_ID})\\s*=\\s*mapOf\\s*\\(`, "g");
  while ((lm = mapRe.exec(cleaned)) !== null) {
    const name = lm[1]!;
    const open = lm.index + lm[0].length - 1;
    const close = findMatchingParen(cleaned, open);
    if (close === -1) continue;
    const inner = cleaned.slice(open + 1, close);
    maps.set(name, extractMapPairs(inner));
  }

  const talabaRe = new RegExp(
    `(?:val|var)\\s+(${KOTLIN_ID})\\s*=\\s*Талаба\\s*\\(\\s*"((?:\\\\.|[^"\\\\])*)"\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*\\)`,
    "g",
  );
  while ((lm = talabaRe.exec(cleaned)) !== null) {
    objFields[lm[1]!] = {
      ном: unescapeKotlinString(lm[2]!),
      син: parseInt(lm[3]!, 10),
      курс: parseInt(lm[4]!, 10),
    };
  }

  const odamRe = new RegExp(
    `(?:val|var)\\s+(${KOTLIN_ID})\\s*=\\s*Одам\\s*\\(\\s*"((?:\\\\.|[^"\\\\])*)"\\s*,\\s*(\\d+)\\s*\\)`,
    "g",
  );
  while ((lm = odamRe.exec(cleaned)) !== null) {
    objFields[lm[1]!] = {
      ном: unescapeKotlinString(lm[2]!),
      син: parseInt(lm[3]!, 10),
    };
  }

  const classHeadRe = new RegExp(
    `(?:open\\s+)?class\\s+(${KOTLIN_ID})\\s*(?::\\s*${KOTLIN_ID}\\s*\\(\\s*\\)\\s*)?\\s*\\{`,
    "g",
  );
  let cm: RegExpExecArray | null;
  while ((cm = classHeadRe.exec(cleaned)) !== null) {
    const cname = cm[1]!;
    const openBrace = cm.index + cm[0].length - 1;
    const close = findMatchingBrace(cleaned, openBrace);
    if (close === -1) continue;
    const body = cleaned.slice(openBrace + 1, close);
    const ovRe = new RegExp(
      `override\\s+fun\\s+(${KOTLIN_ID})\\s*\\(\\s*\\)\\s*=\\s*"((?:\\\\.|[^"\\\\])*)"`,
    );
    const ov = ovRe.exec(body);
    if (ov) {
      classMethodReturn.set(`${cname}.${ov[1]!}`, unescapeKotlinString(ov[2]!));
    }
  }

  return { lists, maps, objFields };
}

type LoopSeg =
  | { kind: "range"; varName: string; start: number; end: number; body: string }
  | { kind: "list"; itemVar: string; listName: string; body: string }
  | { kind: "map"; kVar: string; vVar: string; mapName: string; body: string };

type OuterSeg = { kind: "outer"; code: string };

function findMatchingBrace(src: string, openIdx: number): number {
  let depth = 0;
  let inStr = false;
  let strEscape = false;
  for (let j = openIdx; j < src.length; j++) {
    const c = src[j]!;
    if (strEscape) {
      strEscape = false;
      continue;
    }
    if (inStr) {
      if (c === "\\") strEscape = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') {
      inStr = true;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return j;
    }
  }
  return -1;
}

function splitCodeByLoops(
  cleaned: string,
  lists: Map<string, string[]>,
  maps: Map<string, [string, string][]>,
): (OuterSeg | LoopSeg)[] {
  const segments: (OuterSeg | LoopSeg)[] = [];
  let lastIndex = 0;
  let i = 0;

  while (i < cleaned.length) {
    const slice = cleaned.slice(i);
    const mapFor = new RegExp(
      `^for\\s*\\(\\s*\\(\\s*(${KOTLIN_ID})\\s*,\\s*(${KOTLIN_ID})\\s*\\)\\s+in\\s+(${KOTLIN_ID})\\s*\\)\\s*\\{`,
    ).exec(slice);
    if (mapFor && maps.has(mapFor[3]!)) {
      if (i > lastIndex) {
        segments.push({ kind: "outer", code: cleaned.slice(lastIndex, i) });
      }
      const openBrace = i + mapFor[0].length - 1;
      const bodyEnd = findMatchingBrace(cleaned, openBrace);
      if (bodyEnd === -1) break;
      const body = cleaned.slice(openBrace + 1, bodyEnd);
      segments.push({
        kind: "map",
        kVar: mapFor[1]!,
        vVar: mapFor[2]!,
        mapName: mapFor[3]!,
        body,
      });
      lastIndex = bodyEnd + 1;
      i = lastIndex;
      continue;
    }

    const listFor = new RegExp(
      `^for\\s*\\(\\s*(${KOTLIN_ID})\\s+in\\s*(${KOTLIN_ID})\\s*\\)\\s*\\{`,
    ).exec(slice);
    if (listFor && lists.has(listFor[2]!) && !/^\d+$/.test(listFor[2]!)) {
      if (i > lastIndex) {
        segments.push({ kind: "outer", code: cleaned.slice(lastIndex, i) });
      }
      const openBrace = i + listFor[0].length - 1;
      const bodyEnd = findMatchingBrace(cleaned, openBrace);
      if (bodyEnd === -1) break;
      const body = cleaned.slice(openBrace + 1, bodyEnd);
      segments.push({
        kind: "list",
        itemVar: listFor[1]!,
        listName: listFor[2]!,
        body,
      });
      lastIndex = bodyEnd + 1;
      i = lastIndex;
      continue;
    }

    const rangeFor = /^for\s*\(\s*([a-zA-Z_]\w*)\s+in\s+(\d+)\.\.(\d+)\s*\)\s*\{/.exec(slice);
    if (rangeFor) {
      if (i > lastIndex) {
        segments.push({ kind: "outer", code: cleaned.slice(lastIndex, i) });
      }
      const openBrace = i + rangeFor[0].length - 1;
      const bodyEnd = findMatchingBrace(cleaned, openBrace);
      if (bodyEnd === -1) break;
      const body = cleaned.slice(openBrace + 1, bodyEnd);
      segments.push({
        kind: "range",
        varName: rangeFor[1]!,
        start: parseInt(rangeFor[2]!, 10),
        end: parseInt(rangeFor[3]!, 10),
        body,
      });
      lastIndex = bodyEnd + 1;
      i = lastIndex;
      continue;
    }

    i++;
  }

  if (lastIndex < cleaned.length) {
    segments.push({ kind: "outer", code: cleaned.slice(lastIndex) });
  }
  return segments;
}

function extractMainBody(cleaned: string): string {
  const m = /fun\s+main\s*\(\s*\)\s*\{/.exec(cleaned);
  if (!m) return cleaned;
  const open = m.index + m[0].length - 1;
  const close = findMatchingBrace(cleaned, open);
  if (close === -1) return cleaned;
  return cleaned.slice(open + 1, close);
}

export function simulateKotlinPrintlnOutput(code: string): string {
  const cleaned = stripLineComments(code);
  const { lists, maps, objFields } = buildCollectionsAndOop(cleaned);
  const mainBody = extractMainBody(cleaned);
  const segments = splitCodeByLoops(mainBody, lists, maps);
  const lines: string[] = [];

  for (const seg of segments) {
    if (seg.kind === "outer") {
      lines.push(...runStatements(seg.code, {}, objFields));
    } else if (seg.kind === "range") {
      for (let n = seg.start; n <= seg.end; n++) {
        const ctx: Ctx = { [seg.varName]: n };
        lines.push(...runStatements(seg.body, ctx, objFields));
      }
    } else if (seg.kind === "list") {
      const arr = lists.get(seg.listName) ?? [];
      for (const item of arr) {
        const ctx: Ctx = { [seg.itemVar]: item };
        lines.push(...runStatements(seg.body, ctx, objFields));
      }
    } else if (seg.kind === "map") {
      const entries = maps.get(seg.mapName) ?? [];
      for (const [k, v] of entries) {
        const ctx: Ctx = { [seg.kVar]: k, [seg.vVar]: v };
        lines.push(...runStatements(seg.body, ctx, objFields));
      }
    }
  }

  return lines.join("\n");
}
