---
name: wechat-article-review
description: Review Chinese WeChat Official Account articles for compliance, factual sourcing, originality risk, title safety, formatting, AI-disclosure, and publish readiness. Use when the user asks for 公众号审核, 微信公众号文章审核, wechat article review, pre-publish review, risk scan, or wants an article checked before rendering or publishing.
---

# WeChat Article Review

## Purpose

Use this skill only to review article content. Do not generate images, render HTML, upload assets, or publish.

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
