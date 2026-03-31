/* ═══════════════════════════════════════════════════
   DEFAULT DATA (mirrors admin.js)
═══════════════════════════════════════════════════ */
const DEFAULT_DATA = {
  profile: {
    name: 'Dino Leishangthem',
    title: 'Strategic Leader and AI enthusiast',
    tagline: 'Bridging enterprise leadership with cutting-edge AI to build systems that matter.',
    bio1: 'At Capgemini France, I lead at scale — managing multiple enterprise engagements, owning business growth across the country account, and building the teams that make it happen.',
    bio2: 'What sets me apart: I don\'t stop at strategy. I spend my time outside the office building AI-powered tools from scratch — working hands-on with LLMs, vector databases, and agentic systems.',
    bio3: 'Projects built at the intersection of real utility and deep curiosity — because the best leaders in the AI era aren\'t just directing from above, they understand what they\'re directing.',
    status: 'Open to explore',
    photo: 'assets/dino.jpeg',
    badges: ['Machine Learning', 'LLMs & Agents', 'Enterprise IT', 'AI Strategy']
  },
  stats: [
    { value: 20, label: 'Years in IT' },
    { value: 6, label: 'AI Projects' },
    { value: 'PMP/EM2', label: 'Certifications' },
    { value: 5, label: 'Industries' }
  ],
  techStack: ['React', 'TypeScript', 'Google Gemini AI', 'Firebase', 'Vite', 'Python', 'LangChain', 'OpenAI API', 'Anthropic Claude', 'RAG', 'FastAPI', 'Docker'],
  projects: [
    {
      id: 'neko-metrics',
      featured: true,
      title: 'Neko Metrics — AI Business Intelligence Platform',
      desc: 'A production-grade, AI-augmented Business Intelligence platform built from scratch to manage a multi-outlet restaurant chain. Replaces spreadsheets with a real-time Gemini-AI-powered intelligence layer — giving executives, operations managers, and crew a single source of truth for every financial and operational decision.\n\nThe AI core (Google Gemini) generates on-demand strategic diagnostic reports in the Margin Intelligence module — analysing revenue quality, cost structure, and efficiency signals across all active outlets. A custom Projection Engine forecasts revenue trajectories from historical velocity data. Firebase powers real-time sync and multi-user auth. Weather data is integrated contextually to correlate footfall with environmental conditions.\n\nKey modules: CEO Dashboard (global KPIs + outlet yield rankings), Sales Intelligence (velocity, trajectory, day-part & AI projections), P&L Command (settled revenue vs. operational burn + profit waterfall), Expense Radar (COGS + outflow reconciliation), Waste Radar v2 (material reconciliation & relational drift analysis), Margin Intelligence (AI-generated strategic briefings), Partnership Forge, Crew Terminal, and full User Management.',
      tags: ['Gemini AI', 'React', 'TypeScript', 'Firebase', 'Vite', 'Real-time Analytics'],
      github: 'https://github.com/dinoleix/Neko-Metric-version-3.3',
      demo: 'https://neko-metric-version-3-3.vercel.app/',
      cover: 'assets/screenshots/neko-ceo-dashboard.png',
      screenshots: [
        { url: 'assets/screenshots/neko-ceo-dashboard.png', caption: 'CEO Dashboard — Real-time KPIs: Global Revenue ₹9,73,582 · Recommended Net Profit ₹1,13,123 · Group Net Margin 11.6% · Outlet Yield Rankings' },
        { url: 'assets/screenshots/neko-sales-intelligence.png', caption: 'Sales Intelligence — Multi-month Performance: POS Revenue ₹9,350,645 · Outlet Velocity Comparison · Trajectory & Projections views' }
      ]
    },
    {
      id: 'rag-knowledge-base',
      featured: true,
      title: 'RAG Knowledge Base',
      desc: 'A production-ready Retrieval-Augmented Generation app that lets you upload documents (PDF, TXT, MD) and ask questions against them — getting grounded answers with full source citations.\n\nDocuments are chunked and embedded via gemini-embedding-001, with vectors stored in ChromaDB using cosine similarity. At query time, the top-k relevant chunks are retrieved and fed exclusively to Gemini 2.5 Flash, ensuring answers stay grounded in the uploaded content. The FastAPI backend handles document ingestion and retrieval, while the clean dark-mode UI provides suggested starter prompts and a real-time chat interface.',
      tags: ['RAG', 'Gemini AI', 'ChromaDB', 'FastAPI', 'Python'],
      github: 'https://github.com/dinoleix/rag-knowledge-base',
      demo: 'https://rag-knowledge-base-one.vercel.app/',
      cover: 'assets/screenshots/rag-knowledge-base.png',
      screenshots: [
        { url: 'assets/screenshots/rag-knowledge-base.png', caption: 'RAG Knowledge Base — Upload documents and ask questions with grounded answers and source citations powered by Gemini 2.5 Flash + ChromaDB' }
      ]
    },
    {
      id: 'resume-jd-matcher',
      featured: true,
      title: 'Resume / JD Matcher',
      desc: 'An AI-powered browser tool that analyzes your resume against any job description — instantly returning a match score, matched skills, skill gaps, and specific suggestions to improve your resume for that role.\n\nBuilt entirely client-side with vanilla JavaScript and the Google Gemini API (gemini-2.5-flash). PDF resumes are parsed in the browser via pdf.js — no file ever leaves your device. Supports both Gemini and Claude as AI providers via a toggle. No backend, no database, no data stored anywhere.',
      tags: ['Gemini AI', 'JavaScript', 'pdf.js', 'AI Tool', 'No-Backend'],
      github: 'https://github.com/dinoleix/ai-portfolio',
      demo: 'https://ai-portfolio-wheat-six.vercel.app/resume-matcher.html',
      cover: 'assets/screenshots/resume-matcher.png',
      screenshots: [
        { url: 'assets/screenshots/resume-matcher.png', caption: 'Resume / JD Matcher — AI-powered match score, skill gap analysis, and actionable resume suggestions powered by Gemini 2.5 Flash' }
      ]
    },
    {
      id: 'neko-pulse',
      featured: true,
      title: 'Neko Pulse — Crew Intelligence Platform',
      desc: 'A full-stack, PWA-ready crew management platform built for outlet operations. Combines biometric facial recognition, QR-code attendance, AI-powered insights, shift scheduling, HR management, and real-time analytics — all inside a single installable mobile-first app.\n\nBuilt with React 19 + TypeScript on the frontend, Firebase 12 (Firestore + Auth) as the real-time backend, and Google Gemini for natural language queries like "Who was late most this month?" Role-based access control (Admin, Manager, Crew) enforced at both the UI and Firestore security rules level. Installable on iOS and Android via PWA — no app store required.',
      tags: ['React 19', 'TypeScript', 'Firebase', 'Gemini AI', 'face-api.js', 'PWA', 'Vite'],
      github: 'https://github.com/dinoleix/Neko-Pulse-6.5',
      demo: null,
      cover: 'assets/screenshots/neko-pulse.svg',
      screenshots: [
        { url: 'assets/screenshots/neko-pulse.svg', caption: 'Neko Pulse — Crew Intelligence Platform with biometric face recognition, QR attendance, AI insights, and real-time analytics dashboard' }
      ]
    },
    {
      id: 'eatpham',
      featured: false,
      title: 'Eatpham — Manipuri Restaurant Website',
      desc: 'A fully custom restaurant website for Eatpham, an authentic Manipuri cuisine restaurant in Delhi (4.3★ on Google, 1,380+ reviews). Built with vanilla HTML/CSS/JS — no frameworks, no CMS.\n\nFeatures an interactive tabbed menu with pricing, photo gallery with lightbox, Google Maps integration, customer reviews section, and smooth scroll animations. Elegant design using deep jade greens, cream, and gold accents with Cormorant Garamond typography to reflect the restaurant\'s cultural identity and premium positioning.',
      tags: ['Web Design', 'HTML/CSS/JS', 'Restaurant', 'Responsive'],
      github: 'https://github.com/dinoleix/Eatpham',
      demo: 'https://eatpham.vercel.app/',
      cover: 'assets/screenshots/eatpham.png',
      screenshots: [
        { url: 'assets/screenshots/eatpham.png', caption: 'Eatpham — Authentic Manipuri cuisine restaurant website with interactive menu, gallery, and reservations' }
      ]
    },
    { id: 'p2', featured: false, title: 'Autonomous IT Agent',       desc: 'An AI agent that autonomously monitors infrastructure, diagnoses anomalies, and drafts incident reports — cutting MTTD by 60% in test environments.',                                                                      tags: ['Agents', 'Automation', 'API'],      github: 'https://github.com/dinoleix/autonomous-it-agent',     demo: null, cover: null, screenshots: [] },
    { id: 'p3', featured: false, title: 'Executive AI Briefing Bot', desc: 'Aggregates news, internal reports, and market data — then generates concise executive briefings using LLMs. Delivered as a clean dashboard with weekly email digests.',                                                     tags: ['NLP', 'Dashboard', 'React'],        github: 'https://github.com/dinoleix/ai-briefing-bot',          demo: null, cover: null, screenshots: [] },
    { id: 'p4', featured: false, title: 'Custom LLM Fine-Tuner',     desc: 'A pipeline for fine-tuning open-source LLMs on domain-specific datasets. Includes data prep, LoRA training, evaluation, and one-click model deployment to HuggingFace Hub.',                                               tags: ['Fine-tuning', 'PyTorch', 'MLOps'], github: 'https://github.com/dinoleix/llm-fine-tuner',            demo: null, cover: null, screenshots: [] }
  ],
  contact: { linkedin: 'https://fr.linkedin.com/in/dinoleishangthem', github: 'https://github.com/dinoleix', email: 'dino.leix@gmail.com' }
};

