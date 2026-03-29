// ─────────────────────────────────────────
//  resume-matcher.js — Phase 2 (Multi-provider)
//  Supports: Google Gemini (free tier) + Anthropic Claude
//  Direct browser → API calls, no backend, no framework.
// ─────────────────────────────────────────

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// ── DOM refs ──────────────────────────────
const pdfInput        = document.getElementById('pdf-input');
const dropZone        = document.getElementById('drop-zone');
const fileStatus      = document.getElementById('file-status');
const fileName        = document.getElementById('file-name');
const btnRemoveFile   = document.getElementById('btn-remove-file');
const resumeTextarea  = document.getElementById('resume-text');
const resumeCharCount = document.getElementById('resume-char-count');
const jdTextarea      = document.getElementById('jd-text');
const jdCharCount     = document.getElementById('jd-char-count');
const btnAnalyze      = document.getElementById('btn-analyze');
const analyzeHint     = document.getElementById('analyze-hint');
const resultsPanel    = document.getElementById('results-panel');
const loadingPanel    = document.getElementById('loading-panel');
const errorPanel      = document.getElementById('error-panel');
const errorMsg        = document.getElementById('error-msg');
const btnRetry        = document.getElementById('btn-retry');

// API key bar refs
const apiKeyInput     = document.getElementById('api-key-input');
const btnKeySave      = document.getElementById('btn-key-save');
const apiKeySaved     = document.getElementById('api-key-saved');
const btnKeyClear     = document.getElementById('btn-key-clear');
const apiKeyInputWrap = document.getElementById('api-key-input-wrap');
const keyLabel        = document.getElementById('key-label');
const keySub          = document.getElementById('key-sub');

// Provider toggle refs
const btnGemini = document.getElementById('btn-provider-gemini');
const btnClaude = document.getElementById('btn-provider-claude');

// ── State ─────────────────────────────────
let resumeText = '';
let pdfLoaded  = false;
// Active provider: 'gemini' | 'claude'
let provider   = sessionStorage.getItem('rm_provider') || 'gemini';

// ── SVG gradient for gauge ────────────────
document.body.insertAdjacentHTML('afterbegin', `
  <svg style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
    <defs>
      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#3d6cff"/>
        <stop offset="100%" stop-color="#7c3aff"/>
      </linearGradient>
    </defs>
  </svg>
`);

// ─────────────────────────────────────────
//  PROVIDER CONFIGURATION
// ─────────────────────────────────────────

const PROVIDERS = {
  gemini: {
    label:       'Google Gemini API Key',
    placeholder: 'AIza...',
    sub:         'Free tier available · Stored in session only · <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener">Get a key →</a>',
    validate:    (k) => k.length > 10,   // Gemini keys are long alphanumeric strings
  },
  claude: {
    label:       'Anthropic Claude API Key',
    placeholder: 'sk-ant-...',
    sub:         'Stored in session only · Never sent to any server · <a href="https://console.anthropic.com" target="_blank" rel="noopener">Get a key →</a>',
    validate:    (k) => k.startsWith('sk-ant-'),
  }
};

// ─────────────────────────────────────────
//  PROVIDER TOGGLE
// ─────────────────────────────────────────

function setProvider(p) {
  provider = p;
  sessionStorage.setItem('rm_provider', p);

  // Update toggle button styles
  btnGemini.classList.toggle('active', p === 'gemini');
  btnClaude.classList.toggle('active', p === 'claude');

  // Update key bar text
  const cfg = PROVIDERS[p];
  keyLabel.textContent  = cfg.label;
  keySub.innerHTML      = cfg.sub;
  apiKeyInput.placeholder = cfg.placeholder;

  // If a key is already saved for this provider, show saved state
  refreshApiKeyUI();
}

btnGemini.addEventListener('click', () => setProvider('gemini'));
btnClaude.addEventListener('click', () => setProvider('claude'));

// ─────────────────────────────────────────
//  API KEY MANAGEMENT
//  Each provider stores its key separately in sessionStorage.
// ─────────────────────────────────────────

function storageKey() {
  return `rm_key_${provider}`;
}

function getApiKey() {
  return sessionStorage.getItem(storageKey()) || '';
}

function saveApiKey(key) {
  sessionStorage.setItem(storageKey(), key.trim());
}

function clearApiKey() {
  sessionStorage.removeItem(storageKey());
}

