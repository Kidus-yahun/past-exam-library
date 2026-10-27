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
        activeTab: 'exams', // 'exams', 'categories', 'stats'
        selectedGradeForSubjects: 'Grade12',
        examFilter: {
            grade: '',
            semester: '',
            search: ''
        }
    }
};

const app = document.getElementById('app');
const headerNav = document.getElementById('header-nav');
const modalContainer = document.getElementById('modal-container');
const toastContainer = document.getElementById('toast-container');

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

    // Determine initial view
    if (state.user) {
        if (state.user.role === 'admin') {
            setView('admin');
        } else {
            setView('library');
        }
    } else {
        // As requested: "making the site a login page 1st"
        setView('login');
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
    }
}

function navigateToHome() {
    if (state.user) {
        if (state.user.role === 'admin' && state.currentView === 'admin') {
            showAdminDashboard();
        } else {
            showLibraryHome();
        }
    } else {
        setView('login');
    }
}

/* ========================================================
   TOASTS & MODALS
======================================================== */

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ');
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
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
            <button id="pwa-install-btn" class="pwa-install-btn" style="display: ${window._deferredPwaPrompt ? 'inline-flex' : 'none'};" onclick="promptPwaInstall()">
                📲 Install App
            </button>
        </div>
    `;

    if (!state.user) {
        headerNav.innerHTML = `
            ${pwaControls}
            <button class="nav-btn active" onclick="setView('login')">
                Sign in / Register
            </button>
        `;
        return;
    }

    const isAdmin = state.user.role === 'admin';
    const isLibraryActive = state.currentView === 'library';
    const isAdminActive = state.currentView === 'admin';

    headerNav.innerHTML = `
        ${pwaControls}
        <div class="user-badge">
            <span>${state.user.username}</span>
            <span class="role-pill ${isAdmin ? 'admin' : ''}">${state.user.role}</span>
        </div>

        <button class="nav-btn ${isLibraryActive ? 'active' : ''}" onclick="setView('library')">
            Exam library
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
                            <label>Full Name</label>
                            <input type="text" id="reg-fullname" placeholder="John Doe">
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
                    <div class="stat-icon">📄</div>
                    <div>
                        <div class="stat-value" id="stat-exams">...</div>
                        <div class="stat-label">Total Exam Papers</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🎓</div>
                    <div>
                        <div class="stat-value" id="stat-grades">...</div>
                        <div class="stat-label">Grades & Categories</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📚</div>
                    <div>
                        <div class="stat-value" id="stat-subjects">...</div>
                        <div class="stat-label">Total Subjects</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">👥</div>
                    <div>
                        <div class="stat-value" id="stat-users">...</div>
                        <div class="stat-label">Registered Users</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🎯</div>
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
                    📄 Manage Exam Papers
                </button>
                <button class="admin-tab ${activeTab === 'questions' ? 'active' : ''}" 
                        onclick="switchAdminTab('questions')">
                    🎯 Practice Questions
                </button>
                <button class="admin-tab ${activeTab === 'categories' ? 'active' : ''}" 
                        onclick="switchAdminTab('categories')">
                    🗂️ Categories & Subjects
                </button>
                <button class="admin-tab ${activeTab === 'overview' ? 'active' : ''}" 
                        onclick="switchAdminTab('overview')">
                    📊 System Overview
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
    } else if (activeTab === 'categories') {
        renderAdminCategoriesTab();
    } else if (activeTab === 'overview') {
        renderAdminOverviewTab();
    }
}

