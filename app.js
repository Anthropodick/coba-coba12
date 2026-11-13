/* Logika utama aplikasi */
(function () {
  'use strict';

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ---------- Penyimpanan ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  let progress = {};
  try { progress = JSON.parse(store.get('mtk.progress.v1', '{}')) || {}; } catch (e) { progress = {}; }
  if (typeof progress !== 'object' || Array.isArray(progress)) progress = {};
  const saveProgress = () => store.set('mtk.progress.v1', JSON.stringify(progress));

  /* ---------- Cache jawaban AI per bab + helper API Key ---------- */
  const aiCache = {};
  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || '';
  };
  const getApiKey = () => store.get('mtk.geminiKey', '');
  const setApiKey = (k) => store.set('mtk.geminiKey', k);

  let history = [];
  try { history = JSON.parse(store.get('mtk.history.v1', '[]')) || []; } catch (e) { history = []; }
  if (!Array.isArray(history)) history = [];
  const saveHistory = () => store.set('mtk.history.v1', JSON.stringify(history.slice(-30)));

  /* ---------- Pre-processing data ---------- */
  const ALL = [];
  const tmpDiv = document.createElement('div');
  const textOf = (h) => { tmpDiv.innerHTML = h; return (tmpDiv.textContent || '').toLowerCase().replace(/\s+/g, ' '); };

  (window.GRADES || []).forEach(g => {
    g.chapters.forEach((ch, i) => {
      ch.gid = g.id; ch.glabel = g.label; ch.no = i + 1;
      (ch.formulas || []).forEach(f => { f._text = textOf((f.label || '') + ' ' + (f.html || '')); });
      ch._text = [
        ch.title, ch.tag || '', g.label, textOf(ch.summary || ''),
        (ch.formulas || []).map(f => f._text).join(' '),
        (ch.examples || []).map(e => textOf((e.q || '') + ' ' + (e.steps || []).join(' ') + ' ' + (e.a || ''))).join(' ')
      ].join(' ').toLowerCase();
      ALL.push(ch);
    });
  });

  /* ---------- State ---------- */
  const state = {
    view: 'k7',
    phase: 'idle',
    tryout: null,
    timer: null
  };

  /* ---------- Element referensi ---------- */
  const learnEl = $('#learnView');
  const tryoutEl = $('#tryoutView');
  const tabsEl = $('#tabsInner');
  const searchInput = $('#q');
  const searchHint = $('#searchHint');
  const themeBtn = $('#themeBtn');
  const srStatus = $('#srStatus');
  const resultModal = $('#resultModal');
  const resultBody = $('#resultBody');
  const apiKeyBtn = $('#apiKeyBtn');
  const apiKeyModal = $('#apiKeyModal');
  const apiKeyBody = $('#apiKeyBody');

  /* ---------- Tab ---------- */
  const VIEWS = (window.GRADES || []).map(g => ({ id: g.id, label: g.label, sub: g.badge || '', kind: 'grade', grade: g }))
    .concat([{ id: 'tryout', label: 'Mode Tryout', kind: 'tryout' }]);

  function buildTabs() {
    tabsEl.innerHTML = VIEWS.map(v => {
      const extra = v.kind === 'grade'
        ? '<span class="tab-count" data-count="' + v.id + '">0/0</span>' + (v.sub ? '<small>' + v.sub + '</small>' : '')
        : '<span class="pill pill-warn" style="padding:0 6px;font-size:.7rem">Uji</span>';
      return '<button type="button" class="tab" data-view="' + v.id + '">' + v.label + extra + '</button>';
    }).join('');
  }
  function markActiveTab(id) {
    $$('.tab', tabsEl).forEach(t => {
      const on = t.getAttribute('data-view') === id;
      t.classList.toggle('active', on);
      if (on) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
    });
  }

  /* ---------- Formatter jawaban AI (markdown ringan → HTML) ---------- */
  function formatAIAnswer(text) {
    if (!text) return '';
    let s = String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // LaTeX sederhana
    s = s.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '<span class="frac"><span>$1</span><span>$2</span></span>');
    s = s.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');

    // Bold → italic (urutan penting)
    s = s.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');

    // Inline code
    s = s.replace(/`([^`\n]+)`/g, '<code>$1</code>');

    // Superscript: x^{10}, x^(2+1), x^2
    s = s.replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>');
    s = s.replace(/\^\(([^)]+)\)/g, '<sup>$1</sup>');
    s = s.replace(/\^([A-Za-z0-9]+)/g, '<sup>$1</sup>');

    // Heading
    s = s.replace(/^#{1,4}\s+(.+)$/gm, '<h4>$1</h4>');

    return s.split(/\n{2,}/).map(p => {
      const t = p.trim();
      if (!t) return '';
      if (/^<h4>/.test(t)) return t;
      return '<p>' + t.replace(/\n/g, '<br>') + '</p>';
    }).filter(Boolean).join('');
  }

  /* ---------- Tanya AI per bab ---------- */
  async function askAI(chapterId) {
    const ch = ALL.find(c => c.id === chapterId);
    if (!ch) return;

    const answerBox = document.querySelector('[data-aia="' + chapterId + '"]');
    const inputEl = document.querySelector('[data-aiq="' + chapterId + '"]');
    if (!answerBox || !inputEl) return;

    answerBox.hidden = false;

    const apiKey = getApiKey();
    if (!apiKey) {
      answerBox.innerHTML = '<div class="ai-warn">⚠️ API Key Gemini belum diatur. Klik tombol 🔑 di kanan atas header untuk memasukkan API Key. Dapatkan gratis di <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener">aistudio.google.com/app/apikey</a>.</div>';
      return;
    }

    const question = inputEl.value.trim();
    if (!question) {
      answerBox.innerHTML = '<div class="ai-warn">✏️ Tulis dulu pertanyaanmu di kotak, lalu klik "Tanya AI".</div>';
      inputEl.focus();
      return;
    }

    answerBox.innerHTML = '<div class="ai-loading">Tutor AI sedang memikirkan jawaban...</div>';

    const systemPrompt =
      'Kamu adalah tutor matematika yang ramah untuk siswa SMP/SMA di Indonesia. ' +
      'Jawab dengan bahasa santai seperti kakak kelas yang mengajari adiknya. ' +
      'Gunakan analogi sederhana, jelaskan langkah demi langkah, dan pakai markdown ringan ' +
      '(**tebal**, *miring*, dan ^ untuk pangkat). Jawab dalam Bahasa Indonesia.';

    const summaryText = stripHtml(ch.summary).replace(/\s+/g, ' ').slice(0, 1200);
    const userPrompt =
      'Konteks bab: "' + ch.title + '"' + (ch.glabel ? ' (' + ch.glabel + ')' : '') + '\n' +
      'Ringkasan materi: ' + summaryText + '\n\n' +
      'Pertanyaan siswa: ' + question + '\n\n' +
      'Jawab dengan jelas dan bertahap, gunakan analogi kalau membantu.';

    try {
// Ganti URL, model, dan format body
const res = await fetch(
  'https://generativelanguage.googleapis.com/v1beta/interactions?key=' + encodeURIComponent(apiKey),
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gemini-3.8-flash', // Model pengganti
      input: systemPrompt + '\n\n' + userPrompt // Gabungkan prompt jadi satu input
    })
  }
);

// ... (penanganan error res.status tetap sama) ...

const data = await res.json();

// Cara membaca jawaban juga berbeda. Ambil teks dari elemen terakhir di array 'steps'.
const answer = data.steps && data.steps[data.steps.length - 1] &&
               data.steps[data.steps.length - 1].content &&
               data.steps[data.steps.length - 1].content[0] &&
               data.steps[data.steps.length - 1].content[0].text;

if (!answer) {
  answerBox.innerHTML = '<div class="ai-warn">AI tidak memberi jawaban. Coba tanya dengan kalimat lain.</div>';
  return;
}
// ... (sisa kode untuk menampilkan jawaban tetap sama)

      aiCache[chapterId] = { question, answer };
      answerBox.innerHTML =
        '<div class="ai-answer-content">' + formatAIAnswer(answer) + '</div>' +
        '<div class="ai-answer-actions">' +
          '<button type="button" class="btn btn-ghost" data-action="closeAI" data-id="' + chapterId + '">Tutup Jawaban</button>' +
        '</div>';
    } catch (err) {
      answerBox.innerHTML = '<div class="ai-warn">⚠️ Gagal menghubungi Gemini: ' + escapeHtml(err.message) + '. Periksa API Key atau koneksi internetmu.</div>';
    }
  }

  /* ---------- Escape HTML ---------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ---------- Render: kartu bab ---------- */
  function chapterCard(ch, opts) {
    opts = opts || {};
    const terms = opts.terms || [];
    const done = !!progress[ch.id];
    const cached = aiCache[ch.id];

    const formulas = (ch.formulas || []).map(f => {
      const hit = terms.length && terms.every(t => f._text.indexOf(t) !== -1);
      return '<div class="formula' + (hit ? ' hit' : '') + '">' +
        '<div class="f-label">' + f.label + '</div><div class="fx math">' + f.html + '</div></div>';
    }).join('');

    const examples = (ch.examples || []).map((e, i) =>
      '<div class="example"><div class="ex-label">Contoh ' + (i + 1) + '</div>' +
      '<p class="ex-q">' + e.q + '</p>' +
      '<details><summary>Lihat langkah penyelesaian</summary>' +
      '<ol>' + (e.steps || []).map(s => '<li>' + s + '</li>').join('') + '</ol>' +
      '<p class="ex-a"><strong>Jawaban:</strong> <span class="math">' + e.a + '</span></p></details></div>'
    ).join('');

    const answerHtml = cached
      ? '<div class="ai-answer-content">' + formatAIAnswer(cached.answer) + '</div>' +
        '<div class="ai-answer-actions"><button type="button" class="btn btn-ghost" data-action="closeAI" data-id="' + ch.id + '">Tutup Jawaban</button></div>'
      : '';

    return '<article class="card' + (done ? ' is-done' : '') + '" id="' + ch.id + '" data-id="' + ch.id + '">' +
      '<header class="card-head">' +
        '<span class="num" aria-hidden="true">' + ch.no + '</span>' +
        '<h3>' + escapeHtml(ch.title) + '</h3>' +
        (opts.showGrade ? '<span class="pill pill-accent">' + ch.glabel + '</span>' : '') +
        (ch.tag ? '<span class="pill">' + escapeHtml(ch.tag) + '</span>' : '') +
      '</header>' +
      '<div class="sec-title">Ringkasan konsep</div><div class="summary">' + ch.summary + '</div>' +
      '<div class="sec-title">Rumus penting</div><div class="formulas">' + formulas + '</div>' +
      '<div class="sec-title">Contoh soal</div>' + examples +
      '<footer class="card-foot">' +
        '<div class="card-foot-row">' +
          '<div class="ai-ask">' +
            '<input type="text" class="ai-q" placeholder="Bingung di bagian mana? Tanya AI di sini..." aria-label="Pertanyaan untuk AI" data-aiq="' + ch.id + '">' +
            '<button type="button" class="ai-btn" data-action="askAI" data-id="' + ch.id + '">Tanya AI</button>' +
          '</div>' +
          '<button type="button" class="done-btn" data-action="toggle" data-id="' + ch.id + '" aria-pressed="' + done + '">' +
            (done ? '✓ Sudah Dipahami' : 'Tandai Sudah Dipahami') + '</button>' +
        '</div>' +
        '<div class="ai-answer" data-aia="' + ch.id + '"' + (cached ? '' : ' hidden') + '>' + answerHtml + '</div>' +
      '</footer></article>';
  }

  function renderGrade(g) {
    const toc = g.chapters.map(c =>
      '<button type="button" class="chip" data-action="jump" data-target="' + c.id + '">' + c.no + '. ' + escapeHtml(c.title.replace(/\s*\(.*\)\s*$/, '')) + '</button>'
    ).join('');
    return '<section class="grade-head"><div>' +
      '<h2>' + escapeHtml(g.label) + (g.badge ? ' <span class="pill pill-accent">' + escapeHtml(g.badge) + '</span>' : '') + '</h2>' +
      '<p class="muted">' + escapeHtml(g.desc) + '</p></div>' +
      '<div class="gh-actions">' +
        '<button type="button" class="btn btn-ghost" data-action="toggleAll">Buka/tutup semua pembahasan</button>' +
        '<button type="button" class="btn btn-ghost" data-action="resetGrade" data-gid="' + g.id + '">Reset progres</button>' +
      '</div></section>' +
      '<div class="gprog"><div class="bar"><i data-gbar="' + g.id + '"></i></div><span data-glabel="' + g.id + '"></span></div>' +
      '<div class="toc" aria-label="Daftar bab">' + toc + '</div>' +
      '<div class="cards">' + g.chapters.map(c => chapterCard(c)).join('') + '</div>';
  }

  function renderSearch(q) {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const hits = ALL.filter(c => terms.every(t => c._text.indexOf(t) !== -1));
    srStatus.textContent = hits.length + ' bab ditemukan untuk ' + q;
    if (!hits.length) {
      return '<div class="empty"><h2>Tidak ada hasil</h2>' +
        '<p class="muted">Tidak ada bab atau rumus yang cocok dengan "' + escapeHtml(q) + '". Coba kata kunci lain.</p>' +
        '<button type="button" class="btn" data-action="clearSearch">Hapus pencarian</button></div>';
    }
    return '<section class="grade-head"><div>' +
      '<h2>Hasil pencarian</h2><p class="muted">' + hits.length + ' bab cocok dengan "' + escapeHtml(q) + '".</p></div>' +
      '<div class="gh-actions"><button type="button" class="btn btn-ghost" data-action="clearSearch">Hapus pencarian</button></div></section>' +
      '<div class="cards">' + hits.map(c => chapterCard(c, { terms, showGrade: true })).join('') + '</div>';
  }

  /* ---------- Progres UI ---------- */
  function updateProgressUI() {
    const total = ALL.length, done = ALL.filter(c => progress[c.id]).length;
    const pct = total ? Math.round(done / total * 100) : 0;
    $('#overallBar').style.width = pct + '%';
    $('#overallText').textContent = done + ' dari ' + total + ' bab dipahami (' + pct + '%)';
    (window.GRADES || []).forEach(g => {
      const d = g.chapters.filter(c => progress[c.id]).length, n = g.chapters.length;
      const p = n ? Math.round(d / n * 100) : 0;
      const cnt = $('[data-count="' + g.id + '"]'); if (cnt) cnt.textContent = d + '/' + n;
      $$('[data-gbar="' + g.id + '"]').forEach(el => el.style.width = p + '%');
      $$('[data-glabel="' + g.id + '"]').forEach(el => el.textContent = d + ' / ' + n + ' bab dipahami');
    });
  }
  function setDoneUI(id) {
    const done = !!progress[id];
    $$('.card[data-id="' + id + '"]').forEach(card => {
      card.classList.toggle('is-done', done);
      const b = $('.done-btn', card);
      if (b) { b.setAttribute('aria-pressed', String(done)); b.textContent = done ? '✓ Sudah Dipahami' : 'Tandai Sudah Dipahami'; }
    });
  }

  /* ---------- Tema ---------- */
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    store.set('mtk.theme', t);
    themeBtn.setAttribute('aria-pressed', String(t === 'dark'));
    $('.ti', themeBtn).textContent = t === 'dark' ? '☀' : '☾';
    $('.lbl', themeBtn).textContent = t === 'dark' ? 'Mode Terang' : 'Mode Gelap';
    const meta = $('meta[name="theme-color"]'); if (meta) meta.setAttribute('content', t === 'dark' ? '#0e1320' : '#f5f6fb');
  }
  themeBtn.addEventListener('click', () => {
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ---------- View switching ---------- */
  function showLearnContent() {
    learnEl.hidden = false;
    tryoutEl.hidden = true;
    const q = searchInput.value.trim();
    if (q) {
      learnEl.innerHTML = renderSearch(q);
    } else {
      const v = VIEWS.find(x => x.id === state.view);
      if (v && v.kind === 'grade') {
        learnEl.innerHTML = renderGrade(v.grade);
      } else {
        learnEl.innerHTML = '';
      }
    }
  }
  function render() {
    if (state.view === 'tryout') {
      learnEl.hidden = true;
      tryoutEl.hidden = false;
      renderTryout();
    } else {
      showLearnContent();
    }
    markActiveTab(state.view);
    updateProgressUI();
  }

  /* ---------- Tryout ---------- */
  const DURATION_PER_Q = 90;

  function renderTryout() {
    if (state.phase === 'idle' || state.phase === 'setup') return renderTryoutSetup();
    if (state.phase === 'running') return renderTryoutRunning();
    if (state.phase === 'done') return renderTryoutDone();
  }

  function renderTryoutSetup() {
    const gradeOpts = (window.GRADES || []).map(g => '<option value="' + g.id + '">' + g.label + '</option>').join('');
    const histHtml = history.length
      ? '<ul class="hist-list">' + history.slice().reverse().map(h => {
          const d = new Date(h.at).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
          return '<li><span>' + escapeHtml(h.label) + '</span><span><b>' + h.score + '/' + h.total + '</b> · ' + d + '</span></li>';
        }).join('') + '</ul>'
      : '<p class="muted">Belum ada riwayat. Selesaikan satu sesi tryout untuk melihat riwayat di sini.</p>';

    tryoutEl.innerHTML =
      '<div class="tryout-setup">' +
        '<h2>Mode Tryout</h2>' +
        '<p class="muted">Soal dibuat otomatis setiap sesi (angka &amp; tingkat kesulitan diacak). Ulangi sesi untuk soal baru.</p>' +
        '<div class="setup-grid">' +
          '<div class="setup-field"><label for="tvGrade">Pilih Jenjang</label>' +
            '<select id="tvGrade">' + gradeOpts + '<option value="mixed">Campuran Semua Kelas</option></select></div>' +
          '<div class="setup-field"><label for="tvCount">Jumlah Soal</label>' +
            '<select id="tvCount"><option value="10">10 soal</option><option value="20">20 soal</option></select></div>' +
        '</div>' +
        '<p class="setup-note">Timer: 90 detik per soal. Analisis bab &amp; pembahasan tersedia setelah submit.</p>' +
        '<div style="margin-top:14px"><button type="button" class="btn" data-action="startTryout">Mulai Tryout</button></div>' +
        '<h3 style="margin-top:26px">Riwayat Tryout</h3>' + histHtml +
      '</div>';
  }

  function renderTryoutRunning() {
    const t = state.tryout;
    if (!t) return;
    const q = t.questions[t.current];
    const remain = Math.max(0, t.endAt - Date.now());
    const m = String(Math.floor(remain / 60000)).padStart(2, '0');
    const s = String(Math.floor((remain % 60000) / 1000)).padStart(2, '0');

    const navBtns = t.questions.map((_, i) => {
      const isAnswered = t.answers[i] != null;
      const isFlag = t.flagged[i];
      const cls = (isAnswered ? 'answered ' : '') + (i === t.current ? 'active ' : '') + (isFlag ? 'flagged' : '');
      return '<button type="button" class="' + cls + '" data-action="goto" data-i="' + i + '">' + (i + 1) + '</button>';
    }).join('');

    const opts = q.options.map((o, i) => {
      const sel = t.answers[t.current] === i;
      return '<button type="button" class="opt' + (sel ? ' selected' : '') + '" data-action="answer" data-i="' + i + '">' +
        String.fromCharCode(65 + i) + '. ' + o + '</button>';
    }).join('');

    tryoutEl.innerHTML =
      '<div class="tryout-head">' +
        '<div><h2 style="margin:0">Soal ' + (t.current + 1) + ' / ' + t.questions.length + '</h2>' +
        '<p class="muted" style="margin:4px 0">' + escapeHtml(q.chapterTitle) + ' · ' + (window.GeneratorSoal.difficultyLabels[q.difficulty] || q.difficulty) + '</p></div>' +
        '<div class="timer' + (remain < 30000 ? ' warn' : '') + '" id="timer">⏱ ' + m + ':' + s + '</div>' +
      '</div>' +
      '<div class="q-nav">' + navBtns + '</div>' +
      '<div class="question">' +
        '<div class="q-meta"><span>Kategori: ' + escapeHtml(q.chapterTitle) + '</span><span>' + (window.GeneratorSoal.difficultyLabels[q.difficulty] || q.difficulty) + '</span></div>' +
        '<div class="q-text">' + q.q + '</div>' + opts +
        '<div class="q-actions">' +
          '<div>' +
            '<button type="button" class="btn btn-ghost" data-action="prev"' + (t.current === 0 ? ' disabled' : '') + '>← Sebelumnya</button> ' +
            '<button type="button" class="btn btn-ghost" data-action="flag">' + (t.flagged[t.current] ? '★ Tandai' : '☆ Tandai') + '</button>' +
          '</div>' +
          '<div>' +
            (t.current < t.questions.length - 1
              ? '<button type="button" class="btn" data-action="next">Berikutnya →</button>'
              : '<button type="button" class="btn btn-danger" data-action="submit">Selesai & Submit</button>') +
          '</div>' +
        '</div>' +
      '</div>';

    startTimer();
  }

  function startTimer() {
    stopTimer();
    state.timer = setInterval(() => {
      if (!state.tryout) return;
      const remain = state.tryout.endAt - Date.now();
      if (remain <= 0) {
        submitTryout(true);
        return;
      }
      const el = $('#timer');
      if (el) {
        const m = String(Math.floor(remain / 60000)).padStart(2, '0');
        const s = String(Math.floor((remain % 60000) / 1000)).padStart(2, '0');
        el.textContent = '⏱ ' + m + ':' + s;
        el.classList.toggle('warn', remain < 30000);
      }
    }, 500);
  }
  function stopTimer() {
    if (state.timer) { clearInterval(state.timer); state.timer = null; }
  }

  function startTryout() {
    const gid = $('#tvGrade').value;
    const count = parseInt($('#tvCount').value, 10) || 10;
    const gradeIds = gid === 'mixed' ? (window.GRADES || []).map(g => g.id) : [gid];
    const questions = window.GeneratorSoal.generateTryout(gradeIds, count);
    if (!questions.length) { alert('Gagal membuat soal. Coba lagi.'); return; }
    const label = gid === 'mixed' ? 'Campuran Semua Kelas' : ((window.GRADES || []).find(g => g.id === gid) || {}).label || gid;
    state.tryout = {
      questions, answers: new Array(questions.length).fill(null),
      flagged: new Array(questions.length).fill(false),
      current: 0, startAt: Date.now(),
      endAt: Date.now() + questions.length * DURATION_PER_Q * 1000,
      gradeIds, label
    };
    state.phase = 'running';
    renderTryout();
  }

  function submitTryout(auto) {
    if (!state.tryout) return;
    stopTimer();
    const t = state.tryout;
    const correct = t.questions.reduce((acc, q, i) => acc + (t.answers[i] === q.answer ? 1 : 0), 0);
    const total = t.questions.length;
    const score = Math.round(correct / total * 100);

    const byChapter = {};
    t.questions.forEach((q, i) => {
      if (!byChapter[q.chapter]) byChapter[q.chapter] = { title: q.chapterTitle, total: 0, correct: 0 };
      byChapter[q.chapter].total++;
      if (t.answers[i] === q.answer) byChapter[q.chapter].correct++;
    });

    t.result = { correct, total, score, byChapter, auto };
    state.phase = 'done';
    showResultModal(t, auto);

    history.push({ at: Date.now(), label: t.label, score: correct, total });
    saveHistory();
  }

  function renderTryoutDone() {
    const t = state.tryout;
    if (!t || !t.result) { state.phase = 'idle'; return renderTryout(); }
    tryoutEl.innerHTML = '<div class="tryout-setup">' +
      '<h2>Sesi Tryout Selesai</h2>' +
      '<div class="result-score"><div class="big">' + t.result.score + '</div><div class="lbl">' + t.result.correct + ' benar dari ' + t.result.total + '</div></div>' +
      '<div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">' +
        '<button type="button" class="btn" data-action="retrySame">Ulangi Sesi Baru</button>' +
        '<button type="button" class="btn btn-ghost" data-action="backToSetup">Kembali ke Pilihan</button>' +
        '<button type="button" class="btn btn-ghost" data-action="showReview">Lihat Pembahasan</button>' +
      '</div>' +
    '</div>';
  }

  function showResultModal(t, auto) {
    const rows = Object.values(t.result.byChapter).sort((a, b) => (a.correct / a.total) - (b.correct / b.total));
    const weakList = rows.filter(r => r.correct / r.total < 0.6);
    resultBody.innerHTML =
      '<h2 id="resultTitle" style="margin:0 0 4px">Hasil Tryout' + (auto ? ' (waktu habis)' : '') + '</h2>' +
      '<p class="muted" style="margin:0 0 12px">' + escapeHtml(t.label) + '</p>' +
      '<div class="result-score"><div class="big">' + t.result.score + '</div><div class="lbl">' + t.result.correct + ' benar / ' + t.result.total + ' soal</div></div>' +
      '<h3>Analisis per Bab</h3><ul class="analysis-list">' +
        rows.map(r => {
          const pct = Math.round(r.correct / r.total * 100);
          const cls = pct < 60 ? 'weak' : (pct >= 80 ? 'strong' : '');
          return '<li><span>' + escapeHtml(r.title) + '</span><span class="' + cls + '">' + r.correct + '/' + r.total + ' (' + pct + '%)</span></li>';
        }).join('') + '</ul>' +
      (weakList.length ? '<p class="muted">Bab yang perlu diperkuat: <b>' + weakList.map(r => escapeHtml(r.title)).join(', ') + '</b>.</p>' : '<p class="muted">Semua bab di atas 60% — mantap!</p>') +
      '<h3>Pembahasan</h3>' +
      t.questions.map((q, i) => {
        const userAns = t.answers[i];
        const ok = userAns === q.answer;
        return '<div class="review-item"><h4>Soal ' + (i + 1) + ' · ' + escapeHtml(q.chapterTitle) + '</h4>' +
          '<div>' + q.q + '</div>' +
          '<p class="rr ' + (ok ? 'ok' : 'bad') + '">Jawabanmu: ' + (userAns == null ? '<i>kosong</i>' : String.fromCharCode(65 + userAns) + '. ' + q.options[userAns]) +
          ' · Kunci: ' + String.fromCharCode(65 + q.answer) + '. ' + q.options[q.answer] + '</p>' +
          '<p class="explain"><b>Penjelasan:</b> ' + q.explain + '</p></div>';
      }).join('') +
      '<div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">' +
        '<button type="button" class="btn" data-action="retrySame">Ulangi Sesi Baru</button>' +
        '<button type="button" class="btn btn-ghost" data-action="backToSetup">Kembali ke Pilihan</button>' +
      '</div>';
    resultModal.hidden = false;
    resultBody.scrollTop = 0;
  }

  function closeModal() { resultModal.hidden = true; }

  function showReviewInMain() {
    const t = state.tryout;
    if (!t || !t.result) return;
    tryoutEl.innerHTML = '<div class="tryout-setup">' +
      '<h2>Pembahasan</h2>' +
      t.questions.map((q, i) => {
        const userAns = t.answers[i];
        const ok = userAns === q.answer;
        return '<div class="review-item"><h4>Soal ' + (i + 1) + ' · ' + escapeHtml(q.chapterTitle) + '</h4>' +
          '<div>' + q.q + '</div>' +
          '<p class="rr ' + (ok ? 'ok' : 'bad') + '">Jawabanmu: ' + (userAns == null ? '<i>kosong</i>' : String.fromCharCode(65 + userAns)) +
          ' · Kunci: ' + String.fromCharCode(65 + q.answer) + '</p>' +
          '<p class="explain"><b>Penjelasan:</b> ' + q.explain + '</p></div>';
      }).join('') +
      '<button type="button" class="btn btn-ghost" data-action="backToSetup">Kembali</button>' +
    '</div>';
  }

  /* ---------- Navigasi ---------- */
  function navigate(id) {
    if (searchInput.value) { searchInput.value = ''; }
    if (id !== 'tryout') { stopTimer(); state.tryout = null; state.phase = 'idle'; }
    state.view = id;
    store.set('mtk.view', id);
    if (location.hash.slice(1) !== id) { location.hash = id; return; }
    render();
  }
  function validView(id) { return VIEWS.some(v => v.id === id); }

  /* ---------- Event: klik global ---------- */
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-view],[data-action]');
    if (!el) return;
    if (el.hasAttribute('data-view')) { navigate(el.getAttribute('data-view')); return; }
    const act = el.getAttribute('data-action');

    if (act === 'toggle') {
      const id = el.getAttribute('data-id');
      if (progress[id]) delete progress[id]; else progress[id] = true;
      saveProgress(); setDoneUI(id); updateProgressUI();
    } else if (act === 'jump') {
      const t = document.getElementById(el.getAttribute('data-target'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (act === 'toggleAll') {
      const ds = $$('details', learnEl);
      const anyClosed = ds.some(d => !d.open);
      ds.forEach(d => d.open = anyClosed);
    } else if (act === 'resetGrade') {
      const g = (window.GRADES || []).find(x => x.id === el.getAttribute('data-gid'));
      if (g && confirm('Reset progres untuk ' + g.label + '?')) {
        g.chapters.forEach(c => delete progress[c.id]);
        saveProgress();
        g.chapters.forEach(c => setDoneUI(c.id));
        updateProgressUI();
      }
    } else if (act === 'askAI') {
      askAI(el.getAttribute('data-id'));
    } else if (act === 'closeAI') {
      const id = el.getAttribute('data-id');
      delete aiCache[id];
      const box = document.querySelector('[data-aia="' + id + '"]');
      if (box) { box.hidden = true; box.innerHTML = ''; }
    } else if (act === 'clearSearch') {
      searchInput.value = ''; render(); searchInput.focus();
    } else if (act === 'startTryout') {
      startTryout();
    } else if (act === 'goto') {
      if (state.tryout) { state.tryout.current = parseInt(el.getAttribute('data-i'), 10); renderTryout(); }
    } else if (act === 'prev') {
      if (state.tryout && state.tryout.current > 0) { state.tryout.current--; renderTryout(); }
    } else if (act === 'next') {
      if (state.tryout && state.tryout.current < state.tryout.questions.length - 1) { state.tryout.current++; renderTryout(); }
    } else if (act === 'answer') {
      if (!state.tryout) return;
      const i = parseInt(el.getAttribute('data-i'), 10);
      state.tryout.answers[state.tryout.current] = i;
      renderTryout();
    } else if (act === 'flag') {
      if (!state.tryout) return;
      const cur = state.tryout.current;
      state.tryout.flagged[cur] = !state.tryout.flagged[cur];
      renderTryout();
    } else if (act === 'submit') {
      const t = state.tryout;
      const answered = t.answers.filter(a => a != null).length;
      if (answered < t.answers.length && !confirm('Masih ada ' + (t.answers.length - answered) + ' soal kosong. Submit sekarang?')) return;
      submitTryout(false);
    } else if (act === 'retrySame') {
      closeModal();
      state.phase = 'running';
      const gid = state.tryout && state.tryout.gradeIds.length === 1 ? state.tryout.gradeIds[0] : 'mixed';
      const count = state.tryout ? state.tryout.questions.length : 10;
      const questions = window.GeneratorSoal.generateTryout(
        gid === 'mixed' ? (window.GRADES || []).map(g => g.id) : [gid], count);
      const label = gid === 'mixed' ? 'Campuran Semua Kelas' : ((window.GRADES || []).find(g => g.id === gid) || {}).label || gid;
      state.tryout = {
        questions, answers: new Array(questions.length).fill(null),
        flagged: new Array(questions.length).fill(false),
        current: 0, startAt: Date.now(),
        endAt: Date.now() + questions.length * DURATION_PER_Q * 1000,
        gradeIds: gid === 'mixed' ? (window.GRADES || []).map(g => g.id) : [gid],
        label
      };
      renderTryout();
    } else if (act === 'backToSetup') {
      closeModal(); stopTimer(); state.tryout = null; state.phase = 'idle'; renderTryout();
    } else if (act === 'showReview') {
      closeModal(); showReviewInMain();
    }
  });

  /* ---------- Modal hasil tryout ---------- */
  $('#modalClose').addEventListener('click', closeModal);
  resultModal.addEventListener('click', (e) => { if (e.target === resultModal) closeModal(); });

  /* ---------- Modal API Key ---------- */
  function openApiKeyModal() {
    const saved = getApiKey();
    apiKeyBody.innerHTML =
      '<h2 id="apiKeyTitle" style="margin:0 0 4px">🔑 Gemini API Key</h2>' +
      '<p class="muted" style="margin:0 0 6px">Masukkan API Key Gemini kamu. Key disimpan <b>hanya di browser ini</b> (localStorage), tidak dikirim ke server lain selain Google.</p>' +
      '<p class="muted" style="margin:0 0 10px">Dapatkan gratis di <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener">aistudio.google.com/app/apikey</a>.</p>' +
      '<input type="password" id="apiKeyInput" placeholder="Tempel API Key di sini…" value="' + escapeHtml(saved) + '" style="width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--border);background:var(--surface-2);color:var(--text);font:inherit;margin:6px 0 12px">' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
        '<button type="button" class="btn" id="apiKeySave">Simpan</button>' +
        '<button type="button" class="btn btn-ghost" id="apiKeyClear">Hapus Key</button>' +
        '<button type="button" class="btn btn-ghost" id="apiKeyCancel">Batal</button>' +
      '</div>' +
      '<p class="setup-note" style="margin-top:12px">Catatan: API Key gratis punya kuota terbatas. Kalau kena limit, tunggu beberapa menit.</p>';
    apiKeyModal.hidden = false;
    const inp = $('#apiKeyInput');
    if (inp) { inp.focus(); inp.select(); }
  }

  if (apiKeyBtn) apiKeyBtn.addEventListener('click', openApiKeyModal);
  if (apiKeyModal) {
    apiKeyModal.addEventListener('click', (e) => {
      if (e.target === apiKeyModal) { apiKeyModal.hidden = true; return; }
      const id = e.target && e.target.id;
      if (id === 'apiKeySave') {
        setApiKey($('#apiKeyInput').value.trim());
        apiKeyModal.hidden = true;
      } else if (id === 'apiKeyClear') {
        if (confirm('Hapus API Key yang tersimpan?')) { setApiKey(''); apiKeyModal.hidden = true; }
      } else if (id === 'apiKeyCancel') {
        apiKeyModal.hidden = true;
      }
    });
  }

  /* ---------- Keyboard global ---------- */
  document.addEventListener('keydown', (e) => {
    // Enter di kotak Tanya AI = kirim
    if (e.key === 'Enter' && e.target && e.target.classList && e.target.classList.contains('ai-q')) {
      e.preventDefault();
      const id = e.target.getAttribute('data-aiq');
      if (id) askAI(id);
      return;
    }
    // Escape: tutup modal
    if (e.key === 'Escape') {
      if (!resultModal.hidden) closeModal();
      if (apiKeyModal && !apiKeyModal.hidden) apiKeyModal.hidden = true;
    }
    const tag = (e.target && e.target.tagName) || '';
    if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault(); searchInput.focus(); searchInput.select();
    } else if (e.key === 'Escape' && e.target === searchInput && searchInput.value) {
      searchInput.value = ''; render();
    }
  });

  /* ---------- Search ---------- */
  let searchTimer = null;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      if (state.view === 'tryout' && searchInput.value.trim()) {
        state.view = 'k7';
        stopTimer(); state.tryout = null; state.phase = 'idle';
      }
      render();
    }, 120);
  });

  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (validView(id)) { state.view = id; render(); }
  });

  /* ---------- Init ---------- */
  function init() {
    applyTheme(document.documentElement.getAttribute('data-theme') || 'light');
    buildTabs();
    const startHash = location.hash.slice(1);
    const ch = ALL.find(c => c.id === startHash);
    if (ch) state.view = ch.gid;
    else if (validView(startHash)) state.view = startHash;
    else {
      const saved = store.get('mtk.view', 'k7');
      state.view = validView(saved) ? saved : 'k7';
    }
    render();
    if (ch) {
      const el = document.getElementById(ch.id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    }
  }
  init();
})();
