/* ═══════════════════════════════════════════════════
   DEFAULT DATA (mirrors admin.js)
═══════════════════════════════════════════════════ */
const DEFAULT_DATA = {
  profile: {
    name: 'Your Name',
    title: 'IT Director & AI Innovator',
    tagline: 'Bridging enterprise leadership with cutting-edge AI to build systems that matter.',
    bio1: 'I lead enterprise IT strategy at scale — but what truly drives me is getting hands-on with the technology reshaping our world. I spend my nights and weekends building AI-powered tools, experimenting with large language models, and exploring what\'s possible at the frontier of machine intelligence.',
    bio2: 'My projects live at the intersection of practical utility and technical curiosity — tools that solve real problems, built with modern AI stacks.',
    status: 'Open to opportunities',
    photo: null,
    badges: ['Machine Learning', 'LLMs & Agents', 'Enterprise IT', 'AI Strategy']
  },
  stats: [
    { value: 15, label: 'Years in IT' },
    { value: 12, label: 'AI Projects' },
    { value: 500, label: 'GitHub Stars' },
    { value: 8, label: 'Technologies' }
  ],
  techStack: ['Python', 'LangChain', 'OpenAI API', 'Anthropic Claude', 'RAG', 'Vector DBs', 'FastAPI', 'React', 'Docker', 'AWS'],
  projects: [
    { id: 'p1', featured: true,  title: 'AI Knowledge Assistant',   desc: 'An enterprise-grade RAG system that lets teams query internal documents using natural language. Built with LangChain, ChromaDB, and Claude API — reduces support ticket volume by surfacing answers instantly.',           tags: ['LLM', 'RAG', 'Python'],             github: 'https://github.com/yourusername/ai-knowledge-assistant', cover: null, screenshots: [] },
    { id: 'p2', featured: false, title: 'Autonomous IT Agent',       desc: 'An AI agent that autonomously monitors infrastructure, diagnoses anomalies, and drafts incident reports — cutting MTTD by 60% in test environments.',                                                                      tags: ['Agents', 'Automation', 'API'],      github: 'https://github.com/yourusername/autonomous-it-agent',     cover: null, screenshots: [] },
    { id: 'p3', featured: false, title: 'Executive AI Briefing Bot', desc: 'Aggregates news, internal reports, and market data — then generates concise executive briefings using LLMs. Delivered as a clean dashboard with weekly email digests.',                                                     tags: ['NLP', 'Dashboard', 'React'],        github: 'https://github.com/yourusername/ai-briefing-bot',         cover: null, screenshots: [] },
    { id: 'p4', featured: false, title: 'Custom LLM Fine-Tuner',     desc: 'A pipeline for fine-tuning open-source LLMs on domain-specific datasets. Includes data prep, LoRA training, evaluation, and one-click model deployment to HuggingFace Hub.',                                               tags: ['Fine-tuning', 'PyTorch', 'MLOps'], github: 'https://github.com/yourusername/llm-fine-tuner',           cover: null, screenshots: [] }
  ],
  contact: { linkedin: 'https://linkedin.com/in/yourprofile', github: 'https://github.com/yourusername', email: 'you@email.com' }
};

function getPortfolioData() {
  try {
    const raw = localStorage.getItem('portfolioData');
    return raw ? JSON.parse(raw) : DEFAULT_DATA;
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

  // Stats
  const statsGrid = document.getElementById('statsGrid');
  if (statsGrid) {
    statsGrid.innerHTML = data.stats.map(s => `
      <div class="stat-card">
        <div class="stat-number" data-target="${s.value}">0</div>
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
            <p class="card-desc">${esc(proj.desc)}</p>
            <div class="card-screenshots" id="screenshots-${idx}">
              ${screenshots.map(s => `
                <div class="card-screenshot-img" onclick="openLightbox('${s.src.replace(/'/g,"\\'")}','${esc(s.caption)}')">
                  <img src="${s.src}" alt="${esc(s.caption)}" loading="lazy" />
                </div>
              `).join('')}
            </div>
            <div class="card-footer">
              <a href="${proj.github}" class="btn-link" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                View Source
              </a>
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
