---
name: wechat-article-review
description: Review Chinese WeChat Official Account articles for compliance, factual sourcing, originality risk, title safety, formatting, AI-disclosure, and publish readiness, with Chinese/English output switching. Use when the user asks for 公众号审核, 微信公众号文章审核, wechat article review, pre-publish review, risk scan, or wants an article checked before rendering or publishing.
---

# WeChat Article Review

## Purpose

Use this skill only to review article content. Do not generate images, render HTML, upload assets, or publish.

## Bilingual Skill Brief

中文说明：这个 skill 用于公众号文章发布前审核，重点检查事实来源、原创与转载风险、标题安全、敏感表达、投资/政策/安全等高风险内容、AI 声明和排版完整性。它只给出审核结论、必须修改项、优化建议和可替换标题，不负责生成配图、渲染 HTML 或发布。

English brief: This skill reviews WeChat Official Account articles before publishing. It checks factual sourcing, originality and reposting risk, title safety, sensitive wording, finance/policy/security risk, AI disclosure, and formatting readiness. It returns a verdict, required fixes, suggested polish, and safer title options; it does not generate images, render HTML, or publish.

## Language Mode

- Default to the user's language: Chinese requests receive Chinese reviews; English requests receive English reviews.
- Switch explicitly when asked: `中文`, `English`, `bilingual`, `中英双语`, `respond in English`, or `用中文审核`.
- In bilingual mode, keep the verdict and checklist once, then provide each finding as `中文 / English` pairs.
- Keep technical verdict tokens unchanged in all languages: `PASS`, `FIX_BEFORE_PUBLISH`, and `BLOCK`.

## Workflow

1. Identify the article source: Markdown, HTML, pasted text, or a local file.
2. Run the deterministic scanner when a file is available:

```bash
node scripts/review-check.mjs path/to/article.md
```

3. Read `references/review-rubric.md` for the full rubric when the scanner flags risk, the topic is news/finance/policy/security, or the user needs a publish decision.
4. Review the article against these dimensions:
   - Originality and attribution
   - Source quality and verifiability
   - Platform compliance and topic boundaries
   - Political, finance, cybersecurity, and medical/legal risk
   - Title safety and emotional language
   - Structure, readability, and interaction value
   - WeChat formatting and publish readiness
5. Give a clear verdict: `PASS`, `FIX_BEFORE_PUBLISH`, or `BLOCK`.

## Hard Gates

Mark the article `BLOCK` until fixed when any of these appear:

- Missing verifiable sources for news-like claims.
- Investment advice, trading calls, or implied buy/sell guidance.
- Political conflict framing, sensitive territorial topics, or national confrontation narratives.
- Security content framed as attack guidance, exploit instructions, or panic language.
- Medical/legal/financial claims without qualifications or source support.
- Misleading, sensational, or clickbait title that materially overstates the content.
- Copyright-risk copying, large unattributed excerpts, or article-like aggregation without commentary.

## Output Format

Keep the review actionable and compact:

```markdown
Verdict: FIX_BEFORE_PUBLISH

Must Fix
1. [Severity] Issue - evidence or quote snippet - concrete rewrite.

Suggested Polish
1. Short improvement with replacement wording.

Title Candidates
1. Neutral title option.
2. More specific title option.

Publish Checklist
- Sources present: yes/no
- AI disclosure present if AI-assisted: yes/no
- Images and captions ready: yes/no
- No hard-gate risks: yes/no
```

When the article passes, still mention any residual risk or assumptions, especially for news, finance, policy, cybersecurity, medicine, or legal topics.