function refreshApiKeyUI() {
  if (getApiKey()) {
    apiKeyInputWrap.classList.add('hidden');
    apiKeySaved.classList.remove('hidden');
  } else {
    apiKeyInputWrap.classList.remove('hidden');
    apiKeySaved.classList.add('hidden');
  }
  checkReadyState();
}

btnKeySave.addEventListener('click', () => {
  const val = apiKeyInput.value.trim();
  const cfg = PROVIDERS[provider];

  if (!cfg.validate(val)) {
    apiKeyInput.style.borderColor = 'var(--red)';
    setTimeout(() => { apiKeyInput.style.borderColor = ''; }, 2000);
    return;
  }

  saveApiKey(val);
  apiKeyInput.value = '';
  refreshApiKeyUI();
});

apiKeyInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') btnKeySave.click();
});

btnKeyClear.addEventListener('click', () => {
  clearApiKey();
  refreshApiKeyUI();
});

// Initialise provider UI on load
setProvider(provider);

// ─────────────────────────────────────────
//  PDF EXTRACTION
// ─────────────────────────────────────────

async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page    = await pdf.getPage(i);
    const content = await page.getTextContent();
    pages.push(content.items.map(item => item.str).join(' '));
  }
  return pages.join('\n');
}

async function handlePDFFile(file) {
  if (!file || file.type !== 'application/pdf') {
    showError('Please upload a valid PDF file.');
    return;
  }
  try {
    dropZone.classList.add('hidden');
    fileStatus.classList.remove('hidden');
    fileName.textContent = '⏳ Extracting text...';

    const text = await extractTextFromPDF(file);
    if (!text.trim()) throw new Error('Could not extract text — this may be a scanned PDF. Try pasting your resume text manually.');

    resumeText = text;
    pdfLoaded  = true;
    fileName.textContent = file.name;
    resumeTextarea.value = resumeText;
    updateCharCount(resumeTextarea, resumeCharCount);
    checkReadyState();
  } catch (err) {
    dropZone.classList.remove('hidden');
    fileStatus.classList.add('hidden');
    pdfLoaded = false;
    showError(err.message || 'Failed to read PDF.');
  }
}

// ─────────────────────────────────────────
//  DROP ZONE
// ─────────────────────────────────────────

