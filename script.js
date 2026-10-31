/* ========================================================
   PAST EXAM LIBRARY - CLIENT APPLICATION
   Full-stack Frontend with Auth, Admin Dashboard & Dynamic Library
======================================================== */

// State Management
const state = {
    user: null,
    token: null,
    currentView: 'login', // 'login', 'library', 'admin'
    categories: {
        grades: [],
        semesters: [],
        examTypes: [],
        subjects: {}
    },
    library: {
        grade: null,
        semester: null,
        examType: null,
        subject: null,
        examDoc: null,
        searchQuery: ''
    },
    admin: {
        activeTab: 'exams', // 'exams', 'questions', 'activity', 'categories', 'overview'
        selectedGradeForSubjects: 'Grade12',
        examFilter: {
            grade: '',
            semester: '',
            search: ''
        },
        activityFilter: {
            type: 'all',
            grade: 'all',
            search: ''
        }
    }
};

const app = document.getElementById('app');
const headerNav = document.getElementById('header-nav');
const modalContainer = document.getElementById('modal-container');
const toastContainer = document.getElementById('toast-container');

/* ========================================================
   AESTHETIC VECTOR ICON REGISTRY (NO EMOJIS)
======================================================== */
const UI_ICONS = {
    key: '<path d="M21 2l-2 2m-1.5 1.5L14 9l-1.5-1.5-1.4 1.4 1.4 1.4-2.1 2.1a6.5 6.5 0 1 1-2.8-2.8l7.9-7.9 1.5 1.5 1.5-1.5L21 2z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    trendingUp: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    fileText: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>',
    graduation: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    bookOpen: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    bolt: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    refresh: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    export: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>',
    folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    zoomIn: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>',
    zoomOut: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>',
    sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>',
    award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    checkCircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    lightbulb: '<line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>',
    shieldCheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    smartphone: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    alertTriangle: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    bookmarkCheck: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><polyline points="9 10 11 12 15 8"/>',
    calculator: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    dna: '<path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M2 9c6.667 6 13.333 0 20 6"/><path d="M7 10.5v3"/><path d="M12 9v6"/><path d="M17 10.5v3"/>'
};

function uiIcon(name, size = 18, extraClass = '', strokeWidth = 2) {
    const iconPath = UI_ICONS[name] || UI_ICONS.fileText;
    return `<svg class="ui-icon ${extraClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; flex-shrink: 0;" aria-hidden="true">${iconPath}</svg>`;
}

function uiEmptyState(iconName, title, message) {
    return `
        <div class="empty-state-aesthetic">
            <div class="empty-state-icon-wrap">
                ${uiIcon(iconName, 30)}
            </div>
            <h4 class="empty-state-title">${title}</h4>
            <p class="empty-state-text">${message}</p>
        </div>
    `;
}

/* ========================================================
   PWA & OFFLINE SERVICE WORKER MANAGEMENT
======================================================== */
window._deferredPwaPrompt = null;
window._wasOffline = false;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window._deferredPwaPrompt = e;
    const btn = document.getElementById('pwa-install-btn');
    if (btn) btn.style.display = 'inline-flex';
});

window.addEventListener('appinstalled', () => {
    window._deferredPwaPrompt = null;
    const btn = document.getElementById('pwa-install-btn');
    if (btn) btn.style.display = 'none';
    showToast('Past Exam Library app installed! You can now study offline.', 'success');
});

function promptPwaInstall() {
    if (window._deferredPwaPrompt) {
        window._deferredPwaPrompt.prompt();
        window._deferredPwaPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                showToast('Installing Exam Library app...', 'info');
            }
            window._deferredPwaPrompt = null;
            const btn = document.getElementById('pwa-install-btn');
            if (btn) btn.style.display = 'none';
        });
    } else {
        showToast('To install: Tap your browser menu (⋮ or Share) and select "Add to Home screen"', 'info');
    }
}

function updateNetworkStatus() {
    const isOnline = navigator.onLine;
    const pills = document.querySelectorAll('.offline-pill');
    pills.forEach(pill => {
        if (isOnline) {
            pill.classList.remove('offline');
            pill.innerHTML = '<span class="status-dot"></span> Online';
            pill.title = 'Connected to school exam archive';
        } else {
            pill.classList.add('offline');
            pill.innerHTML = '<span class="status-dot"></span> Offline';
            pill.title = 'Practicing with cached exam papers';
        }
    });

    if (!isOnline) {
        showToast('Offline Mode: Practicing from cached exam papers & questions', 'info');
    } else if (window._wasOffline) {
        showToast('Back Online: Exam library synchronized', 'success');
    }
    window._wasOffline = !isOnline;
}

window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);

/* ========================================================
   ACTIVITY & AUDIT LOGGING HELPER
======================================================== */
async function logActivity(type, data = {}) {
    try {
        const payload = {
            type,
            username: state.user ? state.user.username : 'student',
            fullName: state.user ? (state.user.fullName || state.user.username) : 'Student',
            role: state.user ? state.user.role : 'student',
            userId: state.user ? state.user.id : null,
            ...data
        };
        await fetch('/api/activity/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': state.token ? `Bearer ${state.token}` : ''
            },
            body: JSON.stringify(payload)
        });

        // Also broadcast custom events to Vercel Analytics
        if (typeof window.va === 'function') {
            window.va('track', type, {
                grade: data.grade || 'General',
                subject: data.subject || 'All',
                examType: data.examType || 'General'
            });
        }

        // Broadcast instant cross-tab sync to Admin Dashboard
        if (typeof activityChannel !== 'undefined' && activityChannel) {
            try {
                activityChannel.postMessage({ type: 'activity_updated', timestamp: Date.now() });
            } catch (_) {}
        }
    } catch (err) {
        console.warn('Activity logging fallback:', err);
    }
}

/* ========================================================
   IN-TAB DOWNLOAD SYSTEM (NO NEW TAB OPENED) & AUTH GATE
======================================================== */
window._pendingDownload = null;

function promptDownloadAuth(fileUrl, suggestedFileName, activityData) {
    window._pendingDownload = { fileUrl, suggestedFileName, activityData };
    const bodyHtml = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="width: 58px; height: 58px; border-radius: 50%; background: rgba(99, 102, 241, 0.16); border: 1px solid rgba(99, 102, 241, 0.35); display: inline-flex; align-items: center; justify-content: center; color: #818cf8; margin-bottom: 12px; box-shadow: 0 4px 16px rgba(99, 102, 241, 0.25);">
                ${uiIcon('download', 28)}
            </div>
            <h3 style="font-size: 20px; color: #ffffff; margin-bottom: 6px;">Sign In to Download PDF</h3>
            <p style="color: var(--text-muted); font-size: 13.5px; line-height: 1.5; margin: 0 auto; max-width: 380px;">
                Browsing is free for all visitors. Please sign in or register your student name once to save official examination papers to your device.
            </p>
        </div>

        <div class="auth-tabs" style="margin-bottom: 18px;">
            <button id="dl-auth-tab-signin" class="auth-tab-btn active" onclick="switchDownloadAuthTab('signin')">Sign In</button>
            <button id="dl-auth-tab-register" class="auth-tab-btn" onclick="switchDownloadAuthTab('register')">Create Student Account</button>
        </div>

        <div id="dl-auth-form-container"></div>
    `;
    showModal('Student Verification Required', bodyHtml);
    switchDownloadAuthTab('signin');
}

function switchDownloadAuthTab(tab) {
    const btnSignin = document.getElementById('dl-auth-tab-signin');
    const btnReg = document.getElementById('dl-auth-tab-register');
    const container = document.getElementById('dl-auth-form-container');
    if (!container) return;

    if (btnSignin && btnReg) {
        btnSignin.className = `auth-tab-btn ${tab === 'signin' ? 'active' : ''}`;
        btnReg.className = `auth-tab-btn ${tab === 'register' ? 'active' : ''}`;
    }

    if (tab === 'signin') {
        container.innerHTML = `
            <form id="dl-signin-form" onsubmit="handleDownloadAuthSignIn(event)">
                <div class="auth-form-group">
                    <label>Username</label>
                    <input type="text" id="dl-login-username" autocomplete="username" required placeholder="Your username" autofocus>
                </div>
                <div class="auth-form-group">
                    <label>Password</label>
                    <input type="password" id="dl-login-password" autocomplete="current-password" required placeholder="Your password">
                </div>
                <button type="submit" class="btn-primary" id="btn-dl-signin-submit">
                    Sign In & Download PDF →
                </button>
            </form>
        `;
    } else {
        container.innerHTML = `
            <form id="dl-reg-form" onsubmit="handleDownloadAuthRegister(event)">
                <div class="auth-form-group">
                    <label>Student Full Name (First & Last Name) *</label>
                    <input type="text" id="dl-reg-fullname" required placeholder="e.g. Kidist Solomon" autofocus>
                </div>
                <div class="auth-form-group">
                    <label>Username</label>
                    <input type="text" id="dl-reg-username" required placeholder="Pick a username">
                </div>
                <div class="auth-form-group">
                    <label>Email Address</label>
                    <input type="email" id="dl-reg-email" required placeholder="student@example.com">
                </div>
                <div class="auth-form-group">
                    <label>Password</label>
                    <input type="password" id="dl-reg-password" autocomplete="new-password" required placeholder="At least 6 characters">
                </div>
                <button type="submit" class="btn-primary" id="btn-dl-reg-submit">
                    Create Account & Download PDF →
                </button>
            </form>
        `;
    }
}

async function handleDownloadAuthSignIn(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-dl-signin-submit');
    const username = document.getElementById('dl-login-username').value.trim();
    const password = document.getElementById('dl-login-password').value;

    btn.disabled = true;
    btn.innerHTML = 'Signing in...';

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (res.ok && data.success) {
            state.token = data.token;
            state.user = data.user;
            localStorage.setItem('pel_token', data.token);
            localStorage.setItem('pel_user', JSON.stringify(data.user));
            renderHeader();
            closeModal();
            showToast(`Welcome back, ${data.user.fullName || data.user.username}! Starting download...`, 'success');

            if (window._pendingDownload) {
                const { fileUrl, suggestedFileName, activityData } = window._pendingDownload;
                window._pendingDownload = null;
                downloadExamPaper(fileUrl, suggestedFileName, activityData);
            }
        } else {
            showToast(data.message || 'Login failed', 'error');
            btn.disabled = false;
            btn.innerHTML = 'Sign In & Download PDF →';
        }
    } catch (err) {
        showToast('Connection error during login', 'error');
        btn.disabled = false;
        btn.innerHTML = 'Sign In & Download PDF →';
    }
}

async function handleDownloadAuthRegister(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-dl-reg-submit');
    const fullName = document.getElementById('dl-reg-fullname').value.trim();
    const username = document.getElementById('dl-reg-username').value.trim();
    const email = document.getElementById('dl-reg-email').value.trim();
    const password = document.getElementById('dl-reg-password').value;

    btn.disabled = true;
    btn.innerHTML = 'Creating account...';

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, username, email, password, role: 'student' })
        });
        const data = await res.json();

        if (res.ok && data.success) {
            state.token = data.token;
            state.user = data.user;
            localStorage.setItem('pel_token', data.token);
            localStorage.setItem('pel_user', JSON.stringify(data.user));
            renderHeader();
            closeModal();
            showToast(`Account created! Starting download for ${fullName}...`, 'success');

            if (window._pendingDownload) {
                const { fileUrl, suggestedFileName, activityData } = window._pendingDownload;
                window._pendingDownload = null;
                downloadExamPaper(fileUrl, suggestedFileName, activityData);
            }
        } else {
            showToast(data.message || 'Registration failed', 'error');
            btn.disabled = false;
            btn.innerHTML = 'Create Account & Download PDF →';
        }
    } catch (err) {
        showToast('Connection error during registration', 'error');
        btn.disabled = false;
        btn.innerHTML = 'Create Account & Download PDF →';
    }
}

async function downloadExamPaper(fileUrl, suggestedFileName = 'exam_paper.pdf', activityData = null) {
    if (!fileUrl) {
        showToast('Document file path not available', 'error');
        return;
    }

    // Gated Download: If not signed in, prompt student sign-in / registration
    if (!state.user) {
        promptDownloadAuth(fileUrl, suggestedFileName, activityData);
        return;
    }

    if (activityData) {
        logActivity('download', { ...activityData, filePath: fileUrl, details: 'Downloaded official examination PDF' });
    }

    showToast('Starting exam download in background...', 'info');

    // 1. Try downloading as blob (keeps student on current tab, saves directly to device)
    try {
        const response = await fetch(fileUrl);
        if (response.ok) {
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.style.display = 'none';
            anchor.href = blobUrl;
            anchor.download = suggestedFileName || fileUrl.split('/').pop() || 'exam_paper.pdf';
            document.body.appendChild(anchor);
            anchor.click();

            setTimeout(() => {
                if (document.body.contains(anchor)) {
                    document.body.removeChild(anchor);
                }
                window.URL.revokeObjectURL(blobUrl);
            }, 3000);

            showToast('Exam paper saved to Downloads folder!', 'success');
            return;
        }
    } catch (err) {
        console.warn('In-tab blob download failed, falling back to hidden frame', err);
    }

    // 2. Fallback: Use invisible iframe (keeps user 100% on current tab without opening new tabs)
    try {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = fileUrl;
        document.body.appendChild(iframe);
        setTimeout(() => {
            if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
            }
        }, 10000);
        showToast('Download started on this page!', 'success');
    } catch (e) {
        // 3. Fallback: same-tab anchor without target="_blank"
        const anchor = document.createElement('a');
        anchor.style.display = 'none';
        anchor.href = fileUrl;
        anchor.download = suggestedFileName;
        document.body.appendChild(anchor);
        anchor.click();
        setTimeout(() => {
            if (document.body.contains(anchor)) {
                document.body.removeChild(anchor);
            }
        }, 2000);
    }
}

/* ========================================================
   BROWSER HISTORY & SPA BACK NAVIGATION (SAME TAB)
======================================================== */
function pushNavState(stateObj, title = '') {
    try {
        window.history.pushState(stateObj, title, window.location.pathname);
        if (typeof window.va === 'function' && stateObj && stateObj.view) {
            window.va('track', 'pageview', { view: stateObj.view, grade: stateObj.gradeId || 'home' });
        }
    } catch (e) {
        console.warn('History pushState failed', e);
    }
}

window.addEventListener('popstate', (e) => {
    const s = e.state;
    if (!s || s.view === 'library') {
        showLibraryHome(false);
    } else if (s.view === 'grade') {
        showGrade(s.gradeId, false);
    } else if (s.view === 'semester') {
        showSemester(s.gradeId, s.semester, false);
    } else if (s.view === 'examType') {
        showExamType(s.gradeId, s.semester, s.examType, false);
    } else if (s.view === 'national') {
        showNationalExamCategory(s.category, false);
    } else if (s.view === 'hub') {
        showExamHub(s.grade, s.semester, s.examType, s.subject, s.filePath, s.examTitle, () => {
            if (s.semester === 'Pretest' || s.semester === 'Model') {
                showNationalExamCategory(s.semester, false);
            } else {
                showExamType(s.grade, s.semester, s.examType, false);
            }
        }, false);
    } else if (s.view === 'viewer') {
        renderExamViewer(s.title, s.subtitle, s.fileUrl, () => {
            showLibraryHome(false);
        }, false);
    } else if (s.view === 'practiceGradeCatalog') {
        showPracticeGradeCatalog(false);
    } else if (s.view === 'practiceSubjectCatalog') {
        showPracticeSubjectCatalog(s.gradeId, false);
    } else if (s.view === 'formulaGrades') {
        showFormulaGrades(false);
    } else if (s.view === 'formulaSubjects') {
        showFormulaSubjects(s.gradeId, false);
    } else if (s.view === 'formulaSheet') {
        showFormulaSheet(s.gradeId, s.subjectId, s.search || '', false);
    } else if (s.view === 'formulas') {
        showFormulaGrades(false);
    } else if (s.view === 'studyhub') {
        showStudyHubView(false);
    } else {
        showLibraryHome(false);
    }
});

/* ========================================================
   INITIALIZATION & API HELPERS
======================================================== */

async function initApp() {
    // Register Service Worker for offline & low-data caching
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then((reg) => {
                console.log('[PWA] Service Worker registered with scope:', reg.scope);
                // Pre-cache authentic exam questions across all grades for seamless offline practice
                if (navigator.onLine) {
                    ['Grade9', 'Grade10', 'Grade11', 'Grade12'].forEach(g => {
                        fetch(`/api/practice?grade=${g}`).catch(() => {});
                    });
                    fetch('/api/practice').then(r => r.json()).then(d => {
                        if (d && d.questions && d.questions.length > 0) {
                            try {
                                localStorage.setItem('pel_offline_questions', JSON.stringify(d.questions));
                            } catch(e) {}
                        }
                    }).catch(() => {});
                    fetch('/api/categories').then(r => r.json()).then(d => {
                        if (d && d.categories) {
                            try {
                                localStorage.setItem('pel_offline_categories', JSON.stringify(d.categories));
                            } catch(e) {}
                        }
                    }).catch(() => {});
                    fetch('/api/exams').catch(() => {});
                }
            }).catch((err) => {
                console.warn('[PWA] Service Worker registration failed:', err);
            });
        });
    }
    // Check saved session
    const savedToken = localStorage.getItem('pel_token');
    const savedUser = localStorage.getItem('pel_user');

    if (savedToken && savedUser) {
        try {
            state.token = savedToken;
            state.user = JSON.parse(savedUser);
            // Verify token validity with backend
            const res = await fetch('/api/auth/me', {
                headers: { 'Authorization': `Bearer ${state.token}` }
            });
            if (res.ok) {
                const data = await res.json();
                state.user = data.user;
                localStorage.setItem('pel_user', JSON.stringify(data.user));
            } else {
                logout(false);
            }
        } catch (e) {
            console.warn('Session verification fallback', e);
        }
    }

    // Load dynamic categories
    await fetchCategories();

    // Determine initial view: Public browsing enabled for all visitors
    if (state.user && state.user.role === 'admin' && window.location.hash === '#admin') {
        setView('admin');
    } else {
        setView('library');
    }
}

async function fetchCategories() {
    try {
        const res = await fetch('/api/categories');
        if (res.ok) {
            const data = await res.json();
            state.categories = data.categories;
            try {
                localStorage.setItem('pel_offline_categories', JSON.stringify(data.categories));
            } catch(e) {}
            if (state.categories.grades && state.categories.grades.length > 0 && !state.admin.selectedGradeForSubjects) {
                state.admin.selectedGradeForSubjects = state.categories.grades[0].id;
            }
        }
    } catch (err) {
        console.warn('Network failed to fetch categories, attempting offline fallback:', err);
        try {
            const cachedCat = localStorage.getItem('pel_offline_categories');
            if (cachedCat) {
                state.categories = JSON.parse(cachedCat);
            }
        } catch(e) {}
    }
}

function setView(viewName) {
    if (viewName !== 'admin' && typeof stopActivityPolling === 'function') {
        stopActivityPolling();
    }
    state.currentView = viewName;
    renderHeader();

    if (viewName === 'login') {
        showLoginView();
    } else if (viewName === 'admin') {
        if (!state.user || state.user.role !== 'admin') {
            showToast('Access denied: Admin permissions required', 'error');
            setView('library');
            return;
        }
        showAdminDashboard();
    } else if (viewName === 'library') {
        showLibraryHome();
    } else if (viewName === 'formulas') {
        showFormulaGrades();
    } else if (viewName === 'studyhub') {
        showStudyHubView();
    }
}

function navigateToHome() {
    setView('library');
}

/* ========================================================
   TOASTS & MODALS
======================================================== */

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const iconSvg = type === 'success' ? uiIcon('checkCircle', 15) : (type === 'error' ? uiIcon('alertTriangle', 15) : uiIcon('sparkles', 15));
    toast.innerHTML = `<span style="display: inline-flex; align-items: center;">${iconSvg}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function showModal(title, bodyHtml, footerHtml = '') {
    modalContainer.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                ${bodyHtml}
            </div>
            ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
        </div>
    `;
    modalContainer.style.display = 'flex';
}

function closeModal() {
    modalContainer.style.display = 'none';
    modalContainer.innerHTML = '';
}

// Close modal when clicking outside dialog
modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
        closeModal();
    }
});

/* ========================================================
   HEADER NAVIGATION
======================================================== */

function renderHeader() {
    const isOnline = navigator.onLine;
    const pwaControls = `
        <div class="pwa-nav-container">
            <span class="offline-pill ${isOnline ? '' : 'offline'}" title="${isOnline ? 'Connected to school archive' : 'Practicing with cached exam papers'}">
                <span class="status-dot"></span> ${isOnline ? 'Online' : 'Offline'}
            </span>
            <button id="pwa-install-btn" class="pwa-install-btn" style="display: ${window._deferredPwaPrompt ? 'inline-flex' : 'none'}; align-items: center; gap: 6px;" onclick="promptPwaInstall()">
                ${uiIcon('download', 14)} Install App
            </button>
        </div>
    `;

    const isLibraryActive = state.currentView === 'library';
    const isFormulasActive = state.currentView === 'formulas';
    const isStudyHubActive = state.currentView === 'studyhub';

    if (!state.user) {
        headerNav.innerHTML = `
            ${pwaControls}
            <button class="nav-btn ${isLibraryActive ? 'active' : ''}" onclick="setView('library')">
                ${uiIcon('book', 14)} Exam library
            </button>
            <button class="nav-btn ${isFormulasActive ? 'active' : ''}" onclick="setView('formulas')">
                ${uiIcon('calculator', 14)} Formula sheets
            </button>
            <button class="nav-btn ${isStudyHubActive ? 'active' : ''}" onclick="setView('studyhub')">
                ${uiIcon('bookmark', 14)} My study hub
            </button>
            <button class="btn-primary" style="padding: 6px 14px; font-size: 13px; margin-left: 6px; cursor: pointer;" onclick="setView('login')">
                Sign in
            </button>
        `;
        return;
    }

    const isAdmin = state.user.role === 'admin';
    const isAdminActive = state.currentView === 'admin';
    const displayName = state.user.fullName || state.user.username || 'Student';
    const userInitial = displayName.trim().charAt(0).toUpperCase() || 'S';

    headerNav.innerHTML = `
        ${pwaControls}
        <div class="user-badge" onclick="openProfileModal()" style="cursor: pointer; display: flex; align-items: center; gap: 8px;" title="Registered Name: ${escapeQuotes(displayName)} (Click to view or edit)">
            <div class="activity-user-avatar" style="width: 28px; height: 28px; font-size: 12px; margin-right: 2px;">${userInitial}</div>
            <div style="display: flex; flex-direction: column; text-align: left; line-height: 1.2;">
                <span class="user-name" style="font-weight: 700; color: #ffffff; font-size: 13.5px;">${displayName}</span>
                <span class="role-pill ${isAdmin ? 'admin' : ''}" style="font-size: 9.5px; padding: 1px 6px; align-self: flex-start;">${isAdmin ? 'Admin' : 'Student'}</span>
            </div>
        </div>

        <button class="nav-btn ${isLibraryActive ? 'active' : ''}" onclick="setView('library')">
            ${uiIcon('book', 14)} Exam library
        </button>
        <button class="nav-btn ${isFormulasActive ? 'active' : ''}" onclick="setView('formulas')">
            ${uiIcon('calculator', 14)} Formula sheets
        </button>
        <button class="nav-btn ${isStudyHubActive ? 'active' : ''}" onclick="setView('studyhub')">
            ${uiIcon('bookmark', 14)} My study hub
        </button>

        ${isAdmin ? `
            <button class="nav-btn ${isAdminActive ? 'active' : ''}" onclick="setView('admin')">
                Admin dashboard
            </button>
        ` : ''}

        <button class="nav-btn" onclick="logout()" title="Sign Out">
            Sign out
        </button>
    `;
}

function openProfileModal() {
    if (!state.user) return;
    const currentFullName = state.user.fullName || '';
    const currentUsername = state.user.username || '';
    const currentRole = state.user.role === 'admin' ? 'Administrator' : 'Student';
    const email = state.user.email || 'Not provided';
    const initial = (currentFullName || currentUsername || 'S').trim().charAt(0).toUpperCase();

    const bodyHtml = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div class="activity-user-avatar" style="width: 56px; height: 56px; font-size: 22px; margin: 0 auto 12px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);">
                ${initial}
            </div>
            <h4 style="margin: 0; color: #ffffff; font-size: 17px;">${currentFullName || currentUsername}</h4>
            <div style="margin-top: 5px; display: flex; justify-content: center; gap: 8px; align-items: center;">
                <span style="font-size: 12px; color: var(--text-muted);">@${currentUsername}</span>
                <span class="role-pill ${state.user.role === 'admin' ? 'admin' : ''}" style="font-size: 10px; padding: 2px 7px;">${currentRole}</span>
            </div>
        </div>

        <form id="profile-edit-form" onsubmit="saveProfileName(event)">
            <div class="auth-form-group">
                <label>Student Full Name (Registered Name) *</label>
                <input type="text" id="profile-fullname" required value="${escapeQuotes(currentFullName)}" placeholder="e.g. Kidist Solomon" autofocus>
                <p style="font-size: 12px; color: var(--text-muted); margin-top: 5px;">
                    This registered name appears on the top navigation bar, exam progress, and in the teacher & admin activity logs.
                </p>
            </div>

            <div class="auth-form-group">
                <label>Account Username</label>
                <input type="text" value="${escapeQuotes(currentUsername)}" disabled style="opacity: 0.6; cursor: not-allowed;">
            </div>

            <div class="auth-form-group">
                <label>Account Email</label>
                <input type="text" value="${escapeQuotes(email)}" disabled style="opacity: 0.6; cursor: not-allowed;">
            </div>

            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button type="button" class="btn-secondary" onclick="closeModal()" style="flex: 1;">Cancel</button>
                <button type="submit" class="btn-primary" id="btn-save-profile" style="flex: 2;">Save Registered Name</button>
            </div>
        </form>
    `;
    showModal('Student Profile & Registered Name', bodyHtml);
}

async function saveProfileName(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-save-profile');
    const newFullName = document.getElementById('profile-fullname').value.trim();
    if (!newFullName) {
        showToast('Please enter your registered name', 'warning');
        return;
    }

    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Saving...';
    }

    try {
        const res = await fetch('/api/auth/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({ fullName: newFullName })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            state.user.fullName = newFullName;
            localStorage.setItem('pel_user', JSON.stringify(state.user));
            renderHeader();
            closeModal();
            showToast('Registered name updated successfully!', 'success');
        } else {
            showToast(data.message || 'Failed to update registered name', 'error');
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Save Registered Name';
            }
        }
    } catch (err) {
        showToast('Network error while saving registered name', 'error');
        if (btn) {
            btn.disabled = false;
            btn.textContent = 'Save Registered Name';
        }
    }
}

