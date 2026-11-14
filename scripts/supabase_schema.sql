-- ========================================================
-- Past Exam Library - Supabase Cloud Database Schema
-- Run this in your Supabase project's SQL Editor (1-click)
-- ========================================================

-- 1. Users / Registered Students
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student',
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Activity Logs (Real Student Actions & Downloads)
CREATE TABLE IF NOT EXISTS activity_logs (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    user_id TEXT,
    username TEXT,
    full_name TEXT,
    target_id TEXT,
    target_name TEXT,
    grade TEXT,
    subject TEXT,
    details TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Quiz & Duel Results
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    username TEXT,
    grade TEXT,
    subject TEXT,
    score INT,
    total INT,
    percentage NUMERIC,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated backend access (via Service Role or Anon API key)
DROP POLICY IF EXISTS "Allow service full access on users" ON users;
CREATE POLICY "Allow service full access on users" ON users FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service full access on activity_logs" ON activity_logs;
CREATE POLICY "Allow service full access on activity_logs" ON activity_logs FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service full access on quiz_attempts" ON quiz_attempts;
CREATE POLICY "Allow service full access on quiz_attempts" ON quiz_attempts FOR ALL USING (true) WITH CHECK (true);

-- Fast lookup indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp DESC);