function getPortfolioData() {
  try {
    const raw = localStorage.getItem('portfolioData');
    if (!raw) return DEFAULT_DATA;
    const stored = JSON.parse(raw);
    // Merge any new projects from DEFAULT_DATA that aren't in localStorage yet
    const storedIds = new Set((stored.projects || []).map(p => p.id));
    const newProjects = DEFAULT_DATA.projects.filter(p => !storedIds.has(p.id));
    if (newProjects.length) {
      stored.projects = [...newProjects, ...(stored.projects || [])];
      localStorage.setItem('portfolioData', JSON.stringify(stored));
    }
    return stored;
  } catch { return DEFAULT_DATA; }
}

/* ═══════════════════════════════════════════════════
   RENDER PORTFOLIO FROM DATA
═══════════════════════════════════════════════════ */
function renderPortfolio(data) {
  const p = data.profile;

  // Photo
  if (p.photo) {
    const photoEl = document.getElementById('profilePhoto');
    if (photoEl) {
      photoEl.src = p.photo;
      photoEl.style.display = 'block';
      const initials = document.getElementById('photoInitials');
      if (initials) initials.style.display = 'none';
    }
  }

  // Hero text
  setText('heroTitle',     p.title);
  setText('heroName',      p.name);
  setText('heroTagline',   p.tagline);
  setText('heroStatusText', p.status);

  // Badges
  const badgesEl = document.getElementById('heroBadges');
  if (badgesEl) badgesEl.innerHTML = p.badges.map(b => `<span class="badge">${esc(b)}</span>`).join('');

  // About bio
  setText('aboutBio1', p.bio1);
  setText('aboutBio2', p.bio2);
  setText('aboutBio3', p.bio3 || '');

  // Stats
  const statsGrid = document.getElementById('statsGrid');
  if (statsGrid) {
    statsGrid.innerHTML = data.stats.map(s => `
      <div class="stat-card">
        <div class="stat-number" data-target="${s.value}">${typeof s.value === 'number' ? '0' : esc(String(s.value))}</div>
        <div class="stat-label">${esc(s.label)}</div>
      </div>
    `).join('');
  }

  // Tech pills
  const techPills = document.getElementById('techPills');
  if (techPills) techPills.innerHTML = data.techStack.map(t => `<span class="pill">${esc(t)}</span>`).join('');

  // Projects
  renderProjects(data.projects);

  // Contact
  const c = data.contact;
  const linkedinEl = document.getElementById('contactLinkedin');
  const githubEl   = document.getElementById('contactGithub');
  const emailEl    = document.getElementById('contactEmail');
  const emailText  = document.getElementById('contactEmailText');
  if (linkedinEl) linkedinEl.href = c.linkedin;
  if (githubEl)   githubEl.href   = c.github;
  if (emailEl)    emailEl.href    = `mailto:${c.email}`;
  if (emailText)  emailText.textContent = c.email;
}

