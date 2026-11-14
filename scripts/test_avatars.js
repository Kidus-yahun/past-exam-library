// scripts/test_avatars.js
function getStudentAvatarSvg(id, size = 100) {
    const s = size;
    const avatars = {
        valedictorian: {
            name: 'The Valedictorian',
            title: 'National Top Scorer',
            badge: '🎓',
            bg: 'linear-gradient(135deg, #1e1b4b, #312e81)',
            svg: `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="v-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1e1b4b"/><stop offset="100%" stop-color="#312e81"/></linearGradient>
                    <linearGradient id="v-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f5d0b0"/><stop offset="100%" stop-color="#e2b189"/></linearGradient>
                    <linearGradient id="v-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#facc15"/><stop offset="100%" stop-color="#eab308"/></linearGradient>
                    <linearGradient id="v-gown" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#v-bg)" stroke="#6366f1" stroke-width="2.5"/>
                <!-- Glow Stars -->
                <circle cx="20" cy="25" r="1.5" fill="#facc15" opacity="0.8"/>
                <circle cx="80" cy="22" r="1.5" fill="#facc15" opacity="0.8"/>
                <circle cx="85" cy="55" r="1" fill="#ffffff" opacity="0.6"/>
                <!-- Shoulders / Gown -->
                <path d="M 20 96 C 20 74, 36 68, 50 68 C 64 68, 80 74, 80 96 Z" fill="url(#v-gown)"/>
                <!-- Gold Honor Stole -->
                <path d="M 38 68 L 44 96 L 50 96 L 46 68 Z" fill="url(#v-gold)"/>
                <path d="M 62 68 L 56 96 L 50 96 L 54 68 Z" fill="url(#v-gold)"/>
                <polygon points="50,72 52,76 56,76 53,79 54,83 50,81 46,83 47,79 44,76 48,76" fill="#facc15"/>
                <!-- Neck -->
                <rect x="44" y="58" width="12" height="13" rx="4" fill="#e2b189"/>
                <!-- Head -->
                <ellipse cx="50" cy="46" rx="18" ry="20" fill="url(#v-skin)"/>
                <!-- Eyes & Eyebrows -->
                <ellipse cx="43" cy="46" rx="2.5" ry="3" fill="#1e293b"/>
                <ellipse cx="57" cy="46" rx="2.5" ry="3" fill="#1e293b"/>
                <circle cx="44" cy="45" r="0.8" fill="#ffffff"/>
                <circle cx="58" cy="45" r="0.8" fill="#ffffff"/>
                <path d="M 39 41 Q 43 39 47 41" stroke="#334155" stroke-width="1.6" fill="none" stroke-linecap="round"/>
                <path d="M 53 41 Q 57 39 61 41" stroke="#334155" stroke-width="1.6" fill="none" stroke-linecap="round"/>
                <!-- Gold Spectacles -->
                <circle cx="43" cy="46" r="6" stroke="#facc15" stroke-width="1.4" fill="none" opacity="0.9"/>
                <circle cx="57" cy="46" r="6" stroke="#facc15" stroke-width="1.4" fill="none" opacity="0.9"/>
                <line x1="49" y1="46" x2="51" y2="46" stroke="#facc15" stroke-width="1.4"/>
                <!-- Smile -->
                <path d="M 45 54 Q 50 58 55 54" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                <!-- Mortarboard Cap -->
                <polygon points="50,18 78,28 50,38 22,28" fill="#0f172a" stroke="#facc15" stroke-width="1.2"/>
                <rect x="36" y="29" width="28" height="6" rx="3" fill="#1e293b"/>
                <!-- Cap Button & Tassel -->
                <circle cx="50" cy="28" r="2.5" fill="#facc15"/>
                <path d="M 50 28 Q 66 30 68 44" stroke="#facc15" stroke-width="1.8" fill="none"/>
                <circle cx="68" cy="45" r="2" fill="#eab308"/>
            </svg>`
        },
        physicist: {
            name: 'The Quantum Physicist',
            title: 'STEM & Formula Prodigy',
            badge: '⚡',
            bg: 'linear-gradient(135deg, #042f2e, #0f766e)',
            svg: `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="p-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#042f2e"/><stop offset="100%" stop-color="#0f766e"/></linearGradient>
                    <linearGradient id="p-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e8b896"/><stop offset="100%" stop-color="#cf9770"/></linearGradient>
                    <linearGradient id="p-cyan" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#22d3ee"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#p-bg)" stroke="#14b8a6" stroke-width="2.5"/>
                <!-- Orbiting Rings -->
                <ellipse cx="50" cy="48" rx="42" ry="14" fill="none" stroke="#22d3ee" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" transform="rotate(-25 50 48)"/>
                <ellipse cx="50" cy="48" rx="42" ry="14" fill="none" stroke="#a7f3d0" stroke-width="1" stroke-dasharray="3,3" opacity="0.6" transform="rotate(25 50 48)"/>
                <circle cx="22" cy="38" r="2.5" fill="#22d3ee"/>
                <circle cx="78" cy="58" r="2.5" fill="#34d399"/>
                <!-- Shoulders / Lab Coat -->
                <path d="M 20 96 C 20 74, 36 68, 50 68 C 64 68, 80 74, 80 96 Z" fill="#f8fafc"/>
                <path d="M 40 70 L 50 96 L 60 70 Z" fill="#0f766e"/>
                <polygon points="50,78 44,96 56,96" fill="#0e7490"/>
                <!-- Neck -->
                <rect x="44" y="58" width="12" height="13" rx="4" fill="#cf9770"/>
                <!-- Head -->
                <ellipse cx="50" cy="46" rx="18" ry="20" fill="url(#p-skin)"/>
                <!-- Hair (Electric/Spiky) -->
                <path d="M 30 38 Q 36 22 50 24 Q 64 22 70 38 Q 62 30 50 32 Q 38 30 30 38 Z" fill="#1e293b"/>
                <polygon points="36,26 42,16 46,24" fill="#1e293b"/>
                <polygon points="45,22 52,14 56,22" fill="#1e293b"/>
                <polygon points="54,24 60,18 64,28" fill="#1e293b"/>
                <!-- Neon Cyan Goggles on Forehead -->
                <rect x="33" y="30" width="34" height="10" rx="5" fill="#0f172a" stroke="#22d3ee" stroke-width="1.5"/>
                <circle cx="41" cy="35" r="4" fill="#06b6d4" opacity="0.85"/>
                <circle cx="59" cy="35" r="4" fill="#06b6d4" opacity="0.85"/>
                <line x1="45" y1="35" x2="55" y2="35" stroke="#22d3ee" stroke-width="2"/>
                <!-- Eyes -->
                <ellipse cx="43" cy="48" rx="2.5" ry="3" fill="#0f172a"/>
                <ellipse cx="57" cy="48" rx="2.5" ry="3" fill="#0f172a"/>
                <circle cx="44" cy="47" r="0.8" fill="#ffffff"/>
                <circle cx="58" cy="47" r="0.8" fill="#ffffff"/>
                <!-- Smile -->
                <path d="M 45 56 Q 50 59 55 56" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            </svg>`
        },
        astronaut: {
            name: 'The Cosmic Explorer',
            title: 'High Horizons Pioneer',
            badge: '🚀',
            bg: 'linear-gradient(135deg, #090d16, #1e1b4b)',
            svg: `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="a-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#090d16"/><stop offset="100%" stop-color="#1e1b4b"/></linearGradient>
                    <linearGradient id="a-visor" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#38bdf8"/><stop offset="50%" stop-color="#818cf8"/><stop offset="100%" stop-color="#c084fc"/></linearGradient>
                    <linearGradient id="a-suit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f1f5f9"/><stop offset="100%" stop-color="#cbd5e1"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#a-bg)" stroke="#38bdf8" stroke-width="2.5"/>
                <!-- Space Stars -->
                <polygon points="25,20 26,23 29,24 26,25 25,28 24,25 21,24 24,23" fill="#38bdf8"/>
                <polygon points="76,28 77,30 79,31 77,32 76,34 75,32 73,31 75,30" fill="#facc15"/>
                <circle cx="78" cy="72" r="1.5" fill="#ffffff" opacity="0.8"/>
                <!-- Space Suit Shoulders -->
                <path d="M 18 96 C 18 72, 34 66, 50 66 C 66 66, 82 72, 82 96 Z" fill="url(#a-suit)"/>
                <rect x="42" y="74" width="16" height="8" rx="2" fill="#0284c7"/>
                <circle cx="46" cy="78" r="1.5" fill="#38bdf8"/>
                <circle cx="54" cy="78" r="1.5" fill="#4ade80"/>
                <!-- Space Helmet Outer Shell -->
                <circle cx="50" cy="44" r="24" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
                <rect x="42" y="64" width="16" height="5" rx="2" fill="#64748b"/>
                <!-- Reflective Iridescent Visor -->
                <ellipse cx="50" cy="44" rx="19" ry="16" fill="url(#a-visor)"/>
                <!-- Visor Gloss Reflection -->
                <path d="M 36 34 Q 48 30 62 36 Q 52 33 38 40 Z" fill="#ffffff" opacity="0.6"/>
                <!-- Side Comms Antennas -->
                <rect x="23" y="40" width="5" height="10" rx="2" fill="#0284c7"/>
                <rect x="72" y="40" width="5" height="10" rx="2" fill="#0284c7"/>
                <circle cx="25" cy="38" r="2" fill="#38bdf8"/>
            </svg>`
        },
        cyber_architect: {
            name: 'The Cyber Architect',
            title: 'Digital & Logic Master',
            badge: '💻',
            bg: 'linear-gradient(135deg, #2e1065, #4c1d95)',
            svg: `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="c-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2e1065"/><stop offset="100%" stop-color="#4c1d95"/></linearGradient>
                    <linearGradient id="c-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e2b490"/><stop offset="100%" stop-color="#c69572"/></linearGradient>
                    <linearGradient id="c-neon" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ec4899"/><stop offset="50%" stop-color="#a855f7"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#c-bg)" stroke="#ec4899" stroke-width="2.5"/>
                <!-- Circuit lines in BG -->
                <path d="M 12 30 L 26 30 L 32 40" stroke="#a855f7" stroke-width="1.2" fill="none" opacity="0.7"/>
                <path d="M 88 35 L 74 35 L 68 45" stroke="#06b6d4" stroke-width="1.2" fill="none" opacity="0.7"/>
                <!-- High-tech Hoodie Shoulders -->
                <path d="M 20 96 C 20 74, 36 66, 50 66 C 64 66, 80 74, 80 96 Z" fill="#0f172a"/>
                <path d="M 36 68 L 50 88 L 64 68" stroke="#ec4899" stroke-width="2" fill="none"/>
                <!-- Neck -->
                <rect x="44" y="56" width="12" height="14" rx="4" fill="#c69572"/>
                <!-- Head -->
                <ellipse cx="50" cy="44" rx="18" ry="20" fill="url(#c-skin)"/>
                <!-- Cyberpunk Hair -->
                <path d="M 32 38 Q 36 18 50 18 Q 66 18 68 38 Q 62 26 50 26 Q 38 26 32 38 Z" fill="#06b6d4"/>
                <polygon points="34,26 42,14 46,22" fill="#06b6d4"/>
                <!-- Glowing HUD Visor -->
                <rect x="30" y="38" width="40" height="13" rx="4" fill="#09090b" stroke="url(#c-neon)" stroke-width="2"/>
                <line x1="34" y1="44" x2="66" y2="44" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="4,2"/>
                <circle cx="50" cy="44" r="2" fill="#ec4899"/>
                <!-- Confident Smirk -->
                <path d="M 46 54 Q 52 57 56 53" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                <!-- Headset Ear Piece -->
                <rect x="26" y="38" width="5" height="12" rx="2" fill="#ec4899"/>
            </svg>`
        },
        lion_champion: {
            name: 'The St. Michael Champion',
            title: 'School Heritage Scholar',
            badge: '🦁',
            bg: 'linear-gradient(135deg, #78350f, #b45309)',
            svg: `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="l-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#451a03"/><stop offset="100%" stop-color="#78350f"/></linearGradient>
                    <linearGradient id="l-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fef08a"/><stop offset="100%" stop-color="#eab308"/></linearGradient>
                    <linearGradient id="l-mane" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#b45309"/><stop offset="100%" stop-color="#78350f"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#l-bg)" stroke="#facc15" stroke-width="2.5"/>
                <!-- Ethiopian Color Ribbon Arc -->
                <path d="M 16 35 A 40 40 0 0 1 84 35" fill="none" stroke="#22c55e" stroke-width="2" opacity="0.7"/>
                <path d="M 19 32 A 40 40 0 0 1 81 32" fill="none" stroke="#eab308" stroke-width="2" opacity="0.7"/>
                <path d="M 22 29 A 40 40 0 0 1 78 29" fill="none" stroke="#ef4444" stroke-width="2" opacity="0.7"/>
                <!-- Shoulders / Royal Sash -->
                <path d="M 20 96 C 20 74, 36 68, 50 68 C 64 68, 80 74, 80 96 Z" fill="#1e293b"/>
                <path d="M 26 96 L 46 68 L 54 68 L 34 96 Z" fill="#b91c1c"/>
                <polygon points="50,70 53,75 58,75 54,78 55,83 50,80 45,83 46,78 42,75 47,75" fill="#facc15"/>
                <!-- Lion Mane -->
                <circle cx="50" cy="46" r="24" fill="url(#l-mane)"/>
                <!-- Head -->
                <circle cx="50" cy="47" r="18" fill="#f59e0b"/>
                <!-- Lion Ears -->
                <circle cx="34" cy="32" r="6" fill="#b45309"/>
                <circle cx="34" cy="32" r="3.5" fill="#fef08a"/>
                <circle cx="66" cy="32" r="6" fill="#b45309"/>
                <circle cx="66" cy="32" r="3.5" fill="#fef08a"/>
                <!-- Muzzle -->
                <ellipse cx="50" cy="53" rx="8" ry="6" fill="#fef08a"/>
                <polygon points="50,51 46,47 54,47" fill="#78350f"/>
                <path d="M 50 51 L 50 54 M 47 55 Q 50 57 53 55" stroke="#78350f" stroke-width="1.5" fill="none"/>
                <!-- Determined Eyes -->
                <ellipse cx="43" cy="44" rx="2.8" ry="3" fill="#451a03"/>
                <ellipse cx="57" cy="44" rx="2.8" ry="3" fill="#451a03"/>
                <circle cx="44" cy="43" r="0.9" fill="#ffffff"/>
                <circle cx="58" cy="43" r="0.9" fill="#ffffff"/>
                <!-- Golden Laurel Crown -->
                <path d="M 32 30 Q 50 20 68 30" stroke="#facc15" stroke-width="3" fill="none" stroke-linecap="round"/>
                <polygon points="50,18 52,24 57,21 54,26 58,28 52,29 50,34 48,29 42,28 46,26 43,21 48,24" fill="url(#l-gold)"/>
            </svg>`
        },
        medic: {
            name: 'The Medical Prodigy',
            title: 'Biology & Health Lead',
            badge: '🩺',
            bg: 'linear-gradient(135deg, #064e3b, #047857)',
            svg: `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="m-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#064e3b"/><stop offset="100%" stop-color="#047857"/></linearGradient>
                    <linearGradient id="m-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f2cfad"/><stop offset="100%" stop-color="#d9a87e"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#m-bg)" stroke="#34d399" stroke-width="2.5"/>
                <!-- Shoulders / Scrubs -->
                <path d="M 20 96 C 20 74, 36 68, 50 68 C 64 68, 80 74, 80 96 Z" fill="#0d9488"/>
                <!-- Stethoscope Tubing & Chestpiece -->
                <path d="M 38 68 Q 38 88 50 88 Q 62 88 62 68" stroke="#334155" stroke-width="3" fill="none"/>
                <circle cx="50" cy="88" r="4" fill="#94a3b8" stroke="#f8fafc" stroke-width="1.2"/>
                <!-- Stethoscope Earpieces -->
                <path d="M 38 68 L 38 58 Q 38 52 42 50" stroke="#94a3b8" stroke-width="2" fill="none"/>
                <path d="M 62 68 L 62 58 Q 62 52 58 50" stroke="#94a3b8" stroke-width="2" fill="none"/>
                <!-- Neck -->
                <rect x="44" y="58" width="12" height="13" rx="4" fill="#d9a87e"/>
                <!-- Head -->
                <ellipse cx="50" cy="46" rx="18" ry="20" fill="url(#m-skin)"/>
                <!-- Hair & Medical Headband -->
                <path d="M 32 38 Q 36 24 50 24 Q 64 24 68 38 Q 62 30 50 30 Q 38 30 32 38 Z" fill="#1e293b"/>
                <rect x="31" y="27" width="38" height="6" rx="2" fill="#ffffff"/>
                <!-- Red Cross on headband -->
                <rect x="48" y="28" width="4" height="4" fill="#ef4444"/>
                <!-- Friendly Eyes -->
                <ellipse cx="43" cy="46" rx="2.5" ry="3" fill="#1e293b"/>
                <ellipse cx="57" cy="46" rx="2.5" ry="3" fill="#1e293b"/>
                <circle cx="44" cy="45" r="0.8" fill="#ffffff"/>
                <circle cx="58" cy="45" r="0.8" fill="#ffffff"/>
                <!-- Warm Smile -->
                <path d="M 44 54 Q 50 58 56 54" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            </svg>`
        },
        mastermind: {
            name: 'The Master Strategist',
            title: 'Critical Reasoner',
            badge: '🧠',
            bg: 'linear-gradient(135deg, #3b0764, #581c87)',
            svg: `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="t-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3b0764"/><stop offset="100%" stop-color="#581c87"/></linearGradient>
                    <linearGradient id="t-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e8bd9b"/><stop offset="100%" stop-color="#cb966e"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#t-bg)" stroke="#c084fc" stroke-width="2.5"/>
                <!-- Synapse / Thought sparkles -->
                <circle cx="24" cy="28" r="2" fill="#c084fc"/>
                <circle cx="76" cy="26" r="2" fill="#e879f9"/>
                <circle cx="72" cy="74" r="1.5" fill="#f0abfc"/>
                <!-- Shoulders / Cozy Turtleneck & Blazer -->
                <path d="M 20 96 C 20 74, 36 68, 50 68 C 64 68, 80 74, 80 96 Z" fill="#334155"/>
                <!-- Knit Scarf -->
                <ellipse cx="50" cy="69" rx="16" ry="6" fill="#c084fc"/>
                <rect x="52" y="68" width="8" height="24" rx="3" fill="#a855f7"/>
                <!-- Neck -->
                <rect x="44" y="58" width="12" height="11" rx="4" fill="#cb966e"/>
                <!-- Head -->
                <ellipse cx="50" cy="46" rx="18" ry="20" fill="url(#t-skin)"/>
                <!-- Neat Academic Hair -->
                <path d="M 31 38 Q 34 22 50 22 Q 66 22 69 38 Q 63 28 50 28 Q 37 28 31 38 Z" fill="#3f2314"/>
                <!-- Round Academic Tortoiseshell Glasses -->
                <circle cx="43" cy="46" r="6" stroke="#b45309" stroke-width="1.8" fill="none"/>
                <circle cx="57" cy="46" r="6" stroke="#b45309" stroke-width="1.8" fill="none"/>
                <line x1="49" y1="46" x2="51" y2="46" stroke="#b45309" stroke-width="1.8"/>
                <!-- Analytical Gaze -->
                <ellipse cx="43" cy="46" rx="2" ry="2.5" fill="#1e293b"/>
                <ellipse cx="57" cy="46" rx="2" ry="2.5" fill="#1e293b"/>
                <!-- Pencil Tucked Behind Ear -->
                <polygon points="66,38 72,34 74,37 68,41" fill="#facc15"/>
                <polygon points="72,34 75,32 76,35 74,37" fill="#ef4444"/>
                <!-- Clever Smile -->
                <path d="M 46 55 Q 51 58 55 54" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            </svg>`
        },
        titan: {
            name: 'The Streak Titan',
            title: 'Exam Sprint Runner',
            badge: '⚡',
            bg: 'linear-gradient(135deg, #7c2d12, #c2410c)',
            svg: `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="ti-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#7c2d12"/><stop offset="100%" stop-color="#ea580c"/></linearGradient>
                    <linearGradient id="ti-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f0c29f"/><stop offset="100%" stop-color="#d49a70"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#ti-bg)" stroke="#fb923c" stroke-width="2.5"/>
                <!-- Lightning Sparks -->
                <polygon points="20,30 24,38 21,39 26,48 18,42 22,41" fill="#facc15"/>
                <polygon points="80,26 84,34 81,35 86,44 78,38 82,37" fill="#facc15"/>
                <!-- Shoulders / Athletic Jersey -->
                <path d="M 20 96 C 20 74, 36 68, 50 68 C 64 68, 80 74, 80 96 Z" fill="#18181b"/>
                <path d="M 36 68 L 44 96 L 56 96 L 64 68 Z" fill="#ea580c"/>
                <!-- Headband with Lightning Emblem -->
                <rect x="31" y="32" width="38" height="7" rx="3" fill="#ea580c"/>
                <polygon points="50,33 48,36 51,36 49,39 53,35 50,35" fill="#fef08a"/>
                <!-- Neck -->
                <rect x="44" y="58" width="12" height="13" rx="4" fill="#d49a70"/>
                <!-- Head -->
                <ellipse cx="50" cy="46" rx="18" ry="20" fill="url(#ti-skin)"/>
                <!-- Intense Focused Eyes -->
                <ellipse cx="43" cy="46" rx="2.5" ry="3" fill="#ea580c"/>
                <ellipse cx="57" cy="46" rx="2.5" ry="3" fill="#ea580c"/>
                <circle cx="44" cy="45" r="1" fill="#fef08a"/>
                <circle cx="58" cy="45" r="1" fill="#fef08a"/>
                <!-- Fierce Determined Grin -->
                <path d="M 44 54 Q 50 59 56 54" stroke="#9a3412" stroke-width="2" fill="none" stroke-linecap="round"/>
            </svg>`
        },
        polymath: {
            name: 'The Renaissance Polymath',
            title: 'Creative Arts & Essayist',
            badge: '🎨',
            bg: 'linear-gradient(135deg, #831843, #be185d)',
            svg: `
            <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="po-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#831843"/><stop offset="100%" stop-color="#be185d"/></linearGradient>
                    <linearGradient id="po-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f5d0b0"/><stop offset="100%" stop-color="#e0a67c"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#po-bg)" stroke="#f472b6" stroke-width="2.5"/>
                <!-- Creative Color Splashes -->
                <circle cx="22" cy="24" r="3" fill="#38bdf8"/>
                <circle cx="82" cy="28" r="3" fill="#facc15"/>
                <circle cx="78" cy="68" r="2.5" fill="#4ade80"/>
                <!-- Shoulders / Artist Smock -->
                <path d="M 20 96 C 20 74, 36 68, 50 68 C 64 68, 80 74, 80 96 Z" fill="#374151"/>
                <circle cx="36" cy="82" r="3" fill="#ec4899" opacity="0.8"/>
                <circle cx="64" cy="86" r="2.5" fill="#eab308" opacity="0.8"/>
                <!-- Neck -->
                <rect x="44" y="58" width="12" height="13" rx="4" fill="#e0a67c"/>
                <!-- Head -->
                <ellipse cx="50" cy="46" rx="18" ry="20" fill="url(#po-skin)"/>
                <!-- Stylished Beret Hat Tilted -->
                <ellipse cx="50" cy="28" rx="22" ry="8" fill="#1e1b4b" transform="rotate(-8 50 28)"/>
                <circle cx="50" cy="22" r="2" fill="#be185d"/>
                <!-- Expressive Eyes -->
                <ellipse cx="43" cy="46" rx="2.5" ry="3" fill="#1e1b4b"/>
                <ellipse cx="57" cy="46" rx="2.5" ry="3" fill="#1e1b4b"/>
                <circle cx="44" cy="45" r="0.8" fill="#ffffff"/>
                <circle cx="58" cy="45" r="0.8" fill="#ffffff"/>
                <!-- Inspired Smile -->
                <path d="M 44 54 Q 50 58 56 54" stroke="#9a3412" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            </svg>`
        }
    };
    return avatars[id] || avatars.valedictorian;
}

const list = ['valedictorian', 'physicist', 'astronaut', 'cyber_architect', 'lion_champion', 'medic', 'mastermind', 'titan', 'polymath'];
list.forEach(id => {
    const a = getStudentAvatarSvg(id, 80);
    console.log('Checked avatar:', id, 'name:', a.name, 'SVG length:', a.svg.length);
});
