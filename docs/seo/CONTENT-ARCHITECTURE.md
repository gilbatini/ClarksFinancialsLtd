# Educational content architecture

Clarks can differentiate by teaching people how to assess and prepare for borrowing. This is an information architecture, not an instruction to publish unreviewed financial claims.

## Proposed hierarchy

```text
/learn/                                  Educational hub
├── before-you-borrow/                   Decision preparation
│   ├── borrowing-checklist/
│   ├── questions-to-ask-a-lender/
│   └── alternatives-to-borrowing/
├── understand-loan-costs/               Cost literacy
│   ├── principal-interest-fees/
│   ├── flat-vs-reducing-balance/
│   └── calculate-total-repayment/
├── salary-loans/                        Product-adjacent education
│   ├── how-salary-loans-work/
│   ├── documents-to-prepare/
│   └── assess-repayment-capacity/
├── repayments/                          Servicing education
│   ├── create-a-repayment-plan/
│   ├── keep-payment-records/
│   └── what-to-do-before-a-missed-payment/
└── borrower-safety/                     Trust and protection
    ├── protect-personal-documents/
    ├── recognise-loan-scams/
    └── understand-a-loan-agreement/
```

URLs are proposed and are not added to the public route allowlist until compliant copy exists and each page passes the route-level SEO gates.

## Page model

Every educational page should contain, in order:

1. One plain-language H1 stating the question answered.
2. A short answer that does not promise an outcome.
3. A “what this means” explanation using neutral examples.
4. A checklist or decision framework.
5. A “questions to ask” section.
6. Relevant risks, limitations, or situations that require professional advice.
7. Source owner and last compliance-review date.
8. Two contextual internal links: one to a related lesson and one to `/faqs` or `/contact`.
9. A restrained next action. Product/application links appear only where the page intent justifies them.

## Hub and cluster linking

- The home page links to `/learn/` once the hub has at least three reviewed resources.
- Every lesson links back to its cluster page and the educational hub.
- Cluster pages link laterally only where a user would naturally continue the task.
- Product-adjacent lessons may link to `/loans`; preparation lessons may link to `/apply` only after clearly separating education from an application invitation.
- No educational page may be orphaned or exceed two clicks from `/learn/`.
- Breadcrumbs reflect the hierarchy and use the same labels as visible navigation.

## Search-intent map

| Cluster | Primary intent | Safe outcome |
|---|---|---|
| Before you borrow | Decide whether and how to borrow | A personal checklist and questions for any lender |
| Understand loan costs | Understand loan terminology and total cost | Ability to read a disclosure and compare like with like |
| Salary loans | Understand a salary-backed loan and prepare documents | Better-prepared questions and application documents |
| Repayments | Plan and document repayment | A practical record-keeping and contact plan |
| Borrower safety | Recognise risks and protect documents | Safer handling of identity documents and agreements |

## Structured-data and snippet policy

- Use `Article` or `WebPage` for reviewed lessons and `BreadcrumbList` for hierarchy.
- Use `FAQPage` only when the questions and answers are visible on that URL.
- Do not mark promotional copy as educational content.
- Never place rates, fees, eligibility, licence status, rankings, or statistics in metadata/schema without the same visible, approved source on the page.
- Descriptions summarise the lesson; they do not promise approval, savings, speed, or outcomes.

## Governance workflow

1. Content owner submits a brief with target question, intended reader, and evidence sources.
2. Writer drafts from approved sources and labels examples as examples.
3. Lending operations checks process accuracy.
4. Compliance approves all regulatory, product, and numeric statements.
5. SEO review checks headings, metadata, links, schema, claims, and route inclusion.
6. The page receives an owner, approval date, and review-by date before publication.
7. Material product/process changes trigger review of every linked lesson.

## Recommended release sequence

1. Borrowing checklist.
2. Questions to ask a lender.
3. Documents to prepare for a salary-loan enquiry.
4. Understanding principal, interest, fees, and total repayment.
5. Protecting identity documents and recognising scams.
6. Repayment planning and record keeping.

This order starts with evergreen, low-claim-risk education and delays product-specific cost content until Clarks supplies approved documentation.
