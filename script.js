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
   INITIALIZATION & API HELPERS
======================================================== */

async function initApp() {
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
            if (state.categories.grades.length > 0 && !state.admin.selectedGradeForSubjects) {
                state.admin.selectedGradeForSubjects = state.categories.grades[0].id;
            }
        }
    } catch (err) {
        console.error('Failed to fetch categories:', err);
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
    if (!state.user) {
        headerNav.innerHTML = `
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
            </div>

            <!-- Dashboard Navigation Tabs -->
            <div class="admin-tabs">
                <button class="admin-tab ${activeTab === 'exams' ? 'active' : ''}" 
                        onclick="switchAdminTab('exams')">
                    📄 Manage Exam Papers
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
                <span class="search-icon" aria-hidden="true">⌕</span>
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

    const backFn = () => {
        if (semester === 'Pretest' || semester === 'Model') {
            showNationalExamCategory(semester);
        } else {
            showExamType(grade, semester, examType);
        }
    };

    if (!filePath) {
        renderExamNotFound(examTitle, `${grade} • ${semester} • ${examType}`, grade, semester, examType, subject, backFn);
        return;
    }

    renderExamViewer(examTitle, `${grade} • ${semester} • ${examType}`, filePath, backFn);
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
            renderExamViewer(exam.title, `${exam.grade} • ${exam.semester} • ${exam.examType}`, exam.fileUrl, () => {
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

function renderExamViewer(title, subtitle, fileUrl, onBackFn) {
    window._lastBackFn = onBackFn;

    app.innerHTML = `
        <button class="back-button" onclick="window._lastBackFn ? window._lastBackFn() : showLibraryHome()">
            ← Back to papers
        </button>

        <div class="exam-viewer-container">
            <div class="exam-viewer-toolbar">
                <div class="exam-viewer-title">
                    <div class="subject-icon">📄</div>
                    <div>
                        <h3 style="font-size: 18px; color: var(--navy-900); font-weight: 700;">${title}</h3>
                        <p style="font-size: 13px; color: var(--text-muted);">${subtitle}</p>
                    </div>
                </div>

                <div class="exam-viewer-actions">
                    <a href="${fileUrl}" target="_blank" download class="btn-secondary">
                        ⬇️ Download PDF
                    </a>
                    <a href="${fileUrl}" target="_blank" class="btn-secondary">
                        ⤢ Open in New Tab
                    </a>
                </div>
            </div>

            <iframe 
                src="${fileUrl}" 
                class="exam-iframe" 
                title="${title}"
                onerror="this.parentElement.innerHTML='<div style=\\'padding: 40px; text-align: center;\\'>Could not preview PDF. <a href=\\'${fileUrl}\\' target=\\'_blank\\'>Click here to download</a>.</div>'">
            </iframe>
        </div>
    `;
}

// Start the application
document.addEventListener('DOMContentLoaded', initApp);
