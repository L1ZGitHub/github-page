# helain-zimmermann.com

The personal site of Hélain Zimmermann: one page, written as an interview in five questions, over a film that the
scroll plays. No framework, no build step, no tracking.

## Layout

| Path | What it is |
| --- | --- |
| `site/index.html` | The page: markup, styles and script in one file |
| `site/film/` | The film as video (`film-1280.mp4` for wide screens, `film-960.mp4` for phones, `film-rough.mp4` shown first on slow lines, `film-960.webm` where H.264 is missing) and its first frame |
| `site/fonts/` | Butler, Bricolage Grotesque, Spline Sans Mono, self-hosted |
| `site/tg-engine.js` | Drawing engine of the plant on the left rail, fetched on wide screens only |
| `site/files/` | The CV |
| `site/robots.txt`, `sitemap.xml`, `llms.txt`, `humans.txt`, `.well-known/security.txt`, `site.webmanifest` | Discovery files |
| `site/legal.html` | Legal notice and privacy, served at `/legal` |
| `site/404.html` | Shown for missing pages and for the retired blog |
| `nginx.conf` | Caching, security headers, and what the previous site's addresses now return |
| `Dockerfile` | nginx serving `site/` on port 3000 |

## Preview

```bash
docker build -t helain-site .
docker run --rm -p 3000:3000 helain-site    # http://localhost:3000
```

`?jump=<pixels>` opens the page at a scroll position, which helps when checking one moment of the film.

## Deploy

Coolify builds the `Dockerfile` from `main` and routes helain-zimmermann.com to port 3000.

## The previous site

Until October 2026 this repository held a Next.js site with a blog. `/about` and `/contact` now redirect to the front
page; `/blog`, `/feed.xml`, `/admin` and `/editorial-policy` answer 410 Gone.

`/legal/` and `/legal.html` redirect to `/legal`, and `/mentions-legales` to its French part.

## Credits

The plant on the rail is drawn with the engine of [Type Garden](https://type-garden.vercel.app) by Akshat Agarwal.
Butler by Fabian De Smet, Bricolage Grotesque by Mathieu Triay, Spline Sans Mono by SorkinType.
