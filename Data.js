/* --- Data.js --- */

const suffixList = [
    'k', 'm', 'b', 't', 'qa', 'qi', 'sx', 'sp', 'oc', 'no', 
    'dc', 'ud', 'dd', 'td', 'qad', 'qid', 'sxd', 'spd', 'ocd', 'nod', 
    'vg', 'uvg', 'dvg', 'tvg'
];

const rankCostsData = [
    "0",          // Rank 0
    "30k",        // Rank 1
    "252k",       // Rank 2
    "2.12M",      // Rank 3
    "17.78M",     // Rank 4
    "149.36M",    // Rank 5
    "1.25B",      // Rank 6
    "10.54B",     // Rank 7
    "88.53B",     // Rank 8
    "743.63B",    // Rank 9
    "6.25T",      // Rank 10
    "52.47T",     // Rank 11
    "440.75T",    // Rank 12
    "3.7Qa",      // Rank 13
    "31.1Qa",     // Rank 14
    "261.23Qa",   // Rank 15
    "2.19Qi",     // Rank 16
    "18.43Qi",    // Rank 17
    "154.83Qi",   // Rank 18
    "1.30Sx",     // Rank 19
    "10.93Sx",    // Rank 20
    "91.77Sx",    // Rank 21
    "770.88Sx",   // Rank 22
    "6.48Sp",     // Rank 23
    "54.29Sp",    // Rank 24
    "456.90Sp",   // Rank 25
    "3.84Oc",     // Rank 26
    "32.24Oc",    // Rank 27
    "270.81Oc",   // Rank 28
    "2.27No",     // Rank 29
    "19.11No",    // Rank 30
    "160.51No",   // Rank 31
    "1.35Dc",     // Rank 32
    "11.33Dc",    // Rank 33
    "95.13Dc",    // Rank 34
    "799.13Dc",   // Rank 35
    "6.71Ud",     // Rank 36
    "56.39Ud",    // Rank 37
    "473.65Ud",   // Rank 38
    "3.98Dd",     // Rank 39
    "131.33Dd",   // Rank 40
    "2.84Td",     // Rank 41
    "25.24Td",    // Rank 42
    "224.65Td",   // Rank 43
    "752.4Td",       // Rank 44
    "6.55Qad",   // Rank 45
    "142.3Qad",   // Rank 46
    "1.14Qid",    // Rank 47
    "9.12Qid",    // Rank 48
    "72.9Qid",    // Rank 49
    "583.7Qid",   // Rank 50
    "4.67Sxd"     // Rank 51
];

const bijuuData = [
    { name: "None (+0%)", val: 100 }, { name: "Chomeiha (+50%)", val: 150 }, { name: "Shukaro (+100%)", val: 200 },
    { name: "Matabi (+200%)", val: 300 }, { name: "Isobuya (+300%)", val: 400 }, { name: "Son Goro (+400%)", val: 500 },
    { name: "Gyurin (+600%)", val: 700 }, { name: "Kurara (+1000%)", val: 1100 }
];

const magicEyeData = [
    { name: "None (+0%)", base: 0 }, { name: "Izula (+5%)", base: 5 }, { name: "Namoli (+10%)", base: 10 },
    { name: "Obir (+35%)", base: 35 }, { name: "Shizui (+50%)", base: 50 }, { name: "Itac (+70%)", base: 70 },
    { name: "Marara (+110%)", base: 110 }, { name: "Saske (+183%)", base: 183 }
];

const titlesData = [
    { name: "None (+0%)", val: 100 }, { name: "Apprentice (+50%)", val: 150 }, { name: "Adept (+100%)", val: 200 },
    { name: "Elementalist (+150%)", val: 250 }, { name: "Commander (+200%)", val: 300 }, { name: "Heroic Leader (+300%)", val: 400 },
    { name: "Shadow Emperor (+400%)", val: 500 }, { name: "Divine Guardian (+500%)", val: 600 }, { name: "Soul Reaper (+600%)", val: 700 },
    { name: "Eternal warlord (+700%)", val: 800 }, { name: "Ascending Legends (+800%)", val: 900 }, { name: "Titan Hunter (+900%)", val: 1000 },
    { name: "Shadow Monarch (+1000%)", val: 1100 }
];