function logout(notify = true) {
    localStorage.removeItem('pel_token');
    localStorage.removeItem('pel_user');
    state.user = null;
    state.token = null;
    if (notify) showToast('Logged out successfully', 'info');
    setView('login');
}

/* ========================================================
   1. LOGIN & REGISTER VIEW (FIRST PAGE)
======================================================== */

function showLoginView(activeTab = 'signin') {
    app.innerHTML = `
        <div class="auth-wrapper">
            <div class="auth-card">
                <div class="auth-header">
                    <div class="auth-icon" aria-hidden="true"><span>PE</span></div>
                    <h2>Past Exam Library</h2>
                    <p>A student-run collection of past examination papers.</p>
                </div>

                <div class="auth-tabs">
                    <button class="auth-tab-btn ${activeTab === 'signin' ? 'active' : ''}" 
                            onclick="showLoginView('signin')">
                        Sign In
                    </button>
                    <button class="auth-tab-btn ${activeTab === 'register' ? 'active' : ''}" 
                            onclick="showLoginView('register')">
                        Create Account
                    </button>
                </div>

                ${activeTab === 'signin' ? `
                    <form id="signin-form" onsubmit="handleSignIn(event)">
                        <div class="auth-form-group">
                            <label>Username</label>
                            <input type="text" id="login-username" autocomplete="username" required placeholder="Your username" autofocus>
                        </div>

                        <div class="auth-form-group">
                            <label>Password</label>
                            <input type="password" id="login-password" autocomplete="current-password" required placeholder="Your password">
                        </div>

                        <button type="submit" class="btn-primary" id="btn-login-submit">
                            Sign In to Portal →
                        </button>
                    </form>
                ` : `
                    <form id="register-form" onsubmit="handleRegister(event)">
                        <div class="auth-form-group">
                            <label>Student Full Name (First & Last Name) *</label>
                            <input type="text" id="reg-fullname" required placeholder="e.g. Kidist Solomon">
                        </div>

                        <div class="auth-form-group">
                            <label>Username</label>
                            <input type="text" id="reg-username" required placeholder="Pick a username">
                        </div>

                        <div class="auth-form-group">
                            <label>Email Address</label>
                            <input type="email" id="reg-email" required placeholder="student@example.com">
                        </div>

                        <div class="auth-form-group">
                            <label>Password</label>
                            <input type="password" id="reg-password" autocomplete="new-password" required placeholder="At least 6 characters">
                        </div>

                        <button type="submit" class="btn-primary" id="btn-reg-submit">
                            Create Account & Continue →
                        </button>
                    </form>
                `}

                <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-color); text-align: center;">
                    <p style="font-size: 13px; color: var(--text-muted); font-weight: 500;">
                        Past Exam Library · Shared by students, for students
                    </p>
                </div>
            </div>
        </div>
    `;
}

async function handleSignIn(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-login-submit');
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    btn.disabled = true;
    btn.innerHTML = 'Signing in...';

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (res.ok && data.success) {
            state.token = data.token;
            state.user = data.user;
            localStorage.setItem('pel_token', data.token);
            localStorage.setItem('pel_user', JSON.stringify(data.user));

            showToast(`Welcome back, ${data.user.fullName || data.user.username}!`, 'success');

            if (data.user.role === 'admin') {
                setView('admin');
            } else {
                setView('library');
            }
        } else {
            showToast(data.message || 'Login failed. Please check your credentials.', 'error');
            btn.disabled = false;
            btn.innerHTML = 'Sign In to Portal →';
        }
    } catch (err) {
        showToast('Connection error. Please try again.', 'error');
        btn.disabled = false;
        btn.innerHTML = 'Sign In to Portal →';
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-reg-submit');
    const fullName = document.getElementById('reg-fullname').value.trim();
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;

    btn.disabled = true;
    btn.innerHTML = 'Creating account...';

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, username, email, password, role: 'student' })
        });
        const data = await res.json();

        if (res.ok && data.success) {
            state.token = data.token;
            state.user = data.user;
            localStorage.setItem('pel_token', data.token);
            localStorage.setItem('pel_user', JSON.stringify(data.user));

            showToast('Account created successfully!', 'success');
            setView('library');
        } else {
            showToast(data.message || 'Registration failed.', 'error');
            btn.disabled = false;
            btn.innerHTML = 'Create Account & Continue →';
        }
    } catch (err) {
        showToast('Network error during registration.', 'error');
        btn.disabled = false;
        btn.innerHTML = 'Create Account & Continue →';
    }
}

/* ========================================================
   2. ADMIN DASHBOARD
======================================================== */

async function showAdminDashboard() {
    const activeTab = state.admin.activeTab;

    app.innerHTML = `
        <div class="admin-dashboard">
            <div class="page-header">
                <div class="page-title">
                    <h2>Admin Management Dashboard</h2>
                    <p>Manage categories, grades, subjects, and upload past examination papers</p>
                </div>
                <div>
                    <button class="btn-primary" onclick="openAddExamModal()">
                        + Upload Exam Paper
                    </button>
                </div>
            </div>

            <!-- Stats Bar -->
            <div id="admin-stats-container" class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon" style="background: rgba(99, 102, 241, 0.15); color: #818cf8;">${uiIcon('fileText', 22)}</div>
                    <div>
                        <div class="stat-value" id="stat-exams">...</div>
                        <div class="stat-label">Total Exam Papers</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: rgba(168, 85, 247, 0.15); color: #c084fc;">${uiIcon('graduation', 22)}</div>
                    <div>
                        <div class="stat-value" id="stat-grades">...</div>
                        <div class="stat-label">Grades & Categories</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa;">${uiIcon('book', 22)}</div>
                    <div>
                        <div class="stat-value" id="stat-subjects">...</div>
                        <div class="stat-label">Total Subjects</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">${uiIcon('users', 22)}</div>
                    <div>
                        <div class="stat-value" id="stat-users">...</div>
                        <div class="stat-label">Registered Students</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24;">${uiIcon('target', 22)}</div>
                    <div>
                        <div class="stat-value" id="stat-questions">...</div>
                        <div class="stat-label">Practice Questions</div>
                    </div>
                </div>
            </div>

            <!-- Dashboard Navigation Tabs -->
            <div class="admin-tabs">
                <button class="admin-tab ${activeTab === 'exams' ? 'active' : ''}" 
                        onclick="switchAdminTab('exams')">
                    ${uiIcon('fileText', 15)} Manage Exam Papers
                </button>
                <button class="admin-tab ${activeTab === 'questions' ? 'active' : ''}" 
                        onclick="switchAdminTab('questions')">
                    ${uiIcon('target', 15)} Practice Questions
                </button>
                <button class="admin-tab ${activeTab === 'activity' ? 'active' : ''}" 
                        onclick="switchAdminTab('activity')">
                    ${uiIcon('activity', 15)} Activity & Student Logs
                </button>
                <button class="admin-tab ${activeTab === 'categories' ? 'active' : ''}" 
                        onclick="switchAdminTab('categories')">
                    ${uiIcon('layers', 15)} Categories & Subjects
                </button>
                <button class="admin-tab ${activeTab === 'overview' ? 'active' : ''}" 
                        onclick="switchAdminTab('overview')">
                    ${uiIcon('chart', 15)} System Overview
                </button>
            </div>

            <!-- Tab Content Container -->
            <div id="admin-tab-content">
                <!-- Rendered dynamically -->
            </div>
        </div>
    `;

    // Load statistics
    loadAdminStats();

    // Render active tab content
    if (activeTab === 'exams') {
        renderAdminExamsTab();
    } else if (activeTab === 'questions') {
        renderAdminQuestionsTab();
    } else if (activeTab === 'activity') {
        renderAdminActivityTab();
    } else if (activeTab === 'categories') {
        renderAdminCategoriesTab();
    } else if (activeTab === 'overview') {
        renderAdminOverviewTab();
    }
}

function switchAdminTab(tab) {
    if (tab !== 'activity' && typeof stopActivityPolling === 'function') {
        stopActivityPolling();
    }
    state.admin.activeTab = tab;
    showAdminDashboard();
}

async function loadAdminStats() {
    try {
        const res = await fetch('/api/stats', {
            headers: { 'Authorization': `Bearer ${state.token}` }
        });
        if (res.ok) {
            const data = await res.json();
            const s = data.stats;
            document.getElementById('stat-exams').textContent = s.totalExams;
            document.getElementById('stat-grades').textContent = s.totalGrades;
            document.getElementById('stat-subjects').textContent = s.totalSubjects;
            document.getElementById('stat-users').textContent = s.totalUsers;
            if (document.getElementById('stat-questions')) {
                document.getElementById('stat-questions').textContent = s.totalQuestions || 0;
            }
        }
    } catch (e) {
        console.warn('Failed to load stats', e);
    }
}

/* 2A: Manage Exams Tab */
async function renderAdminExamsTab() {
    const container = document.getElementById('admin-tab-content');
    container.innerHTML = `
        <div class="admin-section">
            <div class="section-top">
                <h3>Uploaded Examination Papers</h3>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <select id="admin-filter-grade" onchange="filterAdminExams()" class="btn-secondary" style="padding: 8px 12px;">
                        <option value="">All Grades</option>
                        ${state.categories.grades.map(g => `<option value="${g.id}">${g.name}</option>`).join('')}
                    </select>

                    <input type="text" id="admin-filter-search" oninput="filterAdminExams()" 
                           placeholder="Search paper or subject..." 
                           class="btn-secondary" style="padding: 8px 12px; width: 220px;">
                    
                    <button class="btn-primary" onclick="openAddExamModal()" style="width: auto; padding: 8px 14px;">
                        + Upload Paper
                    </button>
                </div>
            </div>

            <div id="admin-exams-table-container">
                <p style="color: var(--text-muted); padding: 20px 0;">Loading exam papers...</p>
            </div>
        </div>
    `;

    loadAdminExamsList();
}

let cachedExams = [];

async function loadAdminExamsList() {
    const tableContainer = document.getElementById('admin-exams-table-container');
    try {
        const res = await fetch('/api/exams');
        const data = await res.json();
        cachedExams = data.exams || [];
        renderExamsTable(cachedExams);
    } catch (err) {
        tableContainer.innerHTML = `<p style="color: var(--danger);">Failed to load exams: ${err.message}</p>`;
    }
}

function filterAdminExams() {
    const gradeFilter = document.getElementById('admin-filter-grade')?.value || '';
    const searchFilter = (document.getElementById('admin-filter-search')?.value || '').toLowerCase();

    let filtered = cachedExams;
    if (gradeFilter) {
        filtered = filtered.filter(e => e.grade === gradeFilter);
    }
    if (searchFilter) {
        filtered = filtered.filter(e => 
            (e.title && e.title.toLowerCase().includes(searchFilter)) ||
            (e.subject && e.subject.toLowerCase().includes(searchFilter)) ||
            (e.examType && e.examType.toLowerCase().includes(searchFilter))
        );
    }
    renderExamsTable(filtered);
}

function renderExamsTable(exams) {
    const container = document.getElementById('admin-exams-table-container');
    if (!container) return;

    if (exams.length === 0) {
        container.innerHTML = uiEmptyState('fileText', 'No exam papers found', 'Click the "+ Upload Paper" button to add your first examination paper.');
        return;
    }

    container.innerHTML = `
        <div class="table-container">
            <table class="custom-table">
                <thead>
                    <tr>
                        <th>Title / Exam Paper</th>
                        <th>Grade</th>
                        <th>Semester / Type</th>
                        <th>Subject</th>
                        <th>Year</th>
                        <th>Uploaded By</th>
                        <th style="text-align: right;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${exams.map(exam => `
                        <tr>
                            <td>
                                <strong>${exam.title}</strong>
                                ${exam.fileName ? `<div style="font-size: 12px; color: var(--text-light);">${exam.fileName}</div>` : ''}
                            </td>
                            <td><span class="badge badge-blue">${exam.grade}</span></td>
                            <td><span class="badge badge-amber">${exam.semester} • ${exam.examType}</span></td>
                            <td><span class="badge badge-green">${exam.subject}</span></td>
                            <td>${exam.year || '2024'}</td>
                            <td><span style="font-size: 12px; color: var(--text-muted);">${exam.uploadedBy || 'admin'}</span></td>
                            <td style="text-align: right;">
                                <div class="table-actions" style="justify-content: flex-end;">
                                    <button class="btn-icon" onclick="previewExamDoc('${exam.id}')" title="Preview PDF" style="display: inline-flex; align-items: center; gap: 5px;">
                                        ${uiIcon('eye', 13)} View
                                    </button>
                                    <button class="btn-icon" title="Download PDF" onclick="downloadExamPaper('${exam.fileUrl}', '${escapeQuotes(exam.title)}.pdf')" style="display: inline-flex; align-items: center; justify-content: center; cursor: pointer;">
                                        ${uiIcon('download', 14)}
                                    </button>
                                    <button class="btn-icon danger" onclick="confirmDeleteExam('${exam.id}', '${escapeQuotes(exam.title)}')" title="Delete" style="display: inline-flex; align-items: center; justify-content: center;">
                                        ${uiIcon('trash', 14)}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function escapeQuotes(str) {
    return (str || '').replace(/'/g, "\\'");
}

/* Modal: Upload New Exam Paper */
function openAddExamModal() {
    const grades = state.categories.grades;
    const defaultGrade = grades[0]?.id || 'Grade12';
    const gradeSubjects = state.categories.subjects[defaultGrade] || [];

    const bodyHtml = `
        <form id="add-exam-form" onsubmit="handleUploadExam(event)">
            <div class="auth-form-group">
                <label>Exam Title *</label>
                <input type="text" id="new-exam-title" required placeholder="e.g. Mathematics Final Examination 2024">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                <div class="auth-form-group">
                    <label>Grade / Category *</label>
                    <select id="new-exam-grade" onchange="updateModalSubjectDropdown()" required>
                        ${grades.map(g => `<option value="${g.id}">${g.name}</option>`).join('')}
                    </select>
                </div>

                <div class="auth-form-group">
                    <label>Semester / Period *</label>
                    <select id="new-exam-semester" required>
                        <option value="Semester1">Semester 1</option>
                        <option value="Semester2">Semester 2</option>
                        <option value="Pretest">Pre-test</option>
                        <option value="Model">Model Exam</option>
                    </select>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                <div class="auth-form-group">
                    <label>Exam Type *</label>
                    <select id="new-exam-type" required>
                        <option value="Final">Final Exam</option>
                        <option value="Mid1">Mid 1</option>
                        <option value="Mid2">Mid 2</option>
                        <option value="Pretest">Pre-test</option>
                        <option value="Model">Model Exam</option>
                    </select>
                </div>

                <div class="auth-form-group">
                    <label>Subject *</label>
                    <select id="new-exam-subject" required>
                        ${gradeSubjects.map(s => `<option value="${s}">${s}</option>`).join('')}
                        <option value="__custom__">+ Enter Custom Subject...</option>
                    </select>
                </div>
            </div>

            <div class="auth-form-group" id="custom-subject-wrapper" style="display: none;">
                <label>Custom Subject Name *</label>
                <input type="text" id="new-exam-custom-subject" placeholder="e.g. Computer Science">
            </div>

            <div class="auth-form-group">
                <label>Academic Year</label>
                <input type="text" id="new-exam-year" value="${new Date().getFullYear()}" placeholder="2024">
            </div>

            <div class="auth-form-group">
                <label>Upload PDF Document *</label>
                <div class="file-dropzone" onclick="document.getElementById('new-exam-file').click()">
                    <div class="file-dropzone-icon" style="color: #818cf8; margin-bottom: 8px;">${uiIcon('fileText', 34)}</div>
                    <strong id="dropzone-label">Click to select or drop PDF file</strong>
                    <p>Supported format: .pdf (Max size: 50MB)</p>
                    <input type="file" id="new-exam-file" accept=".pdf,application/pdf" style="display: none;" onchange="handleFileSelect(event)">
                </div>
            </div>

            <div class="auth-form-group">
                <label style="color: var(--text-muted); font-size: 12px;">— OR provide external PDF URL (Optional) —</label>
                <input type="url" id="new-exam-url" placeholder="https://example.com/papers/math-final.pdf">
            </div>

            <button type="submit" class="btn-primary" id="btn-submit-exam" style="margin-top: 10px;">
                Upload & Publish Exam Paper →
            </button>
        </form>
    `;

    showModal('Upload New Examination Paper', bodyHtml);

    // Watch custom subject trigger
    const subSelect = document.getElementById('new-exam-subject');
    if (subSelect) {
        subSelect.addEventListener('change', (e) => {
            const wrap = document.getElementById('custom-subject-wrapper');
            if (wrap) wrap.style.display = e.target.value === '__custom__' ? 'block' : 'none';
        });
    }
}

function updateModalSubjectDropdown() {
    const gradeSelect = document.getElementById('new-exam-grade');
    const subSelect = document.getElementById('new-exam-subject');
    if (!gradeSelect || !subSelect) return;

    const selectedGrade = gradeSelect.value;
    const subjects = state.categories.subjects[selectedGrade] || [];

    subSelect.innerHTML = `
        ${subjects.map(s => `<option value="${s}">${s}</option>`).join('')}
        <option value="__custom__">+ Enter Custom Subject...</option>
    `;
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    const label = document.getElementById('dropzone-label');
    if (file && label) {
        label.innerHTML = `Selected: <strong>${file.name}</strong> (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
        label.style.color = 'var(--primary)';
    }
}

async function handleUploadExam(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-submit-exam');
    btn.disabled = true;
    btn.innerHTML = 'Uploading exam paper...';

    const title = document.getElementById('new-exam-title').value.trim();
    const grade = document.getElementById('new-exam-grade').value;
    const semester = document.getElementById('new-exam-semester').value;
    const examType = document.getElementById('new-exam-type').value;
    let subject = document.getElementById('new-exam-subject').value;
    if (subject === '__custom__') {
        subject = document.getElementById('new-exam-custom-subject').value.trim();
    }
    const year = document.getElementById('new-exam-year').value.trim();
    const externalUrl = document.getElementById('new-exam-url').value.trim();
    const fileInput = document.getElementById('new-exam-file');
    const file = fileInput?.files[0];

    if (!subject) {
        showToast('Please specify a valid subject', 'error');
        btn.disabled = false;
        btn.innerHTML = 'Upload & Publish Exam Paper →';
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('grade', grade);
    formData.append('semester', semester);
    formData.append('examType', examType);
    formData.append('subject', subject);
    formData.append('year', year);
    if (externalUrl) formData.append('externalUrl', externalUrl);
    if (file) formData.append('examFile', file);

    try {
        const res = await fetch('/api/exams', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${state.token}`
            },
            body: formData
        });
        const data = await res.json();

        if (res.ok && data.success) {
            showToast('Exam paper uploaded successfully!', 'success');
            closeModal();
            // Refresh categories & list
            await fetchCategories();
            loadAdminStats();
            loadAdminExamsList();
        } else {
            showToast(data.message || 'Failed to upload exam paper', 'error');
            btn.disabled = false;
            btn.innerHTML = 'Upload & Publish Exam Paper →';
        }
    } catch (err) {
        showToast('Network error during upload: ' + err.message, 'error');
        btn.disabled = false;
        btn.innerHTML = 'Upload & Publish Exam Paper →';
    }
}

function confirmDeleteExam(id, title) {
    const bodyHtml = `
        <p>Are you sure you want to permanently delete this exam paper?</p>
        <div style="margin: 14px 0; padding: 12px; background: #fee2e2; border-radius: 8px; color: #991b1b; font-weight: 600;">
            ${title}
        </div>
        <p style="font-size: 13px; color: var(--text-muted);">This action cannot be undone.</p>
    `;
    const footerHtml = `
        <button class="btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn-primary" style="background: var(--danger);" onclick="deleteExam('${id}')">Yes, Delete Paper</button>
    `;
    showModal('Delete Exam Paper', bodyHtml, footerHtml);
}

async function deleteExam(id) {
    try {
        const res = await fetch(`/api/exams/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${state.token}` }
        });
        const data = await res.json();
        if (res.ok && data.success) {
            showToast('Exam paper deleted', 'success');
            closeModal();
            loadAdminStats();
            loadAdminExamsList();
        } else {
            showToast(data.message || 'Delete failed', 'error');
        }
    } catch (e) {
        showToast('Error deleting exam', 'error');
    }
}

/* 2B: Manage Categories & Subjects Tab */
function renderAdminCategoriesTab() {
    const container = document.getElementById('admin-tab-content');
    const grades = state.categories.grades;
    const selectedGrade = state.admin.selectedGradeForSubjects || grades[0]?.id;
    const currentSubjects = state.categories.subjects[selectedGrade] || [];

    container.innerHTML = `
        <div class="category-manager-grid">
            <!-- Left: Grades Manager -->
            <div class="admin-section">
                <div class="section-top">
                    <h3>Grades & Categories</h3>
                    <button class="btn-primary" onclick="openAddGradeModal()" style="width: auto; padding: 8px 12px; font-size: 13px;">
                        + Add Grade
                    </button>
                </div>
                <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
                    Each grade has its own curriculum, subjects, semesters, and exams.
                </p>

                <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${grades.map(g => `
                        <div class="card" style="min-height: 70px; padding: 14px 18px;">
                            <div class="card-number" style="width: 40px; height: 40px; font-size: 14px;">${g.number || '00'}</div>
                            <div class="card-info">
                                <h4 style="font-size: 16px; color: var(--navy-900);">${g.name}</h4>
                                <p style="font-size: 12px; color: var(--text-muted);">${(state.categories.subjects[g.id] || []).length} subjects</p>
                            </div>
                            <button class="btn-icon danger" onclick="confirmDeleteGrade('${g.id}', '${g.name}')" title="Delete Grade" style="display: inline-flex; align-items: center; justify-content: center;">
                                ${uiIcon('trash', 14)}
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Right: Subjects Manager -->
            <div class="admin-section">
                <div class="section-top">
                    <h3>Subjects in Grade</h3>
                    <select id="select-subject-grade" onchange="changeGradeForSubjects(this.value)" class="btn-secondary" style="font-weight: 700;">
                        ${grades.map(g => `
                            <option value="${g.id}" ${g.id === selectedGrade ? 'selected' : ''}>${g.name}</option>
                        `).join('')}
                    </select>
                </div>

                <div style="margin-bottom: 20px;">
                    <form onsubmit="handleAddSubject(event)" style="display: flex; gap: 10px;">
                        <input type="text" id="new-subject-input" placeholder="Enter new subject name (e.g. ICT, French)" 
                               required class="search-input" style="padding: 10px 14px; font-size: 14px;">
                        <button type="submit" class="btn-primary" style="width: auto; padding: 10px 18px; white-space: nowrap;">
                            + Add Subject
                        </button>
                    </form>
                </div>

                <div>
                    <h4 style="font-size: 14px; color: var(--navy-900); margin-bottom: 8px;">
                        Current Subjects for ${selectedGrade} (${currentSubjects.length})
                    </h4>
                    <div class="tag-cloud">
                        ${currentSubjects.map(sub => `
                            <div class="tag-item">
                                <span style="display: inline-flex; align-items: center; gap: 5px;">${uiIcon('fileText', 13)} ${sub}</span>
                                <button type="button" class="tag-remove" onclick="handleDeleteSubject('${selectedGrade}', '${escapeQuotes(sub)}')" title="Remove subject">&times;</button>
                            </div>
                        `).join('')}
                        ${currentSubjects.length === 0 ? '<p style="color: var(--text-muted); font-size: 13px;">No subjects added yet for this grade.</p>' : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function changeGradeForSubjects(gradeId) {
    state.admin.selectedGradeForSubjects = gradeId;
    renderAdminCategoriesTab();
}

function openAddGradeModal() {
    const bodyHtml = `
        <form id="add-grade-form" onsubmit="handleAddGrade(event)">
            <div class="auth-form-group">
                <label>Grade Identifier (ID) *</label>
                <input type="text" id="new-grade-id" required placeholder="e.g. Grade8 or UniversityYear1">
                <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Letters and numbers only</p>
            </div>

            <div class="auth-form-group">
                <label>Display Name *</label>
                <input type="text" id="new-grade-name" required placeholder="e.g. Grade 8">
            </div>

            <div class="auth-form-group">
                <label>Card Number Badge</label>
                <input type="text" id="new-grade-number" placeholder="e.g. 08">
            </div>

            <div class="auth-form-group">
                <label>Description</label>
                <input type="text" id="new-grade-desc" placeholder="e.g. Past examinations for Grade 8">
            </div>

            <button type="submit" class="btn-primary">Create Grade Category →</button>
        </form>
    `;
    showModal('Add New Grade Category', bodyHtml);
}

async function handleAddGrade(e) {
    e.preventDefault();
    const id = document.getElementById('new-grade-id').value.trim();
    const name = document.getElementById('new-grade-name').value.trim();
    const number = document.getElementById('new-grade-number').value.trim();
    const description = document.getElementById('new-grade-desc').value.trim();

    try {
        const res = await fetch('/api/categories/grade', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({ id, name, number, description })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            showToast(`Grade ${name} created!`, 'success');
            closeModal();
            await fetchCategories();
            state.admin.selectedGradeForSubjects = data.grade.id;
            loadAdminStats();
            renderAdminCategoriesTab();
        } else {
            showToast(data.message || 'Failed to add grade', 'error');
        }
    } catch (err) {
        showToast('Error adding grade: ' + err.message, 'error');
    }
}

function confirmDeleteGrade(gradeId, gradeName) {
    const bodyHtml = `
        <p>Are you sure you want to delete <strong>${gradeName}</strong>?</p>
        <p style="margin-top: 10px; color: var(--danger); font-size: 13px; display: flex; align-items: center; gap: 6px;">
            ${uiIcon('alertTriangle', 14)} This will also remove all subjects and examination papers associated with ${gradeName}!
        </p>
    `;
    const footerHtml = `
        <button class="btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn-primary" style="background: var(--danger);" onclick="handleDeleteGrade('${gradeId}')">Confirm Delete</button>
    `;
    showModal(`Delete Grade ${gradeName}`, bodyHtml, footerHtml);
}

async function handleDeleteGrade(gradeId) {
    try {
        const res = await fetch(`/api/categories/grade/${gradeId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${state.token}` }
        });
        const data = await res.json();
        if (res.ok && data.success) {
            showToast('Grade deleted successfully', 'success');
            closeModal();
            await fetchCategories();
            state.admin.selectedGradeForSubjects = state.categories.grades[0]?.id || '';
            loadAdminStats();
            renderAdminCategoriesTab();
        } else {
            showToast(data.message || 'Failed to delete grade', 'error');
        }
    } catch (e) {
        showToast('Error deleting grade', 'error');
    }
}

