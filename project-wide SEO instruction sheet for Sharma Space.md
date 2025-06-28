Below is the **project-wide SEO instruction sheet** that every AI agent, developer, copy-writer, and designer working on the new **Sharma Space** website **MUST** follow. It encodes 2025-ready best practices, Google’s latest core-update rules, and interior-design-specific tactics for Bangalore-centred growth while still scaling to nearby-city and pan-India searches.

---

## 0. Governing Principles

1. **Helpful-First** – Publish only original, experience-backed content (project photos, cost data, design insights). No thin or purely AI-generated filler; violating Google’s March 2024 “Helpful Content”-into-core update risks site-wide ranking loss. ([seobotai.com](https://seobotai.com/blog/core-web-vitals-complete-guide-2024/?utm_source=chatgpt.com))
2. **E-E-A-T Everywhere** – Every page must demonstrate *Experience, Expertise, Authoritativeness, Trust*: real author by-lines + credentials, client proof, accurate facts, and external citations.
3. **CWV Gatekeeping** – Block any deploy whose **LCP > 2.5 s, CLS > 0.10, INP > 200 ms** on mobile. Integrate Google CWV API in CI/CD; fail builds on regression. ([seobotai.com](https://seobotai.com/blog/core-web-vitals-complete-guide-2024/?utm_source=chatgpt.com), [monovm.com](https://monovm.com/blog/core-web-vitals-optimization/?utm_source=chatgpt.com))
4. **Mobile-First** – All layouts tested on 360 × 640 viewport; content parity required.
5. **Local-First** – Bangalore & suburb intent outrank global; never remove geo modifiers from titles or body copy when present.

---

## 1. Keyword & Content Directives


| **Tier**                   | **Usage Rule**                                                                    | **Sample Target**                               | **Placement**                   |
| -------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------- |
| **Tier-A (City)**          | Must appear once in , H1, URL slug, first 100 words, and one image`alt`.          | “interior designers in bangalore”             | `/interior-designers-bangalore` |
| **Tier-B (Neighbourhood)** | Use in dedicated H2 + paragraph; group by page section or separate landing pages. | “interior designers in Whitefield”            | `/locations/whitefield`         |
| **Tier-C (Service)**       | Use in H2/H3 and meta description; may be shared across pages.                    | “modular kitchen design”, “wardrobe design” | `/services/modular-kitchens`    |

* Always add one **FAQ** for each Tier-B/C keyword and mark it up with FAQPage schema.
* Maintain a **bi-weekly blog calendar** (2 posts/month) that alternates:
  * Week 1 – Bangalore trend/guide
  * Week 3 – Case study / pan-India design topic
* Each post: 800–1 600 words, unique images, one snippet-ready 40-60-word answer block, at least three internal links and one authoritative outbound citation.

---

## 2. Page-Level SEO Checklist (applies to **every** public URL)


| Element          | Mandatory Rule                                                                                                                                                                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<title>`        | ≤ 60 chars; start with primary keyword + benefit (“Interior Designers in Bangalore                                                                                                                                                         |
| Meta description | ≤ 155 chars; include USP + CTA; unique per page.                                                                                                                                                                                            |
| H1               | Exactly one; mirrors core keyword.                                                                                                                                                                                                           |
| H2-H6            | Logical outline; no skipped levels.                                                                                                                                                                                                          |
| Slug             | Lowercase, hyphen-separated; include main keyword (`/about-bangalore-interior-design-firm`).                                                                                                                                                 |
| Images           | WebP/AVIF via`next/image`; explicit`width`&`height`; descriptive`alt`with keyword variation and no stop-word stuffing.                                                                                                                       |
| Structured data  | JSON-LD only. Minimum set: BreadcrumbList + WebSite. Add Article schema on blogs, LocalBusiness on Contact/footer, Product or Service where relevant, FAQ on FAQ blocks, Review where testimonial displayed. Validate via Rich Results Test. |
| Internal links   | Add at least one contextual anchor to**parent**,**sibling**, and**child**pages; keep click-depth ≤ 3.                                                                                                                                       |
| External links   | Allowed only to high-authority design / gov / edu / news domains; open in new tab; rel="noopener".                                                                                                                                           |
| Canonical        | Self-canonical on all ordinary pages; cross-canonical only for legitimate alternates (e.g., paginated series).                                                                                                                               |
| Accessibility    | WCAG 2.2 AA: focus states, aria-labels for icon-only buttons, text contrast ≥ 4.5:1.                                                                                                                                                        |

---

## 3. Technical SEO & Next.js Build Rules

### Rendering & Routing

1. **SSR/SSG** for all static or semi-static pages (Home, Services, Blog posts) to ship full HTML.
2. Use **ISR (revalidate)** for dynamic Portfolio pages (update on publish, not every request).
3. **15 KB per JS chunk** budget; if exceeded, split further.
4. Permanent redirects: enforce trailing-slash consistency and HTTPS.

### Performance & Assets

* `next/image` with automatic `srcset`; priority flag on hero images; `loading="lazy"` elsewhere.
* Pre-connect to fonts/CDNs; inline critical CSS only if < 6 KB.
* Enable HTTP/2 or HTTP/3 + Brotli compression on hosting.
* Implement service-worker caching of static assets ≥ 1 week.

### Crawl & Index

* `robots.txt`: allow `/`, disallow `/admin`, `/api/*`; reference `sitemap.xml`.
* Auto-generate XML and HTML sitemaps on each build; ping Google & Bing.
* No orphan pages – enforce link from at least one high-authority internal page before deploy.

### Security

* Force HTTPS; HSTS preload (`max-age=63072000; includeSubDomains; preload`).
* Set: `Content-Security-Policy`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin`.

---

## 4. Local SEO Protocol

1. **NAP Consistency** – Use EXACT same Name, Address, Phone in footer, Contact page, schema, and Google Business Profile.
2. **LocalBusiness schema** fields required: `@id`, `name`, `address`, `telephone`, `geo`, `openingHoursSpecification`, `areaServed` (“Bangalore”, “Whitefield”, “Indiranagar”, etc.).
3. **Neighbourhood Hubs** – Create `/locations/[area]` pages for major suburbs; unique 300-word intro + one case study + CTA + map embed. No doorway content.
4. **GBP Care** – Upload ≥ 5 fresh project photos monthly; answer new Q&A weekly; seek at least 3 new Google reviews/month and respond to all reviews within 48 h.

---

## 5. Rich-Media & Zero-Click Optimisation


| Element                    | Rule                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| Featured-snippet paragraph | 40-60 words; plain sentence(s); near top with question heading.                                  |
| Lists/Tables               | Use`<ol>/<ul>`or`<table>`to target list/table snippets; concise.                                 |
| FAQ blocks                 | 3-6 Q&A; wrap in`<details>`for UX; JSON-LD FAQ schema.                                           |
| Video                      | Host on YouTube + embed; add`VideoObject`schema; include captions and transcript on page.        |
| Speakable (optional)       | For key explainer pages, mark 2-3 short paragraphs with`SpeakableSpecification`for voice search. |

---

## 6. Link-Building & Digital PR

* **Content pillars**: publish data-driven design cost guides, local trend studies; pitch to Bangalore press & architecture magazines → backlinks.
* **Unlinked mentions**: run monthly Ahrefs alert; request do-follow link for every press mention.
* **Internal anchor style**: use descriptive anchors (“modular kitchen price guide”) – no “click here”.
* **Quarterly toxic-link audit** using GSC + Ahrefs; disavow spam domains if DR < 10 and irrelevant.

---

## 7. Analytics, Tracking & QA


| Tool                        | Mandatory Configuration                                                                                                     |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Google Search Console**   | Production & staging properties; submit sitemap; fix coverage errors < 7 days.                                              |
| **GA-4**                    | Enhanced measurement + scroll & outbound click events; define conversions for*consultation booked*and*contact form submit*. |
| **Core Web Vitals API**     | Integrated into CI; break build on threshold fail.                                                                          |
| **Uptime & SSL monitor**    | 60-second polling; email on failure.                                                                                        |
| **Quarterly Content Audit** | Identify outdated posts; consolidate cannibalising articles; refresh stats; prune thin content.                             |

---

## 8. Content & Design Governance

1. **Image Rights** – Only original project photos or licensed stock; always attribute if required.
2. **Author Profiles** – Each post must have an `author` object: name, role, credentials, social link.
3. **Update Logs** – Add “Last updated” dateline to every evergreen page; update at least yearly.
4. **Tone & Voice** – Professional yet approachable; short sentences; avoid jargon; align with brand persona “Creative, Trustworthy, Bangalore-rooted”.
5. **Legal & Trust** – Visible Privacy Policy, Terms, and Cookies banner (non-intrusive).

---

### STRICT COMPLIANCE

*Every AI-generated output (code, copy, image alt text, metadata, schema) ****MUST**** be validated against this checklist ****before**** merge or publication. The SEO lead reserves veto power on any deliverable that breaches even one guideline.*

Following these instructions guarantees that Sharma Space’s new Next.js site launches with a **clean, fast, E-E-A-T-rich foundation** tuned for 2025 Google algorithms — maximising Bangalore visibility, nearby-city reach, and pan-India authority.
