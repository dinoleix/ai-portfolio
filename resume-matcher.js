// ─────────────────────────────────────────
//  resume-matcher.js — Phase 2
//  Calls Claude API (claude-opus-4-6) directly from the browser via fetch.
//  No server, no framework — just the Anthropic REST API + pdf.js.
// ─────────────────────────────────────────

// Tell pdf.js where to find its worker script (loaded from same CDN)
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
const apiKeyInput   = document.getElementById('api-key-input');
const btnKeySave    = document.getElementById('btn-key-save');
const apiKeySaved   = document.getElementById('api-key-saved');
const btnKeyClear   = document.getElementById('btn-key-clear');
const apiKeyWrap    = document.querySelector('.api-key-input-wrap');

// ── State ─────────────────────────────────
let resumeText = '';  // final text used for analysis (from PDF or textarea)
let pdfLoaded  = false;

// ── Inject SVG gradient for gauge ─────────
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
//  API KEY MANAGEMENT
//  Key lives only in sessionStorage — cleared when the tab closes.
// ─────────────────────────────────────────

function getApiKey() {
  return sessionStorage.getItem('rm_api_key') || '';
}

function saveApiKey(key) {
  sessionStorage.setItem('rm_api_key', key.trim());
}

function clearApiKey() {
  sessionStorage.removeItem('rm_api_key');
}

function refreshApiKeyUI() {
  const key = getApiKey();
  if (key) {
    apiKeyWrap.classList.add('hidden');
    apiKeySaved.classList.remove('hidden');
  } else {
    apiKeyWrap.classList.remove('hidden');
    apiKeySaved.classList.add('hidden');
  }
  checkReadyState();
}

// On page load — restore key if still in session
refreshApiKeyUI();

btnKeySave.addEventListener('click', () => {
  const val = apiKeyInput.value.trim();
  if (!val.startsWith('sk-ant-')) {
    apiKeyInput.style.borderColor = 'var(--red)';
    apiKeyInput.placeholder = 'Must start with sk-ant-...';
    setTimeout(() => {
      apiKeyInput.style.borderColor = '';
      apiKeyInput.placeholder = 'sk-ant-...';
    }, 2000);
    return;
  }
  saveApiKey(val);
  apiKeyInput.value = '';
  refreshApiKeyUI();
});

// Allow saving with Enter key
apiKeyInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') btnKeySave.click();
});

btnKeyClear.addEventListener('click', () => {
  clearApiKey();
  refreshApiKeyUI();
});

// ─────────────────────────────────────────
//  PDF EXTRACTION
// ─────────────────────────────────────────

/**
 * Reads a PDF File object and extracts all page text using pdf.js.
 * Returns a promise resolving to a plain string.
 */
async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    // Each item.str is a text chunk — join with spaces
    const pageText = content.items.map(item => item.str).join(' ');
    pages.push(pageText);
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

    if (!text.trim()) {
      throw new Error(
        'Could not extract text from this PDF. It may be a scanned image — try pasting your resume text manually instead.'
      );
    }

    resumeText = text;
    pdfLoaded  = true;
    fileName.textContent = file.name;

    // Show extracted text in textarea so user can review/edit it
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

dropZone.addEventListener('click', (e) => {
  if (e.target !== dropZone) return;
  pdfInput.click();
});
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) handlePDFFile(file);
});
pdfInput.addEventListener('change', () => {
  const file = pdfInput.files[0];
  if (file) handlePDFFile(file);
});
btnRemoveFile.addEventListener('click', () => {
  pdfLoaded  = false;
  resumeText = '';
  pdfInput.value = '';
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
  const ready     = hasKey && hasResume && hasJD;

  btnAnalyze.disabled = !ready;

  if (!hasKey) {
    analyzeHint.textContent = 'Enter your Anthropic API key above to get started';
  } else if (!hasResume && !hasJD) {
    analyzeHint.textContent = 'Add your resume and a job description to continue';
  } else if (!hasResume) {
    analyzeHint.textContent = 'Upload or paste your resume to continue';
  } else if (!hasJD) {
    analyzeHint.textContent = 'Paste the job description to continue';
  } else {
    analyzeHint.textContent = '✓ Ready — click Analyze Match';
  }
}

// ─────────────────────────────────────────
//  PROMPT BUILDER
//  We ask Claude to return a strict JSON object.
//  The prompt is the most important part of the whole app.
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
  "match_score": <integer 0–100 reflecting overall fit>,
  "matched_skills": [<skills/tools/qualifications present in BOTH the resume and JD>],
  "missing_skills": [<skills/tools/qualifications the JD requires that are absent or unclear in the resume>],
  "suggestions": [<3 to 5 specific, actionable strings — each one a concrete resume improvement>]
}

Scoring guide:
- 85–100: Exceptional match, meets virtually all requirements
- 70–84: Strong match, minor gaps
- 55–69: Moderate match, some meaningful gaps
- 40–54: Weak match, significant gaps
- 0–39: Poor match, major misalignment