function switchAdminTab(tab) {
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
        container.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                <div style="font-size: 36px; margin-bottom: 10px;">📄</div>
                <h4>No exam papers found</h4>
                <p>Click the "+ Upload Paper" button to add your first examination paper.</p>
            </div>
        `;
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
                                    <button class="btn-icon" onclick="previewExamDoc('${exam.id}')" title="Preview PDF">
                                        👁️ View
                                    </button>
                                    <a href="${exam.fileUrl}" target="_blank" download class="btn-icon" title="Download">
                                        ⬇️
                                    </a>
                                    <button class="btn-icon danger" onclick="confirmDeleteExam('${exam.id}', '${escapeQuotes(exam.title)}')" title="Delete">
                                        🗑️
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
                    <div class="file-dropzone-icon">📄</div>
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
                            <button class="btn-icon danger" onclick="confirmDeleteGrade('${g.id}', '${g.name}')" title="Delete Grade">
                                🗑️
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
                                <span>📄 ${sub}</span>
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
        <p style="margin-top: 10px; color: var(--danger); font-size: 13px;">
            ⚠️ This will also remove all subjects and examination papers associated with ${gradeName}!
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
        container.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                <div style="font-size: 36px; margin-bottom: 10px;">🎯</div>
                <h4>No practice questions found</h4>
                <p>Click "+ Add Question" to create your first interactive multiple-choice question.</p>
            </div>
        `;
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
                                ${q.explanation ? `<div style="font-size: 12px; color: var(--text-dim); margin-top: 4px;">💡 ${q.explanation.substring(0, 70)}...</div>` : ''}
                            </td>
                            <td><span class="badge badge-blue">${q.grade}</span></td>
                            <td><span class="badge badge-green">${q.subject}</span></td>
                            <td>${(q.options || []).length} Options</td>
                            <td><span class="badge badge-amber">${letters[q.correctAnswer] || (q.correctAnswer + 1)}</span></td>
                            <td style="text-align: right;">
                                <button class="btn-icon danger" onclick="confirmDeleteQuestion('${q.id}', '${escapeQuotes(q.question.substring(0, 40))}')" title="Delete Question">
                                    🗑️
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
   3. STUDENT / PUBLIC LIBRARY VIEW
======================================================== */

function showLibraryHome() {
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

        <div id="library-content-container">
            <div class="page-title">
                <h2>Select your grade</h2>
                <p>Choose a grade to browse its past examinations.</p>
            </div>

            <button class="btn-secondary" style="margin-bottom: 18px;" onclick="showPracticeGradeCatalog()">
                🎯 Browse practice questions by grade and subject
            </button>

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

async function showPracticeGradeCatalog() {
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
        <button class="back-button" onclick="showLibraryHome()">← Back to grades</button>
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

async function showPracticeSubjectCatalog(gradeId) {
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
        <button class="back-button" onclick="showPracticeGradeCatalog()">← Back to grades</button>
        <div class="page-title">
            <h2>${grade ? grade.name : gradeId} practice</h2>
            <p>Select a subject to practice authentic school examination questions.</p>
        </div>
        <div class="card-grid">
            ${subjects.map(subject => {
                const count = countsBySubject[subject] || 0;
                return `
                    <button class="card subject-card" style="text-align: left; color: inherit; font: inherit; ${count ? '' : 'opacity: .55;'}" ${count ? `onclick="startPracticeSession('${gradeId}', 'Practice Bank', 'All', '${escapeQuotes(subject)}', 'practice', '${escapeQuotes(`${grade ? grade.name : gradeId} ${subject} Practice`)}', '', () => showPracticeSubjectCatalog('${gradeId}'))"` : 'disabled'}>
                        <div class="subject-icon">🎯</div>
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
            container.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                    <div style="font-size: 36px; margin-bottom: 10px;">🔍</div>
                    <h3>No examination papers found for "${trimmed}"</h3>
                    <p>Try searching for a different subject or grade.</p>
                </div>
            `;
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
                        <div class="subject-icon">📄</div>
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

function showGrade(gradeId) {
    state.library.grade = gradeId;
    const gradeObj = state.categories.grades.find(g => g.id === gradeId);
    const gradeName = gradeObj ? gradeObj.name : gradeId;

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
        <button class="back-button" onclick="showLibraryHome()">
            ← Back to grades
        </button>

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

function showSemester(gradeId, semester) {
    state.library.semester = semester;

    app.innerHTML = `
        <button class="back-button" onclick="showGrade('${gradeId}')">
            ← Back to semesters
        </button>

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

function showExamType(gradeId, semester, examType) {
    state.library.examType = examType;
    const subjects = state.categories.subjects[gradeId] || [];

    app.innerHTML = `
        <button class="back-button" onclick="showSemester('${gradeId}', '${semester}')">
            ← Back to exam types
        </button>

        <div class="page-title">
            <h2>${examType}</h2>
            <p>${gradeId} • ${semester}</p>
        </div>

        <div class="card-grid">
            ${subjects.map(subject => `
                <div class="card subject-card" onclick="openSubjectExam('${gradeId}', '${semester}', '${examType}', '${escapeQuotes(subject)}')">
                    <div class="subject-icon">📄</div>
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

function showNationalExamCategory(category) {
    const subjects = state.categories.grade12NationalSubjects || [
        "English", "Mathematics", "Aptitude", "Physics", "Chemistry", "Biology"
    ];

    app.innerHTML = `
        <button class="back-button" onclick="showGrade('Grade12')">
            ← Back to Grade 12
        </button>

        <div class="page-title">
            <h2>${category === 'Pretest' ? 'Pre-test' : 'Model Exam'}</h2>
            <p>Grade 12 National Assessment</p>
        </div>

        <div class="card-grid">
            ${subjects.map(subject => `
                <div class="card subject-card" onclick="openSubjectExam('Grade12', '${category}', '${category}', '${escapeQuotes(subject)}')">
                    <div class="subject-icon">📄</div>
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

async function showExamHub(grade, semester, examType, subject, filePath, examTitle, backFn) {
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
        <button class="back-button" onclick="window._lastBackFn ? window._lastBackFn() : showLibraryHome()">
            ← Back to subjects
        </button>

        <div class="page-title">
            <h2>${subject}</h2>
            <p>${grade} • ${semester} • ${examType}</p>
        </div>

        <div class="exam-hub-grid">
            <!-- Left Card: Interactive Practice -->
            <div class="hub-card ${questionCount > 0 ? 'hub-card-featured' : ''}" style="${questionCount === 0 ? 'border: 1px dashed var(--border-glass);' : ''}">
                ${questionCount > 0 ? `
                    <span class="hub-badge hub-badge-interactive">✨ 100% Authentic Paper Questions</span>
                    <h3 style="font-size: 24px; color: #ffffff; margin-bottom: 8px;">Online Practice Mode</h3>
                    <p style="color: var(--text-muted); font-size: 14.5px; line-height: 1.6;">
                        Practice real examination questions transcribed directly from the physical school paper with instant feedback and score reports.
                    </p>

                    <div class="mode-selector">
                        <div class="mode-option ${selectedHubMode === 'practice' ? 'active' : ''}" id="mode-opt-practice" onclick="setHubMode('practice')">
                            <div class="mode-radio"></div>
                            <div>
                                <div style="font-weight: 700; color: #ffffff; font-size: 15px;">⚡ Instant Practice Mode</div>
                                <div style="font-size: 12.5px; color: var(--text-muted); margin-top: 2px;">
                                    Check answers immediately after each question with detailed explanations.
                                </div>
                            </div>
                        </div>

                        <div class="mode-option ${selectedHubMode === 'timed' ? 'active' : ''}" id="mode-opt-timed" onclick="setHubMode('timed')">
                            <div class="mode-radio"></div>
                            <div>
                                <div style="font-weight: 700; color: #ffffff; font-size: 15px;">⏱️ Timed Exam Simulation</div>
                                <div style="font-size: 12.5px; color: var(--text-muted); margin-top: 2px;">
                                    Real test conditions with live countdown timer and verified final score report.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 18px; border-top: 1px solid var(--border-glass);">
                        <span style="font-size: 13px; color: #c084fc; font-weight: 600;">
                            📚 ${questionCount} Authentic Questions Transcribed
                        </span>
                        <button class="btn-primary" style="width: auto; padding: 12px 24px;" 
                                onclick="startPracticeSession('${grade}', '${semester}', '${examType}', '${escapeQuotes(subject)}', selectedHubMode, '${escapeQuotes(examTitle)}', '${filePath}', window._lastBackFn)">
                            Start Practicing Now (${questionCount} Qs) →
                        </button>
                    </div>
                ` : `
                    <span class="hub-badge" style="background: rgba(148, 163, 184, 0.15); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.25);">📋 Archive Paper</span>
                    <h3 style="font-size: 22px; color: #ffffff; margin-bottom: 8px;">Interactive Mode In Transcription</h3>
                    <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
                        To maintain strict 100% exam fidelity, questions for this paper are being transcribed directly from school physical archives. No AI-generated or synthetic questions are published.
                    </p>
                    <div style="background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 12px; padding: 14px; margin-bottom: 20px;">
                        <div style="font-weight: 600; color: #a5b4fc; font-size: 13.5px; margin-bottom: 4px;">📖 Official PDF Ready for Study</div>
                        <div style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5;">
                            You can view the full scanned exam paper with questions and diagrams using the Exam Document preview below.
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 18px; border-top: 1px solid var(--border-glass);">
                        <span style="font-size: 12.5px; color: #94a3b8;">
                            🔒 Strict Paper Fidelity Policy
                        </span>
                        <span style="font-size: 12.5px; color: #818cf8; font-weight: 600;">
                            See Document Options ↓
                        </span>
                    </div>
                `}
            </div>

            <!-- Right Card: PDF Download & Preview -->
            <div class="hub-card">
                <span class="hub-badge hub-badge-pdf">📄 Original Paper</span>
                <h3 style="font-size: 22px; color: #ffffff; margin-bottom: 8px;">Exam Document (PDF)</h3>
                <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
                    Download the official past paper for offline study, or preview the complete document online.
                </p>

                <div style="display: flex; flex-direction: column; gap: 12px; margin-top: auto;">
                    <a href="${filePath}" target="_blank" download class="btn-primary" style="text-decoration: none; text-align: center;">
                        ⬇️ Download Official PDF Paper
                    </a>
                    <button class="btn-secondary" style="justify-content: center; padding: 12px;" 
                            onclick="renderExamViewer('${escapeQuotes(examTitle)}', '${grade} • ${semester} • ${examType}', '${filePath}', () => showExamHub('${grade}', '${semester}', '${examType}', '${escapeQuotes(subject)}', '${filePath}', '${escapeQuotes(examTitle)}', window._lastBackFn))">
                        👁️ Preview PDF Document
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
                        <div class="quiz-timer-pill" id="quiz-timer-display">
                            ⏱️ ${formatTime(currentQuiz.timeRemaining)}
                        </div>
                    ` : `
                        <span class="hub-badge hub-badge-interactive" style="margin: 0;">⚡ Practice Mode</span>
                    `}

                    <a href="${currentQuiz.filePath}" target="_blank" download class="btn-secondary" style="padding: 7px 12px; font-size: 13px;" title="Download PDF">
                        ⬇️ PDF
                    </a>

                    ${isTimed ? `
                        <button class="btn-secondary" style="padding: 7px 12px; font-size: 13px; color: ${isFlagged ? '#f59e0b' : 'var(--text-muted)'};" onclick="toggleQuizFlag('${q.id}')">
                            ${isFlagged ? '🚩 Flagged' : '🏳️ Flag'}
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
                        <div class="explanation-title">
                            ${selected === q.correctAnswer ? '🎉 Correct Answer!' : '💡 Explanation'}
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
                            <button class="btn-primary" style="width: auto; padding: 10px 22px;" onclick="checkCurrentAnswer('${q.id}')" ${selected === undefined ? 'disabled style="opacity: 0.5;"' : ''}>
                                Check Answer ✓
                            </button>
                        ` : ''}

                        ${currentQuiz.currentIndex < total - 1 ? `
                            <button class="btn-primary" style="width: auto; padding: 10px 22px;" onclick="nextQuizQuestion()">
                                Next Question →
                            </button>
                        ` : `
                            <button class="btn-primary" style="width: auto; padding: 10px 22px; background: linear-gradient(135deg, #059669, #10b981);" onclick="finishQuiz()">
                                View Results & Score 🏆
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
        ${answeredCount < total ? `<p style="color: #f59e0b; margin-top: 8px; font-size: 13px;">⚠️ You have ${total - answeredCount} unanswered questions.</p>` : ''}
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
        el.innerHTML = `⏱️ ${formatTime(currentQuiz.timeRemaining)}`;
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

    let verdict = '🎉 Excellent Job!';
    if (percent >= 90) verdict = '🏆 Outstanding Mastery! Distinction!';
    else if (percent >= 75) verdict = '🌟 Great Performance! High Pass!';
    else if (percent >= 50) verdict = '👍 Good Effort! Passing Grade.';
    else verdict = '📚 Keep Practicing! Review key concepts below.';

    app.innerHTML = `
        <div class="results-card">
            <div style="font-size: 40px; margin-bottom: 8px;">🎓</div>
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
                <button class="btn-primary" style="width: auto; padding: 12px 24px;" onclick="reviewQuizAnswers()">
                    📖 Review All Questions & Explanations
                </button>
                <button class="btn-secondary" onclick="startPracticeSession('${currentQuiz.grade}', '${currentQuiz.semester}', '${currentQuiz.examType}', '${escapeQuotes(currentQuiz.subject)}', '${currentQuiz.mode}', '${escapeQuotes(currentQuiz.examTitle)}', '${currentQuiz.filePath}', currentQuiz.backFn)">
                    🔄 Retake Practice Test
                </button>
                <a href="${currentQuiz.filePath}" target="_blank" download class="btn-secondary" style="text-decoration: none;">
                    ⬇️ Download Official PDF
                </a>
                <button class="btn-secondary" onclick="currentQuiz.backFn ? currentQuiz.backFn() : showLibraryHome()">
                    🏠 Back to Library
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
                                <span class="badge ${isCorrect ? 'badge-green' : 'badge-amber'}">
                                    ${isCorrect ? '✓ Correct (+1 pt)' : '✕ Incorrect (0 pts)'}
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
                                            ${oIdx === q.correctAnswer ? '<span style="margin-left: auto; color: #34d399; font-weight: 700;">✓ Correct</span>' : ''}
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
        <button class="back-button" onclick="window._lastBackFn ? window._lastBackFn() : showLibraryHome()">
            ← Back to papers
        </button>

        <div class="exam-message" style="margin-top: 10px;">
            <div style="font-size: 36px; margin-bottom: 12px;">📁</div>
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

function renderExamViewer(title, subtitle, fileUrl, onBackFn) {
    window._lastBackFn = onBackFn;
    pdfViewerState.fileUrl = fileUrl;
    pdfViewerState.title = title;
    pdfViewerState.pageNum = 1;
    pdfViewerState.doc = null;
    pdfViewerState.viewMode = (window.pdfjsLib) ? 'canvas' : 'native';

    app.innerHTML = `
        <button class="back-button" onclick="window._lastBackFn ? window._lastBackFn() : showLibraryHome()">
            ← Back to papers
        </button>

        <div class="exam-viewer-container">
            <div class="exam-viewer-toolbar">
                <div class="exam-viewer-title">
                    <div class="subject-icon">📄</div>
                    <div>
                        <h3 style="font-size: 18px; color: #ffffff; font-weight: 700;">${title}</h3>
                        <p style="font-size: 13px; color: var(--text-muted);">${subtitle}</p>
                    </div>
                </div>

                <div class="exam-viewer-actions">
                    <button class="btn-primary" style="width: auto; padding: 8px 16px; font-size: 13px;" onclick="window._lastBackFn ? window._lastBackFn() : showLibraryHome()">
                        🎯 Practice Questions
                    </button>
                    <a href="${fileUrl}" target="_blank" download class="btn-secondary" title="Download for offline study">
                        ⬇️ Download PDF
                    </a>
                    <a href="${fileUrl}" target="_blank" class="btn-secondary" title="Open in raw browser tab">
                        ⤢ Open in New Tab
                    </a>
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
                    <button class="pdf-btn-ctrl" onclick="zoomPdf(-0.2)" title="Zoom Out">🔍 -</button>
                    <span class="pdf-page-indicator" id="pdf-zoom-level">120%</span>
                    <button class="pdf-btn-ctrl" onclick="zoomPdf(0.2)" title="Zoom In">🔍 +</button>
                    <button class="pdf-btn-ctrl" onclick="resetPdfZoom()" title="Fit Width">Fit</button>
                </div>

                <div class="pdf-control-group">
                    <button class="pdf-mode-pill ${pdfViewerState.viewMode === 'canvas' ? 'active' : ''}" id="btn-mode-canvas" onclick="switchPdfViewMode('canvas')">
                        ⚡ Fast Reader
                    </button>
                    <button class="pdf-mode-pill ${pdfViewerState.viewMode === 'native' ? 'active' : ''}" id="btn-mode-native" onclick="switchPdfViewMode('native')">
                        📄 Native Viewer
                    </button>
                </div>
            </div>

            <!-- Viewport container -->
            <div id="pdf-viewer-viewport" style="position: relative; width: 100%;">
                <div id="pdf-canvas-area" class="pdf-canvas-container" style="${pdfViewerState.viewMode === 'native' ? 'display: none;' : ''}">
                    <div class="pdf-loading-card" id="pdf-loading-card">
                        <div class="hub-icon-circle" style="animation: pulse 1.5s infinite; font-size: 32px; width: 64px; height: 64px;">⚡</div>
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

// Start the application
document.addEventListener('DOMContentLoaded', initApp);