const raceData = [
    { name: "None (+0%)", val: 100 }, { name: "Shark (+50%)", val: 150 }, { name: "Cyborg (+100%)", val: 200 },
    { name: "Sayajin (+200%)", val: 300 }, { name: "Angel (+400%)", val: 400 }, { name: "Dragon (+600%)", val: 600 }, { name: "Ghoul (+1000%)", val: 1100 }
];

const sayajinData = [
    { name: "None (+0%)", val: 100 }, { name: "Goha (+50%)", val: 150 }, { name: "Califa (+100%)", val: 200 },
    { name: "Truncs (+200%)", val: 300 }, { name: "Bardo (+300%)", val: 400 }, { name: "Vegetal (+400%)", val: 500 },
    { name: "Brol (+600%)", val: 700 }, { name: "Vegetal (+1000%)", val: 1100}
];

const hakiData = [
    { name: "None (+0%)", val: 100 }, { name: "Stone (+50%)", val: 150 }, { name: "Emerald (+100%)", val: 200 },
    { name: "Sapphire (+200%)", val: 300 }, { name: "Blossom (+300%)", val: 400 }, { name: "Golden (+400%)", val: 500 },
    { name: "Inferno (+600%)", val: 700 }, { name: "Phantom (+1000%)", val: 1100 }
];

const fruitsData = [
    { name: "None (+0%)", val: 100 }, { name: "Tremor Fruit (+50%)", val: 150 }, { name: "Ice Fruit (+100%)", val: 200 },
    { name: "Flame Fruit (+200%)", val: 300 }, { name: "Fruit of Love (+300%)", val: 400 }, { name: "Fruit of Darkness (+600%)", val: 700 }
];

const breathingData = [
    { name: "None (+0%)", val: 100 }, { name: "Fire (+50%)", val: 150 }, { name: "Water (+100%)", val: 200 },
    { name: "Nature (+200%)", val: 300 }, { name: "Lightning (+300%)", val: 400 }, { name: "Stone (+400%)", val: 500 },
    { name: "Sound (+600%)", val: 700 }, { name: "Blood (+1000%)", val: 1100 }
];

const demonArtData = [
     { name: "None (+0%)", base: 0 }, { name: "Donma (+5%)", base: 5 }, { name: "Enru (+10%)", base: 10 },
     { name: "Akazar (+35%)", base: 35 }, { name: "Koshibo (+50%)", base: 50 }, { name: "Gyuro (+70%)", base: 70 },
     { name: "Duke (+110%)", base: 110 }, { name: "Muzaro (+183%)", base: 183 }
];

const organizationData = [
    { name: "None (+0%)", val: 100 }, { name: "Flowers (+50%)", val: 150 }, { name: "Unicorn (+100%)", val: 200 },
    { name: "Wings (+200%)", val: 300 }, { name: "Swords (+300%)", val: 400 }, { name: "Snake (+400%)", val: 500 },
    { name: "Eagle (+600%)", val: 700 }, { name: "Dragon (+1000%)", val: 1100 }
];

const titanData = [
    { name: "None (+0%)", val: 100 }, { name: "Cart (+50%)", val: 150 }, { name: "Female (+100%)", val: 200 },
    { name: "Jaw (+200%)", val: 300 }, { name: "Armored (+300%)", val: 400 }, { name: "Beast (+400%)", val: 500 },
    { name: "Colossus (+600%)", val: 700 }, { name: "Hunter (+1000%)", val: 1100 }
];