function renderProjects(projects) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  if (!projects || !projects.length) { grid.innerHTML = '<p style="color:var(--text-faint);text-align:center;padding:40px">No projects yet — add some in the admin panel.</p>'; return; }

  grid.innerHTML = projects.map((proj, idx) => {
    const hasCover = proj.cover;
    const isFirst  = idx === 0;
    const featured = proj.featured;

    const placeholderColors = ['#3d6cff','#7c3aff','#06b6d4','#10b981'];
    const placeholderColor  = placeholderColors[idx % placeholderColors.length];

    const mediaHtml = `
      <div class="card-media${hasCover ? '' : ' no-img'}">
        ${hasCover ? `<img src="${proj.cover}" alt="${esc(proj.title)}" class="card-img" />` : ''}
        <div class="card-img-placeholder">
          <svg viewBox="0 0 80 60" fill="none"><rect width="80" height="60" rx="6" fill="#1a1f35"/><rect x="8" y="8" width="64" height="32" rx="3" fill="#232a45"/><circle cx="20" cy="24" r="6" fill="${placeholderColor}" opacity=".6"/><rect x="30" y="20" width="34" height="3" rx="1.5" fill="${placeholderColor}" opacity=".4"/><rect x="30" y="26" width="22" height="2" rx="1" fill="${placeholderColor}" opacity=".25"/><rect x="8" y="46" width="18" height="3" rx="1.5" fill="${placeholderColor}" opacity=".3"/></svg>
          <span>No cover image</span>
        </div>
        ${featured ? '<div class="card-tag-featured">Featured</div>' : ''}
      </div>`;

    const screenshots = proj.screenshots || [];

    return `
      <article class="project-card${featured ? ' featured' : ''}" data-index="${idx}">
        <div class="card-inner">
          ${mediaHtml}
          <div class="card-body">
            <div class="card-tags">${proj.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
            <h3 class="card-title">${esc(proj.title)}</h3>
            <div class="card-desc">${proj.desc.split('\n\n').map(p => `<p>${esc(p)}</p>`).join('')}</div>
            ${featured && proj.desc.length > 200 ? `<button class="btn-read-more" onclick="toggleFeaturedDesc(${idx})">Read more ↓</button>` : ''}
            <div class="card-screenshots" id="screenshots-${idx}">
              ${screenshots.map(s => {
                const imgSrc = s.url || s.src || '';
                return `
                <div class="card-screenshot-img" onclick="openLightbox('${imgSrc.replace(/'/g,"\\'")}','${esc(s.caption)}')">
                  <img src="${imgSrc}" alt="${esc(s.caption)}" loading="lazy" />
                </div>`;
              }).join('')}
            </div>
            <div class="card-footer">
              <a href="${proj.github}" class="btn-link" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                Source Code
              </a>
              ${proj.demo ? `
              <a href="${proj.demo}" class="btn-link btn-link-demo" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>` : ''}
              ${screenshots.length ? `
              <button class="btn-expand" onclick="toggleScreenshots(${idx})">
                Infographics
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>` : ''}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val || '';
}

function esc(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ═══════════════════════════════════════════════════
   INTERACTIONS
═══════════════════════════════════════════════════ */

// NAV
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));
hamburger.addEventListener('click', () => nav.classList.toggle('menu-open'));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => nav.classList.remove('menu-open')));

// FEATURED DESC EXPAND
function toggleFeaturedDesc(idx) {
  const desc = document.querySelector(`[data-index="${idx}"] .card-desc`);
  const btn  = document.querySelector(`[data-index="${idx}"] .btn-read-more`);
  if (!desc) return;
  desc.classList.toggle('expanded');
  if (btn) btn.textContent = desc.classList.contains('expanded') ? 'Show less ↑' : 'Read more ↓';
}

// SCREENSHOTS TOGGLE
function toggleScreenshots(index) {
  const panel = document.getElementById(`screenshots-${index}`);
  const btn   = panel && panel.closest('.card-body').querySelector('.btn-expand');
  if (!panel) return;
  panel.classList.toggle('open');
  if (btn) btn.classList.toggle('active');
}

// LIGHTBOX
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose   = document.getElementById('lightboxClose');

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxCaption.textContent = caption || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
function closeLightbox() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }

// SCROLL REVEAL
const revealSelectors = ['.section-label','.section-title','.section-sub','.about-text','.about-stats','.tech-stack','.project-card','.contact-card','.stat-card'];
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

function initReveal() {
  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      if (i === 1) el.classList.add('reveal-delay-1');
      if (i === 2) el.classList.add('reveal-delay-2');
      revealObserver.observe(el);
    });
  });
}

// STAT COUNTER ANIMATION
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { animateCounter(entry.target); statObserver.unobserve(entry.target); } });
}, { threshold: 0.5 });

function initStatCounters() {
  document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  if (isNaN(target)) { el.textContent = el.dataset.target; return; }
  const start  = performance.now();
  const dur    = 1800;
  function update(now) {
    const t = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(ease * target) + '+';
    if (t < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// SCROLL SPY
const sections = ['hero','about','projects','contact'].map(id => document.getElementById(id));
const navLinks  = document.querySelectorAll('.nav-links a');
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => { link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text)' : ''; });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => s && spyObserver.observe(s));

/* ═══════════════════════════════════════════════════
   BOOT
═══════════════════════════════════════════════════ */
renderPortfolio(getPortfolioData());
initReveal();
initStatCounters();