async function handleAddSubject(e) {
    e.preventDefault();
    const input = document.getElementById('new-subject-input');
    const subjectName = input.value.trim();
    const gradeId = state.admin.selectedGradeForSubjects;

    if (!subjectName || !gradeId) return;

    try {
        const res = await fetch('/api/categories/subject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({ gradeId, subjectName })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            showToast(`Subject "${subjectName}" added to ${gradeId}`, 'success');
            input.value = '';
            await fetchCategories();
            loadAdminStats();
            renderAdminCategoriesTab();
        } else {
            showToast(data.message || 'Failed to add subject', 'error');
        }
    } catch (err) {
        showToast('Error: ' + err.message, 'error');
    }
}

async function handleDeleteSubject(gradeId, subjectName) {
    try {
        const res = await fetch('/api/categories/subject', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({ gradeId, subjectName })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            showToast(`Subject "${subjectName}" removed`, 'info');
            await fetchCategories();
            loadAdminStats();
            renderAdminCategoriesTab();
        } else {
            showToast(data.message || 'Failed to remove subject', 'error');
        }
    } catch (e) {
        showToast('Error removing subject', 'error');
    }
}

/* 2B.2: Manage Practice Questions Tab */
async function renderAdminQuestionsTab() {
    const container = document.getElementById('admin-tab-content');
    container.innerHTML = `
        <div class="admin-section">
            <div class="section-top">
                <h3>Interactive Practice Questions</h3>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <select id="admin-q-grade" onchange="filterAdminQuestions()" class="btn-secondary" style="padding: 8px 12px;">
                        <option value="">All Grades</option>
                        ${state.categories.grades.map(g => `<option value="${g.id}">${g.name}</option>`).join('')}
                    </select>

                    <input type="text" id="admin-q-search" oninput="filterAdminQuestions()" 
                           placeholder="Search questions or subject..." 
                           class="btn-secondary" style="padding: 8px 12px; width: 220px;">
                    
                    <button class="btn-primary" onclick="openAddQuestionModal()" style="width: auto; padding: 8px 14px;">
                        + Add Question
                    </button>
                </div>
            </div>

            <div id="admin-questions-table-container">
                <p style="color: var(--text-muted); padding: 20px 0;">Loading questions...</p>
            </div>
        </div>
    `;

    loadAdminQuestionsList();
}

let cachedQuestions = [];

async function loadAdminQuestionsList() {
    const tableContainer = document.getElementById('admin-questions-table-container');
    try {
        const res = await fetch('/api/practice');
        const data = await res.json();
        cachedQuestions = data.questions || [];
        renderQuestionsTable(cachedQuestions);
    } catch (err) {
        tableContainer.innerHTML = `<p style="color: var(--accent-rose);">Failed to load questions: ${err.message}</p>`;
    }
}

function filterAdminQuestions() {
    const grade = document.getElementById('admin-q-grade')?.value || '';
    const qSearch = (document.getElementById('admin-q-search')?.value || '').toLowerCase();

    let filtered = cachedQuestions;
    if (grade) filtered = filtered.filter(q => q.grade === grade);
    if (qSearch) {
        filtered = filtered.filter(q => 
            q.question.toLowerCase().includes(qSearch) || 
            q.subject.toLowerCase().includes(qSearch)
        );
    }
    renderQuestionsTable(filtered);
}

function renderQuestionsTable(questions) {
    const container = document.getElementById('admin-questions-table-container');
    if (!container) return;

    if (questions.length === 0) {
        container.innerHTML = uiEmptyState('target', 'No practice questions found', 'Click "+ Add Question" to create your first interactive multiple-choice question.');
        return;
    }

    const letters = ['A', 'B', 'C', 'D'];

    container.innerHTML = `
        <div class="table-container">
            <table class="custom-table">
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Grade</th>
                        <th>Subject</th>
                        <th>Options</th>
                        <th>Correct</th>
                        <th style="text-align: right;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${questions.map(q => `
                        <tr>
                            <td style="max-width: 320px;">
                                <strong>${q.question}</strong>
                                ${q.explanation ? `<div style="font-size: 12px; color: var(--text-dim); margin-top: 4px; display: flex; align-items: center; gap: 4px;">${uiIcon('lightbulb', 13)} ${q.explanation.substring(0, 70)}...</div>` : ''}
                            </td>
                            <td><span class="badge badge-blue">${q.grade}</span></td>
                            <td><span class="badge badge-green">${q.subject}</span></td>
                            <td>${(q.options || []).length} Options</td>
                            <td><span class="badge badge-amber">${letters[q.correctAnswer] || (q.correctAnswer + 1)}</span></td>
                            <td style="text-align: right;">
                                <button class="btn-icon danger" onclick="confirmDeleteQuestion('${q.id}', '${escapeQuotes(q.question.substring(0, 40))}')" title="Delete Question" style="display: inline-flex; align-items: center; justify-content: center;">
                                    ${uiIcon('trash', 14)}
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function openAddQuestionModal() {
    const grades = state.categories.grades;
    const defaultGrade = grades[0]?.id || 'Grade12';
    const gradeSubjects = state.categories.subjects[defaultGrade] || [];

    const bodyHtml = `
        <form id="add-question-form" onsubmit="handleAddQuestion(event)">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                <div class="auth-form-group">
                    <label>Grade *</label>
                    <select id="new-q-grade" onchange="updateQuestionModalSubjects()" required>
                        ${grades.map(g => `<option value="${g.id}">${g.name}</option>`).join('')}
                    </select>
                </div>

                <div class="auth-form-group">
                    <label>Subject *</label>
                    <select id="new-q-subject" required>
                        ${gradeSubjects.map(s => `<option value="${s}">${s}</option>`).join('')}
                    </select>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                <div class="auth-form-group">
                    <label>Semester</label>
                    <select id="new-q-semester">
                        <option value="Semester1">Semester 1</option>
                        <option value="Semester2">Semester 2</option>
                        <option value="Pretest">Pre-test</option>
                        <option value="Model">Model Exam</option>
                    </select>
                </div>

                <div class="auth-form-group">
                    <label>Exam Type</label>
                    <select id="new-q-examtype">
                        <option value="Final">Final</option>
                        <option value="Mid1">Mid 1</option>
                        <option value="Mid2">Mid 2</option>
                        <option value="Pretest">Pre-test</option>
                        <option value="Model">Model</option>
                    </select>
                </div>
            </div>

            <div class="auth-form-group">
                <label>Question Text *</label>
                <textarea id="new-q-text" required placeholder="Enter the examination question problem statement..." 
                          style="width: 100%; padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-glass); background: rgba(11, 16, 31, 0.7); color: #ffffff; min-height: 80px; font-family: inherit; font-size: 14px;"></textarea>
            </div>

            <div class="auth-form-group">
                <label>Multiple Choice Options *</label>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="width: 25px; font-weight: bold; color: #a5b4fc;">A:</span>
                        <input type="text" id="new-q-opt-0" required placeholder="Option A text">
                        <input type="radio" name="new-q-correct" value="0" checked title="Mark as correct">
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="width: 25px; font-weight: bold; color: #a5b4fc;">B:</span>
                        <input type="text" id="new-q-opt-1" required placeholder="Option B text">
                        <input type="radio" name="new-q-correct" value="1" title="Mark as correct">
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="width: 25px; font-weight: bold; color: #a5b4fc;">C:</span>
                        <input type="text" id="new-q-opt-2" required placeholder="Option C text">
                        <input type="radio" name="new-q-correct" value="2" title="Mark as correct">
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="width: 25px; font-weight: bold; color: #a5b4fc;">D:</span>
                        <input type="text" id="new-q-opt-3" required placeholder="Option D text">
                        <input type="radio" name="new-q-correct" value="3" title="Mark as correct">
                    </div>
                </div>
                <p style="font-size: 12px; color: var(--text-dim); margin-top: 6px;">Select the radio button beside the correct answer.</p>
            </div>

            <div class="auth-form-group">
                <label>Explanation & Solution Hint</label>
                <textarea id="new-q-explanation" placeholder="Provide step-by-step reasoning or formula breakdown shown during review..." 
                          style="width: 100%; padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-glass); background: rgba(11, 16, 31, 0.7); color: #ffffff; min-height: 60px; font-family: inherit; font-size: 13.5px;"></textarea>
            </div>

            <button type="submit" class="btn-primary" id="btn-save-question">
                Save & Publish Practice Question →
            </button>
        </form>
    `;

    showModal('Add Interactive Practice Question', bodyHtml);
}

function updateQuestionModalSubjects() {
    const gradeSelect = document.getElementById('new-q-grade');
    const subSelect = document.getElementById('new-q-subject');
    if (!gradeSelect || !subSelect) return;

    const subjects = state.categories.subjects[gradeSelect.value] || [];
    subSelect.innerHTML = subjects.map(s => `<option value="${s}">${s}</option>`).join('');
}

async function handleAddQuestion(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-save-question');
    btn.disabled = true;
    btn.innerHTML = 'Saving question...';

    const grade = document.getElementById('new-q-grade').value;
    const subject = document.getElementById('new-q-subject').value;
    const semester = document.getElementById('new-q-semester').value;
    const examType = document.getElementById('new-q-examtype').value;
    const question = document.getElementById('new-q-text').value.trim();
    const options = [
        document.getElementById('new-q-opt-0').value.trim(),
        document.getElementById('new-q-opt-1').value.trim(),
        document.getElementById('new-q-opt-2').value.trim(),
        document.getElementById('new-q-opt-3').value.trim()
    ];
    const correctRadio = document.querySelector('input[name="new-q-correct"]:checked');
    const correctAnswer = parseInt(correctRadio ? correctRadio.value : 0);
    const explanation = document.getElementById('new-q-explanation').value.trim();

    try {
        const res = await fetch('/api/practice/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({
                grade, subject, semester, examType, question, options, correctAnswer, explanation, points: 1
            })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            showToast('Practice question added successfully!', 'success');
            closeModal();
            loadAdminStats();
            loadAdminQuestionsList();
        } else {
            showToast(data.message || 'Failed to add question', 'error');
            btn.disabled = false;
            btn.innerHTML = 'Save & Publish Practice Question →';
        }
    } catch (err) {
        showToast('Error saving question: ' + err.message, 'error');
        btn.disabled = false;
        btn.innerHTML = 'Save & Publish Practice Question →';
    }
}

function confirmDeleteQuestion(id, title) {
    const bodyHtml = `
        <p>Are you sure you want to delete this practice question?</p>
        <div style="margin: 14px 0; padding: 12px; background: rgba(239, 68, 68, 0.2); border-radius: 8px; color: #fca5a5; font-size: 14px;">
            ${title}...
        </div>
    `;
    const footerHtml = `
        <button class="btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn-primary" style="background: var(--accent-rose);" onclick="deleteQuestion('${id}')">Yes, Delete Question</button>
    `;
    showModal('Delete Question', bodyHtml, footerHtml);
}

async function deleteQuestion(id) {
    try {
        const res = await fetch(`/api/practice/questions/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${state.token}` }
        });
        const data = await res.json();
        if (res.ok && data.success) {
            showToast('Question deleted', 'success');
            closeModal();
            loadAdminStats();
            loadAdminQuestionsList();
        } else {
            showToast(data.message || 'Delete failed', 'error');
        }
    } catch (e) {
        showToast('Error deleting question', 'error');
    }
}

/* 2C: System Overview Tab */
function renderAdminOverviewTab() {
    const container = document.getElementById('admin-tab-content');
    container.innerHTML = `
        <div class="admin-section">
            <h3 style="margin-bottom: 14px;">System Architecture & Features</h3>
            <div style="color: var(--text-muted); line-height: 1.8; font-size: 14px;">
                <p><strong>Past Exam Library Portal</strong> provides a full-stack educational resource environment:</p>
                <ul style="margin: 12px 0 16px 20px;">
                    <li><strong>Authentication & Authorization:</strong> JWT-secured tokens, role-based access for Students and Administrators.</li>
                    <li><strong>Category Architecture:</strong> Dynamic management of Grades, Semesters, Exam Types (Midterms, Finals, Pre-tests, Model exams), and Subjects.</li>
                    <li><strong>Paper Uploads:</strong> Multer storage handling PDF exam uploads up to 50MB with instant serving and database indexation.</li>
                    <li><strong>Instant Search:</strong> Cross-curriculum search allowing students to find exam papers by keyword, subject, year, or grade in milliseconds.</li>
                </ul>

                <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-top: 20px;">
                    <h4 style="color: var(--navy-900); margin-bottom: 6px;">Need to switch back to student view?</h4>
                    <p style="margin-bottom: 12px;">You can browse the library exactly as students experience it at any time.</p>
                    <button class="btn-primary" style="width: auto; padding: 8px 16px;" onclick="setView('library')">
                        Open Student Library View →
                    </button>
                </div>
            </div>
        </div>
    `;
}

/* ========================================================
   2D: STUDENT ACTIVITY & AUDIT LOGS TAB (REAL-TIME LIVE SYNC)
======================================================== */
let cachedActivityLogs = [];
let activitySearchTimeout = null;
let activityPollTimer = null;
let lastActivityLogsSignature = '';
let activityChannel = null;

try {
    if ('BroadcastChannel' in window) {
        activityChannel = new BroadcastChannel('pel_activity_sync');
        activityChannel.onmessage = (event) => {
            if (event.data && event.data.type === 'activity_updated') {
                if (state.currentView === 'admin' && state.admin.activeTab === 'activity') {
                    loadActivityStatsAndLogs(true);
                }
            }
        };
    }
} catch (_) {}

function startActivityPolling() {
    stopActivityPolling();
    // High-frequency 3-second auto-sync for live student activity
    activityPollTimer = setInterval(() => {
        if (document.visibilityState === 'visible' && state.currentView === 'admin' && state.admin.activeTab === 'activity') {
            loadActivityStatsAndLogs(true);
        }
    }, 3000);
}

function stopActivityPolling() {
    if (activityPollTimer) {
        clearInterval(activityPollTimer);
        activityPollTimer = null;
    }
}

// Instant re-sync when browser tab regains focus
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && state.currentView === 'admin' && state.admin.activeTab === 'activity') {
        loadActivityStatsAndLogs(true);
    }
});
window.addEventListener('focus', () => {
    if (state.currentView === 'admin' && state.admin.activeTab === 'activity') {
        loadActivityStatsAndLogs(true);
    }
});

function renderAdminActivityTab() {
    const container = document.getElementById('admin-tab-content');
    const f = state.admin.activityFilter;

    container.innerHTML = `
        <div class="admin-section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
                <div>
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px; flex-wrap: wrap;">
                        <h3 style="font-size: 20px; color: #ffffff; margin: 0;">Student Activity & Audit Logs</h3>
                        <span class="live-pill" id="activity-live-indicator"><span class="live-dot pulse"></span> Live (Auto-sync 3s)</span>
                    </div>
                    <p style="color: var(--text-muted); font-size: 14px; margin: 0;">
                        Live real-time feed tracking student logins, exam paper PDF downloads, and interactive practice scores.
                    </p>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <button id="btn-refresh-feed" class="btn-secondary" style="padding: 8px 16px; font-size: 13px; display: inline-flex; align-items: center; gap: 7px;" onclick="manualRefreshActivityFeed()">
                        <span id="refresh-icon-spin">${uiIcon('refresh', 14)}</span> Refresh Feed
                    </button>
                    <button class="btn-secondary" style="padding: 8px 16px; font-size: 13px; display: inline-flex; align-items: center; gap: 7px;" onclick="exportActivityLogsCsv()">
                        ${uiIcon('export', 14)} Export CSV
                    </button>
                </div>
            </div>

            <!-- Live KPI Metric Cards -->
            <div id="activity-metrics-container" class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); margin-bottom: 24px;">
                <div class="stat-card" style="border-left: 4px solid #3b82f6;">
                    <div class="stat-icon" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa;">${uiIcon('key', 22)}</div>
                    <div>
                        <div class="stat-value" id="act-metric-logins">...</div>
                        <div class="stat-label">Total Student Logins</div>
                    </div>
                </div>
                <div class="stat-card" style="border-left: 4px solid #10b981;">
                    <div class="stat-icon" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">${uiIcon('download', 22)}</div>
                    <div>
                        <div class="stat-value" id="act-metric-downloads">...</div>
                        <div class="stat-label">PDF Papers Downloaded</div>
                    </div>
                </div>
                <div class="stat-card" style="border-left: 4px solid #8b5cf6;">
                    <div class="stat-icon" style="background: rgba(139, 92, 246, 0.15); color: #c084fc;">${uiIcon('target', 22)}</div>
                    <div>
                        <div class="stat-value" id="act-metric-practices">...</div>
                        <div class="stat-label">Practice Tests Taken</div>
                    </div>
                </div>
                <div class="stat-card" style="border-left: 4px solid #f59e0b;">
                    <div class="stat-icon" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24;">${uiIcon('trendingUp', 22)}</div>
                    <div>
                        <div class="stat-value" id="act-metric-avgscore">...</div>
                        <div class="stat-label">Average Practice Score</div>
                    </div>
                </div>
            </div>

            <!-- Filter Controls -->
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-glass); border-radius: 12px; padding: 14px 18px; margin-bottom: 20px; display: flex; gap: 14px; flex-wrap: wrap; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 220px;">
                    <span style="font-size: 13.5px; color: var(--text-muted); font-weight: 600;">Activity:</span>
                    <select id="activity-filter-type" class="admin-select" style="margin: 0; padding: 8px 12px; width: 100%;" onchange="handleActivityFilterChange()">
                        <option value="all" ${f.type === 'all' ? 'selected' : ''}>All Events (Logins, Downloads, Practice)</option>
                        <option value="login" ${f.type === 'login' ? 'selected' : ''}>Logins Only</option>
                        <option value="download" ${f.type === 'download' ? 'selected' : ''}>PDF Downloads Only</option>
                        <option value="practice" ${f.type === 'practice' ? 'selected' : ''}>Practice Tests Only</option>
                    </select>
                </div>

                <div style="display: flex; align-items: center; gap: 8px; min-width: 170px;">
                    <span style="font-size: 13.5px; color: var(--text-muted); font-weight: 600;">Grade:</span>
                    <select id="activity-filter-grade" class="admin-select" style="margin: 0; padding: 8px 12px; width: 100%;" onchange="handleActivityFilterChange()">
                        <option value="all" ${f.grade === 'all' ? 'selected' : ''}>All Grades</option>
                        <option value="Grade9" ${f.grade === 'Grade9' ? 'selected' : ''}>Grade 9</option>
                        <option value="Grade10" ${f.grade === 'Grade10' ? 'selected' : ''}>Grade 10</option>
                        <option value="Grade11" ${f.grade === 'Grade11' ? 'selected' : ''}>Grade 11</option>
                        <option value="Grade12" ${f.grade === 'Grade12' ? 'selected' : ''}>Grade 12</option>
                    </select>
                </div>

                <div style="flex: 2; min-width: 240px;">
                    <input type="text" id="activity-filter-search" class="admin-input" style="margin: 0; padding: 8px 14px; width: 100%;" 
                           placeholder="Search registered student name, username, paper, or subject..." value="${escapeQuotes(f.search)}" oninput="debounceActivitySearch()">
                </div>
            </div>

            <!-- Table Container -->
            <div id="activity-table-container">
                <p style="color: var(--text-muted); padding: 24px 0; text-align: center;">Loading activity records...</p>
            </div>
        </div>
    `;

    lastActivityLogsSignature = '';
    loadActivityStatsAndLogs();
    startActivityPolling();
}

async function manualRefreshActivityFeed() {
    const iconSpan = document.getElementById('refresh-icon-spin');
    if (iconSpan) iconSpan.classList.add('spin-icon');
    await loadActivityStatsAndLogs(false);
    setTimeout(() => {
        if (iconSpan) iconSpan.classList.remove('spin-icon');
    }, 600);
}

function updateMetricWithAnimation(elemId, newVal) {
    const el = document.getElementById(elemId);
    if (!el) return;
    const strVal = String(newVal);
    if (el.textContent !== '...' && el.textContent !== strVal) {
        el.textContent = strVal;
        el.classList.remove('stat-value-updated');
        void el.offsetWidth;
        el.classList.add('stat-value-updated');
    } else if (el.textContent === '...') {
        el.textContent = strVal;
    }
}

async function loadActivityStatsAndLogs(isSilent = false) {
    // 1. Fetch Stats
    try {
        const statsRes = await fetch('/api/activity/stats', {
            headers: { 'Authorization': `Bearer ${state.token}` }
        });
        if (statsRes.ok) {
            const data = await statsRes.json();
            const s = data.stats;
            updateMetricWithAnimation('act-metric-logins', s.totalLogins);
            updateMetricWithAnimation('act-metric-downloads', s.totalDownloads);
            updateMetricWithAnimation('act-metric-practices', s.totalPractices);
            updateMetricWithAnimation('act-metric-avgscore', `${s.avgScore}%`);
        }
    } catch (e) {
        console.warn('Failed loading activity stats', e);
    }

    // 2. Fetch Logs with Filters
    const f = state.admin.activityFilter;
    const tableContainer = document.getElementById('activity-table-container');
    if (!tableContainer) return;

    try {
        let url = `/api/activity/logs?limit=200`;
        if (f.type && f.type !== 'all') url += `&type=${encodeURIComponent(f.type)}`;
        if (f.grade && f.grade !== 'all') url += `&grade=${encodeURIComponent(f.grade)}`;
        if (f.search) url += `&search=${encodeURIComponent(f.search)}`;

        const logsRes = await fetch(url, {
            headers: { 'Authorization': `Bearer ${state.token}` }
        });
        const data = await logsRes.json();
        cachedActivityLogs = data.logs || [];

        // Check signature: only re-render DOM table if log events actually changed
        const newSig = cachedActivityLogs.map(l => `${l.id}_${l.timestamp}`).join('|');
        if (newSig !== lastActivityLogsSignature || !isSilent) {
            lastActivityLogsSignature = newSig;
            renderActivityTable(cachedActivityLogs);
        }

        if (!isSilent) {
            showToast('Activity feed updated (Latest live data)', 'info');
        }
    } catch (err) {
        if (!isSilent) {
            tableContainer.innerHTML = `<p style="color: var(--accent-rose); padding: 20px 0;">Failed to load activity logs: ${err.message}</p>`;
        }
    }
}

function renderActivityTable(logs) {
    const container = document.getElementById('activity-table-container');
    if (!container) return;

    if (logs.length === 0) {
        container.innerHTML = uiEmptyState('clipboard', 'No activity logs found', 'No matching records found for the selected filters. Activity will appear here when students sign in, download papers, or take practice exams.');
        return;
    }

    container.innerHTML = `
        <div style="overflow-x: auto;">
            <table class="custom-table" style="width: 100%;">
                <thead>
                    <tr>
                        <th style="width: 130px;">Time</th>
                        <th style="width: 150px;">Student / User</th>
                        <th style="width: 130px;">Action</th>
                        <th>Details & Exam Information</th>
                        <th style="width: 150px;">Device / IP</th>
                    </tr>
                </thead>
                <tbody>
                    ${logs.map(log => {
                        const timeStr = formatRelativeTime(log.timestamp);
                        const fullDateStr = new Date(log.timestamp).toLocaleString();
                        const displayName = log.fullName || log.username || 'Student';
                        const initial = displayName.trim().charAt(0).toUpperCase() || 'S';

                        let actionBadge = '';
                        if (log.type === 'login') {
                            actionBadge = `<span class="act-badge act-badge-login">${uiIcon('key', 12)} Login</span>`;
                        } else if (log.type === 'download') {
                            actionBadge = `<span class="act-badge act-badge-download">${uiIcon('download', 12)} Download</span>`;
                        } else if (log.type === 'preview') {
                            actionBadge = `<span class="act-badge act-badge-preview">${uiIcon('eye', 12)} Preview</span>`;
                        } else if (log.type === 'practice') {
                            actionBadge = `<span class="act-badge act-badge-practice">${uiIcon('target', 12)} Practice</span>`;
                        }

                        let detailsHtml = '';
                        if (log.type === 'practice') {
                            const scoreClass = (log.percentage >= 75) ? 'high' : ((log.percentage >= 50) ? 'med' : 'low');
                            detailsHtml = `
                                <div>
                                    <div style="font-weight: 700; color: #ffffff; font-size: 14px; margin-bottom: 4px;">
                                        ${log.examTitle || `${log.grade || ''} ${log.subject || ''}`}
                                    </div>
                                    <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                                        <span class="score-badge ${scoreClass}">
                                            Score: ${log.score !== null ? log.score : '-'}/${log.totalQuestions || '-'} (${log.percentage !== null ? `${log.percentage}%` : '-'})
                                        </span>
                                        <span style="font-size: 12px; color: var(--text-muted); display: inline-flex; align-items: center; gap: 4px;">
                                            ${log.mode === 'timed' ? `${uiIcon('clock', 12)} Timed Mode` : `${uiIcon('bolt', 12)} Instant Practice`}
                                        </span>
                                        ${log.durationSeconds ? `<span style="font-size: 12px; color: var(--text-muted);">• ${formatTime(log.durationSeconds)}</span>` : ''}
                                    </div>
                                </div>
                            `;
                        } else if (log.type === 'download' || log.type === 'preview') {
                            detailsHtml = `
                                <div>
                                    <div style="font-weight: 700; color: #ffffff; font-size: 14px; margin-bottom: 2px;">
                                        ${log.examTitle || log.filePath || 'Exam Document PDF'}
                                    </div>
                                    <div style="font-size: 12.5px; color: var(--text-muted);">
                                        ${log.grade ? `${log.grade} • ` : ''}${log.subject ? `${log.subject} • ` : ''}${log.details || 'Official PDF past paper'}
                                    </div>
                                </div>
                            `;
                        } else {
                            detailsHtml = `
                                <div>
                                    <div style="color: #ffffff; font-weight: 600; font-size: 13.5px;">User signed in successfully</div>
                                    <div style="font-size: 12px; color: var(--text-muted);">${log.details || ''}</div>
                                </div>
                            `;
                        }

                        return `
                            <tr>
                                <td style="font-size: 12.5px; color: var(--text-muted); white-space: nowrap;" title="${fullDateStr}">
                                    ${timeStr}
                                </td>
                                <td>
                                    <div class="activity-user-cell">
                                        <div class="activity-user-avatar" title="${escapeQuotes(displayName)}">${initial}</div>
                                        <div>
                                            <div style="font-weight: 700; color: #ffffff; font-size: 13.5px;" title="${log.username ? `@${log.username}` : ''}">
                                                ${escapeQuotes(displayName)}
                                            </div>
                                            <div style="display: flex; gap: 6px; align-items: center; margin-top: 2px;">
                                                ${log.username && log.username !== displayName ? `<span style="font-size: 11px; color: var(--text-muted);">@${escapeQuotes(log.username)}</span>` : ''}
                                                <span class="role-pill ${log.role === 'admin' ? 'admin' : ''}" style="font-size: 9.5px; padding: 1px 6px;">${log.role === 'admin' ? 'Admin' : 'Student'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>${actionBadge}</td>
                                <td>${detailsHtml}</td>
                                <td style="font-size: 12px; color: var(--text-muted); font-family: monospace;">
                                    ${log.ip ? `<div>${log.ip}</div>` : ''}
                                    <div style="font-size: 11px; opacity: 0.8;">${formatUserAgent(log.userAgent)}</div>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
        <div style="margin-top: 14px; font-size: 12.5px; color: var(--text-muted); display: flex; justify-content: space-between;">
            <span>Showing ${logs.length} most recent activities</span>
            <span>Refreshed live from system logs</span>
        </div>
    `;
}

function handleActivityFilterChange() {
    state.admin.activityFilter.type = document.getElementById('activity-filter-type').value;
    state.admin.activityFilter.grade = document.getElementById('activity-filter-grade').value;
    loadActivityStatsAndLogs();
}

function debounceActivitySearch() {
    clearTimeout(activitySearchTimeout);
    activitySearchTimeout = setTimeout(() => {
        state.admin.activityFilter.search = document.getElementById('activity-filter-search').value.trim();
        loadActivityStatsAndLogs();
    }, 250);
}

function exportActivityLogsCsv() {
    if (!cachedActivityLogs || cachedActivityLogs.length === 0) {
        showToast('No activity records available to export', 'info');
        return;
    }

    const headers = ['Timestamp', 'Username', 'Role', 'Action Type', 'Grade', 'Subject', 'Exam Title', 'Score', 'Total Questions', 'Percentage', 'Duration Seconds', 'IP Address'];
    const rows = cachedActivityLogs.map(l => [
        `"${l.timestamp || ''}"`,
        `"${l.username || ''}"`,
        `"${l.role || ''}"`,
        `"${l.type || ''}"`,
        `"${l.grade || ''}"`,
        `"${l.subject || ''}"`,
        `"${(l.examTitle || '').replace(/"/g, '""')}"`,
        `"${l.score !== null ? l.score : ''}"`,
        `"${l.totalQuestions !== null ? l.totalQuestions : ''}"`,
        `"${l.percentage !== null ? l.percentage : ''}"`,
        `"${l.durationSeconds !== null ? l.durationSeconds : ''}"`,
        `"${l.ip || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `school_past_exam_activity_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Activity logs exported to CSV successfully!', 'success');
}

