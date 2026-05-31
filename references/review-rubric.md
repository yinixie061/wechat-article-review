# WeChat Article Review Rubric

## Review Dimensions

1. Originality and attribution
   - Check whether the article adds synthesis, explanation, opinion, or editing value instead of copying source material.
   - Flag long unattributed excerpts, media-style aggregation, or source lists without meaningful commentary.

2. Source quality
   - Prefer primary sources, official announcements, company blogs, filings, papers, and direct product docs.
   - News-like claims need a source near the claim and a final reference list.
   - Replace vague wording such as "有消息称", "业内人士表示", or "外媒称" with named sources when possible.

3. Platform compliance
   - Avoid impersonating a licensed news outlet or using rigid news-column framing when the account is personal or commentary-oriented.
   - Use personal observation framing for curated industry commentary.
   - Do not claim original declaration eligibility for AI-assisted news digests or heavy source aggregation.

4. Political and public-affairs risk
   - Avoid national confrontation frames, state competition narratives, sanctions conflict, trade war framing, and geopolitical speculation.
   - Avoid sensitive territorial or ethnic-political topics unless the user has a qualified, official-source reason and wants a risk-managed rewrite.
   - Prefer neutral product, technology, business, and operational framing.

5. Finance risk
   - Objective data such as revenue, profit, valuation, funding, and market share can be reported with sources.
   - Remove buy/sell/hold language, market timing, "抄底", "逃顶", "牛市", "熊市", "投资机会", and similar guidance.
   - Add "本文不构成投资建议" when the article discusses securities, ETFs, secondary markets, or valuation speculation.

6. Cybersecurity risk
   - Cite official advisories, vendor reports, CVE pages, or security-team posts.
   - Avoid exploit steps, weaponization detail, panic framing, or "国家安全"/"关键基础设施" narratives unless required and properly sourced.
   - Rewrite toward defensive, patching, and risk-management language.

7. Title and tone
   - Reject exaggerated terms such as "震惊", "炸裂", "吊打", "碾压", "正式开打", "引爆", "历史性", "颠覆性", or suspense-question headlines.
   - Prefer specific, neutral subject-verb-object titles.
   - Ensure the title reflects the article's actual central point.

8. Formatting and publish readiness
   - Check H1/title, intro, section hierarchy, image references, captions/sources, final source list, AI disclosure when relevant, and disclaimers.
   - In HTML, check that images have valid `src`, tables are readable on mobile, and the article title is not duplicated inside WeChat content.

## Common Rewrites

| Risky wording | Safer wording |
| --- | --- |
| 正式开打 | 竞争加速 / 产品布局调整 |
| 炸裂发布 | 发布 / 推出 / 更新 |
| 碾压对手 | 在某项指标上领先 / 提升明显 |
| 引爆华尔街 | 引发市场关注 |
| 泡沫顶点 | 估值分歧加大 / 市场预期变化 |
| 建议买入 | 不使用投资建议表达 |
| 有消息称 | 据具体来源名称披露 |

## Verdict Guidance

- `PASS`: No hard-gate issues; only optional polish remains.
- `FIX_BEFORE_PUBLISH`: Publishable after concrete edits; no structural impossibility.
- `BLOCK`: High-risk topic, missing sources for major claims, investment advice, unlawful/unsafe detail, or severe copyright/compliance problem.