const titanPetData = [
    { name: "None (+0%)", val: 100 },
    { name: "Messenger Pigeon (+50%)", val: 150 },
    { name: "Patrol Crow (+100%)", val: 200 },
    { name: "Small Horse (+200%)", val: 300 },
    { name: "Marley Owl (+300%)", val: 400 },
    { name: "Scout Dog (+400%)", val: 500 },
    { name: "White Bird (+600%)", val: 700 },
    { name: "Military Cat (+1000%)", val: 1100 }
];

const shinobiRaidData = [
    { name: "None (+0%)", val: 100 }, { name: "Base (+50%)", val: 150 }, { name: "Rage (+100%)", val: 200 },
    { name: "Beast (+200%)", val: 300 }, { name: "Light (+300%)", val: 400 }, { name: "Kitsune (+1000%)", val: 1100 }
];

const dungeonData = [
    { name: "None (+0%)", val: 100 }, { name: "Zoar (+50%)", val: 150 }, { name: "Mikoisa (+100%)", val: 200 },
    { name: "Ervim (+200%)", val: 300 }, { name: "Armon (+300%)", val: 400 }, { name: "Eron (+1000%)", val: 1100 }
];

const shadowsData = [
    { name: "None (+0%)", val: 100 }, { name: "Tenk (+50%)", val: 150 }, { name: "Greed (+100%)", val: 200 },
    { name: "Eron (+200%)", val: 300 }, { name: "Keisal (+300%)", val: 400 }, { name: "Berrion (+400%)", val: 500 },
    { name: "Igris (+600%)", val: 700 }
];

const soloRanksData = [
    { name: "None (+0%)", val: 100 }, 
    { name: "Rank-E (+50%)", val: 150 },
    { name: "Rank-C (+100%)", val: 200 },
    { name: "Rank-B (+200%)", val: 300 },
    { name: "Rank-A (+300%)", val: 400 },
    { name: "Rank-AA (+400%)", val: 500 },
    { name: "Rank-S (+600%)", val: 700 },
    { name: "Rank-SS (+1000%)", val: 1100 }
];

const shadowGateData = [
    { name: "None (+0%)", val: 100 }, 
    { name: "Yoo Jen-Hu (+50%)", val: 150 },
    { name: "Baek Yuon-ho (+100%)", val: 200 },
    { name: "Chui Jung-in (+200%)", val: 300 },
    { name: "Cha Hea-en (+400%)", val: 500 },
    { name: "Soung Jon-Woo (+1000%)", val: 1100 }
];

