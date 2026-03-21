/* ═══════════════════════════════════════════════════
   DEFAULT DATA
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
    { id: 'p2', featured: false, title: 'Autonomous IT Agent',       desc: 'An AI agent that autonomously monitors infrastructure, diagnoses anomalies, and drafts incident reports — cutting MTTD by 60% in test environments.',           tags: ['Agents', 'Automation', 'API'],      github: 'https://github.com/dinoleix/autonomous-it-agent',  demo: null, cover: null, screenshots: [] },
    { id: 'p3', featured: false, title: 'Executive AI Briefing Bot', desc: 'Aggregates news, internal reports, and market data — then generates concise executive briefings using LLMs. Delivered as a clean dashboard with weekly email digests.',       tags: ['NLP', 'Dashboard', 'React'],        github: 'https://github.com/dinoleix/ai-briefing-bot',       demo: null, cover: null, screenshots: [] },
    { id: 'p4', featured: false, title: 'Custom LLM Fine-Tuner',     desc: 'A pipeline for fine-tuning open-source LLMs on domain-specific datasets. Includes data prep, LoRA training, evaluation, and one-click model deployment to HuggingFace Hub.', tags: ['Fine-tuning', 'PyTorch', 'MLOps'], github: 'https://github.com/dinoleix/llm-fine-tuner',         demo: null, cover: null, screenshots: [] }
  ],
  contact: { linkedin: 'https://linkedin.com/in/yourprofile', github: 'https://github.com/yourusername', email: 'you@email.com' }
};

const PASS_KEY = 'portfolioAdminPass';
const DATA_KEY = 'portfolioData';

/* ═══════════════════════════════════════════════════
   DATA HELPERS
═══════════════════════════════════════════════════ */
function loadData() {
  try {
    const raw = localStorage.getItem(DATA_KEY);
    return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_DATA));
  } catch { return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
}

function saveData(data) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

function getPassword() {
  return localStorage.getItem(PASS_KEY) || 'admin123';
}

/* ═══════════════════════════════════════════════════
   AUTH
═══════════════════════════════════════════════════ */
const loginScreen = document.getElementById('loginScreen');
const adminShell  = document.getElementById('adminShell');
const loginForm   = document.getElementById('loginForm');
const loginError  = document.getElementById('loginError');
const logoutBtn   = document.getElementById('logoutBtn');

function isLoggedIn() { return sessionStorage.getItem('adminLoggedIn') === '1'; }

function showShell() {
  loginScreen.style.display = 'none';
  adminShell.style.display  = 'flex';
  initAdmin();
}

function showLogin() {
  loginScreen.style.display = 'flex';
  adminShell.style.display  = 'none';
}

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const pw = document.getElementById('loginPassword').value;
  if (pw === getPassword()) {
    sessionStorage.setItem('adminLoggedIn', '1');
    loginError.textContent = '';
    showShell();
  } else {
    loginError.textContent = 'Incorrect password. Try again.';
    document.getElementById('loginPassword').select();
  }
});

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('adminLoggedIn');
  showLogin();
});

if (isLoggedIn()) showShell(); else showLogin();

/* ═══════════════════════════════════════════════════
   TABS
═══════════════════════════════════════════════════ */
document.querySelectorAll('.sidebar-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
  });
});

/* ═══════════════════════════════════════════════════
   SAVE & PUBLISH
═══════════════════════════════════════════════════ */
const saveBtn    = document.getElementById('saveBtn');
const saveStatus = document.getElementById('saveStatus');

saveBtn.addEventListener('click', () => {
  collectAndSave();
  saveStatus.textContent = 'Saved!';
  saveStatus.style.color = '#10b981';
  setTimeout(() => { saveStatus.textContent = ''; }, 2500);
});

function collectAndSave() {
  const data = loadData();

  // Profile
  data.profile.name     = v('profileName');
  data.profile.title    = v('profileTitle');
  data.profile.tagline  = v('profileTagline');
  data.profile.status   = v('profileStatus');
  data.profile.bio1     = v('profileBio1');
  data.profile.bio2     = v('profileBio2');
  data.profile.badges   = getBadges();
  if (pendingPhoto !== undefined) data.profile.photo = pendingPhoto;

  // Stats
  document.querySelectorAll('.stat-admin-card').forEach((card, i) => {
    if (data.stats[i]) {
      data.stats[i].value = parseInt(card.querySelector('.stat-val').value) || 0;
      data.stats[i].label = card.querySelector('.stat-lbl').value;
    }
  });

  // Tech stack
  data.techStack = getTechChips();

  // Contact
  data.contact.linkedin = v('contactLinkedin');
  data.contact.github   = v('contactGithub');
  data.contact.email    = v('contactEmail');

  // Projects are already in `currentData.projects`
  data.projects = currentData.projects;

  saveData(data);
  currentData = data;
}