Rules for suggestions:
- Be specific and concrete — reference actual content from the resume and JD
- Do NOT say "improve X" — say exactly HOW to improve it
- Each suggestion should be 1–2 sentences
- Example good suggestion: "Add quantified impact to your ML model work — the JD mentions 'production-scale systems'; state model size, traffic volume, or accuracy improvement."
- Example bad suggestion: "Highlight your machine learning experience."`;
}

// ─────────────────────────────────────────
//  CLAUDE API CALL
//  Direct fetch to https://api.anthropic.com/v1/messages
//  Uses the anthropic-dangerous-direct-browser-access header
//  which Anthropic requires for browser-originated calls.
// ─────────────────────────────────────────

async function callClaude(resumeText, jdText) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('No API key found. Please enter your Anthropic API key.');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      // Required header for direct browser → Anthropic API calls (no proxy)
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-opus-4-6',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: buildPrompt(resumeText, jdText)
        }
      ]
    })
  });

  // Handle HTTP-level errors first
  if (!response.ok) {
    let errMsg = `API error (${response.status})`;
    try {
      const errBody = await response.json();
      errMsg = errBody.error?.message || errMsg;
    } catch (_) { /* ignore parse failure */ }

    // Give user-friendly messages for common errors
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your key and try again.');
    } else if (response.status === 429) {
      throw new Error('Rate limit reached. Please wait a moment and try again.');
    } else if (response.status === 400) {
      throw new Error(`Bad request: ${errMsg}`);
    }
    throw new Error(errMsg);
  }

  const data = await response.json();

  // Extract the text content from the response
  const textBlock = data.content?.find(block => block.type === 'text');
  if (!textBlock?.text) throw new Error('No text returned from Claude.');

  return textBlock.text;
}

// ─────────────────────────────────────────
//  JSON PARSER
//  Claude is instructed to return only JSON, but as a safety net
//  we also try to extract it if there's any surrounding text.
// ─────────────────────────────────────────

function parseClaudeJSON(raw) {
  // First try: parse the whole response as JSON
  try {
    return JSON.parse(raw.trim());
  } catch (_) { /* try extraction */ }

  // Second try: find the JSON object inside the text
  const match = raw.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (_) { /* fall through */ }
  }

  throw new Error(
    'Could not parse the AI response as JSON. Please try again — this occasionally happens with very long inputs.'
  );
}

// ─────────────────────────────────────────
//  ANALYZE BUTTON
// ─────────────────────────────────────────

btnAnalyze.addEventListener('click', async () => {
  const jd = jdTextarea.value.trim();

  if (!resumeText.trim() || !jd) return;

  showLoading();

  try {
    const rawResponse = await callClaude(resumeText, jd);
    const data        = parseClaudeJSON(rawResponse);

    // Validate the shape before rendering
    if (typeof data.match_score !== 'number') {
      throw new Error('Unexpected response structure. Please try again.');
    }

    hideLoading();
    renderResults(data);

  } catch (err) {
    hideLoading();
    showError(err.message || 'Something went wrong. Please try again.');
    console.error('[Resume Matcher] Error:', err);
  }
});

btnRetry.addEventListener('click', () => {
  hideError();
  checkReadyState();
});

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
  checkReadyState(); // re-evaluate button state
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
  // ── 1. Score gauge ──────────────────────
  const score = Math.min(100, Math.max(0, Math.round(data.match_score)));
  document.getElementById('score-number').textContent = score;

  // Arc total length ≈ 157 (π × radius 50)
  const dashOffset = 157 - (157 * score / 100);
  const gaugeFill  = document.getElementById('gauge-fill');
  // Tiny delay lets the browser paint before the CSS transition fires
  setTimeout(() => { gaugeFill.style.strokeDashoffset = dashOffset; }, 60);

  // Verdict text
  const verdictEl = document.getElementById('score-verdict');
  if (score >= 85) {
    verdictEl.textContent = 'Exceptional match — you meet virtually all requirements';
    verdictEl.style.color = 'var(--green)';
  } else if (score >= 70) {
    verdictEl.textContent = 'Strong match — minor gaps to address';
    verdictEl.style.color = 'var(--green)';
  } else if (score >= 55) {
    verdictEl.textContent = 'Moderate match — some meaningful gaps found';
    verdictEl.style.color = 'var(--yellow)';
  } else if (score >= 40) {
    verdictEl.textContent = 'Weak match — significant gaps to close';
    verdictEl.style.color = 'var(--red)';
  } else {
    verdictEl.textContent = 'Low match — major misalignment with this role';
    verdictEl.style.color = 'var(--red)';
  }

  // ── 2. Matched skills ───────────────────
  const matchedContainer = document.getElementById('matched-chips');
  matchedContainer.innerHTML = '';
  (data.matched_skills || []).forEach(skill => {
    const chip = document.createElement('span');
    chip.className  = 'chip chip-matched';
    chip.textContent = skill;
    matchedContainer.appendChild(chip);
  });
  if (!data.matched_skills?.length) {
    matchedContainer.innerHTML = '<span style="color:var(--text-faint);font-size:.82rem">None identified</span>';
  }

  // ── 3. Missing skills ───────────────────
  const missingContainer = document.getElementById('missing-chips');
  missingContainer.innerHTML = '';
  (data.missing_skills || []).forEach(skill => {
    const chip = document.createElement('span');
    chip.className  = 'chip chip-missing';
    chip.textContent = skill;
    missingContainer.appendChild(chip);
  });
  if (!data.missing_skills?.length) {
    missingContainer.innerHTML = '<span style="color:var(--text-faint);font-size:.82rem">No major gaps found</span>';
  }

  // ── 4. Suggestions ──────────────────────
  const suggestionsList = document.getElementById('suggestions-list');
  suggestionsList.innerHTML = '';
  (data.suggestions || []).forEach((text, i) => {
    const li = document.createElement('li');
    li.className  = 'suggestion-item';
    li.innerHTML  = `
      <span class="suggestion-bullet">${i + 1}</span>
      <span>${text}</span>
    `;
    suggestionsList.appendChild(li);
  });

  // ── Show panel ──────────────────────────
  resultsPanel.classList.remove('hidden');
  resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
