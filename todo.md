## Todo List

- [x] Render recent messages widget on dashboard with only required things.
- [x] Consolidate all blog data into a single JSON variable in `app/data/blogUnifiedData.js`.
- [x] Update `app/blog/page.js` to use `blogUnifiedData.js`.
- [x] Update `app/blog/[slug]/page.js` to use `blogUnifiedData.js`.
- [x] Verify compatibility of `BlogCard.jsx`, `BlogPostHero.jsx`, `AuthorBio.jsx`, `BlogContent.jsx`, `RelatedTags.jsx`, and `RelatedArticlesSection.jsx` with the new data structure.
- [x] Update `components/blog/BlogSection.jsx` to use `blogUnifiedData.js`.
- [x] Update `app/admin/blog-posts/page.js` to use `blogUnifiedData.js`.

## Review Section

- Modified `components/admin/RecentMessages.js` to:
  - Limit the displayed messages to the first three using `.slice(0, 3)`.
  - Use `message.name` for the sender.
  - Use `message.dateFormatted` for the message time.
  - Use `message.message` for the message text.
- Created `app/data/blogUnifiedData.js` with all blog posts, authors, and categories embedded in a single JavaScript object.
- Updated import paths in `app/blog/page.js`, `app/blog/[slug]/page.js`, `components/blog/BlogSection.jsx`, and `app/admin/blog-posts/page.js` to use `blogUnifiedData.js`.
- Adjusted data access in `app/admin/blog-posts/page.js` to use `blogPosts`, `unifiedBlogData.categories`, and `unifiedBlogData.authors`.
- Confirmed compatibility of related blog components with the new unified data structure.

# TODO: Blog Data Unification Refactor

## Goal

Refactor `app/data/blog/blogUnifiedData.js` into a pure data file (no logic, all fields resolved) so that both admin dashboard and public blog components can use a single, consistent data source. Ensure no change in rendered content or styling.

## Steps

- [ ] 1. Analyze the current structure of `blogUnifiedData.js` and the requirements of both admin and public blog components.
- [ ] 2. Design the unified data structure:
  - `posts`: Array of blog posts, each with all required fields, including fully resolved `author`, `category`, and `relatedArticles` (as objects, not slugs).
  - `categories`: Array of categories.
  - `authors`: Array of authors.
- [ ] 3. Write a script or use a one-time transformation to process the current data and output a new pure data file (e.g., `blogUnifiedDataFinal.js` or `blogUnifiedData.json`).
- [ ] 4. Remove all helper functions and logic from the data file. Only export the unified data object.
- [ ] 5. Update all imports in admin and public blog components to use the new unified data file.
- [ ] 6. Test both admin and public blog views to ensure content and styling are unchanged.
- [ ] 7. Document the new data structure and update any relevant README or developer notes.
- [ ] 8. Add a review section to this file summarizing the changes and confirming that the requirements were met.

---

**Check in with the team before starting the refactor.**
