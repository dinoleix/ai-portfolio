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

## Deployment

- **GitHub repo**: `https://github.com/dinoleix/ai-portfolio`
- **Live site**: `https://ai-portfolio-wheat-six.vercel.app/`
- **Resume Matcher**: `https://ai-portfolio-wheat-six.vercel.app/resume-matcher.html`
- **Hosting**: Vercel (connected to GitHub, auto-deploys on every push to main). No build command, output directory is `/` (root).

## User Setup & Preferences

- Uses **Google Gemini API** (free tier) for AI tools — currently `gemini-2.5-flash` model
- Has a Vercel account for deployment (already connected to GitHub repo, auto-deploys on push)
- Portfolio GitHub repo: `dinoleix/ai-portfolio`
- Does NOT have an Anthropic API key yet (plans to buy later) — default to Gemini for all AI tools
- Prefers vanilla HTML/CSS/JS — no frameworks, no build tools

## Projects Built This Session

### Resume / JD Matcher (`resume-matcher.html`)
A fully working AI tool built across two phases:

**Files:**
- `resume-matcher.html` — two-column input layout, API key bar, provider toggle, results panel
- `resume-matcher.css` — dark-theme styling matching portfolio design system
- `resume-matcher.js` — pdf.js text extraction, Gemini/Claude API fetch, JSON parsing, UI rendering

**Key decisions made:**
- PDF parsing via `pdf.js` CDN (no backend needed)
- Dual provider toggle: **Gemini** (default, free) ↔ **Claude** (when user buys a key)
- Model: `gemini-2.5-flash` — confirmed working; `gemini-2.0-flash` had exhausted daily quota on the test key
- `maxOutputTokens: 8192` — 2048 caused JSON truncation in Gemini 2.5-flash responses
- Gemini wraps JSON in ` ```json ``` ` fences — `parseAIJson()` strips these before parsing
- API key stored per-provider in `sessionStorage` (`rm_key_gemini`, `rm_key_claude`)
- `anthropic-dangerous-direct-browser-access: true` header required for browser → Claude API calls

**Live demo:** `https://ai-portfolio-wheat-six.vercel.app/resume-matcher.html`

**Added as featured project** in `DEFAULT_DATA` in both `app.js` and `admin.js` with id `resume-jd-matcher`

**Git commits (in order):**
- `d313fb1` — Initial Phase 1 + 2 (HTML/CSS/JS)
- `e2c3562` — Gemini provider toggle, gemini-2.5-flash, maxOutputTokens fix
- `644fa50` — Added Vercel live URLs to CLAUDE.md
- `f1a34e0` — Added Resume Matcher to project listings in app.js + admin.js

## AI Projects Roadmap (suggested to user)

1. ✅ RAG Knowledge Base (already built)
2. ✅ Resume / JD Matcher (built this session)
3. 🔜 AI Meeting Summarizer — audio/transcript → structured summary + action items
4. 🔜 Persona Chatbot Builder — no-code tool to create custom chatbots
5. 🔜 AI-Powered SQL Generator — natural language → SQL
6. 🔜 Voice-Controlled Portfolio — voice assistant that answers recruiter questions

## Gemini API Notes

- Free tier model that works: `gemini-2.5-flash`
- `gemini-2.0-flash` had `limit: 0` daily quota exhausted on the test key
- `gemini-1.5-flash` not available on v1beta endpoint (404)
- Always use `v1beta` endpoint: `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}`
- API key goes as query param (not header) for Gemini
- Set `maxOutputTokens: 8192` minimum to avoid truncation on complex JSON responses
