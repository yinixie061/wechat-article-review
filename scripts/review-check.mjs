#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const file = process.argv[2];

if (!file || process.argv.includes("--help") || process.argv.includes("-h")) {
  console.error("Usage: node scripts/review-check.mjs <article.md|article.html|article.txt>");
  process.exit(file ? 0 : 2);
}

const inputPath = path.resolve(process.cwd(), file);
if (!fs.existsSync(inputPath)) {
  console.error(`File not found: ${inputPath}`);
  process.exit(2);
}

const raw = fs.readFileSync(inputPath, "utf8");
const text = normalize(raw);
const title = extractTitle(raw, text);

const rules = [
  {
    id: "political-framing",
    severity: "block",
    words: ["中美博弈", "中美对抗", "贸易战", "制裁对抗", "打压", "卡脖子", "脱钩", "断供", "地缘政治", "军备竞赛", "软实力输出", "外交价值", "国家战略", "体制对比"],
  },
  {
    id: "finance-advice",
    severity: "block",
    words: ["买入信号", "卖出信号", "建议买入", "建议卖出", "投资机会", "抄底", "逃顶", "重仓", "加仓", "泡沫顶点", "牛市", "熊市"],
  },
  {
    id: "sensational-tone",
    severity: "fix",
    words: ["正式开打", "震惊", "炸裂", "碾压", "吊打", "引爆", "历史性", "颠覆性", "终结者", "修不过来"],
  },
  {
    id: "vague-source",
    severity: "fix",
    words: ["有消息称", "业内人士表示", "外媒称", "据传", "市场传闻"],
  },
  {
    id: "cybersecurity-risk",
    severity: "fix",
    words: ["攻击教程", "漏洞利用步骤", "绕过验证", "批量入侵", "拿站", "getshell"],
  },
];

const findings = [];
for (const rule of rules) {
  for (const word of rule.words) {
    const hits = snippets(text, word);
    for (const hit of hits) {
      findings.push({ id: rule.id, severity: rule.severity, term: word, snippet: hit });
    }
  }
}

const sourceCount = countMatches(raw, /(\*\*来源\*\*|参考来源|source[:：]|来源[:：])/gi);
const hasAiDisclosure = /(AI\s*辅助|AI辅助|人工智能辅助|AI\s*生成|由\s*AI|机器生成)/i.test(text);
const imageCount = countMatches(raw, /!\[[^\]]*]\([^)]+\)|<img\b[^>]*\bsrc=/gi);
const titleIssues = checkTitle(title);

for (const issue of titleIssues) findings.push(issue);
if (sourceCount === 0) {
  findings.push({
    id: "missing-sources",
    severity: "block",
    term: "source",
    snippet: "No explicit source marker was found.",
  });
}

const hasBlock = findings.some((finding) => finding.severity === "block");
const hasFix = findings.some((finding) => finding.severity === "fix");
const verdict = hasBlock ? "BLOCK" : hasFix ? "FIX_BEFORE_PUBLISH" : "PASS";

const report = {
  file: inputPath,
  verdict,
  summary: {
    title,
    source_count: sourceCount,
    image_count: imageCount,
    ai_disclosure_present: hasAiDisclosure,
  },
  findings,
};

console.log(JSON.stringify(report, null, 2));
process.exit(verdict === "PASS" ? 0 : verdict === "FIX_BEFORE_PUBLISH" ? 1 : 2);

function normalize(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(rawValue, textValue) {
  const markdownTitle = rawValue.match(/^#\s+(.+)$/m);
  if (markdownTitle) return markdownTitle[1].trim();
  const htmlTitle = rawValue.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (htmlTitle) return normalize(htmlTitle[1]);
  return textValue.slice(0, 40) || "(untitled)";
}

function countMatches(value, regex) {
  return Array.from(value.matchAll(regex)).length;
}

function snippets(value, term) {
  const out = [];
  let index = value.indexOf(term);
  while (index !== -1 && out.length < 5) {
    const start = Math.max(0, index - 24);
    const end = Math.min(value.length, index + term.length + 24);
    out.push(value.slice(start, end));
    index = value.indexOf(term, index + term.length);
  }
  return out;
}

function checkTitle(value) {
  const issues = [];
  if (!value || value === "(untitled)") {
    issues.push({ id: "missing-title", severity: "fix", term: "title", snippet: "Missing article title." });
    return issues;
  }
  if (/^(AI日报|日报|周报)?[ ·:：-]*20\d{2}[-年]\d{1,2}[-月]\d{1,2}日?$|^\d{4}-\d{2}-\d{2}$/.test(value)) {
    issues.push({ id: "weak-title", severity: "fix", term: value, snippet: "Title is only a date or generic label." });
  }
  if (/[?？]$/.test(value)) {
    issues.push({ id: "question-title", severity: "fix", term: value, snippet: "Question-style title may be clickbait; prefer a neutral statement." });
  }
  return issues;
}
