# WeChat Article Review Skill

公众号文章发布前审核 skill。它专注于内容审查，不生成配图、不渲染 HTML、不上传素材、不发布草稿。

This skill reviews WeChat Official Account articles before publishing. It focuses only on content review; it does not generate images, render HTML, upload assets, or publish drafts.

## 功能 / Features

- 检查事实来源、引用完整性和可核验性。
- 识别原创、转载、聚合搬运和版权风险。
- 审核标题安全、夸张表达、敏感措辞和平台发布风险。
- 覆盖财经、政策、网络安全、医疗、法律等高风险话题边界。
- 检查 AI 辅助声明、配图引用、格式和发布前清单。
- 支持中文、英文和中英双语审核输出。

- Checks factual sourcing, attribution, and verifiability.
- Flags originality, reposting, aggregation, and copyright risks.
- Reviews title safety, sensational wording, sensitive phrasing, and platform risk.
- Covers high-risk boundaries for finance, policy, cybersecurity, medical, and legal topics.
- Checks AI disclosure, image references, formatting, and publish readiness.
- Supports Chinese, English, and bilingual review output.

## 语言切换 / Language Switching

默认跟随用户语言：

- 中文请求输出中文审核。
- English requests receive English reviews.

也可以显式指定：

- `中文`
- `English`
- `bilingual`
- `中英双语`
- `respond in English`
- `用中文审核`

In bilingual mode, verdict and checklist are kept once, while each finding can be shown as Chinese / English pairs.

## 使用方式 / Usage

在 Codex 中触发 skill：

```text
Use $wechat-article-review to review this article before publishing.
```

中文示例：

```text
用 $wechat-article-review 审核这篇公众号文章，输出中文结论。
```

中英双语示例：

```text
Use $wechat-article-review to review this article in bilingual mode.
```

如果文章已保存为文件，可运行内置扫描脚本：

```bash
node scripts/review-check.mjs path/to/article.md
```

The scanner returns a machine-readable JSON report with a verdict, summary, and flagged terms.

## 审核结论 / Verdicts

- `PASS`: No hard-gate issue was found.
- `FIX_BEFORE_PUBLISH`: Fix concrete issues before publishing.
- `BLOCK`: Do not publish until high-risk issues are removed or rewritten.

## 目录结构 / Structure

```text
wechat-article-review/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── references/
│   └── review-rubric.md
└── scripts/
    └── review-check.mjs
```

## 安全边界 / Safety Boundary

This skill does not store secrets, call publishing APIs, or modify WeChat drafts. It only reviews article content and local text files.