/* ═══════════════════════════════════════════════════
   INIT ADMIN
═══════════════════════════════════════════════════ */
let currentData = {};
let pendingPhoto = undefined; // undefined = no change, null = remove, string = new base64

function initAdmin() {
  currentData = loadData();
  renderProfileTab(currentData);
  renderProjectsTab(currentData);
  renderStatsTab(currentData);
  renderTechTab(currentData);
  renderContactTab(currentData);
}

/* ═══════════════════════════════════════════════════
   PROFILE TAB
═══════════════════════════════════════════════════ */
function renderProfileTab(data) {
  const p = data.profile;
  set('profileName',    p.name);
  set('profileTitle',   p.title);
  set('profileTagline', p.tagline);
  set('profileStatus',  p.status);
  set('profileBio1',    p.bio1);
  set('profileBio2',    p.bio2);

  // Photo
  if (p.photo) {
    document.getElementById('photoPreviewImg').src = p.photo;
    document.getElementById('photoPreviewImg').style.display = 'block';
    document.getElementById('photoPlaceholder').style.display = 'none';
  }

  // Badges
  renderChips('badgeChips', p.badges, removeBadge);
}

// Photo upload
document.getElementById('photoFileInput').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  readFileAsBase64(file, base64 => {
    pendingPhoto = base64;
    document.getElementById('photoPreviewImg').src = base64;
    document.getElementById('photoPreviewImg').style.display = 'block';
    document.getElementById('photoPlaceholder').style.display = 'none';
  });
});

document.getElementById('removePhotoBtn').addEventListener('click', () => {
  pendingPhoto = null;
  document.getElementById('photoPreviewImg').src = '';
  document.getElementById('photoPreviewImg').style.display = 'none';
  document.getElementById('photoPlaceholder').style.display = 'flex';
  document.getElementById('photoFileInput').value = '';
});

// Badges chip manager
function getBadges() {
  return [...document.querySelectorAll('#badgeChips .chip')].map(c => c.dataset.value);
}

document.getElementById('addBadgeBtn').addEventListener('click', () => addBadgeFromInput());
document.getElementById('badgeInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); addBadgeFromInput(); }
});

function addBadgeFromInput() {
  const input = document.getElementById('badgeInput');
  const val = input.value.trim();
  if (!val) return;
  addChip('badgeChips', val, removeBadge);
  input.value = '';
}

function removeBadge(val) { removeChip('badgeChips', val); }

