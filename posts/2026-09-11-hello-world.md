# Hello World

This is the first post on my new site.

The blog is intentionally simple: each post is a plain Markdown file in the
`posts/` folder, listed in `posts/index.json`. There's no build step — the
page fetches the Markdown and renders it in the browser.

## How to add a new post

1. Create a new file in `posts/`, e.g. `posts/2026-10-01-my-post.md`.
2. Write the post in Markdown.
3. Add an entry to `posts/index.json`:

```json
{
  "slug": "2026-10-01-my-post",
  "title": "My Post",
  "date": "2026-10-01",
  "summary": "A one-line summary shown on the blog list.",
  "tags": ["example"]
}
```

4. Commit and push — GitHub Pages picks it up automatically.

That's it — no build tools, no CMS.
