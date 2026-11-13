// scripts/avatar_builder.js

const AVATAR_OPTIONS = {
    skinTones: [
        { id: 'dark-deep', color: '#452b1f', shadow: '#2e1c14', name: 'Deep Espresso' },
        { id: 'dark-rich', color: '#68402c', shadow: '#482a1b', name: 'Rich Bronze' },
        { id: 'medium-warm', color: '#8d5524', shadow: '#6b3c14', name: 'Warm Amber' },
        { id: 'caramel', color: '#c68642', shadow: '#9e6428', name: 'Golden Caramel' },
        { id: 'honey', color: '#e0ac69', shadow: '#b88344', name: 'Warm Honey' },
        { id: 'fair', color: '#f1c27d', shadow: '#c49655', name: 'Light Fair' }
    ],
    hairStyles: [
        { id: 'afro', name: 'Classic Afro' },
        { id: 'fade', name: 'High-Top Fade' },
        { id: 'curls', name: 'Curly Waves' },
        { id: 'locs', name: 'Dreadlocks' },
        { id: 'braids', name: 'Cornrow Braids' },
        { id: 'short', name: 'Neat Scholar Part' },
        { id: 'wavy', name: 'Flowing Waves' },
        { id: 'buzz', name: 'Clean Buzz Cut' }
    ],
    hairColors: [
        { id: 'black', color: '#171717', highlight: '#2e2e2e', name: 'Jet Black' },
        { id: 'dark-brown', color: '#382216', highlight: '#543624', name: 'Dark Brown' },
        { id: 'chestnut', color: '#593217', highlight: '#784622', name: 'Chestnut' },
        { id: 'golden', color: '#d97706', highlight: '#f59e0b', name: 'Golden Honey' },
        { id: 'burgundy', color: '#831843', highlight: '#9d174d', name: 'Deep Burgundy' },
        { id: 'cyan', color: '#0891b2', highlight: '#06b6d4', name: 'Cyber Cyan' }
    ],
    expressions: [
        { id: 'confident', name: 'Confident Smirk' },
        { id: 'happy', name: 'Warm Smile' },
        { id: 'grin', name: 'Big Grin' },
        { id: 'wink', name: 'Playful Wink' }
    ],
    eyewear: [
        { id: 'none', name: 'None' },
        { id: 'round', name: 'Scholar Glasses' },
        { id: 'sunglasses', name: 'Cool Shades' },
        { id: 'cyber', name: 'Cyber HUD Visor' },
        { id: 'goggles', name: 'Lab Goggles' }
    ],
    headwear: [
        { id: 'none', name: 'None' },
        { id: 'cap', name: 'Graduation Cap 🎓' },
        { id: 'headphones', name: 'Studio Headphones 🎧' },
        { id: 'headband', name: 'Ethiopian Headband 🇪🇹' },
        { id: 'beanie', name: 'Cozy Beanie 🧢' }
    ],
    outfits: [
        { id: 'blazer', name: 'School Blazer & Tie 👔' },
        { id: 'labcoat', name: 'Science Lab Coat 🥼' },
        { id: 'hoodie', name: 'Student Hoodie 🧥' },
        { id: 'gown', name: 'Academic Honor Gown 🎓' },
        { id: 'varsity', name: 'BGMCS Varsity Jacket 🏅' }
    ],
    outfitColors: [
        { id: 'navy', color: '#1e3a8a', trim: '#3b82f6', name: 'Royal Navy' },
        { id: 'crimson', color: '#991b1b', trim: '#ef4444', name: 'Crimson Red' },
        { id: 'emerald', color: '#065f46', trim: '#10b981', name: 'Emerald Green' },
        { id: 'amber', color: '#b45309', trim: '#f59e0b', name: 'Gold Amber' },
        { id: 'purple', color: '#581c87', trim: '#a855f7', name: 'Mystic Purple' },
        { id: 'dark', color: '#18181b', trim: '#71717a', name: 'Midnight Onyx' }
    ],
    bgGradients: [
        { id: 'navy-indigo', from: '#1e1b4b', to: '#312e81', border: '#6366f1', name: 'Royal Academy' },
        { id: 'galaxy', from: '#090d16', to: '#1e1b4b', border: '#38bdf8', name: 'Cosmic Nebula' },
        { id: 'forest', from: '#022c22', to: '#064e3b', border: '#10b981', name: 'Emerald Forest' },
        { id: 'sunset', from: '#7c2d12', to: '#b45309', border: '#f59e0b', name: 'Amber Sunset' },
        { id: 'cyber', from: '#3b0764', to: '#701a75', border: '#ec4899', name: 'Cyberpunk Neon' },
        { id: 'fire', from: '#450a0a', to: '#991b1b', border: '#ef4444', name: 'St. Michael Crimson' }
    ]
};

