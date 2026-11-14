const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                     process.env.SUPABASE_KEY || 
                     process.env.SUPABASE_ANON_KEY || 
                     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase = null;

if (SUPABASE_URL && SUPABASE_KEY) {
    try {
        supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        });
        console.log('[Supabase] Initialized cloud database connection successfully.');
    } catch (e) {
        console.error('[Supabase] Failed to initialize Supabase client:', e.message);
        supabase = null;
    }
} else {
    console.log('[Supabase] Running in local offline mode (SUPABASE_URL not configured).');
}

function isConfigured() {
    return !!supabase;
}

async function findUserByUsername(username) {
    if (!supabase || !username) return null;
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .ilike('username', username.trim())
            .maybeSingle();
        if (error) {
            console.error('[Supabase findUserByUsername error]:', error.message);
            return null;
        }
        if (!data) return null;
        return {
            id: data.id,
            username: data.username,
            email: data.email,
            passwordHash: data.password_hash,
            role: data.role,
            fullName: data.full_name,
            createdAt: data.created_at,
            lastLoginAt: data.last_login_at
        };
    } catch (err) {
        console.error('[Supabase findUserByUsername exception]:', err.message);
        return null;
    }
}

async function findUserByEmail(email) {
    if (!supabase || !email) return null;
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .ilike('email', email.trim())
            .maybeSingle();
        if (error) {
            console.error('[Supabase findUserByEmail error]:', error.message);
            return null;
        }
        if (!data) return null;
        return {
            id: data.id,
            username: data.username,
            email: data.email,
            passwordHash: data.password_hash,
            role: data.role,
            fullName: data.full_name,
            createdAt: data.created_at,
            lastLoginAt: data.last_login_at
        };
    } catch (err) {
        console.error('[Supabase findUserByEmail exception]:', err.message);
        return null;
    }
}

async function findUserById(id) {
    if (!supabase || !id) return null;
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .maybeSingle();
        if (error || !data) return null;
        return {
            id: data.id,
            username: data.username,
            email: data.email,
            passwordHash: data.password_hash,
            role: data.role,
            fullName: data.full_name,
            createdAt: data.created_at,
            lastLoginAt: data.last_login_at
        };
    } catch (err) {
        return null;
    }
}

async function createUser(userData) {
    if (!supabase) return null;
    try {
        const row = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            password_hash: userData.passwordHash,
            role: userData.role || 'student',
            full_name: userData.fullName || userData.username,
            created_at: userData.createdAt || new Date().toISOString(),
            last_login_at: new Date().toISOString()
        };
        const { data, error } = await supabase
            .from('users')
            .insert([row])
            .select()
            .single();
        if (error) {
            console.error('[Supabase createUser error]:', error.message);
            return null;
        }
        return {
            id: data.id,
            username: data.username,
            email: data.email,
            passwordHash: data.password_hash,
            role: data.role,
            fullName: data.full_name,
            createdAt: data.created_at,
            lastLoginAt: data.last_login_at
        };
    } catch (err) {
        console.error('[Supabase createUser exception]:', err.message);
        return null;
    }
}

async function updateUser(id, updates) {
    if (!supabase || !id) return null;
    try {
        const row = {};
        if (updates.fullName) row.full_name = updates.fullName;
        if (updates.lastLoginAt) row.last_login_at = updates.lastLoginAt;
        if (updates.passwordHash) row.password_hash = updates.passwordHash;

        const { data, error } = await supabase
            .from('users')
            .update(row)
            .eq('id', id)
            .select()
            .single();
        if (error || !data) return null;
        return {
            id: data.id,
            username: data.username,
            email: data.email,
            passwordHash: data.password_hash,
            role: data.role,
            fullName: data.full_name,
            createdAt: data.created_at,
            lastLoginAt: data.last_login_at
        };
    } catch (err) {
        return null;
    }
}

async function getAllStudents(searchTerm = '') {
    if (!supabase) return null;
    try {
        let query = supabase
            .from('users')
            .select('id, username, email, full_name, role, created_at, last_login_at')
            .order('created_at', { ascending: false });

        if (searchTerm) {
            query = query.or(`username.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,full_name.ilike.%${searchTerm}%`);
        }

        const { data, error } = await query;
        if (error) {
            console.error('[Supabase getAllStudents error]:', error.message);
            return null;
        }
        return (data || []).map(d => ({
            id: d.id,
            username: d.username,
            email: d.email,
            fullName: d.full_name,
            role: d.role,
            createdAt: d.created_at,
            lastLoginAt: d.last_login_at
        }));
    } catch (err) {
        console.error('[Supabase getAllStudents exception]:', err.message);
        return null;
    }
}

