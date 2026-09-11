# oscarberntsson.github.io

Personal portfolio and blog, built with plain HTML/CSS/JS — no build step.

## Local preview

Serve the folder with any static file server, e.g.:

```
python -m http.server
```

or

```
npx serve
```

Then open `http://localhost:8000` (or whatever port is printed).

## Structure

- `index.html` — home page (about, skills, projects, contact)
- `blog.html` — blog post listing
- `post.html` — single post view (renders Markdown from `posts/`)
- `css/style.css` — shared styles
- `js/main.js`, `js/blog.js` — nav highlighting, blog fetch/render logic
- `posts/index.json` — blog post manifest
- `posts/*.md` — individual post content

## Adding a blog post

1. Add a new Markdown file under `posts/`.
2. Add a matching entry to `posts/index.json`.
3. Commit and push to `main` — GitHub Pages serves it automatically.

## Deployment

This repo is a GitHub *user site* (named `<username>.github.io`), so GitHub
Pages serves it directly from the `main` branch root — no build/Actions step
needed. Enable it under repo **Settings → Pages → Source: Deploy from a
branch → `main` / `/ (root)`**.
