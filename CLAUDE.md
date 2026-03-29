# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static client-side portfolio website built with **vanilla HTML/CSS/JavaScript** — no build tools, frameworks, or package managers. All data is persisted in `localStorage`.

## Running the Project

No build step required. Serve directly in a browser:

```bash
python -m http.server 8080
# then open http://localhost:8080
```

- **Portfolio**: `index.html`
- **Admin panel**: `admin.html` (password-protected via `sessionStorage`)

## Architecture

### Two-page structure

| File | Role |
|------|------|
| `index.html` + `app.js` + `styles.css` | Public-facing portfolio |
| `admin.html` + `admin.js` + `admin.css` | Content management panel |

### Data layer

All content lives in a single JSON blob under `localStorage['portfolioData']`. Default data is hardcoded in both `app.js` and `admin.js` as `DEFAULT_DATA`. On first load, defaults are written to localStorage; from then on, the admin panel is the source of truth.

**Data shape:**
```javascript
{
  profile: { name, title, tagline, bio1, bio2, status, photo, badges },
  stats: [{ value, label }],
  techStack: ["..."],
  projects: [{ id, featured, title, desc, tags, github, demo, cover, screenshots }],
  contact: { linkedin, github, email }
}
```

Images (profile photo, project covers, screenshots) are stored as **Base64 data URLs** inside the JSON blob.

### Rendering (app.js)

- `renderPortfolio(data)` is the top-level render function called on load
- DOM is built via template literals; always use the `esc()` helper when interpolating user-controlled strings to prevent XSS
- Scroll animations use `IntersectionObserver`; stat counters animate on scroll-into-view

### Admin panel (admin.js)

- Tab-based sidebar UI (Profile, Projects, Stats, Tech Stack, Contact, Files, Security)
- Authentication: `sessionStorage['adminLoggedIn']`; password stored in `localStorage['portfolioAdminPass']` (default: `admin123`)
- Project CRUD uses a modal; projects support cover images + multiple screenshots
- Chip/tag inputs follow a consistent add-on-Enter / click-to-remove pattern

## Key Conventions

- Navigation uses anchor fragments (`#hero`, `#about`, `#projects`, `#contact`) — no client-side router
- CSS uses custom properties (variables) defined on `:root` for the color palette; primary accents are `#3d6cff`, `#7c3aed`, `#06b6d4`
- All dynamic HTML must go through `esc()` for text content to avoid XSS
- The repo deploys as a static site (GitHub Pages / any static host) — keep it dependency-free