dropZone.addEventListener('click',     (e) => { if (e.target === dropZone) pdfInput.click(); });
dropZone.addEventListener('dragover',  (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', ()  => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop',      (e) => { e.preventDefault(); dropZone.classList.remove('drag-over'); if (e.dataTransfer.files[0]) handlePDFFile(e.dataTransfer.files[0]); });
pdfInput.addEventListener('change',    ()  => { if (pdfInput.files[0]) handlePDFFile(pdfInput.files[0]); });

btnRemoveFile.addEventListener('click', () => {
  pdfLoaded = false; resumeText = ''; pdfInput.value = '';
  fileStatus.classList.add('hidden');
  dropZone.classList.remove('hidden');
  resumeTextarea.value = '';
  updateCharCount(resumeTextarea, resumeCharCount);
  checkReadyState();
});

// ─────────────────────────────────────────
//  TEXTAREA INPUTS
// ─────────────────────────────────────────

function updateCharCount(textarea, counter) {
  const len = textarea.value.length;
  counter.textContent = `${len.toLocaleString()} character${len !== 1 ? 's' : ''}`;
}

resumeTextarea.addEventListener('input', () => {
  if (!pdfLoaded) resumeText = resumeTextarea.value;
  updateCharCount(resumeTextarea, resumeCharCount);
  checkReadyState();
});

jdTextarea.addEventListener('input', () => {
  updateCharCount(jdTextarea, jdCharCount);
  checkReadyState();
});

// ─────────────────────────────────────────
//  READY STATE
// ─────────────────────────────────────────

function checkReadyState() {
  const hasKey    = !!getApiKey();
  const hasResume = resumeText.trim().length > 50;
  const hasJD     = jdTextarea.value.trim().length > 50;

  btnAnalyze.disabled = !(hasKey && hasResume && hasJD);

  if (!hasKey)             analyzeHint.textContent = 'Enter your API key above to get started';
  else if (!hasResume && !hasJD) analyzeHint.textContent = 'Add your resume and a job description to continue';
  else if (!hasResume)     analyzeHint.textContent = 'Upload or paste your resume to continue';
  else if (!hasJD)         analyzeHint.textContent = 'Paste the job description to continue';
  else                     analyzeHint.textContent = '✓ Ready — click Analyze Match';
}

// ─────────────────────────────────────────
//  PROMPT (shared by both providers)
// ─────────────────────────────────────────

function buildPrompt(resume, jd) {
  return `You are an expert resume analyst and career coach. Carefully analyze the resume against the job description and return a structured JSON analysis.

## RESUME
${resume}

## JOB DESCRIPTION
${jd}

## INSTRUCTIONS
Return ONLY a valid JSON object — no markdown fences, no explanation, nothing before or after the JSON.

The JSON must follow this exact structure:
{
  "match_score": <integer 0-100 reflecting overall fit>,
  "matched_skills": [<skills/tools/qualifications present in BOTH the resume and JD>],
  "missing_skills": [<skills/tools/qualifications the JD requires that are absent or unclear in the resume>],
  "suggestions": [<3 to 5 specific, actionable strings — each one a concrete resume improvement>]
}

Scoring guide:
- 85-100: Exceptional match, meets virtually all requirements
- 70-84: Strong match, minor gaps
- 55-69: Moderate match, some meaningful gaps
- 40-54: Weak match, significant gaps
- 0-39: Poor match, major misalignment

Rules for suggestions:
- Be specific — reference actual content from the resume and JD
- Do NOT say "improve X", say exactly HOW to improve it
- Each suggestion should be 1-2 sentences maximum
- Return only the JSON object, no markdown, no explanation`;
}

// ─────────────────────────────────────────
//  GEMINI API CALL
//  Endpoint: generativelanguage.googleapis.com
//  Model: gemini-2.0-flash (free tier)
//  Auth: API key as query param (Google's pattern)
// ─────────────────────────────────────────

async function callGemini(resume, jd) {
  const apiKey = getApiKey();
  const model  = 'gemini-2.5-flash';
  const url    = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: buildPrompt(resume, jd) }]
        }
      ],
      generationConfig: {
        temperature:     0.3,
        maxOutputTokens: 8192
      }
    })
  });

  if (!response.ok) {
    let msg = `Gemini API error (${response.status})`;
    try {
      const err = await response.json();
      // Show Gemini's actual error message for easier debugging
      msg = err.error?.message || msg;
    } catch (_) {}
    if (response.status === 400) throw new Error(`Bad request: ${msg}`);
    if (response.status === 403) throw new Error('API key invalid or Gemini API not enabled. Check your key at aistudio.google.com.');
    if (response.status === 429) throw new Error(`Rate limit hit. Wait 60 seconds and try again. (${msg})`);
    throw new Error(msg);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No response from Gemini. Please try again.');
  return text;
}

// ─────────────────────────────────────────
//  CLAUDE API CALL
//  Endpoint: api.anthropic.com
//  Model: claude-opus-4-6
//  Auth: x-api-key header
// ─────────────────────────────────────────

async function callClaude(resume, jd) {
  const apiKey = getApiKey();

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':    'application/json',
      'x-api-key':       apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model:      'claude-opus-4-6',
      max_tokens: 2048,
      messages:   [{ role: 'user', content: buildPrompt(resume, jd) }]
    })
  });

  if (!response.ok) {
    let msg = `Claude API error (${response.status})`;
    try {
      const err = await response.json();
      msg = err.error?.message || msg;
    } catch (_) {}
    if (response.status === 401) throw new Error('Invalid API key. Please check your Anthropic key.');
    if (response.status === 429) throw new Error('Rate limit reached. Please wait a moment and try again.');
    throw new Error(msg);
  }

  const data     = await response.json();
  const textBlock = data.content?.find(b => b.type === 'text');
  if (!textBlock?.text) throw new Error('No response from Claude. Please try again.');
  return textBlock.text;
}

// ─────────────────────────────────────────
//  ROUTER — picks the right API based on active provider
// ─────────────────────────────────────────

async function callAI(resume, jd) {
  if (!getApiKey()) throw new Error('No API key found. Please enter your key above.');
  if (provider === 'gemini') return callGemini(resume, jd);
  if (provider === 'claude') return callClaude(resume, jd);
  throw new Error('Unknown provider selected.');
}

// ─────────────────────────────────────────
//  JSON PARSER
// ─────────────────────────────────────────