function buildCustomAvatarSvg(cfg = {}, size = 100) {
    const s = size;
    const skinTone = AVATAR_OPTIONS.skinTones.find(x => x.id === cfg.skin) || AVATAR_OPTIONS.skinTones[2];
    const hairStyle = cfg.hair || 'afro';
    const hairColorObj = AVATAR_OPTIONS.hairColors.find(x => x.id === cfg.hairColor) || AVATAR_OPTIONS.hairColors[0];
    const expr = cfg.expression || 'confident';
    const eyewear = cfg.eyewear || 'none';
    const headwear = cfg.headwear || 'none';
    const outfit = cfg.outfit || 'blazer';
    const outfitColorObj = AVATAR_OPTIONS.outfitColors.find(x => x.id === cfg.outfitColor) || AVATAR_OPTIONS.outfitColors[0];
    const bgObj = AVATAR_OPTIONS.bgGradients.find(x => x.id === cfg.bg) || AVATAR_OPTIONS.bgGradients[0];

    const uid = 'av_' + Math.floor(Math.random() * 1000000);

    // 1. OUTFIT / SHOULDERS
    let outfitSvg = '';
    const oc = outfitColorObj.color;
    const ot = outfitColorObj.trim;

    if (outfit === 'blazer') {
        outfitSvg = `
            <path d="M 20 96 C 20 73, 35 67, 50 67 C 65 67, 80 73, 80 96 Z" fill="${oc}"/>
            <polygon points="50,68 44,96 56,96" fill="#f8fafc"/>
            <polygon points="50,73 47,88 50,96 53,88" fill="${ot}"/>
            <path d="M 36 68 L 47 96 L 43 96 L 31 72 Z" fill="#0f172a" opacity="0.3"/>
            <path d="M 64 68 L 53 96 L 57 96 L 69 72 Z" fill="#0f172a" opacity="0.3"/>
            <circle cx="50" cy="74" r="2" fill="${ot}"/>
        `;
    } else if (outfit === 'labcoat') {
        outfitSvg = `
            <path d="M 20 96 C 20 73, 35 67, 50 67 C 65 67, 80 73, 80 96 Z" fill="#f8fafc"/>
            <polygon points="50,68 43,96 57,96" fill="${oc}"/>
            <line x1="50" y1="76" x2="50" y2="96" stroke="#cbd5e1" stroke-width="1.5"/>
            <!-- Stethoscope or Pen in Pocket -->
            <rect x="29" y="80" width="8" height="10" rx="1.5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
            <rect x="31" y="77" width="2" height="5" fill="${ot}"/>
            <rect x="34" y="76" width="2" height="6" fill="#ef4444"/>
        `;
    } else if (outfit === 'hoodie') {
        outfitSvg = `
            <path d="M 20 96 C 20 72, 34 66, 50 66 C 66 66, 80 72, 80 96 Z" fill="${oc}"/>
            <path d="M 35 68 C 35 78, 65 78, 65 68" stroke="${ot}" stroke-width="3" fill="none"/>
            <line x1="45" y1="74" x2="44" y2="86" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
            <line x1="55" y1="74" x2="56" y2="86" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
        `;
    } else if (outfit === 'gown') {
        outfitSvg = `
            <path d="M 18 96 C 18 72, 34 66, 50 66 C 66 66, 82 72, 82 96 Z" fill="#0f172a"/>
            <!-- Golden stole -->
            <path d="M 37 66 L 44 96 L 50 96 L 46 66 Z" fill="#facc15"/>
            <path d="M 63 66 L 56 96 L 50 96 L 54 66 Z" fill="#facc15"/>
            <polygon points="50,71 52,75 56,75 53,78 54,82 50,80 46,82 47,78 44,75 48,75" fill="#eab308"/>
        `;
    } else if (outfit === 'varsity') {
        outfitSvg = `
            <path d="M 20 96 C 20 72, 35 66, 50 66 C 65 66, 80 72, 80 96 Z" fill="${oc}"/>
            <!-- Contrast Sleeves -->
            <path d="M 20 96 C 20 75, 28 70, 34 72 L 31 96 Z" fill="#f8fafc"/>
            <path d="M 80 96 C 80 75, 72 70, 66 72 L 69 96 Z" fill="#f8fafc"/>
            <!-- Collar trim -->
            <path d="M 36 67 Q 50 74 64 67" stroke="${ot}" stroke-width="3" fill="none"/>
            <!-- 'M' letter badge for Michael -->
            <text x="36" y="86" font-family="'Outfit', sans-serif" font-weight="900" font-size="10" fill="#facc15">M</text>
        `;
    }

    // 2. HAIR (BACK OR UNDER LAYER IF NEEDED)
    let hairBackSvg = '';
    const hc = hairColorObj.color;
    const hh = hairColorObj.highlight;

    if (hairStyle === 'afro') {
        hairBackSvg = `
            <circle cx="50" cy="42" r="26" fill="${hc}"/>
            <circle cx="32" cy="40" r="14" fill="${hc}"/>
            <circle cx="68" cy="40" r="14" fill="${hc}"/>
            <circle cx="50" cy="24" r="15" fill="${hh}" opacity="0.4"/>
        `;
    } else if (hairStyle === 'curls') {
        hairBackSvg = `
            <circle cx="50" cy="42" r="24" fill="${hc}"/>
            <circle cx="34" cy="36" r="10" fill="${hc}"/>
            <circle cx="66" cy="36" r="10" fill="${hc}"/>
            <circle cx="42" cy="25" r="9" fill="${hh}"/>
            <circle cx="58" cy="25" r="9" fill="${hh}"/>
        `;
    } else if (hairStyle === 'locs') {
        hairBackSvg = `
            <circle cx="50" cy="42" r="24" fill="${hc}"/>
            <rect x="25" y="34" width="7" height="26" rx="3.5" fill="${hc}"/>
            <rect x="30" y="36" width="6" height="28" rx="3" fill="${hh}"/>
            <rect x="68" y="34" width="7" height="26" rx="3.5" fill="${hc}"/>
            <rect x="64" y="36" width="6" height="28" rx="3" fill="${hh}"/>
        `;
    }

    // 3. HAIR (TOP LAYER)
    let hairTopSvg = '';
    if (hairStyle === 'short') {
        hairTopSvg = `
            <path d="M 31 40 Q 33 22 50 22 Q 67 22 69 40 Q 64 30 50 30 Q 36 30 31 40 Z" fill="${hc}"/>
            <path d="M 38 28 Q 50 24 62 28" stroke="${hh}" stroke-width="2" fill="none" opacity="0.6"/>
        `;
    } else if (hairStyle === 'fade') {
        hairTopSvg = `
            <path d="M 33 36 L 33 24 Q 50 21 67 24 L 67 36 Q 50 31 33 36 Z" fill="${hc}"/>
            <line x1="36" y1="26" x2="64" y2="26" stroke="${hh}" stroke-width="1.5" opacity="0.5"/>
        `;
    } else if (hairStyle === 'braids') {
        hairTopSvg = `
            <path d="M 32 38 Q 35 24 50 24 Q 65 24 68 38 Q 60 30 50 30 Q 40 30 32 38 Z" fill="${hc}"/>
            <line x1="38" y1="26" x2="42" y2="38" stroke="${hh}" stroke-width="1.5"/>
            <line x1="44" y1="24" x2="46" y2="38" stroke="${hh}" stroke-width="1.5"/>
            <line x1="50" y1="24" x2="50" y2="38" stroke="${hh}" stroke-width="1.5"/>
            <line x1="56" y1="24" x2="54" y2="38" stroke="${hh}" stroke-width="1.5"/>
            <line x1="62" y1="26" x2="58" y2="38" stroke="${hh}" stroke-width="1.5"/>
        `;
    } else if (hairStyle === 'wavy') {
        hairTopSvg = `
            <path d="M 30 42 Q 32 20 50 20 Q 68 20 70 42 Q 65 28 52 28 Q 38 28 30 42 Z" fill="${hc}"/>
            <path d="M 30 42 Q 26 50 29 58 Q 32 50 33 44 Z" fill="${hc}"/>
            <path d="M 70 42 Q 74 50 71 58 Q 68 50 67 44 Z" fill="${hc}"/>
        `;
    } else if (hairStyle === 'buzz') {
        hairTopSvg = `
            <path d="M 32 38 Q 35 25 50 25 Q 65 25 68 38 Q 60 32 50 32 Q 40 32 32 38 Z" fill="${hc}" opacity="0.8"/>
        `;
    }

    // 4. EYES / MOUTH (EXPRESSION)
    let faceFeaturesSvg = '';
    const skinCol = skinTone.color;
    const skinShad = skinTone.shadow;

    // Eyebrows
    let browsSvg = `
        <path d="M 38 41 Q 43 38 47 41" stroke="${hc}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <path d="M 53 41 Q 57 38 62 41" stroke="${hc}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    `;

    // Eyes
    let eyesSvg = '';
    if (expr === 'wink') {
        eyesSvg = `
            <ellipse cx="43" cy="46" rx="2.5" ry="3" fill="#171717"/>
            <circle cx="44" cy="45" r="0.8" fill="#ffffff"/>
            <path d="M 54 46 Q 58 43 62 46" stroke="#171717" stroke-width="2" fill="none" stroke-linecap="round"/>
        `;
    } else if (expr === 'happy') {
        eyesSvg = `
            <path d="M 40 46 Q 43 43 46 46" stroke="#171717" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M 54 46 Q 57 43 60 46" stroke="#171717" stroke-width="2" fill="none" stroke-linecap="round"/>
        `;
    } else {
        // Confident or Grin
        eyesSvg = `
            <ellipse cx="43" cy="46" rx="2.6" ry="3.1" fill="#171717"/>
            <ellipse cx="57" cy="46" rx="2.6" ry="3.1" fill="#171717"/>
            <circle cx="44" cy="45" r="0.9" fill="#ffffff"/>
            <circle cx="58" cy="45" r="0.9" fill="#ffffff"/>
        `;
    }

    // Mouth
    let mouthSvg = '';
    if (expr === 'grin') {
        mouthSvg = `
            <path d="M 43 54 Q 50 61 57 54 Z" fill="#ffffff" stroke="#9a3412" stroke-width="1.2"/>
        `;
    } else if (expr === 'happy') {
        mouthSvg = `
            <path d="M 44 54 Q 50 59 56 54" stroke="#9a3412" stroke-width="2" fill="none" stroke-linecap="round"/>
        `;
    } else {
        // Confident smirk
        mouthSvg = `
            <path d="M 45 55 Q 51 58 56 54" stroke="#9a3412" stroke-width="2" fill="none" stroke-linecap="round"/>
        `;
    }

    faceFeaturesSvg = browsSvg + eyesSvg + mouthSvg;

    // 5. EYEWEAR
    let eyewearSvg = '';
    if (eyewear === 'round') {
        eyewearSvg = `
            <circle cx="43" cy="46" r="6" stroke="#facc15" stroke-width="1.6" fill="rgba(255,255,255,0.15)"/>
            <circle cx="57" cy="46" r="6" stroke="#facc15" stroke-width="1.6" fill="rgba(255,255,255,0.15)"/>
            <line x1="49" y1="46" x2="51" y2="46" stroke="#facc15" stroke-width="1.6"/>
            <!-- Temple arms -->
            <line x1="37" y1="46" x2="33" y2="45" stroke="#facc15" stroke-width="1.4"/>
            <line x1="63" y1="46" x2="67" y2="45" stroke="#facc15" stroke-width="1.4"/>
        `;
    } else if (eyewear === 'sunglasses') {
        eyewearSvg = `
            <path d="M 36 43 L 49 43 L 48 50 Q 42 52 37 49 Z" fill="#0f172a"/>
            <path d="M 51 43 L 64 43 L 63 49 Q 58 52 52 50 Z" fill="#0f172a"/>
            <line x1="48" y1="44" x2="52" y2="44" stroke="#334155" stroke-width="2"/>
            <line x1="38" y1="45" x2="46" y2="45" stroke="#ffffff" stroke-width="1" opacity="0.6"/>
            <line x1="54" y1="45" x2="62" y2="45" stroke="#ffffff" stroke-width="1" opacity="0.6"/>
        `;
    } else if (eyewear === 'cyber') {
        eyewearSvg = `
            <rect x="31" y="39" width="38" height="13" rx="3.5" fill="#09090b" stroke="#ec4899" stroke-width="2"/>
            <line x1="34" y1="45" x2="66" y2="45" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="3,2"/>
            <circle cx="50" cy="45" r="2" fill="#ec4899"/>
        `;
    } else if (eyewear === 'goggles') {
        eyewearSvg = `
            <rect x="33" y="40" width="34" height="12" rx="5" fill="#0f172a" stroke="#22d3ee" stroke-width="1.5"/>
            <circle cx="41" cy="46" r="4.5" fill="#06b6d4" opacity="0.85"/>
            <circle cx="59" cy="46" r="4.5" fill="#06b6d4" opacity="0.85"/>
            <line x1="45" y1="46" x2="55" y2="46" stroke="#22d3ee" stroke-width="2"/>
        `;
    }

    // 6. HEADWEAR
    let headwearSvg = '';
    if (headwear === 'cap') {
        headwearSvg = `
            <polygon points="50,17 78,27 50,37 22,27" fill="#0f172a" stroke="#facc15" stroke-width="1.2"/>
            <rect x="36" y="28" width="28" height="6" rx="3" fill="#1e293b"/>
            <circle cx="50" cy="27" r="2.5" fill="#facc15"/>
            <path d="M 50 27 Q 66 29 68 43" stroke="#facc15" stroke-width="1.8" fill="none"/>
            <circle cx="68" cy="44" r="2" fill="#eab308"/>
        `;
    } else if (headwear === 'headphones') {
        headwearSvg = `
            <path d="M 28 46 A 23 23 0 0 1 72 46" fill="none" stroke="#0284c7" stroke-width="3.5"/>
            <rect x="25" y="40" width="6" height="14" rx="3" fill="#38bdf8"/>
            <rect x="69" y="40" width="6" height="14" rx="3" fill="#38bdf8"/>
        `;
    } else if (headwear === 'headband') {
        headwearSvg = `
            <rect x="30" y="32" width="40" height="7" rx="3" fill="#15803d"/>
            <rect x="30" y="34.5" width="40" height="2.5" fill="#facc15"/>
            <rect x="30" y="37" width="40" height="2" fill="#dc2626"/>
        `;
    } else if (headwear === 'beanie') {
        headwearSvg = `
            <ellipse cx="50" cy="26" rx="20" ry="12" fill="#475569"/>
            <rect x="30" y="26" width="40" height="7" rx="3.5" fill="#334155"/>
            <circle cx="50" cy="14" r="3.5" fill="#f8fafc"/>
        `;
    }

    return `
    <svg viewBox="0 0 100 100" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="${uid}-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="${bgObj.from}"/>
                <stop offset="100%" stop-color="${bgObj.to}"/>
            </linearGradient>
            <linearGradient id="${uid}-skin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${skinCol}"/>
                <stop offset="100%" stop-color="${skinShad}"/>
            </linearGradient>
        </defs>
        <!-- Background Circle -->
        <circle cx="50" cy="50" r="48" fill="url(#${uid}-bg)" stroke="${bgObj.border}" stroke-width="2.5"/>
        
        <!-- Hair Back Layer (Afro / Curls / Locs) -->
        ${hairBackSvg}

        <!-- Shoulders & Outfit -->
        ${outfitSvg}

        <!-- Neck -->
        <rect x="44" y="58" width="12" height="13" rx="4" fill="${skinShad}"/>

        <!-- Head / Face -->
        <!-- Ears -->
        <circle cx="31" cy="47" r="4" fill="${skinShad}"/>
        <circle cx="69" cy="47" r="4" fill="${skinShad}"/>
        <ellipse cx="50" cy="46" rx="18" ry="20" fill="url(#${uid}-skin)"/>

        <!-- Facial Features (Eyes, Eyebrows, Mouth) -->
        ${faceFeaturesSvg}

        <!-- Eyewear (Glasses, Sunglasses, Cyber Visor) -->
        ${eyewearSvg}

        <!-- Hair Front / Top Layer -->
        ${hairTopSvg}

        <!-- Headwear (Graduation Cap, Headphones, Headband, Beanie) -->
        ${headwearSvg}
    </svg>`;
}

const testCfg = {
    skin: 'medium-warm',
    hair: 'afro',
    hairColor: 'black',
    expression: 'confident',
    eyewear: 'round',
    headwear: 'cap',
    outfit: 'blazer',
    outfitColor: 'navy',
    bg: 'navy-indigo'
};

const svg = buildCustomAvatarSvg(testCfg, 100);
console.log('SVG built successfully, length:', svg.length);
