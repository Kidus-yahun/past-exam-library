/* ========================================================
   PAST EXAM LIBRARY - CLIENT APPLICATION
   Full-stack Frontend with Auth, Admin Dashboard & Dynamic Library
======================================================== */

// Over-the-air fix: Immediately & permanently disable native SwipeRefreshLayout on all installed Android apps
function disableAndroidSwipeRefresh() {
    if (window.AndroidNative && typeof window.AndroidNative.setSwipeRefreshEnabled === 'function') {
        try {
            window.AndroidNative.setSwipeRefreshEnabled(false);
        } catch (e) {}
    }
}
disableAndroidSwipeRefresh();
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', disableAndroidSwipeRefresh);
}
window.addEventListener('load', disableAndroidSwipeRefresh);
setInterval(disableAndroidSwipeRefresh, 1500);

// Static Category Fallback for Instant First-Paint (Zero Network Delay)
const STATIC_FALLBACK_CATEGORIES = {
    grades: [
        { id: 'Grade9', name: 'Grade 9', number: '09', description: 'Past examinations for Grade 9' },
        { id: 'Grade10', name: 'Grade 10', number: '10', description: 'Past examinations for Grade 10' },
        { id: 'Grade11', name: 'Grade 11', number: '11', description: 'Past examinations for Grade 11' },
        { id: 'Grade12', name: 'Grade 12', number: '12', description: 'Past examinations for Grade 12' }
    ],
    semesters: [
        { id: 'Semester1', name: 'Semester 1', description: 'Mid 1, Mid 2 and Final' },
        { id: 'Semester2', name: 'Semester 2', description: 'Mid 1, Mid 2 and Final' }
    ],
    examTypes: [
        { id: 'Mid1', name: 'Mid 1', code: 'M1', description: 'First midterm examination' },
        { id: 'Mid2', name: 'Mid 2', code: 'M2', description: 'Second midterm examination' },
        { id: 'Final', name: 'Final', code: 'F', description: 'Final examination' },
        { id: 'Pretest', name: 'Pre-test', code: 'P', description: 'National pre-test examination' },
        { id: 'Model', name: 'Model Exam', code: 'M', description: 'National model examination' }
    ],
    subjects: {
        Grade9: ['Amharic', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Economics', 'IT', 'Citizenship', 'HP'],
        Grade10: ['Amharic', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Economics', 'IT', 'Citizenship', 'HP'],
        Grade11: ['Amharic', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Agriculture', 'IT', 'WEB'],
        Grade12: ['Amharic', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Agriculture', 'IT', 'Aptitude']
    },
    grade12NationalSubjects: ['English', 'Mathematics', 'Aptitude', 'Physics', 'Chemistry', 'Biology']
};

// State Management
const state = {
    user: null,
    token: null,
    currentView: 'library', // Default to library for instant visual render
    categories: JSON.parse(JSON.stringify(STATIC_FALLBACK_CATEGORIES)),
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
    eyeOff: '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
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
    dna: '<path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M2 9c6.667 6 13.333 0 20 6"/><path d="M7 10.5v3"/><path d="M12 9v6"/><path d="M17 10.5v3"/>',
    sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    share2: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>'
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
        });
    } else {
        openDownloadApkModal();
    }
}

function trackApkDownload() {
    try {
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'file_download', {
                file_name: 'PastExamLibrary.apk',
                file_extension: 'apk',
                link_text: 'Download APK',
                platform: 'android'
            });
            window.gtag('event', 'apk_download', { platform: 'android' });
        }
        if (window.dataLayer && Array.isArray(window.dataLayer)) {
            window.dataLayer.push({ event: 'apk_download', platform: 'android' });
        }
        fetch('/api/activity/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(state.token ? { 'Authorization': `Bearer ${state.token}` } : {})
            },
            body: JSON.stringify({
                type: 'download',
                examTitle: 'Past Exam Library Android App (.APK)',
                details: 'Downloaded official Android application package',
                filePath: '/PastExamLibrary.apk'
            })
        }).catch(() => {});
    } catch (_) {}
}

function isIosDevice() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

const APK_RELEASE_URL = 'https://github.com/Kidus-yahun/past-exam-library/releases/latest/download/PastExamLibrary.apk';

function openDownloadApkModal() {
    openAppInstallModal(isIosDevice() ? 'ios' : 'android');
}

function openAppInstallModal(activeTab) {
    if (!activeTab) {
        activeTab = isIosDevice() ? 'ios' : 'android';
    }

    const iosTabActive = activeTab === 'ios';
    const androidTabActive = activeTab === 'android';

    const bodyHtml = `
        <div style="padding: 4px 0 6px 0;">
            <!-- OS Platform Tabs -->
            <div style="display: flex; gap: 8px; margin-bottom: 20px; background: rgba(255, 255, 255, 0.05); padding: 5px; border-radius: 12px; border: 1px solid var(--border-glass);">
                <button type="button" id="tab-btn-ios" class="btn-secondary" onclick="switchAppInstallTab('ios')" style="flex: 1; padding: 10px; font-size: 13.5px; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; ${iosTabActive ? 'background: #4f46e5; color: #ffffff; border-color: transparent;' : 'background: transparent; color: var(--text-muted); border: none;'}">
                    <span>🍎</span> iPhone &amp; iPad
                </button>
                <button type="button" id="tab-btn-android" class="btn-secondary" onclick="switchAppInstallTab('android')" style="flex: 1; padding: 10px; font-size: 13.5px; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; ${androidTabActive ? 'background: #4f46e5; color: #ffffff; border-color: transparent;' : 'background: transparent; color: var(--text-muted); border: none;'}">
                    <span>🤖</span> Android (.APK)
                </button>
            </div>

            <!-- iOS VIEW -->
            <div id="install-tab-ios" style="${iosTabActive ? 'display: block;' : 'display: none;'} text-align: center;">
                <div style="width: 58px; height: 58px; margin: 0 auto 12px auto; background: linear-gradient(135deg, #0284c7, #6366f1); border-radius: 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(99, 102, 241, 0.35);">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
                        <line x1="12" y1="18" x2="12.01" y2="18"></line>
                    </svg>
                </div>
                <h4 style="font-size: 17px; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">Past Exam Library for iPhone &amp; iPad</h4>
                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; max-width: 400px; margin: 0 auto 18px auto;">
                    Add the official app directly to your iPhone Home Screen. Zero App Store download or Apple ID needed.
                </p>

                <div style="display: grid; gap: 11px; margin-bottom: 18px; text-align: left; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 14px 16px;">
                    <div style="display: flex; gap: 12px; align-items: flex-start;">
                        <div style="background: rgba(99, 102, 241, 0.15); color: #818cf8; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0;">1</div>
                        <div style="font-size: 13px; color: var(--text-primary); line-height: 1.45;">
                            In <b>Safari</b>, tap the <b>Share</b> button at the bottom:
                            <span style="display: inline-flex; align-items: center; gap: 4px; background: rgba(255,255,255,0.08); padding: 2px 7px; border-radius: 6px; font-weight: 600; margin-top: 3px;">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg> Share Icon
                            </span>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px; align-items: flex-start;">
                        <div style="background: rgba(99, 102, 241, 0.15); color: #818cf8; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0;">2</div>
                        <div style="font-size: 13px; color: var(--text-primary); line-height: 1.45;">
                            Scroll down the menu and tap <b>"Add to Home Screen"</b> <span style="color: var(--text-muted); font-size: 12px;">(with the [+] icon)</span>.
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px; align-items: flex-start;">
                        <div style="background: rgba(99, 102, 241, 0.15); color: #818cf8; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0;">3</div>
                        <div style="font-size: 13px; color: var(--text-primary); line-height: 1.45;">
                            Tap <b>Add</b> in the top right. The app will launch fullscreen with offline support!
                        </div>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${navigator.share ? `
                        <button class="btn-primary" style="display: flex; align-items: center; justify-content: center; gap: 9px; padding: 12px 16px; font-size: 14px; font-weight: 600; border-radius: 9px;" onclick="triggerIosShareSheet()">
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                            <span>Open Safari Share Menu (Step 1)</span>
                        </button>
                    ` : ''}
                    <button class="btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px; font-size: 13px;" onclick="copyWebsiteLinkForSafari()">
                        ${uiIcon('link', 14)}
                        <span>Copy Link for Safari</span>
                    </button>
                </div>

                <div style="margin-top: 14px; padding: 10px 12px; background: rgba(59, 130, 246, 0.08); border-radius: 9px; text-align: left; font-size: 12px; color: var(--text-muted); line-height: 1.5;">
                    💡 <b>If you are in Telegram, Instagram, or TikTok:</b> Tap the <b>•••</b> at the top right and choose <b>"Open in Safari"</b> first to install the app.
                </div>
            </div>

            <!-- ANDROID VIEW -->
            <div id="install-tab-android" style="${androidTabActive ? 'display: block;' : 'display: none;'} text-align: center;">
                <div style="width: 58px; height: 58px; margin: 0 auto 12px auto; background: linear-gradient(135deg, #10b981, #059669); border-radius: 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                        <line x1="12" y1="18" x2="12.01" y2="18"></line>
                    </svg>
                </div>
                <h4 style="font-size: 17px; font-weight: 700; margin-bottom: 6px; color: var(--text-primary);">Past Exam Library for Android</h4>
                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; max-width: 380px; margin: 0 auto 16px auto;">
                    Official Android Application (.APK) for Blessed G/Michael Catholic Secondary School digital past exam archive.
                </p>

                <div style="display: grid; gap: 8px; margin-bottom: 18px; text-align: left; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; padding: 12px 14px;">
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--text-secondary);">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Full offline study &amp; practice question bank</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--text-secondary);">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Direct PDF downloads straight to your phone's storage</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--text-secondary);">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        <span>Compatible with Android 7.0 up to Android 15</span>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <a href="${APK_RELEASE_URL}" class="btn-primary" onclick="trackApkDownload()" style="display: flex; align-items: center; justify-content: center; gap: 10px; padding: 12px 16px; font-size: 14.5px; font-weight: 600; text-decoration: none; border-radius: 9px;" download="PastExamLibrary.apk" target="_blank" rel="noopener">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        <span>Download Android App (.APK)</span>
                    </a>

                    ${window._deferredPwaPrompt ? `
                        <button class="btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px; font-size: 13.5px;" onclick="promptPwaInstall(); closeModal();">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect></svg>
                            <span>Add to Home Screen (Instant PWA)</span>
                        </button>
                    ` : ''}
                </div>

                <div style="margin-top: 14px; padding: 10px 12px; background: rgba(99, 102, 241, 0.08); border-radius: 9px; text-align: left; font-size: 11.5px; color: var(--text-muted); line-height: 1.5;">
                    <strong style="color: var(--text-primary); display: block; margin-bottom: 3px;">📲 How to install on Android:</strong>
                    1. Tap <b>Download Android App (.APK)</b>.<br>
                    2. If Play Protect appears, tap <b>Install anyway</b>.<br>
                    3. Launch from your home screen.
                </div>
            </div>
        </div>
    `;

    showModal('Install Past Exam Library', bodyHtml);
}

function switchAppInstallTab(tab) {
    const iosDiv = document.getElementById('install-tab-ios');
    const androidDiv = document.getElementById('install-tab-android');
    const btnIos = document.getElementById('tab-btn-ios');
    const btnAndroid = document.getElementById('tab-btn-android');
    if (!iosDiv || !androidDiv) return;

    if (tab === 'ios') {
        iosDiv.style.display = 'block';
        androidDiv.style.display = 'none';
        if (btnIos) {
            btnIos.style.background = '#4f46e5';
            btnIos.style.color = '#ffffff';
        }
        if (btnAndroid) {
            btnAndroid.style.background = 'transparent';
            btnAndroid.style.color = 'var(--text-muted)';
        }
    } else {
        iosDiv.style.display = 'none';
        androidDiv.style.display = 'block';
        if (btnAndroid) {
            btnAndroid.style.background = '#4f46e5';
            btnAndroid.style.color = '#ffffff';
        }
        if (btnIos) {
            btnIos.style.background = 'transparent';
            btnIos.style.color = 'var(--text-muted)';
        }
    }
}

function triggerIosShareSheet() {
    if (navigator.share) {
        navigator.share({
            title: 'Past Exam Library',
            text: 'Catholic Past Exam Library - Official Past Papers & Practice Bank',
            url: window.location.origin
        }).catch(() => {});
    } else {
        copyWebsiteLinkForSafari();
    }
}

function copyWebsiteLinkForSafari() {
    navigator.clipboard.writeText(window.location.origin).then(() => {
        showToast('Link copied! Open Safari on your iPhone and paste.', 'success');
    }).catch(() => {
        showToast(window.location.origin, 'info');
    });
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
    const payload = {
        id: 'act_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        type,
        username: state.user ? state.user.username : 'student',
        fullName: state.user ? (state.user.fullName || state.user.username) : 'Student',
        role: state.user ? state.user.role : 'student',
        userId: state.user ? state.user.id : null,
        timestamp: new Date().toISOString(),
        ...data
    };

    // Store in browser local storage so user activity is never lost across serverless restarts
    try {
        const rawLocal = localStorage.getItem('pel_local_activity_logs');
        let localLogs = rawLocal ? JSON.parse(rawLocal) : [];
        localLogs.unshift(payload);
        if (localLogs.length > 200) localLogs = localLogs.slice(0, 200);
        localStorage.setItem('pel_local_activity_logs', JSON.stringify(localLogs));
    } catch (_) {}

    // Instant local/tab sync if currently viewing activity tab
    if (state.currentView === 'admin' && state.admin.activeTab === 'activity') {
        loadActivityStatsAndLogs(true);
    }

    try {
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

        // Broadcast custom events to Google Analytics 4 (GA4) / Tag Manager
        try {
            if (typeof window.gtag === 'function') {
                if (type === 'download') {
                    window.gtag('event', 'file_download', {
                        file_name: data.examTitle || 'Exam Paper',
                        file_extension: 'pdf',
                        grade: data.grade || 'General',
                        subject: data.subject || 'All',
                        exam_type: data.examType || 'General',
                        file_path: data.filePath || ''
                    });
                    window.gtag('event', 'exam_download', {
                        exam_title: data.examTitle || 'Exam Paper',
                        grade: data.grade || 'General',
                        subject: data.subject || 'All'
                    });
                } else if (type === 'practice') {
                    window.gtag('event', 'practice_completed', {
                        grade: data.grade || '',
                        subject: data.subject || '',
                        exam_type: data.examType || '',
                        score: Number(data.score || 0),
                        percentage: Number(data.percentage || 0),
                        total_questions: Number(data.totalQuestions || 0)
                    });
                } else if (type === 'login') {
                    window.gtag('event', 'login', { method: 'student_portal' });
                } else if (type === 'register') {
                    window.gtag('event', 'sign_up', { method: 'student_portal' });
                } else {
                    window.gtag('event', type, data);
                }
            }

            if (window.dataLayer && Array.isArray(window.dataLayer)) {
                window.dataLayer.push({
                    event: type === 'download' ? 'exam_download' : type,
                    ...data
                });
            }
        } catch (_) {}

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
                    <label>Email Address or Username</label>
                    <input type="text" id="dl-login-username" autocomplete="username" required placeholder="student@example.com or username" autofocus>
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
                    <label>Email Address or Username *</label>
                    <input type="text" id="dl-reg-identifier" required placeholder="e.g. kidist@gmail.com or kidist" autofocus>
                </div>
                <div class="auth-form-group">
                    <label>Password *</label>
                    <input type="password" id="dl-reg-password" autocomplete="new-password" required placeholder="At least 4 characters">
                </div>
                <div class="auth-form-group">
                    <label>Full Name <span style="font-size: 11px; opacity: 0.7;">(Optional)</span></label>
                    <input type="text" id="dl-reg-fullname" placeholder="e.g. Kidist Solomon">
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
            broadcastStatsUpdate('activity_updated');

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
    const identifier = (document.getElementById('dl-reg-identifier')?.value || '').trim();
    const password = document.getElementById('dl-reg-password').value;
    const fullName = (document.getElementById('dl-reg-fullname')?.value || '').trim();

    btn.disabled = true;
    btn.innerHTML = 'Creating account...';

    try {
        const isEmail = identifier.includes('@');
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: isEmail ? identifier : '',
                username: identifier,
                password,
                fullName: fullName || identifier,
                role: 'student'
            })
        });
        const data = await res.json();

        if (res.ok && data.success) {
            state.token = data.token;
            state.user = data.user;
            localStorage.setItem('pel_token', data.token);
            localStorage.setItem('pel_user', JSON.stringify(data.user));
            renderHeader();
            closeModal();
            showToast(`Account created! Starting download for ${data.user.fullName || data.user.username}...`, 'success');
            broadcastStatsUpdate('activity_updated');

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

    const dlData = activityData || {
        filePath: fileUrl,
        examTitle: (suggestedFileName || '').replace(/\.pdf$/i, '') || 'Exam Paper',
        details: 'Downloaded official examination PDF'
    };
    logActivity('download', dlData);

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
        if (typeof window.gtag === 'function' && stateObj && stateObj.view) {
            window.gtag('event', 'page_view', {
                page_title: title || stateObj.view,
                page_location: window.location.href,
                page_path: window.location.pathname + '#' + (stateObj.view || '') + (stateObj.gradeId ? '/' + stateObj.gradeId : '')
            });
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
    } else if (s.view === 'practiceExamTypeCatalog') {
        showPracticeExamTypeCatalog(s.gradeId, false);
    } else if (s.view === 'practiceSubjectCatalog') {
        showPracticeSubjectCatalog(s.gradeId, s.examType || 'All', false);
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
    } else if (s.view === 'studydesk') {
        showStudyDesk(s.grade, s.subject, false);
    } else {
        showLibraryHome(false);
    }
});

/* ========================================================
   TELEGRAM CHANNEL ANNOUNCEMENT HELPERS
======================================================== */
function dismissTelegramBanner() {
    const banner = document.getElementById('telegram-banner');
    if (banner) {
        banner.classList.add('hidden');
        try {
            sessionStorage.setItem('pel_tg_banner_dismissed', '1');
        } catch (e) {}
    }
}

function initTelegramBanner() {
    try {
        if (sessionStorage.getItem('pel_tg_banner_dismissed') === '1') {
            const banner = document.getElementById('telegram-banner');
            if (banner) banner.classList.add('hidden');
        }
    } catch (e) {}
}

/* ========================================================
   INITIALIZATION & API HELPERS
======================================================== */

// Supabase Public Client for Google OAuth
const SUPABASE_PUBLIC_URL = 'https://aqwouaxijoffehbyxjud.supabase.co';
const SUPABASE_PUBLIC_KEY = 'sb_publishable_jsHzlQ7SdA6MSv2XOgE8Lg__HwLPjwe';
let supabaseClient = null;

function getSupabaseClient() {
    if (!supabaseClient && window.supabase && window.supabase.createClient) {
        try {
            supabaseClient = window.supabase.createClient(SUPABASE_PUBLIC_URL, SUPABASE_PUBLIC_KEY, {
                auth: {
                    persistSession: true,
                    autoRefreshToken: true
                }
            });
        } catch(e) {
            console.warn('[Supabase client init error]:', e);
        }
    }
    return supabaseClient;
}

async function signInWithGoogle() {
    const sb = getSupabaseClient();
    if (!sb) {
        showToast('Supabase client is loading. Please try again in a moment.', 'info');
        return;
    }
    const redirectUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? window.location.origin
        : 'https://past-exam-library.vercel.app';
    try {
        const { error } = await sb.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectUrl
            }
        });
        if (error) {
            console.error('[Google OAuth error]:', error);
            showToast(error.message || 'Google sign-in could not be started.', 'error');
        }
    } catch(err) {
        showToast(err.message, 'error');
    }
}

// ========================================================
// STUDENT ONBOARDING & PERSONALIZATION SURVEY
// ========================================================
let onboardingState = {
    grade: 'Grade 12',
    stream: 'natural',
    subject: 'Mathematics',
    dailyGoal: 25
};

function openStudentOnboardingModal(step = 1) {
    let bodyHtml = '';
    const studentName = (state.user && state.user.fullName) ? state.user.fullName.split(' ')[0] : 'Student';

    if (step === 1) {
        bodyHtml = `
            <div class="onboarding-modal-wrap">
                <div class="onboarding-step-header">
                    <span class="role-pill" style="font-size: 11px; background: rgba(56, 189, 248, 0.15); color: #38bdf8;">STEP 1 OF 3</span>
                    <h3 style="margin: 8px 0 4px 0; font-size: 18px; font-weight: 800;">Welcome, ${studentName}! 🎓</h3>
                    <p style="margin: 0 0 16px 0; font-size: 13.5px; color: var(--text-muted);">
                        Which grade are you preparing for? We'll tune your past papers, formulas, and notes right away.
                    </p>
                </div>

                <div class="onboarding-options-grid">
                    <div class="onboarding-card ${onboardingState.grade === 'Grade 12' ? 'active' : ''}" onclick="setOnboardingGrade('Grade 12')">
                        <div class="onboarding-card-icon">🏆</div>
                        <div style="flex: 1;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <strong style="font-size: 15px; color: var(--text-main);">Grade 12</strong>
                                <span class="onboarding-tag-popular">Recommended</span>
                            </div>
                            <span style="font-size: 12px; color: var(--text-muted);">National Examination, Model Exams & University Prep</span>
                        </div>
                    </div>

                    <div class="onboarding-card ${onboardingState.grade === 'Grade 11' ? 'active' : ''}" onclick="setOnboardingGrade('Grade 11')">
                        <div class="onboarding-card-icon">📘</div>
                        <div style="flex: 1;">
                            <strong style="font-size: 15px; color: var(--text-main); display: block;">Grade 11</strong>
                            <span style="font-size: 12px; color: var(--text-muted);">Preparatory curriculum, Semester Midterms & Finals</span>
                        </div>
                    </div>

                    <div class="onboarding-card ${onboardingState.grade === 'Grade 10' ? 'active' : ''}" onclick="setOnboardingGrade('Grade 10')">
                        <div class="onboarding-card-icon">📗</div>
                        <div style="flex: 1;">
                            <strong style="font-size: 15px; color: var(--text-main); display: block;">Grade 10</strong>
                            <span style="font-size: 12px; color: var(--text-muted);">Secondary school past exams and formula sheets</span>
                        </div>
                    </div>

                    <div class="onboarding-card ${onboardingState.grade === 'Grade 9' ? 'active' : ''}" onclick="setOnboardingGrade('Grade 9')">
                        <div class="onboarding-card-icon">📙</div>
                        <div style="flex: 1;">
                            <strong style="font-size: 15px; color: var(--text-main); display: block;">Grade 9</strong>
                            <span style="font-size: 12px; color: var(--text-muted);">High school foundations & subject revision</span>
                        </div>
                    </div>
                </div>

                <div class="onboarding-actions-footer">
                    <button type="button" class="desk-tool-btn" onclick="completeStudentOnboarding(true)">Skip for now</button>
                    <button type="button" class="btn-primary" style="width: auto; padding: 10px 24px; font-weight: 800;" onclick="openStudentOnboardingModal(2)">
                        Continue to Step 2 →
                    </button>
                </div>
            </div>
        `;
    } else if (step === 2) {
        bodyHtml = `
            <div class="onboarding-modal-wrap">
                <div class="onboarding-step-header">
                    <span class="role-pill" style="font-size: 11px; background: rgba(56, 189, 248, 0.15); color: #38bdf8;">STEP 2 OF 3</span>
                    <h3 style="margin: 8px 0 4px 0; font-size: 18px; font-weight: 800;">Academic Stream & Subject 🔬</h3>
                    <p style="margin: 0 0 16px 0; font-size: 13.5px; color: var(--text-muted);">
                        Choose your focus stream so Archie AI and your Study Room give you relevant questions.
                    </p>
                </div>

                <label style="font-size: 12px; font-weight: 800; color: #1cb0f6; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">
                    Select Stream:
                </label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 18px;">
                    <div class="onboarding-card ${onboardingState.stream === 'natural' ? 'active' : ''}" style="padding: 12px;" onclick="setOnboardingStream('natural')">
                        <div class="onboarding-card-icon">🔬</div>
                        <div>
                            <strong style="font-size: 13.5px; color: var(--text-main); display: block;">Natural Science</strong>
                            <span style="font-size: 11px; color: var(--text-muted);">STEM / Medicine / Tech</span>
                        </div>
                    </div>
                    <div class="onboarding-card ${onboardingState.stream === 'social' ? 'active' : ''}" style="padding: 12px;" onclick="setOnboardingStream('social')">
                        <div class="onboarding-card-icon">📊</div>
                        <div>
                            <strong style="font-size: 13.5px; color: var(--text-main); display: block;">Social Science</strong>
                            <span style="font-size: 11px; color: var(--text-muted);">Business / Law / Arts</span>
                        </div>
                    </div>
                </div>

                <label style="font-size: 12px; font-weight: 800; color: #1cb0f6; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">
                    Priority Focus Subject:
                </label>
                <div class="onboarding-chips-wrap">
                    ${['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'].map(s => `
                        <button type="button" class="onboarding-chip ${onboardingState.subject === s ? 'active' : ''}" onclick="setOnboardingSubject('${s}')">
                            ${s === 'Mathematics' ? '📐' : s === 'Physics' ? '⚡' : s === 'Chemistry' ? '🧪' : s === 'Biology' ? '🧬' : '📖'} ${s}
                        </button>
                    `).join('')}
                </div>

                <div class="onboarding-actions-footer">
                    <button type="button" class="desk-tool-btn" onclick="openStudentOnboardingModal(1)">← Back</button>
                    <div style="display: flex; gap: 8px;">
                        <button type="button" class="desk-tool-btn" onclick="completeStudentOnboarding(true)">Skip</button>
                        <button type="button" class="btn-primary" style="width: auto; padding: 10px 24px; font-weight: 800;" onclick="openStudentOnboardingModal(3)">
                            Continue to Step 3 →
                        </button>
                    </div>
                </div>
            </div>
        `;
    } else if (step === 3) {
        bodyHtml = `
            <div class="onboarding-modal-wrap">
                <div class="onboarding-step-header">
                    <span class="role-pill" style="font-size: 11px; background: rgba(56, 189, 248, 0.15); color: #38bdf8;">STEP 3 OF 3</span>
                    <h3 style="margin: 8px 0 4px 0; font-size: 18px; font-weight: 800;">Daily Study Goal ⏱️</h3>
                    <p style="margin: 0 0 16px 0; font-size: 13.5px; color: var(--text-muted);">
                        How much time do you want to spend practicing each day?
                    </p>
                </div>

                <div class="onboarding-options-grid">
                    <div class="onboarding-card ${onboardingState.dailyGoal === 15 ? 'active' : ''}" onclick="setOnboardingDailyGoal(15)">
                        <div class="onboarding-card-icon">⚡</div>
                        <div style="flex: 1;">
                            <strong style="font-size: 14.5px; color: var(--text-main); display: block;">15 Minutes / Day</strong>
                            <span style="font-size: 12px; color: var(--text-muted);">Casual • Quick formula & unit review</span>
                        </div>
                    </div>

                    <div class="onboarding-card ${onboardingState.dailyGoal === 25 ? 'active' : ''}" onclick="setOnboardingDailyGoal(25)">
                        <div class="onboarding-card-icon">🎯</div>
                        <div style="flex: 1;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <strong style="font-size: 14.5px; color: var(--text-main);">25 Minutes / Day</strong>
                                <span class="onboarding-tag-popular">Recommended</span>
                            </div>
                            <span style="font-size: 12px; color: var(--text-muted);">1 Pomodoro Sprint • Most effective for retention</span>
                        </div>
                    </div>

                    <div class="onboarding-card ${onboardingState.dailyGoal === 50 ? 'active' : ''}" onclick="setOnboardingDailyGoal(50)">
                        <div class="onboarding-card-icon">🔥</div>
                        <div style="flex: 1;">
                            <strong style="font-size: 14.5px; color: var(--text-main); display: block;">50 Minutes / Day</strong>
                            <span style="font-size: 12px; color: var(--text-muted);">Intensive • High scorers targeting 600+ on National Exam</span>
                        </div>
                    </div>
                </div>

                <!-- Reward banner -->
                <div style="margin: 16px 0; padding: 12px 14px; background: rgba(88, 204, 2, 0.12); border: 1.5px solid rgba(88, 204, 2, 0.4); border-radius: 12px; display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 26px;">🎁</span>
                    <div>
                        <strong style="font-size: 13.5px; color: #58cc02; display: block;">Claim Your Welcome Reward!</strong>
                        <span style="font-size: 12px; color: var(--text-muted);">Complete onboarding now to receive a <strong>+50 XP</strong> study streak starter pack!</span>
                    </div>
                </div>

                <div class="onboarding-actions-footer">
                    <button type="button" class="desk-tool-btn" onclick="openStudentOnboardingModal(2)">← Back</button>
                    <button type="button" class="btn-primary" style="background: #58cc02; border-bottom: 3px solid #46a302; width: auto; padding: 11px 26px; font-weight: 800; font-size: 14px;" onclick="completeStudentOnboarding(false)">
                        🎉 Claim +50 XP & Start Studying →
                    </button>
                </div>
            </div>
        `;
    }

    showModal('Personalize Your Exam Preparation', bodyHtml);
}

function setOnboardingGrade(grade) {
    onboardingState.grade = grade;
    openStudentOnboardingModal(1);
}

function setOnboardingStream(stream) {
    onboardingState.stream = stream;
    openStudentOnboardingModal(2);
}

function setOnboardingSubject(subject) {
    onboardingState.subject = subject;
    openStudentOnboardingModal(2);
}

function setOnboardingDailyGoal(minutes) {
    onboardingState.dailyGoal = minutes;
    openStudentOnboardingModal(3);
}

function completeStudentOnboarding(skipped = false) {
    closeModal();
    try {
        localStorage.setItem('pel_onboarding_completed', 'true');
        if (!skipped) {
            localStorage.setItem('pel_student_preferences', JSON.stringify(onboardingState));
            deskState.grade = onboardingState.grade;
            deskState.subject = onboardingState.subject;
            updateStudyStreak();
            playDeskChime('fanfare');
            showToast('🎉 Onboarding completed! +50 XP Welcome bonus added to your streak!', 'success');
            
            // Sync with Supabase users table
            const sb = getSupabaseClient();
            if (sb && state.user && state.user.id) {
                sb.from('users').update({
                    full_name: state.user.fullName || state.user.username,
                    role: 'student'
                }).eq('id', state.user.id).then(() => {}).catch(() => {});
            }
        }
    } catch(e) {}
}

async function initApp() {
    // 0. Update Study Streak & Initialize Telegram Banner
    updateStudyStreak();
    initTelegramBanner();

    // Load saved student preferences if available
    try {
        const savedPrefs = localStorage.getItem('pel_student_preferences');
        if (savedPrefs) {
            const parsed = JSON.parse(savedPrefs);
            if (parsed.grade) deskState.grade = parsed.grade;
            if (parsed.subject) deskState.subject = parsed.subject;
            if (parsed.stream) onboardingState.stream = parsed.stream;
            if (parsed.dailyGoal) onboardingState.dailyGoal = parsed.dailyGoal;
        }
    } catch(e) {}

    // 0b. Check for active Supabase OAuth session (e.g. redirected from Google Sign-In)
    const sb = getSupabaseClient();
    if (sb) {
        try {
            const { data: { session } } = await sb.auth.getSession();
            if (session && session.user) {
                const u = session.user;
                const googleName = (u.user_metadata && (u.user_metadata.full_name || u.user_metadata.name)) || (u.email ? u.email.split('@')[0] : 'Student');
                state.token = session.access_token;
                state.user = {
                    id: u.id,
                    username: u.email ? u.email.split('@')[0] : 'student',
                    email: u.email || '',
                    fullName: googleName,
                    role: 'student'
                };
                localStorage.setItem('pel_token', state.token);
                localStorage.setItem('pel_user', JSON.stringify(state.user));

                // Save or update user profile in Supabase database
                sb.from('users').upsert({
                    id: u.id,
                    username: u.email ? u.email.split('@')[0] : 'student',
                    email: u.email || '',
                    password_hash: 'GOOGLE_OAUTH_USER',
                    role: 'student',
                    full_name: googleName,
                    last_login_at: new Date().toISOString()
                }, { onConflict: 'email' }).then(() => {}).catch(() => {});

                // Trigger onboarding if first-time user
                if (!localStorage.getItem('pel_onboarding_completed')) {
                    setTimeout(() => {
                        openStudentOnboardingModal(1);
                    }, 500);
                }
            }

            // Listen for OAuth sign-in events
            sb.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN' && session && session.user) {
                    const u = session.user;
                    const googleName = (u.user_metadata && (u.user_metadata.full_name || u.user_metadata.name)) || (u.email ? u.email.split('@')[0] : 'Student');
                    state.token = session.access_token;
                    state.user = {
                        id: u.id,
                        username: u.email ? u.email.split('@')[0] : 'student',
                        email: u.email || '',
                        fullName: googleName,
                        role: 'student'
                    };
                    localStorage.setItem('pel_token', state.token);
                    localStorage.setItem('pel_user', JSON.stringify(state.user));

                    sb.from('users').upsert({
                        id: u.id,
                        username: u.email ? u.email.split('@')[0] : 'student',
                        email: u.email || '',
                        password_hash: 'GOOGLE_OAUTH_USER',
                        role: 'student',
                        full_name: googleName,
                        last_login_at: new Date().toISOString()
                    }, { onConflict: 'email' }).then(() => {}).catch(() => {});

                    if (state.currentView === 'login') {
                        showToast(`Welcome, ${googleName}! 👋`, 'success');
                        setView('library');
                    }

                    // Trigger onboarding if first-time user
                    if (!localStorage.getItem('pel_onboarding_completed')) {
                        setTimeout(() => {
                            openStudentOnboardingModal(1);
                        }, 500);
                    }
                }
            });
        } catch(e) {
            console.warn('OAuth session check error:', e);
        }
    }

    // 1. Initialize Theme synchronously (zero flash)
    const currentTheme = getTheme();
    document.documentElement.setAttribute('data-theme', currentTheme);
    state.theme = currentTheme;

    // 2. Load saved session synchronously from local cache
    const savedToken = localStorage.getItem('pel_token');
    const savedUser = localStorage.getItem('pel_user');
    if (savedToken && savedUser) {
        try {
            state.token = savedToken;
            state.user = JSON.parse(savedUser);
        } catch (e) {
            console.warn('Session parse error', e);
        }
    }

    // 3. Load cached offline categories synchronously if present
    try {
        const cachedCat = localStorage.getItem('pel_offline_categories');
        if (cachedCat) {
            const parsed = JSON.parse(cachedCat);
            if (parsed && parsed.grades && parsed.grades.length > 0) {
                state.categories = parsed;
            }
        }
    } catch (e) {}

    // 4. Check for incoming 1v1 Telegram Duel challenge or Shared Streak in URL
    const urlParams = new URLSearchParams(window.location.search);
    const duelParam = urlParams.get('duel');
    const sharedStreakParam = urlParams.get('shared_streak');

    if (duelParam && handleIncomingDuelUrl(duelParam)) {
        // Duel lobby rendered
    } else if (sharedStreakParam && handleIncomingSharedStreakUrl(sharedStreakParam)) {
        setView('library');
    } else if (state.user && state.user.role === 'admin' && window.location.hash === '#admin') {
        setView('admin');
    } else {
        setView('library');
    }

    // 5. Non-blocking Background Sync (Token verification & Category refresh)
    setTimeout(async () => {
        // Verify token validity in background if logged in
        if (state.token) {
            try {
                const res = await fetch('/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${state.token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    state.user = data.user;
                    localStorage.setItem('pel_user', JSON.stringify(data.user));
                    renderHeader();
                } else if (res.status === 401) {
                    logout(false);
                }
            } catch (e) {
                console.warn('Background token check fallback', e);
            }
        }

        // Fetch fresh categories from backend in background
        await fetchCategories();
    }, 60);

    // 6. Non-blocking Service Worker registration (delayed so page load is 100% smooth)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                navigator.serviceWorker.register('/sw.js').then((reg) => {
                    console.log('[PWA] Service Worker active');
                }).catch((err) => {
                    console.warn('[PWA] Service Worker registration failed:', err);
                });
            }, 2500);
        });
    }

    // 7. Idle prefetch PDF.js (warm up browser cache for instant preview later)
    setTimeout(() => {
        if (typeof ensurePdfJsLoaded === 'function') {
            ensurePdfJsLoaded();
        }
    }, 4500);
}

async function fetchCategories() {
    try {
        const res = await fetch('/api/categories');
        if (res.ok) {
            const data = await res.json();
            if (data && data.categories && data.categories.grades) {
                state.categories = data.categories;
                try {
                    localStorage.setItem('pel_offline_categories', JSON.stringify(data.categories));
                } catch(e) {}
                if (state.categories.grades && state.categories.grades.length > 0 && !state.admin.selectedGradeForSubjects) {
                    state.admin.selectedGradeForSubjects = state.categories.grades[0].id;
                }
            }
        }
    } catch (err) {
        console.warn('Network category fetch deferred to cache/static:', err.message);
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
    } else if (viewName === 'studydesk' || viewName === 'desk') {
        showStudyDesk();
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
    const iconSvg = type === 'success' ? uiIcon('checkCircle', 15) : (type === 'error' ? uiIcon('alertTriangle', 15) : uiIcon('fileText', 15));
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
   STUDY STREAK & RETENTION TRACKER
======================================================== */
function getStudyStreakData() {
    try {
        const raw = localStorage.getItem('pel_study_streak');
        if (raw) {
            const data = JSON.parse(raw);
            return {
                count: Math.max(1, parseInt(data.count, 10) || 1),
                bestStreak: Math.max(1, parseInt(data.bestStreak, 10) || 1),
                lastActiveDate: data.lastActiveDate || '',
                totalDays: parseInt(data.totalDays, 10) || 1
            };
        }
    } catch (e) {}
    return { count: 1, bestStreak: 1, lastActiveDate: '', totalDays: 1 };
}

function updateStudyStreak() {
    try {
        const today = new Date().toISOString().slice(0, 10);
        const current = getStudyStreakData();

        if (!current.lastActiveDate) {
            const initData = { count: 1, bestStreak: 1, lastActiveDate: today, totalDays: 1 };
            localStorage.setItem('pel_study_streak', JSON.stringify(initData));
            return initData;
        }

        if (current.lastActiveDate === today) {
            return current;
        }

        const lastDate = new Date(current.lastActiveDate + 'T00:00:00Z');
        const currDate = new Date(today + 'T00:00:00Z');
        const diffDays = Math.round((currDate - lastDate) / (1000 * 60 * 60 * 24));

        let newCount = current.count;
        if (diffDays === 1) {
            newCount = current.count + 1;
        } else if (diffDays > 1) {
            newCount = 1;
        }

        const newBest = Math.max(current.bestStreak, newCount);
        const updated = {
            count: newCount,
            bestStreak: newBest,
            lastActiveDate: today,
            totalDays: (current.totalDays || 1) + 1
        };
        localStorage.setItem('pel_study_streak', JSON.stringify(updated));
        return updated;
    } catch (e) {
        return { count: 1, bestStreak: 1, lastActiveDate: '', totalDays: 1 };
    }
}

function getDuolingoFlameSvg(size = 90) {
    return `
        <svg width="${size}" height="${size}" viewBox="0 0 120 120" fill="none" class="duolingo-flame-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="flameGradOuter" cx="50%" cy="80%" r="65%">
                    <stop offset="0%" stop-color="#fdba74"/>
                    <stop offset="35%" stop-color="#f97316"/>
                    <stop offset="85%" stop-color="#ea580c"/>
                    <stop offset="100%" stop-color="#c2410c"/>
                </radialGradient>
                <radialGradient id="flameGradInner" cx="50%" cy="85%" r="55%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="30%" stop-color="#fef08a"/>
                    <stop offset="70%" stop-color="#facc15"/>
                    <stop offset="100%" stop-color="#f97316"/>
                </radialGradient>
            </defs>
            <path d="M60 6C60 6 78 30 78 52C78 64 74 72 70 78C78 68 88 64 88 50C98 62 104 78 104 92C104 110 84 118 60 118C36 118 16 110 16 92C16 75 25 58 38 46C36 56 40 68 46 72C44 60 48 40 60 6Z" fill="url(#flameGradOuter)" />
            <path d="M60 38C60 38 70 54 70 70C70 78 66 84 64 88C69 82 74 80 74 70C81 78 84 88 84 98C84 110 73 114 60 114C47 114 36 110 36 98C36 86 42 74 50 66C49 72 52 80 56 82C54 74 56 60 60 38Z" fill="url(#flameGradInner)" />
            <ellipse cx="51" cy="74" rx="4.5" ry="6" fill="#1e1b4b" />
            <circle cx="53" cy="72" r="2" fill="#ffffff" />
            <ellipse cx="69" cy="74" rx="4.5" ry="6" fill="#1e1b4b" />
            <circle cx="71" cy="72" r="2" fill="#ffffff" />
            <ellipse cx="44" cy="82" rx="4" ry="2.5" fill="#ef4444" opacity="0.6" />
            <ellipse cx="76" cy="82" rx="4" ry="2.5" fill="#ef4444" opacity="0.6" />
            <path d="M56 83 C58 86, 62 86, 64 83" stroke="#1e1b4b" stroke-width="2.5" stroke-linecap="round" fill="none" />
        </svg>
    `;
}

function getSharedStreaksData() {
    try {
        const raw = localStorage.getItem('pel_shared_streaks');
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [
        { id: 'ss_demo1', partnerName: 'Eddy', streakCount: 3, lastActiveDate: new Date().toISOString().slice(0, 10), avatarColor: '#3b82f6', initial: 'E' },
        { id: 'ss_demo2', partnerName: 'Lily', streakCount: 32, lastActiveDate: new Date().toISOString().slice(0, 10), avatarColor: '#a855f7', initial: 'L' },
        { id: 'ss_demo3', partnerName: 'Jane', streakCount: 14, lastActiveDate: new Date().toISOString().slice(0, 10), avatarColor: '#10b981', initial: 'J' }
    ];
}

function saveSharedStreaksData(list) {
    try {
        localStorage.setItem('pel_shared_streaks', JSON.stringify(list));
    } catch (e) {}
}

let pendingSharedStreakInvite = null;

function handleIncomingSharedStreakUrl(encoded) {
    try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(encoded))));
        if (decoded && decoded.creator) {
            pendingSharedStreakInvite = decoded;
            setTimeout(() => {
                openStreakModal('shared');
            }, 300);
            return true;
        }
    } catch (e) {
        console.warn('Could not parse shared streak invite', e);
    }
    return false;
}

function openStreakModal(activeTab = 'personal') {
    const streak = getStudyStreakData();
    const sharedStreaks = getSharedStreaksData();

    const bodyHtml = `
        <div class="duolingo-streak-container">
            <!-- Duolingo Streak Navigation Segmented Tabs (Screen 3) -->
            <div class="duolingo-streak-nav">
                <button type="button" id="tab-btn-personal" class="duolingo-nav-btn ${activeTab === 'personal' ? 'active' : ''}" onclick="switchStreakModalTab('personal')">
                    🔥 PERSONAL
                </button>
                <button type="button" id="tab-btn-shared" class="duolingo-nav-btn ${activeTab === 'shared' ? 'active' : ''}" onclick="switchStreakModalTab('shared')">
                    👥 SHARED ${sharedStreaks.length > 0 ? `<span style="font-size: 11px; background: #f97316; color: #fff; padding: 1px 6px; border-radius: 9999px;">${sharedStreaks.length}</span>` : ''}
                </button>
            </div>

            <div id="duolingo-streak-tab-content">
                <!-- Rendered dynamically -->
            </div>
        </div>
    `;

    showModal('Study Streak', bodyHtml);
    switchStreakModalTab(activeTab);
}

function switchStreakModalTab(tab) {
    const container = document.getElementById('duolingo-streak-tab-content');
    const btnPersonal = document.getElementById('tab-btn-personal');
    const btnShared = document.getElementById('tab-btn-shared');
    if (!container) return;

    if (btnPersonal && btnShared) {
        btnPersonal.className = `duolingo-nav-btn ${tab === 'personal' ? 'active' : ''}`;
        btnShared.className = `duolingo-nav-btn ${tab === 'shared' ? 'active' : ''}`;
    }

    const streak = getStudyStreakData();

    if (tab === 'personal') {
        const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        const todayIdx = (new Date().getDay() + 6) % 7; // 0 = Mon ... 6 = Sun
        const telegramShareText = encodeURIComponent(`I'm on a ${streak.count}-day study streak on Past Exam Library! 🔥 Studying past papers and preparing for finals:`);
        const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent('https://past-exam-library.vercel.app')}&text=${telegramShareText}`;

        container.innerHTML = `
            <!-- Duolingo Animated Flame Hero Stage -->
            <div class="duolingo-flame-stage">
                <div class="duolingo-flame-aura"></div>
                <div class="duolingo-spark"></div>
                <div class="duolingo-spark"></div>
                <div class="duolingo-spark"></div>
                ${getDuolingoFlameSvg(110)}
            </div>

            <div class="duolingo-streak-count">${streak.count}</div>
            <h3 style="font-size: 21px; font-weight: 800; color: var(--text-main); margin-bottom: 6px;">
                ${streak.count > 1 ? `${streak.count}-Day Study Streak!` : 'Study Streak Started!'}
            </h3>
            <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.5; max-width: 380px; margin: 0 auto 16px auto;">
                ${streak.count > 1 ? "Way to go! Consistency is your superpower. Your study flame is blazing!" : "You took the first step today! Keep coming back every day to build a legendary streak."}
            </p>

            <!-- 7-Day Weekly Calendar Track -->
            <div class="duolingo-week-track">
                ${days.map((d, i) => {
                    const isToday = i === todayIdx;
                    const isLit = i <= todayIdx;
                    return `
                        <div class="duolingo-day-col">
                            <span class="duolingo-day-label">${d}</span>
                            <div class="duolingo-day-circle ${isToday ? 'today-active' : (isLit ? 'lit' : '')}">
                                ${isLit ? '🔥' : '•'}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <!-- Stats 3-Column Grid -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 22px;">
                <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-glass); border-radius: 14px; padding: 12px 8px;">
                    <div style="font-size: 20px; font-weight: 800; color: #f97316;">${streak.count}</div>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Days Active</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-glass); border-radius: 14px; padding: 12px 8px;">
                    <div style="font-size: 20px; font-weight: 800; color: #eab308;">${streak.bestStreak}</div>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Personal Best</div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-glass); border-radius: 14px; padding: 12px 8px;">
                    <div style="font-size: 20px; font-weight: 800; color: #38bdf8;">${streak.totalDays || streak.count}</div>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Total Study Days</div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <a href="${telegramShareUrl}" target="_blank" rel="noopener noreferrer" class="duolingo-btn-action" style="background: #2563eb; box-shadow: 0 4px 0 #1d4ed8;">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                    <span>Share Flame on Telegram</span>
                </a>
                <button type="button" class="duolingo-btn-action duolingo-btn-orange" onclick="closeModal(); setView('library');">
                    Continue Studying →
                </button>
            </div>
        `;
    } else {
        const sharedStreaks = getSharedStreaksData();
        const userName = state.user?.fullName || state.user?.username || 'Student';

        container.innerHTML = `
            ${pendingSharedStreakInvite ? `
                <!-- Pending Invitation Card (Screen 3 in screenshot) -->
                <div style="background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(59, 130, 246, 0.15)); border: 1.5px solid #f97316; border-radius: 16px; padding: 16px; margin-bottom: 20px; text-align: left;">
                    <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #fdba74; margin-bottom: 8px;">Pending Shared Streak</div>
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
                        <div style="width: 44px; height: 44px; border-radius: 50%; background: #3b82f6; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; font-weight: 800;">
                            ${(pendingSharedStreakInvite.creator || 'F').charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div style="font-size: 14px; font-weight: 700; color: #ffffff;">${escapeQuotes(pendingSharedStreakInvite.creator)} invited you!</div>
                            <div style="font-size: 12px; color: var(--text-muted);">Start a shared daily study streak together</div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button type="button" class="btn-secondary" style="flex: 1; padding: 9px; font-size: 12.5px; text-transform: uppercase; font-weight: 700;" onclick="declineSharedStreak()">
                            Decline
                        </button>
                        <button type="button" class="duolingo-btn-action" style="flex: 1; padding: 9px; font-size: 12.5px;" onclick="acceptSharedStreak('${escapeQuotes(pendingSharedStreakInvite.creator)}')">
                            Accept 🔥
                        </button>
                    </div>
                </div>
            ` : ''}

            <!-- Duolingo Shared Hero Header (Screen 1 in screenshot) -->
            <div class="duolingo-shared-hero">
                <div class="duolingo-avatar-bubble">🎓</div>
                <div style="font-size: 30px; animation: duolingoFlameDance 2s ease-in-out infinite;">🔥</div>
                <div class="duolingo-avatar-bubble" style="background: linear-gradient(135deg, #f97316, #ef4444);">🤝</div>
            </div>

            <h3 style="font-size: 20px; font-weight: 800; color: #ffffff; margin-bottom: 6px;">
                Learn with a friend with a Shared Streak!
            </h3>
            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; max-width: 360px; margin: 0 auto 20px auto;">
                Keep each other accountable every single day. When either of you studies, your shared flame stays alive!
            </p>

            <!-- Active Shared Streaks List (Screen 3 in screenshot) -->
            <div style="text-align: left; margin-bottom: 20px;">
                <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px; letter-spacing: 0.5px;">
                    Active Shared Streaks
                </div>
                ${sharedStreaks.length > 0 ? `
                    ${sharedStreaks.map(s => `
                        <div class="duolingo-shared-card">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div style="width: 40px; height: 40px; border-radius: 50%; background: ${s.avatarColor || '#3b82f6'}; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #ffffff; font-size: 16px;">
                                    ${s.initial || s.partnerName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div style="font-weight: 700; color: #ffffff; font-size: 14px;">with ${escapeQuotes(s.partnerName)}</div>
                                    <div style="font-size: 12px; color: #fdba74; display: flex; align-items: center; gap: 4px; font-weight: 600;">
                                        🔥 ${s.streakCount} Day Streak
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="duolingo-nudge-btn" onclick="nudgeSharedStreak('${escapeQuotes(s.partnerName)}', ${s.streakCount})">
                                🔔 Nudge
                            </button>
                        </div>
                    `).join('')}
                ` : `
                    <div style="padding: 16px; border: 1px dashed var(--border-glass); border-radius: 12px; text-align: center; color: var(--text-muted); font-size: 13px;">
                        No shared streaks yet. Invite a classmate below!
                    </div>
                `}
            </div>

            <!-- Start New Shared Streak Form (Screen 1 Match Screen) -->
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 16px; padding: 16px; text-align: left;">
                <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #38bdf8; margin-bottom: 10px; letter-spacing: 0.5px;">
                    + Add New Study Partner
                </div>
                <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                    <input type="text" id="shared-partner-input" class="search-input" style="flex: 1;" placeholder="Classmate or friend's name (e.g. Kidist)">
                </div>
                <button type="button" class="duolingo-btn-action" style="background: #0284c7; box-shadow: 0 4px 0 #0369a1;" onclick="createSharedStreakInvite()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                    <span>Invite via Telegram Link</span>
                </button>
            </div>
        `;
    }
}

function nudgeSharedStreak(partnerName, streakCount) {
    const text = encodeURIComponent(`Hey ${partnerName}! 🔥 Our ${streakCount}-day shared study streak on Past Exam Library is active! Don't let our streak break today:`);
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent('https://past-exam-library.vercel.app')}&text=${text}`;
    window.open(tgUrl, '_blank');
    showToast(`Nudge sent to ${partnerName}! 🔔`, 'success');
}

function createSharedStreakInvite() {
    const input = document.getElementById('shared-partner-input');
    const partnerName = (input?.value || '').trim() || 'Classmate';
    const creatorName = state.user?.fullName || state.user?.username || 'A friend';

    const payload = {
        creator: creatorName,
        partner: partnerName,
        date: new Date().toISOString().slice(0, 10)
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    const inviteUrl = `${window.location.origin}?shared_streak=${encoded}`;

    const text = encodeURIComponent(`Hey ${partnerName}! Start a Shared Study Streak with me on Past Exam Library! 🔥 Keep each other accountable:`);
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteUrl)}&text=${text}`;

    copyToClipboard(inviteUrl, 'Shared streak invite link copied to clipboard!');
    window.open(tgUrl, '_blank');
}

function acceptSharedStreak(creatorName) {
    const current = getSharedStreaksData();
    const cleanName = creatorName || 'Study Buddy';
    
    // Add to list
    if (!current.some(s => s.partnerName.toLowerCase() === cleanName.toLowerCase())) {
        current.push({
            id: 'ss_' + Date.now(),
            partnerName: cleanName,
            streakCount: 1,
            lastActiveDate: new Date().toISOString().slice(0, 10),
            avatarColor: '#10b981',
            initial: cleanName.charAt(0).toUpperCase()
        });
        saveSharedStreaksData(current);
    }

    pendingSharedStreakInvite = null;
    showToast(`Shared streak with ${cleanName} accepted! 🔥 Day 1 started.`, 'success');
    switchStreakModalTab('shared');
}

function declineSharedStreak() {
    pendingSharedStreakInvite = null;
    showToast('Shared streak invite declined', 'info');
    switchStreakModalTab('shared');
}

function showSessionEndStreakCelebration(streakCount, partnerName = '') {
    const streak = streakCount || getStudyStreakData().count;
    const bodyHtml = `
        <div style="text-align: center; padding: 12px 6px;">
            <!-- Screen 2 Session End Avatars + Fire from screenshot -->
            <div class="duolingo-shared-hero" style="margin-bottom: 14px;">
                <div class="duolingo-avatar-bubble">🎓</div>
                <div style="position: relative;">
                    ${getDuolingoFlameSvg(80)}
                </div>
                <div class="duolingo-avatar-bubble" style="background: linear-gradient(135deg, #f97316, #ef4444);">
                    ${partnerName ? partnerName.charAt(0).toUpperCase() : '🔥'}
                </div>
            </div>

            <div class="duolingo-streak-count" style="font-size: 68px; margin-bottom: 4px;">
                ${streak}
            </div>

            <h3 style="font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 8px;">
                Way to go!
            </h3>
            <p style="font-size: 14.5px; color: var(--text-muted); line-height: 1.5; max-width: 320px; margin: 0 auto 24px auto;">
                ${partnerName ? `You and ${partnerName} extended your Shared Streak today.` : "You extended your Daily Study Streak today."}
            </p>

            <button type="button" class="duolingo-btn-action" style="padding: 14px; font-size: 15px;" onclick="closeModal()">
                CONTINUE
            </button>
        </div>
    `;

    showModal('Streak Extended!', bodyHtml);
}

function copyToClipboard(text, msg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(msg, 'success');
        }).catch(() => {
            fallbackCopy(text, msg);
        });
    } else {
        fallbackCopy(text, msg);
    }
}

function fallbackCopy(text, msg) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        document.execCommand('copy');
        showToast(msg, 'success');
    } catch (e) {
        prompt('Copy this:', text);
    }
    document.body.removeChild(tempInput);
}

/* ========================================================
   1v1 TELEGRAM STUDY DUEL (VIRAL PEER CHALLENGE)
======================================================== */
function encodeDuelPayload(data) {
    try {
        const json = JSON.stringify(data);
        const utf8Bytes = encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (m, p) => String.fromCharCode('0x' + p));
        return encodeURIComponent(btoa(utf8Bytes));
    } catch (e) {
        return '';
    }
}

function decodeDuelPayload(encodedStr) {
    try {
        const binary = atob(decodeURIComponent(encodedStr));
        const json = decodeURIComponent(Array.prototype.map.call(binary, c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(json);
    } catch (e) {
        return null;
    }
}

function handleIncomingDuelUrl(encodedStr) {
    const duelData = decodeDuelPayload(encodedStr);
    if (!duelData || !duelData.grade || !duelData.subject) {
        return false;
    }
    showDuelLobby(duelData);
    return true;
}

function showDuelLobby(duelData) {
    state.currentView = 'duelLobby';
    pushNavState({ view: 'duelLobby' }, `1v1 Study Duel vs ${duelData.challenger || 'Classmate'}`);

    const defaultName = localStorage.getItem('pel_duel_player_name') || (state.user ? (state.user.fullName || state.user.username) : '') || '';
    const challenger = duelData.challenger || 'A classmate';
    const score = duelData.score !== undefined ? duelData.score : 4;
    const total = duelData.total || 5;

    app.innerHTML = `
        <div class="duel-arena-wrapper">
            <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 9999px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); color: #fca5a5; font-size: 13px; font-weight: 800; margin-bottom: 14px;">
                <span>⚔️</span> 1v1 TELEGRAM STUDY DUEL
            </div>

            <h2 style="font-size: 26px; color: var(--text-main); font-weight: 800; margin-bottom: 6px;">
                You Have Been Challenged!
            </h2>
            <p style="font-size: 14.5px; color: var(--text-muted); max-width: 480px; margin: 0 auto 20px; line-height: 1.5;">
                <strong style="color: #f87171;">${escapeQuotes(challenger)}</strong> challenged you to a 5-question duel in <strong>${duelData.grade} ${duelData.subject}</strong>! Can you beat their score?
            </p>

            <div class="duel-versus-container">
                <!-- Challenger Card -->
                <div class="duel-player-card">
                    <div class="duel-player-avatar" style="background: linear-gradient(135deg, #ef4444, #f97316); color: #ffffff;">
                        ${challenger.charAt(0).toUpperCase()}
                    </div>
                    <div style="font-weight: 700; color: var(--text-main); font-size: 15px;">${escapeQuotes(challenger)}</div>
                    <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Challenger</div>
                    <div class="duel-score-badge" style="color: #ef4444;">
                        ${score} / ${total}
                    </div>
                    <div style="font-size: 11px; color: #fca5a5; font-weight: 600; margin-top: 2px;">Score to beat</div>
                </div>

                <!-- VS Badge -->
                <div class="duel-vs-badge">
                    VS
                </div>

                <!-- Opponent (You) -->
                <div class="duel-player-card">
                    <div class="duel-player-avatar" style="background: linear-gradient(135deg, #0ea5e9, #6366f1); color: #ffffff;">
                        ?
                    </div>
                    <div style="font-weight: 700; color: var(--text-main); font-size: 15px;">You</div>
                    <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Challenger Acceptor</div>
                    <div class="duel-score-badge" style="color: #38bdf8;">
                        ? / ${total}
                    </div>
                    <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; margin-top: 2px;">Your Turn</div>
                </div>
            </div>

            <!-- Name Input -->
            <div style="max-width: 360px; margin: 0 auto 24px; text-align: left;">
                <label style="font-size: 13px; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 6px;">
                    Enter your nickname for the scoreboard:
                </label>
                <input type="text" id="duel-acceptor-name" class="auth-input" style="width: 100%; box-sizing: border-box; padding: 11px 14px; border-radius: 10px; background: rgba(255,255,255,0.06); border: 1px solid var(--border-glass); color: var(--text-main); font-size: 14px;" value="${escapeQuotes(defaultName)}" placeholder="e.g. Nahom, Soliyana, Kidus...">
            </div>

            <div style="display: flex; flex-direction: column; gap: 12px; max-width: 360px; margin: 0 auto;">
                <button class="duolingo-btn-action" style="background: #58cc02; box-shadow: 0 4px 0 #46a302; padding: 15px; font-size: 15px;" onclick="acceptDuelChallenge('${escapeQuotes(JSON.stringify(duelData))}')">
                    ⚔️ START 5-QUESTION BATTLE →
                </button>
                <button class="btn-secondary" style="justify-content: center; width: 100%; padding: 12px; font-weight: 700; border-radius: 12px;" onclick="showLibraryHome()">
                    Decline &amp; Browse Library
                </button>
            </div>
        </div>
    `;
}

async function acceptDuelChallenge(duelDataJson) {
    const duelData = typeof duelDataJson === 'string' ? JSON.parse(duelDataJson) : duelDataJson;
    const nameInput = document.getElementById('duel-acceptor-name');
    const acceptorName = (nameInput?.value || '').trim() || 'Challenger';
    localStorage.setItem('pel_duel_player_name', acceptorName);

    const duelMeta = {
        isCreator: false,
        challenger: duelData.challenger,
        score: duelData.score,
        total: duelData.total || 5,
        grade: duelData.grade,
        subject: duelData.subject,
        opponentName: acceptorName
    };

    showToast(`Loading 5 duel questions... Get ready!`, 'info');
    await launchDuelSession(duelData.grade, duelData.subject, duelData.challenger, duelData.qIds, duelMeta);
}

function openStartDuelModal(presetGrade, presetSubject) {
    const grades = state.categories.grades || [];
    const defaultGrade = presetGrade || 'Grade12';
    const subjectsForGrade = (state.categories.subjects && state.categories.subjects[defaultGrade]) || ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
    const defaultSubject = presetSubject || subjectsForGrade[0] || 'Mathematics';
    const savedName = localStorage.getItem('pel_duel_player_name') || (state.user ? (state.user.fullName || state.user.username) : '') || '';

    const bodyHtml = `
        <div style="padding: 4px 0 10px 0; text-align: left;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px; background: linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(168, 85, 247, 0.15)); padding: 14px 16px; border-radius: 14px; border: 1px solid rgba(239, 68, 68, 0.3);">
                <div style="font-size: 30px; flex-shrink: 0;">⚔️</div>
                <div>
                    <h4 style="margin: 0; font-size: 16px; color: var(--text-main); font-weight: 700;">1v1 Telegram Study Duel</h4>
                    <p style="margin: 3px 0 0; font-size: 12.5px; color: var(--text-muted); line-height: 1.4;">
                        Play a quick 5-question challenge, lock in your score, and challenge your friends on Telegram!
                    </p>
                </div>
            </div>

            <div class="auth-form-group">
                <label>Your Nickname or Name *</label>
                <input type="text" id="duel-input-name" placeholder="e.g. Nahom, Soliyana, Kidus..." value="${escapeQuotes(savedName)}" required>
            </div>

            <div class="auth-form-group">
                <label>Select Grade *</label>
                <select id="duel-select-grade" onchange="updateDuelSubjectDropdown(this.value)">
                    ${grades.map(g => `<option value="${g.id}" ${g.id === defaultGrade ? 'selected' : ''}>${g.name}</option>`).join('')}
                </select>
            </div>

            <div class="auth-form-group">
                <label>Select Subject *</label>
                <select id="duel-select-subject">
                    ${subjectsForGrade.map(s => `<option value="${escapeQuotes(s)}" ${s === defaultSubject ? 'selected' : ''}>${s}</option>`).join('')}
                </select>
            </div>

            <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 10px;">
                <button type="button" class="btn-primary duel-launch-btn" style="justify-content: center; width: 100%; padding: 13px;" onclick="confirmStartDuel()">
                    ⚔️ Start 5-Question Duel →
                </button>
            </div>
        </div>
    `;

    showModal('Start 1v1 Study Duel', bodyHtml);
}

function updateDuelSubjectDropdown(gradeId) {
    const select = document.getElementById('duel-select-subject');
    if (!select) return;
    const subjects = (state.categories.subjects && state.categories.subjects[gradeId]) || ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
    select.innerHTML = subjects.map(s => `<option value="${escapeQuotes(s)}">${s}</option>`).join('');
}

async function confirmStartDuel() {
    const nameInput = document.getElementById('duel-input-name');
    const gradeSelect = document.getElementById('duel-select-grade');
    const subjectSelect = document.getElementById('duel-select-subject');

    const name = (nameInput?.value || '').trim() || 'Student';
    const grade = gradeSelect?.value || 'Grade12';
    const subject = subjectSelect?.value || 'Mathematics';

    localStorage.setItem('pel_duel_player_name', name);
    closeModal();

    showToast(`Loading 5 duel questions for ${grade} ${subject}...`, 'info');
    await launchDuelSession(grade, subject, name, null, null);
}

async function launchDuelSession(grade, subject, challengerName, existingQIds = null, duelMeta = null) {
    if (currentQuiz.timerInterval) clearInterval(currentQuiz.timerInterval);

    let allQuestions = [];
    try {
        const res = await fetch(`/api/practice?grade=${grade}&subject=${encodeURIComponent(subject)}`);
        const data = await res.json();
        allQuestions = data.questions || [];
    } catch (e) {
        console.warn('Duel fetch error, checking offline cache', e);
    }

    if (allQuestions.length === 0) {
        try {
            const raw = localStorage.getItem('pel_offline_questions');
            if (raw) {
                const clean = s => (s || '').toLowerCase().replace(/[\s_-]+/g, '');
                allQuestions = JSON.parse(raw).filter(q => clean(q.grade) === clean(grade) && clean(q.subject) === clean(subject));
            }
        } catch (e) {}
    }

    let selected5 = [];
    if (existingQIds && existingQIds.length > 0) {
        const qMap = new Map();
        allQuestions.forEach(q => qMap.set(q.id, q));
        existingQIds.forEach(id => {
            if (qMap.has(id)) selected5.push(qMap.get(id));
        });
    }

    if (selected5.length < 5) {
        const remaining = allQuestions.filter(q => !selected5.includes(q));
        const shuffled = [...remaining].sort(() => 0.5 - Math.random());
        selected5 = selected5.concat(shuffled.slice(0, 5 - selected5.length));
    }

    if (selected5.length === 0) {
        showToast(`No questions found for ${grade} ${subject} yet. Try another subject!`, 'error');
        return;
    }

    currentQuiz = {
        grade,
        semester: 'Duel',
        examType: '1v1 Duel',
        subject,
        mode: 'duel',
        examTitle: `1v1 Duel: ${grade} ${subject}`,
        filePath: '',
        backFn: showLibraryHome,
        questions: selected5,
        currentIndex: 0,
        answers: {},
        checked: {},
        flagged: {},
        startTime: Date.now(),
        timeRemaining: 300,
        timerInterval: null,
        hideAnswers: true,
        duel: duelMeta || {
            isCreator: true,
            challengerName: challengerName || 'Student',
            grade,
            subject,
            qIds: selected5.map(q => q.id)
        }
    };

    renderQuizScreen();
}

function openShareDuelModal(score, total, grade, subject, qIds) {
    const defaultName = localStorage.getItem('pel_duel_player_name') || (state.user ? (state.user.fullName || state.user.username) : '') || '';
    const actualScore = score !== undefined ? score : (currentQuiz ? Object.keys(currentQuiz.answers).filter(k => currentQuiz.answers[k] === currentQuiz.questions.find(q => q.id === k)?.correctAnswer).length : 5);
    const actualTotal = total || (currentQuiz ? currentQuiz.questions.length : 5);
    const actualGrade = grade || currentQuiz?.grade || 'Grade12';
    const actualSubject = subject || currentQuiz?.subject || 'Mathematics';
    const actualQIds = qIds || (currentQuiz ? currentQuiz.questions.map(q => q.id) : []);

    const bodyHtml = `
        <div style="padding: 4px 0 10px 0; text-align: left;">
            <div style="text-align: center; margin-bottom: 18px;">
                <div style="width: 58px; height: 58px; margin: 0 auto 12px auto; background: linear-gradient(135deg, #ef4444, #9333ea); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 8px 24px rgba(239, 68, 68, 0.35);">
                    ⚔️
                </div>
                <h4 style="font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">Challenge Your Classmates!</h4>
                <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; max-width: 380px; margin: 0 auto;">
                    Your score of <strong>${actualScore}/${actualTotal}</strong> in ${actualGrade} ${actualSubject} is ready to challenge friends on Telegram!
                </p>
            </div>

            <div class="auth-form-group">
                <label>Your Name / Nickname on the Duel Invite</label>
                <input type="text" id="share-duel-sender-name" value="${escapeQuotes(defaultName)}" placeholder="e.g. Nahom, Kidus..." oninput="updateDuelSharePreview(${actualScore}, ${actualTotal}, '${actualGrade}', '${escapeQuotes(actualSubject)}')">
            </div>

            <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-glass); border-radius: 12px; padding: 12px 14px; margin-bottom: 18px;">
                <div style="font-size: 11px; color: #fca5a5; font-weight: 800; text-transform: uppercase; margin-bottom: 4px;">Telegram Invite Preview</div>
                <div id="duel-telegram-preview" style="font-size: 12.5px; color: var(--text-main); line-height: 1.45;">
                    ⚔️ <strong>${escapeQuotes(defaultName || 'A classmate')}</strong> challenged you to a 1v1 ${actualGrade} ${actualSubject} duel! Score to beat: <strong>${actualScore}/${actualTotal}</strong>. Can you beat it?
                </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button type="button" class="btn-primary duel-launch-btn" style="justify-content: center; width: 100%; padding: 13px;" onclick="triggerTelegramDuelShare(${actualScore}, ${actualTotal}, '${actualGrade}', '${escapeQuotes(actualSubject)}', '${escapeQuotes(JSON.stringify(actualQIds))}')">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                    <span>Share on Telegram Group / Chat</span>
                </button>
                <button type="button" class="btn-secondary" style="justify-content: center; width: 100%; padding: 10px;" onclick="copyDuelDirectLink(${actualScore}, ${actualTotal}, '${actualGrade}', '${escapeQuotes(actualSubject)}', '${escapeQuotes(JSON.stringify(actualQIds))}')">
                    ${uiIcon('copy', 14)} Copy Duel Link
                </button>
            </div>
        </div>
    `;

    showModal('1v1 Duel Challenge', bodyHtml);
}

function updateDuelSharePreview(score, total, grade, subject) {
    const input = document.getElementById('share-duel-sender-name');
    const preview = document.getElementById('duel-telegram-preview');
    if (!preview) return;
    const name = (input?.value || '').trim() || 'A classmate';
    preview.innerHTML = `⚔️ <strong>${escapeQuotes(name)}</strong> challenged you to a 1v1 ${grade} ${subject} duel! Score to beat: <strong>${score}/${total}</strong>. Can you beat it?`;
}

function getDuelShareDetails(score, total, grade, subject, qIdsJson) {
    const nameInput = document.getElementById('share-duel-sender-name');
    const name = (nameInput?.value || '').trim() || localStorage.getItem('pel_duel_player_name') || 'A classmate';
    localStorage.setItem('pel_duel_player_name', name);

    let parsedQIds = [];
    try {
        parsedQIds = typeof qIdsJson === 'string' ? JSON.parse(qIdsJson) : qIdsJson;
    } catch (e) {}

    const payload = {
        challenger: name,
        score,
        total,
        grade,
        subject,
        qIds: parsedQIds
    };

    const encoded = encodeDuelPayload(payload);
    const duelUrl = `${window.location.origin}/?duel=${encoded}`;
    const shareText = `⚔️ ${name} challenged you to a 1v1 ${grade} ${subject} duel on Past Exam Library! Score to beat: ${score}/${total} 🔥 Can you beat it?`;

    return { duelUrl, shareText };
}

function triggerTelegramDuelShare(score, total, grade, subject, qIdsJson) {
    const { duelUrl, shareText } = getDuelShareDetails(score, total, grade, subject, qIdsJson);
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(duelUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(tgUrl, '_blank', 'noopener,noreferrer');
}

function copyDuelDirectLink(score, total, grade, subject, qIdsJson) {
    const { duelUrl } = getDuelShareDetails(score, total, grade, subject, qIdsJson);
    copyToClipboard(duelUrl, '1v1 Duel challenge link copied to clipboard!');
}

function renderDuelResultsArena(duel, userScore, total) {
    state.currentView = 'duelResults';
    pushNavState({ view: 'duelResults' }, '1v1 Study Duel Results');

    const challenger = duel.challenger || 'Challenger';
    const challengerScore = duel.score !== undefined ? duel.score : 0;
    const opponent = duel.opponentName || 'You';

    const isWinner = userScore > challengerScore;
    const isTie = userScore === challengerScore;
    const isLoser = userScore < challengerScore;

    let headline = '';
    let subtext = '';
    let emoji = '';
    let headlineColor = '';

    if (isWinner) {
        headline = `🏆 VICTORY! You defeated ${escapeQuotes(challenger)}!`;
        subtext = `Incredible work! You scored ${userScore}/${total} vs ${challenger}'s ${challengerScore}/${total}.`;
        emoji = '🏆';
        headlineColor = '#34d399';
    } else if (isTie) {
        headline = `🤝 IT'S A TIE! Great minds think alike!`;
        subtext = `Both you and ${escapeQuotes(challenger)} scored ${userScore}/${total} in ${duel.grade} ${duel.subject}.`;
        emoji = '🤝';
        headlineColor = '#a78bfa';
    } else {
        headline = `⚡ ${escapeQuotes(challenger)} wins this round!`;
        subtext = `${challenger} scored ${challengerScore}/${total} vs your ${userScore}/${total}. Ready for a rematch?`;
        emoji = '⚡';
        headlineColor = '#f87171';
    }

    const shareBackText = encodeURIComponent(
        isWinner
            ? `I just defeated ${challenger} in a 1v1 ${duel.subject} duel on Past Exam Library! My score: ${userScore}/${total} vs ${challengerScore}/${total} 🏆 Try to beat me:`
            : (isTie
                ? `I tied with ${challenger} in a 1v1 ${duel.subject} duel on Past Exam Library (${userScore}/${total})! 🤝 Who can break the tie?`
                : `${challenger} beat me in a 1v1 ${duel.subject} duel (${challengerScore}/${total} vs ${userScore}/${total}) on Past Exam Library! ⚔️ Can someone take revenge for me:`)
    );
    const duelUrl = `${window.location.origin}/?duel=${encodeDuelPayload({
        challenger: opponent,
        score: userScore,
        total,
        grade: duel.grade,
        subject: duel.subject,
        qIds: currentQuiz.questions.map(q => q.id)
    })}`;

    const tgShareUrl = `https://t.me/share/url?url=${encodeURIComponent(duelUrl)}&text=${shareBackText}`;

    app.innerHTML = `
        <div class="duel-arena-wrapper">
            <div style="font-size: 48px; margin-bottom: 10px;">${emoji}</div>
            <h2 style="font-size: 26px; color: ${headlineColor}; font-weight: 800; margin-bottom: 8px;">
                ${headline}
            </h2>
            <p style="font-size: 14.5px; color: var(--text-muted); max-width: 480px; margin: 0 auto 24px; line-height: 1.5;">
                ${subtext}
            </p>

            <div class="duel-versus-container">
                <!-- Challenger Card -->
                <div class="duel-player-card ${isLoser ? 'winner' : ''}">
                    <div class="duel-player-avatar" style="background: linear-gradient(135deg, #ef4444, #f97316); color: #ffffff;">
                        ${challenger.charAt(0).toUpperCase()}
                    </div>
                    <div style="font-weight: 700; color: var(--text-main); font-size: 15px;">${escapeQuotes(challenger)}</div>
                    <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Challenger</div>
                    <div class="duel-score-badge" style="color: ${isLoser ? '#34d399' : 'var(--text-main)'};">
                        ${challengerScore} / ${total}
                    </div>
                    ${isLoser ? '<span style="font-size: 11px; color: #34d399; font-weight: 700;">WINNER 🏆</span>' : ''}
                </div>

                <!-- VS Badge -->
                <div class="duel-vs-badge">
                    VS
                </div>

                <!-- Opponent (You) -->
                <div class="duel-player-card ${isWinner ? 'winner' : ''}">
                    <div class="duel-player-avatar" style="background: linear-gradient(135deg, #0ea5e9, #6366f1); color: #ffffff;">
                        ${opponent.charAt(0).toUpperCase()}
                    </div>
                    <div style="font-weight: 700; color: var(--text-main); font-size: 15px;">${escapeQuotes(opponent)} (You)</div>
                    <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Defender</div>
                    <div class="duel-score-badge" style="color: ${isWinner ? '#34d399' : 'var(--text-main)'};">
                        ${userScore} / ${total}
                    </div>
                    ${isWinner ? '<span style="font-size: 11px; color: #34d399; font-weight: 700;">WINNER 🏆</span>' : ''}
                </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px; margin: 24px auto 0;">
                <a href="${tgShareUrl}" target="_blank" rel="noopener noreferrer" class="duolingo-btn-action" style="background: #58cc02; box-shadow: 0 4px 0 #46a302; padding: 14px 20px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                    <span>SEND RESULTS ON TELEGRAM</span>
                </a>
                <button class="duolingo-btn-action duolingo-btn-orange" style="padding: 13px 20px;" onclick="openStartDuelModal('${duel.grade}', '${escapeQuotes(duel.subject)}')">
                    ⚔️ START A NEW 1V1 DUEL
                </button>
                <button class="btn-secondary" style="padding: 12px; justify-content: center; font-weight: 700; border-radius: 12px;" onclick="showLibraryHome()">
                    Back to Library Home
                </button>
            </div>
        </div>
    `;
}

/* ========================================================
   THEME MANAGEMENT (LIGHT & DARK MODE)
======================================================== */
function getTheme() {
    return document.documentElement.getAttribute('data-theme') || (function() {
        try {
            return localStorage.getItem('pel_theme') || 'dark';
        } catch(e) {
            return 'dark';
        }
    })();
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
        localStorage.setItem('pel_theme', theme);
    } catch (e) {}
    state.theme = theme;
    renderHeader();
}

function toggleTheme() {
    const nextTheme = getTheme() === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
}

/* ========================================================
   HEADER NAVIGATION (COMPACT ICON BUTTONS WITH HOVER REVEAL)
======================================================== */

function renderHeader() {
    const isOnline = navigator.onLine;
    const currentTheme = getTheme();
    const isLight = currentTheme === 'light';

    const isIOS = isIosDevice();
    const appBtnLabel = isIOS ? 'iOS App' : 'Get App';
    const appBtnTooltip = isIOS ? 'Install on iPhone & iPad (iOS)' : 'Get Android App (.APK) & iOS App';
    const appBtnIcon = isIOS ? `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
    ` : `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
    `;

    const pwaControls = `
        <div class="pwa-nav-container">
            <span class="offline-pill ${isOnline ? '' : 'offline'}" title="${isOnline ? 'Online: Connected to school archive' : 'Offline: Practicing with cached exam papers'}">
                <span class="status-dot"></span> <span class="offline-pill-text">${isOnline ? 'Online' : 'Offline'}</span>
            </span>
            <button id="pwa-install-btn" class="nav-btn pwa-install-btn" style="display: inline-flex;" onclick="openAppInstallModal()" data-tooltip="${appBtnTooltip}" aria-label="${appBtnTooltip}">
                ${appBtnIcon}
                <span class="nav-btn-label">${appBtnLabel}</span>
            </button>
        </div>
    `;

    const themeToggleBtn = `
        <button class="nav-btn theme-toggle-btn" onclick="toggleTheme()" data-tooltip="${isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}" aria-label="Toggle Theme">
            ${uiIcon(isLight ? 'moon' : 'sun', 15)}
            <span class="nav-btn-label">${isLight ? 'Dark mode' : 'Light mode'}</span>
        </button>
    `;

    const isLibraryActive = state.currentView === 'library' || state.currentView === 'grade' || state.currentView === 'semester' || state.currentView === 'examType' || state.currentView === 'hub';
    const isFormulasActive = state.currentView === 'formulas' || state.currentView === 'formulaGrades' || state.currentView === 'formulaSubjects' || state.currentView === 'formulaSheet';
    const isStudyHubActive = state.currentView === 'studyhub';
    const isStudyDeskActive = state.currentView === 'studydesk';

    const telegramBtn = `
        <a href="https://t.me/BGMCS1236" target="_blank" rel="noopener noreferrer" class="nav-btn nav-btn-telegram" data-tooltip="Join Telegram Channel (@BGMCS1236)" aria-label="Join our Telegram Channel @BGMCS1236">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
            </svg>
            <span class="nav-btn-label">Telegram</span>
        </a>
    `;

    if (!state.user) {
        headerNav.innerHTML = `
            ${pwaControls}
            <button class="nav-btn ${isLibraryActive ? 'active' : ''}" onclick="setView('library')" data-tooltip="Exam library" aria-label="Exam library">
                ${uiIcon('book', 15)}
                <span class="nav-btn-label">Exam library</span>
            </button>
            <button class="nav-btn ${isStudyDeskActive ? 'active' : ''}" onclick="showStudyDesk()" data-tooltip="Focus Study Room" aria-label="Focus Study Room">
                ${uiIcon('zap', 15)}
                <span class="nav-btn-label">Study Room</span>
            </button>
            <button class="nav-btn ${isFormulasActive ? 'active' : ''}" onclick="setView('formulas')" data-tooltip="Formula sheets" aria-label="Formula sheets">
                ${uiIcon('calculator', 15)}
                <span class="nav-btn-label">Formula sheets</span>
            </button>
            <button class="nav-btn ${isStudyHubActive ? 'active' : ''}" onclick="setView('studyhub')" data-tooltip="My study hub" aria-label="My study hub">
                ${uiIcon('bookmark', 15)}
                <span class="nav-btn-label">My study hub</span>
            </button>
            ${telegramBtn}
            ${themeToggleBtn}
            <button class="nav-btn nav-btn-signin" onclick="setView('login')" data-tooltip="Sign in" aria-label="Sign in">
                ${uiIcon('user', 15)}
                <span class="nav-btn-label">Sign in</span>
            </button>
        `;
        updateMobileBottomNav();
        return;
    }

    const isAdmin = state.user.role === 'admin';
    const isAdminActive = state.currentView === 'admin';
    const displayName = state.user.fullName || state.user.username || 'Student';
    const userInitial = displayName.trim().charAt(0).toUpperCase() || 'S';
    const currentAvatarId = state.user.avatarId || 'valedictorian';
    const avatarBadgeHtml = (typeof renderStudentAvatarSvg === 'function')
        ? `<div style="width: 30px; height: 30px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.4); border: 1.5px solid rgba(255,255,255,0.25); flex-shrink: 0;">${renderStudentAvatarSvg(currentAvatarId, 30)}</div>`
        : `<div class="activity-user-avatar" style="width: 28px; height: 28px; font-size: 12px; margin-right: 2px;">${userInitial}</div>`;

    headerNav.innerHTML = `
        ${pwaControls}
        <div class="user-badge" onclick="openProfileModal()" style="cursor: pointer; display: flex; align-items: center; gap: 8px;" title="Student Identity Card: ${escapeQuotes(displayName)} (Click to view, customize avatar, or edit)" data-tooltip="Student Profile: ${escapeQuotes(displayName)}">
            ${avatarBadgeHtml}
            <div style="display: flex; flex-direction: column; text-align: left; line-height: 1.2;">
                <span class="user-name" style="font-weight: 700; color: var(--text-main); font-size: 13.5px;">${displayName}</span>
                <span class="role-pill ${isAdmin ? 'admin' : ''}" style="font-size: 9.5px; padding: 1px 6px; align-self: flex-start;">${isAdmin ? 'Admin' : 'Student'}</span>
            </div>
        </div>

        <button class="nav-btn ${isLibraryActive ? 'active' : ''}" onclick="setView('library')" data-tooltip="Exam library" aria-label="Exam library">
            ${uiIcon('book', 15)}
            <span class="nav-btn-label">Exam library</span>
        </button>
        <button class="nav-btn ${isStudyDeskActive ? 'active' : ''}" onclick="showStudyDesk()" data-tooltip="Focus Study Room" aria-label="Focus Study Room">
            ${uiIcon('zap', 15)}
            <span class="nav-btn-label">Study Room</span>
        </button>
        <button class="nav-btn ${isFormulasActive ? 'active' : ''}" onclick="setView('formulas')" data-tooltip="Formula sheets" aria-label="Formula sheets">
            ${uiIcon('calculator', 15)}
            <span class="nav-btn-label">Formula sheets</span>
        </button>
        <button class="nav-btn ${isStudyHubActive ? 'active' : ''}" onclick="setView('studyhub')" data-tooltip="My study hub" aria-label="My study hub">
            ${uiIcon('bookmark', 15)}
            <span class="nav-btn-label">My study hub</span>
        </button>

        ${isAdmin ? `
            <button class="nav-btn ${isAdminActive ? 'active' : ''}" onclick="setView('admin')" data-tooltip="Admin dashboard" aria-label="Admin dashboard">
                ${uiIcon('activity', 15)}
                <span class="nav-btn-label">Admin</span>
            </button>
        ` : ''}

        ${telegramBtn}
        ${themeToggleBtn}

        <button class="nav-btn" onclick="logout()" data-tooltip="Sign out" aria-label="Sign out">
            ${uiIcon('export', 15)}
            <span class="nav-btn-label">Sign out</span>
        </button>
    `;
    updateMobileBottomNav();
}

function updateMobileBottomNav() {
    const isLibraryActive = state.currentView === 'library' || state.currentView === 'grade' || state.currentView === 'semester' || state.currentView === 'examType' || state.currentView === 'hub';
    const isPracticeActive = state.currentView === 'practiceGradeCatalog' || state.currentView === 'practiceExamTypeCatalog' || state.currentView === 'practiceSubjectCatalog' || state.currentView === 'quiz' || state.currentView === 'quizSummary';
    const isFormulasActive = state.currentView === 'formulas' || state.currentView === 'formulaGrades' || state.currentView === 'formulaSubjects' || state.currentView === 'formulaSheet';
    const isStudyHubActive = state.currentView === 'studyhub';

    const setItemActive = (id, active) => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', !!active);
    };

    setItemActive('mob-nav-exams', isLibraryActive);
    setItemActive('mob-nav-practice', isPracticeActive);
    setItemActive('mob-nav-formulas', isFormulasActive);
    setItemActive('mob-nav-studyhub', isStudyHubActive);
}

// ========================================================
// STUDENT IDENTITY, DISTINCTIVE AVATAR & CHARACTER SYSTEM
// ========================================================
const STUDENT_AVATARS = {
    valedictorian: {
        id: 'valedictorian',
        name: 'The Valedictorian',
        title: 'National Top Scorer',
        badge: '🎓',
        roleHint: 'National Exam Honors & University Entrance',
        color: '#6366f1',
        render: (s) => `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="v-bg-${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1e1b4b"/><stop offset="100%" stop-color="#312e81"/></linearGradient>
                    <linearGradient id="v-skin-${s}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f5d0b0"/><stop offset="100%" stop-color="#e2b189"/></linearGradient>
                    <linearGradient id="v-gold-${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#facc15"/><stop offset="100%" stop-color="#eab308"/></linearGradient>
                    <linearGradient id="v-gown-${s}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#v-bg-${s})" stroke="#6366f1" stroke-width="2.5"/>
                <circle cx="20" cy="25" r="1.5" fill="#facc15" opacity="0.8"/>
                <circle cx="80" cy="22" r="1.5" fill="#facc15" opacity="0.8"/>
                <circle cx="85" cy="55" r="1" fill="#ffffff" opacity="0.6"/>
                <path d="M 20 96 C 20 74, 36 68, 50 68 C 64 68, 80 74, 80 96 Z" fill="url(#v-gown-${s})"/>
                <path d="M 38 68 L 44 96 L 50 96 L 46 68 Z" fill="url(#v-gold-${s})"/>
                <path d="M 62 68 L 56 96 L 50 96 L 54 68 Z" fill="url(#v-gold-${s})"/>
                <polygon points="50,72 52,76 56,76 53,79 54,83 50,81 46,83 47,79 44,76 48,76" fill="#facc15"/>
                <rect x="44" y="58" width="12" height="13" rx="4" fill="#e2b189"/>
                <ellipse cx="50" cy="46" rx="18" ry="20" fill="url(#v-skin-${s})"/>
                <ellipse cx="43" cy="46" rx="2.5" ry="3" fill="#1e293b"/>
                <ellipse cx="57" cy="46" rx="2.5" ry="3" fill="#1e293b"/>
                <circle cx="44" cy="45" r="0.8" fill="#ffffff"/>
                <circle cx="58" cy="45" r="0.8" fill="#ffffff"/>
                <circle cx="43" cy="46" r="6" stroke="#facc15" stroke-width="1.4" fill="none" opacity="0.9"/>
                <circle cx="57" cy="46" r="6" stroke="#facc15" stroke-width="1.4" fill="none" opacity="0.9"/>
                <line x1="49" y1="46" x2="51" y2="46" stroke="#facc15" stroke-width="1.4"/>
                <path d="M 45 54 Q 50 58 55 54" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                <polygon points="50,18 78,28 50,38 22,28" fill="#0f172a" stroke="#facc15" stroke-width="1.2"/>
                <rect x="36" y="29" width="28" height="6" rx="3" fill="#1e293b"/>
                <circle cx="50" cy="28" r="2.5" fill="#facc15"/>
                <path d="M 50 28 Q 66 30 68 44" stroke="#facc15" stroke-width="1.8" fill="none"/>
                <circle cx="68" cy="45" r="2" fill="#eab308"/>
            </svg>`
    },
    physicist: {
        id: 'physicist',
        name: 'The Quantum Physicist',
        title: 'STEM & Formula Prodigy',
        badge: '⚡',
        roleHint: 'Math, Physics & Chemical Reactions',
        color: '#14b8a6',
        render: (s) => `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="p-bg-${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#042f2e"/><stop offset="100%" stop-color="#0f766e"/></linearGradient>
                    <linearGradient id="p-skin-${s}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e8b896"/><stop offset="100%" stop-color="#cf9770"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#p-bg-${s})" stroke="#14b8a6" stroke-width="2.5"/>
                <ellipse cx="50" cy="48" rx="42" ry="14" fill="none" stroke="#22d3ee" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" transform="rotate(-25 50 48)"/>
                <ellipse cx="50" cy="48" rx="42" ry="14" fill="none" stroke="#a7f3d0" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" transform="rotate(25 50 48)"/>
                <circle cx="22" cy="38" r="2.5" fill="#22d3ee"/>
                <circle cx="78" cy="58" r="2.5" fill="#34d399"/>
                <path d="M 20 96 C 20 74, 36 68, 50 68 C 64 68, 80 74, 80 96 Z" fill="#f8fafc"/>
                <path d="M 40 70 L 50 96 L 60 70 Z" fill="#0f766e"/>
                <rect x="44" y="58" width="12" height="13" rx="4" fill="#cf9770"/>
                <ellipse cx="50" cy="46" rx="18" ry="20" fill="url(#p-skin-${s})"/>
                <path d="M 30 38 Q 36 22 50 24 Q 64 22 70 38 Q 62 30 50 32 Q 38 30 30 38 Z" fill="#1e293b"/>
                <rect x="33" y="30" width="34" height="10" rx="5" fill="#0f172a" stroke="#22d3ee" stroke-width="1.5"/>
                <circle cx="41" cy="35" r="4" fill="#06b6d4" opacity="0.85"/>
                <circle cx="59" cy="35" r="4" fill="#06b6d4" opacity="0.85"/>
                <ellipse cx="43" cy="48" rx="2.5" ry="3" fill="#0f172a"/>
                <ellipse cx="57" cy="48" rx="2.5" ry="3" fill="#0f172a"/>
                <circle cx="44" cy="47" r="0.8" fill="#ffffff"/>
                <circle cx="58" cy="47" r="0.8" fill="#ffffff"/>
                <path d="M 45 56 Q 50 59 55 56" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            </svg>`
    },
    astronaut: {
        id: 'astronaut',
        name: 'The Cosmic Explorer',
        title: 'High Horizons Pioneer',
        badge: '🚀',
        roleHint: 'Astronomy, Universal Limits & Focus',
        color: '#38bdf8',
        render: (s) => `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="a-bg-${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#090d16"/><stop offset="100%" stop-color="#1e1b4b"/></linearGradient>
                    <linearGradient id="a-visor-${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#38bdf8"/><stop offset="50%" stop-color="#818cf8"/><stop offset="100%" stop-color="#c084fc"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#a-bg-${s})" stroke="#38bdf8" stroke-width="2.5"/>
                <polygon points="25,20 26,23 29,24 26,25 25,28 24,25 21,24 24,23" fill="#38bdf8"/>
                <polygon points="76,28 77,30 79,31 77,32 76,34 75,32 73,31 75,30" fill="#facc15"/>
                <path d="M 18 96 C 18 72, 34 66, 50 66 C 66 66, 82 72, 82 96 Z" fill="#f1f5f9"/>
                <rect x="42" y="74" width="16" height="8" rx="2" fill="#0284c7"/>
                <circle cx="50" cy="44" r="24" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
                <ellipse cx="50" cy="44" rx="19" ry="16" fill="url(#a-visor-${s})"/>
                <path d="M 36 34 Q 48 30 62 36 Q 52 33 38 40 Z" fill="#ffffff" opacity="0.6"/>
                <rect x="23" y="40" width="5" height="10" rx="2" fill="#0284c7"/>
                <rect x="72" y="40" width="5" height="10" rx="2" fill="#0284c7"/>
            </svg>`
    },
    cyber_architect: {
        id: 'cyber_architect',
        name: 'The Cyber Architect',
        title: 'Digital & Logic Master',
        badge: '💻',
        roleHint: 'Computer Science, Algorithms & Logic',
        color: '#ec4899',
        render: (s) => `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="c-bg-${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2e1065"/><stop offset="100%" stop-color="#4c1d95"/></linearGradient>
                    <linearGradient id="c-skin-${s}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e2b490"/><stop offset="100%" stop-color="#c69572"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#c-bg-${s})" stroke="#ec4899" stroke-width="2.5"/>
                <path d="M 12 30 L 26 30 L 32 40" stroke="#a855f7" stroke-width="1.2" fill="none" opacity="0.7"/>
                <path d="M 88 35 L 74 35 L 68 45" stroke="#06b6d4" stroke-width="1.2" fill="none" opacity="0.7"/>
                <path d="M 20 96 C 20 74, 36 66, 50 66 C 64 66, 80 74, 80 96 Z" fill="#0f172a"/>
                <path d="M 36 68 L 50 88 L 64 68" stroke="#ec4899" stroke-width="2" fill="none"/>
                <rect x="44" y="56" width="12" height="14" rx="4" fill="#c69572"/>
                <ellipse cx="50" cy="44" rx="18" ry="20" fill="url(#c-skin-${s})"/>
                <path d="M 32 38 Q 36 18 50 18 Q 66 18 68 38 Q 62 26 50 26 Q 38 26 32 38 Z" fill="#06b6d4"/>
                <rect x="30" y="38" width="40" height="13" rx="4" fill="#09090b" stroke="#ec4899" stroke-width="2"/>
                <line x1="34" y1="44" x2="66" y2="44" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="4,2"/>
                <circle cx="50" cy="44" r="2" fill="#ec4899"/>
                <path d="M 46 54 Q 52 57 56 53" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            </svg>`
    },
    lion_champion: {
        id: 'lion_champion',
        name: 'The St. Michael Champion',
        title: 'School Heritage Scholar',
        badge: '🦁',
        roleHint: 'Blessed G/Michael Pride & Excellence',
        color: '#f59e0b',
        render: (s) => `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="l-bg-${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#451a03"/><stop offset="100%" stop-color="#78350f"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#l-bg-${s})" stroke="#facc15" stroke-width="2.5"/>
                <path d="M 16 35 A 40 40 0 0 1 84 35" fill="none" stroke="#22c55e" stroke-width="2" opacity="0.7"/>
                <path d="M 19 32 A 40 40 0 0 1 81 32" fill="none" stroke="#eab308" stroke-width="2" opacity="0.7"/>
                <path d="M 22 29 A 40 40 0 0 1 78 29" fill="none" stroke="#ef4444" stroke-width="2" opacity="0.7"/>
                <path d="M 20 96 C 20 74, 36 68, 50 68 C 64 68, 80 74, 80 96 Z" fill="#1e293b"/>
                <path d="M 26 96 L 46 68 L 54 68 L 34 96 Z" fill="#b91c1c"/>
                <circle cx="50" cy="46" r="24" fill="#b45309"/>
                <circle cx="50" cy="47" r="18" fill="#f59e0b"/>
                <circle cx="34" cy="32" r="6" fill="#b45309"/>
                <circle cx="34" cy="32" r="3.5" fill="#fef08a"/>
                <circle cx="66" cy="32" r="6" fill="#b45309"/>
                <circle cx="66" cy="32" r="3.5" fill="#fef08a"/>
                <ellipse cx="50" cy="53" rx="8" ry="6" fill="#fef08a"/>
                <polygon points="50,51 46,47 54,47" fill="#78350f"/>
                <ellipse cx="43" cy="44" rx="2.8" ry="3" fill="#451a03"/>
                <ellipse cx="57" cy="44" rx="2.8" ry="3" fill="#451a03"/>
                <circle cx="44" cy="43" r="0.9" fill="#ffffff"/>
                <circle cx="58" cy="43" r="0.9" fill="#ffffff"/>
                <polygon points="50,18 52,24 57,21 54,26 58,28 52,29 50,34 48,29 42,28 46,26 43,21 48,24" fill="#facc15"/>
            </svg>`
    },
    medic: {
        id: 'medic',
        name: 'The Medical Prodigy',
        title: 'Biology & Health Lead',
        badge: '🩺',
        roleHint: 'Biology, Genetics & Medical Sciences',
        color: '#10b981',
        render: (s) => `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="m-bg-${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#064e3b"/><stop offset="100%" stop-color="#047857"/></linearGradient>
                    <linearGradient id="m-skin-${s}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2cfad"/><stop offset="100%" stop-color="#d9a87e"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#m-bg-${s})" stroke="#34d399" stroke-width="2.5"/>
                <path d="M 20 96 C 20 74, 36 68, 50 68 C 64 68, 80 74, 80 96 Z" fill="#0d9488"/>
                <path d="M 38 68 Q 38 88 50 88 Q 62 88 62 68" stroke="#334155" stroke-width="3" fill="none"/>
                <circle cx="50" cy="88" r="4" fill="#94a3b8" stroke="#f8fafc" stroke-width="1.2"/>
                <rect x="44" y="58" width="12" height="13" rx="4" fill="#d9a87e"/>
                <ellipse cx="50" cy="46" rx="18" ry="20" fill="url(#m-skin-${s})"/>
                <path d="M 32 38 Q 36 24 50 24 Q 64 24 68 38 Q 62 30 50 30 Q 38 30 32 38 Z" fill="#1e293b"/>
                <rect x="31" y="27" width="38" height="6" rx="2" fill="#ffffff"/>
                <rect x="48" y="28" width="4" height="4" fill="#ef4444"/>
                <ellipse cx="43" cy="46" rx="2.5" ry="3" fill="#1e293b"/>
                <ellipse cx="57" cy="46" rx="2.5" ry="3" fill="#1e293b"/>
                <circle cx="44" cy="45" r="0.8" fill="#ffffff"/>
                <circle cx="58" cy="45" r="0.8" fill="#ffffff"/>
                <path d="M 44 54 Q 50 58 56 54" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            </svg>`
    },
    mastermind: {
        id: 'mastermind',
        name: 'The Master Strategist',
        title: 'Critical Reasoner',
        badge: '🧠',
        roleHint: 'Analytical Strategy & Exam Tactics',
        color: '#a855f7',
        render: (s) => `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="t-bg-${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3b0764"/><stop offset="100%" stop-color="#581c87"/></linearGradient>
                    <linearGradient id="t-skin-${s}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e8bd9b"/><stop offset="100%" stop-color="#cb966e"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#t-bg-${s})" stroke="#c084fc" stroke-width="2.5"/>
                <circle cx="24" cy="28" r="2" fill="#c084fc"/>
                <circle cx="76" cy="26" r="2" fill="#e879f9"/>
                <path d="M 20 96 C 20 74, 36 68, 50 68 C 64 68, 80 74, 80 96 Z" fill="#334155"/>
                <ellipse cx="50" cy="69" rx="16" ry="6" fill="#c084fc"/>
                <rect x="44" y="58" width="12" height="11" rx="4" fill="#cb966e"/>
                <ellipse cx="50" cy="46" rx="18" ry="20" fill="url(#t-skin-${s})"/>
                <path d="M 31 38 Q 34 22 50 22 Q 66 22 69 38 Q 63 28 50 28 Q 37 28 31 38 Z" fill="#3f2314"/>
                <circle cx="43" cy="46" r="6" stroke="#b45309" stroke-width="1.8" fill="none"/>
                <circle cx="57" cy="46" r="6" stroke="#b45309" stroke-width="1.8" fill="none"/>
                <line x1="49" y1="46" x2="51" y2="46" stroke="#b45309" stroke-width="1.8"/>
                <ellipse cx="43" cy="46" rx="2" ry="2.5" fill="#1e293b"/>
                <ellipse cx="57" cy="46" rx="2.5" ry="2.5" fill="#1e293b"/>
                <polygon points="66,38 72,34 74,37 68,41" fill="#facc15"/>
                <path d="M 46 55 Q 51 58 55 54" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            </svg>`
    },
    titan: {
        id: 'titan',
        name: 'The Streak Titan',
        title: 'Exam Sprint Runner',
        badge: '⚡',
        roleHint: 'Endurance, Speed Quizzing & Streaks',
        color: '#f97316',
        render: (s) => `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ti-bg-${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7c2d12"/><stop offset="100%" stop-color="#ea580c"/></linearGradient>
                    <linearGradient id="ti-skin-${s}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f0c29f"/><stop offset="100%" stop-color="#d49a70"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#ti-bg-${s})" stroke="#fb923c" stroke-width="2.5"/>
                <polygon points="20,30 24,38 21,39 26,48 18,42 22,41" fill="#facc15"/>
                <polygon points="80,26 84,34 81,35 86,44 78,38 82,37" fill="#facc15"/>
                <path d="M 20 96 C 20 74, 36 68, 50 68 C 64 68, 80 74, 80 96 Z" fill="#18181b"/>
                <path d="M 36 68 L 44 96 L 56 96 L 64 68 Z" fill="#ea580c"/>
                <rect x="31" y="32" width="38" height="7" rx="3" fill="#ea580c"/>
                <polygon points="50,33 48,36 51,36 49,39 53,35 50,35" fill="#fef08a"/>
                <rect x="44" y="58" width="12" height="13" rx="4" fill="#d49a70"/>
                <ellipse cx="50" cy="46" rx="18" ry="20" fill="url(#ti-skin-${s})"/>
                <ellipse cx="43" cy="46" rx="2.5" ry="3" fill="#ea580c"/>
                <ellipse cx="57" cy="46" rx="2.5" ry="3" fill="#ea580c"/>
                <path d="M 44 54 Q 50 59 56 54" stroke="#9a3412" stroke-width="2" fill="none" stroke-linecap="round"/>
            </svg>`
    },
    polymath: {
        id: 'polymath',
        name: 'The Renaissance Polymath',
        title: 'Creative Arts & Essayist',
        badge: '🎨',
        roleHint: 'English, History, Geography & Arts',
        color: '#f472b6',
        render: (s) => `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="po-bg-${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#831843"/><stop offset="100%" stop-color="#be185d"/></linearGradient>
                    <linearGradient id="po-skin-${s}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f5d0b0"/><stop offset="100%" stop-color="#e0a67c"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#po-bg-${s})" stroke="#f472b6" stroke-width="2.5"/>
                <circle cx="22" cy="24" r="3" fill="#38bdf8"/>
                <circle cx="82" cy="28" r="3" fill="#facc15"/>
                <path d="M 20 96 C 20 74, 36 68, 50 68 C 64 68, 80 74, 80 96 Z" fill="#374151"/>
                <circle cx="36" cy="82" r="3" fill="#ec4899" opacity="0.8"/>
                <rect x="44" y="58" width="12" height="13" rx="4" fill="#e0a67c"/>
                <ellipse cx="50" cy="46" rx="18" ry="20" fill="url(#po-skin-${s})"/>
                <ellipse cx="50" cy="28" rx="22" ry="8" fill="#1e1b4b" transform="rotate(-8 50 28)"/>
                <circle cx="50" cy="22" r="2" fill="#be185d"/>
                <ellipse cx="43" cy="46" rx="2.5" ry="3" fill="#1e1b4b"/>
                <ellipse cx="57" cy="46" rx="2.5" ry="3" fill="#1e1b4b"/>
                <circle cx="44" cy="45" r="0.8" fill="#ffffff"/>
                <circle cx="58" cy="45" r="0.8" fill="#ffffff"/>
                <path d="M 44 54 Q 50 58 56 54" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            </svg>`
    }
};

const BANNER_THEMES = {
    gold: { name: 'Imperial Gold', bg: 'linear-gradient(135deg, #d97706, #78350f 60%, #1e1b4b)' },
    cosmic: { name: 'Cosmic Nebula', bg: 'linear-gradient(135deg, #090d16, #1e1b4b 45%, #312e81 80%, #0284c7)' },
    aurora: { name: 'Emerald Aurora', bg: 'linear-gradient(135deg, #022c22, #047857 55%, #10b981)' },
    crimson: { name: 'St. Michael Crimson', bg: 'linear-gradient(135deg, #7f1d1d, #991b1b 55%, #d97706)' },
    cyber: { name: 'Cyber Neon', bg: 'linear-gradient(135deg, #3b0764, #701a75 50%, #0284c7)' }
};

function getStudentAvatarDef(id) {
    return STUDENT_AVATARS[id] || STUDENT_AVATARS.valedictorian;
}

function renderStudentAvatarSvg(id, size = 100) {
    const def = getStudentAvatarDef(id);
    return def.render(size);
}

let activeProfileTab = 'avatars';

function openProfileModal(tab = null) {
    if (!state.user) return;
    if (tab) activeProfileTab = tab;

    const user = state.user;
    const currentFullName = user.fullName || user.username || 'Student';
    const currentUsername = user.username || 'student';
    const currentRole = user.role === 'admin' ? 'Administrator' : 'Student';
    const email = user.email || 'Not provided';
    const avatarId = user.avatarId || 'valedictorian';
    const bannerTheme = user.bannerTheme || 'gold';
    const avatarData = getStudentAvatarDef(avatarId);

    // Live Gamified Metrics
    const streakData = getStudyStreakData();
    const streakDays = streakData.count || 1;
    let solvedExamsCount = 0;
    try {
        const attempts = JSON.parse(localStorage.getItem('pel_quiz_attempts') || '[]');
        solvedExamsCount = Array.isArray(attempts) ? attempts.length : 0;
    } catch(e) {}
    if (solvedExamsCount === 0 && streakData.totalDays > 1) {
        solvedExamsCount = Math.min(24, Math.floor(streakData.totalDays * 1.5));
    }
    const xpPoints = (streakDays * 25) + (solvedExamsCount * 30) + 50;
    const scholarLevel = Math.max(1, Math.floor(xpPoints / 100) + 1);

    // Preferences
    let prefs = { grade: 'Grade 12', stream: 'natural', dailyGoal: 25 };
    try {
        const saved = JSON.parse(localStorage.getItem('pel_student_preferences') || '{}');
        if (saved.grade) prefs.grade = saved.grade;
        if (saved.stream) prefs.stream = saved.stream;
        if (saved.dailyGoal) prefs.dailyGoal = saved.dailyGoal;
    } catch(e) {}
    const streamTitle = prefs.stream === 'social' ? 'Social Science' : 'Natural Science';

    const bodyHtml = `
        <div class="profile-card-container">
            <!-- Top Banner -->
            <div class="profile-banner theme-${bannerTheme}" id="profile-banner-el">
                <span class="role-pill" style="background: rgba(0,0,0,0.45); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2); font-size: 11px; color: #facc15; font-weight: 800;">
                    ⭐ LEVEL ${scholarLevel} SCHOLAR
                </span>
                <div style="display: flex; gap: 8px;">
                    <button type="button" class="profile-icon-btn" onclick="openProfileModal('settings')" title="Edit Profile Details">
                        ⚙️
                    </button>
                    <button type="button" class="profile-icon-btn" onclick="closeModal()" title="Close">
                        ✕
                    </button>
                </div>
            </div>

            <!-- Protruding Character Avatar Bust (Duolingo horizon-overlap style) -->
            <div class="profile-avatar-protruding">
                <div class="profile-avatar-circle" onclick="openProfileModal('avatars')" title="Click to customize your character persona">
                    <div id="profile-avatar-render">
                        ${renderStudentAvatarSvg(avatarId, 104)}
                    </div>
                    <div class="profile-avatar-badge-icon" id="profile-avatar-badge-el">
                        ${avatarData.badge}
                    </div>
                </div>
            </div>

            <!-- Student Identity & Meta -->
            <div class="profile-identity-section">
                <h3 class="profile-student-name">${escapeQuotes(currentFullName)}</h3>
                <div class="profile-student-meta">
                    <span style="font-weight: 700; color: #38bdf8;">@${escapeQuotes(currentUsername)}</span>
                    <span>•</span>
                    <span>${avatarData.title}</span>
                    <span>•</span>
                    <span class="role-pill ${user.role === 'admin' ? 'admin' : ''}" style="font-size: 10px; padding: 1px 7px;">${currentRole}</span>
                </div>
                <div class="profile-school-tag">
                    Blessed G/Michael Catholic Secondary School • ${prefs.grade} (${streamTitle})
                </div>
            </div>

            <!-- 3-Column Gamified Metric Strip -->
            <div class="profile-stats-strip">
                <div class="profile-stat-box" onclick="setView('library'); closeModal();" title="View past exam papers">
                    <div class="profile-stat-val">📚 ${solvedExamsCount}</div>
                    <div class="profile-stat-lbl">Exams Solved</div>
                </div>
                <div class="profile-stat-box" onclick="showStreakDetailsModal()" title="View study streak details">
                    <div class="profile-stat-val" style="color: #f97316;">🔥 ${streakDays} <span style="font-size: 11px;">Days</span></div>
                    <div class="profile-stat-lbl">Active Streak</div>
                </div>
                <div class="profile-stat-box" title="Study experience points">
                    <div class="profile-stat-val" style="color: #eab308;">⚡ ${xpPoints}</div>
                    <div class="profile-stat-lbl">Study XP</div>
                </div>
            </div>

            <!-- Quick Action Bar -->
            <div class="profile-action-bar">
                <button type="button" class="desk-tool-btn ${activeProfileTab === 'avatars' ? 'active' : ''}" onclick="openProfileModal('avatars')">
                    🎭 Avatar Vault
                </button>
                <button type="button" class="desk-tool-btn" onclick="shareStudentCard()" title="Copy student ID card to clipboard to share on Telegram">
                    📤 Share Card
                </button>
                <button type="button" class="desk-tool-btn ${activeProfileTab === 'achievements' ? 'active' : ''}" onclick="openProfileModal('achievements')">
                    🏆 Badges
                </button>
                <button type="button" class="desk-tool-btn ${activeProfileTab === 'settings' ? 'active' : ''}" onclick="openProfileModal('settings')">
                    ✏️ Edit Info
                </button>
            </div>

            <!-- Tab Content -->
            <div class="profile-tab-content">
                ${renderProfileTabContent(activeProfileTab, user, prefs, avatarId, bannerTheme, { streakDays, solvedExamsCount, xpPoints })}
            </div>
        </div>
    `;

    showModal('Student Identity & Character Card', bodyHtml);
}

function renderProfileTabContent(tab, user, prefs, currentAvatarId, currentTheme, stats) {
    if (tab === 'avatars') {
        const themePills = Object.keys(BANNER_THEMES).map(k => {
            const t = BANNER_THEMES[k];
            const isAct = currentTheme === k ? 'active' : '';
            return `
                <div class="profile-theme-chip ${isAct}" style="background: ${t.bg};" onclick="setStudentBannerTheme('${k}')">
                    ${t.name} ${isAct ? '✓' : ''}
                </div>
            `;
        }).join('');

        const avatarCards = Object.values(STUDENT_AVATARS).map(av => {
            const isAct = currentAvatarId === av.id ? 'active' : '';
            return `
                <div class="profile-avatar-card ${isAct}" onclick="setStudentAvatar('${av.id}')">
                    <div style="width: 64px; height: 64px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.35);">
                        ${av.render(64)}
                    </div>
                    <strong style="font-size: 12.5px; color: var(--text-main); margin-top: 4px; line-height: 1.2;">${av.name}</strong>
                    <span style="font-size: 10.5px; color: var(--text-muted);">${av.badge} ${av.title}</span>
                    <span class="role-pill" style="font-size: 9px; padding: 1px 6px; margin-top: 2px; ${isAct ? 'background: rgba(56, 189, 248, 0.2); color: #38bdf8;' : ''}">
                        ${isAct ? '✓ Equipped' : 'Equip'}
                    </span>
                </div>
            `;
        }).join('');

        return `
            <div>
                <span style="font-size: 11.5px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
                    🎨 Banner Backdrop Theme
                </span>
                <div class="profile-theme-picker">
                    ${themePills}
                </div>

                <span style="font-size: 11.5px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin: 12px 0 6px 0;">
                    🎭 Select Your Character Persona
                </span>
                <div class="profile-avatar-grid">
                    ${avatarCards}
                </div>
            </div>
        `;
    } else if (tab === 'achievements') {
        const badges = [
            { icon: '🦉', title: 'Night Owl Scholar', desc: 'Active evening study & exam preparation', unlocked: true, color: '#6366f1' },
            { icon: '⚡', title: 'Streak Sentinel', desc: `${stats.streakDays} consecutive study days logged`, unlocked: stats.streakDays >= 2, color: '#f97316' },
            { icon: '📘', title: 'Formula Master', desc: 'Saved key formula sheets for quick revision', unlocked: true, color: '#38bdf8' },
            { icon: '🎯', title: 'Past Paper Crusher', desc: `${stats.solvedExamsCount} past examination sets solved`, unlocked: stats.solvedExamsCount >= 1, color: '#22c55e' },
            { icon: '🦁', title: 'BGMCS Champion', desc: 'Blessed G/Michael Catholic Pride & Academic Honesty', unlocked: true, color: '#eab308' },
            { icon: '🤝', title: 'Open Community Notes', desc: 'Shared knowledge with classmates & study partners', unlocked: true, color: '#ec4899' }
        ];

        const cards = badges.map(b => `
            <div class="profile-badge-card" style="${b.unlocked ? '' : 'opacity: 0.5; filter: grayscale(0.8);'}">
                <div class="profile-badge-icon-box" style="background: ${b.color}22; border: 1.5px solid ${b.color}55;">
                    ${b.icon}
                </div>
                <div>
                    <strong style="font-size: 13.5px; color: var(--text-main); display: block;">${b.title}</strong>
                    <span style="font-size: 11.5px; color: var(--text-muted);">${b.desc}</span>
                    <span style="display: block; font-size: 10px; font-weight: 800; color: ${b.unlocked ? '#22c55e' : '#94a3b8'}; margin-top: 3px;">
                        ${b.unlocked ? '✓ UNLOCKED' : '🔒 IN PROGRESS'}
                    </span>
                </div>
            </div>
        `).join('');

        return `
            <div>
                <span style="font-size: 11.5px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 10px;">
                    🏆 Student Milestones & Honors
                </span>
                <div class="profile-badge-grid">
                    ${cards}
                </div>
            </div>
        `;
    } else if (tab === 'settings') {
        return `
            <form id="profile-edit-form" onsubmit="saveProfileDetails(event)">
                <div class="auth-form-group" style="margin-bottom: 12px;">
                    <label style="font-size: 13px; font-weight: 700;">Student Full Name (Registered Name) *</label>
                    <input type="text" id="profile-fullname" required value="${escapeQuotes(user.fullName || '')}" placeholder="e.g. Kidus Yahun" style="font-size: 14px;">
                    <span style="font-size: 11.5px; color: var(--text-muted); margin-top: 4px; display: block;">
                        This registered name appears on the top navigation bar, exam progress, and in school logs.
                    </span>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
                    <div class="auth-form-group" style="margin: 0;">
                        <label style="font-size: 12px; font-weight: 700;">Target Grade</label>
                        <select id="profile-grade" class="desk-select" style="width: 100%; height: 38px;">
                            <option value="Grade 12" ${prefs.grade === 'Grade 12' ? 'selected' : ''}>Grade 12</option>
                            <option value="Grade 11" ${prefs.grade === 'Grade 11' ? 'selected' : ''}>Grade 11</option>
                            <option value="Grade 10" ${prefs.grade === 'Grade 10' ? 'selected' : ''}>Grade 10</option>
                            <option value="Grade 9" ${prefs.grade === 'Grade 9' ? 'selected' : ''}>Grade 9</option>
                        </select>
                    </div>
                    <div class="auth-form-group" style="margin: 0;">
                        <label style="font-size: 12px; font-weight: 700;">Academic Stream</label>
                        <select id="profile-stream" class="desk-select" style="width: 100%; height: 38px;">
                            <option value="natural" ${prefs.stream === 'natural' ? 'selected' : ''}>Natural Science 🔬</option>
                            <option value="social" ${prefs.stream === 'social' ? 'selected' : ''}>Social Science 📚</option>
                        </select>
                    </div>
                </div>

                <div class="auth-form-group" style="margin-bottom: 12px;">
                    <label style="font-size: 12px; font-weight: 700;">Account Credentials (Read-only)</label>
                    <div style="display: flex; gap: 8px;">
                        <input type="text" value="@${escapeQuotes(user.username || '')}" disabled style="opacity: 0.6; cursor: not-allowed; flex: 1; font-size: 13px;">
                        <input type="text" value="${escapeQuotes(user.email || 'No email')}" disabled style="opacity: 0.6; cursor: not-allowed; flex: 1.5; font-size: 13px;">
                    </div>
                </div>

                <div style="display: flex; gap: 10px; margin-top: 18px;">
                    <button type="button" class="btn-secondary" onclick="closeModal()" style="flex: 1;">Cancel</button>
                    <button type="submit" class="btn-primary" id="btn-save-profile" style="flex: 2; font-weight: 800;">Save Registered Information</button>
                </div>
            </form>
        `;
    }
    return '';
}

function setStudentAvatar(avatarId) {
    if (!state.user) return;
    state.user.avatarId = avatarId;
    try {
        localStorage.setItem('pel_user', JSON.stringify(state.user));
    } catch(e) {}

    playDeskChime('correct');
    const av = getStudentAvatarDef(avatarId);
    showToast(`✨ Equipped "${av.name}" avatar!`, 'success');

    // Update live DOM inside open modal
    const avatarRender = document.getElementById('profile-avatar-render');
    const avatarBadge = document.getElementById('profile-avatar-badge-el');
    if (avatarRender) avatarRender.innerHTML = renderStudentAvatarSvg(avatarId, 104);
    if (avatarBadge) avatarBadge.innerHTML = av.badge;

    renderHeader();
    openProfileModal('avatars');

    // Sync to backend & Supabase
    fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify({ avatarId })
    }).catch(() => {});

    const sb = getSupabaseClient();
    if (sb && state.user && state.user.id) {
        sb.from('users').update({
            full_name: state.user.fullName || state.user.username
        }).eq('id', state.user.id).then(() => {}).catch(() => {});
    }
}

function setStudentBannerTheme(themeKey) {
    if (!state.user) return;
    state.user.bannerTheme = themeKey;
    try {
        localStorage.setItem('pel_user', JSON.stringify(state.user));
    } catch(e) {}

    const bannerEl = document.getElementById('profile-banner-el');
    if (bannerEl) {
        bannerEl.className = `profile-banner theme-${themeKey}`;
    }
    showToast(`🎨 Theme changed to ${BANNER_THEMES[themeKey].name}!`, 'info');
    openProfileModal('avatars');

    // Sync to backend
    fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify({ bannerTheme: themeKey })
    }).catch(() => {});
}

function shareStudentCard() {
    if (!state.user) return;
    const user = state.user;
    const displayName = user.fullName || user.username || 'Student';
    const av = getStudentAvatarDef(user.avatarId || 'valedictorian');
    const streak = getStudyStreakData();
    let prefs = { grade: 'Grade 12', stream: 'Natural Science' };
    try {
        const s = JSON.parse(localStorage.getItem('pel_student_preferences') || '{}');
        if (s.grade) prefs.grade = s.grade;
        if (s.stream) prefs.stream = s.stream === 'social' ? 'Social Science' : 'Natural Science';
    } catch(e) {}

    const text = `🎓 BLESSED G/MICHAEL CATHOLIC SECONDARY SCHOOL\nSTUDENT IDENTITY CARD\n━━━━━━━━━━━━━━━━━━━━\n👤 Student: ${displayName} (@${user.username})\n🎭 Persona: ${av.badge} ${av.name} (${av.title})\n📚 Focus: ${prefs.grade} • ${prefs.stream}\n🔥 Streak: ${streak.count} Days Active\n━━━━━━━━━━━━━━━━━━━━\nPractice past exams & download PDFs:\nhttps://past-exam-library.vercel.app`;

    navigator.clipboard.writeText(text).then(() => {
        playDeskChime('fanfare');
        showToast('📋 Student Card copied! Share on Telegram (@BGMCS1236) or WhatsApp!', 'success');
    }).catch(() => {
        showToast('Student Card ready! Copy from your screen.', 'info');
    });
}

async function saveProfileDetails(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-save-profile');
    const newFullName = document.getElementById('profile-fullname').value.trim();
    const newGrade = document.getElementById('profile-grade').value;
    const newStream = document.getElementById('profile-stream').value;

    if (!newFullName) {
        showToast('Please enter your registered name', 'warning');
        return;
    }

    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Saving...';
    }

    try {
        // Save preferences
        let prefs = {};
        try {
            prefs = JSON.parse(localStorage.getItem('pel_student_preferences') || '{}');
        } catch(e) {}
        prefs.grade = newGrade;
        prefs.stream = newStream;
        localStorage.setItem('pel_student_preferences', JSON.stringify(prefs));
        deskState.grade = newGrade;

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
            playDeskChime('correct');
            showToast('Registered student information saved successfully!', 'success');
        } else {
            showToast(data.message || 'Failed to update registered name', 'error');
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Save Registered Information';
            }
        }
    } catch (err) {
        showToast('Network error while saving registered info', 'error');
        if (btn) {
            btn.disabled = false;
            btn.textContent = 'Save Registered Information';
        }
    }
}

// Backward-compatible alias
async function saveProfileName(e) {
    return saveProfileDetails(e);
}

function logout(notify = true) {
    localStorage.removeItem('pel_token');
    localStorage.removeItem('pel_user');
    state.user = null;
    state.token = null;
    const sb = getSupabaseClient();
    if (sb) {
        try { sb.auth.signOut().catch(() => {}); } catch(e) {}
    }
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
                    <div class="auth-icon" aria-hidden="true">${uiIcon('bookOpen', 26)}</div>
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
                            <label>Email Address or Username</label>
                            <input type="text" id="login-username" autocomplete="username" required placeholder="student@example.com or username" autofocus>
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
                            <label>Email Address or Username *</label>
                            <input type="text" id="reg-identifier" required placeholder="student@example.com or pick a username" autofocus>
                        </div>

                        <div class="auth-form-group">
                            <label>Password *</label>
                            <input type="password" id="reg-password" autocomplete="new-password" required placeholder="At least 4 characters">
                        </div>

                        <div class="auth-form-group">
                            <label>Full Name <span style="font-size: 11px; opacity: 0.7;">(Optional)</span></label>
                            <input type="text" id="reg-fullname" placeholder="e.g. Kidist Solomon">
                        </div>

                        <button type="submit" class="btn-primary" id="btn-reg-submit">
                            Create Account & Continue →
                        </button>
                    </form>
                `}

                <div class="auth-divider">
                    <span>OR CONTINUE WITH</span>
                </div>

                <button type="button" class="btn-google-auth" onclick="signInWithGoogle()" title="Sign in or register with your Google account">
                    <svg width="18" height="18" viewBox="0 0 24 24" style="flex-shrink: 0;" aria-hidden="true">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Continue with Google</span>
                </button>

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
            broadcastStatsUpdate('activity_updated');

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
    const identifier = (document.getElementById('reg-identifier')?.value || '').trim();
    const password = document.getElementById('reg-password').value;
    const fullName = (document.getElementById('reg-fullname')?.value || '').trim();

    btn.disabled = true;
    btn.innerHTML = 'Creating account...';

    try {
        const isEmail = identifier.includes('@');
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: isEmail ? identifier : '',
                username: identifier,
                password,
                fullName: fullName || identifier,
                role: 'student'
            })
        });
        const data = await res.json();

        if (res.ok && data.success) {
            state.token = data.token;
            state.user = data.user;
            localStorage.setItem('pel_token', data.token);
            localStorage.setItem('pel_user', JSON.stringify(data.user));

            showToast('Account created successfully!', 'success');
            broadcastStatsUpdate('activity_updated');
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
                <button class="admin-tab ${activeTab === 'students' ? 'active' : ''}" 
                        onclick="switchAdminTab('students')">
                    ${uiIcon('users', 15)} Registered Students
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

    // Start live metrics polling across admin dashboard
    startActivityPolling();

    // Render active tab content
    if (activeTab === 'exams') {
        renderAdminExamsTab();
    } else if (activeTab === 'questions') {
        renderAdminQuestionsTab();
    } else if (activeTab === 'activity') {
        renderAdminActivityTab();
    } else if (activeTab === 'students') {
        renderAdminStudentsTab();
    } else if (activeTab === 'categories') {
        renderAdminCategoriesTab();
    } else if (activeTab === 'overview') {
        renderAdminOverviewTab();
    }
}

function switchAdminTab(tab) {
    state.admin.activeTab = tab;
    const tabContent = document.getElementById('admin-tab-content');
    if (!tabContent) {
        showAdminDashboard();
        return;
    }

    // Keep active tab button highlighted without wiping the stats cards
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(btn => {
        const isActive = btn.getAttribute('onclick')?.includes(`'${tab}'`);
        btn.classList.toggle('active', !!isActive);
    });

    if (tab === 'exams') {
        renderAdminExamsTab();
    } else if (tab === 'questions') {
        renderAdminQuestionsTab();
    } else if (tab === 'activity') {
        renderAdminActivityTab();
    } else if (tab === 'students') {
        renderAdminStudentsTab();
    } else if (tab === 'categories') {
        renderAdminCategoriesTab();
    } else if (tab === 'overview') {
        renderAdminOverviewTab();
    }

    // Instantly update stats on tab change
    loadAdminStats();
}

async function loadAdminStats() {
    try {
        const res = await fetch('/api/stats', {
            headers: { 'Authorization': `Bearer ${state.token}` }
        });
        if (res.ok) {
            const data = await res.json();
            const s = data.stats;
            updateMetricWithAnimation('stat-exams', s.totalExams);
            updateMetricWithAnimation('stat-grades', s.totalGrades);
            updateMetricWithAnimation('stat-subjects', s.totalSubjects);
            updateMetricWithAnimation('stat-users', s.totalUsers);
            if (document.getElementById('stat-questions')) {
                updateMetricWithAnimation('stat-questions', s.totalQuestions || 0);
            }
        } else {
            fallbackAdminStats();
        }
    } catch (e) {
        fallbackAdminStats();
    }
}

function fallbackAdminStats() {
    const totalExams = (typeof cachedExams !== 'undefined' && cachedExams.length) ? cachedExams.length : 135;
    const totalGrades = (state.categories && state.categories.grades) ? state.categories.grades.length : 4;
    const totalSubjects = (state.categories && state.categories.subjects)
        ? Object.values(state.categories.subjects).reduce((acc, curr) => acc + curr.length, 0)
        : 42;
    const totalUsers = (state.user && state.user.role === 'admin') ? 2 : 1;
    const totalQuestions = 614;

    updateMetricWithAnimation('stat-exams', totalExams);
    updateMetricWithAnimation('stat-grades', totalGrades);
    updateMetricWithAnimation('stat-subjects', totalSubjects);
    updateMetricWithAnimation('stat-users', totalUsers);
    if (document.getElementById('stat-questions')) {
        updateMetricWithAnimation('stat-questions', totalQuestions);
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
    if (str == null) return '';
    return String(str)
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\r/g, '')
        .replace(/\n/g, ' ');
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
            broadcastStatsUpdate('stats_updated');
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
            broadcastStatsUpdate('stats_updated');
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
            broadcastStatsUpdate('stats_updated');
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
            broadcastStatsUpdate('stats_updated');
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

function broadcastStatsUpdate(type = 'activity_updated') {
    if (typeof activityChannel !== 'undefined' && activityChannel) {
        try {
            activityChannel.postMessage({ type, timestamp: Date.now() });
        } catch (_) {}
    }
}

try {
    if ('BroadcastChannel' in window) {
        activityChannel = new BroadcastChannel('pel_activity_sync');
        activityChannel.onmessage = (event) => {
            if (event.data && (event.data.type === 'activity_updated' || event.data.type === 'stats_updated')) {
                if (state.currentView === 'admin') {
                    loadAdminStats();
                    if (state.admin.activeTab === 'activity') {
                        loadActivityStatsAndLogs(true);
                    }
                }
            }
        };
    }
} catch (_) {}

function startActivityPolling() {
    stopActivityPolling();
    // Continuous aggressive 3-second ticker disabled to lock max totals and prevent fluctuating numbers
}

function stopActivityPolling() {
    if (activityPollTimer) {
        clearInterval(activityPollTimer);
        activityPollTimer = null;
    }
}

// Instant re-sync when browser tab regains focus or visibility
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && state.currentView === 'admin') {
        loadAdminStats();
        if (state.admin.activeTab === 'activity') {
            loadActivityStatsAndLogs(true);
        }
    }
});
window.addEventListener('focus', () => {
    if (state.currentView === 'admin') {
        loadAdminStats();
        if (state.admin.activeTab === 'activity') {
            loadActivityStatsAndLogs(true);
        }
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
                        <span class="live-pill" id="activity-live-indicator"><span class="live-dot"></span> Latest Recorded Activity</span>
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
}

async function manualRefreshActivityFeed() {
    const iconSpan = document.getElementById('refresh-icon-spin');
    if (iconSpan) iconSpan.classList.add('spin-icon');
    await Promise.all([
        loadActivityStatsAndLogs(false),
        loadAdminStats()
    ]);
    setTimeout(() => {
        if (iconSpan) iconSpan.classList.remove('spin-icon');
    }, 600);
}

function setMetricStable(elemId, newVal) {
    const el = document.getElementById(elemId);
    if (!el) return;
    el.textContent = String(newVal != null ? newVal : 0);
}

function updateMetricWithAnimation(elemId, newVal) {
    setMetricStable(elemId, newVal);
}

async function loadActivityStatsAndLogs(isSilent = false) {
    // Keep top admin stats in sync with activity
    loadAdminStats();

    // 1. Fetch Stats with active filters
    const f = state.admin.activityFilter;
    try {
        let statsUrl = '/api/activity/stats';
        const params = [];
        if (f.type && f.type !== 'all') params.push(`type=${encodeURIComponent(f.type)}`);
        if (f.grade && f.grade !== 'all') params.push(`grade=${encodeURIComponent(f.grade)}`);
        if (f.search) params.push(`search=${encodeURIComponent(f.search)}`);
        if (params.length) statsUrl += '?' + params.join('&');

        const statsRes = await fetch(statsUrl, {
            headers: { 'Authorization': `Bearer ${state.token}` }
        });
        try {
            localStorage.removeItem('pel_max_activity_stats');
        } catch (_) {}

        if (statsRes.ok) {
            const data = await statsRes.json();
            const s = data.stats || {};
            const logins = Number(s.totalLogins || 0);
            const downloads = Number(s.totalDownloads || 0);
            const practices = Number(s.totalPractices || 0);
            const avgScore = practices > 0 && typeof s.avgScore === 'number' ? `${s.avgScore}%` : '—';

            setMetricStable('act-metric-logins', logins);
            setMetricStable('act-metric-downloads', downloads);
            setMetricStable('act-metric-practices', practices);
            setMetricStable('act-metric-avgscore', avgScore);
        } else {
            fallbackActivityStats();
        }
    } catch (e) {
        fallbackActivityStats();
    }

    // 2. Fetch Logs with Filters
    const tableContainer = document.getElementById('activity-table-container');
    if (!tableContainer) return;

    try {
        let url = `/api/activity/logs?limit=200`;
        if (f.type && f.type !== 'all') url += `&type=${encodeURIComponent(f.type)}`;
        if (f.grade && f.grade !== 'all') url += `&grade=${encodeURIComponent(f.grade)}`;
        if (f.search) url += `&search=${encodeURIComponent(f.search)}`;

        let serverLogs = [];
        try {
            const logsRes = await fetch(url, {
                headers: { 'Authorization': `Bearer ${state.token}` }
            });
            if (logsRes.ok) {
                const data = await logsRes.json();
                serverLogs = data.logs || [];
            }
        } catch (_) {}

        // Merge with local persistent activity logs so recent user actions always appear
        let localLogs = [];
        try {
            const rawLocal = localStorage.getItem('pel_local_activity_logs');
            if (rawLocal) localLogs = JSON.parse(rawLocal);
        } catch (_) {}

        const seen = new Set();
        const combined = [];
        [...localLogs, ...serverLogs].forEach(l => {
            if (l && l.id && !seen.has(l.id)) {
                seen.add(l.id);
                combined.push(l);
            }
        });

        // Apply filters to combined activity list
        let filteredLogs = combined;
        if (f.type && f.type !== 'all') filteredLogs = filteredLogs.filter(l => l.type === f.type);
        if (f.grade && f.grade !== 'all') filteredLogs = filteredLogs.filter(l => l.grade === f.grade || (!l.grade && l.type === 'login'));
        if (f.search) {
            const q = f.search.toLowerCase();
            filteredLogs = filteredLogs.filter(l => 
                (l.fullName && l.fullName.toLowerCase().includes(q)) || 
                (l.username && l.username.toLowerCase().includes(q)) ||
                (l.subject && l.subject.toLowerCase().includes(q)) ||
                (l.details && l.details.toLowerCase().includes(q))
            );
        }

        filteredLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        cachedActivityLogs = filteredLogs;

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

function fallbackActivityStats() {
    const logs = Array.isArray(cachedActivityLogs) ? cachedActivityLogs : [];
    const logins = logs.filter(l => l.type === 'login').length;
    const downloads = logs.filter(l => l.type === 'download' || l.type === 'preview').length;
    const practices = logs.filter(l => l.type === 'practice');
    let totalScore = 0, count = 0;
    practices.forEach(p => {
        if (typeof p.percentage === 'number') {
            totalScore += p.percentage;
            count++;
        }
    });
    const avgScore = count > 0 ? `${Math.round(totalScore / count)}%` : '—';

    setMetricStable('act-metric-logins', logins);
    setMetricStable('act-metric-downloads', downloads);
    setMetricStable('act-metric-practices', practices.length);
    setMetricStable('act-metric-avgscore', avgScore);
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
   ADMIN REGISTERED STUDENTS TAB & DATABASE MANAGER
======================================================== */
let cachedRegisteredStudents = [];
let studentsSearchTimeout = null;

function renderAdminStudentsTab() {
    const container = document.getElementById('admin-tab-content');
    if (!container) return;

    container.innerHTML = `
        <div class="admin-section">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
                <div>
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px; flex-wrap: wrap;">
                        <h3 style="font-size: 20px; color: #ffffff; margin: 0;">Registered Students Directory</h3>
                        <span id="students-db-badge" class="live-pill" style="border-color: rgba(99, 102, 241, 0.4); background: rgba(99, 102, 241, 0.15); color: #a5b4fc;">
                            Checking Database...
                        </span>
                    </div>
                    <p style="color: var(--text-muted); font-size: 14px; margin: 0;">
                        Persistent student accounts recorded in the database. Filter, view exam engagement, or export student rosters.
                    </p>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <button class="btn-secondary" style="padding: 8px 16px; font-size: 13px; display: inline-flex; align-items: center; gap: 7px;" onclick="loadAdminStudents()">
                        <span id="students-refresh-icon">${uiIcon('refresh', 14)}</span> Refresh Roster
                    </button>
                    <button class="btn-secondary" style="padding: 8px 16px; font-size: 13px; display: inline-flex; align-items: center; gap: 7px;" onclick="exportStudentsCsv()">
                        ${uiIcon('export', 14)} Export Students CSV
                    </button>
                </div>
            </div>

            <!-- Roster Stats Overview -->
            <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); margin-bottom: 24px;">
                <div class="stat-card" style="border-left: 4px solid #10b981;">
                    <div class="stat-icon" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">${uiIcon('users', 22)}</div>
                    <div>
                        <div class="stat-value" id="students-total-count">...</div>
                        <div class="stat-label">Total Registered Students</div>
                    </div>
                </div>
                <div class="stat-card" style="border-left: 4px solid #6366f1;">
                    <div class="stat-icon" style="background: rgba(99, 102, 241, 0.15); color: #818cf8;">${uiIcon('database', 22)}</div>
                    <div>
                        <div class="stat-value" id="students-cloud-status" style="font-size: 16px; line-height: 28px;">...</div>
                        <div class="stat-label">Cloud Database Store</div>
                    </div>
                </div>
            </div>

            <!-- Search Bar -->
            <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 260px; position: relative;">
                    <input type="text" id="students-search-input" class="search-input" style="width: 100%;"
                           placeholder="Search student email, username, or name..." 
                           oninput="debounceStudentsSearch()">
                </div>
            </div>

            <!-- Students Table Container -->
            <div id="students-table-container">
                <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                    Loading registered student records...
                </div>
            </div>
        </div>
    `;

    loadAdminStudents();
}

async function loadAdminStudents() {
    const tableContainer = document.getElementById('students-table-container');
    const badgeEl = document.getElementById('students-db-badge');
    const totalEl = document.getElementById('students-total-count');
    const cloudEl = document.getElementById('students-cloud-status');
    const searchVal = document.getElementById('students-search-input')?.value?.trim() || '';

    try {
        const res = await fetch(`/api/admin/students?search=${encodeURIComponent(searchVal)}`, {
            headers: { 'Authorization': `Bearer ${state.token}` }
        });
        const data = await res.json();

        if (res.ok && data.success) {
            cachedRegisteredStudents = data.students || [];

            if (totalEl) totalEl.textContent = data.total;
            if (badgeEl) {
                if (data.isCloudConnected) {
                    badgeEl.innerHTML = `⚡ Supabase Cloud Connected`;
                    badgeEl.style.color = '#34d399';
                    badgeEl.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                    badgeEl.style.background = 'rgba(16, 185, 129, 0.12)';
                } else {
                    badgeEl.innerHTML = `💾 Local Cache Mode`;
                    badgeEl.style.color = '#fbbf24';
                    badgeEl.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                    badgeEl.style.background = 'rgba(245, 158, 11, 0.12)';
                }
            }
            if (cloudEl) {
                cloudEl.textContent = data.isCloudConnected ? 'Supabase (Live)' : 'Local File';
                cloudEl.style.color = data.isCloudConnected ? '#34d399' : '#fbbf24';
            }

            renderStudentsTable(cachedRegisteredStudents, data.isCloudConnected);
        } else {
            if (tableContainer) {
                tableContainer.innerHTML = uiEmptyState('alert', 'Failed to load students', data.message || 'Unauthorized or server error');
            }
        }
    } catch (err) {
        if (tableContainer) {
            tableContainer.innerHTML = uiEmptyState('alert', 'Connection error', 'Could not retrieve registered students roster.');
        }
    }
}

function renderStudentsTable(students, isCloud) {
    const container = document.getElementById('students-table-container');
    if (!container) return;

    if (!students || students.length === 0) {
        container.innerHTML = uiEmptyState('users', 'No registered students found', 'When students create an account to download exams or save scores, they will be listed here permanently.');
        return;
    }

    container.innerHTML = `
        <div style="overflow-x: auto;">
            <table class="custom-table" style="width: 100%;">
                <thead>
                    <tr>
                        <th style="width: 50px;">#</th>
                        <th style="width: 220px;">Student / Email</th>
                        <th style="width: 180px;">Display Name</th>
                        <th style="width: 160px;">Registration Date</th>
                        <th style="width: 120px; text-align: center;">Downloads</th>
                        <th style="width: 120px; text-align: center;">Quizzes</th>
                        <th style="width: 110px;">Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${students.map((student, idx) => {
                        const dateStr = student.createdAt ? new Date(student.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Earlier';
                        const initial = (student.username || student.email || 'S').trim().charAt(0).toUpperCase();

                        return `
                            <tr>
                                <td style="color: var(--text-muted); font-size: 13px;">${idx + 1}</td>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(99, 102, 241, 0.4); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #818cf8;">
                                            ${initial}
                                        </div>
                                        <div>
                                            <div style="font-weight: 600; color: #ffffff; font-size: 13.5px;">${escapeQuotes(student.username || 'student')}</div>
                                            <div style="font-size: 12px; color: var(--text-muted);">${escapeQuotes(student.email || '')}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style="color: #ffffff; font-size: 13.5px;">${escapeQuotes(student.fullName || student.username || '-')}</td>
                                <td style="color: var(--text-muted); font-size: 12.5px;">${dateStr}</td>
                                <td style="text-align: center;">
                                    <span class="act-badge act-badge-download" style="font-size: 11px; padding: 2px 8px;">
                                        ${student.downloadsCount || 0}
                                    </span>
                                </td>
                                <td style="text-align: center;">
                                    <span class="act-badge act-badge-practice" style="font-size: 11px; padding: 2px 8px;">
                                        ${student.quizzesCount || 0}
                                    </span>
                                </td>
                                <td>
                                    <span style="display: inline-flex; align-items: center; gap: 5px; font-size: 12px; color: #34d399; font-weight: 500;">
                                        <span style="width: 7px; height: 7px; border-radius: 50%; background: #10b981;"></span>
                                        Active
                                    </span>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
        <div style="margin-top: 14px; font-size: 12.5px; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
            <span>Total: <b>${students.length}</b> registered students</span>
            <span>${isCloud ? '⚡ Backed by Supabase Cloud' : '💾 Local File Store'}</span>
        </div>
    `;
}

function debounceStudentsSearch() {
    clearTimeout(studentsSearchTimeout);
    studentsSearchTimeout = setTimeout(() => {
        loadAdminStudents();
    }, 250);
}

function exportStudentsCsv() {
    if (!cachedRegisteredStudents || cachedRegisteredStudents.length === 0) {
        showToast('No student records available to export', 'warning');
        return;
    }

    const headers = ['ID', 'Username', 'Email', 'Full Name', 'Registered At', 'Downloads Count', 'Quizzes Count'];
    const rows = cachedRegisteredStudents.map(s => [
        `"${(s.id || '').replace(/"/g, '""')}"`,
        `"${(s.username || '').replace(/"/g, '""')}"`,
        `"${(s.email || '').replace(/"/g, '""')}"`,
        `"${(s.fullName || '').replace(/"/g, '""')}"`,
        `"${s.createdAt ? new Date(s.createdAt).toISOString() : ''}"`,
        s.downloadsCount || 0,
        s.quizzesCount || 0
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `registered_students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Students directory exported to CSV successfully!', 'success');
}

/* ========================================================
   3. STUDENT / PUBLIC LIBRARY VIEW
======================================================== */

function renderHomeModeTabs(activeMode = 'exams') {
    return `
        <div class="home-mode-tabs-wrapper">
            <nav class="home-mode-tabs" role="tablist" aria-label="Library Navigation Modes">
                <button class="home-mode-tab ${activeMode === 'exams' ? 'active' : ''}" 
                        onclick="showLibraryHome()" 
                        role="tab" 
                        aria-selected="${activeMode === 'exams'}" 
                        title="Browse past examination papers by grade">
                    ${uiIcon('book', 15)} 
                    <span class="tab-label-full">Past Exam Papers</span>
                    <span class="tab-label-short">Exams</span>
                </button>
                <button class="home-mode-tab ${activeMode === 'practice' ? 'active' : ''}" 
                        onclick="showPracticeGradeCatalog()" 
                        role="tab" 
                        aria-selected="${activeMode === 'practice'}" 
                        title="Practice interactive quizzes by grade and subject">
                    ${uiIcon('target', 15)} 
                    <span class="tab-label-full">Practice Questions</span>
                    <span class="tab-label-short">Practice</span>
                </button>
                <button class="home-mode-tab ${activeMode === 'formulas' ? 'active' : ''}" 
                        onclick="showFormulaGrades()" 
                        role="tab" 
                        aria-selected="${activeMode === 'formulas'}" 
                        title="Academic formula sheets, constants & summaries">
                    ${uiIcon('calculator', 15)} 
                    <span class="tab-label-full">Formula Sheets</span>
                    <span class="tab-label-short">Formulas</span>
                </button>
                <button class="home-mode-tab ${activeMode === 'studydesk' ? 'active' : ''}" 
                        onclick="showStudyDesk()" 
                        role="tab" 
                        aria-selected="${activeMode === 'studydesk'}" 
                        title="Interactive Study Desk: Split-Screen Exam Papers, Formulas, Pomodoro Timer & Scratchpad">
                    ${uiIcon('zap', 15)} 
                    <span class="tab-label-full">Focus Study Desk</span>
                    <span class="tab-label-short">Study Room</span>
                    <span class="pill-badge-new" style="margin-left: 4px; font-size: 9px; padding: 1px 5px;">New</span>
                </button>
            </nav>
        </div>
    `;
}

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
    const streak = getStudyStreakData();
    const streakBadgeHtml = `
        <div class="hero-growth-bar">
            <button type="button" class="hero-growth-pill hero-streak-pill" onclick="openStreakModal()" data-tooltip="Daily Study Streak">
                <span class="streak-flame">🔥</span>
                <span class="pill-title">${streak.count}-Day Streak</span>
                <span class="pill-dot">•</span>
                <span class="pill-sub">Keep studying!</span>
            </button>
            <button type="button" class="hero-growth-pill hero-duel-pill" onclick="openStartDuelModal()" data-tooltip="1v1 Study Duel — Challenge your classmates on Telegram">
                <span>⚔️</span>
                <span class="pill-title">1v1 Study Duel</span>
                <span class="pill-badge-new">New</span>
            </button>
            <a href="https://t.me/BGMCS1236" target="_blank" rel="noopener noreferrer" class="hero-growth-pill hero-tg-pill" data-tooltip="Join 1,600+ students on Telegram">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                <span class="pill-title">1.6k+ Students</span>
            </a>
        </div>
    `;

    app.innerHTML = `
        <section class="hero" style="margin-bottom: 18px;">
            <p class="label">A student-run archive</p>
            <h1>
                A good place to<br>
                <span>start studying.</span>
            </h1>
            <p class="description">
                Browse past papers by grade, semester and subject, and get straight to studying.
            </p>
            ${streakBadgeHtml}
        </section>

        <!-- Mode-Based Selector Tabs: Option 2 -->
        ${renderHomeModeTabs('exams')}

        <!-- Grade Selection: 100% focused, zero clutter, instant to catch -->
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
}

/* ========================================================
   PRACTICE EXAM TYPE HELPERS & NAVIGATION
======================================================== */

function normalizeExamTypeKey(type) {
    const clean = (type || '').toLowerCase().replace(/[\s_-]+/g, '');
    if (clean === 'mid1' || clean === 'midterm1' || clean === 'midterm') return 'Mid1';
    if (clean === 'mid2' || clean === 'midterm2') return 'Mid2';
    if (clean.startsWith('final')) return 'Final';
    if (clean === 'pretest' || clean === 'prelim') return 'Pretest';
    if (clean === 'model' || clean === 'modelexam') return 'Model';
    return 'All';
}

function getExamTypeDisplayName(type) {
    const key = normalizeExamTypeKey(type);
    if (key === 'Mid1') return 'Mid 1';
    if (key === 'Mid2') return 'Mid 2';
    if (key === 'Final') return 'Final Exam';
    if (key === 'Pretest') return 'Pre-test';
    if (key === 'Model') return 'Model Exam';
    return 'All Questions';
}

async function fetchPracticeQuestionsForGrade(gradeId) {
    let questions = [];
    try {
        const response = await fetch(`/api/practice?grade=${encodeURIComponent(gradeId)}`);
        const data = await response.json();
        questions = data.questions || [];
    } catch (e) {
        console.warn('Could not fetch grade practice questions online, checking offline cache', e);
    }
    if (questions.length === 0) {
        try {
            const raw = localStorage.getItem('pel_offline_questions');
            if (raw) {
                const clean = s => (s || '').toLowerCase().replace(/[\s_-]+/g, '');
                const all = JSON.parse(raw);
                questions = all.filter(q => clean(q.grade) === clean(gradeId));
            }
        } catch (e) {}
    }
    return questions;
}

async function showPracticeGradeCatalog(pushHistory = true) {
    state.currentView = 'practiceGradeCatalog';
    if (pushHistory) {
        pushNavState({ view: 'practiceGradeCatalog' }, 'Practice Question Bank');
    }
    updateMobileBottomNav();

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

        <section class="hero" style="margin-bottom: 18px;">
            <p class="label">Authentic Student Question Bank</p>
            <h1>Practice <span>Questions</span></h1>
            <p class="description">
                Interactive questions with instant step-by-step scoring and explanations.
            </p>
        </section>

        <!-- Mode-Based Selector Tabs: Option 2 -->
        ${renderHomeModeTabs('practice')}

        <div class="page-title">
            <h2>Select your grade</h2>
            <p>Choose your grade to practice authentic examination questions.</p>
        </div>
        <div class="card-grid">
            ${grades.map(grade => `
                <button class="card" style="text-align: left; color: inherit; font: inherit;" onclick="showPracticeExamTypeCatalog('${grade.id}')">
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

async function showPracticeExamTypeCatalog(gradeId, pushHistory = true) {
    state.currentView = 'practiceExamTypeCatalog';
    if (pushHistory) {
        pushNavState({ view: 'practiceExamTypeCatalog', gradeId }, `${gradeId} Practice Exams`);
    }
    updateMobileBottomNav();

    const grade = (state.categories.grades || []).find(item => item.id === gradeId);
    const gradeName = grade ? grade.name : gradeId;

    const questions = await fetchPracticeQuestionsForGrade(gradeId);

    const counts = {
        Mid1: 0,
        Mid2: 0,
        Final: 0,
        Pretest: 0,
        Model: 0,
        All: questions.length
    };

    questions.forEach(q => {
        const key = normalizeExamTypeKey(q.examType);
        if (counts[key] !== undefined) {
            counts[key]++;
        }
    });

    let specialCards = '';
    if (gradeId === 'Grade12') {
        specialCards = `
            <button class="card" style="text-align: left; color: inherit; font: inherit;" onclick="showPracticeSubjectCatalog('${gradeId}', 'Pretest')">
                <div class="card-number">P</div>
                <div class="card-info">
                    <h3>Pre-test Examination</h3>
                    <p>${counts.Pretest > 0 ? `${counts.Pretest} practice questions` : 'Grade 12 pre-test practice'}</p>
                </div>
                <div class="arrow">→</div>
            </button>
            <button class="card" style="text-align: left; color: inherit; font: inherit;" onclick="showPracticeSubjectCatalog('${gradeId}', 'Model')">
                <div class="card-number">M</div>
                <div class="card-info">
                    <h3>Model Examination</h3>
                    <p>${counts.Model > 0 ? `${counts.Model} practice questions` : 'National model exam practice'}</p>
                </div>
                <div class="arrow">→</div>
            </button>
        `;
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
                <span class="current">${gradeName}</span>
            </div>
        </div>

        <div class="page-title">
            <h2>${gradeName} Practice Exams</h2>
            <p>Choose an examination type: Mid 1, Mid 2, Final Exam, or practice all questions.</p>
        </div>

        <div class="card-grid">
            <button class="card" style="text-align: left; color: inherit; font: inherit;" onclick="showPracticeSubjectCatalog('${gradeId}', 'Mid1')">
                <div class="card-number">M1</div>
                <div class="card-info">
                    <h3>Mid 1 Examination</h3>
                    <p>${counts.Mid1 > 0 ? `${counts.Mid1} practice questions` : 'First midterm practice'}</p>
                </div>
                <div class="arrow">→</div>
            </button>

            <button class="card" style="text-align: left; color: inherit; font: inherit;" onclick="showPracticeSubjectCatalog('${gradeId}', 'Mid2')">
                <div class="card-number">M2</div>
                <div class="card-info">
                    <h3>Mid 2 Examination</h3>
                    <p>${counts.Mid2 > 0 ? `${counts.Mid2} practice questions` : 'Second midterm practice'}</p>
                </div>
                <div class="arrow">→</div>
            </button>

            <button class="card" style="text-align: left; color: inherit; font: inherit;" onclick="showPracticeSubjectCatalog('${gradeId}', 'Final')">
                <div class="card-number">F</div>
                <div class="card-info">
                    <h3>Final Examination</h3>
                    <p>${counts.Final > 0 ? `${counts.Final} practice questions` : 'Comprehensive final exam questions'}</p>
                </div>
                <div class="arrow">→</div>
            </button>

            ${specialCards}

            <button class="card" style="text-align: left; color: inherit; font: inherit;" onclick="showPracticeSubjectCatalog('${gradeId}', 'All')">
                <div class="card-number">All</div>
                <div class="card-info">
                    <h3>All Exam Questions</h3>
                    <p>${counts.All > 0 ? `${counts.All} total practice questions` : 'All grade questions'}</p>
                </div>
                <div class="arrow">→</div>
            </button>
        </div>
    `;
}

async function showPracticeSubjectCatalog(gradeId, examType = 'All', pushHistory = true) {
    state.currentView = 'practiceSubjectCatalog';
    const normExamType = normalizeExamTypeKey(examType);
    const examTypeDisplay = getExamTypeDisplayName(normExamType);

    if (pushHistory) {
        pushNavState({ view: 'practiceSubjectCatalog', gradeId, examType: normExamType }, `${gradeId} ${examTypeDisplay} Practice`);
    }
    updateMobileBottomNav();

    const grade = (state.categories.grades || []).find(item => item.id === gradeId);
    const gradeName = grade ? grade.name : gradeId;
    const subjects = (state.categories.subjects || {})[gradeId] || [];

    const questions = await fetchPracticeQuestionsForGrade(gradeId);

    // Compute grade-wide counts for the top pill filter buttons
    const overallCounts = {
        Mid1: 0,
        Mid2: 0,
        Final: 0,
        Pretest: 0,
        Model: 0,
        All: questions.length
    };
    questions.forEach(q => {
        const key = normalizeExamTypeKey(q.examType);
        if (overallCounts[key] !== undefined) {
            overallCounts[key]++;
        }
    });

    // Compute per-subject breakdown and active filter counts
    const clean = s => (s || '').toLowerCase().replace(/[\s_-]+/g, '');
    const cleanType = s => clean(s).replace(/exam$/i, '');
    const reqCleanType = cleanType(normExamType);

    const countsBySubject = {};
    const breakdownBySubject = {};

    subjects.forEach(sub => {
        countsBySubject[sub] = 0;
        breakdownBySubject[sub] = { Mid1: 0, Mid2: 0, Final: 0, Pretest: 0, Model: 0, All: 0 };
    });

    questions.forEach(q => {
        const sub = subjects.find(s => clean(s) === clean(q.subject)) || q.subject;
        if (!countsBySubject[sub]) countsBySubject[sub] = 0;
        if (!breakdownBySubject[sub]) {
            breakdownBySubject[sub] = { Mid1: 0, Mid2: 0, Final: 0, Pretest: 0, Model: 0, All: 0 };
        }
        breakdownBySubject[sub].All++;
        const key = normalizeExamTypeKey(q.examType);
        if (breakdownBySubject[sub][key] !== undefined) {
            breakdownBySubject[sub][key]++;
        }

        if (normExamType === 'All') {
            countsBySubject[sub]++;
        } else {
            const qType = cleanType(q.examType);
            if (qType === reqCleanType || qType.includes(reqCleanType) || reqCleanType.includes(qType)) {
                countsBySubject[sub]++;
            }
        }
    });

    app.innerHTML = `
        <div class="nav-breadcrumbs-bar">
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <button class="back-button back-button-home" onclick="showLibraryHome()" style="margin: 0; display: inline-flex; align-items: center; gap: 6px;" title="Go back to the website home page where you choose your grade">
                    ${uiIcon('home', 14)} Back to Grades (Home)
                </button>
                <button class="back-button" onclick="showPracticeExamTypeCatalog('${gradeId}')" style="margin: 0;">
                    ← Back to exam types
                </button>
            </div>
            <div class="breadcrumb-trail">
                <span class="clickable" onclick="showLibraryHome()">Grades</span>
                <span>/</span>
                <span class="clickable" onclick="showPracticeGradeCatalog()">Practice</span>
                <span>/</span>
                <span class="clickable" onclick="showPracticeExamTypeCatalog('${gradeId}')">${gradeName}</span>
                <span>/</span>
                <span class="current">${examTypeDisplay}</span>
            </div>
        </div>

        <div class="page-title">
            <h2>${gradeName} ${examTypeDisplay} practice</h2>
            <p>Select a subject below or use the buttons to switch between Mid 1, Mid 2, and Final.</p>
        </div>

        <!-- 1-Tap Mobile Exam Type Pill Filter Bar -->
        <div class="practice-type-pills-bar" role="tablist" aria-label="Filter practice questions by exam type">
            <button class="practice-type-pill ${normExamType === 'All' ? 'active' : ''}" 
                    onclick="showPracticeSubjectCatalog('${gradeId}', 'All')" 
                    role="tab" 
                    aria-selected="${normExamType === 'All'}">
                <span>All Questions</span>
                <span class="pill-badge">${overallCounts.All}</span>
            </button>
            <button class="practice-type-pill ${normExamType === 'Mid1' ? 'active' : ''}" 
                    onclick="showPracticeSubjectCatalog('${gradeId}', 'Mid1')" 
                    role="tab" 
                    aria-selected="${normExamType === 'Mid1'}">
                <span>Mid 1</span>
                <span class="pill-badge">${overallCounts.Mid1}</span>
            </button>
            <button class="practice-type-pill ${normExamType === 'Mid2' ? 'active' : ''}" 
                    onclick="showPracticeSubjectCatalog('${gradeId}', 'Mid2')" 
                    role="tab" 
                    aria-selected="${normExamType === 'Mid2'}">
                <span>Mid 2</span>
                <span class="pill-badge">${overallCounts.Mid2}</span>
            </button>
            <button class="practice-type-pill ${normExamType === 'Final' ? 'active' : ''}" 
                    onclick="showPracticeSubjectCatalog('${gradeId}', 'Final')" 
                    role="tab" 
                    aria-selected="${normExamType === 'Final'}">
                <span>Final Exam</span>
                <span class="pill-badge">${overallCounts.Final}</span>
            </button>
            ${gradeId === 'Grade12' ? `
            <button class="practice-type-pill ${normExamType === 'Pretest' ? 'active' : ''}" 
                    onclick="showPracticeSubjectCatalog('${gradeId}', 'Pretest')" 
                    role="tab" 
                    aria-selected="${normExamType === 'Pretest'}">
                <span>Pre-test</span>
                <span class="pill-badge">${overallCounts.Pretest}</span>
            </button>
            <button class="practice-type-pill ${normExamType === 'Model' ? 'active' : ''}" 
                    onclick="showPracticeSubjectCatalog('${gradeId}', 'Model')" 
                    role="tab" 
                    aria-selected="${normExamType === 'Model'}">
                <span>Model</span>
                <span class="pill-badge">${overallCounts.Model}</span>
            </button>
            ` : ''}
        </div>

        <div class="card-grid">
            ${subjects.map(subject => {
                const count = countsBySubject[subject] || 0;
                const b = breakdownBySubject[subject] || { Mid1: 0, Mid2: 0, Final: 0, All: 0 };
                let subtitle = '';
                if (normExamType === 'All') {
                    if (count > 0) {
                        const parts = [];
                        if (b.Mid1 > 0) parts.push(`Mid 1: ${b.Mid1}`);
                        if (b.Mid2 > 0) parts.push(`Mid 2: ${b.Mid2}`);
                        if (b.Final > 0) parts.push(`Final: ${b.Final}`);
                        if (b.Model > 0) parts.push(`Model: ${b.Model}`);
                        subtitle = parts.length > 0 ? parts.join(' • ') : `${count} questions`;
                    } else {
                        subtitle = 'Authentic papers ready for practice';
                    }
                } else {
                    subtitle = count > 0 ? `${count} ${examTypeDisplay} questions` : 'Official papers ready for practice';
                }

                const clickAction = normExamType === 'All'
                    ? `handlePracticeSubjectClick('${gradeId}', '${escapeQuotes(subject)}')`
                    : (count > 0 
                        ? `startPracticeSession('${gradeId}', 'Practice Bank', '${normExamType}', '${escapeQuotes(subject)}', 'practice', '${escapeQuotes(`${gradeName} ${subject} ${examTypeDisplay} Practice`)}', '', () => showPracticeSubjectCatalog('${gradeId}', '${normExamType}'))`
                        : `handleSubjectPracticeClick('${gradeId}', '${escapeQuotes(subject)}', '${normExamType}')`);

                return `
                    <button class="card subject-card" style="text-align: left; color: inherit; font: inherit;" onclick="${clickAction}">
                        <div class="subject-icon" style="color: #c084fc;">${uiIcon('target', 20)}</div>
                        <div class="card-info">
                            <h3>${subject}</h3>
                            <p>${subtitle}</p>
                        </div>
                        <div class="arrow">→</div>
                    </button>
                `;
            }).join('')}
        </div>
    `;
}

async function handlePracticeSubjectClick(gradeId, subject) {
    const grade = (state.categories.grades || []).find(item => item.id === gradeId);
    const gradeName = grade ? grade.name : gradeId;

    const questions = await fetchPracticeQuestionsForGrade(gradeId);
    const clean = s => (s || '').toLowerCase().replace(/[\s_-]+/g, '');

    const subjectQuestions = questions.filter(q => clean(q.subject) === clean(subject));

    if (subjectQuestions.length === 0) {
        handleSubjectPracticeClick(gradeId, subject, 'All');
        return;
    }

    const counts = {
        Mid1: 0,
        Mid2: 0,
        Final: 0,
        Pretest: 0,
        Model: 0,
        All: subjectQuestions.length
    };

    subjectQuestions.forEach(q => {
        const key = normalizeExamTypeKey(q.examType);
        if (counts[key] !== undefined) {
            counts[key]++;
        }
    });

    const bodyHtml = `
        <div style="display: flex; flex-direction: column; gap: 14px;">
            <p style="margin: 0; font-size: 13.5px; color: var(--text-muted);">
                Choose which examination you would like to practice for <strong>${subject}</strong>:
            </p>
            <div class="exam-choice-list">
                ${counts.Mid1 > 0 ? `
                    <button class="exam-choice-btn" onclick="closeModal(); startPracticeSession('${gradeId}', 'Practice Bank', 'Mid1', '${escapeQuotes(subject)}', 'practice', '${escapeQuotes(`${gradeName} ${subject} Mid 1 Practice`)}', '', () => showPracticeSubjectCatalog('${gradeId}', 'Mid1'))">
                        <div class="choice-meta">
                            <span class="choice-badge">M1</span>
                            <div class="choice-info">
                                <h4>Mid 1 Examination</h4>
                                <p>${counts.Mid1} interactive questions available</p>
                            </div>
                        </div>
                        <span class="choice-action">Practice →</span>
                    </button>
                ` : ''}

                ${counts.Mid2 > 0 ? `
                    <button class="exam-choice-btn" onclick="closeModal(); startPracticeSession('${gradeId}', 'Practice Bank', 'Mid2', '${escapeQuotes(subject)}', 'practice', '${escapeQuotes(`${gradeName} ${subject} Mid 2 Practice`)}', '', () => showPracticeSubjectCatalog('${gradeId}', 'Mid2'))">
                        <div class="choice-meta">
                            <span class="choice-badge">M2</span>
                            <div class="choice-info">
                                <h4>Mid 2 Examination</h4>
                                <p>${counts.Mid2} interactive questions available</p>
                            </div>
                        </div>
                        <span class="choice-action">Practice →</span>
                    </button>
                ` : ''}

                ${counts.Final > 0 ? `
                    <button class="exam-choice-btn" onclick="closeModal(); startPracticeSession('${gradeId}', 'Practice Bank', 'Final', '${escapeQuotes(subject)}', 'practice', '${escapeQuotes(`${gradeName} ${subject} Final Practice`)}', '', () => showPracticeSubjectCatalog('${gradeId}', 'Final'))">
                        <div class="choice-meta">
                            <span class="choice-badge">F</span>
                            <div class="choice-info">
                                <h4>Final Examination</h4>
                                <p>${counts.Final} interactive questions available</p>
                            </div>
                        </div>
                        <span class="choice-action">Practice →</span>
                    </button>
                ` : ''}

                ${gradeId === 'Grade12' && counts.Pretest > 0 ? `
                    <button class="exam-choice-btn" onclick="closeModal(); startPracticeSession('${gradeId}', 'Practice Bank', 'Pretest', '${escapeQuotes(subject)}', 'practice', '${escapeQuotes(`${gradeName} ${subject} Pre-test Practice`)}', '', () => showPracticeSubjectCatalog('${gradeId}', 'Pretest'))">
                        <div class="choice-meta">
                            <span class="choice-badge">P</span>
                            <div class="choice-info">
                                <h4>Pre-test Examination</h4>
                                <p>${counts.Pretest} interactive questions available</p>
                            </div>
                        </div>
                        <span class="choice-action">Practice →</span>
                    </button>
                ` : ''}

                ${gradeId === 'Grade12' && counts.Model > 0 ? `
                    <button class="exam-choice-btn" onclick="closeModal(); startPracticeSession('${gradeId}', 'Practice Bank', 'Model', '${escapeQuotes(subject)}', 'practice', '${escapeQuotes(`${gradeName} ${subject} Model Exam Practice`)}', '', () => showPracticeSubjectCatalog('${gradeId}', 'Model'))">
                        <div class="choice-meta">
                            <span class="choice-badge">M</span>
                            <div class="choice-info">
                                <h4>Model Examination</h4>
                                <p>${counts.Model} interactive questions available</p>
                            </div>
                        </div>
                        <span class="choice-action">Practice →</span>
                    </button>
                ` : ''}

                <button class="exam-choice-btn" onclick="closeModal(); startPracticeSession('${gradeId}', 'Practice Bank', 'All', '${escapeQuotes(subject)}', 'practice', '${escapeQuotes(`${gradeName} ${subject} Practice (All Questions)`)}', '', () => showPracticeSubjectCatalog('${gradeId}', 'All'))">
                    <div class="choice-meta">
                        <span class="choice-badge" style="background: rgba(168, 85, 247, 0.15); color: #d8b4fe;">All</span>
                        <div class="choice-info">
                            <h4>All Mixed Questions</h4>
                            <p>${counts.All} total questions from all examination types</p>
                        </div>
                    </div>
                    <span class="choice-action">Practice →</span>
                </button>
            </div>
        </div>
    `;

    const footerHtml = `
        <button class="btn-secondary" onclick="closeModal()">Close</button>
        <button class="btn-primary" style="width: auto;" onclick="closeModal(); handleSubjectPracticeClick('${gradeId}', '${escapeQuotes(subject)}', 'All')">
            Official Exam Papers →
        </button>
    `;

    showModal(`${gradeName} • ${subject} Practice`, bodyHtml, footerHtml);
}

function handleSubjectPracticeClick(gradeId, subject, requestedExamType = 'All') {
    const grade = (state.categories.grades || []).find(item => item.id === gradeId);
    const gradeName = grade ? grade.name : gradeId;
    const reqDisplay = getExamTypeDisplayName(requestedExamType);

    const allExams = state.libraryExams || [];
    const clean = s => (s || '').toLowerCase().replace(/[\s_-]+/g, '');
    const cleanType = s => clean(s).replace(/exam$/i, '');
    const reqType = cleanType(requestedExamType);

    const subjectExams = allExams.filter(e => {
        if (clean(e.grade) !== clean(gradeId)) return false;
        if (clean(e.subject) !== clean(subject)) return false;
        if (requestedExamType && requestedExamType !== 'All') {
            const eType = cleanType(e.examType);
            if (eType !== reqType && !eType.includes(reqType) && !reqType.includes(eType)) return false;
        }
        return true;
    });

    const fallbackExams = subjectExams.length > 0 ? subjectExams : allExams.filter(e => clean(e.grade) === clean(gradeId) && clean(e.subject) === clean(subject));

    const bodyHtml = `
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <p>Interactive questions for <strong>${subject}</strong> ${requestedExamType !== 'All' ? `(${reqDisplay})` : ''} are currently in transcription. You can immediately practice with official school examination papers below:</p>
            ${fallbackExams.length > 0 ? `
                <div style="font-size: 13px; font-weight: 700; color: #cbd5e1; margin-top: 4px;">Available ${subject} Exam Papers (${fallbackExams.length}):</div>
                <div style="max-height: 240px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 4px;">
                    ${fallbackExams.map(e => `
                        <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-glass); border-radius: 8px; padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                            <div>
                                <strong style="color: var(--text-main); font-size: 13.5px;">${e.title || `${e.semester} ${e.examType}`}</strong>
                                <div style="font-size: 11.5px; color: var(--text-muted);">${e.semester} • ${e.examType}</div>
                            </div>
                            <button class="btn-primary" style="padding: 6px 12px; font-size: 12px; width: auto;" onclick="closeModal(); renderExamViewer('${escapeQuotes(e.title || subject)}', '${gradeName} • ${e.semester} • ${e.examType}', '${e.fileUrl || e.filePath}', () => showPracticeSubjectCatalog('${gradeId}', '${requestedExamType || 'All'}'))">
                                Practice Paper →
                            </button>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <p style="color: var(--text-muted); font-size: 13px;">Full ${gradeName} papers and formula sheets are available in the archive.</p>
            `}
        </div>
    `;
    const footerHtml = `
        <button class="btn-secondary" onclick="closeModal()">Close</button>
        <button class="btn-primary" style="width: auto;" onclick="closeModal(); showGrade('${gradeId}')">
            Browse All ${gradeName} Papers
        </button>
    `;
    showModal(`${gradeName} • ${subject} Practice`, bodyHtml, footerHtml);
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
    ensurePdfJsLoaded();

    let questionCount = 0;
    try {
        let qUrl = `/api/practice?grade=${grade}&subject=${encodeURIComponent(subject)}`;
        if (semester && semester !== 'All') qUrl += `&semester=${encodeURIComponent(semester)}`;
        if (examType && examType !== 'All') qUrl += `&examType=${encodeURIComponent(examType)}`;
        let res = await fetch(qUrl);
        let data = await res.json();
        questionCount = (data.questions || []).length;

        // Fallback to grade & subject question bank if this specific exam paper tag has 0 questions
        if (questionCount === 0) {
            res = await fetch(`/api/practice?grade=${grade}&subject=${encodeURIComponent(subject)}`);
            data = await res.json();
            questionCount = (data.questions || []).length;
        }
    } catch (e) {}

    if (questionCount === 0) {
        try {
            const raw = localStorage.getItem('pel_offline_questions');
            if (raw) {
                const allOffline = JSON.parse(raw);
                const clean = s => (s || '').toLowerCase().replace(/[\s_-]+/g, '');
                const matched = allOffline.filter(q => {
                    if (clean(q.grade) !== clean(grade)) return false;
                    if (subject && clean(q.subject) !== clean(subject)) return false;
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
                        ${uiIcon('fileText', 13)} Exam Questions
                    </span>
                    <h3 style="font-size: 24px; color: var(--text-main); margin-bottom: 8px;">Online Practice Mode</h3>
                    <p style="color: var(--text-muted); font-size: 14.5px; line-height: 1.6;">
                        Practice examination questions transcribed directly from the physical school paper with instant feedback and score reports.
                    </p>

                    <div class="mode-selector">
                        <div class="mode-option ${selectedHubMode === 'practice' ? 'active' : ''}" id="mode-opt-practice" onclick="setHubMode('practice')">
                            <div class="mode-radio"></div>
                            <div>
                                <div style="font-weight: 700; color: var(--text-main); font-size: 15px;">
                                    Practice Mode
                                </div>
                                <div style="font-size: 12.5px; color: var(--text-muted); margin-top: 2px;">
                                    Check answers immediately after each question with step-by-step explanations.
                                </div>
                            </div>
                        </div>

                        <div class="mode-option ${selectedHubMode === 'timed' ? 'active' : ''}" id="mode-opt-timed" onclick="setHubMode('timed')">
                            <div class="mode-radio"></div>
                            <div>
                                <div style="font-weight: 700; color: var(--text-main); font-size: 15px;">
                                    Timed Examination
                                </div>
                                <div style="font-size: 12.5px; color: var(--text-muted); margin-top: 2px;">
                                    Simulated test conditions with live countdown timer and verified final score report.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="margin-top: 14px;">
                        <button type="button" class="btn-secondary" style="border-radius: 10px; padding: 9px 14px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; font-weight: 700; background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(168, 85, 247, 0.12)); border: 1px solid rgba(239, 68, 68, 0.35); color: #fca5a5; width: 100%; cursor: pointer;" onclick="openStartDuelModal('${grade}', '${escapeQuotes(subject)}')">
                            <span>⚔️</span> Challenge Classmates in ${escapeQuotes(subject)} (1v1 Telegram Duel)
                        </button>
                    </div>

                    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 18px; border-top: 1px solid var(--border-glass);">
                        <span style="font-size: 13px; color: var(--text-muted); font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
                            ${uiIcon('fileText', 14)} ${questionCount} Questions Available
                        </span>
                        <button class="btn-primary" style="width: auto; padding: 12px 24px;" 
                                onclick="startPracticeSession('${grade}', '${semester}', '${examType}', '${escapeQuotes(subject)}', selectedHubMode, '${escapeQuotes(examTitle)}', '${filePath}', window._lastBackFn)">
                            Start Practice (${questionCount} Qs) →
                        </button>
                    </div>
                ` : `
                    <span class="hub-badge" style="background: rgba(148, 163, 184, 0.15); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.25); display: inline-flex; align-items: center; gap: 5px;">
                        ${uiIcon('clipboard', 12)} Archive Paper
                    </span>
                    <h3 style="font-size: 22px; color: var(--text-main); margin-bottom: 8px;">Interactive Practice In Preparation</h3>
                    <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
                        Questions for this paper are being transcribed directly from physical school archives. The original paper is available for study below.
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
                        ${uiIcon(isExamBookmarked(examTitle) ? 'bookmarkCheck' : 'bookmark', 15)} ${isExamBookmarked(examTitle) ? 'Saved in Study Hub' : 'Save to Study Hub'}
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

    let questions = [];
    try {
        let qUrl = `/api/practice?grade=${grade}&subject=${encodeURIComponent(subject)}`;
        if (semester && semester !== 'All' && semester !== 'Practice Bank') {
            qUrl += `&semester=${encodeURIComponent(semester)}`;
        }
        if (examType && examType !== 'All') {
            qUrl += `&examType=${encodeURIComponent(examType)}&exactOnly=true`;
        }
        let res = await fetch(qUrl);
        let data = await res.json();
        questions = data.questions || [];

        // Fallback to grade & subject question bank ONLY if examType was not specifically requested
        if (questions.length === 0 && (!examType || examType === 'All')) {
            res = await fetch(`/api/practice?grade=${grade}&subject=${encodeURIComponent(subject)}`);
            data = await res.json();
            questions = data.questions || [];
        }
    } catch (e) {
        console.warn('Practice fetch error online, checking offline cache', e);
    }

    if (questions.length === 0) {
        try {
            const raw = localStorage.getItem('pel_offline_questions');
            if (raw) {
                const allOffline = JSON.parse(raw);
                const clean = s => (s || '').toLowerCase().replace(/[\s_-]+/g, '');
                const cleanType = s => clean(s).replace(/exam$/i, '');
                questions = allOffline.filter(q => {
                    if (clean(q.grade) !== clean(grade)) return false;
                    if (subject && clean(q.subject) !== clean(subject)) return false;
                    if (examType && examType !== 'All') {
                        const qType = cleanType(q.examType);
                        const reqType = cleanType(examType);
                        if (qType !== reqType && !qType.includes(reqType) && !reqType.includes(qType)) return false;
                    }
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
        timerInterval: null,
        hideAnswers: localStorage.getItem('pel_quiz_hide_answers') === 'true'
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
    const isTimed = currentQuiz.mode === 'timed';
    const isHiddenMode = !isTimed && !!currentQuiz.hideAnswers;
    const isChecked = !isHiddenMode && currentQuiz.checked[q.id];
    const isFlagged = currentQuiz.flagged[q.id];

    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    // Hide mobile bottom navigation bar so choices and action buttons are unobstructed on small screens
    const mobNav = document.getElementById('mobile-bottom-nav');
    if (mobNav) mobNav.style.display = 'none';

    // Disable Android swipe-to-refresh so vertical scrolling is 100% fluid and test progress is safe
    if (window.AndroidNative && typeof window.AndroidNative.setSwipeRefreshEnabled === 'function') {
        window.AndroidNative.setSwipeRefreshEnabled(false);
    }

    app.innerHTML = `
        <div class="quiz-runner-container">
            ${currentQuiz.duel ? `
                <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(168, 85, 247, 0.15)); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 12px; padding: 10px 16px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                    <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: #fca5a5; font-size: 13.5px;">
                        <span>⚔️ 1v1 STUDY DUEL</span>
                        <span>•</span>
                        <span>${currentQuiz.duel.isCreator ? 'Setting high score to challenge classmates' : `Challenger: ${escapeQuotes(currentQuiz.duel.challenger)} (Score to beat: ${currentQuiz.duel.score}/${currentQuiz.duel.total})`}</span>
                    </div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 700;">
                        Question ${currentQuiz.currentIndex + 1} of ${total}
                    </div>
                </div>
            ` : ''}
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

                <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                    ${isTimed ? `
                        <div class="quiz-timer-pill" id="quiz-timer-display" style="display: inline-flex; align-items: center; gap: 6px;">
                            ${uiIcon('clock', 13)} ${formatTime(currentQuiz.timeRemaining)}
                        </div>
                    ` : `
                        <button class="btn-secondary" style="padding: 6px 12px; font-size: 12px; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; ${isHiddenMode ? 'background: rgba(16, 185, 129, 0.15); color: #34d399; border-color: rgba(16, 185, 129, 0.4);' : ''}" onclick="toggleQuizAnswerVisibility()" title="Toggle Self-Study Mode: Hide answers so you can dig on your own">
                            ${isHiddenMode ? `${uiIcon('eyeOff', 13)} Answers Hidden (Dig Mode)` : `${uiIcon('eye', 13)} Show Answers`}
                        </button>
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
                    ${(q.options || []).map((opt, idx) => {
                        let optClass = 'option-btn';
                        if (selected === idx) optClass += ' selected';
                        if (isChecked) {
                            if (idx === q.correctAnswer) optClass += ' correct';
                            else if (selected === idx) optClass += ' incorrect';
                        }

                        return `
                            <button type="button" class="${optClass}" data-q-idx="${idx}" onclick="selectQuizOption('${q.id}', ${idx})" ${isChecked ? 'disabled' : ''}>
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

                <!-- Bottom Duolingo-Style Action Area -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--border-glass); flex-wrap: wrap; gap: 14px;">
                    <button class="btn-secondary" style="padding: 12px 18px; font-weight: 700; border-radius: 12px;" onclick="prevQuizQuestion()" ${currentQuiz.currentIndex === 0 ? 'disabled style="opacity: 0.4;"' : ''}>
                        ← Back
                    </button>

                    <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                        ${!isTimed && !isChecked && !isHiddenMode ? `
                            <button id="quiz-check-answer-btn" class="duolingo-btn-action" style="background: #58cc02; box-shadow: 0 4px 0 #46a302; width: auto; min-width: 190px; padding: 12px 28px; font-size: 14px; font-weight: 800; border-radius: 14px; ${selected === undefined ? 'opacity: 0.5; pointer-events: none;' : ''}" onclick="checkCurrentAnswer('${q.id}')" ${selected === undefined ? 'disabled' : ''}>
                                CHECK ANSWER
                            </button>
                        ` : ''}

                        ${isChecked || isHiddenMode || isTimed ? `
                            ${currentQuiz.currentIndex < total - 1 ? `
                                <button class="duolingo-btn-action" style="background: ${isChecked && selected === q.correctAnswer ? '#58cc02' : '#1cb0f6'}; box-shadow: 0 4px 0 ${isChecked && selected === q.correctAnswer ? '#46a302' : '#0284c7'}; width: auto; min-width: 190px; padding: 12px 28px; font-size: 14px; font-weight: 800; border-radius: 14px;" onclick="nextQuizQuestion()">
                                    CONTINUE →
                                </button>
                            ` : `
                                <button class="duolingo-btn-action duolingo-btn-orange" style="width: auto; min-width: 190px; padding: 12px 28px; font-size: 14px; font-weight: 800; border-radius: 14px;" onclick="finishQuiz()">
                                    COMPLETE QUIZ →
                                </button>
                            `}
                        ` : ''}
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

    // Smoothly update selected choice in DOM without resetting page scroll
    const optionsGrid = document.querySelector('.options-grid');
    if (optionsGrid) {
        const optionBtns = optionsGrid.querySelectorAll('.option-btn');
        optionBtns.forEach((btn, idx) => {
            if (idx === index) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
    }

    const checkBtn = document.getElementById('quiz-check-answer-btn');
    if (checkBtn) {
        checkBtn.removeAttribute('disabled');
        checkBtn.style.opacity = '1';
        checkBtn.style.pointerEvents = 'auto';
    }
}

function checkCurrentAnswer(qId) {
    currentQuiz.checked[qId] = true;
    renderQuizScreen();
}

function toggleQuizAnswerVisibility() {
    currentQuiz.hideAnswers = !currentQuiz.hideAnswers;
    try {
        localStorage.setItem('pel_quiz_hide_answers', currentQuiz.hideAnswers ? 'true' : 'false');
    } catch (_) {}
    if (currentQuiz.hideAnswers) {
        showToast('Self-Study Mode ON: Answers & explanations hidden so you can dig for yourself!', 'info');
    } else {
        showToast('Answer hints & explanations enabled.', 'info');
    }
    renderQuizScreen();
}

function nextQuizQuestion() {
    if (currentQuiz.currentIndex < currentQuiz.questions.length - 1) {
        currentQuiz.currentIndex++;
        renderQuizScreen();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function prevQuizQuestion() {
    if (currentQuiz.currentIndex > 0) {
        currentQuiz.currentIndex--;
        renderQuizScreen();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function jumpQuizQuestion(index) {
    currentQuiz.currentIndex = index;
    renderQuizScreen();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

function exitQuizSession() {
    closeModal();
    if (currentQuiz.timerInterval) clearInterval(currentQuiz.timerInterval);
    const mobNav = document.getElementById('mobile-bottom-nav');
    if (mobNav) mobNav.style.display = '';
    disableAndroidSwipeRefresh();
    if (currentQuiz.backFn) {
        currentQuiz.backFn();
    } else {
        showLibraryHome();
    }
}

function confirmExitQuiz() {
    const bodyHtml = `
        <p>Are you sure you want to leave this practice session?</p>
        <p style="color: var(--text-muted); font-size: 13px; margin-top: 8px;">Your current test progress will be lost.</p>
    `;
    const footerHtml = `
        <button class="btn-secondary" onclick="closeModal()">Stay in Test</button>
        <button class="btn-primary" style="background: var(--accent-rose);" onclick="exitQuizSession()">
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

    // Restore mobile bottom navigation bar
    const mobNav = document.getElementById('mobile-bottom-nav');
    if (mobNav) mobNav.style.display = '';
    disableAndroidSwipeRefresh();

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

    let verdict = `Score: ${percent}%`;
    if (percent >= 90) verdict = `Distinction (${percent}%)`;
    else if (percent >= 75) verdict = `Upper Credit (${percent}%)`;
    else if (percent >= 50) verdict = `Passing Grade (${percent}%)`;
    else verdict = `Revision Required (${percent}%)`;

    // If opponent just finished a 1v1 Telegram duel challenge, render the duel results arena
    if (currentQuiz.duel && !currentQuiz.duel.isCreator) {
        renderDuelResultsArena(currentQuiz.duel, correctCount, currentQuiz.questions.length);
        return;
    }

    // If student just finished creating a 1v1 duel challenge, pop up the share modal automatically
    if (currentQuiz.duel && currentQuiz.duel.isCreator) {
        setTimeout(() => {
            openShareDuelModal(correctCount, currentQuiz.questions.length, currentQuiz.grade, currentQuiz.subject);
        }, 400);
    }

    app.innerHTML = `
        <div class="results-card">
            <div class="empty-state-icon-wrap" style="width: 72px; height: 72px; margin: 0 auto 16px; background: rgba(99, 102, 241, 0.12); color: var(--primary); border-color: rgba(99, 102, 241, 0.25);">
                ${uiIcon('fileText', 34)}
            </div>
            <h2 style="font-family: inherit; font-size: 28px; color: var(--text-main); margin-bottom: 6px; font-weight: 700;">Assessment Results</h2>
            <p style="color: var(--text-muted); font-size: 15px;">${currentQuiz.subject} • ${currentQuiz.grade} • ${currentQuiz.examType}</p>

            <div class="score-circle-wrapper" style="margin-top: 24px;">
                <div class="score-percentage">${percent}%</div>
                <div class="score-fraction">${correctCount} of ${currentQuiz.questions.length} Correct</div>
            </div>

            <h3 style="color: #e9d5ff; font-size: 20px; font-weight: 700; margin-bottom: 20px;">${verdict}</h3>

            <!-- Duolingo Streak Extended Banner -->
            <div style="background: linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(239, 68, 68, 0.15)); border: 1.5px solid rgba(249, 115, 22, 0.4); border-radius: 14px; padding: 14px 18px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; text-align: left; box-shadow: 0 4px 16px rgba(249, 115, 22, 0.15);" onclick="openStreakModal('personal')">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="font-size: 28px; animation: duolingoFlameDance 2.2s infinite ease-in-out;">🔥</div>
                    <div>
                        <div style="font-size: 14px; font-weight: 800; color: #ffedd5;">Daily Study Streak Extended!</div>
                        <div style="font-size: 12px; color: #fdba74;">You practiced today and kept your study flame blazing. Tap to view →</div>
                    </div>
                </div>
                <div style="font-size: 20px; font-weight: 900; color: #f97316;">${streak.count}🔥</div>
            </div>

            <!-- 1v1 Telegram Study Duel Challenge Banner -->
            <div class="duel-prompt-card">
                <div class="duel-prompt-header">
                    <span>⚔️</span>
                    <span>1v1 Telegram Study Duel</span>
                    <span class="duel-badge-pulse">Viral</span>
                </div>
                <p class="duel-prompt-desc">
                    Challenge your classmates on Telegram to beat your score of <strong>${correctCount}/${currentQuiz.questions.length}</strong> in ${escapeQuotes(currentQuiz.subject)}!
                </p>
                <button type="button" class="btn-primary duel-launch-btn" onclick="openShareDuelModal(${correctCount}, ${currentQuiz.questions.length}, '${currentQuiz.grade}', '${escapeQuotes(currentQuiz.subject)}')">
                    ⚔️ Challenge a Friend on Telegram →
                </button>
            </div>

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

// PDF Reader State & Lazy-Loader
let pdfViewerState = {
    doc: null,
    pageNum: 1,
    pageCount: 0,
    scale: 1.2,
    viewMode: 'canvas', // 'canvas' or 'native'
    fileUrl: '',
    title: ''
};

let pdfJsLoadingPromise = null;
function ensurePdfJsLoaded() {
    if (window.pdfjsLib) return Promise.resolve(true);
    if (pdfJsLoadingPromise) return pdfJsLoadingPromise;
    pdfJsLoadingPromise = new Promise((resolve) => {
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        s.async = true;
        s.onload = () => {
            try {
                if (window.pdfjsLib) {
                    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                }
            } catch (e) {}
            resolve(true);
        };
        s.onerror = () => {
            console.warn('Failed to dynamically load PDF.js');
            resolve(false);
        };
        document.head.appendChild(s);
    });
    return pdfJsLoadingPromise;
}

function renderExamViewer(title, subtitle, fileUrl, onBackFn, pushHistory = true) {
    if (pushHistory) {
        pushNavState({ view: 'viewer', title, subtitle, fileUrl }, title);
    }
    window._lastBackFn = onBackFn;
    pdfViewerState.fileUrl = fileUrl;
    pdfViewerState.title = title;
    pdfViewerState.pageNum = 1;
    pdfViewerState.doc = null;
    pdfViewerState.viewMode = 'canvas';
    ensurePdfJsLoaded();

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
                <!-- Subtle Top Streaming Strip (No blocking modal card) -->
                <div class="pdf-stream-strip" id="pdf-stream-strip">
                    <div class="pdf-stream-fill" id="pdf-progress-bar"></div>
                </div>

                <div id="pdf-canvas-area" class="pdf-canvas-container" style="${pdfViewerState.viewMode === 'native' ? 'display: none;' : ''}">
                    <!-- Realistic Exam Paper Skeleton: Renders with zero latency so users see document immediately -->
                    <div class="pdf-paper-skeleton" id="pdf-paper-skeleton" aria-label="Loading document page">
                        <div class="paper-skel-header">
                            <div class="paper-skel-crest"></div>
                            <div class="paper-skel-line title"></div>
                            <div class="paper-skel-line sub"></div>
                            <div class="paper-skel-line meta"></div>
                            <div class="paper-skel-inst-box">
                                <div class="paper-skel-line" style="width: 82%;"></div>
                                <div class="paper-skel-line" style="width: 65%;"></div>
                            </div>
                        </div>
                        <div class="paper-skel-questions">
                            <div class="paper-skel-q">
                                <div class="paper-skel-q-num">
                                    <div class="paper-skel-q-badge"></div>
                                    <div class="paper-skel-line" style="width: 80%;"></div>
                                </div>
                                <div class="paper-skel-q-options">
                                    <div class="paper-skel-line" style="width: 70%;"></div>
                                    <div class="paper-skel-line" style="width: 62%;"></div>
                                    <div class="paper-skel-line" style="width: 74%;"></div>
                                    <div class="paper-skel-line" style="width: 58%;"></div>
                                </div>
                            </div>
                            <div class="paper-skel-q">
                                <div class="paper-skel-q-num">
                                    <div class="paper-skel-q-badge"></div>
                                    <div class="paper-skel-line" style="width: 85%;"></div>
                                </div>
                                <div class="paper-skel-q-options">
                                    <div class="paper-skel-line" style="width: 65%;"></div>
                                    <div class="paper-skel-line" style="width: 78%;"></div>
                                    <div class="paper-skel-line" style="width: 55%;"></div>
                                    <div class="paper-skel-line" style="width: 68%;"></div>
                                </div>
                            </div>
                            <div class="paper-skel-q">
                                <div class="paper-skel-q-num">
                                    <div class="paper-skel-q-badge"></div>
                                    <div class="paper-skel-line" style="width: 72%;"></div>
                                </div>
                                <div class="paper-skel-q-options">
                                    <div class="paper-skel-line" style="width: 66%;"></div>
                                    <div class="paper-skel-line" style="width: 50%;"></div>
                                </div>
                            </div>
                        </div>
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
        const loaded = await ensurePdfJsLoaded();
        if (!loaded || !window.pdfjsLib) {
            console.warn('PDF.js not available, falling back to native iframe');
            switchPdfViewMode('native');
            return;
        }
    }

    try {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    } catch (e) {}

    const progressBar = document.getElementById('pdf-progress-bar');

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
                    const percent = Math.min(Math.round((progress.loaded / progress.total) * 100), 96);
                    progressBar.style.width = percent + '%';
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

        // Smoothly fade out and remove the paper skeleton now that real canvas is rendered
        const skel = document.getElementById('pdf-paper-skeleton');
        if (skel) {
            skel.style.opacity = '0';
            setTimeout(() => { if (skel && skel.parentNode) skel.remove(); }, 250);
        }
        // Smoothly complete and fade out top streaming strip
        const progressBar = document.getElementById('pdf-progress-bar');
        const streamStrip = document.getElementById('pdf-stream-strip');
        if (progressBar) progressBar.style.width = '100%';
        if (streamStrip) {
            setTimeout(() => { streamStrip.style.opacity = '0'; }, 300);
        }

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
                    <strong class="countdown-target-name">${target.name}</strong>
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
            btn.innerHTML = `${uiIcon(isNow ? 'bookmarkCheck' : 'bookmark', 15)} ${isNow ? 'Saved in Study Hub' : 'Save to Study Hub'}`;
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
                                    <option value="not_started" ${b.status === 'not_started' || !b.status ? 'selected' : ''}>Not Started</option>
                                    <option value="in_progress" ${b.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
                                    <option value="mastered" ${b.status === 'mastered' ? 'selected' : ''}>Completed</option>
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
            "title": "Vector Magnitude & Unit Vector",
            "topic": "Vectors",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "|u| = √(u₁² + u₂² + u₃²)   |   û = u / |u|   (|û| = 1)",
            "variables": "u = (u₁, u₂, u₃) = vector components in 3D, |u| = Euclidean norm/length, û = dimensionless unit direction vector",
            "tip": "A unit vector has a length of exactly 1. To normalize any non-zero vector, divide each component by its magnitude."
        },
        {
            "title": "Scalar (Dot) Product & Angle Between Vectors",
            "topic": "Vectors",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "u · v = |u||v|cos θ = u₁v₁ + u₂v₂ + u₃v₃   |   cos θ = (u · v) / (|u||v|)",
            "variables": "u, v = vectors, θ = angle between vectors (0 ≤ θ ≤ π), u · v = scalar dot product",
            "tip": "Two non-zero vectors are perpendicular (orthogonal) if and only if their dot product u · v = 0."
        },
        {
            "title": "Vector (Cross) Product & Geometric Area",
            "topic": "Vectors",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "u × v = |u||v|sin θ · n̂   |   |u × v| = Area of parallelogram   |   ½|u × v| = Area of triangle",
            "variables": "u × v = vector perpendicular to both u and v (right-hand rule), n̂ = normal unit vector",
            "tip": "The cross product of parallel (collinear) vectors is zero: u × v = 0 when sin θ = 0 (θ = 0° or 180°)."
        },
        {
            "title": "Vector Projections (Scalar & Vector)",
            "topic": "Vectors",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Scalar Component: comp_v(u) = (u · v) / |v|   |   Vector Projection: proj_v(u) = [(u · v) / |v|²] · v",
            "variables": "comp_v(u) = signed scalar length of projection, proj_v(u) = orthogonal projection vector along v",
            "tip": "The vector component of u orthogonal to v is given by u - proj_v(u)."
        },
        {
            "title": "Position, Velocity & Acceleration via Calculus",
            "topic": "Motion & Rates of Change",
            "grades": [
                "Grade12"
            ],
            "displayMath": "v(t) = s'(t) = ds/dt   |   a(t) = v'(t) = s''(t) = dv/dt   |   s(t) = ∫ v(t) dt",
            "variables": "s(t) = position/displacement function, v(t) = instantaneous velocity, a(t) = instantaneous acceleration, t = time",
            "tip": "A particle is at rest instantaneously when v(t) = 0. Speed is the scalar magnitude |v(t)|."
        },
        {
            "title": "Total Distance Traveled vs Net Displacement",
            "topic": "Motion & Rates of Change",
            "grades": [
                "Grade12"
            ],
            "displayMath": "Displacement: Δs = ∫ₐᵇ v(t) dt = s(b) - s(a)   |   Total Distance: D = ∫ₐᵇ |v(t)| dt",
            "variables": "a, b = initial and final time instants, v(t) = velocity function, |v(t)| = speed",
            "tip": "To find total distance, find where v(t) changes sign (v(t) = 0), split the integral across those intervals, and take absolute values."
        },
        {
            "title": "Related Rates of Motion & Change",
            "topic": "Motion & Rates of Change",
            "grades": [
                "Grade12"
            ],
            "displayMath": "dy/dt = (dy/dx) · (dx/dt)   |   Pythagorean rate: 2x(dx/dt) + 2y(dy/dt) = 2z(dz/dt)",
            "variables": "x, y, z = geometric variables varying with time t, dx/dt, dy/dt = instantaneous time rates of change",
            "tip": "Differentiate the connecting geometric equation implicitly with respect to time t, then substitute known instantaneous values."
        },
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
            "variables": "a, b, c = coefficients in ax² + bx + c = 0 (a ≠ 0), Δ = discriminant",
            "tip": "Δ > 0: two distinct real roots; Δ = 0: one repeated real root; Δ < 0: no real roots (two complex conjugate roots)."
        },
        {
            "title": "Vieta's Formulas for Polynomial Roots",
            "topic": "Algebra & Polynomials",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Quadratic: x₁ + x₂ = -b/a,  x₁·x₂ = c/a   |   Cubic: Σxᵢ = -b/a,  Σxᵢxⱼ = c/a,  x₁x₂x₃ = -d/a",
            "variables": "xᵢ = roots of polynomial P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₀",
            "tip": "Allows finding symmetric expressions like x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂ without solving for individual roots."
        },
        {
            "title": "Remainder & Factor Theorems",
            "topic": "Algebra & Polynomials",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "P(x) = (x - c)·Q(x) + R   =>   Remainder R = P(c)   |   (x - c) is a factor ⟺ P(c) = 0",
            "variables": "P(x) = dividend polynomial, (x - c) = linear divisor, Q(x) = quotient, R = constant remainder",
            "tip": "If P(c) = 0, then c is an exact root of P(x) and (x - c) divides P(x) completely with zero remainder."
        },
        {
            "title": "Binomial Expansion Theorem",
            "topic": "Algebra & Polynomials",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "(a + b)ⁿ = Σₖ₌₀ⁿ [C(n, k) · aⁿ⁻ᵏ · bᵏ]   |   C(n, k) = n! / [k!(n - k)!]",
            "variables": "n = positive integer power, C(n, k) = binomial coefficients, T_(k+1) = (k+1)-th term",
            "tip": "The general (r + 1)-th term in the expansion is T_(r+1) = C(n, r) · aⁿ⁻ʳ · bʳ."
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
            "displayMath": "d = √[(x₂ - x₁)² + (y₂ - y₁)²]   |   M = ((x₁ + x₂)/2, (y₁ + y₂)/2)   |   m = (y₂ - y₁) / (x₂ - x₁)",
            "variables": "(x₁, y₁), (x₂, y₂) = coordinates of two points, d = distance, M = midpoint, m = slope/gradient",
            "tip": "Parallel lines have identical slopes (m₁ = m₂). Perpendicular lines have negative reciprocal slopes (m₁ · m₂ = -1)."
        },
        {
            "title": "Distance from a Point to a Straight Line",
            "topic": "Analytic Geometry",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "d = |A·x₀ + B·y₀ + C| / √(A² + B²)",
            "variables": "(x₀, y₀) = coordinates of point, Ax + By + C = 0 = standard equation of line, d = perpendicular distance",
            "tip": "Distance between two parallel lines Ax + By + C₁ = 0 and Ax + By + C₂ = 0 is d = |C₁ - C₂| / √(A² + B²)."
        },
        {
            "title": "Standard Equation of a Circle",
            "topic": "Analytic Geometry",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "(x - h)² + (y - k)² = r²   |   General: x² + y² + 2gx + 2fy + c = 0",
            "variables": "(h, k) = center, r = radius. In general form: Center = (-g, -f), radius r = √(g² + f² - c)",
            "tip": "If g² + f² - c < 0, no real circle exists. If = 0, it represents a single degenerate point."
        },
        {
            "title": "Conic Sections: Parabola, Ellipse & Hyperbola",
            "topic": "Analytic Geometry",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Parabola: (y - k)² = 4p(x - h)   |   Ellipse: x²/a² + y²/b² = 1 (c²=a²-b²)   |   Hyperbola: x²/a² - y²/b² = 1 (c²=a²+b²)",
            "variables": "a = semi-major axis, b = semi-minor axis, c = focal distance, e = c/a (eccentricity)",
            "tip": "Eccentricity: e = 0 for circle; 0 < e < 1 for ellipse; e = 1 for parabola; e > 1 for hyperbola."
        },
        {
            "title": "Fundamental Pythagorean Identities",
            "topic": "Trigonometry",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "sin²θ + cos²θ = 1   |   1 + tan²θ = sec²θ   |   1 + cot²θ = csc²θ",
            "variables": "θ = angle, tan θ = sin θ/cos θ, sec θ = 1/cos θ, csc θ = 1/sin θ, cot θ = 1/tan θ",
            "tip": "Divide sin²θ + cos²θ = 1 by cos²θ to get 1 + tan²θ = sec²θ instantly."
        },
        {
            "title": "Compound Angle & Double Angle Formulas",
            "topic": "Trigonometry",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "sin(A ± B) = sin A cos B ± cos A sin B   |   cos(A ± B) = cos A cos B ∓ sin A sin B   |   sin 2θ = 2sin θ cos θ",
            "variables": "A, B, θ = real angles in radians or degrees, cos 2θ = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ",
            "tip": "Crucial for calculus integrations: cos²θ = (1 + cos 2θ)/2 and sin²θ = (1 - cos 2θ)/2."
        },
        {
            "title": "Laws of Sines & Cosines (Triangle Solving)",
            "topic": "Trigonometry",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Law of Sines: a/sin A = b/sin B = c/sin C = 2R   |   Law of Cosines: c² = a² + b² - 2ab·cos C",
            "variables": "a, b, c = side lengths, A, B, C = opposite interior angles, R = circumradius",
            "tip": "Area of any triangle with two sides and included angle: Area = ½·a·b·sin C."
        },
        {
            "title": "Core Differentiation Rules",
            "topic": "Calculus",
            "grades": [
                "Grade12"
            ],
            "displayMath": "Power: d/dx(xⁿ) = n·xⁿ⁻¹   |   Product: (uv)' = u'v + uv'   |   Quotient: (u/v)' = (u'v - uv')/v²   |   Chain: [f(g(x))]' = f'(g(x))·g'(x)",
            "variables": "u = u(x), v = v(x) differentiable functions, v ≠ 0, n = real number exponent",
            "tip": "Quotient rule mnemonic: (Low d-High - High d-Low) / (Low Low)."
        },
        {
            "title": "Derivatives of Transcendental Functions",
            "topic": "Calculus",
            "grades": [
                "Grade12"
            ],
            "displayMath": "d/dx(eᵏˣ) = k·eᵏˣ   |   d/dx(ln x) = 1/x   |   d/dx(sin x) = cos x   |   d/dx(cos x) = -sin x   |   d/dx(tan x) = sec²x",
            "variables": "k = constant scalar, x > 0 for natural logarithm ln x",
            "tip": "Remember that trigonometric derivatives starting with 'co' (cos, cot, csc) always produce negative derivatives."
        },
        {
            "title": "Fundamental Theorem of Calculus & Standard Integrals",
            "topic": "Calculus",
            "grades": [
                "Grade12"
            ],
            "displayMath": "∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C (n≠-1)   |   ∫ (1/x) dx = ln|x| + C   |   Definite: ∫ₐᵇ f(x) dx = F(b) - F(a)",
            "variables": "F(x) = antiderivative of f(x) such that F'(x) = f(x), C = arbitrary constant of integration",
            "tip": "For integration by substitution: ∫ f(g(x))g'(x) dx = ∫ f(u) du where u = g(x) and du = g'(x)dx."
        },
        {
            "title": "Arithmetic Progression (AP)",
            "topic": "Sequences & Series",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "aₙ = a₁ + (n - 1)d   |   Sₙ = (n/2)[2a₁ + (n - 1)d] = (n/2)(a₁ + aₙ)",
            "variables": "a₁ = first term, d = common difference (aₙ - aₙ₋₁), n = term number, Sₙ = sum of first n terms",
            "tip": "Arithmetic mean between two numbers a and b is A = (a + b) / 2."
        },
        {
            "title": "Geometric Progression (GP) & Infinite Series",
            "topic": "Sequences & Series",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "aₙ = a₁ · rⁿ⁻¹   |   Sₙ = a₁(1 - rⁿ) / (1 - r)   |   S_∞ = a₁ / (1 - r)  (|r| < 1)",
            "variables": "a₁ = first term, r = common ratio (aₙ / aₙ₋₁), S_∞ = sum to infinity (converges only when |r| < 1)",
            "tip": "If |r| ≥ 1, the infinite geometric series diverges and has no finite sum."
        },
        {
            "title": "Permutations, Combinations & Probability",
            "topic": "Probability & Statistics",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "P(n, r) = n! / (n - r)!   |   C(n, r) = n! / [r!(n - r)!]   |   P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
            "variables": "n = total items, r = items chosen, P(A) = probability. Note: 0! = 1",
            "tip": "Permutation: ORDER matters (ranking, PINs). Combination: ORDER does not matter (committees, hands of cards)."
        },
        {
            "title": "Sample Mean, Variance & Standard Deviation",
            "topic": "Probability & Statistics",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Mean x̄ = (Σ xᵢ) / n   |   Variance s² = Σ(xᵢ - x̄)² / (n - 1)   |   Std Dev s = √(s²)",
            "variables": "xᵢ = individual data observations, n = sample size, x̄ = sample arithmetic mean",
            "tip": "Variance measures average squared deviation from the mean; standard deviation brings the unit back to the original measurement."
        }
    ],
    "physics": [
        {
            "title": "Vector Resolution into Orthogonal Components",
            "topic": "Vectors",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "A_x = |A| cos θ   |   A_y = |A| sin θ   |   |A| = √(A_x² + A_y²)   |   θ = arctan(A_y / A_x)",
            "variables": "|A| = magnitude of vector (scalar ≥ 0), θ = direction angle measured counterclockwise from +x axis",
            "tip": "Always check the coordinate quadrant when computing θ from arctan(A_y / A_x) to get the true standard direction."
        },
        {
            "title": "Resultant of Multiple Vectors (Component Method)",
            "topic": "Vectors",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "R_x = Σ A_x = A₁ₓ + A₂ₓ + ...   |   R_y = Σ A_y = A₁ᵧ + A₂ᵧ + ...   |   |R| = √(R_x² + R_y²)",
            "variables": "R = resultant net vector, R_x = sum of horizontal components, R_y = sum of vertical components",
            "tip": "For equilibrium of coplanar forces: Σ F_x = 0 and Σ F_y = 0."
        },
        {
            "title": "Scalar Dot Product & Physical Work",
            "topic": "Vectors",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "A · B = |A||B| cos θ   |   Work W = F · d = |F||d| cos θ",
            "variables": "F = applied force vector, d = displacement vector, θ = angle between force and displacement",
            "tip": "Work is zero when force is perpendicular to displacement (θ = 90°, cos 90° = 0), e.g. magnetic force on a charge."
        },
        {
            "title": "Vector Cross Product & Torque",
            "topic": "Vectors",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "τ = r × F   |   |τ| = |r||F| sin θ = F · d_perpendicular",
            "variables": "τ = torque vector (N·m), r = position vector from pivot to point of force application, θ = angle between r and F",
            "tip": "Torque is maximized when the force is applied perpendicular to the moment arm (θ = 90°, sin 90° = 1)."
        },
        {
            "title": "The 4 Equations of Uniformly Accelerated Motion (1D)",
            "topic": "Motion & Kinematics",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "1) v = u + at   |   2) s = ut + ½at²   |   3) v² = u² + 2as   |   4) s = [(u + v)/2]·t",
            "variables": "u = initial velocity, v = final velocity, a = constant acceleration, t = time elapsed, s = displacement",
            "tip": "Select the equation that excludes the unknown variable not asked for in the examination question."
        },
        {
            "title": "Free Fall Under Gravity (Vertical Motion)",
            "topic": "Motion & Kinematics",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "v = u - gt   |   h = ut - ½gt²   |   v² = u² - 2gh   |   t_peak = u/g   |   H_max = u²/(2g)",
            "variables": "g = 9.8 m/s² (downward acceleration due to gravity), u = initial vertical speed, H_max = maximum altitude",
            "tip": "At the maximum height of vertical projection, instantaneous vertical velocity v = 0 m/s."
        },
        {
            "title": "Projectile Motion in 2D (Launch at Angle θ)",
            "topic": "Motion & Kinematics",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Time of Flight: T = (2u·sin θ)/g   |   Max Height: H = (u²·sin²θ)/(2g)   |   Range: R = (u²·sin 2θ)/g",
            "variables": "u = initial launch speed, θ = angle of launch above horizontal ground, g = 9.8 m/s²",
            "tip": "Horizontal velocity v_x = u cos θ remains strictly CONSTANT throughout flight because horizontal acceleration a_x = 0."
        },
        {
            "title": "Uniform Circular Motion & Centripetal Acceleration",
            "topic": "Motion & Kinematics",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "a_c = v² / r = ω²r   |   v = ω·r = (2πr) / T   |   Centripetal Force F_c = m·a_c = (m·v²) / r",
            "variables": "v = linear tangential speed, ω = angular velocity (rad/s), r = circular radius, T = period of rotation (s)",
            "tip": "Centripetal acceleration is always directed radially inward toward the center of rotation, perpendicular to tangential velocity."
        },
        {
            "title": "Relative Velocity in 1D & 2D",
            "topic": "Motion & Kinematics",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "v_AB = v_A - v_B   |   Opposite directions: |v_AB| = |v_A| + |v_B|   |   Same direction: |v_AB| = |v_A| - |v_B|",
            "variables": "v_AB = velocity of body A relative to observer B, v_A = velocity of A, v_B = velocity of B",
            "tip": "In river crossing problems, downstream drift = v_river × (width / v_boat_perpendicular)."
        },
        {
            "title": "Newton's Second Law & Net Force",
            "topic": "Forces & Dynamics",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Σ F = m · a = dp/dt   |   Weight W = m · g",
            "variables": "ΣF = vector sum of all external forces (N), m = inertial mass (kg), a = acceleration (m/s²)",
            "tip": "Always draw a Free Body Diagram (FBD) resolving forces along the axis of acceleration and perpendicular to it."
        },
        {
            "title": "Static & Kinetic Friction Forces",
            "topic": "Forces & Dynamics",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "f_s ≤ μ_s · N   |   f_s(max) = μ_s · N   |   f_k = μ_k · N",
            "variables": "f_s = static friction, f_k = kinetic (sliding) friction, μ = friction coefficient, N = normal contact reaction force",
            "tip": "Static friction is an adjustable self-limiting force that matches applied force until reaching f_s(max). Usually μ_s > μ_k."
        },
        {
            "title": "Forces on an Inclined Plane",
            "topic": "Forces & Dynamics",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "F_parallel = mg·sin θ   |   Normal Force N = mg·cos θ   |   Frictionless Accel: a = g·sin θ",
            "variables": "m = object mass, g = 9.8 m/s², θ = incline angle with horizontal, a = acceleration down incline",
            "tip": "With friction down the plane: a = g(sin θ - μ_k cos θ). The minimum angle for sliding to start satisfies tan θ_c = μ_s."
        },
        {
            "title": "Atwood Machine & Connected Pulleys",
            "topic": "Forces & Dynamics",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "a = [(m₁ - m₂) / (m₁ + m₂)] · g   |   Tension T = [2m₁m₂ / (m₁ + m₂)] · g",
            "variables": "m₁ > m₂ = hanging masses over an ideal frictionless, massless pulley, T = tension in light string",
            "tip": "Both hanging masses share the exact same magnitude of linear acceleration a and string tension T."
        },
        {
            "title": "Work-Energy Theorem & Kinetic Energy",
            "topic": "Work, Energy & Momentum",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "W_net = ΔK = ½mv² - ½mu²   |   Kinetic Energy K = ½mv² = p² / (2m)",
            "variables": "W_net = net work done by all forces (J), K = kinetic energy, u = initial speed, v = final speed, p = momentum",
            "tip": "If net work W_net is positive, the object speeds up. If W_net is negative, the object slows down."
        },
        {
            "title": "Gravitational & Elastic Potential Energy",
            "topic": "Work, Energy & Momentum",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Gravitational: U_g = mgh   |   Elastic Spring: U_s = ½kx²   |   Hooke's Law: F = -kx",
            "variables": "m = mass, g = 9.8 m/s², h = height above reference level, k = spring constant (N/m), x = spring extension/compression",
            "tip": "Conservation of mechanical energy (conservative forces only): E_total = K_initial + U_initial = K_final + U_final."
        },
        {
            "title": "Linear Momentum & Impulse-Momentum Theorem",
            "topic": "Work, Energy & Momentum",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "p = m·v   |   Impulse J = F_avg · Δt = Δp = m·v_final - m·u_initial",
            "variables": "p = linear momentum (kg·m/s), J = impulse (N·s), F_avg = average collision impact force, Δt = impact duration",
            "tip": "To decrease impact force on passengers in vehicle collisions, crumple zones and airbags increase collision duration Δt."
        },
        {
            "title": "Conservation of Momentum & Collisions",
            "topic": "Work, Energy & Momentum",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Conservation: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂   |   Restitution: e = (v₂ - v₁) / (u₁ - u₂)",
            "variables": "m₁, m₂ = colliding masses, u = velocities before impact, v = velocities after, e = coefficient of restitution",
            "tip": "Elastic collision (e = 1): both momentum AND kinetic energy are conserved. Perfectly inelastic (e = 0): objects stick together."
        },
        {
            "title": "Newton's Law of Universal Gravitation & Orbits",
            "topic": "Rotational & Gravitation",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "F = G·(m₁m₂)/r²   |   g = G·M/R²   |   Orbital Speed v = √(G·M/r)   |   Escape Speed v_esc = √(2G·M/R)",
            "variables": "G = 6.674×10⁻¹¹ N·m²/kg², M = central body mass, r = orbital distance, R = planetary radius",
            "tip": "Kepler's Third Law: T² / r³ = 4π² / (GM). The square of orbital period T is proportional to the cube of orbital radius r."
        },
        {
            "title": "Rotational Kinematics & Dynamics",
            "topic": "Rotational & Gravitation",
            "grades": [
                "Grade12"
            ],
            "displayMath": "ω = ω₀ + αt   |   θ = ω₀t + ½αt²   |   τ_net = I·α = dL/dt   |   Rotational KE = ½Iω²",
            "variables": "θ = angular displacement (rad), ω = angular velocity (rad/s), α = angular acceleration (rad/s²), I = moment of inertia",
            "tip": "Conservation of angular momentum: when net external torque Στ = 0, initial angular momentum equals final (I₁ω₁ = I₂ω₂)."
        },
        {
            "title": "Simple Harmonic Motion (Mass-Spring & Pendulum)",
            "topic": "Oscillations & Waves",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Spring Period: T = 2π√(m / k)   |   Simple Pendulum: T = 2π√(L / g)   |   Frequency f = 1 / T",
            "variables": "m = oscillating mass (kg), k = spring stiffness (N/m), L = pendulum string length (m), g = 9.8 m/s²",
            "tip": "The period of a simple pendulum depends only on length L and gravitational field g; mass has ZERO effect."
        },
        {
            "title": "Wave Mechanics & Sound Intensity Decibels",
            "topic": "Oscillations & Waves",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "v = f · λ   |   Intensity I = P / (4πr²)   |   Sound Level β = 10 · log₁₀(I / I₀)  (dB)",
            "variables": "v = wave propagation speed, f = frequency (Hz), λ = wavelength (m), I₀ = 10⁻¹² W/m² (auditory threshold)",
            "tip": "An increase of +10 dB represents a 10× increase in physical sound intensity. An increase of +20 dB is a 100× increase."
        },
        {
            "title": "Doppler Effect Formula for Sound",
            "topic": "Oscillations & Waves",
            "grades": [
                "Grade12"
            ],
            "displayMath": "f' = f · [(v ± v_o) / (v ∓ v_s)]",
            "variables": "f = emitted source frequency, f' = observed pitch, v = sound speed in air, v_o = observer velocity, v_s = source velocity",
            "tip": "Numerator uses (+) when observer approaches source. Denominator uses (-) when source approaches observer."
        },
        {
            "title": "Fluid Statics: Density, Pressure & Archimedes",
            "topic": "Thermal & Fluids",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "P = F/A   |   Hydrostatic: P = P₀ + ρgh   |   Buoyant Force F_b = ρ_fluid · V_displaced · g",
            "variables": "P = fluid pressure (Pa), ρ = fluid density (kg/m³), h = depth beneath surface, V_displaced = submerged volume",
            "tip": "An object floats in equilibrium when buoyant force equals its total weight: ρ_object / ρ_fluid = V_submerged / V_total."
        },
        {
            "title": "Fluid Dynamics: Continuity & Bernoulli's Equation",
            "topic": "Thermal & Fluids",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Continuity: A₁v₁ = A₂v₂   |   Bernoulli: P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂",
            "variables": "A = cross-sectional area, v = fluid speed, P = static pressure, ρ = fluid density, h = elevation",
            "tip": "Bernoulli principle: where flow speed v increases (narrow constriction), internal fluid static pressure P decreases."
        },
        {
            "title": "Heat Capacity, Latent Heat & Thermodynamics",
            "topic": "Thermal & Fluids",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Q = mcΔT   |   Q_phase = mL   |   First Law: ΔU = Q - W   |   Ideal Gas: PV = nRT",
            "variables": "Q = heat energy (J), c = specific heat capacity, L = latent heat of fusion/vaporization, W = work done by gas",
            "tip": "During a phase transition (melting, boiling), temperature stays perfectly constant while latent heat is absorbed."
        },
        {
            "title": "Coulomb's Law & Electric Field Intensity",
            "topic": "Electricity & Magnetism",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "F = k_e · |q₁q₂| / r²   |   E = F / q = k_e · |Q| / r²   (k_e ≈ 8.99×10⁹ N·m²/C²)",
            "variables": "F = electrostatic force (N), q = charge (C), r = distance of separation (m), E = electric field vector (N/C or V/m)",
            "tip": "Electric field lines point radially outward from positive charges and terminate radially inward on negative charges."
        },
        {
            "title": "Electric Potential & Capacitance",
            "topic": "Electricity & Magnetism",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "V = k_e Q / r   |   Capacitance C = Q/V = (ε₀A)/d   |   Stored Energy U = ½CV² = ½QV = Q²/(2C)",
            "variables": "V = electric potential (Volts), C = capacitance (Farads), A = plate area, d = plate separation, ε₀ = 8.854×10⁻¹² F/m",
            "tip": "Inserting a dielectric of constant κ increases capacitance by factor κ: C_new = κ·C₀."
        },
        {
            "title": "Ohm's Law, Resistance & DC Circuit Combinations",
            "topic": "Electricity & Magnetism",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "V = I·R   |   R = ρL/A   |   Series: R_eq = Σ Rᵢ   |   Parallel: 1/R_eq = Σ (1/Rᵢ)",
            "variables": "V = potential difference (V), I = current (A), R = electrical resistance (Ω), ρ = material resistivity, L = wire length",
            "tip": "In a series circuit, CURRENT is identical through all components. In a parallel circuit, VOLTAGE is identical across all branches."
        },
        {
            "title": "Magnetic Force on Moving Charges & Currents",
            "topic": "Electricity & Magnetism",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Charge: F = q(v × B) = qvB sin θ   |   Current-Carrying Wire: F = I(L × B) = ILB sin θ",
            "variables": "q = particle charge, v = velocity, B = magnetic flux density (Tesla), I = wire current, L = wire length vector",
            "tip": "Use the Right-Hand Rule: Thumb along v (or I), fingers along magnetic field B, palm points in direction of magnetic force F on positive charge."
        },
        {
            "title": "Faraday's Law of Induction & Transformers",
            "topic": "Electricity & Magnetism",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "EMF: ε = -N (ΔΦ_B / Δt)   |   Φ_B = B·A·cos θ   |   Transformer: V_s / V_p = N_s / N_p = I_p / I_s",
            "variables": "ε = induced electromotive force (V), N = number of coil turns, Φ_B = magnetic flux (Weber), p = primary, s = secondary",
            "tip": "Lenz's Law (minus sign): the induced current flows in such a direction that its magnetic field opposes the change in flux that created it."
        }
    ],
    "chem": [
        {
            "title": "Mole Concept, Molar Mass & Avogadro's Number",
            "topic": "Stoichiometry & Gases",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "n = m / M = N / N_A = V / V_m   |   N_A = 6.022 × 10²³ particles/mol",
            "variables": "n = number of moles, m = mass in grams, M = molar mass (g/mol), V_m = 22.4 L/mol at STP (0°C, 1 atm)",
            "tip": "At STP (Standard Temperature & Pressure: 0°C and 1 atm), exactly 1 mole of any ideal gas occupies 22.4 liters."
        },
        {
            "title": "Ideal Gas Law & Combined Gas Equation",
            "topic": "Stoichiometry & Gases",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "PV = nRT   |   (P₁V₁)/T₁ = (P₂V₂)/T₂   |   R = 0.0821 L·atm/(mol·K) = 8.314 J/(mol·K)",
            "variables": "P = pressure, V = volume, n = moles, T = absolute temperature in KELVIN (K = °C + 273.15)",
            "tip": "Always convert temperatures to absolute Kelvin before plugging into gas law calculations."
        },
        {
            "title": "Solution Concentration: Molarity & Dilution",
            "topic": "Solutions & Equilibrium",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Molarity M = n_solute / V_solution(L)   |   Dilution Equation: M₁V₁ = M₂V₂",
            "variables": "M = molarity (mol/L), n = moles of dissolved solute, V = volume of solution in liters",
            "tip": "During dilution, the total amount of solute moles remains strictly constant; only solvent volume increases."
        },
        {
            "title": "pH, pOH & Acid-Base Equilibrium",
            "topic": "Acids, Bases & Electrochemistry",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "pH = -log₁₀[H⁺]   |   pOH = -log₁₀[OH⁻]   |   pH + pOH = 14.0 (at 25°C)   |   K_w = [H⁺][OH⁻] = 1.0×10⁻¹⁴",
            "variables": "[H⁺] = hydronium ion molarity, [OH⁻] = hydroxide ion molarity, K_w = autoionization constant of pure water",
            "tip": "A neutral solution at 25°C has pH = 7.0 ([H⁺] = 10⁻⁷ M). Acidic: pH < 7. Basic/Alkaline: pH > 7."
        },
        {
            "title": "Standard Cell Potential & Nernst Equation",
            "topic": "Acids, Bases & Electrochemistry",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "E°_cell = E°_cathode - E°_anode   |   Nernst: E = E° - (0.0592 / n) · log₁₀(Q)  (at 298 K)",
            "variables": "E° = standard cell reduction potential (V), n = moles of transferred electrons, Q = reaction quotient",
            "tip": "A galvanic/voltaic cell is spontaneous when E°_cell > 0 V (corresponding to negative Gibbs free energy ΔG° < 0)."
        }
    ],
    "bio": [
        {
            "title": "Microscope Magnification & Actual Size",
            "topic": "Cell Biology & Physiology",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Total Magnification = Ocular Lens Mag × Objective Lens Mag   |   Actual Size = Image Size / Magnification",
            "variables": "Image Size = measured size on microscope field, Magnification = power ratio (e.g. 400×)",
            "tip": "Always ensure image size and actual size use matching units (convert mm to micrometers: 1 mm = 1,000 μm)."
        },
        {
            "title": "Surface Area to Volume Ratio (Cell Size Limit)",
            "topic": "Cell Biology & Physiology",
            "grades": [
                "Grade9",
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "SA/V = Surface Area / Volume   |   Spherical Cell: SA/V = (4πr²) / (4/3 πr³) = 3 / r",
            "variables": "r = radius of cell, SA = outer membrane area, V = cytoplasmic volume",
            "tip": "As a cell grows larger in radius, its SA/V ratio decreases sharply, limiting efficient diffusion and nutrient transport."
        },
        {
            "title": "Hardy-Weinberg Principle of Population Genetics",
            "topic": "Genetics & Evolution",
            "grades": [
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Allele Frequencies: p + q = 1   |   Genotype Frequencies: p² + 2pq + q² = 1",
            "variables": "p = frequency of dominant allele A, q = frequency of recessive allele a, p² = AA, 2pq = Aa, q² = aa",
            "tip": "Always determine q² first by dividing the count of homozygous recessive individuals by total population."
        },
        {
            "title": "Cardiac Output & Stroke Volume",
            "topic": "Human Systems & Physiology",
            "grades": [
                "Grade10",
                "Grade11",
                "Grade12"
            ],
            "displayMath": "Cardiac Output (CO) = Heart Rate (HR) × Stroke Volume (SV)",
            "variables": "CO = volume of blood pumped per minute (mL/min or L/min), HR = beats per minute (bpm), SV = volume ejected per ventricular beat (mL)",
            "tip": "During vigorous exercise, both heart rate and stroke volume rise to drastically increase overall cardiac output."
        }
    ]
};

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

        <section class="hero" style="margin-bottom: 18px;">
            <p class="label">Academic Reference Guide</p>
            <h1>Formula <span>Sheets</span></h1>
            <p class="description">
                Choose your grade to explore curated formulas, standard physical constants, and verified examination summaries.
            </p>
        </section>

        <!-- Mode-Based Selector Tabs: Option 2 -->
        ${renderHomeModeTabs('formulas')}

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
            code: 'MATH',
            desc: gradeId === 'Grade12'
                ? 'Calculus (Derivatives & Integrals), Trigonometry, Sequences, Vectors & Probability'
                : (gradeId === 'Grade11'
                    ? 'Advanced Algebra, Sequences & Series, Circular Trigonometry & Vectors'
                    : 'Algebra, Quadratics, Coordinate Geometry, Exponents & Statistics')
        },
        {
            id: 'physics',
            name: 'Physics',
            code: 'PHYS',
            desc: gradeId === 'Grade12'
                ? 'Universal Constants, Rotational Dynamics, Oscillations, Optics, Electromagnetism & Modern Physics'
                : (gradeId === 'Grade11'
                    ? '2D Projectiles, Dynamics, Work-Energy, Fluid Mechanics, Thermodynamics & Electrostatics'
                    : 'Kinematics, Newton\'s Laws, Fluid Pressure, Heat Energy, Circuits & Light')
        },
        {
            id: 'chem',
            name: 'Chemistry',
            code: 'CHEM',
            desc: gradeId === 'Grade12'
                ? 'Solutions & Colligative Properties, Acid-Base Equilibria, Electrochemistry & Rate Laws'
                : (gradeId === 'Grade11'
                    ? 'Atomic Spectra, Gas Laws, Solutions, Thermochemistry, Hess\'s Law & Equilibrium'
                    : 'The Mole Concept, Stoichiometry, Chemical Reactions, Solutions & Gas Behavior')
        },
        {
            id: 'bio',
            name: 'Biology',
            code: 'BIOL',
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
                    <div class="card-number" style="font-size: 13px; font-weight: 700; color: var(--primary); letter-spacing: 0.5px;">${s.code}</div>
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

function showFormulaSheet(gradeId, subjectId = 'math', searchQuery = '', activeTopic = 'all', pushHistory = true) {
    if (pushHistory) {
        pushNavState({ view: 'formulaSheet', gradeId, subjectId, search: searchQuery, activeTopic }, `${gradeId} ${subjectId} Formula Sheet`);
    }

    window._currentFormulaGrade = gradeId;
    window._currentFormulaSubject = subjectId;
    window._currentFormulaTopic = activeTopic;

    const subjectLabels = {
        math: 'Mathematics',
        physics: 'Physics',
        chem: 'Chemistry',
        bio: 'Biology'
    };
    const subjectName = subjectLabels[subjectId] || 'Mathematics';
    const gradeNum = gradeId.replace('Grade', '');

    const items = FORMULA_DATA[subjectId] || FORMULA_DATA.math;
    const q = (searchQuery || '').toLowerCase().trim();

    // Collect all unique topics/classes for this grade & subject
    const gradeItems = items.filter(f => f.grades.includes(gradeId));
    const allTopics = ['all', ...new Set(gradeItems.map(f => f.topic))];

    // Filter items specifically by this grade, topic, and search query
    const filtered = gradeItems.filter(f => {
        if (activeTopic !== 'all' && f.topic !== activeTopic) return false;
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

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 18px;">
            <div>
                <h2 style="font-size: 26px; color: #ffffff; margin-bottom: 4px; font-weight: 750;">Grade ${gradeNum} ${subjectName} Formulas</h2>
                <p style="color: var(--text-muted); font-size: 14px; margin: 0;">
                    Verified syllabus formulas, symbol definitions, and exam notes categorized by major unit for Grade ${gradeNum}.
                </p>
            </div>
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <button class="formula-tab-btn ${subjectId === 'math' ? 'active' : ''}" onclick="showFormulaSheet('${gradeId}', 'math', '', 'all')">
                    ${uiIcon('calculator', 14)} Math
                </button>
                <button class="formula-tab-btn ${subjectId === 'physics' ? 'active' : ''}" onclick="showFormulaSheet('${gradeId}', 'physics', '', 'all')">
                    ${uiIcon('bolt', 14)} Physics
                </button>
                <button class="formula-tab-btn ${subjectId === 'chem' ? 'active' : ''}" onclick="showFormulaSheet('${gradeId}', 'chem', '', 'all')">
                    ${uiIcon('fileText', 14)} Chemistry
                </button>
                <button class="formula-tab-btn ${subjectId === 'bio' ? 'active' : ''}" onclick="showFormulaSheet('${gradeId}', 'bio', '', 'all')">
                    ${uiIcon('dna', 14)} Biology
                </button>
                <button class="btn-secondary" style="padding: 7px 14px; font-size: 13px; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;" onclick="printFormulaSheet()" title="Print or save sheet as PDF">
                    ${uiIcon('printer', 14)} Print Sheet
                </button>
            </div>
        </div>

        <!-- Topic Classes / Category Pills (Vectors, Motion, Forces, etc.) -->
        <div class="formula-topic-pills-bar">
            ${allTopics.map(t => {
                const count = t === 'all' ? gradeItems.length : gradeItems.filter(f => f.topic === t).length;
                const label = t === 'all' ? 'All Formulas' : t;
                const isActive = activeTopic === t;
                return `
                    <button class="formula-topic-pill ${isActive ? 'active' : ''}" 
                            onclick="showFormulaSheet('${gradeId}', '${subjectId}', '${escapeQuotes(searchQuery)}', '${escapeQuotes(t)}', false)">
                        ${label} (${count})
                    </button>
                `;
            }).join('')}
        </div>

        <!-- Search Bar with Dark Theme Styling -->
        <div style="margin-bottom: 22px;">
            <div class="formula-search-wrapper">
                <span class="search-icon" aria-hidden="true" style="top: 50%; left: 16px; transform: translateY(-50%);"></span>
                <input type="text" class="formula-search-input" 
                       placeholder="Search inside Grade ${gradeNum} ${subjectName} (e.g. formula, variables, motion, vector)..." 
                       value="${escapeQuotes(searchQuery)}"
                       oninput="debounceFormulaSearch('${gradeId}', '${subjectId}', this.value, '${escapeQuotes(activeTopic)}')">
            </div>
        </div>

        <!-- Formula Cards Grid -->
        ${filtered.length === 0 ? `
            <div style="text-align: center; padding: 48px 20px; background: var(--surface-glass); border: 1px dashed var(--border-glass); border-radius: 14px;">
                <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(99, 102, 241, 0.12); display: inline-flex; align-items: center; justify-content: center; color: #818cf8; margin-bottom: 12px;">
                    ${uiIcon('search', 22)}
                </div>
                <h4 style="font-size: 17px; color: #ffffff; margin-bottom: 6px;">No formulas found matching "${escapeQuotes(searchQuery)}"</h4>
                <p style="color: var(--text-muted); font-size: 13.5px; margin-bottom: 14px;">Try selecting a different topic pill or clear your search query.</p>
                <button class="btn-secondary" onclick="showFormulaSheet('${gradeId}', '${subjectId}', '', 'all')">Reset Topic & Search</button>
            </div>
        ` : `
            <div class="formula-grid">
                ${filtered.map(f => `
                    <div class="formula-card">
                        <div>
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
                                <span class="badge badge-purple" style="cursor: pointer;" onclick="showFormulaSheet('${gradeId}', '${subjectId}', '', '${escapeQuotes(f.topic)}', false)" title="Click to view only ${f.topic} formulas">
                                    ${f.topic}
                                </span>
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
                            <button class="btn-secondary" style="font-size: 12px; padding: 6px 14px; display: inline-flex; align-items: center; gap: 6px;" onclick="copyFormulaText('${escapeQuotes(f.displayMath)}', this)">
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
function debounceFormulaSearch(gradeId, subjectId, query, activeTopic = 'all') {
    if (formulaSearchTimeout) clearTimeout(formulaSearchTimeout);
    formulaSearchTimeout = setTimeout(() => {
        showFormulaSheet(gradeId, subjectId, query, activeTopic, false);
    }, 220);
}

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

/* ========================================================
   FOCUS STUDY DESK / ALL-IN-ONE STUDY ROOM SYSTEM
======================================================== */

const deskState = {
    grade: 'Grade 12',
    subject: 'Mathematics',
    selectedUnitIndex: 0,
    activeNoteSection: 'overview', // 'overview', 'formulas', 'example', 'pitfalls', 'community'
    topicNoteFilter: 'all', // 'all', 'shortcut', 'mnemonic', 'top', 'mine'
    topicNoteComposerOpen: false,
    topicNotePrefill: '',
    paperIndex: 0,
    availablePapers: [],
    leftTab: 'unitNotes', // 'unitNotes' (default), 'pdf', 'formulas', 'tips'
    rightTab: 'ai', // 'ai', 'practice', 'notes'
    // Pomodoro
    pomodoroMinutes: 25,
    pomodoroSeconds: 0,
    pomodoroRunning: false,
    pomodoroTimer: null,
    pomodoroMode: 'study', // 'study' (25m) or 'break' (5m)
    // Practice Questions
    questions: [],
    currentQIndex: 0,
    selectedOption: null,
    isChecked: false,
    score: 0
};

function playDeskChime(type = 'success') {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        if (type === 'fanfare') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, ctx.currentTime);
            osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15);
            osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3);
            osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.45);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
            osc.start();
            osc.stop(ctx.currentTime + 0.85);
        } else if (type === 'correct') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, ctx.currentTime);
            osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.12);
            gain.gain.setValueAtTime(0.25, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            osc.start();
            osc.stop(ctx.currentTime + 0.42);
        }
    } catch(e) {}
}

function toggleDeskTimer() {
    if (deskState.pomodoroRunning) {
        clearInterval(deskState.pomodoroTimer);
        deskState.pomodoroRunning = false;
        updateDeskTimerUI();
    } else {
        deskState.pomodoroRunning = true;
        updateDeskTimerUI();
        deskState.pomodoroTimer = setInterval(() => {
            if (deskState.pomodoroSeconds > 0) {
                deskState.pomodoroSeconds--;
            } else if (deskState.pomodoroMinutes > 0) {
                deskState.pomodoroMinutes--;
                deskState.pomodoroSeconds = 59;
            } else {
                clearInterval(deskState.pomodoroTimer);
                deskState.pomodoroRunning = false;
                playDeskChime('fanfare');
                
                if (deskState.pomodoroMode === 'study') {
                    recordStudyStreakActivity();
                    showToast('🎉 25-minute focus sprint completed! Streak boosted and 50 XP awarded!', 'success');
                    if (typeof showSessionEndStreakCelebration === 'function') {
                        showSessionEndStreakCelebration();
                    }
                    deskState.pomodoroMode = 'break';
                    deskState.pomodoroMinutes = 5;
                    deskState.pomodoroSeconds = 0;
                } else {
                    showToast('☕ Break time over! Ready for another 25-minute focus session?', 'info');
                    deskState.pomodoroMode = 'study';
                    deskState.pomodoroMinutes = 25;
                    deskState.pomodoroSeconds = 0;
                }
            }
            updateDeskTimerUI();
        }, 1000);
    }
}

function switchDeskTimerMode() {
    if (deskState.pomodoroTimer) clearInterval(deskState.pomodoroTimer);
    deskState.pomodoroRunning = false;
    if (deskState.pomodoroMode === 'study') {
        deskState.pomodoroMode = 'break';
        deskState.pomodoroMinutes = 5;
        deskState.pomodoroSeconds = 0;
        showToast('☕ Switched to 5-minute break mode.', 'info');
    } else {
        deskState.pomodoroMode = 'study';
        deskState.pomodoroMinutes = 25;
        deskState.pomodoroSeconds = 0;
        showToast('🎯 Switched to default 25-minute focus sprint.', 'info');
    }
    updateDeskTimerUI();
}

function resetDeskTimer(minutes = 25) {
    if (deskState.pomodoroTimer) clearInterval(deskState.pomodoroTimer);
    deskState.pomodoroRunning = false;
    deskState.pomodoroMode = (minutes === 5) ? 'break' : 'study';
    deskState.pomodoroMinutes = minutes;
    deskState.pomodoroSeconds = 0;
    updateDeskTimerUI();
    showToast(`⏱️ Timer reset to default ${minutes} minutes.`, 'info');
}

function updateDeskTimerUI() {
    const el = document.getElementById('desk-timer-clock');
    const btn = document.getElementById('desk-timer-toggle');
    const modeBtn = document.getElementById('desk-timer-mode-btn');
    const modeLabel = document.getElementById('desk-timer-mode-label');
    const pill = document.getElementById('desk-pomodoro-pill');

    const m = String(deskState.pomodoroMinutes).padStart(2, '0');
    const s = String(deskState.pomodoroSeconds).padStart(2, '0');

    if (el) {
        el.textContent = `${m}:${s}`;
    }
    if (modeLabel) {
        modeLabel.textContent = deskState.pomodoroMode === 'study' ? '25 MIN FOCUS' : '5 MIN BREAK';
    }
    if (pill) {
        pill.classList.toggle('running', deskState.pomodoroRunning);
    }
    if (btn) {
        btn.textContent = deskState.pomodoroRunning ? 'PAUSE' : 'START';
        btn.classList.toggle('running', deskState.pomodoroRunning);
    }
    if (modeBtn) {
        modeBtn.textContent = deskState.pomodoroMode === 'study' ? '5m Break' : '25m Focus';
    }

    // Dynamic browser tab title so students see the countdown minutes while multitasking
    if (deskState.pomodoroRunning) {
        document.title = `(${m}:${s} min) 🎯 Focus Study Room`;
    } else if (state && state.currentView === 'studydesk') {
        document.title = `(${m}:00 min) 🎯 Focus Study Room`;
    }
}

function setDeskLeftTab(tab) {
    deskState.leftTab = tab;
    document.querySelectorAll('.desk-left-tab').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === tab);
    });
    const body = document.getElementById('desk-left-body');
    if (!body) return;
    
    if (tab === 'unitNotes' || tab === 'notes') {
        renderDeskUnitNotesView(body);
    } else if (tab === 'pdf') {
        renderDeskPdfView(body);
    } else if (tab === 'formulas') {
        renderDeskFormulasView(body);
    } else if (tab === 'tips') {
        renderDeskTipsView(body);
    }
}

function setDeskRightTab(tab) {
    deskState.rightTab = tab;
    document.querySelectorAll('.desk-right-tab').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === tab);
    });
    const body = document.getElementById('desk-right-body');
    if (!body) return;
    
    if (tab === 'ai') {
        renderDeskAiWrapper(body);
    } else if (tab === 'practice') {
        renderDeskPracticeWrapper(body);
        loadDeskPracticeQuestions();
    } else if (tab === 'notes') {
        renderDeskNotesWrapper(body);
        loadDeskNotes();
    }
}

async function showStudyDesk(initialGrade = null, initialSubject = null, pushHistory = true) {
    if (pushHistory) {
        pushNavState({ view: 'studydesk', grade: initialGrade, subject: initialSubject }, 'Focus Study Room');
    }
    state.currentView = 'studydesk';
    renderHeader();

    if (initialGrade) deskState.grade = initialGrade;
    if (initialSubject) deskState.subject = initialSubject;

    const grades = (state.categories && state.categories.grades) ? state.categories.grades.map(g => g.id) : ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
    const subjects = (state.categories && state.categories.subjects && state.categories.subjects[deskState.grade]) || ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
    
    if (!subjects.includes(deskState.subject)) {
        deskState.subject = subjects[0] || 'Mathematics';
    }

    const streak = getStudyStreakData();

    // Default to 25 minutes focus sprint if timer is not actively running
    if (!deskState.pomodoroRunning) {
        deskState.pomodoroMode = 'study';
        deskState.pomodoroMinutes = 25;
        deskState.pomodoroSeconds = 0;
    }

    const initialM = String(deskState.pomodoroMinutes).padStart(2, '0');
    const initialS = String(deskState.pomodoroSeconds).padStart(2, '0');
    const modeLabel = deskState.pomodoroMode === 'study' ? '25 MIN FOCUS' : '5 MIN BREAK';

    app.innerHTML = `
        <div class="study-desk-wrapper">
            <!-- Top Controls Bar -->
            <div class="desk-topbar">
                <div class="desk-controls-group">
                    <button class="back-button" onclick="showLibraryHome()" style="margin: 0; padding: 7px 14px; font-size: 13px;">
                        ${uiIcon('home', 14)} Exit to Library
                    </button>
                    
                    <select class="desk-select" id="desk-grade-select" onchange="onDeskGradeChange(this.value)">
                        ${grades.map(g => `<option value="${g}" ${g === deskState.grade ? 'selected' : ''}>${g}</option>`).join('')}
                    </select>

                    <select class="desk-select" id="desk-subject-select" onchange="onDeskSubjectChange(this.value)">
                        ${subjects.map(s => `<option value="${s}" ${s === deskState.subject ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                </div>

                <div class="desk-controls-group">
                    <!-- Duolingo Style Pomodoro Timer (25 Min Default) -->
                    <div class="desk-pomodoro-pill ${deskState.pomodoroRunning ? 'running' : ''}" id="desk-pomodoro-pill" title="Default 25-Minute Focus Sprint">
                        <span style="font-size: 18px;" class="desk-timer-icon">⏱️</span>
                        <div class="desk-timer-info">
                            <span class="desk-timer-mode-tag" id="desk-timer-mode-label">${modeLabel}</span>
                            <span class="desk-timer-display">
                                <span id="desk-timer-clock">${initialM}:${initialS}</span>
                                <span class="desk-timer-unit">min</span>
                            </span>
                        </div>
                        <button id="desk-timer-toggle" class="desk-timer-toggle-btn ${deskState.pomodoroRunning ? 'running' : ''}" onclick="toggleDeskTimer()" title="Start or Pause 25-min study countdown">${deskState.pomodoroRunning ? 'PAUSE' : 'START'}</button>
                        <button id="desk-timer-mode-btn" class="desk-tool-btn" style="padding: 4px 9px; font-size: 11px;" onclick="switchDeskTimerMode()" title="Toggle between 25 Min Focus and 5 Min Break">${deskState.pomodoroMode === 'study' ? '5m Break' : '25m Focus'}</button>
                        <button type="button" class="desk-timer-reset-btn" onclick="resetDeskTimer(25)" title="Reset back to default 25 minutes">↺ 25m</button>
                    </div>

                    <!-- Streak Flame Pill -->
                    <button type="button" class="hero-growth-pill hero-streak-pill" style="margin: 0; padding: 6px 14px;" onclick="openStreakModal()">
                        <span class="streak-flame">🔥</span>
                        <span class="pill-title">${streak.count}d</span>
                    </button>
                </div>
            </div>

            <!-- Split-Screen Workspace (Responsive CSS-Grid) -->
            <div class="desk-workspace">
                <!-- Left Panel: Unit Notes / Exam Paper / Formulas / Tips -->
                <div class="desk-panel" id="desk-left-panel">
                    <div class="desk-panel-header">
                        <div class="desk-panel-tabs">
                            <button class="desk-tab-btn desk-left-tab active" data-tab="unitNotes" onclick="setDeskLeftTab('unitNotes')">
                                📖 Unit Notes
                            </button>
                            <button class="desk-tab-btn desk-left-tab" data-tab="pdf" onclick="setDeskLeftTab('pdf')">
                                ${uiIcon('fileText', 14)} Exam Paper
                            </button>
                            <button class="desk-tab-btn desk-left-tab" data-tab="formulas" onclick="setDeskLeftTab('formulas')">
                                ${uiIcon('calculator', 14)} Formulas
                            </button>
                            <button class="desk-tab-btn desk-left-tab" data-tab="tips" onclick="setDeskLeftTab('tips')">
                                ${uiIcon('book', 14)} Blueprint
                            </button>
                        </div>
                        <div id="desk-left-actions" style="display: flex; gap: 8px;"></div>
                    </div>
                    <div class="desk-panel-body" id="desk-left-body">
                        <!-- Loaded dynamically -->
                    </div>
                </div>

                <!-- Right Panel: AI Study Coach / Practice Quiz / Notes -->
                <div class="desk-panel" id="desk-right-panel">
                    <div class="desk-panel-header">
                        <div class="desk-panel-tabs">
                            <button class="desk-tab-btn desk-right-tab active" data-tab="ai" onclick="setDeskRightTab('ai')">
                                🤖 AI Study Coach
                            </button>
                            <button class="desk-tab-btn desk-right-tab" data-tab="practice" onclick="setDeskRightTab('practice')">
                                ${uiIcon('target', 14)} Practice Quiz
                            </button>
                            <button class="desk-tab-btn desk-right-tab" data-tab="notes" onclick="setDeskRightTab('notes')">
                                📝 Notes
                            </button>
                        </div>
                        <div id="desk-right-actions" style="display: flex; gap: 8px;"></div>
                    </div>
                    <div class="desk-panel-body" id="desk-right-body">
                        <!-- Loaded dynamically -->
                    </div>
                </div>
            </div>
        </div>
    `;

    setDeskLeftTab(deskState.leftTab || 'unitNotes');
    setDeskRightTab(deskState.rightTab || 'ai');
    updateDeskTimerUI();
}

function onDeskGradeChange(newGrade) {
    deskState.grade = newGrade;
    deskState.selectedUnitIndex = 0;
    const subjects = (state.categories && state.categories.subjects && state.categories.subjects[newGrade]) || ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
    const subjSelect = document.getElementById('desk-subject-select');
    if (subjSelect) {
        subjSelect.innerHTML = subjects.map(s => `<option value="${s}">${s}</option>`).join('');
    }
    deskState.subject = subjects[0] || 'Mathematics';
    setDeskLeftTab(deskState.leftTab);
    setDeskRightTab(deskState.rightTab);
}

function onDeskSubjectChange(newSubj) {
    deskState.subject = newSubj;
    deskState.selectedUnitIndex = 0;
    setDeskLeftTab(deskState.leftTab);
    setDeskRightTab(deskState.rightTab);
}

/* ========================================================
   LEFT PANEL RENDERERS: UNIT NOTES, PDF, FORMULAS, BLUEPRINT
======================================================== */

const EXAM_UNIT_NOTES = {
    // Mathematics
    'Grade 12_Mathematics': [
        {
            title: 'Unit 1: Sequences and Series',
            examWeight: '15-20% of National Exam',
            readTime: '6 min read',
            overview: `
                A sequence is an ordered list of numbers. In Ethiopian national examinations, arithmetic and geometric progressions account for multiple questions annually.<br><br>
                • <strong>Arithmetic Progression (AP):</strong> The difference between consecutive terms is constant: <code>d = a_{n} - a_{n-1}</code>.<br>
                • <strong>Geometric Progression (GP):</strong> The ratio between consecutive terms is constant: <code>r = a_{n} / a_{n-1}</code>.<br>
                • <strong>Convergence of Infinite Series:</strong> An infinite geometric series converges if and only if <code>|r| < 1</code>. If <code>|r| ≥ 1</code>, the series diverges to infinity.
            `,
            keyFormulas: [
                { name: 'AP n-th Term', formula: 'a_n = a_1 + (n - 1)d', notes: 'd = common difference, a_1 = first term' },
                { name: 'AP Sum of n Terms', formula: 'S_n = (n / 2)[2a_1 + (n - 1)d] = (n / 2)(a_1 + a_n)', notes: 'Use 2nd form when last term is given' },
                { name: 'GP n-th Term', formula: 'a_n = a_1 * r^(n - 1)', notes: 'r = common ratio' },
                { name: 'GP Sum of n Terms', formula: 'S_n = a_1(1 - r^n) / (1 - r),  r ≠ 1', notes: 'For finite geometric series' },
                { name: 'Infinite GP Sum (Convergent)', formula: 'S_∞ = a_1 / (1 - r),  for |r| < 1', notes: 'Guaranteed exam trap if |r| ≥ 1 (no sum exists!)' }
            ],
            workedExample: {
                question: 'National Exam Sample: The 3rd term of an AP is 8 and the 9th term is 26. Find the sum of the first 15 terms.',
                steps: [
                    'Write system of equations: a_3 = a_1 + 2d = 8  and  a_9 = a_1 + 8d = 26.',
                    'Subtract eq (1) from eq (2): 6d = 18  ⟹  d = 3.',
                    'Substitute d = 3 into eq (1): a_1 + 2(3) = 8  ⟹  a_1 = 2.',
                    'Calculate S_15: S_15 = (15 / 2)[2(2) + (15 - 1)(3)] = (15 / 2)[4 + 42] = (15 / 2)(46) = 15 * 23 = 345.'
                ],
                answer: 'S_15 = 345'
            },
            pitfalls: 'Common Trap: Watch out for negative common ratios like r = -1/2. When finding sum of infinite series, r must satisfy -1 < r < 1. If r = -2, do not apply S_∞; the answer is "Divergent".'
        },
        {
            title: 'Unit 2: Limits and Continuity',
            examWeight: '12-16% of National Exam',
            readTime: '7 min read',
            overview: `
                Calculus begins with limits. A function <code>f(x)</code> has a limit <code>L</code> as <code>x → c</code> if both one-sided limits exist and are equal: <code>lim_{x→c⁻} f(x) = lim_{x→c⁺} f(x) = L</code>.<br><br>
                • <strong>Indeterminate Form 0/0:</strong> Whenever direct substitution yields 0/0, factorize the numerator and denominator, rationalize radicals using conjugate multiplication, or use algebraic identities.<br>
                • <strong>Continuity at a Point:</strong> A function f is continuous at x = c if: (1) f(c) is defined, (2) lim_{x→c} f(x) exists, and (3) lim_{x→c} f(x) = f(c).
            `,
            keyFormulas: [
                { name: 'Fundamental Trig Limit', formula: 'lim_{x→0} [sin(ax) / (bx)] = a / b', notes: 'Angles must be in radians' },
                { name: 'Limit at Infinity (Rational)', formula: 'lim_{x→∞} [P(x) / Q(x)] = ratio of leading coefficients if deg(P) = deg(Q)', notes: '= 0 if deg(P) < deg(Q); = ±∞ if deg(P) > deg(Q)' },
                { name: 'Intermediate Value Theorem', formula: 'If f is continuous on [a, b] and k is between f(a) and f(b), there exists c ∈ (a, b) such that f(c) = k', notes: 'Essential for proving polynomial root existence' }
            ],
            workedExample: {
                question: 'Evaluate the limit: lim_{x→3} (x² - 9) / (√(x + 1) - 2).',
                steps: [
                    'Direct substitution gives (3² - 9) / (√(4) - 2) = 0 / 0 (Indeterminate form).',
                    'Multiply numerator and denominator by conjugate (√(x + 1) + 2): [(x - 3)(x + 3)(√(x + 1) + 2)] / [(x + 1) - 4].',
                    'Denominator simplifies to (x - 3). Cancel (x - 3) from numerator and denominator.',
                    'Remaining expression: (x + 3)(√(x + 1) + 2). Substitute x = 3: (3 + 3)(√(4) + 2) = (6)(2 + 2) = 6 * 4 = 24.'
                ],
                answer: '24'
            },
            pitfalls: 'Never conclude a limit is 0 just because the numerator is 0! Always check the denominator first. If both are 0, simplify before evaluating.'
        },
        {
            title: 'Unit 3: Derivatives and Applications',
            examWeight: '20-25% of National Exam',
            readTime: '8 min read',
            overview: `
                The derivative represents the instantaneous rate of change and slope of the tangent line: <code>f\'(x) = lim_{h→0} [f(x+h) - f(x)] / h</code>.<br><br>
                • <strong>Critical Numbers:</strong> Values of x in the domain where <code>f\'(x) = 0</code> or <code>f\'(x)</code> is undefined.<br>
                • <strong>First Derivative Test:</strong> If f\'(x) changes from positive to negative at c, f has a local maximum at c. If from negative to positive, a local minimum.<br>
                • <strong>Second Derivative Test:</strong> If f\'(c) = 0 and f\'\'(c) < 0, concave down (local max). If f\'\'(c) > 0, concave up (local min).
            `,
            keyFormulas: [
                { name: 'Product Rule', formula: '(u * v)\' = u\'v + uv\'', notes: 'Never do (u * v)\' = u\' * v\' (Common mistake!)' },
                { name: 'Quotient Rule', formula: '(u / v)\' = (u\'v - uv\') / v²', notes: 'Low d-high minus high d-low over low-squared' },
                { name: 'Chain Rule', formula: '[f(g(x))]\' = f\'(g(x)) * g\'(x)', notes: 'Differentiate outside, keep inside, multiply by derivative of inside' },
                { name: 'Equation of Tangent Line', formula: 'y - y_1 = f\'(x_1)(x - x_1)', notes: 'Slope m = f\'(x_1)' }
            ],
            workedExample: {
                question: 'Find the maximum value of f(x) = 2x³ - 9x² + 12x on the interval [0, 3].',
                steps: [
                    'Find derivative: f\'(x) = 6x² - 18x + 12.',
                    'Set f\'(x) = 0: 6(x² - 3x + 2) = 0  ⟹  6(x - 1)(x - 2) = 0  ⟹  Critical points: x = 1, x = 2.',
                    'Evaluate f(x) at critical points and endpoints: f(0) = 0, f(1) = 2 - 9 + 12 = 5, f(2) = 16 - 36 + 24 = 4, f(3) = 54 - 81 + 36 = 9.',
                    'Compare values: The maximum value on [0, 3] is 9 (at x = 3).'
                ],
                answer: 'Max value = 9'
            },
            pitfalls: 'On closed interval optimization [a, b], always test the endpoints a and b! The absolute maximum often occurs at the boundary, not just at critical points.'
        },
        {
            title: 'Unit 4: Integrals and Area',
            examWeight: '15-20% of National Exam',
            readTime: '7 min read',
            overview: `
                Integration is the inverse operation of differentiation (antiderivative) and geometrically calculates the net signed area under a curve.<br><br>
                • <strong>Fundamental Theorem of Calculus:</strong> If F\'(x) = f(x), then <code>∫_a^b f(x) dx = F(b) - F(a)</code>.<br>
                • <strong>Area Between Two Curves:</strong> If f(x) ≥ g(x) on [a, b], the area is <code>A = ∫_a^b [f(x) - g(x)] dx</code>.<br>
                • <strong>Integration by Substitution (U-Sub):</strong> Used when an integrand contains a function and its derivative: <code>∫ f(g(x))g\'(x) dx = ∫ f(u) du</code> where u = g(x).
            `,
            keyFormulas: [
                { name: 'Power Rule for Integrals', formula: '∫ x^n dx = [x^(n+1) / (n + 1)] + C,  n ≠ -1', notes: 'Don\'t forget the constant of integration +C for indefinite integrals' },
                { name: 'Reciprocal Integral', formula: '∫ (1 / x) dx = ln|x| + C', notes: 'Notice the absolute value bars' },
                { name: 'Exponential Integral', formula: '∫ e^(kx) dx = (1 / k)e^(kx) + C', notes: 'Divide by the coefficient k' }
            ],
            workedExample: {
                question: 'Calculate the area bounded by the curve y = 4 - x² and the x-axis (y = 0).',
                steps: [
                    'Find intersection points: 4 - x² = 0  ⟹  x² = 4  ⟹  x = -2 and x = 2.',
                    'Set up integral: Area = ∫_{-2}^2 (4 - x²) dx.',
                    'Find antiderivative: F(x) = 4x - (x³ / 3).',
                    'Evaluate: F(2) - F(-2) = [4(2) - (8/3)] - [4(-2) - (-8/3)] = [8 - 8/3] - [-8 + 8/3] = (16/3) - (-16/3) = 32/3.'
                ],
                answer: 'Area = 32/3 square units'
            },
            pitfalls: 'When calculating geometric area, area can NEVER be negative! If the curve dips below the x-axis, integrate the negative section separately or take absolute value.'
        },
        {
            title: 'Unit 5: 3D Vectors and Matrices',
            examWeight: '10-15% of National Exam',
            readTime: '6 min read',
            overview: `
                Vectors in 3-dimensional space have magnitude and direction: <code>v = a i + b j + c k</code> with magnitude <code>|v| = √(a² + b² + c²)</code>.<br><br>
                • <strong>Dot Product:</strong> Yields a scalar: <code>u · v = u_1 v_1 + u_2 v_2 + u_3 v_3 = |u||v|cos θ</code>. Two vectors are perpendicular if and only if <code>u · v = 0</code>.<br>
                • <strong>Cross Product:</strong> Yields a vector perpendicular to both u and v: <code>|u × v| = |u||v|sin θ</code>. The magnitude |u × v| equals the area of the parallelogram formed by u and v.
            `,
            keyFormulas: [
                { name: 'Dot Product Orthogonality', formula: 'u · v = 0  ⟺  u ⊥ v', notes: 'Easiest test for perpendicular vectors' },
                { name: 'Cross Product Area', formula: 'Area of Triangle = (1 / 2)|u × v|', notes: 'Half of the parallelogram area' },
                { name: 'Determinant (2x2)', formula: 'det [a b; c d] = ad - bc', notes: 'Matrix is invertible if and only if det ≠ 0' }
            ],
            workedExample: {
                question: 'Find the value of k such that vector u = (2, -3, 1) and vector v = (k, 4, 6) are perpendicular.',
                steps: [
                    'For perpendicular vectors, the dot product must equal zero: u · v = 0.',
                    'Calculate dot product: (2)(k) + (-3)(4) + (1)(6) = 0.',
                    'Simplify: 2k - 12 + 6 = 0  ⟹  2k - 6 = 0.',
                    'Solve for k: 2k = 6  ⟹  k = 3.'
                ],
                answer: 'k = 3'
            },
            pitfalls: 'Dot product produces a SCALAR number, whereas cross product produces a VECTOR! Never confuse u · v with u × v.'
        }
    ],

    // Physics
    'Grade 12_Physics': [
        {
            title: 'Unit 1: Thermodynamics & Heat Engines',
            examWeight: '18-22% of National Exam',
            readTime: '7 min read',
            overview: `
                Thermodynamics governs heat, work, and internal energy conversion in physical systems.<br><br>
                • <strong>First Law of Thermodynamics:</strong> Conservation of energy: <code>ΔU = Q - W</code>, where Q is heat added to system, W is work done BY system, and ΔU is change in internal energy.<br>
                • <strong>Thermodynamic Processes:</strong><br>
                  - Isobaric (constant P): W = PΔV<br>
                  - Isochoric (constant V): ΔV = 0 ⟹ W = 0 ⟹ ΔU = Q<br>
                  - Isothermal (constant T): ΔT = 0 ⟹ ΔU = 0 ⟹ Q = W<br>
                  - Adiabatic (no heat transfer): Q = 0 ⟹ ΔU = -W<br>
                • <strong>Second Law & Carnot Engine:</strong> No heat engine operating between two temperatures can be more efficient than a Carnot engine: <code>η_max = 1 - (T_C / T_H)</code> (temperatures MUST be in Kelvin!).
            `,
            keyFormulas: [
                { name: 'First Law of Thermodynamics', formula: 'ΔU = Q - W', notes: 'Watch sign conventions: W > 0 when gas expands' },
                { name: 'Carnot Maximum Efficiency', formula: 'η = 1 - (T_C / T_H) = (T_H - T_C) / T_H', notes: 'T must be in KELVIN (K = °C + 273)' },
                { name: 'Ideal Gas Law', formula: 'PV = nRT', notes: 'R = 8.314 J/(mol·K)' }
            ],
            workedExample: {
                question: 'A heat engine absorbs 1200 J of heat from a hot reservoir at 500 K and exhausts 800 J to a cold reservoir at 300 K. What is its actual efficiency and its maximum possible theoretical efficiency?',
                steps: [
                    'Actual efficiency: η = W / Q_H = (Q_H - Q_C) / Q_H = (1200 - 800) / 1200 = 400 / 1200 = 1/3 ≈ 33.3%.',
                    'Theoretical Carnot efficiency: η_Carnot = 1 - (T_C / T_H) = 1 - (300 / 500) = 1 - 0.60 = 0.40 = 40.0%.'
                ],
                answer: 'Actual = 33.3%, Theoretical Max = 40.0%'
            },
            pitfalls: 'The #1 mistake in Ethiopian physics exams: plugging temperatures in Celsius (°C) instead of Kelvin (K)! Always add 273 to convert to Kelvin first.'
        },
        {
            title: 'Unit 2: Oscillations and Waves',
            examWeight: '15-18% of National Exam',
            readTime: '6 min read',
            overview: `
                Simple Harmonic Motion (SHM) occurs when the restoring force is directly proportional to displacement and directed toward equilibrium: <code>F = -kx</code>.<br><br>
                • <strong>Energy in SHM:</strong> Total mechanical energy is conserved: <code>E = (1/2)kA² = (1/2)mv² + (1/2)kx²</code>.<br>
                  - At equilibrium (x = 0): Potential energy is 0, velocity is maximum: v_max = Aω.<br>
                  - At amplitude (x = ±A): Velocity is 0, acceleration is maximum: a_max = Aω².<br>
                • <strong>Doppler Effect:</strong> When source and observer move relative to each other, the observed frequency shifts: <code>f\' = f [(v ± v_o) / (v ∓ v_s)]</code>.
            `,
            keyFormulas: [
                { name: 'Angular Frequency (Spring)', formula: 'ω = √(k / m) = 2πf = 2π / T', notes: 'Period T = 2π√(m / k)' },
                { name: 'Simple Pendulum Period', formula: 'T = 2π√(L / g)', notes: 'Independent of mass!' },
                { name: 'Wave Equation', formula: 'v = f * λ', notes: 'Speed v depends only on the medium' }
            ],
            workedExample: {
                question: 'A mass of 0.5 kg attached to a spring oscillates with an amplitude of 0.2 m. If the spring constant k is 200 N/m, find the maximum speed of the mass.',
                steps: [
                    'Find angular frequency: ω = √(k / m) = √(200 / 0.5) = √400 = 20 rad/s.',
                    'Maximum speed occurs at equilibrium: v_max = A * ω.',
                    'Substitute: v_max = (0.2 m) * (20 rad/s) = 4.0 m/s.'
                ],
                answer: 'v_max = 4.0 m/s'
            },
            pitfalls: 'Notice that the period of a simple pendulum T = 2π√(L/g) does NOT depend on the mass of the bob! If the mass is doubled, the period remains exactly the same.'
        },
        {
            title: 'Unit 3: Wave Optics & Interference',
            examWeight: '12-15% of National Exam',
            readTime: '6 min read',
            overview: `
                Wave optics demonstrates the wave nature of light through interference, diffraction, and polarization.<br><br>
                • <strong>Constructive Interference (Bright Fringes):</strong> Path difference must be an integer multiple of wavelength: <code>d sin θ = m λ,  m = 0, ±1, ±2...</code><br>
                • <strong>Destructive Interference (Dark Fringes):</strong> Path difference is a half-integer multiple: <code>d sin θ = (m + 1/2) λ</code>.<br>
                • <strong>Fringe Separation:</strong> In Young's double-slit experiment, distance between adjacent bright fringes on a screen at distance D is <code>Δy = λD / d</code>.
            `,
            keyFormulas: [
                { name: 'Double Slit Bright Fringe', formula: 'y_m = (m * λ * D) / d', notes: 'd = slit separation, D = distance to screen' },
                { name: 'Brewster\'s Angle (Polarization)', formula: 'tan(θ_p) = n_2 / n_1', notes: 'Reflected light is 100% linearly polarized' }
            ],
            workedExample: {
                question: 'In a double-slit experiment, light of wavelength 600 nm illuminates slits separated by 0.3 mm. If the screen is 1.5 m away, find the fringe width.',
                steps: [
                    'Convert all units to meters: λ = 600 * 10^-9 m, d = 0.3 * 10^-3 m, D = 1.5 m.',
                    'Use fringe width formula: Δy = λD / d.',
                    'Calculate: Δy = (600 * 10^-9 * 1.5) / (0.3 * 10^-3) = (900 * 10^-9) / (3 * 10^-4) = 3 * 10^-3 m = 3.0 mm.'
                ],
                answer: 'Fringe width = 3.0 mm'
            },
            pitfalls: 'Always convert nanometers (nm) to meters (* 10^-9) and millimeters (mm) to meters (* 10^-3) before computing, otherwise powers of 10 will ruin your final answer.'
        },
        {
            title: 'Unit 4: Electrostatics & Capacitance',
            examWeight: '16-20% of National Exam',
            readTime: '7 min read',
            overview: `
                Electrostatics studies electric charges at rest, electric fields, and capacitor storage.<br><br>
                • <strong>Coulomb\'s Law:</strong> Force between two point charges: <code>F = k |q_1 q_2| / r²</code> where k = 8.99 * 10^9 N·m²/C².<br>
                • <strong>Electric Field:</strong> Force per unit charge: <code>E = F / q = k Q / r²</code>.<br>
                • <strong>Capacitance:</strong> Charge stored per unit voltage: <code>C = Q / V</code>. For a parallel-plate capacitor: <code>C = ε_0 A / d</code>.<br>
                • <strong>Capacitor Combinations:</strong><br>
                  - Parallel: C_eq = C_1 + C_2 + C_3 (adds directly)<br>
                  - Series: 1/C_eq = 1/C_1 + 1/C_2 + 1/C_3 (reciprocal rule)
            `,
            keyFormulas: [
                { name: 'Energy in a Capacitor', formula: 'U = (1/2)CV² = (1/2)QV = Q² / (2C)', notes: 'Use depending on which quantity is constant' },
                { name: 'Electric Potential (Point Charge)', formula: 'V = kQ / r', notes: 'Scalar quantity, include charge sign!' }
            ],
            workedExample: {
                question: 'Two capacitors of 6 μF and 3 μF are connected in series across a 12 V battery. Find the equivalent capacitance and total charge stored.',
                steps: [
                    'Series rule: 1/C_eq = 1/6 + 1/3 = 1/6 + 2/6 = 3/6  ⟹  C_eq = 6/3 = 2 μF.',
                    'Total charge: Q = C_eq * V = (2 μF) * (12 V) = 24 μC.'
                ],
                answer: 'C_eq = 2 μF, Q = 24 μC'
            },
            pitfalls: 'Capacitors have the OPPOSITE rules to resistors! Capacitors in parallel add directly, while capacitors in series use the reciprocal formula.'
        }
    ],

    // Chemistry
    'Grade 12_Chemistry': [
        {
            title: 'Unit 1: Solutions and Colligative Properties',
            examWeight: '18-22% of National Exam',
            readTime: '7 min read',
            overview: `
                Colligative properties depend only on the NUMBER of solute particles in a solution, not on their identity.<br><br>
                • <strong>Concentration Units:</strong><br>
                  - Molarity (M) = moles of solute / Liters of solution<br>
                  - Molality (m) = moles of solute / kg of SOLVENT (independent of temperature!)<br>
                • <strong>Colligative Properties:</strong><br>
                  1. Vapor Pressure Lowering: ΔP = X_solute * P°_solvent (Raoult\'s Law)<br>
                  2. Boiling Point Elevation: ΔT_b = i * K_b * m<br>
                  3. Freezing Point Depression: ΔT_f = i * K_f * m<br>
                  4. Osmotic Pressure: Π = i * M * R * T<br>
                • <strong>Van\'t Hoff Factor (i):</strong> Number of particles an electrolyte dissociates into (e.g. NaCl ⟹ i = 2; CaCl₂ ⟹ i = 3; Glucose ⟹ i = 1).
            `,
            keyFormulas: [
                { name: 'Boiling Point Elevation', formula: 'ΔT_b = i * K_b * m', notes: 'T_b(solution) = T_b(solvent) + ΔT_b' },
                { name: 'Freezing Point Depression', formula: 'ΔT_f = i * K_f * m', notes: 'T_f(solution) = T_f(solvent) - ΔT_f' },
                { name: 'Osmotic Pressure', formula: 'Π = i * M * R * T', notes: 'R = 0.0821 L·atm/(mol·K)' }
            ],
            workedExample: {
                question: 'Calculate the boiling point of an aqueous solution containing 58.5 g of NaCl dissolved in 1.0 kg of water. (K_b = 0.512 °C/m, Molar mass of NaCl = 58.5 g/mol).',
                steps: [
                    'Moles of NaCl: 58.5 g / 58.5 g/mol = 1.0 mol.',
                    'Molality: m = 1.0 mol / 1.0 kg = 1.0 m.',
                    'Van\'t Hoff factor for NaCl (Na⁺ + Cl⁻): i = 2.',
                    'Calculate elevation: ΔT_b = i * K_b * m = (2)(0.512 °C/m)(1.0 m) = 1.024 °C.',
                    'New boiling point: T_b = 100 °C + 1.024 °C = 101.024 °C.'
                ],
                answer: 'T_b = 101.02 °C'
            },
            pitfalls: 'Never forget the van\'t Hoff factor (i) for ionic compounds! For NaCl, i = 2; for MgCl₂, i = 3. Non-electrolytes like glucose or sucrose have i = 1.'
        },
        {
            title: 'Unit 2: Chemical Kinetics',
            examWeight: '16-20% of National Exam',
            readTime: '6 min read',
            overview: `
                Kinetics studies the speed of chemical reactions and reaction mechanisms.<br><br>
                • <strong>Rate Law:</strong> Expresses rate in terms of reactant concentrations: <code>Rate = k [A]^m [B]^n</code>.<br>
                  - Reaction orders m and n MUST be determined experimentally, NOT from stoichiometric coefficients!<br>
                  - Overall reaction order = m + n.<br>
                • <strong>Factors Affecting Rate:</strong> Temperature, concentration, surface area, and catalysts (which lower activation energy E_a without being consumed).<br>
                • <strong>Arrhenius Equation:</strong> <code>k = A * e^(-E_a / RT)</code>. As temperature increases, k increases exponentially.
            `,
            keyFormulas: [
                { name: 'Rate of Reaction', formula: 'Rate = -Δ[Reactant] / Δt = +Δ[Product] / Δt', notes: 'Reactants decrease (-), products increase (+)' },
                { name: 'Half-Life (First Order)', formula: 't_{1/2} = 0.693 / k', notes: 'Independent of initial concentration!' }
            ],
            workedExample: {
                question: 'A first-order reaction has a rate constant k = 0.0231 min⁻¹. Find the time required for the reactant to decay to 25% of its initial concentration.',
                steps: [
                    'Find half-life: t_{1/2} = 0.693 / 0.0231 = 30 minutes.',
                    'Decaying to 25% represents two half-lives (100% ⟹ 50% ⟹ 25%).',
                    'Total time = 2 * t_{1/2} = 2 * 30 min = 60 minutes.'
                ],
                answer: 't = 60 minutes'
            },
            pitfalls: 'A common exam trap: writing the rate law using coefficients from the balanced equation. Remember: rate law exponents can ONLY be found from experimental rate data tables.'
        },
        {
            title: 'Unit 3: Chemical Equilibrium & Acid-Base',
            examWeight: '20-25% of National Exam',
            readTime: '8 min read',
            overview: `
                Dynamic equilibrium occurs when the forward and reverse reaction rates are equal: <code>aA + bB ⇌ cC + dD</code>.<br><br>
                • <strong>Equilibrium Constant (Kc):</strong> <code>Kc = [C]^c [D]^d / ([A]^a [B]^b)</code>. Pure solids (s) and pure liquids (l) are EXCLUDED from the expression!<br>
                • <strong>Le Chatelier\'s Principle:</strong> If a system at equilibrium is disturbed, it shifts to counteract the disturbance:<br>
                  - Increase pressure: shifts to the side with FEWER gas moles.<br>
                  - Increase temperature: shifts in the ENDOTHERMIC direction (absorbs heat).<br>
                • <strong>pH & Buffers:</strong> <code>pH = -log[H⁺]</code>; <code>pH + pOH = 14</code> at 25 °C.<br>
                  - Buffer solution: mixture of weak acid and its conjugate base. Henderson-Hasselbalch equation: <code>pH = pKa + log([A⁻] / [HA])</code>.
            `,
            keyFormulas: [
                { name: 'Equilibrium Constant Expression', formula: 'K_c = [Products]^coefficients / [Reactants]^coefficients', notes: 'Only gases and aqueous species included' },
                { name: 'Water Ion Product', formula: 'K_w = [H⁺][OH⁻] = 1.0 * 10^-14 at 25 °C', notes: 'pH + pOH = 14' },
                { name: 'Buffer pH (Henderson-Hasselbalch)', formula: 'pH = pK_a + log([Conjugate Base] / [Weak Acid])', notes: 'Maximum buffer capacity when [Base] = [Acid], pH = pKa' }
            ],
            workedExample: {
                question: 'Calculate the pH of a 0.05 M Ba(OH)₂ strong base solution.',
                steps: [
                    'Ba(OH)₂ is a strong base that dissociates completely: Ba(OH)₂ ⟹ Ba²⁺ + 2 OH⁻.',
                    'Concentration of hydroxide ions: [OH⁻] = 2 * 0.05 M = 0.10 M = 10⁻¹ M.',
                    'Calculate pOH: pOH = -log(10⁻¹) = 1.0.',
                    'Calculate pH: pH = 14 - pOH = 14 - 1.0 = 13.0.'
                ],
                answer: 'pH = 13.0'
            },
            pitfalls: 'Do not forget that diprotic bases like Ba(OH)₂ release TWO moles of OH⁻ ions per formula unit! [OH⁻] is double the concentration of Ba(OH)₂.'
        }
    ]
};

function getExamUnitNotesList(grade, subject) {
    const key = `${grade}_${subject}`;
    if (EXAM_UNIT_NOTES[key] && EXAM_UNIT_NOTES[key].length > 0) {
        return EXAM_UNIT_NOTES[key];
    }

    // Dynamic curriculum generator for all other grades and subjects
    const subjectPrefix = subject || 'General';
    return [
        {
            title: `Unit 1: Foundations of ${subjectPrefix}`,
            examWeight: '20% of National Exam',
            readTime: '5 min read',
            overview: `Master the fundamental definitions, primary axioms, and core principles of ${grade} ${subjectPrefix}. Focus on establishing the relationship between variables and standard units.`,
            keyFormulas: [
                { name: 'Fundamental Definition', formula: 'Primary Unit Law: F = Target Relationship', notes: 'Review standard textbook units' }
            ],
            workedExample: {
                question: `Standard examination problem for ${grade} ${subjectPrefix}.`,
                steps: [
                    'Identify given variables and required quantity.',
                    'Apply standard curriculum theorem.',
                    'Substitute values and simplify.'
                ],
                answer: 'Verified solution according to Ministry syllabus.'
            },
            pitfalls: 'Read every question carefully before computing. Double-check all unit conversions.'
        },
        {
            title: `Unit 2: Advanced Applications & Analysis in ${subjectPrefix}`,
            examWeight: '25% of National Exam',
            readTime: '6 min read',
            overview: `Detailed examination of multi-step problem solving, analytical techniques, and graph interpretation for ${grade} ${subjectPrefix}.`,
            keyFormulas: [
                { name: 'Core Relation', formula: 'Law of Variation & Rates', notes: 'Common in semester and national exams' }
            ],
            workedExample: {
                question: 'Application question testing conceptual synthesis.',
                steps: [
                    'Break problem into components.',
                    'Apply governing equation.',
                    'Check boundary conditions.'
                ],
                answer: 'Correct option according to syllabus standard.'
            },
            pitfalls: 'Avoid rushing through algebraic steps; ensure negative signs are tracked.'
        }
    ];
}

function setDeskNoteSection(section) {
    deskState.activeNoteSection = section;
    const body = document.getElementById('desk-left-body');
    if (body) {
        renderDeskUnitNotesView(body);
        body.scrollTop = 0;
    }
}

// ========================================================
// OPEN TOPIC NOTES & PEER TIPS SYSTEM
// ========================================================
const DEFAULT_SEEDED_TOPIC_NOTES = {
    'Grade 12_Mathematics_0': [
        {
            id: 'seed_math_1',
            author: 'Dawit B. (Top Scorer)',
            tag: '⚡ Exam Shortcut',
            content: 'For arithmetic sequence questions with $a_n = 4n - 3$, the common difference $d$ is ALWAYS the coefficient of $n$ (here $d = 4$). The first term is $a_1 = 4(1) - 3 = 1$. This saves 2 minutes of solving simultaneous equations!',
            likes: 34,
            likedByMe: false,
            timestamp: '2 days ago',
            isOwner: false
        },
        {
            id: 'seed_math_2',
            author: 'Selamawit T.',
            tag: '⚠️ Exam Trap',
            content: 'Convergence trap: an infinite GP converges if and only if $|r| < 1$. If $r = -1/2$, it converges (sum exists!). If $r = -2$, $|-2| = 2 \\ge 1$ so it diverges. Watch out for negative $r$ signs!',
            likes: 21,
            likedByMe: false,
            timestamp: '5 days ago',
            isOwner: false
        },
        {
            id: 'seed_math_3',
            author: 'Kidus Y.',
            tag: '🧠 Mnemonic Trick',
            content: 'Sigma shortcut: $\\sum_{k=1}^n k = \\frac{n(n+1)}{2}$. For first 100 integers: $100 \\times 101 / 2 = 5050$. Saves tons of calculation time on Section A.',
            likes: 18,
            likedByMe: false,
            timestamp: 'Nov 9',
            isOwner: false
        }
    ],
    'Grade 12_Physics_0': [
        {
            id: 'seed_phys_1',
            author: 'Natnael K. (Engineering)',
            tag: '⚡ Exam Shortcut',
            content: 'Always convert Celsius to Kelvin before calculating Carnot efficiency! $\\eta = 1 - \\frac{T_C}{T_H}$. Never use Celsius degrees directly or you will fall into the examiner trap.',
            likes: 27,
            likedByMe: false,
            timestamp: '3 days ago',
            isOwner: false
        },
        {
            id: 'seed_phys_2',
            author: 'Hanna G.',
            tag: '🧠 Mnemonic Trick',
            content: 'First Law of Thermodynamics: $\\Delta U = Q - W$. Remember: $Q$ is heat IN (positive) and $W$ is work done BY gas (positive when expanding). If gas is compressed, $W$ is negative!',
            likes: 19,
            likedByMe: false,
            timestamp: 'Nov 8',
            isOwner: false
        }
    ],
    'Grade 12_Chemistry_0': [
        {
            id: 'seed_chem_1',
            author: 'Bethlehem M.',
            tag: '⚡ Exam Shortcut',
            content: 'For conjugate acid-base pairs: $K_a \\times K_b = K_w = 1.0 \\times 10^{-14}$ at $25^\\circ C$. If $pK_a = 4.75$, then $pK_b = 14 - 4.75 = 9.25$ instantly!',
            likes: 25,
            likedByMe: false,
            timestamp: '4 days ago',
            isOwner: false
        }
    ],
    'Grade 12_Biology_0': [
        {
            id: 'seed_bio_1',
            author: 'Dr. Michael (Alumni)',
            tag: '⚡ Exam Shortcut',
            content: 'Competitive vs Non-competitive inhibition: Competitive increases $K_m$ but leaves $V_{max}$ unchanged (can be overcome by adding more substrate). Non-competitive lowers $V_{max}$ with no change to $K_m$!',
            likes: 31,
            likedByMe: false,
            timestamp: '1 week ago',
            isOwner: false
        }
    ],
    'Grade 12_English_0': [
        {
            id: 'seed_eng_1',
            author: 'Amen A.',
            tag: '⚡ Exam Shortcut',
            content: 'Third Conditional formula: If + past perfect (had done), would + have + past participle. Example: "If I had studied harder, I would have scored 650+". Almost always tested in Section B!',
            likes: 20,
            likedByMe: false,
            timestamp: 'Nov 6',
            isOwner: false
        }
    ]
};

function getTopicNotesStorageKey(grade, subject, unitIndex) {
    return `pel_topic_notes_${grade || 'Grade 12'}_${subject || 'Mathematics'}_${unitIndex || 0}`;
}

function getTopicNotes(grade, subject, unitIndex) {
    const key = getTopicNotesStorageKey(grade, subject, unitIndex);
    const raw = localStorage.getItem(key);
    if (raw) {
        try {
            return JSON.parse(raw);
        } catch(e) {}
    }
    // Pre-seed with defaults if available
    const seedKey = `${grade}_${subject}_${unitIndex}`;
    const seeds = DEFAULT_SEEDED_TOPIC_NOTES[seedKey] ? JSON.parse(JSON.stringify(DEFAULT_SEEDED_TOPIC_NOTES[seedKey])) : [];
    localStorage.setItem(key, JSON.stringify(seeds));
    return seeds;
}

function saveTopicNotesLocally(grade, subject, unitIndex, notes) {
    const key = getTopicNotesStorageKey(grade, subject, unitIndex);
    localStorage.setItem(key, JSON.stringify(notes));
}

function addTopicNote(grade, subject, unitIndex, author, tag, content) {
    if (!content || !content.trim()) {
        showToast('Please type your note before posting', 'info');
        return;
    }
    const notes = getTopicNotes(grade, subject, unitIndex);
    const authorName = (author && author.trim()) || (state && state.user && state.user.fullName) || 'Student Contributor';
    // Remember student name
    try { localStorage.setItem('pel_last_student_author', authorName); } catch(e) {}

    const newNote = {
        id: 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        author: authorName,
        tag: tag || '⚡ Exam Shortcut',
        content: content.trim(),
        likes: 1,
        likedByMe: true,
        timestamp: 'Just now',
        isOwner: true
    };

    notes.unshift(newNote);
    saveTopicNotesLocally(grade, subject, unitIndex, notes);

    // Boost study streak and award 20 XP
    if (typeof recordStudyStreakActivity === 'function') {
        recordStudyStreakActivity();
    }
    playDeskChime('success');
    showToast('🎉 Note posted to topic! +20 XP awarded to your streak!', 'success');

    // Asynchronously sync with server if available
    try {
        fetch('/api/topic-notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                grade,
                subject,
                unitIndex,
                author: authorName,
                tag: newNote.tag,
                content: newNote.content
            })
        }).catch(() => {});
    } catch(e) {}

    deskState.topicNoteComposerOpen = false;
    deskState.topicNotePrefill = '';

    const body = document.getElementById('desk-left-body');
    if (body) {
        renderDeskUnitNotesView(body);
    }
}

function toggleLikeTopicNote(grade, subject, unitIndex, noteId) {
    const notes = getTopicNotes(grade, subject, unitIndex);
    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    if (note.likedByMe) {
        note.likedByMe = false;
        note.likes = Math.max(0, (note.likes || 1) - 1);
    } else {
        note.likedByMe = true;
        note.likes = (note.likes || 0) + 1;
        playDeskChime('ding');
        showToast('❤️ Marked as helpful!', 'info');
        try {
            fetch(`/api/topic-notes/${noteId}/like`, { method: 'POST' }).catch(() => {});
        } catch(e) {}
    }

    saveTopicNotesLocally(grade, subject, unitIndex, notes);
    const body = document.getElementById('desk-left-body');
    if (body) {
        renderDeskUnitNotesView(body);
    }
}

function deleteTopicNote(grade, subject, unitIndex, noteId) {
    if (!confirm('Are you sure you want to remove this note?')) return;
    let notes = getTopicNotes(grade, subject, unitIndex);
    notes = notes.filter(n => n.id !== noteId);
    saveTopicNotesLocally(grade, subject, unitIndex, notes);
    try {
        fetch(`/api/topic-notes/${noteId}`, { method: 'DELETE' }).catch(() => {});
    } catch(e) {}
    showToast('Note removed', 'info');
    const body = document.getElementById('desk-left-body');
    if (body) {
        renderDeskUnitNotesView(body);
    }
}

function toggleTopicNoteComposer(forceState = null) {
    if (forceState !== null) {
        deskState.topicNoteComposerOpen = forceState;
    } else {
        deskState.topicNoteComposerOpen = !deskState.topicNoteComposerOpen;
    }
    const body = document.getElementById('desk-left-body');
    if (body) {
        renderDeskUnitNotesView(body);
    }
}

function setDeskTopicNoteFilter(filter) {
    deskState.topicNoteFilter = filter;
    const body = document.getElementById('desk-left-body');
    if (body) {
        renderDeskUnitNotesView(body);
    }
}

function postPersonalNotesToTopic() {
    const textarea = document.getElementById('desk-notes-input');
    const text = textarea ? textarea.value.trim() : '';
    if (!text) {
        showToast('Please type your notes on the right first before sharing!', 'info');
        return;
    }
    setDeskLeftTab('unitNotes');
    deskState.activeNoteSection = 'community';
    deskState.topicNoteComposerOpen = true;
    deskState.topicNotePrefill = text;
    const body = document.getElementById('desk-left-body');
    if (body) {
        renderDeskUnitNotesView(body);
        body.scrollTop = 0;
    }
    showToast('Ready to post! Review your note and tap "Post Note".', 'success');
}

function changeDeskNoteSection(direction) {
    const sections = ['overview', 'formulas', 'example', 'pitfalls', 'community'];
    let currentIdx = sections.indexOf(deskState.activeNoteSection || 'overview');
    if (currentIdx === -1) currentIdx = 0;
    const nextIdx = currentIdx + direction;
    if (nextIdx >= 0 && nextIdx < sections.length) {
        setDeskNoteSection(sections[nextIdx]);
    } else if (nextIdx >= sections.length) {
        askAiToQuizCurrentUnit();
    }
}

function renderDeskUnitNotesView(container) {
    const leftActions = document.getElementById('desk-left-actions');
    const unitList = getExamUnitNotesList(deskState.grade, deskState.subject);
    
    if (deskState.selectedUnitIndex >= unitList.length) {
        deskState.selectedUnitIndex = 0;
    }
    const currentUnit = unitList[deskState.selectedUnitIndex] || unitList[0];
    const activeSec = deskState.activeNoteSection || 'overview';
    const sections = ['overview', 'formulas', 'example', 'pitfalls', 'community'];
    const currentSecIdx = sections.indexOf(activeSec);

    const topicNotes = getTopicNotes(deskState.grade, deskState.subject, deskState.selectedUnitIndex);
    const savedAuthorName = localStorage.getItem('pel_last_student_author') || (state && state.user && state.user.fullName) || '';

    if (leftActions) {
        leftActions.innerHTML = `
            <button class="desk-tool-btn" onclick="setDeskNoteSection('community'); toggleTopicNoteComposer(true);" title="Add your own note or exam tip on this unit" style="color: #58cc02; border-color: rgba(88, 204, 2, 0.4);">
                ➕ Add Note
            </button>
            <button class="desk-tool-btn" onclick="askAiToQuizCurrentUnit()" title="Ask AI to test you on this unit">
                🤖 Quiz Me
            </button>
        `;
    }

    if (!currentUnit) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <p style="color: var(--text-muted);">No specific unit notes found for this subject yet.</p>
            </div>
        `;
        return;
    }

    // Filter notes if in community tab
    const filter = deskState.topicNoteFilter || 'all';
    let filteredNotes = topicNotes;
    if (filter === 'shortcut') {
        filteredNotes = topicNotes.filter(n => (n.tag || '').includes('Shortcut'));
    } else if (filter === 'mnemonic') {
        filteredNotes = topicNotes.filter(n => (n.tag || '').includes('Mnemonic'));
    } else if (filter === 'top') {
        filteredNotes = [...topicNotes].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else if (filter === 'mine') {
        filteredNotes = topicNotes.filter(n => n.isOwner);
    }

    container.innerHTML = `
        <div class="desk-unit-notes-container">
            <!-- Unit Selector Bar -->
            <div class="desk-unit-selector-bar">
                <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 200px;">
                    <span style="font-size: 12px; font-weight: 800; color: #1cb0f6;">UNIT:</span>
                    <select class="desk-select" style="flex: 1; padding: 6px 12px; font-size: 13px;" onchange="deskState.selectedUnitIndex = parseInt(this.value); deskState.activeNoteSection = 'overview'; deskState.topicNoteComposerOpen = false; renderDeskUnitNotesView(document.getElementById('desk-left-body')); document.getElementById('desk-left-body').scrollTop = 0;">
                        ${unitList.map((u, idx) => `<option value="${idx}" ${idx === deskState.selectedUnitIndex ? 'selected' : ''}>${u.title}</option>`).join('')}
                    </select>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <span class="role-pill" style="font-size: 11px; background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
                        🎯 ${currentUnit.examWeight}
                    </span>
                    <span style="font-size: 11.5px; color: var(--text-muted);">⏱️ ${currentUnit.readTime}</span>
                </div>
            </div>

            <!-- Upward Section Navigator Pills (Zero Scrolling Down Required) -->
            <div class="desk-note-deck-pills">
                <button type="button" class="desk-note-deck-btn ${activeSec === 'overview' ? 'active' : ''}" onclick="setDeskNoteSection('overview')">
                    📌 Overview
                </button>
                <button type="button" class="desk-note-deck-btn ${activeSec === 'formulas' ? 'active' : ''}" onclick="setDeskNoteSection('formulas')">
                    📐 Formulas (${(currentUnit.keyFormulas || []).length})
                </button>
                <button type="button" class="desk-note-deck-btn ${activeSec === 'example' ? 'active' : ''}" onclick="setDeskNoteSection('example')">
                    💡 Example
                </button>
                <button type="button" class="desk-note-deck-btn ${activeSec === 'pitfalls' ? 'active' : ''}" onclick="setDeskNoteSection('pitfalls')">
                    ⚠️ Traps
                </button>
                <button type="button" class="desk-note-deck-btn ${activeSec === 'community' ? 'active' : ''}" onclick="setDeskNoteSection('community')">
                    💬 Notes (${topicNotes.length})
                </button>
            </div>

            <!-- Active Deck Section (Positioned Directly at Top) -->
            ${activeSec === 'overview' ? `
                <div class="desk-note-card">
                    <h4 class="desk-note-heading">
                        <span>📌</span> ${currentUnit.title}: Core Concepts & Rules
                    </h4>
                    <div style="font-size: 14px; line-height: 1.65; color: var(--text-main);">
                        ${currentUnit.overview}
                    </div>
                </div>
            ` : ''}

            ${activeSec === 'formulas' ? `
                <div class="desk-note-card">
                    <h4 class="desk-note-heading">
                        <span>📐</span> High-Yield Exam Formulas (${currentUnit.title.split(':')[0]})
                    </h4>
                    ${(currentUnit.keyFormulas && currentUnit.keyFormulas.length > 0) ? `
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${currentUnit.keyFormulas.map(f => `
                                <div class="desk-note-formula-box">
                                    <div>
                                        <strong style="color: #38bdf8; font-size: 12.5px; display: block; margin-bottom: 2px;">${f.name}</strong>
                                        <span style="font-size: 15px;">${f.formula}</span>
                                    </div>
                                    <button class="desk-tool-btn" style="padding: 2px 8px; font-size: 11px;" onclick="copyFormulaText('${escapeQuotes(f.formula)}', this)">Copy</button>
                                </div>
                                ${f.notes ? `<p style="font-size: 12px; color: var(--text-muted); margin: -4px 0 6px 4px;">• ${f.notes}</p>` : ''}
                            `).join('')}
                        </div>
                    ` : '<p style="color: var(--text-muted); font-size: 13.5px;">No formula cards listed for this unit.</p>'}
                </div>
            ` : ''}

            ${activeSec === 'example' ? `
                <div class="desk-note-card">
                    <h4 class="desk-note-heading" style="color: #38bdf8;">
                        <span>💡</span> National Exam Worked Example
                    </h4>
                    ${currentUnit.workedExample ? `
                        <div class="desk-note-example-box">
                            <strong style="color: var(--text-main); font-size: 14.5px; display: block; margin-bottom: 10px; line-height: 1.5;">
                                ${currentUnit.workedExample.question}
                            </strong>
                            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
                                ${currentUnit.workedExample.steps.map((st, i) => `
                                    <div style="display: flex; align-items: flex-start; gap: 6px;">
                                        <span class="desk-note-step-badge">Step ${i+1}</span>
                                        <span style="font-size: 13.5px; line-height: 1.5;">${st}</span>
                                    </div>
                                `).join('')}
                            </div>
                            <div style="margin-top: 12px; padding-top: 10px; border-top: 1px dashed rgba(56, 189, 248, 0.3); font-weight: 800; color: #22c55e; font-size: 14px;">
                                ✅ Final Answer: ${currentUnit.workedExample.answer}
                            </div>
                        </div>
                    ` : '<p style="color: var(--text-muted); font-size: 13.5px;">Example being transcribed.</p>'}
                </div>
            ` : ''}

            ${activeSec === 'pitfalls' ? `
                <div class="desk-note-trap-box" style="margin-top: 0;">
                    <strong style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px; font-size: 14px; color: #ef4444;">
                        ⚠️ Examiner Pitfalls & Common Mistakes to Avoid:
                    </strong>
                    <div style="font-size: 13.5px; line-height: 1.6;">
                        ${currentUnit.pitfalls || 'Read questions carefully and always verify SI units before calculating.'}
                    </div>
                </div>
            ` : ''}

            ${activeSec === 'community' ? `
                <div class="desk-note-card desk-community-notes-card">
                    <!-- Community Notes Header Bar -->
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
                        <div>
                            <h4 class="desk-note-heading" style="margin-bottom: 4px;">
                                <span>💬</span> Open Student Notes on ${currentUnit.title.split(':')[0]}
                            </h4>
                            <p style="font-size: 12.5px; color: var(--text-muted); margin: 0;">
                                Community-submitted shortcuts, mnemonics, and teacher tips for this specific unit.
                            </p>
                        </div>
                        <button type="button" class="desk-duo-action-btn" onclick="toggleTopicNoteComposer()" style="background: #58cc02; border-bottom: 3px solid #46a302; padding: 7px 14px; font-size: 12.5px;">
                            ${deskState.topicNoteComposerOpen ? '✕ Close Composer' : '➕ Add Note / Tip'}
                        </button>
                    </div>

                    <!-- Add Note Composer Form -->
                    ${deskState.topicNoteComposerOpen ? `
                        <div class="desk-topic-composer-box">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <span style="font-size: 13px; font-weight: 800; color: #58cc02;">✍️ Share Note on ${currentUnit.title.split(':')[0]}</span>
                                <span style="font-size: 11px; font-weight: 700; color: #f59e0b;">+20 XP Reward</span>
                            </div>
                            <div style="display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap;">
                                <input type="text" id="topic-note-author-input" class="desk-select" style="flex: 1; min-width: 140px; padding: 6px 12px;" placeholder="Your Name or Handle" value="${savedAuthorName ? escapeQuotes(savedAuthorName) : ''}">
                                <select id="topic-note-tag-select" class="desk-select" style="flex: 1; min-width: 160px; padding: 6px 12px;">
                                    <option value="⚡ Exam Shortcut">⚡ Exam Shortcut</option>
                                    <option value="🧠 Mnemonic Trick">🧠 Mnemonic Trick</option>
                                    <option value="📝 Key Summary">📝 Key Summary</option>
                                    <option value="⚠️ Traps & Tips">⚠️ Traps & Tips</option>
                                </select>
                            </div>
                            <textarea id="topic-note-content-input" class="desk-notes-area" style="min-height: 90px; width: 100%; margin-bottom: 10px; font-size: 13.5px;" placeholder="Write your exam shortcut, formula derivation, or memory trick for this unit... (Math formulas like $S_n = n/2(a_1+a_n)$ supported)">${deskState.topicNotePrefill ? escapeQuotes(deskState.topicNotePrefill) : ''}</textarea>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-size: 11px; color: var(--text-muted);">Everyone studying this unit can view and learn from your note!</span>
                                <div style="display: flex; gap: 8px;">
                                    <button type="button" class="desk-tool-btn" onclick="toggleTopicNoteComposer(false)">Cancel</button>
                                    <button type="button" class="desk-duo-action-btn" style="background: #58cc02; border-bottom: 3px solid #46a302; padding: 6px 16px; font-size: 12.5px;" onclick="addTopicNote(deskState.grade, deskState.subject, deskState.selectedUnitIndex, document.getElementById('topic-note-author-input').value, document.getElementById('topic-note-tag-select').value, document.getElementById('topic-note-content-input').value)">
                                        🚀 Post Note (+20 XP)
                                    </button>
                                </div>
                            </div>
                        </div>
                    ` : ''}

                    <!-- Filter Chips -->
                    <div class="desk-topic-filter-bar">
                        <button type="button" class="desk-filter-chip ${filter === 'all' ? 'active' : ''}" onclick="setDeskTopicNoteFilter('all')">
                            All (${topicNotes.length})
                        </button>
                        <button type="button" class="desk-filter-chip ${filter === 'shortcut' ? 'active' : ''}" onclick="setDeskTopicNoteFilter('shortcut')">
                            ⚡ Shortcuts
                        </button>
                        <button type="button" class="desk-filter-chip ${filter === 'mnemonic' ? 'active' : ''}" onclick="setDeskTopicNoteFilter('mnemonic')">
                            🧠 Mnemonics
                        </button>
                        <button type="button" class="desk-filter-chip ${filter === 'top' ? 'active' : ''}" onclick="setDeskTopicNoteFilter('top')">
                            ❤️ Top Helpful
                        </button>
                        <button type="button" class="desk-filter-chip ${filter === 'mine' ? 'active' : ''}" onclick="setDeskTopicNoteFilter('mine')">
                            ✨ My Notes
                        </button>
                    </div>

                    <!-- Notes Feed List -->
                    <div class="desk-topic-notes-feed">
                        ${filteredNotes.length === 0 ? `
                            <div style="text-align: center; padding: 32px 16px; border: 1.5px dashed var(--border-glass); border-radius: 12px; margin-top: 10px;">
                                <div style="font-size: 28px; margin-bottom: 8px;">📝</div>
                                <h5 style="margin: 0 0 6px 0; font-size: 14.5px;">No student notes in this filter</h5>
                                <p style="font-size: 12.5px; color: var(--text-muted); margin: 0 0 14px 0;">
                                    Be the first student to add an exam trick or summary for ${currentUnit.title}!
                                </p>
                                <button type="button" class="desk-duo-action-btn" style="background: #58cc02; border-bottom: 3px solid #46a302; padding: 7px 16px; font-size: 12px;" onclick="toggleTopicNoteComposer(true)">
                                    ➕ Write First Note
                                </button>
                            </div>
                        ` : `
                            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 10px;">
                                ${filteredNotes.map(note => `
                                    <div class="desk-topic-note-card ${note.isOwner ? 'my-note' : ''}">
                                        <div class="desk-topic-note-header">
                                            <div class="desk-topic-note-author-info">
                                                <div class="desk-topic-note-avatar">
                                                    ${(note.author || 'S').charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div style="display: flex; align-items: center; gap: 6px;">
                                                        <strong style="font-size: 13px; color: var(--text-main);">${escapeQuotes(note.author)}</strong>
                                                        ${note.isOwner ? '<span class="role-pill" style="font-size: 10px; background: rgba(88, 204, 2, 0.2); color: #58cc02;">You</span>' : ''}
                                                    </div>
                                                    <span style="font-size: 11px; color: var(--text-muted);">${note.timestamp || 'Recent'}</span>
                                                </div>
                                            </div>
                                            <span class="desk-topic-tag-badge">${note.tag || '⚡ Exam Shortcut'}</span>
                                        </div>

                                        <div class="desk-topic-note-body">
                                            ${escapeQuotes(note.content).replace(/\n/g, '<br>')}
                                        </div>

                                        <div class="desk-topic-note-footer">
                                            <button type="button" class="desk-like-btn ${note.likedByMe ? 'liked' : ''}" onclick="toggleLikeTopicNote(deskState.grade, deskState.subject, deskState.selectedUnitIndex, '${note.id}')" title="Mark as helpful">
                                                <span>${note.likedByMe ? '❤️' : '🤍'}</span>
                                                <span>Helpful (${note.likes || 0})</span>
                                            </button>
                                            <div style="display: flex; gap: 6px;">
                                                <button type="button" class="desk-tool-btn" style="padding: 3px 8px; font-size: 11px;" onclick="copyFormulaText('${escapeQuotes(note.content)}', this)">
                                                    Copy
                                                </button>
                                                ${note.isOwner ? `
                                                    <button type="button" class="desk-tool-btn" style="padding: 3px 8px; font-size: 11px; color: #ef4444; border-color: rgba(239, 68, 68, 0.4);" onclick="deleteTopicNote(deskState.grade, deskState.subject, deskState.selectedUnitIndex, '${note.id}')" title="Delete your note">
                                                        Delete
                                                    </button>
                                                ` : ''}
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        `}
                    </div>
                </div>
            ` : ''}

            <!-- Bottom Deck Controller (Flips Upward Without Scrolling) -->
            <div class="desk-deck-bottom-bar">
                <button type="button" class="desk-tool-btn" ${currentSecIdx === 0 ? 'disabled' : ''} onclick="changeDeskNoteSection(-1)">
                    ◀ Previous
                </button>
                <span style="font-size: 12px; font-weight: 800; color: #1cb0f6;">
                    ${currentSecIdx + 1} / 5 • ${sections[currentSecIdx].toUpperCase()}
                </span>
                <button type="button" class="desk-tool-btn" style="color: #1cb0f6; border-color: rgba(28, 176, 246, 0.4);" onclick="changeDeskNoteSection(1)">
                    ${currentSecIdx === 4 ? '🤖 Test Me on Unit →' : 'Next Card ▶'}
                </button>
            </div>
        </div>
    `;
}

function askAiToQuizCurrentUnit() {
    const unitList = getExamUnitNotesList(deskState.grade, deskState.subject);
    const u = unitList[deskState.selectedUnitIndex] || unitList[0];
    setDeskRightTab('ai');
    sendDeskAiMessage(`I just finished reading ${u ? u.title : 'this unit'}. Please quiz me with a challenging Ethiopian national exam level question on this topic!`);
}

function renderDeskPdfView(container) {
    const leftActions = document.getElementById('desk-left-actions');
    const examKey = `${deskState.grade}_${deskState.subject}`;
    
    // Find matching exam papers in cachedExams or static mappings
    let matchedPapers = [];
    if (typeof cachedExams !== 'undefined' && Array.isArray(cachedExams)) {
        matchedPapers = cachedExams.filter(e => {
            const gMatch = (e.grade || '').toLowerCase() === deskState.grade.toLowerCase();
            const sMatch = (e.subject || '').toLowerCase() === deskState.subject.toLowerCase();
            return gMatch && sMatch;
        });
    }

    let activePaper = matchedPapers[deskState.paperIndex] || matchedPapers[0];

    if (leftActions) {
        leftActions.innerHTML = `
            ${matchedPapers.length > 1 ? `
                <select class="desk-select" style="padding: 4px 10px; font-size: 12px;" onchange="deskState.paperIndex = parseInt(this.value); setDeskLeftTab('pdf');">
                    ${matchedPapers.map((p, idx) => `<option value="${idx}" ${idx === deskState.paperIndex ? 'selected' : ''}>${p.title || `Paper ${idx+1}`}</option>`).join('')}
                </select>
            ` : ''}
            ${activePaper && activePaper.filePath ? `
                <button class="desk-tool-btn" onclick="downloadExamPaper('${activePaper.filePath}', '${escapeQuotes(activePaper.title || 'Exam')}.pdf')">
                    ${uiIcon('download', 12)} PDF
                </button>
            ` : ''}
        `;
    }

    if (activePaper && activePaper.filePath) {
        container.innerHTML = `
            <div style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <h4 style="margin: 0; font-size: 15px; color: var(--text-main); font-weight: 700;">${activePaper.title || `${deskState.grade} ${deskState.subject}`}</h4>
                <span class="role-pill" style="font-size: 11px;">Official Archive Paper</span>
            </div>
            <iframe class="desk-iframe-frame" src="${activePaper.filePath}" title="${activePaper.title || 'Exam Document'}"></iframe>
        `;
    } else {
        container.innerHTML = `
            <div style="text-align: center; padding: 48px 24px; margin: auto;">
                <div style="font-size: 48px; margin-bottom: 16px;">📖</div>
                <h3 style="font-size: 18px; font-weight: 800; color: var(--text-main); margin-bottom: 8px;">
                    ${deskState.grade} • ${deskState.subject} Study Archive
                </h3>
                <p style="color: var(--text-muted); font-size: 14px; max-width: 440px; margin: 0 auto 20px auto; line-height: 1.6;">
                    Select <strong>Unit Notes</strong> to read verified, exam-level chapter summaries, or switch to <strong>Formulas</strong> to review the high-yield equations and constants for this subject.
                </p>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button class="btn-primary" style="width: auto; padding: 8px 18px; font-size: 13px;" onclick="setDeskLeftTab('unitNotes')">
                        📖 Read Exam-Level Unit Notes
                    </button>
                    <button class="btn-secondary" style="width: auto; padding: 8px 16px; font-size: 13px;" onclick="setDeskLeftTab('formulas')">
                        ${uiIcon('calculator', 14)} Open Formulas Cheatsheet
                    </button>
                </div>
            </div>
        `;
    }
}

function renderDeskFormulasView(container) {
    const leftActions = document.getElementById('desk-left-actions');
    if (leftActions) leftActions.innerHTML = '';

    const subjectMap = {
        'Mathematics': 'math',
        'Physics': 'physics',
        'Chemistry': 'chem',
        'Biology': 'bio'
    };
    const sKey = subjectMap[deskState.subject] || 'math';
    const formulas = (typeof FORMULA_DATA !== 'undefined' && FORMULA_DATA[sKey]) || [];
    const matched = formulas.filter(f => f.grades && f.grades.includes(deskState.grade));

    if (matched.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <p style="color: var(--text-muted);">No specific formula cards for ${deskState.grade} ${deskState.subject}.</p>
                <button class="btn-secondary" style="margin-top: 10px;" onclick="showFormulaGrades()">View Global Formula Sheets</button>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div style="margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center;">
            <h4 style="margin: 0; font-size: 14.5px; font-weight: 700;">${deskState.grade} ${deskState.subject} Key Formulas</h4>
            <span style="font-size: 12px; color: var(--text-muted);">${matched.length} formulas loaded</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
            ${matched.map(f => `
                <div class="desk-formula-card">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                        <span style="font-weight: 700; font-size: 14px; color: #38bdf8;">${f.title}</span>
                        <span style="font-size: 11px; padding: 2px 7px; background: rgba(56, 189, 248, 0.12); border-radius: 9999px; color: #38bdf8; font-weight: 700;">${f.topic}</span>
                    </div>
                    <div style="background: rgba(0,0,0,0.25); padding: 10px 14px; border-radius: 8px; font-family: monospace; font-size: 15px; font-weight: 700; color: #22c55e; margin: 8px 0; display: flex; justify-content: space-between; align-items: center;">
                        <span>${f.displayMath}</span>
                        <button class="desk-tool-btn" style="padding: 2px 8px; font-size: 11px;" onclick="copyFormulaText('${escapeQuotes(f.displayMath)}', this)">Copy</button>
                    </div>
                    <p style="font-size: 12.5px; color: var(--text-muted); margin: 4px 0 0 0; line-height: 1.4;">
                        <strong>Variables:</strong> ${f.variables}
                    </p>
                    ${f.tip ? `<p style="font-size: 12px; color: #f59e0b; margin: 4px 0 0 0;">💡 <em>${f.tip}</em></p>` : ''}
                </div>
            `).join('')}
        </div>
    `;
}

function renderDeskTipsView(container) {
    const leftActions = document.getElementById('desk-left-actions');
    if (leftActions) leftActions.innerHTML = '';

    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="desk-formula-card" style="border-left: 4px solid #1cb0f6;">
                <h4 style="margin: 0 0 6px 0; font-size: 15px; color: #1cb0f6;">🎯 The 25-Minute Pomodoro Rule</h4>
                <p style="margin: 0; font-size: 13.5px; color: var(--text-muted); line-height: 1.5;">
                    Dedicate 25 minutes of zero phone interruptions. Work through 5 to 10 past questions actively on your scratchpad before checking the answer. Take a full 5-minute break when the timer dings.
                </p>
            </div>
            
            <div class="desk-formula-card" style="border-left: 4px solid #22c55e;">
                <h4 style="margin: 0 0 6px 0; font-size: 15px; color: #22c55e;">✍️ Use the Scratchpad for Every Calculation</h4>
                <p style="margin: 0; font-size: 13.5px; color: var(--text-muted); line-height: 1.5;">
                    Studies show writing out calculations by hand increases retention by 73%. Switch to the Scratchpad tab on the right to sketch diagrams, free-body drawings, and algebraic steps.
                </p>
            </div>

            <div class="desk-formula-card" style="border-left: 4px solid #f59e0b;">
                <h4 style="margin: 0 0 6px 0; font-size: 15px; color: #f59e0b;">🔥 Maintain Your Streak Habit</h4>
                <p style="margin: 0; font-size: 13.5px; color: var(--text-muted); line-height: 1.5;">
                    Completing even 1 session per day locks in your streak status. Challenge a friend to a 1v1 study duel from the home screen to keep each other accountable!
                </p>
            </div>
        </div>
    `;
}

/* ========================================================
   RIGHT PANEL RENDERERS: PRACTICE QUIZ, SCRATCHPAD, NOTES
======================================================== */

function renderDeskPracticeWrapper(container) {
    const rightActions = document.getElementById('desk-right-actions');
    if (rightActions) rightActions.innerHTML = '';
    container.innerHTML = `<div id="desk-practice-container" style="display: flex; flex-direction: column; height: 100%;"></div>`;
}

async function loadDeskPracticeQuestions() {
    const container = document.getElementById('desk-practice-container');
    if (!container) return;
    
    container.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="loading-spinner"></div>
            <p style="margin-top: 12px; color: var(--text-muted); font-size: 13.5px;">Loading ${deskState.grade} ${deskState.subject} practice bank...</p>
        </div>
    `;

    let questions = [];
    try {
        const res = await fetch(`/api/practice?grade=${encodeURIComponent(deskState.grade)}&subject=${encodeURIComponent(deskState.subject)}`);
        const data = await res.json();
        questions = data.questions || [];
    } catch(e) {}

    if (questions.length === 0) {
        try {
            const raw = localStorage.getItem('pel_offline_questions');
            if (raw) {
                const all = JSON.parse(raw);
                const clean = s => (s || '').toLowerCase().replace(/[\s_-]+/g, '');
                questions = all.filter(q => clean(q.grade) === clean(deskState.grade) && clean(q.subject) === clean(deskState.subject));
            }
        } catch(e) {}
    }

    deskState.questions = questions;
    deskState.currentQIndex = 0;
    deskState.selectedOption = null;
    deskState.isChecked = false;

    renderDeskPracticeQuestion();
}

function renderDeskPracticeQuestion() {
    const container = document.getElementById('desk-practice-container');
    if (!container) return;

    if (!deskState.questions || deskState.questions.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; margin: auto;">
                <div style="font-size: 40px; margin-bottom: 12px;">📝</div>
                <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main);">No Questions Available Yet</h4>
                <p style="font-size: 13px; color: var(--text-muted); max-width: 320px; margin: 8px auto 16px auto;">
                    We are currently digitizing past questions for ${deskState.grade} ${deskState.subject}.
                </p>
                <button class="btn-secondary" style="font-size: 13px;" onclick="setDeskRightTab('notes')">
                    Open Study Notes Instead
                </button>
            </div>
        `;
        return;
    }

    const q = deskState.questions[deskState.currentQIndex];
    const total = deskState.questions.length;
    const progress = Math.round(((deskState.currentQIndex + 1) / total) * 100);
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const qText = q.question || q.questionText || 'Practice Question';
    const correctIdx = Number(q.correctAnswer);

    container.innerHTML = `
        <!-- Duolingo Shiny Progress Bar -->
        <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 12px; font-weight: 800; color: #1cb0f6; text-transform: uppercase;">Question ${deskState.currentQIndex + 1} of ${total}</span>
                <span style="font-size: 12px; font-weight: 800; color: #22c55e;">Score: ${deskState.score}</span>
            </div>
            <div class="duo-progress-container" style="height: 12px;">
                <div class="duo-progress-fill" style="width: ${progress}%;"></div>
            </div>
        </div>

        <!-- Question Text -->
        <div style="margin-bottom: 20px;">
            <h3 style="font-size: 16.5px; font-weight: 700; color: var(--text-main); line-height: 1.55; margin-bottom: 8px;">
                ${qText}
            </h3>
        </div>

        <!-- Duolingo 3D Tactile Option Cards -->
        <div class="options-grid" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
            ${(q.options || []).map((opt, idx) => {
                const letter = letters[idx] || (idx + 1);
                const isSelected = deskState.selectedOption === idx;
                let optClass = 'option-btn';
                if (isSelected) optClass += ' selected';
                if (deskState.isChecked) {
                    if (idx === correctIdx) {
                        optClass += ' correct';
                    } else if (isSelected) {
                        optClass += ' incorrect';
                    }
                }

                return `
                    <button type="button" class="${optClass}" onclick="selectDeskOption(${idx})" ${deskState.isChecked ? 'disabled' : ''} style="cursor: pointer; width: 100%;">
                        <div class="option-letter">${letter}</div>
                        <span style="font-size: 14.5px; text-align: left; flex: 1; font-weight: 600;">${opt}</span>
                        ${deskState.isChecked && idx === correctIdx ? '<span style="font-size: 18px; margin-left: auto;">✅</span>' : ''}
                        ${deskState.isChecked && isSelected && idx !== correctIdx ? '<span style="font-size: 18px; margin-left: auto;">❌</span>' : ''}
                    </button>
                `;
            }).join('')}
        </div>

        <!-- Explanation & Feedback (if checked) -->
        ${deskState.isChecked ? `
            <div class="explanation-box" style="margin-top: 10px; margin-bottom: 16px;">
                <div class="explanation-title" style="display: flex; align-items: center; gap: 7px; font-weight: 800; font-size: 14px; color: ${Number(deskState.selectedOption) === correctIdx ? '#58cc02' : '#ea2b2b'};">
                    ${Number(deskState.selectedOption) === correctIdx ? `${uiIcon('checkCircle', 16)} Correct Answer!` : `💡 Correct Answer: Option ${letters[correctIdx] || (correctIdx + 1)}`}
                </div>
                <div class="explanation-text" style="font-size: 13.5px; margin-top: 6px; line-height: 1.5; color: var(--text-main);">
                    ${q.explanation || ('The correct option is ' + (letters[correctIdx] || (correctIdx + 1)) + ': ' + q.options[correctIdx])}
                </div>
            </div>
        ` : ''}

        <!-- Ask AI Study Coach Assistant Bar -->
        <div style="display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap;">
            <button type="button" class="desk-tool-btn" style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.4); background: rgba(56, 189, 248, 0.08);" onclick="askAiAboutCurrentQuestion()">
                🤖 Ask Archie to Explain Step-by-Step
            </button>
            <button type="button" class="desk-tool-btn" style="color: #f59e0b; border-color: rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.08);" onclick="askAiForHint()">
                🔍 Get Socratic Hint
            </button>
        </div>

        <!-- Bottom Duolingo Action Button -->
        <div style="margin-top: auto; padding-top: 10px;">
            ${!deskState.isChecked ? `
                <button type="button" class="duolingo-btn-action" style="width: 100%; min-width: 0; padding: 14px 20px; font-size: 15px; font-weight: 800; border-radius: 14px;" ${deskState.selectedOption === null ? 'disabled' : ''} onclick="checkDeskAnswer()">
                    CHECK ANSWER
                </button>
            ` : `
                <button type="button" class="duolingo-btn-action" style="width: 100%; min-width: 0; padding: 14px 20px; font-size: 15px; font-weight: 800; border-radius: 14px; background: ${Number(deskState.selectedOption) === correctIdx ? '#58cc02' : '#1cb0f6'}; box-shadow: 0 4px 0 ${Number(deskState.selectedOption) === correctIdx ? '#46a302' : '#0284c7'};" onclick="nextDeskQuestion()">
                    ${deskState.currentQIndex + 1 < total ? 'CONTINUE →' : 'FINISH PRACTICE 🎉'}
                </button>
            `}
        </div>
    `;
}

function selectDeskOption(index) {
    if (deskState.isChecked) return;
    deskState.selectedOption = index;
    renderDeskPracticeQuestion();
}

function checkDeskAnswer() {
    if (deskState.selectedOption === null || deskState.isChecked) return;
    const q = deskState.questions[deskState.currentQIndex];
    deskState.isChecked = true;
    
    const correctIdx = Number(q.correctAnswer);
    if (Number(deskState.selectedOption) === correctIdx) {
        deskState.score++;
        playDeskChime('correct');
        showToast('🎯 Spot on! Keep the momentum going!', 'success');
    } else {
        showToast('Not quite, but reviewing mistakes is how you master it!', 'info');
    }
    
    renderDeskPracticeQuestion();
}

function nextDeskQuestion() {
    if (deskState.currentQIndex + 1 < deskState.questions.length) {
        deskState.currentQIndex++;
        deskState.selectedOption = null;
        deskState.isChecked = false;
        renderDeskPracticeQuestion();
    } else {
        // Finished set!
        showToast(`🏆 Practice complete! You scored ${deskState.score} out of ${deskState.questions.length}!`, 'success');
        recordStudyStreakActivity();
        if (typeof showSessionEndStreakCelebration === 'function') {
            showSessionEndStreakCelebration();
        }
        deskState.currentQIndex = 0;
        deskState.selectedOption = null;
        deskState.isChecked = false;
        renderDeskPracticeQuestion();
    }
}

/* ========================================================
   AI STUDY COACH / CHATBOT ("ARCHIE")
======================================================== */

let deskAiMessages = [];

function initDeskAiChat() {
    if (deskAiMessages.length === 0) {
        deskAiMessages = [
            {
                sender: 'bot',
                text: `👋 Hey! I'm <strong>Archie</strong>, your AI Study Coach for <strong>${deskState.grade} ${deskState.subject}</strong>.<br><br>I'm here to keep you locked in and make sure you actually master this material. Don't study passively—ask me to test you, break down a question step-by-step, or explain a difficult formula.<br><br>What topic or problem should we conquer right now?`,
                time: 'Just now'
            }
        ];
    }
}

function renderDeskAiWrapper(container) {
    initDeskAiChat();
    const rightActions = document.getElementById('desk-right-actions');
    if (rightActions) {
        rightActions.innerHTML = `
            <button class="desk-tool-btn" onclick="clearDeskAiChat()" title="Reset chat with AI Coach">
                ${uiIcon('trash', 12)} Reset Coach
            </button>
        `;
    }

    container.innerHTML = `
        <div class="desk-ai-container">
            <div class="desk-ai-header-status">
                <div class="desk-ai-coach-badge">
                    <div class="desk-ai-avatar">🤖</div>
                    <div>
                        <div style="font-size: 13.5px; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 6px;">
                            Archie <span style="font-size: 10px; font-weight: 700; color: #1cb0f6; background: rgba(28, 176, 246, 0.12); padding: 1px 6px; border-radius: 9999px;">AI Study Coach</span>
                        </div>
                        <div style="font-size: 11px; color: var(--text-muted); display: flex; align-items: center; gap: 4px;">
                            <span class="desk-ai-status-pulse"></span> Active for ${deskState.grade} • ${deskState.subject}
                        </div>
                    </div>
                </div>
                <div style="font-size: 11.5px; color: #f59e0b; font-weight: 700;">
                    🔥 Streak Booster Active
                </div>
            </div>

            <!-- Messages Stream -->
            <div class="desk-ai-messages" id="desk-ai-msg-list">
                <!-- Rendered dynamically -->
            </div>

            <!-- Quick Study Prompt Chips -->
            <div class="desk-ai-chips-wrapper">
                <button class="desk-ai-chip" onclick="askAiAboutCurrentQuestion()">
                    💡 Explain Current Question
                </button>
                <button class="desk-ai-chip" onclick="askAiForHint()">
                    🔍 Socratic Hint
                </button>
                <button class="desk-ai-chip" onclick="sendDeskAiMessage('Quiz me on a high-yield concept from this subject!')">
                    ⚡ Quiz Me
                </button>
                <button class="desk-ai-chip" onclick="sendDeskAiMessage('What are the top 3 formulas I must know for exams in this subject?')">
                    📐 Top 3 Formulas
                </button>
                <button class="desk-ai-chip" onclick="sendDeskAiMessage('Give me a 25-minute Pomodoro study plan to stay 100% focused.')">
                    🎯 25m Focus Plan
                </button>
            </div>

            <!-- Chat Input Bar -->
            <form class="desk-ai-input-bar" onsubmit="event.preventDefault(); sendDeskAiMessage();">
                <input type="text" id="desk-ai-text-input" class="desk-ai-input" placeholder="Ask Archie anything or request step-by-step guidance..." autocomplete="off">
                <button type="submit" class="desk-ai-send-btn" id="desk-ai-send-btn">
                    <span>Send</span> ${uiIcon('export', 13)}
                </button>
            </form>
        </div>
    `;

    renderDeskAiMessages();
}

function renderDeskAiMessages() {
    const list = document.getElementById('desk-ai-msg-list');
    if (!list) return;

    list.innerHTML = deskAiMessages.map(m => `
        <div class="desk-ai-msg ${m.sender}">
            <div class="desk-ai-bubble">
                ${m.text}
            </div>
        </div>
    `).join('');

    list.scrollTop = list.scrollHeight;
}

async function sendDeskAiMessage(customPrompt = null) {
    const input = document.getElementById('desk-ai-text-input');
    const sendBtn = document.getElementById('desk-ai-send-btn');
    const text = customPrompt || (input ? input.value.trim() : '');
    if (!text) return;

    if (input && !customPrompt) input.value = '';

    // Add user message
    deskAiMessages.push({
        sender: 'user',
        text: escapeQuotes(text).replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
        time: 'Just now'
    });
    renderDeskAiMessages();

    // Show typing indicator
    const list = document.getElementById('desk-ai-msg-list');
    if (list) {
        const typingEl = document.createElement('div');
        typingEl.className = 'desk-ai-msg bot';
        typingEl.id = 'desk-ai-typing-indicator';
        typingEl.innerHTML = `
            <div class="desk-ai-bubble" style="padding: 8px 14px;">
                <div class="desk-ai-typing">
                    <span class="desk-ai-typing-dot"></span>
                    <span class="desk-ai-typing-dot"></span>
                    <span class="desk-ai-typing-dot"></span>
                </div>
            </div>
        `;
        list.appendChild(typingEl);
        list.scrollTop = list.scrollHeight;
    }

    if (sendBtn) sendBtn.disabled = true;

    const currentQ = (deskState.questions && deskState.questions.length > deskState.currentQIndex)
        ? deskState.questions[deskState.currentQIndex]
        : null;

    let botReply = '';

    try {
        const res = await fetch('/api/ai-tutor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: text,
                grade: deskState.grade,
                subject: deskState.subject,
                currentQuestion: currentQ
            })
        });

        if (res.ok) {
            const data = await res.json();
            if (data.reply) {
                botReply = data.reply
                    .replace(/\n\n/g, '<br><br>')
                    .replace(/\n/g, '<br>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>');
            }
        }
    } catch (e) {}

    // Seamless Intelligent Fallback if API key is not present or user is offline
    if (!botReply) {
        botReply = generateLocalAiStudyResponse(text, deskState.grade, deskState.subject, currentQ);
    }

    // Remove typing indicator
    const indicator = document.getElementById('desk-ai-typing-indicator');
    if (indicator) indicator.remove();
    if (sendBtn) sendBtn.disabled = false;

    deskAiMessages.push({
        sender: 'bot',
        text: botReply,
        time: 'Just now'
    });

    renderDeskAiMessages();
    playDeskChime('correct');
}

function askAiAboutCurrentQuestion() {
    setDeskRightTab('ai');
    const currentQ = (deskState.questions && deskState.questions.length > deskState.currentQIndex)
        ? deskState.questions[deskState.currentQIndex]
        : null;

    if (currentQ) {
        const qText = currentQ.question || currentQ.questionText || '';
        sendDeskAiMessage(`Can you explain Question #${deskState.currentQIndex + 1} ("${qText.slice(0, 60)}...") step-by-step and show me the concept to solve it?`);
    } else {
        sendDeskAiMessage('Can you break down the core exam concepts for this subject?');
    }
}

function askAiForHint() {
    setDeskRightTab('ai');
    const currentQ = (deskState.questions && deskState.questions.length > deskState.currentQIndex)
        ? deskState.questions[deskState.currentQIndex]
        : null;

    if (currentQ) {
        sendDeskAiMessage(`Give me a Socratic hint for Question #${deskState.currentQIndex + 1} without spoiling the final answer!`);
    } else {
        sendDeskAiMessage('Give me a high-yield study hint for my current subject.');
    }
}

function clearDeskAiChat() {
    deskAiMessages = [];
    initDeskAiChat();
    renderDeskAiMessages();
    showToast('AI Study Coach conversation reset', 'info');
}

function generateLocalAiStudyResponse(query, grade, subject, currentQ) {
    const qLower = query.toLowerCase();
    const currentQText = currentQ ? (currentQ.question || currentQ.questionText || '') : '';

    // 1. Current Question Socratic Breakdown
    if ((qLower.includes('explain') || qLower.includes('question') || qLower.includes('step')) && currentQ) {
        return `
            <strong>🎯 Step-by-Step Breakdown for Question #${deskState.currentQIndex + 1}:</strong><br><br>
            <strong>Problem:</strong> <em>"${currentQText}"</em><br><br>
            <strong>1. Identify What's Being Asked:</strong><br>
            Focus on the primary variable or relationship. What fundamental law or definition in <strong>${subject}</strong> connects these quantities?<br><br>
            <strong>2. Core Concept:</strong><br>
            ${currentQ.explanation ? currentQ.explanation : `In ${grade} ${subject}, this tests standard syllabus application. Break the problem into given values vs unknown values.`}<br><br>
            <strong>3. How to Eliminate Options:</strong><br>
            Check the units and extreme values first. Eliminate any option that violates conservation laws or magnitude checks.<br><br>
            <strong>💡 Ready to try?</strong> Switch to the <strong>Practice Quiz</strong> tab and choose your answer!
        `;
    }

    // 2. Hint Request (No Spoilers)
    if (qLower.includes('hint') && currentQ) {
        return `
            <strong>🔍 Socratic Hint for Question #${deskState.currentQIndex + 1}:</strong><br><br>
            Don't look at the final answer choices yet. Ask yourself:<br>
            • <em>What happens if the main variable increases or decreases?</em><br>
            • <em>Can you write down the governing formula on paper first?</em><br><br>
            ${currentQ.explanation ? `<strong>Clue:</strong> Look closely at the connection to: <em>${currentQ.explanation.split('.')[0]}.</em>` : 'Check your Formula Sheets tab on the left to see the matching equation!'}
            <br><br>
            Give it another shot on the quiz tab!
        `;
    }

    // 3. Quiz Me / Practice Drills
    if (qLower.includes('quiz') || qLower.includes('test me')) {
        const drills = {
            'Mathematics': 'Solve this quick recall: If f(x) = x³ - 3x, at what values of x does f(x) have critical points (where f\'(x) = 0)? Reply with your steps!',
            'Physics': 'Quick concept check: An object is thrown straight up. At its highest point, what are its velocity and its acceleration? Tell me both!',
            'Chemistry': 'Recall drill: In an exothermic equilibrium reaction (ΔH < 0), what happens to the equilibrium position if you increase the temperature? Le Chatelier\'s principle in action!',
            'Biology': 'Cell biology check: In which phase of meiosis does crossing over (genetic recombination) occur? Reply with the sub-phase!'
        };
        const drill = drills[subject] || `Quick drill for ${grade} ${subject}: What is the single most important definition or theorem tested in this unit? Type your answer!`;
        return `
            <strong>⚡ Active Recall Challenge:</strong><br><br>
            ${drill}<br><br>
            <em>Type your answer below and let's see how solid your recall is!</em>
        `;
    }

    // 4. Formulas Request
    if (qLower.includes('formula')) {
        return `
            <strong>📐 Master Formulas for ${grade} ${subject}:</strong><br><br>
            Check the <strong>Formulas</strong> tab on your left panel to see the full verified sheet! Here are the 2 crucial rules examiners look for:<br><br>
            <strong>1. Always Check SI Units:</strong> Never plug values directly without converting km/h to m/s, or cm to m.<br>
            <strong>2. Rearrange Before Calculating:</strong> Solve for the unknown variable algebraically before plugging in numbers to avoid arithmetic errors.<br><br>
            Would you like me to walk you through a specific equation?
        `;
    }

    // 5. Pomodoro & Focus Coaching
    if (qLower.includes('pomodoro') || qLower.includes('focus') || qLower.includes('plan') || qLower.includes('tired')) {
        return `
            <strong>🎯 Your 25-Minute Focus Protocol:</strong><br><br>
            1. <strong>Start the Timer:</strong> Click <strong>START</strong> on the orange timer above (25:00).<br>
            2. <strong>Goal:</strong> Complete 5 to 7 past questions on the Practice Quiz tab without switching browser tabs.<br>
            3. <strong>If Stuck:</strong> Tap <em>"Ask AI Coach"</em> immediately rather than staring blankly.<br>
            4. <strong>Reward:</strong> When the 25 minutes ding, your streak extends and you earn 50 XP!<br><br>
            You are completely capable of mastering this. Let's start right now!
        `;
    }

    // 6. General Encouragement & Subject Explanation
    return `
        <strong>📚 Archie's Study Guidance:</strong><br><br>
        Great question regarding <strong>${subject}</strong>!<br><br>
        • In ${grade}, examiners test whether you can <strong>apply concepts to new scenarios</strong>, not just memorize raw definitions.<br>
        • Try working through the past exam questions on the left or interactive quiz on the right.<br><br>
        What specific problem from the exam paper would you like us to solve together?
    `;
}

/* ========================================================
   STUDY NOTES (AUTO-SAVING PER GRADE & SUBJECT)
======================================================== */

function renderDeskNotesWrapper(container) {
    const rightActions = document.getElementById('desk-right-actions');
    const unitList = getExamUnitNotesList(deskState.grade, deskState.subject);
    const currentUnit = unitList[deskState.selectedUnitIndex] || unitList[0];
    const unitTitleShort = currentUnit ? currentUnit.title.split(':')[0] : 'Unit';

    if (rightActions) {
        rightActions.innerHTML = `
            <button class="desk-tool-btn" onclick="postPersonalNotesToTopic()" title="Share these notes to the public unit topic on the left" style="color: #58cc02; border-color: rgba(88, 204, 2, 0.4);">
                💬 Share to ${unitTitleShort} ↗
            </button>
            <button class="desk-tool-btn" onclick="copyDeskNotes()">
                ${uiIcon('check', 12)} Copy
            </button>
        `;
    }

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <h4 style="margin: 0; font-size: 14px; font-weight: 700;">Personal Notes for ${deskState.grade} • ${deskState.subject}</h4>
            <span id="desk-notes-save-status" style="font-size: 11.5px; color: var(--text-muted);">Auto-saves as you type</span>
        </div>
        <textarea id="desk-notes-input" class="desk-notes-area" style="flex: 1; min-height: 380px;" oninput="saveDeskNotes()" placeholder="Type your personal summary, formula derivations, and revision notes here..."></textarea>
    `;
}

function saveDeskNotes() {
    const textarea = document.getElementById('desk-notes-input');
    if (!textarea) return;
    const key = `pel_desk_notes_${deskState.grade}_${deskState.subject}`;
    localStorage.setItem(key, textarea.value);
    const indicator = document.getElementById('desk-notes-save-status');
    if (indicator) {
        indicator.textContent = '✅ Saved';
        setTimeout(() => {
            if (indicator) indicator.textContent = 'Auto-saves as you type';
        }, 1500);
    }
}

function loadDeskNotes() {
    const textarea = document.getElementById('desk-notes-input');
    if (!textarea) return;
    const key = `pel_desk_notes_${deskState.grade}_${deskState.subject}`;
    textarea.value = localStorage.getItem(key) || '';
}

function copyDeskNotes() {
    const textarea = document.getElementById('desk-notes-input');
    if (!textarea || !textarea.value) {
        showToast('No notes to copy yet', 'info');
        return;
    }
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textarea.value).then(() => {
            showToast('Notes copied to clipboard!', 'success');
        });
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', initApp);