const achievementsData = [
    // 1. Secret Boss
    {
        title: "Secret Boss (Multiplier)",
        options: [
            { name: "None (+0%)", val: 100 },
            { name: "World 1 (+25%)", val: 125 },
            { name: "World 2 (+50%)", val: 150 },
            { name: "World 3 (+75%)", val: 175 },
            { name: "World 4 (+100%)", val: 200 },
            { name: "World 5 (+125%)", val: 225 },
            { name: "World 6 (+150%)", val: 250 }
        ]
    },
    // 2. Mastery
    {
        title: "Mastery",
        options: [
            { name: "None (+0%)", val: 100 },
            { name: "500K Mastery (+5%)", val: 105 },
            { name: "500M Mastery (+10%)", val: 110 },
            { name: "500B Mastery (+15%)", val: 115 },
            { name: "5Qi Mastery (+20%)", val: 120 },
            { name: "50Sx Mastery (+25%)", val: 125 },
            { name: "50Sp Mastery (+30%)", val: 130 },
            { name: "100Sp Mastery (+35%)", val: 135 },
            { name: "600Sp Mastery (+40%)", val: 140 },
            { name: "4Oc Mastery (+45%)", val: 145 },
            { name: "50Oc Mastery (+50%)", val: 150 },
            { name: "200Oc Mastery (+55%)", val: 155 },
            { name: "4No Mastery (+60%)", val: 160 },
            { name: "40No Mastery (+65%)", val: 165 },
            { name: "600No Mastery (+70%)", val: 170 },
            { name: "2Dc Mastery (+75%)", val: 175 }
        ]
    },
    // 3. Master Slayer
    {
        title: "Master Slayer",
        options: [
            { name: "None (+0%)", val: 100 },
            { name: "1K Kills! (+5%)", val: 105 },
            { name: "10k Kills! (+10%)", val: 110 },
            { name: "100k Kills! (+15%)", val: 115 },
            { name: "1M Kills! (+20%)", val: 120 },
            { name: "10M Kills! (+25%)", val: 125 },
            { name: "100M Kills! (+30%)", val: 130 }
        ]
    },
    // 4
    {
        title: "Easy Dungeon",
        options: [
            { name: "None (+0%)", val: 100 },
            { name: "Room 5! (+5%)", val: 105 },
            { name: "Room 15! (+10%)", val: 110 },
            { name: "Room 30! (+15%)", val: 115 },
            { name: "Room 40! (+20%)", val: 120 },
            { name: "Complete 25 times! (+30%)", val: 130 }
        ]
    },
    // 5
    {
        title: "Medium Dungeon",
        options: [
            { name: "None (+0%)", val: 100 },
            { name: "Room 5! (+5%)", val: 105 },
            { name: "Room 15! (+10%)", val: 110 },
            { name: "Room 30! (+15%)", val: 115 },
            { name: "Room 40! (+20%)", val: 120 },
            { name: "Room 50! (+25%)", val: 125 },
            { name: "Complete 25 times! (+35%)", val: 135 }
        ]
    },
    // 6
    {
        title: "Hard Dungeon",
        options: [
            { name: "None (+0%)", val: 100 },
            { name: "Room 5! (+5%)", val: 105 },
            { name: "Room 15! (+10%)", val: 110 },
            { name: "Room 30! (+15%)", val: 115 },
            { name: "Room 40! (+20%)", val: 120 },
            { name: "Room 50! (+25%)", val: 125 },
            { name: "Complete 25 times! (+35%)", val: 135 }
        ]
    },
    // 7
    {
        title: "Shinobi Raid",
        options: [
            { name: "None (+0%)", val: 100 },
            { name: "Wave 25! (+10%)", val: 110 },
            { name: "Wave 50! (+20%)", val: 120 },
            { name: "Wave 125! (+30%)", val: 130 },
            { name: "Wave 175! (+40%)", val: 140 },
            { name: "Wave 200! (+50%)", val: 150 },
            { name: "Wave 250! (+60%)", val: 160 },
            { name: "Wave 275! (+70%)", val: 170 },
            { name: "Wave 325! (+80%)", val: 180 },
            { name: "Wave 350! (+90%)", val: 190 },
            { name: "Wave 400! (+100%)", val: 200 },
            { name: "Wave 425! (+110%)", val: 210 }
        ]
    },
    // 8
    {
        title: "Defense",
        options: [
            { name: "None (+0%)", val: 100 },
            { name: "Wave 10! (+5%)", val: 105 },
            { name: "Wave 20! (+10%)", val: 110 },
            { name: "Wave 40! (+15%)", val: 115 },
            { name: "Wave 50! (+20%)", val: 120 },
            { name: "Wave 60! (+25%)", val: 125 },
            { name: "Wave 90! (+30%)", val: 130 },
            { name: "Wave 100! (+35%)", val: 135 },
            { name: "Wave 130! (+40%)", val: 140 },
            { name: "Wave 150! (+45%)", val: 145 },
            { name: "Wave 160! (+50%)", val: 150 }
        ]
    },
    // 9
    {
        title: "Shadow Gate",
        options: [
            { name: "None (+0%)", val: 100 },
            { name: "Wave 10! (+10%)", val: 110 },
            { name: "Wave 25! (+20%)", val: 120 },
            { name: "Wave 75! (+30%)", val: 130 },
            { name: "Wave 100! (+40%)", val: 140 },
            { name: "Wave 125! (+50%)", val: 150 },
            { name: "Wave 175! (+60%)", val: 160 },
            { name: "Wave 225! (+70%)", val: 170 },
            { name: "Wave 275! (+80%)", val: 180 },
            { name: "Wave 325! (+90%)", val: 190 },
            { name: "Wave 375! (+100%)", val: 200 },
            { name: "Wave 400! (+110%)", val: 210 },
            { name: "Wave 450! (+120%)", val: 220 },
            { name: "Wave 475! (+130%)", val: 230 }
        ]
    }
];