function parseAIJson(raw) {
  // Gemini sometimes wraps JSON in ```json ... ``` — strip fences first
  const stripped = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

  try { return JSON.parse(stripped); } catch (_) {}

  // Fallback: extract the first {...} block
  const match = stripped.match(/\{[\s\S]*\}/);
  if (match) {
    try { return JSON.parse(match[0]); } catch (_) {}
  }

  throw new Error('Could not parse the AI response. Please try again.');
}

// ─────────────────────────────────────────
//  ANALYZE BUTTON
// ─────────────────────────────────────────

btnAnalyze.addEventListener('click', async () => {
  const jd = jdTextarea.value.trim();
  if (!resumeText.trim() || !jd) return;

  showLoading();

  try {
    const raw  = await callAI(resumeText, jd);
    const data = parseAIJson(raw);

    if (typeof data.match_score !== 'number') {
      throw new Error('Unexpected response format. Please try again.');
    }

    hideLoading();
    renderResults(data);
  } catch (err) {
    hideLoading();
    showError(err.message || 'Something went wrong. Please try again.');
    console.error('[Resume Matcher]', err);
  }
});

btnRetry.addEventListener('click', () => { hideError(); checkReadyState(); });

// ─────────────────────────────────────────
//  UI STATE HELPERS
// ─────────────────────────────────────────

function showLoading() {
  loadingPanel.classList.remove('hidden');
  resultsPanel.classList.add('hidden');
  errorPanel.classList.add('hidden');
  btnAnalyze.disabled = true;
}

function hideLoading() {
  loadingPanel.classList.add('hidden');
  checkReadyState();
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorPanel.classList.remove('hidden');
  loadingPanel.classList.add('hidden');
}

function hideError() {
  errorPanel.classList.add('hidden');
}

// ─────────────────────────────────────────
//  RESULTS RENDERER
// ─────────────────────────────────────────

function renderResults(data) {
  const score = Math.min(100, Math.max(0, Math.round(data.match_score)));
  document.getElementById('score-number').textContent = score;

  const dashOffset = 157 - (157 * score / 100);
  const gaugeFill  = document.getElementById('gauge-fill');
  setTimeout(() => { gaugeFill.style.strokeDashoffset = dashOffset; }, 60);

  const verdictEl = document.getElementById('score-verdict');
  if      (score >= 85) { verdictEl.textContent = 'Exceptional match — you meet virtually all requirements'; verdictEl.style.color = 'var(--green)'; }
  else if (score >= 70) { verdictEl.textContent = 'Strong match — minor gaps to address';                   verdictEl.style.color = 'var(--green)'; }
  else if (score >= 55) { verdictEl.textContent = 'Moderate match — some meaningful gaps found';            verdictEl.style.color = 'var(--yellow)'; }
  else if (score >= 40) { verdictEl.textContent = 'Weak match — significant gaps to close';                 verdictEl.style.color = 'var(--red)'; }
  else                  { verdictEl.textContent = 'Low match — major misalignment with this role';          verdictEl.style.color = 'var(--red)'; }

  // Matched skills
  const matchedContainer = document.getElementById('matched-chips');
  matchedContainer.innerHTML = '';
  (data.matched_skills || []).forEach(skill => {
    const chip = document.createElement('span');
    chip.className = 'chip chip-matched';
    chip.textContent = skill;
    matchedContainer.appendChild(chip);
  });
  if (!data.matched_skills?.length) matchedContainer.innerHTML = '<span style="color:var(--text-faint);font-size:.82rem">None identified</span>';

  // Missing skills
  const missingContainer = document.getElementById('missing-chips');
  missingContainer.innerHTML = '';
  (data.missing_skills || []).forEach(skill => {
    const chip = document.createElement('span');
    chip.className = 'chip chip-missing';
    chip.textContent = skill;
    missingContainer.appendChild(chip);
  });
  if (!data.missing_skills?.length) missingContainer.innerHTML = '<span style="color:var(--text-faint);font-size:.82rem">No major gaps found</span>';

  // Suggestions
  const suggestionsList = document.getElementById('suggestions-list');
  suggestionsList.innerHTML = '';
  (data.suggestions || []).forEach((text, i) => {
    const li = document.createElement('li');
    li.className = 'suggestion-item';
    li.innerHTML = `<span class="suggestion-bullet">${i + 1}</span><span>${text}</span>`;
    suggestionsList.appendChild(li);
  });

  resultsPanel.classList.remove('hidden');
  resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