function formatRelativeTime(isoString) {
    if (!isoString) return 'Just now';
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 45) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 7) return `${diffDay}d ago`;
    return new Date(isoString).toLocaleDateString();
}

function formatUserAgent(ua) {
    if (!ua) return `<span style="display: inline-flex; align-items: center; gap: 4px;">${uiIcon('monitor', 12)} Web</span>`;
    if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) {
        return `<span style="display: inline-flex; align-items: center; gap: 4px;">${uiIcon('smartphone', 12)} Mobile</span>`;
    }
    if (ua.includes('Chrome')) return `<span style="display: inline-flex; align-items: center; gap: 4px;">${uiIcon('monitor', 12)} Chrome</span>`;
    if (ua.includes('Firefox')) return `<span style="display: inline-flex; align-items: center; gap: 4px;">${uiIcon('monitor', 12)} Firefox</span>`;
    if (ua.includes('Safari')) return `<span style="display: inline-flex; align-items: center; gap: 4px;">${uiIcon('monitor', 12)} Safari</span>`;
    if (ua.includes('Edge')) return `<span style="display: inline-flex; align-items: center; gap: 4px;">${uiIcon('monitor', 12)} Edge</span>`;
    return `<span style="display: inline-flex; align-items: center; gap: 4px;">${uiIcon('monitor', 12)} Desktop</span>`;
}

/* ========================================================
   3. STUDENT / PUBLIC LIBRARY VIEW
======================================================== */

function showLibraryHome(pushHistory = true) {
    if (pushHistory) {
        pushNavState({ view: 'library' }, 'Past Exam Library');
    }
    state.library.grade = null;
    state.library.semester = null;
    state.library.examType = null;
    state.library.subject = null;
    state.library.examDoc = null;

    const grades = state.categories.grades;

    app.innerHTML = `
        <section class="hero">
            <p class="label">A student-run archive</p>
            <h1>
                A good place to<br>
                <span>start studying.</span>
            </h1>
            <p class="description">
                Browse past papers by grade, semester and subject, and get straight to studying.
            </p>
        </section>

        <!-- Search Bar -->
        <div class="search-container">
            <div class="search-input-wrapper">
                <span class="search-icon" aria-hidden="true"></span>
                <input type="text" id="library-search" class="search-input" 
                       placeholder="Search any exam paper (e.g. Mathematics, Biology, Final, Pre-test)..."
                       oninput="handleLibrarySearch(this.value)">
            </div>
        </div>

        <!-- Live Exam Countdown Widget -->
        ${renderCountdownWidgetHtml()}

        <!-- Quick Study Shortcuts Toolbar -->
        <div style="display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap;">
            <button class="btn-secondary" style="padding: 10px 16px; font-size: 13.5px; display: inline-flex; align-items: center; gap: 8px;" onclick="setView('formulas')">
                ${uiIcon('calculator', 15)} Formula Sheets & Summaries
            </button>
            <button class="btn-secondary" style="padding: 10px 16px; font-size: 13.5px; display: inline-flex; align-items: center; gap: 8px;" onclick="setView('studyhub')">
                ${uiIcon('bookmark', 15)} My Study Hub & Bookmarks
            </button>
            <button class="btn-secondary" style="padding: 10px 16px; font-size: 13.5px; display: inline-flex; align-items: center; gap: 8px;" onclick="showPracticeGradeCatalog()">
                ${uiIcon('target', 15)} Authentic Practice Question Bank
            </button>
        </div>

        <div id="library-content-container">
            <div class="page-title">
                <h2>Select your grade</h2>
                <p>Choose a grade to browse its past examinations.</p>
            </div>

            <div class="card-grid">
                ${grades.map(g => `
                    <div class="card" onclick="showGrade('${g.id}')">
                        <div class="card-number">${g.number || g.id.replace(/\D/g, '') || '00'}</div>
                        <div class="card-info">
                            <h3>${g.name}</h3>
                            <p>${g.description || 'Past examinations'}</p>
                        </div>
                        <div class="arrow">→</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    startCountdownLiveTimer();
}

async function showPracticeGradeCatalog(pushHistory = true) {
    if (pushHistory) {
        pushNavState({ view: 'practiceGradeCatalog' }, 'Practice Question Bank');
    }
    const grades = state.categories.grades || [];
    let countsByGrade = {};
    try {
        const response = await fetch('/api/practice');
        const data = await response.json();
        (data.questions || []).forEach(question => {
            countsByGrade[question.grade] = (countsByGrade[question.grade] || 0) + 1;
        });
    } catch (error) {
        console.warn('Could not load practice question counts online, checking offline cache', error);
    }

    if (Object.keys(countsByGrade).length === 0) {
        try {
            const raw = localStorage.getItem('pel_offline_questions');
            if (raw) {
                const questions = JSON.parse(raw);
                questions.forEach(q => {
                    countsByGrade[q.grade] = (countsByGrade[q.grade] || 0) + 1;
                });
            }
        } catch (e) {}
    }

    app.innerHTML = `
        <div class="nav-breadcrumbs-bar">
            <button class="back-button back-button-home" onclick="showLibraryHome()" style="margin: 0; display: inline-flex; align-items: center; gap: 6px;" title="Go back to the website home page where you choose your grade">
                ${uiIcon('home', 14)} Back to Grades (Home)
            </button>
            <div class="breadcrumb-trail">
                <span class="clickable" onclick="showLibraryHome()">Grades</span>
                <span>/</span>
                <span class="current">Practice Bank</span>
            </div>
        </div>

        <div class="page-title">
            <h2>Practice question bank</h2>
            <p>Choose a grade, then a subject to practice questions from that category.</p>
        </div>
        <div class="card-grid">
            ${grades.map(grade => `
                <button class="card" style="text-align: left; color: inherit; font: inherit;" onclick="showPracticeSubjectCatalog('${grade.id}')">
                    <div class="card-number">${grade.number || grade.id.replace(/\D/g, '') || '00'}</div>
                    <div class="card-info">
                        <h3>${grade.name}</h3>
                        <p>${countsByGrade[grade.id] || 0} practice questions</p>
                    </div>
                    <div class="arrow">→</div>
                </button>
            `).join('')}
        </div>
    `;
}

async function showPracticeSubjectCatalog(gradeId, pushHistory = true) {
    if (pushHistory) {
        pushNavState({ view: 'practiceSubjectCatalog', gradeId }, `${gradeId} Practice Bank`);
    }
    const grade = (state.categories.grades || []).find(item => item.id === gradeId);
    const subjects = (state.categories.subjects || {})[gradeId] || [];
    let countsBySubject = {};
    try {
        const response = await fetch(`/api/practice?grade=${encodeURIComponent(gradeId)}`);
        const data = await response.json();
        (data.questions || []).forEach(question => {
            countsBySubject[question.subject] = (countsBySubject[question.subject] || 0) + 1;
        });
    } catch (error) {
        console.warn('Could not load subject practice question counts online, checking offline cache', error);
    }

    if (Object.keys(countsBySubject).length === 0) {
        try {
            const raw = localStorage.getItem('pel_offline_questions');
            if (raw) {
                const questions = JSON.parse(raw);
                questions.filter(q => q.grade === gradeId).forEach(q => {
                    countsBySubject[q.subject] = (countsBySubject[q.subject] || 0) + 1;
                });
            }
        } catch (e) {}
    }

    app.innerHTML = `
        <div class="nav-breadcrumbs-bar">
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <button class="back-button back-button-home" onclick="showLibraryHome()" style="margin: 0; display: inline-flex; align-items: center; gap: 6px;" title="Go back to the website home page where you choose your grade">
                    ${uiIcon('home', 14)} Back to Grades (Home)
                </button>
                <button class="back-button" onclick="showPracticeGradeCatalog()" style="margin: 0;">
                    ← Back to practice grades
                </button>
            </div>
            <div class="breadcrumb-trail">
                <span class="clickable" onclick="showLibraryHome()">Grades</span>
                <span>/</span>
                <span class="clickable" onclick="showPracticeGradeCatalog()">Practice</span>
                <span>/</span>
                <span class="current">${grade ? grade.name : gradeId}</span>
            </div>
        </div>

        <div class="page-title">
            <h2>${grade ? grade.name : gradeId} practice</h2>
            <p>Select a subject to practice authentic school examination questions.</p>
        </div>
        <div class="card-grid">
            ${subjects.map(subject => {
                const count = countsBySubject[subject] || 0;
                return `
                    <button class="card subject-card" style="text-align: left; color: inherit; font: inherit; ${count ? '' : 'opacity: .55;'}" ${count ? `onclick="startPracticeSession('${gradeId}', 'Practice Bank', 'All', '${escapeQuotes(subject)}', 'practice', '${escapeQuotes(`${grade ? grade.name : gradeId} ${subject} Practice`)}', '', () => showPracticeSubjectCatalog('${gradeId}'))"` : 'disabled'}>
                        <div class="subject-icon" style="color: #c084fc;">${uiIcon('target', 20)}</div>
                        <div class="card-info">
                            <h3>${subject}</h3>
                            <p>${count > 0 ? `${count} authentic questions` : 'In transcription (PDF available)'}</p>
                        </div>
                        <div class="arrow">${count ? '→' : '—'}</div>
                    </button>
                `;
            }).join('')}
        </div>
    `;
}