const gameData = {
    "Shinobi Village": [ 
        { name: "Zabuzao", hp: "5.78k" }, { name: "Tobao", hp: "615k" }, { name: "Nargato", hp: "20.75M" }, 
        { name: "Peixame", hp: "205M" }, { name: "Madeira", hp: "2B" }, { name: "Itaxin", hp: "30Qa" } 
    ],
    "Namek Planet": [ 
        { name: "Picole", hp: "3B" }, { name: "Frioso", hp: "797.85B" }, { name: "Friozaco", hp: "30T" }, 
        { name: "Bubu", hp: "1Qa" }, { name: "Jeromin", hp: "20Qa" }, { name: "Gekao", hp: "80Sx" } 
    ],
    "Desert Land": [ 
        { name: "Cobinha", hp: "40Qa" }, { name: "Buguinho", hp: "600Qa" }, { name: "Marcao", hp: "80Qi" }, 
        { name: "Cometa", hp: "3Sx" }, { name: "Edmundo", hp: "50Sx" }, { name: "Leopardo", hp: "80No" } 
    ],
    "Demon Land": [ 
        { name: "Demon", hp: "500Sx" }, { name: "Lyokko", hp: "80Sp" }, { name: "Jyutaro", hp: "4Oc" }, 
        { name: "Dola", hp: "300Oc" }, { name: "Mokushibo", hp: "10No" }, { name: "Alaza", hp: "6Dd" } 
    ],
    "Paradis": [ 
        { name: "Richala", hp: "700Dc" }, { name: "Famale Titan", hp: "80Ud" }, { name: "Mandile", hp: "5.5Dd" }, 
        { name: "Blind", hp: "100Dd" }, { name: "Colosso", hp: "5Td" } , { name: "Elen yage", hp: "200Qid" } 
    ],
    "Shadow City": [
        { name: "TangFak", hp: "8Td" }, { name: "Sunly", hp: "400Qad" }, { name: "Haler", hp: "20Qid" }, 
        { name: "Thomas", hp: "2Sxd" }, { name: "Frieze", hp: "50Spd" }, { name: "Belu", hp: "100Dc" }
    ]
};

const eggData = [
    { name: "Shinobi Village", cost: "25", currency: "Yen" },
    { name: "Namek Planet", cost: "500", currency: "Yen" },
    { name: "Desert Land", cost: "5k", currency: "Yen" },
    { name: "Demon Land", cost: "500k", currency: "Yen" },
    { name: "Paradis", cost: "500m", currency: "Yen" },
    { name: "Shadow City", cost: "50b", currency: "Yen" }
];

const themes = {
    rank: { primary: '#3b82f6', light: '#60a5fa', border: '#3b82f6', dim: 'rgba(59, 130, 246, 0.15)', glow: 'rgba(59, 130, 246, 0.5)' },
    mastery: { primary: '#ffffff', light: '#bf00ff', border: '#8700bd', dim: 'rgba(135, 0, 189, 0.3)', glow: 'rgba(163, 0, 222, 0.5)' },
    damage: { primary: '#ff003c', light: '#ff003c', border: '#c20030', dim: 'rgba(194, 0, 48, 0.25)', glow: 'rgba(194, 0, 48, 0.4)' },
    gacha: { primary: '#4ade80', light: '#86efac', border: '#4ade80', dim: 'rgba(74, 222, 128, 0.15)', glow: 'rgba(74, 222, 128, 0.5)' }
};