async function addActivityLog(logData) {
    if (!supabase) return null;
    try {
        const row = {
            id: logData.id || ('act_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4)),
            type: logData.type,
            user_id: logData.userId || null,
            username: logData.username || 'guest',
            full_name: logData.fullName || null,
            target_id: logData.targetId || null,
            target_name: logData.targetName || null,
            grade: logData.grade || null,
            subject: logData.subject || null,
            details: logData.details || null,
            timestamp: logData.timestamp || new Date().toISOString()
        };
        const { error } = await supabase.from('activity_logs').insert([row]);
        if (error) console.error('[Supabase addActivityLog error]:', error.message);
    } catch (err) {
        console.error('[Supabase addActivityLog exception]:', err.message);
    }
}

async function recordQuizAttempt(quizData) {
    if (!supabase) return null;
    try {
        const row = {
            id: quizData.id || ('quiz_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4)),
            user_id: quizData.userId || null,
            username: quizData.username || 'guest',
            grade: quizData.grade || null,
            subject: quizData.subject || null,
            score: quizData.score || 0,
            total: quizData.total || 0,
            percentage: quizData.percentage || 0,
            timestamp: new Date().toISOString()
        };
        const { error } = await supabase.from('quiz_attempts').insert([row]);
        if (error) console.error('[Supabase recordQuizAttempt error]:', error.message);
    } catch (err) {
        console.error('[Supabase recordQuizAttempt exception]:', err.message);
    }
}

async function getActivityLogs(filters = {}) {
    if (!supabase) return null;
    try {
        let query = supabase
            .from('activity_logs')
            .select('*')
            .order('timestamp', { ascending: false });

        const limit = filters.limit ? parseInt(filters.limit, 10) : 200;
        query = query.limit(limit);

        if (filters.type && filters.type !== 'all') {
            query = query.eq('type', filters.type);
        }
        if (filters.grade && filters.grade !== 'all') {
            query = query.eq('grade', filters.grade);
        }
        if (filters.subject && filters.subject !== 'all') {
            query = query.ilike('subject', filters.subject);
        }
        if (filters.username) {
            query = query.ilike('username', `%${filters.username.trim()}%`);
        }
        if (filters.search) {
            const s = filters.search.trim();
            query = query.or(`full_name.ilike.%${s}%,username.ilike.%${s}%,subject.ilike.%${s}%,details.ilike.%${s}%`);
        }

        const { data, error } = await query;
        if (error) {
            console.error('[Supabase getActivityLogs error]:', error.message);
            return null;
        }
        return (data || []).map(d => ({
            id: d.id,
            type: d.type,
            userId: d.user_id,
            username: d.username,
            fullName: d.full_name,
            grade: d.grade,
            subject: d.subject,
            details: d.details,
            targetId: d.target_id,
            targetName: d.target_name,
            timestamp: d.timestamp,
            isCloud: true
        }));
    } catch (err) {
        console.error('[Supabase getActivityLogs exception]:', err.message);
        return null;
    }
}

async function getActivityStats(filters = {}) {
    if (!supabase) return null;
    try {
        const logs = await getActivityLogs({ ...filters, limit: 1000 });
        if (!logs) return null;

        const totalLogins = logs.filter(l => l.type === 'login' || l.type === 'register').length;
        const totalDownloads = logs.filter(l => l.type === 'download' || l.type === 'preview').length;
        const practiceLogs = logs.filter(l => l.type === 'practice');
        const totalPractices = practiceLogs.length;

        let scoreSum = 0;
        let scoreCount = 0;
        practiceLogs.forEach(l => {
            if (typeof l.percentage === 'number') {
                scoreSum += l.percentage;
                scoreCount++;
            } else if (l.details) {
                const match = l.details.match(/\((\d+)%\)/);
                if (match) {
                    scoreSum += parseInt(match[1], 10);
                    scoreCount++;
                }
            }
        });
        const avgScore = scoreCount > 0 ? Math.round(scoreSum / scoreCount) : 0;

        return {
            totalLogins,
            totalDownloads,
            totalPractices,
            avgScore
        };
    } catch (err) {
        console.error('[Supabase getActivityStats exception]:', err.message);
        return null;
    }
}

module.exports = {
    isConfigured,
    findUserByUsername,
    findUserByEmail,
    findUserById,
    createUser,
    updateUser,
    getAllStudents,
    addActivityLog,
    getActivityLogs,
    getActivityStats,
    recordQuizAttempt
};