async function handleLibrarySearch(query) {
    const trimmed = query.trim();
    const container = document.getElementById('library-content-container');
    if (!container) return;

    if (!trimmed) {
        // Restore standard grade selection
        showLibraryHome();
        return;
    }

    container.innerHTML = `<p style="color: var(--text-muted); padding: 20px 0;">Searching exam papers...</p>`;

    try {
        const res = await fetch(`/api/exams?search=${encodeURIComponent(trimmed)}`);
        const data = await res.json();
        const results = data.exams || [];

        if (results.length === 0) {
            container.innerHTML = uiEmptyState('search', `No examination papers found for "${escapeQuotes(trimmed)}"`, 'Try searching for a different subject, grade or exam title.');
            return;
        }

        container.innerHTML = `
            <div class="page-title">
                <h2>Search Results (${results.length})</h2>
                <p>Matching examination papers for "${trimmed}":</p>
            </div>

            <div class="card-grid">
                ${results.map(exam => `
                    <div class="card subject-card" onclick="openExamById('${exam.id}')">
                        <div class="subject-icon" style="color: #818cf8;">${uiIcon('fileText', 20)}</div>
                        <div class="card-info">
                            <h3>${exam.title}</h3>
                            <p>${exam.grade} • ${exam.semester} • ${exam.subject}</p>
                        </div>
                        <div class="arrow">→</div>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (e) {
        container.innerHTML = `<p style="color: var(--danger);">Search error: ${e.message}</p>`;
    }
}

function showGrade(gradeId, pushHistory = true) {
    state.library.grade = gradeId;
    const gradeObj = state.categories.grades.find(g => g.id === gradeId);
    const gradeName = gradeObj ? gradeObj.name : gradeId;

    if (pushHistory) {
        pushNavState({ view: 'grade', gradeId }, `${gradeName} - Exam Library`);
    }

    let specialCards = '';
    if (gradeId === 'Grade12') {
        specialCards = `
            <div class="card" onclick="showNationalExamCategory('Pretest')">
                <div class="card-number">P</div>
                <div class="card-info">
                    <h3>Pre-test</h3>
                    <p>Grade 12 pre-test</p>
                </div>
                <div class="arrow">→</div>
            </div>

            <div class="card" onclick="showNationalExamCategory('Model')">
                <div class="card-number">M</div>
                <div class="card-info">
                    <h3>Model Exam</h3>
                    <p>Grade 12 model examination</p>
                </div>
                <div class="arrow">→</div>
            </div>
        `;
    }

    app.innerHTML = `
        <div class="nav-breadcrumbs-bar">
            <button class="back-button back-button-home" onclick="showLibraryHome()" style="margin: 0; display: inline-flex; align-items: center; gap: 6px;" title="Go back to the website home page where you choose your grade">
                ${uiIcon('home', 14)} Back to Grades (Home)
            </button>
            <div class="breadcrumb-trail">
                <span class="clickable" onclick="showLibraryHome()">Grades</span>
                <span>/</span>
                <span class="current">${gradeName}</span>
            </div>
        </div>

        <div class="page-title">
            <h2>${gradeName}</h2>
            <p>Choose a semester or exam category.</p>
        </div>

        <div class="card-grid">
            <div class="card" onclick="showSemester('${gradeId}', 'Semester1')">
                <div class="card-number">01</div>
                <div class="card-info">
                    <h3>Semester 1</h3>
                    <p>Mid 1, Mid 2 and Final</p>
                </div>
                <div class="arrow">→</div>
            </div>

            <div class="card" onclick="showSemester('${gradeId}', 'Semester2')">
                <div class="card-number">02</div>
                <div class="card-info">
                    <h3>Semester 2</h3>
                    <p>Mid 1, Mid 2 and Final</p>
                </div>
                <div class="arrow">→</div>
            </div>

            ${specialCards}
        </div>
    `;
}

function showSemester(gradeId, semester, pushHistory = true) {
    state.library.semester = semester;
    if (pushHistory) {
        pushNavState({ view: 'semester', gradeId, semester }, `${gradeId} ${semester}`);
    }

    app.innerHTML = `
        <div class="nav-breadcrumbs-bar">
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <button class="back-button back-button-home" onclick="showLibraryHome()" style="margin: 0; display: inline-flex; align-items: center; gap: 6px;" title="Go back to the website home page where you choose your grade">
                    ${uiIcon('home', 14)} Back to Grades (Home)
                </button>
                <button class="back-button" onclick="showGrade('${gradeId}')" style="margin: 0;">
                    ← Back to ${gradeId}
                </button>
            </div>
            <div class="breadcrumb-trail">
                <span class="clickable" onclick="showLibraryHome()">Grades</span>
                <span>/</span>
                <span class="clickable" onclick="showGrade('${gradeId}')">${gradeId}</span>
                <span>/</span>
                <span class="current">${semester}</span>
            </div>
        </div>

        <div class="page-title">
            <h2>${semester}</h2>
            <p>${gradeId}</p>
        </div>

        <div class="card-grid">
            <div class="card" onclick="showExamType('${gradeId}', '${semester}', 'Mid1')">
                <div class="card-number">M1</div>
                <div class="card-info">
                    <h3>Mid 1</h3>
                    <p>First midterm</p>
                </div>
                <div class="arrow">→</div>
            </div>

            <div class="card" onclick="showExamType('${gradeId}', '${semester}', 'Mid2')">
                <div class="card-number">M2</div>
                <div class="card-info">
                    <h3>Mid 2</h3>
                    <p>Second midterm</p>
                </div>
                <div class="arrow">→</div>
            </div>

            <div class="card" onclick="showExamType('${gradeId}', '${semester}', 'Final')">
                <div class="card-number">F</div>
                <div class="card-info">
                    <h3>Final</h3>
                    <p>Final examination</p>
                </div>
                <div class="arrow">→</div>
            </div>
        </div>
    `;
}

function showExamType(gradeId, semester, examType, pushHistory = true) {
    state.library.examType = examType;
    if (pushHistory) {
        pushNavState({ view: 'examType', gradeId, semester, examType }, `${gradeId} ${semester} ${examType}`);
    }
    const subjects = state.categories.subjects[gradeId] || [];

    app.innerHTML = `
        <div class="nav-breadcrumbs-bar">
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <button class="back-button back-button-home" onclick="showLibraryHome()" style="margin: 0; display: inline-flex; align-items: center; gap: 6px;" title="Go back to the website home page where you choose your grade">
                    ${uiIcon('home', 14)} Back to Grades (Home)
                </button>
                <button class="back-button" onclick="showSemester('${gradeId}', '${semester}')" style="margin: 0;">
                    ← Back to ${semester}
                </button>
            </div>
            <div class="breadcrumb-trail">
                <span class="clickable" onclick="showLibraryHome()">Grades</span>
                <span>/</span>
                <span class="clickable" onclick="showGrade('${gradeId}')">${gradeId}</span>
                <span>/</span>
                <span class="clickable" onclick="showSemester('${gradeId}', '${semester}')">${semester}</span>
                <span>/</span>
                <span class="current">${examType}</span>
            </div>
        </div>

        <div class="page-title">
            <h2>${examType}</h2>
            <p>${gradeId} • ${semester}</p>
        </div>

        <div class="card-grid">
            ${subjects.map(subject => `
                <div class="card subject-card" onclick="openSubjectExam('${gradeId}', '${semester}', '${examType}', '${escapeQuotes(subject)}')">
                    <div class="subject-icon" style="color: #818cf8;">${uiIcon('fileText', 20)}</div>
                    <div class="card-info">
                        <h3>${subject}</h3>
                        <p>View exam paper</p>
                    </div>
                    <div class="arrow">→</div>
                </div>
            `).join('')}
            ${subjects.length === 0 ? '<p style="color: var(--text-muted);">No subjects found for this category.</p>' : ''}
        </div>
    `;
}

function showNationalExamCategory(category, pushHistory = true) {
    if (pushHistory) {
        pushNavState({ view: 'national', category }, `Grade 12 ${category}`);
    }
    const subjects = state.categories.grade12NationalSubjects || [
        "English", "Mathematics", "Aptitude", "Physics", "Chemistry", "Biology"
    ];

    app.innerHTML = `
        <div class="nav-breadcrumbs-bar">
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <button class="back-button back-button-home" onclick="showLibraryHome()" style="margin: 0; display: inline-flex; align-items: center; gap: 6px;" title="Go back to the website home page where you choose your grade">
                    ${uiIcon('home', 14)} Back to Grades (Home)
                </button>
                <button class="back-button" onclick="showGrade('Grade12')" style="margin: 0;">
                    ← Back to Grade 12
                </button>
            </div>
            <div class="breadcrumb-trail">
                <span class="clickable" onclick="showLibraryHome()">Grades</span>
                <span>/</span>
                <span class="clickable" onclick="showGrade('Grade12')">Grade 12</span>
                <span>/</span>
                <span class="current">${category === 'Pretest' ? 'Pre-test' : 'Model Exam'}</span>
            </div>
        </div>

        <div class="page-title">
            <h2>${category === 'Pretest' ? 'Pre-test' : 'Model Exam'}</h2>
            <p>Grade 12 National Assessment</p>
        </div>

        <div class="card-grid">
            ${subjects.map(subject => `
                <div class="card subject-card" onclick="openSubjectExam('Grade12', '${category}', '${category}', '${escapeQuotes(subject)}')">
                    <div class="subject-icon" style="color: #818cf8;">${uiIcon('fileText', 20)}</div>
                    <div class="card-info">
                        <h3>${subject}</h3>
                        <p>View exam paper</p>
                    </div>
                    <div class="arrow">→</div>
                </div>
            `).join('')}
        </div>
    `;
}

let selectedHubMode = 'practice';

function setHubMode(mode) {
    selectedHubMode = mode;
    document.getElementById('mode-opt-practice')?.classList.toggle('active', mode === 'practice');
    document.getElementById('mode-opt-timed')?.classList.toggle('active', mode === 'timed');
}

async function openSubjectExam(grade, semester, examType, subject) {
    let filePath = '';
    let examTitle = `${grade} ${subject} ${examType}`;

    try {
        const res = await fetch(`/api/exams?grade=${grade}&semester=${semester}&examType=${examType}&subject=${encodeURIComponent(subject)}`);
        const data = await res.json();
        if (data.exams && data.exams.length > 0) {
            filePath = data.exams[0].fileUrl;
            examTitle = data.exams[0].title;
        }
    } catch (e) {
        console.warn('Fallback to standard path convention', e);
    }

    if (!filePath) {
        if (examType === "Pretest" || examType === "Model") {
            filePath = `/exams/${grade}/${examType}/${subject}.pdf`;
        } else {
            filePath = `/exams/${grade}/${semester}/${examType}/${subject}.pdf`;
        }
    }

    const backFn = () => {
        if (semester === 'Pretest' || semester === 'Model') {
            showNationalExamCategory(semester);
        } else {
            showExamType(grade, semester, examType);
        }
    };

    // Open Dual Exam Hub: Interactive Practice Mode + Official PDF & Download!
    showExamHub(grade, semester, examType, subject, filePath, examTitle, backFn);
}

async function showExamHub(grade, semester, examType, subject, filePath, examTitle, backFn, pushHistory = true) {
    if (pushHistory) {
        pushNavState({ view: 'hub', grade, semester, examType, subject, filePath, examTitle }, examTitle || `${grade} ${subject}`);
    }
    window._lastBackFn = backFn;

    let questionCount = 0;
    try {
        let qUrl = `/api/practice?grade=${grade}&subject=${encodeURIComponent(subject)}`;
        if (semester && semester !== 'All') qUrl += `&semester=${encodeURIComponent(semester)}`;
        if (examType && examType !== 'All') qUrl += `&examType=${encodeURIComponent(examType)}`;
        const res = await fetch(qUrl);
        const data = await res.json();
        questionCount = (data.questions || []).length;
    } catch (e) {}

    if (questionCount === 0) {
        try {
            const raw = localStorage.getItem('pel_offline_questions');
            if (raw) {
                const allOffline = JSON.parse(raw);
                const matched = allOffline.filter(q => {
                    if (q.grade !== grade) return false;
                    if (subject && q.subject !== subject) return false;
                    return true;
                });
                questionCount = matched.length;
            }
        } catch(e) {}
    }

    app.innerHTML = `
        <div class="nav-breadcrumbs-bar">
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <button class="back-button back-button-home" onclick="showLibraryHome()" style="margin: 0; display: inline-flex; align-items: center; gap: 6px;" title="Go back to the website home page where you choose your grade">
                    ${uiIcon('home', 14)} Back to Grades (Home)
                </button>
                <button class="back-button" onclick="window._lastBackFn ? window._lastBackFn() : showLibraryHome()" style="margin: 0;">
                    ← Back to subjects
                </button>
            </div>
            <div class="breadcrumb-trail">
                <span class="clickable" onclick="showLibraryHome()">Grades</span>
                <span>/</span>
                <span class="clickable" onclick="showGrade('${grade}')">${grade}</span>
                <span>/</span>
                <span class="clickable" onclick="showSemester('${grade}', '${semester}')">${semester}</span>
                <span>/</span>
                <span class="clickable" onclick="showExamType('${grade}', '${semester}', '${examType}')">${examType}</span>
                <span>/</span>
                <span class="current">${subject}</span>
            </div>
        </div>

        <div class="page-title">
            <h2>${subject}</h2>
            <p>${grade} • ${semester} • ${examType}</p>
        </div>

        <div class="exam-hub-grid">
            <!-- Left Card: Interactive Practice -->
            <div class="hub-card ${questionCount > 0 ? 'hub-card-featured' : ''}" style="${questionCount === 0 ? 'border: 1px dashed var(--border-glass);' : ''}">
                ${questionCount > 0 ? `
                    <span class="hub-badge hub-badge-interactive" style="display: inline-flex; align-items: center; gap: 6px;">
                        ${uiIcon('sparkles', 13)} 100% Authentic Paper Questions
                    </span>
                    <h3 style="font-size: 24px; color: #ffffff; margin-bottom: 8px;">Online Practice Mode</h3>
                    <p style="color: var(--text-muted); font-size: 14.5px; line-height: 1.6;">
                        Practice real examination questions transcribed directly from the physical school paper with instant feedback and score reports.
                    </p>

                    <div class="mode-selector">
                        <div class="mode-option ${selectedHubMode === 'practice' ? 'active' : ''}" id="mode-opt-practice" onclick="setHubMode('practice')">
                            <div class="mode-radio"></div>
                            <div>
                                <div style="font-weight: 700; color: #ffffff; font-size: 15px; display: flex; align-items: center; gap: 6px;">
                                    ${uiIcon('bolt', 16, 'text-accent')} Instant Practice Mode
                                </div>
                                <div style="font-size: 12.5px; color: var(--text-muted); margin-top: 2px;">
                                    Check answers immediately after each question with detailed explanations.
                                </div>
                            </div>
                        </div>

                        <div class="mode-option ${selectedHubMode === 'timed' ? 'active' : ''}" id="mode-opt-timed" onclick="setHubMode('timed')">
                            <div class="mode-radio"></div>
                            <div>
                                <div style="font-weight: 700; color: #ffffff; font-size: 15px; display: flex; align-items: center; gap: 6px;">
                                    ${uiIcon('clock', 16, 'text-accent')} Timed Exam Simulation
                                </div>
                                <div style="font-size: 12.5px; color: var(--text-muted); margin-top: 2px;">
                                    Real test conditions with live countdown timer and verified final score report.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 18px; border-top: 1px solid var(--border-glass);">
                        <span style="font-size: 13px; color: #c084fc; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
                            ${uiIcon('bookOpen', 15)} ${questionCount} Authentic Questions Transcribed
                        </span>
                        <button class="btn-primary" style="width: auto; padding: 12px 24px;" 
                                onclick="startPracticeSession('${grade}', '${semester}', '${examType}', '${escapeQuotes(subject)}', selectedHubMode, '${escapeQuotes(examTitle)}', '${filePath}', window._lastBackFn)">
                            Start Practicing Now (${questionCount} Qs) →
                        </button>
                    </div>
                ` : `
                    <span class="hub-badge" style="background: rgba(148, 163, 184, 0.15); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.25); display: inline-flex; align-items: center; gap: 5px;">
                        ${uiIcon('clipboard', 12)} Archive Paper
                    </span>
                    <h3 style="font-size: 22px; color: #ffffff; margin-bottom: 8px;">Interactive Mode In Transcription</h3>
                    <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
                        To maintain strict 100% exam fidelity, questions for this paper are being transcribed directly from school physical archives. No AI-generated or synthetic questions are published.
                    </p>
                    <div style="background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 12px; padding: 14px; margin-bottom: 20px;">
                        <div style="font-weight: 600; color: #a5b4fc; font-size: 13.5px; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                            ${uiIcon('fileText', 14)} Official PDF Ready for Study
                        </div>
                        <div style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
                            You can view the full scanned exam paper with questions and diagrams using the Exam Document preview below.
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 18px; border-top: 1px solid var(--border-glass);">
                        <span style="font-size: 12.5px; color: #94a3b8; display: inline-flex; align-items: center; gap: 5px;">
                            ${uiIcon('shieldCheck', 14)} Strict Paper Fidelity Policy
                        </span>
                        <span style="font-size: 12.5px; color: #818cf8; font-weight: 600;">
                            See Document Options ↓
                        </span>
                    </div>
                `}
            </div>

            <!-- Right Card: PDF Download & Preview -->
            <div class="hub-card">
                <span class="hub-badge hub-badge-pdf" style="display: inline-flex; align-items: center; gap: 5px;">
                    ${uiIcon('fileText', 12)} Original Paper
                </span>
                <h3 style="font-size: 22px; color: #ffffff; margin-bottom: 8px;">Exam Document (PDF)</h3>
                <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
                    Download the official past paper for offline study, or preview the complete document online.
                </p>

                <div style="display: flex; flex-direction: column; gap: 12px; margin-top: auto;">
                    <button class="btn-primary" style="justify-content: center; padding: 14px 20px; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; border: none; font-size: 14.5px;" 
                            onclick="downloadExamPaper('${filePath}', '${escapeQuotes(examTitle)}.pdf', { grade: '${grade}', subject: '${escapeQuotes(subject)}', semester: '${semester}', examType: '${examType}', examTitle: '${escapeQuotes(examTitle)}' })">
                        ${uiIcon('download', 16)} Download Official PDF Paper
                    </button>
                    <button class="btn-secondary" style="justify-content: center; padding: 12px; display: inline-flex; align-items: center; gap: 8px;" 
                            onclick="logActivity('preview', { grade: '${grade}', subject: '${escapeQuotes(subject)}', semester: '${semester}', examType: '${examType}', examTitle: '${escapeQuotes(examTitle)}', filePath: '${filePath}', details: 'Previewed exam PDF online' }); renderExamViewer('${escapeQuotes(examTitle)}', '${grade} • ${semester} • ${examType}', '${filePath}', () => showExamHub('${grade}', '${semester}', '${examType}', '${escapeQuotes(subject)}', '${filePath}', '${escapeQuotes(examTitle)}', window._lastBackFn))">
                        ${uiIcon('eye', 15)} Preview PDF Document
                    </button>
                    <button class="btn-bookmark ${isExamBookmarked(examTitle) ? 'bookmarked' : ''}" id="btn-bookmark-${escapeQuotes(examTitle)}" style="justify-content: center; padding: 12px; display: inline-flex; align-items: center; gap: 8px; width: 100%;" 
                            onclick="toggleBookmarkExam('${grade}_${semester}_${subject}', '${escapeQuotes(examTitle)}', '${grade}', '${semester}', '${examType}', '${escapeQuotes(subject)}', '${filePath}')">
                        ${uiIcon(isExamBookmarked(examTitle) ? 'bookmarkCheck' : 'bookmark', 15)} ${isExamBookmarked(examTitle) ? 'Saved in My Study Hub ✓' : 'Save to My Study Hub'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

let currentQuiz = {
    grade: '',
    semester: '',
    examType: '',
    subject: '',
    mode: 'practice',
    examTitle: '',
    filePath: '',
    backFn: null,
    questions: [],
    currentIndex: 0,
    answers: {},
    checked: {},
    flagged: {},
    startTime: null,
    timeRemaining: 1200,
    timerInterval: null
};

async function startPracticeSession(grade, semester, examType, subject, mode, examTitle, filePath, backFn) {
    if (currentQuiz.timerInterval) clearInterval(currentQuiz.timerInterval);

    showToast('Loading practice questions...', 'info');

    let questions = [];
    try {
        let qUrl = `/api/practice?grade=${grade}&subject=${encodeURIComponent(subject)}`;
        if (semester && semester !== 'All' && semester !== 'Practice Bank') {
            qUrl += `&semester=${encodeURIComponent(semester)}`;
        }
        if (examType && examType !== 'All') {
            qUrl += `&examType=${encodeURIComponent(examType)}`;
        }
        let res = await fetch(qUrl);
        let data = await res.json();
        questions = data.questions || [];
    } catch (e) {
        console.warn('Practice fetch error online, checking offline cache', e);
    }

    if (questions.length === 0) {
        try {
            const raw = localStorage.getItem('pel_offline_questions');
            if (raw) {
                const allOffline = JSON.parse(raw);
                questions = allOffline.filter(q => {
                    if (q.grade !== grade) return false;
                    if (subject && q.subject !== subject) return false;
                    return true;
                });
            }
        } catch(e) {}
    }

    if (questions.length === 0) {
        showToast('Interactive questions for this paper are currently in transcription. Opening official PDF.', 'info');
        renderExamViewer(examTitle, `${grade} • ${semester} • ${examType}`, filePath, backFn);
        return;
    }

    currentQuiz = {
        grade,
        semester,
        examType,
        subject,
        mode: mode || 'practice',
        examTitle,
        filePath,
        backFn,
        questions,
        currentIndex: 0,
        answers: {},
        checked: {},
        flagged: {},
        startTime: Date.now(),
        timeRemaining: Math.max(questions.length * 90, 600),
        timerInterval: null
    };

    if (currentQuiz.mode === 'timed') {
        currentQuiz.timerInterval = setInterval(() => {
            currentQuiz.timeRemaining--;
            updateTimerDisplay();
            if (currentQuiz.timeRemaining <= 0) {
                clearInterval(currentQuiz.timerInterval);
                showToast('Time is up! Submitting exam...', 'info');
                finishQuiz();
            }
        }, 1000);
    }

    renderQuizScreen();
}

function renderQuizScreen() {
    const q = currentQuiz.questions[currentQuiz.currentIndex];
    const total = currentQuiz.questions.length;
    const progress = Math.round(((currentQuiz.currentIndex + 1) / total) * 100);
    const selected = currentQuiz.answers[q.id];
    const isChecked = currentQuiz.checked[q.id];
    const isFlagged = currentQuiz.flagged[q.id];
    const isTimed = currentQuiz.mode === 'timed';

    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    app.innerHTML = `
        <div class="quiz-runner-container">
            <!-- Top Action & Progress Bar -->
            <div class="quiz-top-bar">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <button class="btn-secondary" style="padding: 7px 12px; font-size: 13px;" onclick="confirmExitQuiz()">
                        ← Exit
                    </button>
                    <div>
                        <strong style="color: #ffffff; font-size: 15px;">${currentQuiz.subject}</strong>
                        <span style="font-size: 12px; color: var(--text-muted); margin-left: 6px;">(${currentQuiz.grade} • ${currentQuiz.examType})</span>
                    </div>
                </div>

                <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                    ${isTimed ? `
                        <div class="quiz-timer-pill" id="quiz-timer-display" style="display: inline-flex; align-items: center; gap: 6px;">
                            ${uiIcon('clock', 13)} ${formatTime(currentQuiz.timeRemaining)}
                        </div>
                    ` : `
                        <span class="hub-badge hub-badge-interactive" style="margin: 0; display: inline-flex; align-items: center; gap: 5px;">
                            ${uiIcon('bolt', 13)} Practice Mode
                        </span>
                    `}

                    <button class="btn-secondary" style="padding: 7px 12px; font-size: 13px; display: inline-flex; align-items: center; gap: 5px; cursor: pointer;" title="Download PDF" onclick="downloadExamPaper('${currentQuiz.filePath}', '${escapeQuotes(currentQuiz.examTitle)}.pdf')">
                        ${uiIcon('download', 13)} PDF
                    </button>

                    ${isTimed ? `
                        <button class="btn-secondary" style="padding: 7px 12px; font-size: 13px; color: ${isFlagged ? '#f59e0b' : 'var(--text-muted)'}; display: inline-flex; align-items: center; gap: 5px;" onclick="toggleQuizFlag('${q.id}')">
                            ${uiIcon('flag', 13)} ${isFlagged ? 'Flagged' : 'Flag'}
                        </button>
                        <button class="btn-primary" style="width: auto; padding: 7px 16px; font-size: 13px;" onclick="confirmSubmitTimedExam()">
                            Submit Exam
                        </button>
                    ` : ''}
                </div>
            </div>

            <div class="quiz-progress-track">
                <div class="quiz-progress-bar" style="width: ${progress}%;"></div>
            </div>

            <!-- Question Card -->
            <div class="quiz-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                    <span class="question-number-badge">Question ${currentQuiz.currentIndex + 1} of ${total}</span>
                    <span style="font-size: 13px; color: var(--text-dim);">${q.points || 1} Point${(q.points || 1) > 1 ? 's' : ''}</span>
                </div>

                <div class="question-text">
                    ${q.question}
                </div>

                <div class="options-grid">
                    ${q.options.map((opt, idx) => {
                        let optClass = 'option-btn';
                        if (selected === idx) optClass += ' selected';
                        if (isChecked) {
                            if (idx === q.correctAnswer) optClass += ' correct';
                            else if (selected === idx) optClass += ' incorrect';
                        }

                        return `
                            <button type="button" class="${optClass}" onclick="selectQuizOption('${q.id}', ${idx})" ${isChecked ? 'disabled' : ''}>
                                <div class="option-letter">${letters[idx] || (idx + 1)}</div>
                                <span>${opt}</span>
                            </button>
                        `;
                    }).join('')}
                </div>

                <!-- Explanation Box in Practice Mode -->
                ${isChecked ? `
                    <div class="explanation-box">
                        <div class="explanation-title" style="display: flex; align-items: center; gap: 7px;">
                            ${selected === q.correctAnswer ? `${uiIcon('checkCircle', 16)} Correct Answer!` : `${uiIcon('lightbulb', 16)} Explanation`}
                        </div>
                        <div class="explanation-text">
                            ${q.explanation || 'The correct option is ' + letters[q.correctAnswer] + ': ' + q.options[q.correctAnswer]}
                        </div>
                    </div>
                ` : ''}

                <!-- Bottom Question Navigation Buttons -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--border-glass);">
                    <button class="btn-secondary" onclick="prevQuizQuestion()" ${currentQuiz.currentIndex === 0 ? 'disabled style="opacity: 0.4;"' : ''}>
                        ← Previous
                    </button>

                    <div style="display: flex; gap: 10px;">
                        ${!isTimed && !isChecked ? `
                            <button class="btn-primary" style="width: auto; padding: 10px 22px; display: inline-flex; align-items: center; gap: 6px;" onclick="checkCurrentAnswer('${q.id}')" ${selected === undefined ? 'disabled style="opacity: 0.5;"' : ''}>
                                Check Answer ${uiIcon('check', 14)}
                            </button>
                        ` : ''}

                        ${currentQuiz.currentIndex < total - 1 ? `
                            <button class="btn-primary" style="width: auto; padding: 10px 22px;" onclick="nextQuizQuestion()">
                                Next Question →
                            </button>
                        ` : `
                            <button class="btn-primary" style="width: auto; padding: 10px 22px; background: linear-gradient(135deg, #059669, #10b981); display: inline-flex; align-items: center; gap: 8px;" onclick="finishQuiz()">
                                View Results & Score ${uiIcon('trophy', 16)}
                            </button>
                        `}
                    </div>
                </div>
            </div>

            <!-- Question Palette in Timed Mode -->
            ${isTimed ? `
                <div class="admin-section" style="padding: 20px 26px;">
                    <div style="font-size: 13px; font-weight: 700; color: #cbd5e1; margin-bottom: 10px;">Question Navigator</div>
                    <div class="question-palette-grid">
                        ${currentQuiz.questions.map((ques, idx) => {
                            let pClass = 'palette-btn';
                            if (idx === currentQuiz.currentIndex) pClass += ' current';
                            else if (currentQuiz.answers[ques.id] !== undefined) pClass += ' answered';
                            else if (currentQuiz.flagged[ques.id]) pClass += ' flagged';

                            return `
                                <button class="${pClass}" onclick="jumpQuizQuestion(${idx})">
                                    ${idx + 1}
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function selectQuizOption(qId, index) {
    if (currentQuiz.checked[qId]) return;
    currentQuiz.answers[qId] = index;
    renderQuizScreen();
}

function checkCurrentAnswer(qId) {
    currentQuiz.checked[qId] = true;
    renderQuizScreen();
}

function nextQuizQuestion() {
    if (currentQuiz.currentIndex < currentQuiz.questions.length - 1) {
        currentQuiz.currentIndex++;
        renderQuizScreen();
    }
}

function prevQuizQuestion() {
    if (currentQuiz.currentIndex > 0) {
        currentQuiz.currentIndex--;
        renderQuizScreen();
    }
}

function jumpQuizQuestion(index) {
    currentQuiz.currentIndex = index;
    renderQuizScreen();
}

function toggleQuizFlag(qId) {
    currentQuiz.flagged[qId] = !currentQuiz.flagged[qId];
    renderQuizScreen();
}

function confirmSubmitTimedExam() {
    const answeredCount = Object.keys(currentQuiz.answers).length;
    const total = currentQuiz.questions.length;
    const bodyHtml = `
        <p>You have answered <strong>${answeredCount}</strong> of <strong>${total}</strong> questions.</p>
        ${answeredCount < total ? `<p style="color: #f59e0b; margin-top: 8px; font-size: 13px; display: flex; align-items: center; gap: 6px;">${uiIcon('alertTriangle', 14)} You have ${total - answeredCount} unanswered questions.</p>` : ''}
        <p style="margin-top: 10px;">Are you ready to submit your exam and receive your verified score?</p>
    `;
    const footerHtml = `
        <button class="btn-secondary" onclick="closeModal()">Keep Practicing</button>
        <button class="btn-primary" onclick="closeModal(); finishQuiz();">Yes, Submit Exam</button>
    `;
    showModal('Submit Examination', bodyHtml, footerHtml);
}

function confirmExitQuiz() {
    const bodyHtml = `
        <p>Are you sure you want to leave this practice session?</p>
        <p style="color: var(--text-muted); font-size: 13px; margin-top: 8px;">Your current test progress will be lost.</p>
    `;
    const footerHtml = `
        <button class="btn-secondary" onclick="closeModal()">Stay in Test</button>
        <button class="btn-primary" style="background: var(--accent-rose);" onclick="closeModal(); if (currentQuiz.timerInterval) clearInterval(currentQuiz.timerInterval); currentQuiz.backFn ? currentQuiz.backFn() : showLibraryHome();">
            Exit Session
        </button>
    `;
    showModal('Exit Practice Session', bodyHtml, footerHtml);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    const el = document.getElementById('quiz-timer-display');
    if (el) {
        el.innerHTML = `${uiIcon('clock', 13)} ${formatTime(currentQuiz.timeRemaining)}`;
        if (currentQuiz.timeRemaining < 120) {
            el.classList.add('urgent');
        }
    }
}

function finishQuiz() {
    if (currentQuiz.timerInterval) clearInterval(currentQuiz.timerInterval);

    let correctCount = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    currentQuiz.questions.forEach(q => {
        const pts = q.points || 1;
        totalPoints += pts;
        if (currentQuiz.answers[q.id] === q.correctAnswer) {
            correctCount++;
            earnedPoints += pts;
        }
    });

    const percent = Math.round((earnedPoints / (totalPoints || 1)) * 100);
    const timeSpentSeconds = Math.round((Date.now() - currentQuiz.startTime) / 1000);

    // Record practice session in student activity audit logs
    logActivity('practice', {
        grade: currentQuiz.grade,
        subject: currentQuiz.subject,
        semester: currentQuiz.semester,
        examType: currentQuiz.examType,
        examTitle: currentQuiz.examTitle,
        filePath: currentQuiz.filePath,
        score: correctCount,
        totalQuestions: currentQuiz.questions.length,
        percentage: percent,
        durationSeconds: timeSpentSeconds,
        mode: currentQuiz.mode,
        details: `Scored ${correctCount}/${currentQuiz.questions.length} (${percent}%) in ${formatTime(timeSpentSeconds)}`
    });

    let verdict = `<span style="display: inline-flex; align-items: center; gap: 8px;">${uiIcon('sparkles', 20)} Excellent Job!</span>`;
    if (percent >= 90) verdict = `<span style="display: inline-flex; align-items: center; gap: 8px;">${uiIcon('trophy', 20)} Outstanding Mastery! Distinction!</span>`;
    else if (percent >= 75) verdict = `<span style="display: inline-flex; align-items: center; gap: 8px;">${uiIcon('star', 20)} Great Performance! High Pass!</span>`;
    else if (percent >= 50) verdict = `<span style="display: inline-flex; align-items: center; gap: 8px;">${uiIcon('checkCircle', 20)} Good Effort! Passing Grade.</span>`;
    else verdict = `<span style="display: inline-flex; align-items: center; gap: 8px;">${uiIcon('bookOpen', 20)} Keep Practicing! Review key concepts below.</span>`;

    app.innerHTML = `
        <div class="results-card">
            <div class="empty-state-icon-wrap" style="width: 72px; height: 72px; margin: 0 auto 16px; background: rgba(99, 102, 241, 0.15); color: #a5b4fc; border-color: rgba(99, 102, 241, 0.35);">
                ${uiIcon('graduation', 36)}
            </div>
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 32px; color: #ffffff; margin-bottom: 6px;">Practice Completed!</h2>
            <p style="color: var(--text-muted); font-size: 15px;">${currentQuiz.subject} • ${currentQuiz.grade} • ${currentQuiz.examType}</p>

            <div class="score-circle-wrapper" style="margin-top: 24px;">
                <div class="score-percentage">${percent}%</div>
                <div class="score-fraction">${correctCount} of ${currentQuiz.questions.length} Correct</div>
            </div>

            <h3 style="color: #e9d5ff; font-size: 20px; font-weight: 700; margin-bottom: 20px;">${verdict}</h3>

            <div class="results-stats-row">
                <div class="results-stat-box">
                    <div class="results-stat-val" style="color: #34d399;">${correctCount}</div>
                    <div class="results-stat-lbl">Correct Answers</div>
                </div>
                <div class="results-stat-box">
                    <div class="results-stat-val" style="color: #f87171;">${currentQuiz.questions.length - correctCount}</div>
                    <div class="results-stat-lbl">Incorrect Answers</div>
                </div>
                <div class="results-stat-box">
                    <div class="results-stat-val" style="color: #a5b4fc;">${formatTime(timeSpentSeconds)}</div>
                    <div class="results-stat-lbl">Time Spent</div>
                </div>
            </div>

            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 28px;">
                <button class="btn-primary" style="width: auto; padding: 12px 24px; display: inline-flex; align-items: center; gap: 8px;" onclick="reviewQuizAnswers()">
                    ${uiIcon('bookOpen', 15)} Review Questions & Explanations
                </button>
                <button class="btn-secondary" style="display: inline-flex; align-items: center; gap: 7px;" onclick="startPracticeSession('${currentQuiz.grade}', '${currentQuiz.semester}', '${currentQuiz.examType}', '${escapeQuotes(currentQuiz.subject)}', '${currentQuiz.mode}', '${escapeQuotes(currentQuiz.examTitle)}', '${currentQuiz.filePath}', currentQuiz.backFn)">
                    ${uiIcon('refresh', 14)} Retake Practice Test
                </button>
                <button class="btn-secondary" style="display: inline-flex; align-items: center; gap: 7px; cursor: pointer;"
                   onclick="downloadExamPaper('${currentQuiz.filePath}', '${escapeQuotes(currentQuiz.examTitle)}.pdf', { grade: '${currentQuiz.grade}', subject: '${escapeQuotes(currentQuiz.subject)}', semester: '${currentQuiz.semester}', examType: '${currentQuiz.examType}', examTitle: '${escapeQuotes(currentQuiz.examTitle)}' })">
                    ${uiIcon('download', 14)} Download Official PDF
                </button>
                <button class="btn-secondary back-button-home" style="display: inline-flex; align-items: center; gap: 7px;" onclick="showLibraryHome()">
                    ${uiIcon('home', 14)} Back to Grades (Home)
                </button>
            </div>
        </div>
    `;
}

function reviewQuizAnswers() {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    app.innerHTML = `
        <div class="quiz-runner-container">
            <div class="quiz-top-bar">
                <div>
                    <h3 style="color: #ffffff; font-size: 18px;">Question Review & Explanations</h3>
                    <p style="color: var(--text-muted); font-size: 13px;">${currentQuiz.subject} • ${currentQuiz.grade}</p>
                </div>
                <button class="btn-primary" style="width: auto; padding: 8px 18px;" onclick="finishQuiz()">
                    ← Back to Scorecard
                </button>
            </div>

            <div style="display: flex; flex-direction: column; gap: 20px;">
                ${currentQuiz.questions.map((q, qIdx) => {
                    const selected = currentQuiz.answers[q.id];
                    const isCorrect = selected === q.correctAnswer;

                    return `
                        <div class="quiz-card" style="padding: 26px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                                <span class="question-number-badge">Question ${qIdx + 1}</span>
                                <span class="badge ${isCorrect ? 'badge-green' : 'badge-amber'}" style="display: inline-flex; align-items: center; gap: 4px;">
                                    ${isCorrect ? `${uiIcon('check', 12)} Correct (+1 pt)` : `${uiIcon('x', 12)} Incorrect (0 pts)`}
                                </span>
                            </div>

                            <div style="font-size: 17px; font-weight: 700; color: #ffffff; margin-bottom: 18px;">
                                ${q.question}
                            </div>

                            <div class="options-grid">
                                ${q.options.map((opt, oIdx) => {
                                    let optClass = 'option-btn';
                                    if (oIdx === q.correctAnswer) optClass += ' correct';
                                    else if (selected === oIdx) optClass += ' incorrect';

                                    return `
                                        <div class="${optClass}" style="cursor: default;">
                                            <div class="option-letter">${letters[oIdx]}</div>
                                            <span>${opt}</span>
                                            ${oIdx === q.correctAnswer ? `<span style="margin-left: auto; color: #34d399; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">${uiIcon('check', 12)} Correct</span>` : ''}
                                            ${selected === oIdx && oIdx !== q.correctAnswer ? '<span style="margin-left: auto; color: #f87171; font-weight: 700;">Your Choice</span>' : ''}
                                        </div>
                                    `;
                                }).join('')}
                            </div>

                            <div class="explanation-box">
                                <div class="explanation-title">Explanation</div>
                                <div class="explanation-text">${q.explanation || 'No explanation provided.'}</div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <div style="text-align: center; margin-top: 20px;">
                <button class="btn-primary" style="width: auto; padding: 12px 28px;" onclick="finishQuiz()">
                    Back to Scorecard →
                </button>
            </div>
        </div>
    `;
}

function renderExamNotFound(title, subtitle, grade, semester, examType, subject, onBackFn) {
    window._lastBackFn = onBackFn;
    const isAdmin = state.user && state.user.role === 'admin';

    app.innerHTML = `
        <div class="nav-breadcrumbs-bar">
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <button class="back-button back-button-home" onclick="showLibraryHome()" style="margin: 0; display: inline-flex; align-items: center; gap: 6px;" title="Go back to the website home page where you choose your grade">
                    ${uiIcon('home', 14)} Back to Grades (Home)
                </button>
                <button class="back-button" onclick="window._lastBackFn ? window._lastBackFn() : showLibraryHome()" style="margin: 0;">
                    ← Back to papers
                </button>
            </div>
        </div>

        <div class="exam-message" style="margin-top: 10px;">
            <div class="empty-state-icon-wrap" style="width: 64px; height: 64px; margin: 0 auto 14px; background: rgba(99, 102, 241, 0.12); color: #818cf8; border-color: rgba(99, 102, 241, 0.3);">
                ${uiIcon('folder', 30)}
            </div>
            <h3 style="font-size: 22px; color: var(--navy-900); margin-bottom: 8px;">Paper Not Uploaded Yet</h3>
            <p style="margin-bottom: 16px; color: var(--text-muted);">
                The examination paper for <strong>${title}</strong> (${subtitle}) has not been uploaded to the school repository yet.
            </p>
            ${isAdmin ? `
                <button class="btn-primary" style="width: auto; padding: 10px 18px;" onclick="openAddExamModal()">
                    + Upload This Paper in Admin Dashboard
                </button>
            ` : `
                <p style="font-size: 13px; color: var(--text-light);">
                    Please check back later or notify your teacher or school administrator.
                </p>
            `}
        </div>
    `;
}

async function openExamById(examId) {
    try {
        const res = await fetch('/api/exams');
        const data = await res.json();
        const exam = (data.exams || []).find(e => e.id === examId);
        if (exam) {
            showExamHub(exam.grade, exam.semester, exam.examType, exam.subject, exam.fileUrl, exam.title, () => {
                showLibraryHome();
            });
        }
    } catch (e) {
        showToast('Error opening exam', 'error');
    }
}

function previewExamDoc(examId) {
    openExamById(examId);
}

// PDF Reader State
let pdfViewerState = {
    doc: null,
    pageNum: 1,
    pageCount: 0,
    scale: 1.2,
    viewMode: 'canvas', // 'canvas' or 'native'
    fileUrl: '',
    title: ''
};

function renderExamViewer(title, subtitle, fileUrl, onBackFn, pushHistory = true) {
    if (pushHistory) {
        pushNavState({ view: 'viewer', title, subtitle, fileUrl }, title);
    }
    window._lastBackFn = onBackFn;
    pdfViewerState.fileUrl = fileUrl;
    pdfViewerState.title = title;
    pdfViewerState.pageNum = 1;
    pdfViewerState.doc = null;
    pdfViewerState.viewMode = (window.pdfjsLib) ? 'canvas' : 'native';

    app.innerHTML = `
        <div class="nav-breadcrumbs-bar">
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <button class="back-button back-button-home" onclick="showLibraryHome()" style="margin: 0; display: inline-flex; align-items: center; gap: 6px;" title="Go back to the website home page where you choose your grade">
                    ${uiIcon('home', 14)} Back to Grades (Home)
                </button>
                <button class="back-button" onclick="window._lastBackFn ? window._lastBackFn() : showLibraryHome()" style="margin: 0;">
                    ← Back to papers
                </button>
            </div>
        </div>

        <div class="exam-viewer-container">
            <div class="exam-viewer-toolbar">
                <div class="exam-viewer-title">
                    <div class="subject-icon" style="color: #818cf8;">${uiIcon('fileText', 20)}</div>
                    <div>
                        <h3 style="font-size: 18px; color: #ffffff; font-weight: 700;">${title}</h3>
                        <p style="font-size: 13px; color: var(--text-muted);">${subtitle}</p>
                    </div>
                </div>

                <div class="exam-viewer-actions">
                    <button class="btn-primary" style="width: auto; padding: 8px 16px; font-size: 13px; display: inline-flex; align-items: center; gap: 6px;" onclick="window._lastBackFn ? window._lastBackFn() : showLibraryHome()">
                        ${uiIcon('target', 14)} Practice Questions
                    </button>
                    <button class="btn-secondary" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;" title="Download for offline study" onclick="downloadExamPaper('${fileUrl}', '${escapeQuotes(title)}.pdf')">
                        ${uiIcon('download', 14)} Download PDF
                    </button>
                    <button class="btn-secondary" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;" title="Save to My Study Hub" onclick="toggleBookmarkExam('exam_${escapeQuotes(title)}', '${escapeQuotes(title)}', '', '', '', '', '${fileUrl}')">
                        ${uiIcon('bookmark', 14)} Bookmark
                    </button>
                </div>
            </div>

            <!-- Fast Reader Sub-bar -->
            <div class="pdf-reader-subbar" id="pdf-reader-subbar">
                <div class="pdf-control-group">
                    <button class="pdf-btn-ctrl" id="pdf-prev-btn" onclick="changePdfPage(-1)">
                        ◀ Prev
                    </button>
                    <span class="pdf-page-indicator" id="pdf-page-indicator">
                        Page <strong id="pdf-current-page">1</strong> / <span id="pdf-total-pages">-</span>
                    </span>
                    <button class="pdf-btn-ctrl" id="pdf-next-btn" onclick="changePdfPage(1)">
                        Next ▶
                    </button>
                </div>

                <div class="pdf-control-group">
                    <button class="pdf-btn-ctrl" onclick="zoomPdf(-0.2)" title="Zoom Out" style="display: inline-flex; align-items: center;">${uiIcon('zoomOut', 13)}</button>
                    <span class="pdf-page-indicator" id="pdf-zoom-level">120%</span>
                    <button class="pdf-btn-ctrl" onclick="zoomPdf(0.2)" title="Zoom In" style="display: inline-flex; align-items: center;">${uiIcon('zoomIn', 13)}</button>
                    <button class="pdf-btn-ctrl" onclick="resetPdfZoom()" title="Fit Width">Fit</button>
                </div>

                <div class="pdf-control-group">
                    <button class="pdf-mode-pill ${pdfViewerState.viewMode === 'canvas' ? 'active' : ''}" id="btn-mode-canvas" onclick="switchPdfViewMode('canvas')" style="display: inline-flex; align-items: center; gap: 5px;">
                        ${uiIcon('bolt', 12)} Fast Reader
                    </button>
                    <button class="pdf-mode-pill ${pdfViewerState.viewMode === 'native' ? 'active' : ''}" id="btn-mode-native" onclick="switchPdfViewMode('native')" style="display: inline-flex; align-items: center; gap: 5px;">
                        ${uiIcon('fileText', 12)} Native Viewer
                    </button>
                </div>
            </div>

            <!-- Viewport container -->
            <div id="pdf-viewer-viewport" style="position: relative; width: 100%;">
                <div id="pdf-canvas-area" class="pdf-canvas-container" style="${pdfViewerState.viewMode === 'native' ? 'display: none;' : ''}">
                    <div class="pdf-loading-card" id="pdf-loading-card">
                        <div class="hub-icon-circle" style="animation: pulse 1.5s infinite; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(99, 102, 241, 0.4); color: #818cf8; border-radius: 50%; margin: 0 auto 14px;">
                            ${uiIcon('bolt', 26)}
                        </div>
                        <h4 style="color: #ffffff; font-size: 16px;">Loading Examination Paper...</h4>
                        <div class="pdf-progress-track">
                            <div class="pdf-progress-fill" id="pdf-progress-bar"></div>
                        </div>
                        <p style="color: var(--text-muted); font-size: 13px;" id="pdf-loading-status">Streaming document via accelerated edge CDN...</p>
                    </div>
                </div>

                <div id="pdf-native-area" style="${pdfViewerState.viewMode === 'canvas' ? 'display: none;' : ''}">
                    <iframe 
                        src="${fileUrl}" 
                        class="exam-iframe" 
                        title="${title}">
                    </iframe>
                </div>
            </div>
        </div>
    `;

    if (pdfViewerState.viewMode === 'canvas') {
        loadPdfDocument(fileUrl);
    }
}

async function loadPdfDocument(fileUrl) {
    if (!window.pdfjsLib) {
        console.warn('PDF.js not available, falling back to native iframe');
        switchPdfViewMode('native');
        return;
    }

    try {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    } catch (e) {}

    const progressBar = document.getElementById('pdf-progress-bar');
    const loadingStatus = document.getElementById('pdf-loading-status');
    const loadingCard = document.getElementById('pdf-loading-card');

    const urlsToTry = [fileUrl];
    if (fileUrl.startsWith('/exams/')) {
        urlsToTry.push(`https://cdn.jsdelivr.net/gh/soliyana-dev/past-exam-library@main${fileUrl}`);
    }

    let pdfDoc = null;
    for (const testUrl of urlsToTry) {
        try {
            const loadingTask = pdfjsLib.getDocument({
                url: testUrl,
                cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
                cMapPacked: true
            });

            loadingTask.onProgress = function(progress) {
                if (progress.total > 0 && progressBar) {
                    const percent = Math.min(Math.round((progress.loaded / progress.total) * 100), 99);
                    progressBar.style.width = percent + '%';
                    if (loadingStatus) loadingStatus.textContent = `Streaming document: ${percent}%...`;
                }
            };

            pdfDoc = await loadingTask.promise;
            if (pdfDoc) break;
        } catch (err) {
            console.warn(`Fast canvas render attempt failed for ${testUrl}:`, err);
        }
    }

    if (!pdfDoc) {
        console.warn('Fast canvas render failed across all sources, switching to native iframe viewer');
        switchPdfViewMode('native');
        return;
    }

    try {
        pdfViewerState.doc = pdfDoc;
        pdfViewerState.pageCount = pdfDoc.numPages;

        const totalPagesEl = document.getElementById('pdf-total-pages');
        if (totalPagesEl) totalPagesEl.textContent = pdfDoc.numPages;

        if (loadingCard) loadingCard.style.display = 'none';

        // Render initial page
        await renderCurrentPdfPage();
    } catch (err) {
        console.warn('Fast canvas render error:', err);
        switchPdfViewMode('native');
    }
}

async function renderCurrentPdfPage() {
    if (!pdfViewerState.doc) return;
    const canvasArea = document.getElementById('pdf-canvas-area');
    if (!canvasArea) return;

    // Remove previous rendered canvases
    const oldCanvases = canvasArea.querySelectorAll('canvas');
    oldCanvases.forEach(c => c.remove());

    try {
        const page = await pdfViewerState.doc.getPage(pdfViewerState.pageNum);
        const viewport = page.getViewport({ scale: pdfViewerState.scale });

        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-page-canvas';
        const context = canvas.getContext('2d');

        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = Math.floor(viewport.width) + 'px';
        canvas.style.height = Math.floor(viewport.height) + 'px';

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        canvasArea.appendChild(canvas);

        const renderContext = {
            canvasContext: context,
            transform: transform,
            viewport: viewport
        };

        await page.render(renderContext).promise;

        const currEl = document.getElementById('pdf-current-page');
        if (currEl) currEl.textContent = pdfViewerState.pageNum;

        const prevBtn = document.getElementById('pdf-prev-btn');
        const nextBtn = document.getElementById('pdf-next-btn');
        if (prevBtn) prevBtn.disabled = (pdfViewerState.pageNum <= 1);
        if (nextBtn) nextBtn.disabled = (pdfViewerState.pageNum >= pdfViewerState.pageCount);

        const zoomEl = document.getElementById('pdf-zoom-level');
        if (zoomEl) zoomEl.textContent = Math.round(pdfViewerState.scale * 100) + '%';
    } catch (err) {
        console.warn('Page render error:', err);
    }
}

function changePdfPage(delta) {
    if (!pdfViewerState.doc) return;
    const next = pdfViewerState.pageNum + delta;
    if (next >= 1 && next <= pdfViewerState.pageCount) {
        pdfViewerState.pageNum = next;
        renderCurrentPdfPage();
        const canvasArea = document.getElementById('pdf-canvas-area');
        if (canvasArea) canvasArea.scrollTop = 0;
    }
}

function zoomPdf(delta) {
    const next = Math.max(0.6, Math.min(2.5, pdfViewerState.scale + delta));
    pdfViewerState.scale = Math.round(next * 10) / 10;
    renderCurrentPdfPage();
}

function resetPdfZoom() {
    pdfViewerState.scale = 1.2;
    renderCurrentPdfPage();
}

function switchPdfViewMode(mode) {
    pdfViewerState.viewMode = mode;
    const canvasArea = document.getElementById('pdf-canvas-area');
    const nativeArea = document.getElementById('pdf-native-area');
    const btnCanvas = document.getElementById('btn-mode-canvas');
    const btnNative = document.getElementById('btn-mode-native');

    if (mode === 'canvas') {
        if (canvasArea) canvasArea.style.display = 'flex';
        if (nativeArea) nativeArea.style.display = 'none';
        if (btnCanvas) btnCanvas.classList.add('active');
        if (btnNative) btnNative.classList.remove('active');
        if (!pdfViewerState.doc) {
            loadPdfDocument(pdfViewerState.fileUrl);
        }
    } else {
        if (canvasArea) canvasArea.style.display = 'none';
        if (nativeArea) nativeArea.style.display = 'block';
        if (btnCanvas) btnCanvas.classList.remove('active');
        if (btnNative) btnNative.classList.add('active');
    }
}

/* ========================================================
   EXAM COUNTDOWN SYSTEM
======================================================== */
const COUNTDOWN_TARGETS = {
    grade12_national: {
        name: 'Grade 12 National University Entrance Exam',
        date: new Date('2027-07-07T08:30:00+03:00').getTime(),
        desc: 'Ethiopian University Entrance Examination (EUEE)'
    },
    sem1_finals: {
        name: 'Semester 1 Final Examinations',
        date: new Date('2027-01-25T08:30:00+03:00').getTime(),
        desc: 'Blessed G/Michael Catholic Secondary School'
    },
    grade10_regional: {
        name: 'Grade 10 Regional Examination',
        date: new Date('2027-06-01T08:30:00+03:00').getTime(),
        desc: 'Addis Ababa City Regional Examination'
    },
    sem2_finals: {
        name: 'Semester 2 Final Examinations',
        date: new Date('2027-06-15T08:30:00+03:00').getTime(),
        desc: 'Academic Year 2026/2027 Promotion Finals'
    }
};

let currentCountdownTarget = 'grade12_national';
let countdownInterval = null;

function getCountdownTimeRemaining(targetTimestamp) {
    const total = targetTimestamp - Date.now();
    if (total <= 0) {
        return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
}

function renderCountdownWidgetHtml() {
    const target = COUNTDOWN_TARGETS[currentCountdownTarget] || COUNTDOWN_TARGETS.grade12_national;
    const t = getCountdownTimeRemaining(target.date);

    return `
        <div class="exam-countdown-card">
            <div class="countdown-header">
                <div class="countdown-badge">
                    <span class="countdown-pulse-dot"></span> Live Exam Countdown
                </div>
                <select class="countdown-select" onchange="switchCountdownTarget(this.value)" aria-label="Select Target Exam">
                    <option value="grade12_national" ${currentCountdownTarget === 'grade12_national' ? 'selected' : ''}>Grade 12 National University Entrance Exam</option>
                    <option value="sem1_finals" ${currentCountdownTarget === 'sem1_finals' ? 'selected' : ''}>Semester 1 Final Examinations</option>
                    <option value="grade10_regional" ${currentCountdownTarget === 'grade10_regional' ? 'selected' : ''}>Grade 10 Regional Examination</option>
                    <option value="sem2_finals" ${currentCountdownTarget === 'sem2_finals' ? 'selected' : ''}>Semester 2 Final Examinations</option>
                </select>
            </div>

            <div class="countdown-timer-grid">
                <div class="timer-box">
                    <span class="timer-num" id="cd-days">${String(t.days).padStart(2, '0')}</span>
                    <span class="timer-unit">Days</span>
                </div>
                <div class="timer-colon">:</div>
                <div class="timer-box">
                    <span class="timer-num" id="cd-hours">${String(t.hours).padStart(2, '0')}</span>
                    <span class="timer-unit">Hours</span>
                </div>
                <div class="timer-colon">:</div>
                <div class="timer-box">
                    <span class="timer-num" id="cd-mins">${String(t.minutes).padStart(2, '0')}</span>
                    <span class="timer-unit">Minutes</span>
                </div>
                <div class="timer-colon">:</div>
                <div class="timer-box">
                    <span class="timer-num" id="cd-secs">${String(t.seconds).padStart(2, '0')}</span>
                    <span class="timer-unit">Seconds</span>
                </div>
            </div>

            <div class="countdown-footer">
                <div>
                    <strong style="color: #ffffff;">${target.name}</strong>
                    <span style="display: block; font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">${target.desc}</span>
                </div>
                <button class="countdown-action-btn" onclick="setView('studyhub')">
                    ${uiIcon('bookmark', 13)} Open My Study Hub →
                </button>
            </div>
        </div>
    `;
}

function startCountdownLiveTimer() {
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        const daysEl = document.getElementById('cd-days');
        if (!daysEl) {
            clearInterval(countdownInterval);
            countdownInterval = null;
            return;
        }
        const target = COUNTDOWN_TARGETS[currentCountdownTarget] || COUNTDOWN_TARGETS.grade12_national;
        const t = getCountdownTimeRemaining(target.date);
        const hoursEl = document.getElementById('cd-hours');
        const minsEl = document.getElementById('cd-mins');
        const secsEl = document.getElementById('cd-secs');

        if (daysEl) daysEl.textContent = String(t.days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(t.hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(t.minutes).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(t.seconds).padStart(2, '0');
    }, 1000);
}

function switchCountdownTarget(targetKey) {
    if (COUNTDOWN_TARGETS[targetKey]) {
        currentCountdownTarget = targetKey;
        const container = document.querySelector('.exam-countdown-card');
        if (container) {
            container.outerHTML = renderCountdownWidgetHtml();
            startCountdownLiveTimer();
        }
    }
}

/* ========================================================
   STUDENT BOOKMARKS & STUDY HUB SYSTEM
======================================================== */
function getStudyBookmarks() {
    try {
        return JSON.parse(localStorage.getItem('pel_bookmarks') || '[]');
    } catch (_) {
        return [];
    }
}

function saveStudyBookmarks(list) {
    try {
        localStorage.setItem('pel_bookmarks', JSON.stringify(list));
    } catch (_) {}
}

function isExamBookmarked(key) {
    const list = getStudyBookmarks();
    return list.some(b => b.id === key || b.title === key);
}

function toggleBookmarkExam(id, title, grade = '', semester = '', examType = '', subject = '', filePath = '') {
    let list = getStudyBookmarks();
    const key = id || title;
    const existingIdx = list.findIndex(b => b.id === key || b.title === key);

    if (existingIdx >= 0) {
        list.splice(existingIdx, 1);
        saveStudyBookmarks(list);
        showToast(`Removed "${title}" from Study Hub`, 'info');
    } else {
        list.push({
            id: key,
            title,
            grade: grade || 'General',
            semester: semester || 'Standard',
            examType: examType || 'Paper',
            subject: subject || 'General',
            filePath: filePath || '',
            status: 'not_started', // 'not_started', 'in_progress', 'mastered'
            addedAt: new Date().toISOString()
        });
        saveStudyBookmarks(list);
        showToast(`Saved "${title}" to My Study Hub!`, 'success');
    }

    if (state.currentView === 'studyhub') {
        showStudyHubView(false);
    } else {
        const btn = document.getElementById(`btn-bookmark-${key}`);
        if (btn) {
            const isNow = isExamBookmarked(key);
            btn.className = `btn-bookmark ${isNow ? 'bookmarked' : ''}`;
            btn.innerHTML = `${uiIcon(isNow ? 'bookmarkCheck' : 'bookmark', 15)} ${isNow ? 'Saved in My Study Hub ✓' : 'Save to My Study Hub'}`;
        }
    }
}

function updateBookmarkStatus(id, newStatus) {
    let list = getStudyBookmarks();
    const item = list.find(b => b.id === id || b.title === id);
    if (item) {
        item.status = newStatus;
        item.updatedAt = new Date().toISOString();
        saveStudyBookmarks(list);
        showToast(`Updated status to: ${newStatus.replace('_', ' ').toUpperCase()}`, 'info');
        if (state.currentView === 'studyhub') {
            showStudyHubView(false);
        }
    }
}

function showStudyHubView(pushHistory = true) {
    if (pushHistory) {
        pushNavState({ view: 'studyhub' }, 'My Study Hub — Past Exam Library');
    }

    const bookmarks = getStudyBookmarks();
    const total = bookmarks.length;
    const mastered = bookmarks.filter(b => b.status === 'mastered').length;
    const inProgress = bookmarks.filter(b => b.status === 'in_progress').length;
    const notStarted = bookmarks.filter(b => b.status === 'not_started' || !b.status).length;
    const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;

    app.innerHTML = `
        <div class="nav-breadcrumbs-bar">
            <button class="back-button back-button-home" onclick="showLibraryHome()" style="margin: 0; display: inline-flex; align-items: center; gap: 6px;" title="Go back to the website home page where you choose your grade">
                ${uiIcon('home', 14)} Back to Grades (Home)
            </button>
        </div>

        <section class="hero" style="margin-bottom: 24px;">
            <p class="label">Personal Revision Dashboard</p>
            <h1>My Study <span>Hub</span></h1>
            <p class="description">
                Organize your targeted examination papers, monitor your revision checklist, and track exam readiness.
            </p>
        </section>

        <!-- Live Countdown Widget -->
        ${renderCountdownWidgetHtml()}

        <!-- Progress Overview Card -->
        <div class="stat-card" style="margin-bottom: 24px; border-left: 4px solid #6366f1; padding: 22px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 8px;">
                <div>
                    <h3 style="font-size: 18px; color: #ffffff; margin: 0 0 4px 0;">Target Revision Progress</h3>
                    <p style="font-size: 13.5px; color: var(--text-muted); margin: 0;">
                        ${mastered} of ${total} saved examination papers mastered
                    </p>
                </div>
                <div style="font-size: 26px; font-weight: 800; color: #a5b4fc;">${percent}%</div>
            </div>

            <div class="study-progress-bar-wrap">
                <div class="study-progress-bar-fill" style="width: ${percent}%;"></div>
            </div>

            <div style="display: flex; gap: 14px; flex-wrap: wrap; margin-top: 10px;">
                <span class="status-badge mastered">${mastered} Mastered</span>
                <span class="status-badge in_progress">${inProgress} In Review</span>
                <span class="status-badge not_started">${notStarted} Not Started</span>
            </div>
        </div>

        <!-- Bookmarked Papers Grid -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
            <h3 style="font-size: 20px; color: #ffffff; margin: 0;">Saved Examination Papers (${total})</h3>
            <button class="btn-secondary" style="font-size: 13px; padding: 7px 14px; display: inline-flex; align-items: center; gap: 6px;" onclick="showLibraryHome()">
                ${uiIcon('book', 14)} Browse More Papers
            </button>
        </div>

        ${total === 0 ? `
            <div style="text-align: center; padding: 50px 20px; background: var(--surface-glass); border: 1px dashed var(--border-glass); border-radius: 16px;">
                <div style="width: 54px; height: 54px; border-radius: 50%; background: rgba(99, 102, 241, 0.15); display: inline-flex; align-items: center; justify-content: center; color: #818cf8; margin-bottom: 14px;">
                    ${uiIcon('bookmark', 24)}
                </div>
                <h4 style="font-size: 18px; color: #ffffff; margin-bottom: 6px;">No saved papers in your hub yet</h4>
                <p style="color: var(--text-muted); font-size: 14px; max-width: 440px; margin: 0 auto 18px; line-height: 1.5;">
                    While browsing through grades and subjects, tap the <strong>"Save to Study Hub"</strong> button on any paper to build your personal revision schedule.
                </p>
                <button class="btn-primary" style="padding: 10px 22px; font-size: 14px;" onclick="showLibraryHome()">
                    Explore Exam Papers Now →
                </button>
            </div>
        ` : `
            <div class="study-hub-grid">
                ${bookmarks.map(b => `
                    <div class="study-card status-${b.status || 'not_started'}">
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
                                <span class="badge badge-blue">${b.grade} • ${b.subject}</span>
                                <button class="btn-icon" onclick="toggleBookmarkExam('${b.id}', '${escapeQuotes(b.title)}')" title="Remove from Study Hub" style="color: var(--text-muted); padding: 4px;">
                                    ${uiIcon('trash', 14)}
                                </button>
                            </div>
                            <h4 style="font-size: 17px; color: #ffffff; margin-bottom: 4px; font-weight: 700;">${b.title}</h4>
                            <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 14px;">${b.semester} • ${b.examType}</p>
                        </div>

                        <div>
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 8px; padding: 6px 10px;">
                                <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Status:</span>
                                <select class="admin-select" style="margin: 0; padding: 4px 8px; font-size: 12px; width: auto; flex: 1;" onchange="updateBookmarkStatus('${b.id}', this.value)">
                                    <option value="not_started" ${b.status === 'not_started' || !b.status ? 'selected' : ''}>⚪ Not Started</option>
                                    <option value="in_progress" ${b.status === 'in_progress' ? 'selected' : ''}>🟡 In Review / Studying</option>
                                    <option value="mastered" ${b.status === 'mastered' ? 'selected' : ''}>🟢 Mastered & Ready</option>
                                </select>
                            </div>

                            <div style="display: flex; gap: 8px;">
                                <button class="btn-secondary" style="flex: 1; padding: 8px 10px; font-size: 12.5px; justify-content: center; display: inline-flex; align-items: center; gap: 5px;" 
                                        onclick="showExamHub('${b.grade}', '${b.semester}', '${b.examType}', '${escapeQuotes(b.subject)}', '${b.filePath}', '${escapeQuotes(b.title)}', () => showStudyHubView())">
                                    ${uiIcon('target', 13)} Practice
                                </button>
                                <button class="btn-primary" style="flex: 1; padding: 8px 10px; font-size: 12.5px; justify-content: center; display: inline-flex; align-items: center; gap: 5px;" 
                                        onclick="downloadExamPaper('${b.filePath}', '${escapeQuotes(b.title)}.pdf', { grade: '${b.grade}', subject: '${escapeQuotes(b.subject)}', examTitle: '${escapeQuotes(b.title)}' })">
                                    ${uiIcon('download', 13)} Download
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `}
    `;

    startCountdownLiveTimer();
}

/* ========================================================
   FORMULA SHEETS & QUICK REVISION REFERENCE
======================================================== */
const FORMULA_DATA = {
    "math": [
        {
            "title": "Quadratic Formula & Discriminant",
            "topic": "Algebra & Polynomials",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "x = (-b ± √(b² - 4ac)) / (2a)   |   Δ = b² - 4ac",
            "variables": "a, b, c = coefficients in ax² + bx + c = 0, Δ = discriminant",
            "tip": "Δ > 0: two distinct real roots; Δ = 0: one repeated real root; Δ < 0: no real roots (two complex conjugate roots)."
        },
        {
            "title": "Coordinate Geometry: Distance, Midpoint & Slope",
            "topic": "Analytic Geometry",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "d = √[(x₂ - x₁)² + (y₂ - y₁)²]   |   M = ((x₁ + x₂)/2, (y₁ + y₂)/2)   |   m = (y₂ - y₁) / (x₂ - x₁) = tan θ",
            "variables": "(x₁, y₁) and (x₂, y₂) = coordinates of two points, m = gradient/slope, θ = inclination angle",
            "tip": "Parallel lines have identical slopes (m₁ = m₂). Perpendicular lines have negative reciprocal slopes (m₁ · m₂ = -1)."
        },
        {
            "title": "Equations of Straight Lines",
            "topic": "Analytic Geometry",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Slope-Intercept: y = mx + b   |   Point-Slope: y - y₁ = m(x - x₁)   |   General: Ax + By + C = 0",
            "variables": "m = slope, b = y-intercept (0, b), (x₁, y₁) = known point on line",
            "tip": "Distance from point (x₀, y₀) to line Ax + By + C = 0 is d = |Ax₀ + By₀ + C| / √(A² + B²)."
        },
        {
            "title": "Laws of Exponents & Logarithms",
            "topic": "Exponentials & Logarithms",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "log_b(xy) = log_b(x) + log_b(y)   |   log_b(x/y) = log_b(x) - log_b(y)   |   log_b(xᵏ) = k·log_b(x)   |   Change of base: log_b(x) = ln(x) / ln(b)",
            "variables": "b > 0 (b ≠ 1) = base, x, y > 0 = arguments, k = real exponent",
            "tip": "Natural log ln(x) uses base e ≈ 2.71828. Remember: log_b(1) = 0 and log_b(b) = 1."
        },
        {
            "title": "Standard Equation of a Circle",
            "topic": "Conic Sections",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "(x - h)² + (y - k)² = r²   |   General: x² + y² + 2gx + 2fy + c = 0",
            "variables": "(h, k) = center coordinates, r = radius (r > 0). In general form: Center = (-g, -f), r = √(g² + f² - c)",
            "tip": "If g² + f² - c < 0, the equation represents no real circle. If = 0, it represents a single point."
        },
        {
            "title": "Conic Sections: Parabola & Ellipse",
            "topic": "Conic Sections",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Parabola: (y - k)² = 4p(x - h)   |   Ellipse: (x - h)²/a² + (y - k)²/b² = 1   (c² = a² - b²)",
            "variables": "(h, k) = vertex or center, p = focal length, a = semi-major axis, b = semi-minor axis, c = focal distance",
            "tip": "Eccentricity of an ellipse is e = c/a (0 < e < 1). For a parabola, eccentricity e = 1."
        },
        {
            "title": "Arithmetic Progression (AP)",
            "topic": "Sequences & Series",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "aₙ = a₁ + (n - 1)d   |   Sₙ = (n/2)[2a₁ + (n - 1)d] = (n/2)(a₁ + aₙ)",
            "variables": "a₁ = first term, d = common difference, n = term index, Sₙ = sum of first n terms",
            "tip": "Common difference d is obtained by subtracting any term from the next: d = aₙ - aₙ₋₁."
        },
        {
            "title": "Geometric Progression (GP)",
            "topic": "Sequences & Series",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "aₙ = a₁ · rⁿ⁻¹   |   Sₙ = a₁(1 - rⁿ) / (1 - r)   |   S_∞ = a₁ / (1 - r)   (|r| < 1)",
            "variables": "a₁ = first term, r = common ratio, S_∞ = sum to infinity (convergent only if |r| < 1)",
            "tip": "An infinite GP only converges when |r| < 1. If |r| ≥ 1, the sum diverges."
        },
        {
            "title": "Fundamental Trigonometric Identities",
            "topic": "Trigonometry",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "sin²θ + cos²θ = 1   |   1 + tan²θ = sec²θ   |   1 + cot²θ = csc²θ",
            "variables": "θ = angle in radians or degrees, tan θ = sin θ / cos θ, sec θ = 1/cos θ, csc θ = 1/sin θ",
            "tip": "Divide sin²θ + cos²θ = 1 by cos²θ to get 1 + tan²θ = sec²θ instantly."
        },
        {
            "title": "Compound Angle / Addition Formulas",
            "topic": "Trigonometry",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "sin(A ± B) = sin A cos B ± cos A sin B   |   cos(A ± B) = cos A cos B ∓ sin A sin B",
            "variables": "A, B = real angles in radians or degrees",
            "tip": "Notice the sign flip for cosine: cos(A + B) has a minus sign, while cos(A - B) has a plus sign."
        },
        {
            "title": "Double-Angle Formulas",
            "topic": "Trigonometry",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "sin(2θ) = 2 sin θ cos θ   |   cos(2θ) = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ",
            "variables": "θ = acute or general angle",
            "tip": "Essential for national exam calculus integrations: cos²θ = (1 + cos 2θ)/2 and sin²θ = (1 - cos 2θ)/2."
        },
        {
            "title": "Law of Sines & Law of Cosines",
            "topic": "Trigonometry & Geometry",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "a/sin(A) = b/sin(B) = c/sin(C) = 2R   |   c² = a² + b² - 2ab·cos(C)",
            "variables": "a, b, c = opposite side lengths; A, B, C = interior angles; R = circumradius",
            "tip": "Use Cosine law when 2 sides and the included angle (SAS) or all 3 sides (SSS) are known."
        },
        {
            "title": "Vectors in 2D & 3D: Magnitude, Dot & Cross Product",
            "topic": "Vectors",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "|u| = √(u₁² + u₂² + u₃²)   |   u · v = |u||v|cos θ = u₁v₁ + u₂v₂ + u₃v₃   |   |u × v| = |u||v|sin θ",
            "variables": "u, v = vectors, θ = angle between vectors, u · v = scalar dot product, u × v = vector cross product",
            "tip": "Two non-zero vectors are perpendicular if and only if their dot product u · v = 0."
        },
        {
            "title": "Matrices & 2×2 Determinants and Inverses",
            "topic": "Matrices & Linear Systems",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "det(A) = ad - bc   |   A⁻¹ = (1 / det(A)) · [[d, -b], [-c, a]]   (det(A) ≠ 0)",
            "variables": "A = [[a, b], [c, d]], det(A) = ad - bc = scalar determinant",
            "tip": "A matrix is invertible (non-singular) if and only if det(A) ≠ 0. If det(A) = 0, no inverse exists."
        },
        {
            "title": "Limits & Special Trigonometric Limits",
            "topic": "Calculus (Limits)",
            "grades": [
                "Grade12"
            ],
            "displayMath": "lim(x→0) [sin(x) / x] = 1   |   lim(x→0) [(1 - cos x) / x] = 0   |   lim(x→0) (1 + x)^(1/x) = e",
            "variables": "x = variable approaching target limit, e ≈ 2.71828",
            "tip": "For 0/0 or ∞/∞ indeterminate forms in national exams, apply L'Hôpital's Rule: lim [f(x)/g(x)] = lim [f'(x)/g'(x)]."
        },
        {
            "title": "Derivatives of Standard Functions",
            "topic": "Calculus (Differentiation)",
            "grades": [
                "Grade12"
            ],
            "displayMath": "d/dx[xⁿ] = n·xⁿ⁻¹   |   d/dx[sin x] = cos x   |   d/dx[cos x] = -sin x   |   d/dx[eᵏˣ] = k·eᵏˣ   |   d/dx[ln x] = 1/x",
            "variables": "n = power, k = constant, x > 0 for ln x",
            "tip": "Chain Rule: d/dx[f(g(x))] = f'(g(x)) · g'(x). Always multiply by the derivative of the inside."
        },
        {
            "title": "Product, Quotient & Chain Rules",
            "topic": "Calculus (Differentiation)",
            "grades": [
                "Grade12"
            ],
            "displayMath": "(u·v)' = u'v + uv'   |   (u/v)' = (u'v - uv') / v²   |   dy/dx = (dy/du) · (du/dx)",
            "variables": "u = u(x), v = v(x) differentiable functions, v ≠ 0",
            "tip": "Remember: quotient rule numerator has a minus sign, and denominator is v²."
        },
        {
            "title": "Tangent Line & Extreme Values (Optimization)",
            "topic": "Calculus (Applications)",
            "grades": [
                "Grade12"
            ],
            "displayMath": "Tangent: y - y₀ = f'(x₀)(x - x₀)   |   Critical points: f'(x) = 0 or undefined",
            "variables": "x₀ = point of tangency, f'(x₀) = slope of tangent line",
            "tip": "Second derivative test: If f'(c) = 0 and f''(c) > 0, local minimum. If f''(c) < 0, local maximum."
        },
        {
            "title": "Standard Integration Formulas",
            "topic": "Calculus (Integration)",
            "grades": [
                "Grade12"
            ],
            "displayMath": "∫ xⁿ dx = (xⁿ⁺¹)/(n + 1) + C  (n ≠ -1)   |   ∫ (1/x) dx = ln|x| + C   |   ∫ eᵏˣ dx = (1/k)eᵏˣ + C",
            "variables": "C = constant of integration",
            "tip": "Definite integrals: ∫ₐᵇ f(x) dx = F(b) - F(a). For areas under curves, verify boundaries."
        },
        {
            "title": "Permutations & Combinations",
            "topic": "Probability & Combinatorics",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "P(n, r) = n! / (n - r)!   |   C(n, r) = n! / [r! · (n - r)!]",
            "variables": "n = total distinct items, r = items chosen. Note: 0! = 1",
            "tip": "Permutation: ORDER matters (ranking, codes). Combination: ORDER does not matter (groups, committees)."
        },
        {
            "title": "Probability & Conditional Probability",
            "topic": "Probability",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)   |   P(A | B) = P(A ∩ B) / P(B)   (P(B) > 0)",
            "variables": "P(A) = probability of event A, P(A ∩ B) = joint probability, P(A | B) = conditional probability",
            "tip": "If events A and B are mutually exclusive, P(A ∩ B) = 0. If independent, P(A ∩ B) = P(A) · P(B)."
        },
        {
            "title": "Binomial Expansion Theorem",
            "topic": "Algebra & Series",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "(a + b)ⁿ = Σₖ₌₀ⁿ [C(n, k) · aⁿ⁻ᵏ · bᵏ]",
            "variables": "n = non-negative integer power, C(n, k) = n! / [k!(n - k)!] binomial coefficients",
            "tip": "The general (r + 1)-th term in the expansion is T_(r+1) = C(n, r) · aⁿ⁻ʳ · bʳ."
        },
        {
            "title": "Descriptive Statistics: Mean, Variance & Standard Deviation",
            "topic": "Statistics",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Mean x̄ = (Σ xᵢ) / n   |   Variance s² = Σ (xᵢ - x̄)² / (n - 1)   |   Standard Deviation s = √(s²)",
            "variables": "xᵢ = individual data values, n = sample size, x̄ = sample arithmetic mean",
            "tip": "Standard deviation measures the average dispersion or spread of data points from the arithmetic mean."
        }
    ],
    "physics": [
        {
            "title": "Universal Physical Constants",
            "topic": "Reference Constants",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "g = 9.8 m/s²  |  c = 3.00×10⁸ m/s  |  G = 6.674×10⁻¹¹ N·m²/kg²  |  e = 1.602×10⁻¹⁹ C",
            "variables": "kₑ = 8.988×10⁹ N·m²/C², h = 6.626×10⁻³⁴ J·s, mₑ = 9.109×10⁻³¹ kg, R = 8.314 J/(mol·K)",
            "tip": "Standard constants used across all Ethiopian high school national physics examinations."
        },
        {
            "title": "Equations of Uniformly Accelerated Motion",
            "topic": "Mechanics (Kinematics)",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "v = u + at   |   s = ut + ½at²   |   v² = u² + 2as   |   s = [(u + v)/2]·t",
            "variables": "u = initial velocity, v = final velocity, a = constant acceleration, t = time, s = displacement",
            "tip": "For dropped bodies: u = 0, a = g = 9.8 m/s². For vertical projection: at top, v = 0."
        },
        {
            "title": "Projectile Motion Equations",
            "topic": "Mechanics (2D Kinematics)",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "T = (2u·sin θ) / g   |   H_max = (u²·sin²θ) / (2g)   |   R = (u²·sin 2θ) / g",
            "variables": "u = launch speed, θ = projection angle above horizontal, g = 9.8 m/s²",
            "tip": "Maximum range occurs at θ = 45°. Complementary angles (e.g. 30° and 60°) achieve identical horizontal ranges."
        },
        {
            "title": "Newton's Laws & Friction Force",
            "topic": "Mechanics (Dynamics)",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "ΣF = m·a   |   f_s ≤ μ_s·N   |   f_k = μ_k·N",
            "variables": "F = net force (N), m = mass (kg), a = acceleration (m/s²), μ = friction coefficient, N = normal reaction force",
            "tip": "Static friction coefficient μ_s is always greater than or equal to kinetic friction coefficient μ_k."
        },
        {
            "title": "Centripetal Acceleration & Force",
            "topic": "Circular Motion",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "a_c = v² / r = ω²r   |   F_c = (m·v²) / r = m·ω²r   |   v = ω·r",
            "variables": "v = tangential linear velocity, r = radius of circle, ω = angular velocity (rad/s), m = mass",
            "tip": "Centripetal force is always directed toward the center of the circular curve, perpendicular to linear velocity."
        },
        {
            "title": "Newton's Law of Universal Gravitation",
            "topic": "Gravitation",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "F = G · (m₁m₂) / r²   |   g = G·M / R²   |   Orbital Speed: v = √(G·M / r)",
            "variables": "G = 6.674×10⁻¹¹ N·m²/kg², m₁, m₂ = masses, r = separation distance, M = mass of planet, R = radius",
            "tip": "Kepler's Third Law: T² / r³ = constant = 4π² / (GM) for all bodies orbiting the same central mass."
        },
        {
            "title": "Linear Momentum & Impulse",
            "topic": "Mechanics (Momentum)",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "p = m·v   |   Impulse J = F·Δt = Δp = m(v - u)   |   Conservation: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂",
            "variables": "p = momentum (kg·m/s), J = impulse (N·s), F = impact force, Δt = collision contact time",
            "tip": "In an elastic collision, both linear momentum AND kinetic energy are conserved. In inelastic, KE is lost."
        },
        {
            "title": "Work-Energy Theorem & Power",
            "topic": "Mechanics (Work & Energy)",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "W = F·d·cos θ = ΔK   |   K = ½mv²   |   PE = mgh   |   Power P = W/t = F·v",
            "variables": "W = work (J), K = kinetic energy, PE = gravitational potential energy, P = power (Watts)",
            "tip": "Work is zero when force is perpendicular to motion (θ = 90°, cos 90° = 0), like in uniform circular motion."
        },
        {
            "title": "Rotational Dynamics & Torque",
            "topic": "Rotational Motion",
            "grades": [
                "Grade12"
            ],
            "displayMath": "τ = r·F·sin θ = I·α   |   L = I·ω   |   K_rot = ½Iω²",
            "variables": "τ = torque (N·m), I = moment of inertia (kg·m²), α = angular acceleration (rad/s²), L = angular momentum",
            "tip": "Conservation of angular momentum: when net external torque Στ = 0, I₁ω₁ = I₂ω₂."
        },
        {
            "title": "Hooke's Law & Simple Harmonic Motion (SHM)",
            "topic": "Oscillations",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "F = -kx   |   Spring: T = 2π√(m / k)   |   Simple Pendulum: T = 2π√(L / g)   |   f = 1 / T",
            "variables": "k = spring stiffness constant (N/m), x = displacement, T = period of oscillation (s), L = pendulum length",
            "tip": "The period of a simple pendulum depends only on length L and gravitational field g; mass has NO effect."
        },
        {
            "title": "Wave Mechanics & Sound Intensity",
            "topic": "Waves & Sound",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "v = f·λ   |   Intensity I = P / (4πr²)   |   Sound Level β = 10 · log₁₀(I / I₀)",
            "variables": "v = wave propagation speed, f = frequency (Hz), λ = wavelength (m), I₀ = 10⁻¹² W/m² (hearing threshold)",
            "tip": "An increase of 10 dB corresponds to a 10-fold increase in sound intensity (logarithmic decibel scale)."
        },
        {
            "title": "Doppler Effect for Sound Waves",
            "topic": "Waves & Sound",
            "grades": [
                "Grade12"
            ],
            "displayMath": "f' = f · [(v ± v_o) / (v ∓ v_s)]",
            "variables": "f = source frequency, f' = observed frequency, v = speed of sound in air, v_o = observer speed, v_s = source speed",
            "tip": "Top sign (+ / -) when observer moves toward source. Bottom sign (- / +) when source moves toward observer."
        },
        {
            "title": "Fluid Statics: Pressure, Pascal & Archimedes",
            "topic": "Properties of Matter",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11"
            ],
            "displayMath": "P = F / A   |   P = P₀ + ρgh   |   Buoyant Force F_b = ρ_fluid · V_sub · g",
            "variables": "P = pressure (Pa or N/m²), ρ = fluid density (kg/m³), h = depth, V_sub = submerged volume",
            "tip": "Archimedes' principle: upward buoyant force equals the exact weight of the displaced volume of fluid."
        },
        {
            "title": "Fluid Dynamics: Continuity & Bernoulli's Equation",
            "topic": "Fluid Mechanics",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Continuity: A₁v₁ = A₂v₂   |   Bernoulli: P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂",
            "variables": "A = pipe cross-sectional area, v = fluid flow speed, P = fluid static pressure, ρ = fluid density",
            "tip": "Bernoulli effect: where fluid flow speed increases, internal static fluid pressure decreases."
        },
        {
            "title": "Heat Capacity & Latent Heat",
            "topic": "Thermal Physics",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11"
            ],
            "displayMath": "Q = m·c·ΔT   |   Q_phase = m·L   |   First Law: ΔU = Q - W",
            "variables": "Q = heat energy (J), m = mass (kg), c = specific heat capacity, L = latent heat of fusion/vaporization",
            "tip": "During a phase change (melting, boiling), temperature remains completely constant while latent heat is absorbed."
        },
        {
            "title": "Coulomb's Law, Electric Fields & Potential",
            "topic": "Electrostatics",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "F = kₑ·|q₁q₂| / r²   |   E = kₑ·|Q| / r²   |   V = kₑ·Q / r   |   W = q·ΔV",
            "variables": "kₑ = 8.99×10⁹ N·m²/C², q = electric charge (C), r = distance (m), E = electric field (N/C), V = potential (V)",
            "tip": "Electric field lines point away from positive charges and terminate radially inward toward negative charges."
        },
        {
            "title": "Capacitance & Stored Electrical Energy",
            "topic": "Electrostatics",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "C = Q / V = (ε₀·A) / d   |   U = ½CV² = ½QV = Q² / (2C)",
            "variables": "C = capacitance (Farads), A = plate area, d = plate separation, ε₀ = 8.854×10⁻¹² F/m, U = potential energy (J)",
            "tip": "Capacitors in parallel: C_eq = C₁ + C₂. Capacitors in series: 1/C_eq = 1/C₁ + 1/C₂."
        },
        {
            "title": "Ohm's Law, Resistors & Electric Power",
            "topic": "Current Electricity",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "V = I·R   |   R = ρ·(L / A)   |   P = I·V = I²R = V²/R   |   R_series = Σ Rᵢ   |   1/R_parallel = Σ (1/Rᵢ)",
            "variables": "V = voltage (V), I = current (A), R = resistance (Ω), ρ = resistivity (Ω·m), L = wire length, A = cross-section",
            "tip": "In parallel connections: voltage is equal across all branches. In series: current is equal through all elements."
        },
        {
            "title": "Kirchhoff's Circuit Laws",
            "topic": "DC Circuits",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Junction Rule: Σ I_in = Σ I_out   |   Loop Rule: Σ ΔV = 0 (around any closed loop)",
            "variables": "I = electric current at a junction node, ΔV = potential drops and EMF gains around a complete loop",
            "tip": "Junction rule is conservation of electric charge. Loop rule is conservation of electrical energy."
        },
        {
            "title": "Magnetic Force on Moving Charges & Currents",
            "topic": "Electromagnetism",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "F = q·v·B·sin θ   |   F = I·L·B·sin θ   |   Straight Wire Field: B = (μ₀·I) / (2πr)",
            "variables": "B = magnetic flux density (Tesla), v = particle velocity, L = conductor length, μ₀ = 4π×10⁻⁷ T·m/A",
            "tip": "Use Right Hand Rule: thumb points in velocity/current, index along magnetic field B, palm pushes in force direction."
        },
        {
            "title": "Faraday's Law of Induction & Transformers",
            "topic": "Electromagnetism",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Induced EMF: ε = -N · (ΔΦ / Δt)   |   Φ = B·A·cos θ   |   Transformer: V_s / V_p = N_s / N_p = I_p / I_s",
            "variables": "ε = induced electromotive force (V), Φ = magnetic flux (Weber), N = number of coil turns",
            "tip": "Lenz's Law (minus sign): the induced current always flows to produce a magnetic field that opposes the flux change."
        },
        {
            "title": "Snell's Law & Thin Lens Equation",
            "topic": "Waves & Optics",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "n₁·sin θ₁ = n₂·sin θ₂   |   sin θ_c = n₂/n₁ (n₁ > n₂)   |   1/f = 1/d_o + 1/d_i   |   m = -d_i / d_o",
            "variables": "n = refractive index, θ_c = critical angle, f = focal length, d_o = object distance, d_i = image distance",
            "tip": "Total internal reflection requires light traveling from denser to rarer medium with angle exceeding θ_c."
        },
        {
            "title": "Young's Double Slit Wave Interference",
            "topic": "Physical Optics",
            "grades": [
                "Grade12"
            ],
            "displayMath": "Bright Fringes (Maxima): d·sin θ = m·λ   |   Dark Fringes: d·sin θ = (m + ½)·λ   |   y_m ≈ (m·λ·L) / d",
            "variables": "d = slit separation distance, m = order number (0, 1, 2...), λ = wavelength, L = distance to screen",
            "tip": "Young's experiment is the classic proof of the wave nature of light. Increasing slit separation decreases fringe width."
        },
        {
            "title": "Photoelectric Effect & Quantum Physics",
            "topic": "Modern Physics",
            "grades": [
                "Grade12"
            ],
            "displayMath": "E = hf = hc / λ   |   K_max = hf - Φ = e·V_s   |   de Broglie λ = h / p = h / (mv)",
            "variables": "h = 6.63×10⁻³⁴ J·s, f = frequency (Hz), Φ = work function, V_s = stopping potential",
            "tip": "Increasing light intensity increases electron emission rate, but does NOT increase maximum kinetic energy."
        },
        {
            "title": "Radioactive Decay Law & Nuclear Half-Life",
            "topic": "Nuclear Physics",
            "grades": [
                "Grade12"
            ],
            "displayMath": "N(t) = N₀ · e^(-λt) = N₀ · (½)^(t / T_½)   |   T_½ = ln(2) / λ ≈ 0.693 / λ",
            "variables": "N₀ = initial number of radioactive nuclei, N(t) = remaining nuclei at time t, λ = decay constant, T_½ = half-life",
            "tip": "Mass-energy equivalence: E = (Δm)·c², where Δm is mass defect in nuclear fission and fusion reactions."
        }
    ],
    "chem": [
        {
            "title": "Mole Concept & Stoichiometry",
            "topic": "Stoichiometry",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "n = m / M = N / N_A = V_gas / 22.4L (at STP)",
            "variables": "n = number of moles, m = mass (g), M = molar mass (g/mol), N_A = 6.022×10²³ particles/mol",
            "tip": "At Standard Temperature and Pressure (STP: 0°C, 1 atm), exactly 1 mole of any ideal gas occupies 22.4 Liters."
        },
        {
            "title": "Percentage Composition & Empirical Formula",
            "topic": "Chemical Calculations",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "% element = [(n · M_element) / M_compound] × 100%   |   Molecular formula = (Empirical formula)ₙ",
            "variables": "n = number of atoms of element in formula unit, M = molar mass",
            "tip": "To find empirical formula: convert grams to moles, then divide all mole amounts by the smallest mole value."
        },
        {
            "title": "Theoretical Yield & Percentage Yield",
            "topic": "Stoichiometry",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "% Yield = (Actual Experimental Yield / Theoretical Yield) × 100%",
            "variables": "Actual yield = mass obtained in laboratory, Theoretical yield = stoichiometric maximum calculated from limiting reactant",
            "tip": "The limiting reactant is completely consumed first and determines the theoretical yield of product."
        },
        {
            "title": "Gas Laws: Boyle, Charles & Combined Gas Law",
            "topic": "States of Matter (Gases)",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Boyle: P₁V₁ = P₂V₂   |   Charles: V₁/T₁ = V₂/T₂   |   Combined: (P₁V₁) / T₁ = (P₂V₂) / T₂",
            "variables": "P = pressure (atm/kPa), V = volume (L), T = absolute temperature in Kelvin (K = °C + 273.15)",
            "tip": "Temperature in all gas calculations MUST be in Kelvin. Absolute zero is 0 K (-273.15°C)."
        },
        {
            "title": "Ideal Gas Law & Gas Density",
            "topic": "States of Matter (Gases)",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "PV = nRT   |   Molar Mass M = (d·R·T) / P   |   Density d = (P·M) / (R·T)",
            "variables": "R = 0.0821 L·atm/(mol·K) = 8.314 J/(mol·K), d = density (g/L), M = molar mass (g/mol)",
            "tip": "Remember to match units: if using R = 0.0821, pressure must be in atm and volume in Liters."
        },
        {
            "title": "Dalton's Partial Pressures & Graham's Effusion",
            "topic": "States of Matter (Gases)",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "P_total = Σ Pᵢ   |   P_A = X_A · P_total   |   Graham: Rate₁ / Rate₂ = √(M₂ / M₁)",
            "variables": "P_A = partial pressure of gas A, X_A = mole fraction of A = n_A / n_total, M = molar mass",
            "tip": "Lighter gases (lower molar mass) effuse and diffuse significantly faster than heavier gases."
        },
        {
            "title": "Solution Concentrations: Molarity, Molality & Mole Fraction",
            "topic": "Solutions",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Molarity M = n_solute / V_solution(L)   |   Molality m = n_solute / kg_solvent   |   Mole Fraction X_A = n_A / n_total",
            "variables": "n = moles of solute, V = volume in Liters, kg_solvent = mass of solvent in kilograms",
            "tip": "Molality is independent of temperature changes because mass does not change with expansion/contraction."
        },
        {
            "title": "Dilution Formula & Mass Percent",
            "topic": "Solutions",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Dilution: M₁V₁ = M₂V₂   |   Mass % = (mass of solute / total mass of solution) × 100%",
            "variables": "M₁ = initial stock concentration, V₁ = initial volume needed, M₂ = target concentration, V₂ = final volume",
            "tip": "During dilution, the total amount of solute moles remains constant: n₁ = n₂."
        },
        {
            "title": "Colligative Properties: Boiling & Freezing Shifts",
            "topic": "Solutions & Colligative Properties",
            "grades": [
                "Grade12"
            ],
            "displayMath": "Boiling Elevation: ΔT_b = i · K_b · m   |   Freezing Depression: ΔT_f = i · K_f · m",
            "variables": "i = van 't Hoff factor (ions per formula unit), K_b = ebullioscopic constant, K_f = cryoscopic constant, m = molality",
            "tip": "For non-electrolytes (e.g. glucose, urea): i = 1. For NaCl: i ≈ 2. For CaCl₂: i ≈ 3."
        },
        {
            "title": "Colligative Properties: Raoult's Law & Osmotic Pressure",
            "topic": "Solutions & Colligative Properties",
            "grades": [
                "Grade12"
            ],
            "displayMath": "Vapour Lowering: P_solution = X_solvent · P°_solvent   |   Osmotic Pressure: Π = i · M · R · T",
            "variables": "P° = pure solvent vapour pressure, X = mole fraction, Π = osmotic pressure (atm), M = molarity, T = Kelvin",
            "tip": "Osmotic pressure is widely tested in national exams for determining the molar mass of biomolecules and polymers."
        },
        {
            "title": "Chemical Reaction Rates & Differential Rate Laws",
            "topic": "Chemical Kinetics",
            "grades": [
                "Grade12"
            ],
            "displayMath": "Rate = k [A]ᵐ [B]ⁿ   |   Overall order = m + n",
            "variables": "k = specific rate constant, [A], [B] = molar concentrations, m, n = reaction orders (determined experimentally)",
            "tip": "Reaction orders m and n CANNOT be deduced from stoichiometric reaction coefficients; they must be found experimentally."
        },
        {
            "title": "Arrhenius Equation & Activation Energy",
            "topic": "Chemical Kinetics",
            "grades": [
                "Grade12"
            ],
            "displayMath": "k = A · e^(-E_a / (RT))   |   ln(k₂ / k₁) = (E_a / R) · [1/T₁ - 1/T₂]",
            "variables": "k = rate constant, A = frequency factor, E_a = activation energy (J/mol), R = 8.314 J/(mol·K), T = Kelvin",
            "tip": "A catalyst provides an alternative reaction pathway with lower activation energy E_a, thereby increasing rate constant k."
        },
        {
            "title": "Equilibrium Constant (Kc & Kp)",
            "topic": "Chemical Equilibrium",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "aA + bB ⇌ cC + dD  ⇒  K_c = [C]ᶜ[D]ᵈ / ([A]ᵃ[B]ᵇ)   |   K_p = K_c(RT)^Δn",
            "variables": "[] = molar concentrations at equilibrium, Δn = (moles gas products) - (moles gas reactants)",
            "tip": "Pure solids (s) and pure liquids (l) are omitted from equilibrium constant expressions."
        },
        {
            "title": "Reaction Quotient (Qc) & Le Chatelier's Principle",
            "topic": "Chemical Equilibrium",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Q_c < K_c: shifts right (forward)   |   Q_c = K_c: at equilibrium   |   Q_c > K_c: shifts left (reverse)",
            "variables": "Q_c = reaction quotient calculated using instantaneous non-equilibrium concentrations",
            "tip": "Increasing pressure shifts equilibrium toward the side with fewer gas moles. Temperature change alters value of K_c."
        },
        {
            "title": "pH, pOH & Self-Ionization of Water",
            "topic": "Acids, Bases & Solutions",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "pH = -log[H⁺]   |   pOH = -log[OH⁻]   |   pH + pOH = 14   |   K_w = [H⁺][OH⁻] = 1.0×10⁻¹⁴ (25°C)",
            "variables": "[H⁺] = hydrogen ion concentration (M), [OH⁻] = hydroxide ion concentration (M)",
            "tip": "Neutral solution at 25°C has pH = 7. Acidic: pH < 7. Basic/Alkaline: pH > 7."
        },
        {
            "title": "Acid & Base Dissociation Constants (Ka & Kb)",
            "topic": "Acids and Bases",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "K_a = ([H⁺][A⁻]) / [HA]   |   K_b = ([BH⁺][OH⁻]) / [B]   |   K_a · K_b = K_w = 1.0×10⁻¹⁴   |   pK_a = -log(K_a)",
            "variables": "HA = weak acid, B = weak base, pK_a + pK_b = 14",
            "tip": "The stronger the acid, the larger its K_a value and the smaller its pK_a value."
        },
        {
            "title": "Buffer Solutions & Henderson-Hasselbalch Equation",
            "topic": "Acids, Bases & Solutions",
            "grades": [
                "Grade12"
            ],
            "displayMath": "pH = pK_a + log([Conjugate Base] / [Weak Acid])   |   pOH = pK_b + log([Conjugate Acid] / [Weak Base])",
            "variables": "pK_a = -log(K_a), [A⁻] = concentration of conjugate base salt, [HA] = weak acid concentration",
            "tip": "A buffer resists changes in pH when small amounts of acid or base are added. Optimal buffering occurs when [Base] = [Acid]."
        },
        {
            "title": "Hess's Law & Standard Enthalpy of Reaction",
            "topic": "Chemical Thermodynamics",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "ΔH°_rxn = Σ nΔH°_f(products) - Σ mΔH°_f(reactants)   |   ΔH_combustion = Σ BE(broken) - Σ BE(formed)",
            "variables": "ΔH°_f = standard enthalpy of formation, BE = bond energy",
            "tip": "Standard enthalpy of formation for any pure element in its most stable standard physical state is exactly ZERO (e.g. O₂, N₂, C_graphite)."
        },
        {
            "title": "Calorimetry & Specific Heat Capacity",
            "topic": "Thermochemistry",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "q = m · c · ΔT   |   q_lost + q_gained = 0   |   Bomb calorimeter: q = C_cal · ΔT",
            "variables": "q = heat exchanged (Joules), m = mass (g), c = specific heat capacity (J/g·°C), ΔT = T_final - T_initial",
            "tip": "For water: c = 4.184 J/(g·°C). In an insulated coffee-cup calorimeter, heat lost by reaction equals heat absorbed by solution."
        },
        {
            "title": "Entropy & Gibbs Free Energy (Spontaneity)",
            "topic": "Chemical Thermodynamics",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "ΔG° = ΔH° - TΔS°   |   ΔG° = -R·T·ln(K_eq)   |   Spontaneous when ΔG < 0",
            "variables": "ΔG = Gibbs free energy change (kJ), ΔH = enthalpy change, ΔS = entropy change (J/K), T = temperature in Kelvin",
            "tip": "If ΔH < 0 (exothermic) and ΔS > 0 (more disorder), the reaction is spontaneous (ΔG < 0) at ALL temperatures."
        },
        {
            "title": "Standard Cell Potential (EMF)",
            "topic": "Electrochemistry",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "E°_cell = E°_cathode - E°_anode   |   ΔG° = -n · F · E°_cell",
            "variables": "E° = standard reduction potential (V), F = 96485 C/mol e⁻, n = moles of electrons transferred in balanced equation",
            "tip": "A galvanic (voltaic) cell is thermodynamically spontaneous when E°_cell > 0, which corresponds to ΔG° < 0."
        },
        {
            "title": "Nernst Equation for Non-Standard Conditions",
            "topic": "Electrochemistry",
            "grades": [
                "Grade12"
            ],
            "displayMath": "E_cell = E°_cell - (0.0591 / n) · log₁₀(Q)   (at 25°C / 298 K)",
            "variables": "E_cell = non-standard cell potential, Q = reaction quotient = [Products] / [Reactants], n = moles of e⁻",
            "tip": "As the galvanic cell operates, reactants are consumed, Q increases, and cell potential E_cell decreases until it reaches 0 V (dead battery)."
        },
        {
            "title": "Faraday's Laws of Electrolysis",
            "topic": "Electrochemistry",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "m = (M · I · t) / (n · F)   |   Charge Q = I · t",
            "variables": "m = mass deposited (g), M = molar mass (g/mol), I = current in Amperes (A), t = time in seconds, F = 96485 C/mol",
            "tip": "Always convert time t to seconds before calculating mass deposited during electrolysis (e.g. 1 hour = 3600 seconds)."
        }
    ],
    "bio": [
        {
            "title": "Microscope Magnification & Actual Specimen Size",
            "topic": "Cell Biology & Microscopy",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Magnification M = Image Size (I) / Actual Specimen Size (A)   |   A = I / M   |   I = M · A",
            "variables": "I = measured image size, A = actual size of cell/organelle, M = total magnification factor",
            "tip": "Ensure identical units: convert millimeters (mm) to micrometers (μm) by multiplying by 1000 before computing."
        },
        {
            "title": "Cell Surface Area-to-Volume Ratio (SA/V)",
            "topic": "Cell Biology & Transport",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "For a cube of side a: SA = 6a²   |   V = a³   |   Ratio = 6 / a",
            "variables": "SA = total plasma membrane surface area, V = internal cytoplasmic cell volume, a = linear cell dimension",
            "tip": "As cell size increases, its SA/V ratio decreases sharply, limiting nutrient diffusion and forcing large cells to divide."
        },
        {
            "title": "Osmosis: Percentage Change in Mass & Water Potential",
            "topic": "Cell Physiology & Transport",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "% Change in Mass = [(Final Mass - Initial Mass) / Initial Mass] × 100%   |   Water Potential Ψ = Ψ_s + Ψ_p",
            "variables": "Ψ = total water potential, Ψ_s = solute potential (negative), Ψ_p = pressure potential (turgor)",
            "tip": "Water always flows spontaneously down a water potential gradient: from higher (less negative) to lower (more negative) Ψ."
        },
        {
            "title": "Enzyme Reaction Rates & Kinetics",
            "topic": "Biochemistry & Enzymes",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Rate of Reaction = (Amount of Substrate Used or Product Formed) / Time Taken (Δt)",
            "variables": "Rate = velocity in mol/s or g/min, Δt = reaction incubation time period",
            "tip": "At optimum temperature and pH, reaction rate peaks. Above optimum temperature, enzymes denature due to hydrogen bond breakage."
        },
        {
            "title": "Food Calorimetry & Energy Release",
            "topic": "Bioenergetics & Nutrition",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Energy Released (J) = m_water · c_water · ΔT   |   Energy per gram = Total Energy / Mass of Food Sample",
            "variables": "m_water = mass of water (1 mL = 1 g), c_water = 4.184 J/(g·°C), ΔT = temperature rise (°C)",
            "tip": "To convert Joules to calories or kilocalories: 1 calorie = 4.184 Joules. 1 kcal = 1000 calories = 4184 Joules."
        },
        {
            "title": "Respiratory Quotient (RQ)",
            "topic": "Cellular Respiration",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "RQ = Volume of CO₂ Produced / Volume of O₂ Consumed",
            "variables": "RQ = respiratory quotient (dimensionless ratio)",
            "tip": "RQ values indicate substrate burned: Carbohydrates (glucose) RQ = 1.0; Proteins RQ ≈ 0.9; Lipids (fats) RQ ≈ 0.7."
        },
        {
            "title": "Lincoln-Petersen Capture-Mark-Recapture Index",
            "topic": "Ecology & Population Dynamics",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Estimated Total Population (N) = (M · C) / R",
            "variables": "M = number of individuals marked in 1st sample, C = total caught in 2nd sample, R = marked individuals recaptured in 2nd sample",
            "tip": "Key assumptions: marks do not fade or harm organisms, no significant births/deaths/migration occurred between samples."
        },
        {
            "title": "Quadrat Sampling: Density & Species Frequency",
            "topic": "Ecology & Plant Biology",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Population Density D = Total Individuals Counted / Total Area Sampled   |   % Frequency = (Quadrats with Species / Total Quadrats) × 100%",
            "variables": "D = individuals per unit area (e.g. organisms/m²), Quadrat area = length × width",
            "tip": "Quadrat sampling is strictly for sessile or slow-moving organisms (plants, lichens, snails). Use random coordinates to avoid bias."
        },
        {
            "title": "Hardy-Weinberg Law: Allele Frequencies",
            "topic": "Genetics & Evolution",
            "grades": [
                "Grade12"
            ],
            "displayMath": "p + q = 1",
            "variables": "p = frequency of the dominant allele (A), q = frequency of the recessive allele (a)",
            "tip": "Always calculate q first from the recessive phenotype (q = √(recessive frequency q²)), then deduce p = 1 - q."
        },
        {
            "title": "Hardy-Weinberg Law: Genotype Frequencies",
            "topic": "Genetics & Evolution",
            "grades": [
                "Grade12"
            ],
            "displayMath": "p² + 2pq + q² = 1",
            "variables": "p² = frequency of homozygous dominant (AA), 2pq = frequency of heterozygous (Aa), q² = frequency of homozygous recessive (aa)",
            "tip": "Conditions for equilibrium: large population, random mating, no mutation, no natural selection, no gene flow (migration)."
        },
        {
            "title": "Mendelian Dihybrid Phenotypic Ratios",
            "topic": "Mendelian Genetics",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Dihybrid Cross (AaBb × AaBb): 9 : 3 : 3 : 1   |   Testcross (AaBb × aabb): 1 : 1 : 1 : 1",
            "variables": "9 = Dom/Dom, 3 = Dom/Rec, 3 = Rec/Dom, 1 = Rec/Rec",
            "tip": "A 9:3:3:1 phenotypic ratio confirms that the two genes assort independently on different homologous chromosomes."
        },
        {
            "title": "Chi-Square (χ²) Goodness-of-Fit Test in Genetics",
            "topic": "Genetics & Statistics",
            "grades": [
                "Grade12"
            ],
            "displayMath": "χ² = Σ [(O - E)² / E]   |   Degrees of Freedom df = (number of outcome classes) - 1",
            "variables": "O = observed number of offspring, E = expected number based on Mendelian ratio, Σ = sum over all classes",
            "tip": "If calculated χ² < critical value (at p = 0.05), fail to reject null hypothesis: observed differences are due to random chance."
        },
        {
            "title": "Cardiac Output, Heart Rate & Stroke Volume",
            "topic": "Human Physiology & Circulation",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Cardiac Output (CO) = Heart Rate (HR) × Stroke Volume (SV)",
            "variables": "CO = volume pumped per minute (mL/min or L/min), HR = beats per minute (bpm), SV = volume ejected per heartbeat (mL/beat)",
            "tip": "Typical resting values: HR ≈ 70 bpm, SV ≈ 70 mL/beat, resulting in normal resting Cardiac Output ≈ 4900 mL/min ≈ 5 L/min."
        }
    ]
};

/* ========================================================
   FORMULA SHEETS & REVISION: HIERARCHICAL NAVIGATION FLOW
   Step 1: Choose Grade -> Step 2: Choose Subject -> Step 3: View Formula Sheet
======================================================== */
function showFormulaGrades(pushHistory = true) {
    if (pushHistory) {
        pushNavState({ view: 'formulaGrades' }, 'Formula Sheets — Select Grade');
    }

    const gradeDescriptions = {
        Grade9: 'General Science, Algebra, Linear Motion, Stoichiometry & Cell Biology',
        Grade10: 'Quadratics, Trigonometry, Optics, Solutions, Gas Laws & Enzyme Kinetics',
        Grade11: 'Advanced Math, Vectors, 2D Projectiles, Thermochemistry & Ecological Sampling',
        Grade12: 'National Exam Prep: Calculus, Electromagnetism, Electrochemistry & Hardy-Weinberg Genetics'
    };

    app.innerHTML = `
        <div class="nav-breadcrumbs-bar">
            <button class="back-button back-button-home" onclick="showLibraryHome()" style="margin: 0; display: inline-flex; align-items: center; gap: 6px;" title="Go back to the website home page where you choose your grade">
                ${uiIcon('home', 14)} Back to Grades (Home)
            </button>
        </div>

        <section class="hero" style="margin-bottom: 24px;">
            <p class="label">Academic Reference Guide</p>
            <h1>Formula <span>Sheets</span></h1>
            <p class="description">
                Choose your grade to explore curated formulas, standard physical constants, and verified examination summaries.
            </p>
        </section>

        <div class="page-title">
            <h2>Select your grade</h2>
            <p>Step 1 of 2: Pick your grade level to browse available formula guides.</p>
        </div>

        <div class="card-grid">
            ${['Grade9', 'Grade10', 'Grade11', 'Grade12'].map(gId => {
                const num = gId.replace('Grade', '');
                return `
                    <div class="card" onclick="showFormulaSubjects('${gId}')">
                        <div class="card-number">${num}</div>
                        <div class="card-info">
                            <h3>Grade ${num}</h3>
                            <p>${gradeDescriptions[gId] || 'Mathematics, Physics & Chemistry'}</p>
                        </div>
                        <div class="arrow">→</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function showFormulaSubjects(gradeId, pushHistory = true) {
    if (pushHistory) {
        pushNavState({ view: 'formulaSubjects', gradeId }, `${gradeId} Formula Sheets — Select Subject`);
    }

    const gradeNum = gradeId.replace('Grade', '');

    const subjects = [
        {
            id: 'math',
            name: 'Mathematics',
            badge: '∑',
            desc: gradeId === 'Grade12'
                ? 'Calculus (Derivatives & Integrals), Trigonometry, Sequences, Vectors & Probability'
                : (gradeId === 'Grade11'
                    ? 'Advanced Algebra, Sequences & Series, Circular Trigonometry & Vectors'
                    : 'Algebra, Quadratics, Coordinate Geometry, Exponents & Statistics')
        },
        {
            id: 'physics',
            name: 'Physics',
            badge: '⚡',
            desc: gradeId === 'Grade12'
                ? 'Universal Constants, Rotational Dynamics, Oscillations, Optics, Electromagnetism & Modern Physics'
                : (gradeId === 'Grade11'
                    ? '2D Projectiles, Dynamics, Work-Energy, Fluid Mechanics, Thermodynamics & Electrostatics'
                    : 'Kinematics, Newton\'s Laws, Fluid Pressure, Heat Energy, Circuits & Light')
        },
        {
            id: 'chem',
            name: 'Chemistry',
            badge: '⚗',
            desc: gradeId === 'Grade12'
                ? 'Solutions & Colligative Properties, Acid-Base Equilibria, Electrochemistry & Rate Laws'
                : (gradeId === 'Grade11'
                    ? 'Atomic Spectra, Gas Laws, Solutions, Thermochemistry, Hess\'s Law & Equilibrium'
                    : 'The Mole Concept, Stoichiometry, Chemical Reactions, Solutions & Gas Behavior')
        },
        {
            id: 'bio',
            name: 'Biology',
            badge: '🧬',
            desc: gradeId === 'Grade12'
                ? 'Population Genetics (Hardy-Weinberg), Chi-Square Tests, Ecology Sampling & Energetics'
                : (gradeId === 'Grade11'
                    ? 'Lincoln Index, Quadrat Sampling, Enzyme Kinetics, Water Potential & Respiratory Quotient'
                    : 'Microscopic Magnification, Cell SA/V Ratios, Osmosis Calculations & Food Calorimetry')
        }
    ];

    app.innerHTML = `
        <div class="nav-breadcrumbs-bar">
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <button class="back-button back-button-home" onclick="showLibraryHome()" style="margin: 0; display: inline-flex; align-items: center; gap: 6px;" title="Go back to the website home page where you choose your grade">
                    ${uiIcon('home', 14)} Back to Grades (Home)
                </button>
                <button class="back-button" onclick="showFormulaGrades()" style="margin: 0;">
                    ← Back to Formula Grades
                </button>
            </div>
            <div class="breadcrumb-trail">
                <span class="clickable" onclick="showLibraryHome()">Home</span>
                <span>/</span>
                <span class="clickable" onclick="showFormulaGrades()">Formula Sheets</span>
                <span>/</span>
                <span class="current">Grade ${gradeNum}</span>
            </div>
        </div>

        <section class="hero" style="margin-bottom: 24px;">
            <p class="label">Step 2 of 2: Select Subject</p>
            <h1>Grade ${gradeNum} <span>Formula Sheets</span></h1>
            <p class="description">
                Select a subject below to open verified formulas, variable definitions, and exam notes for Grade ${gradeNum}.
            </p>
        </section>

        <div class="page-title">
            <h2>Select subject</h2>
            <p>Pick a subject to open its complete formula reference guide.</p>
        </div>

        <div class="card-grid">
            ${subjects.map(s => `
                <div class="card" onclick="showFormulaSheet('${gradeId}', '${s.id}')">
                    <div class="card-number" style="font-size: 24px; color: #a5b4fc;">${s.badge}</div>
                    <div class="card-info">
                        <h3>${s.name}</h3>
                        <p>${s.desc}</p>
                    </div>
                    <div class="arrow">→</div>
                </div>
            `).join('')}
        </div>
    `;
}

function showFormulaSheet(gradeId, subjectId = 'math', searchQuery = '', pushHistory = true) {
    if (pushHistory) {
        pushNavState({ view: 'formulaSheet', gradeId, subjectId, search: searchQuery }, `${gradeId} ${subjectId} Formula Sheet`);
    }

    const subjectLabels = {
        math: 'Mathematics',
        physics: 'Physics',
        chem: 'Chemistry',
        bio: 'Biology'
    };
    const subjectName = subjectLabels[subjectId] || 'Mathematics';
    const gradeNum = gradeId.replace('Grade', '');

    const items = FORMULA_DATA[subjectId] || FORMULA_DATA.math;
    const q = searchQuery.toLowerCase().trim();

    // Filter items specifically by this grade and search query
    const filtered = items.filter(f => {
        if (!f.grades.includes(gradeId)) return false;
        if (q) {
            const haystack = `${f.title} ${f.topic} ${f.displayMath} ${f.variables} ${f.tip}`.toLowerCase();
            return haystack.includes(q);
        }
        return true;
    });

    app.innerHTML = `
        <div class="nav-breadcrumbs-bar">
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <button class="back-button back-button-home" onclick="showLibraryHome()" style="margin: 0; display: inline-flex; align-items: center; gap: 6px;" title="Go back to the website home page where you choose your grade">
                    ${uiIcon('home', 14)} Back to Grades (Home)
                </button>
                <button class="back-button" onclick="showFormulaSubjects('${gradeId}')" style="margin: 0;">
                    ← Back to Grade ${gradeNum} Subjects
                </button>
            </div>
            <div class="breadcrumb-trail">
                <span class="clickable" onclick="showLibraryHome()">Home</span>
                <span>/</span>
                <span class="clickable" onclick="showFormulaGrades()">Formula Sheets</span>
                <span>/</span>
                <span class="clickable" onclick="showFormulaSubjects('${gradeId}')">Grade ${gradeNum}</span>
                <span>/</span>
                <span class="current">${subjectName}</span>
            </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 22px;">
            <div>
                <h2 style="font-size: 26px; color: #ffffff; margin-bottom: 4px; font-weight: 750;">Grade ${gradeNum} ${subjectName} Formulas</h2>
                <p style="color: var(--text-muted); font-size: 14px; margin: 0;">
                    Verified syllabus formulas, symbol definitions, and exam notes for Grade ${gradeNum}.
                </p>
            </div>
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <button class="formula-tab-btn ${subjectId === 'math' ? 'active' : ''}" onclick="showFormulaSheet('${gradeId}', 'math')">
                    ${uiIcon('calculator', 14)} Math
                </button>
                <button class="formula-tab-btn ${subjectId === 'physics' ? 'active' : ''}" onclick="showFormulaSheet('${gradeId}', 'physics')">
                    ${uiIcon('bolt', 14)} Physics
                </button>
                <button class="formula-tab-btn ${subjectId === 'chem' ? 'active' : ''}" onclick="showFormulaSheet('${gradeId}', 'chem')">
                    ${uiIcon('sparkles', 14)} Chemistry
                </button>
                <button class="formula-tab-btn ${subjectId === 'bio' ? 'active' : ''}" onclick="showFormulaSheet('${gradeId}', 'bio')">
                    ${uiIcon('dna', 14)} Biology
                </button>
                <button class="btn-secondary" style="padding: 7px 14px; font-size: 13px; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;" onclick="printFormulaSheet()" title="Print or save sheet as PDF">
                    ${uiIcon('printer', 14)} Print Sheet
                </button>
            </div>
        </div>

        <!-- Search Bar with Dark Theme Styling -->
        <div style="margin-bottom: 24px;">
            <div class="formula-search-wrapper">
                <span class="search-icon" aria-hidden="true" style="top: 50%; left: 16px; transform: translateY(-50%);"></span>
                <input type="text" class="formula-search-input" 
                       placeholder="Search inside Grade ${gradeNum} ${subjectName} (e.g. formula title, variable, topic)..." 
                       value="${escapeQuotes(searchQuery)}"
                       oninput="debounceFormulaSearch('${gradeId}', '${subjectId}', this.value)">
            </div>
        </div>

        <!-- Formula Cards Grid -->
        ${filtered.length === 0 ? `
            <div style="text-align: center; padding: 48px 20px; background: var(--surface-glass); border: 1px dashed var(--border-glass); border-radius: 14px;">
                <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(99, 102, 241, 0.12); display: inline-flex; align-items: center; justify-content: center; color: #818cf8; margin-bottom: 12px;">
                    ${uiIcon('search', 22)}
                </div>
                <h4 style="font-size: 17px; color: #ffffff; margin-bottom: 6px;">No formulas found matching "${escapeQuotes(searchQuery)}"</h4>
                <p style="color: var(--text-muted); font-size: 13.5px; margin-bottom: 14px;">Try searching for a different keyword or clear your filter.</p>
                <button class="btn-secondary" onclick="showFormulaSheet('${gradeId}', '${subjectId}', '')">Clear Search</button>
            </div>
        ` : `
            <div class="formula-grid">
                ${filtered.map(f => `
                    <div class="formula-card">
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
                                <span class="badge badge-purple">${f.topic}</span>
                                <span class="badge badge-blue">Grade ${gradeNum}</span>
                            </div>
                            <h3 style="font-size: 17px; color: #ffffff; margin-bottom: 8px; font-weight: 700;">${f.title}</h3>

                            <div class="formula-math-box">
                                ${f.displayMath}
                            </div>

                            <div style="font-size: 12px; color: var(--text-muted); line-height: 1.5; margin-bottom: 10px;">
                                <strong style="color: #cbd5e1;">Variables:</strong> ${f.variables}
                            </div>

                            ${f.tip ? `
                                <div class="formula-tip">
                                    <strong>Exam Tip:</strong> ${f.tip}
                                </div>
                            ` : ''}
                        </div>

                        <div style="display: flex; justify-content: flex-end; margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--border-glass);">
                            <button class="btn-secondary" style="font-size: 12px; padding: 6px 12px; display: inline-flex; align-items: center; gap: 6px;" onclick="copyFormulaText('${escapeQuotes(f.displayMath)}', this)">
                                ${uiIcon('copy', 13)} Copy Formula
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `}
    `;
}

let formulaSearchTimeout = null;
function debounceFormulaSearch(gradeId, subjectId, query) {
    if (formulaSearchTimeout) clearTimeout(formulaSearchTimeout);
    formulaSearchTimeout = setTimeout(() => {
        showFormulaSheet(gradeId, subjectId, query, false);
    }, 220);
}

function showFormulaSheetsView(activeSubject = 'math', activeGrade = 'all', searchQuery = '', pushHistory = true) {
    if (activeGrade && activeGrade !== 'all') {
        showFormulaSheet(activeGrade, activeSubject || 'math', searchQuery, pushHistory);
    } else {
        showFormulaGrades(pushHistory);
    }
}

function copyFormulaText(text, btnElement) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            const orig = btnElement.innerHTML;
            btnElement.innerHTML = `${uiIcon('check', 13)} Copied!`;
            btnElement.style.color = '#34d399';
            setTimeout(() => {
                btnElement.innerHTML = orig;
                btnElement.style.color = '';
            }, 2000);
        }).catch(() => {
            showToast('Copied formula to clipboard', 'info');
        });
    } else {
        showToast('Copied formula to clipboard', 'info');
    }
}

function printFormulaSheet() {
    window.print();
}

// Start the application
document.addEventListener('DOMContentLoaded', initApp);
