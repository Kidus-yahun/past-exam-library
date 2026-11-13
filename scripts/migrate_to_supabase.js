// scripts/migrate_to_supabase.js
// Migrates users from local data/db.json into Supabase Cloud PostgreSQL
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env
try {
    const envFile = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envFile)) {
        fs.readFileSync(envFile, 'utf8').split(/\r?\n/).forEach(line => {
            const [k, ...v] = line.trim().split('=');
            if (k && v.length && !process.env[k]) {
                process.env[k] = v.join('=').trim().replace(/^['"]|['"]$/g, '');
            }
        });
    }
} catch (e) {}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Error: SUPABASE_URL and SUPABASE_KEY must be set in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function runMigration() {
    const dbPath = path.join(__dirname, '..', 'data', 'db.json');
    if (!fs.existsSync(dbPath)) {
        console.error('data/db.json not found');
        return;
    }

    const localDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const users = localDb.users || [];
    console.log(`Starting migration of ${users.length} users to Supabase...`);

    for (const u of users) {
        const row = {
            id: u.id,
            username: u.username,
            email: u.email,
            password_hash: u.passwordHash,
            role: u.role || 'student',
            full_name: u.fullName || u.username,
            created_at: u.createdAt || new Date().toISOString(),
            last_login_at: u.lastLoginAt || new Date().toISOString()
        };

        const { data, error } = await supabase.from('users').upsert(row, { onConflict: 'username' }).select();
        if (error) {
            console.error(`❌ Failed to migrate ${u.username}:`, error.message);
        } else {
            console.log(`✅ Successfully migrated ${u.username} (${u.role})`);
        }
    }

    console.log('Migration complete!');
}

runMigration().catch(console.error);