/* ═══════════════════════════════════════════════════
   STATS TAB
═══════════════════════════════════════════════════ */
function renderStatsTab(data) {
  const grid = document.getElementById('statsAdminGrid');
  grid.innerHTML = data.stats.map((s, i) => `
    <div class="stat-admin-card">
      <label>Stat ${i + 1}</label>
      <div class="fields-grid-2">
        <div class="field-group">
          <label class="field-label" style="font-size:0.74rem">Number</label>
          <input type="number" class="field-input stat-val" value="${s.value}" min="0" />
        </div>
        <div class="field-group">
          <label class="field-label" style="font-size:0.74rem">Label</label>
          <input type="text" class="field-input stat-lbl" value="${esc(s.label)}" placeholder="e.g. Years in IT" />
        </div>
      </div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════
   TECH STACK TAB
═══════════════════════════════════════════════════ */
function renderTechTab(data) {
  renderChips('techChips', data.techStack, removeTech);
}

function getTechChips() {
  return [...document.querySelectorAll('#techChips .chip')].map(c => c.dataset.value);
}

document.getElementById('addTechBtn').addEventListener('click', () => addTechFromInput());
document.getElementById('techInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); addTechFromInput(); }
});

function addTechFromInput() {
  const input = document.getElementById('techInput');
  const val = input.value.trim();
  if (!val) return;
  addChip('techChips', val, removeTech);
  input.value = '';
}

function removeTech(val) { removeChip('techChips', val); }

/* ═══════════════════════════════════════════════════
   CONTACT TAB
═══════════════════════════════════════════════════ */
function renderContactTab(data) {
  set('contactLinkedin', data.contact.linkedin);
  set('contactGithub',   data.contact.github);
  set('contactEmail',    data.contact.email);
}

/* ═══════════════════════════════════════════════════
   SECURITY TAB
═══════════════════════════════════════════════════ */
document.getElementById('changePasswordBtn').addEventListener('click', () => {
  const np  = document.getElementById('newPassword').value;
  const cp  = document.getElementById('confirmPassword').value;
  const msg = document.getElementById('securityMsg');
  msg.className = 'security-error';

  if (!np) { msg.classList.add('error'); msg.textContent = 'Please enter a new password.'; return; }
  if (np.length < 6) { msg.classList.add('error'); msg.textContent = 'Password must be at least 6 characters.'; return; }
  if (np !== cp) { msg.classList.add('error'); msg.textContent = 'Passwords do not match.'; return; }

  localStorage.setItem(PASS_KEY, np);
  msg.classList.add('success');
  msg.textContent = 'Password updated successfully.';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmPassword').value = '';
  setTimeout(() => { msg.textContent = ''; }, 3000);
});

document.getElementById('resetDataBtn').addEventListener('click', () => {
  if (!confirm('Reset ALL portfolio content to defaults? This cannot be undone.')) return;
  localStorage.removeItem(DATA_KEY);
  currentData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  pendingPhoto = undefined;
  initAdmin();
  saveStatus.textContent = 'Reset to defaults';
  saveStatus.style.color = '#f59e0b';
  setTimeout(() => { saveStatus.textContent = ''; }, 3000);
});

/* ═══════════════════════════════════════════════════
   PROJECTS TAB
═══════════════════════════════════════════════════ */
function renderProjectsTab(data) {
  const list = document.getElementById('projectsList');
  if (!data.projects.length) {
    list.innerHTML = '<p style="color:var(--text-faint);font-size:0.85rem;text-align:center;padding:32px">No projects yet. Add your first one!</p>';
    return;
  }
  list.innerHTML = data.projects.map(proj => `
    <div class="project-admin-card" data-id="${proj.id}">
      <div class="proj-thumb">
        ${proj.cover
          ? `<img src="${proj.cover}" alt="" />`
          : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`
        }
      </div>
      <div class="proj-info">
        <div class="proj-info-title">${esc(proj.title)}</div>
        <div class="proj-info-tags">${proj.tags.join(' · ')}</div>
      </div>
      ${proj.featured ? '<span class="proj-featured-badge">Featured</span>' : ''}
      <div class="proj-actions">
        <button class="btn-ghost-sm" onclick="openProjectModal('${proj.id}')">Edit</button>
        <button class="btn-danger-sm" onclick="deleteProject('${proj.id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

document.getElementById('addProjectBtn').addEventListener('click', () => openProjectModal(null));

function deleteProject(id) {
  if (!confirm('Delete this project?')) return;
  currentData.projects = currentData.projects.filter(p => p.id !== id);
  renderProjectsTab(currentData);
}

/* ═══════════════════════════════════════════════════
   PROJECT MODAL
═══════════════════════════════════════════════════ */
const modal        = document.getElementById('projectModal');
const modalTitle   = document.getElementById('modalTitle');
const modalClose   = document.getElementById('modalClose');
const modalCancel  = document.getElementById('modalCancel');
const modalSaveBtn = document.getElementById('modalSave');

let editingProjectId = null;
let modalPendingCover = undefined;
let modalScreenshots = []; // { src, caption }

function openProjectModal(id) {
  editingProjectId = id;
  modalPendingCover = undefined;
  modalScreenshots = [];

  // Reset form
  set('projTitle', '');
  set('projDesc', '');
  set('projGithub', '');
  document.getElementById('projFeatured').checked = false;
  document.getElementById('projTagChips').innerHTML = '';
  resetCoverPreview();
  document.getElementById('screenshotsList').innerHTML = '';
  document.getElementById('coverFileInput').value = '';
  document.getElementById('screenshotFileInput').value = '';

  if (id) {
    modalTitle.textContent = 'Edit Project';
    const proj = currentData.projects.find(p => p.id === id);
    if (!proj) return;
    set('projTitle',   proj.title);
    set('projDesc',    proj.desc);
    set('projGithub',  proj.github);
    document.getElementById('projFeatured').checked = proj.featured;
    proj.tags.forEach(tag => addChip('projTagChips', tag, removeProjTag));
    if (proj.cover) showCoverPreview(proj.cover);
    modalScreenshots = proj.screenshots ? [...proj.screenshots.map(s => ({...s}))] : [];
    renderModalScreenshots();
  } else {
    modalTitle.textContent = 'Add New Project';
  }

  modal.classList.add('open');
}

[modalClose, modalCancel].forEach(el => el.addEventListener('click', () => modal.classList.remove('open')));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

document.getElementById('addProjTagBtn').addEventListener('click', () => addProjTagFromInput());
document.getElementById('projTagInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); addProjTagFromInput(); }
});
function addProjTagFromInput() {
  const input = document.getElementById('projTagInput');
  const val = input.value.trim();
  if (!val) return;
  addChip('projTagChips', val, removeProjTag);
  input.value = '';
}
function removeProjTag(val) { removeChip('projTagChips', val); }

// Cover image
document.getElementById('coverPreview').addEventListener('click', () => document.getElementById('coverFileInput').click());
document.getElementById('coverFileInput').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  readFileAsBase64(file, base64 => {
    modalPendingCover = base64;
    showCoverPreview(base64);
  });
});
document.getElementById('removeCoverBtn').addEventListener('click', () => {
  modalPendingCover = null;
  resetCoverPreview();
  document.getElementById('coverFileInput').value = '';
});

function showCoverPreview(src) {
  document.getElementById('coverPreviewImg').src = src;
  document.getElementById('coverPreviewImg').style.display = 'block';
  document.getElementById('coverPlaceholder').style.display = 'none';
}
function resetCoverPreview() {
  document.getElementById('coverPreviewImg').src = '';
  document.getElementById('coverPreviewImg').style.display = 'none';
  document.getElementById('coverPlaceholder').style.display = 'flex';
}

// Screenshots
document.getElementById('screenshotFileInput').addEventListener('change', e => {
  const files = Array.from(e.target.files);
  let loaded = 0;
  files.forEach(file => {
    readFileAsBase64(file, base64 => {
      modalScreenshots.push({ src: base64, caption: file.name.replace(/\.[^.]+$/, '') });
      loaded++;
      if (loaded === files.length) renderModalScreenshots();
    });
  });
  e.target.value = '';
});

function renderModalScreenshots() {
  const list = document.getElementById('screenshotsList');
  list.innerHTML = modalScreenshots.map((s, i) => `
    <div class="screenshot-admin-item">
      <img src="${s.src}" alt="" />
      <div class="screenshot-admin-caption">
        <input type="text" value="${esc(s.caption)}" placeholder="Caption (optional)"
          onchange="modalScreenshots[${i}].caption = this.value" />
      </div>
      <button class="screenshot-remove-btn" onclick="removeModalScreenshot(${i})">&times;</button>
    </div>
  `).join('');
}

function removeModalScreenshot(i) {
  modalScreenshots.splice(i, 1);
  renderModalScreenshots();
}

// Save project
modalSaveBtn.addEventListener('click', () => {
  const title = v('projTitle').trim();
  if (!title) { alert('Please enter a project title.'); return; }

  const tags = [...document.querySelectorAll('#projTagChips .chip')].map(c => c.dataset.value);

  let cover = null;
  if (editingProjectId) {
    const existing = currentData.projects.find(p => p.id === editingProjectId);
    cover = existing ? existing.cover : null;
  }
  if (modalPendingCover !== undefined) cover = modalPendingCover;

  const proj = {
    id:          editingProjectId || 'p' + Date.now(),
    featured:    document.getElementById('projFeatured').checked,
    title,
    desc:        v('projDesc'),
    tags,
    github:      v('projGithub'),
    cover,
    screenshots: modalScreenshots.map(s => ({ src: s.src, caption: s.caption }))
  };

  if (editingProjectId) {
    const idx = currentData.projects.findIndex(p => p.id === editingProjectId);
    if (idx !== -1) currentData.projects[idx] = proj;
  } else {
    currentData.projects.unshift(proj);
  }

  modal.classList.remove('open');
  renderProjectsTab(currentData);
  saveStatus.textContent = 'Unsaved changes';
  saveStatus.style.color = '#f59e0b';
});

/* ═══════════════════════════════════════════════════
   CHIP UTILITIES
═══════════════════════════════════════════════════ */
function renderChips(containerId, values, removeFn) {
  const container = document.getElementById(containerId);
  container.innerHTML = values.map(val => chipHTML(val)).join('');
  container.querySelectorAll('.chip-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFn(btn.dataset.val));
  });
}

function addChip(containerId, val, removeFn) {
  const container = document.getElementById(containerId);
  // Avoid duplicates
  if ([...container.querySelectorAll('.chip')].some(c => c.dataset.value === val)) return;
  const div = document.createElement('div');
  div.innerHTML = chipHTML(val);
  const chip = div.firstElementChild;
  chip.querySelector('.chip-remove').addEventListener('click', () => removeFn(val));
  container.appendChild(chip);
}

function removeChip(containerId, val) {
  const container = document.getElementById(containerId);
  container.querySelectorAll('.chip').forEach(c => {
    if (c.dataset.value === val) c.remove();
  });
}

function chipHTML(val) {
  return `<div class="chip" data-value="${esc(val)}">${esc(val)}<button class="chip-remove" data-val="${esc(val)}" title="Remove">×</button></div>`;
}

/* ═══════════════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════════════ */
function v(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

function set(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

function esc(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function readFileAsBase64(file, callback) {
  const reader = new FileReader();
  reader.onload = e => callback(e.target.result);
  reader.readAsDataURL(file);
}
