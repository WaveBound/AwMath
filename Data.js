/* --- Data.js --- */

const suffixList = [
    'k', 'm', 'b', 't', 'qa', 'qi', 'sx', 'sp', 'oc', 'no', 
    'dc', 'ud', 'dd', 'td', 'qad', 'qid', 'sxd', 'spd', 'ocd', 'nod', 
    'vg', 'uvg', 'dvg', 'tvg'
];

const rankCostsData = [
     "0", "30k", "252k", "2.12M", "17.78M", "149.36M", "1.25B", "10.54B", "88.53B", "743.63B",
     "6.25T", "52.47T", "440.75T", "3.7Qa", "31.1Qa", "261.23Qa", "2.19Qi", "18.43Qi", "154.83Qi",
     "1.30Sx", "10.93Sx", "91.77Sx", "770.88Sx", "6.48Sp", "54.29Sp", "456.90Sp", "3.84Oc", "32.24Oc",
     "270.81Oc", "2.27No", "19.11No", "160.51No", "1.35Dc", "11.33Dc", "95.13Dc", "799.13Dc", "6.71Ud",
     "56.39Ud", "473.65Ud", "3.98Dd", "33.42Dd", "280.73Dd", "2.36Td", "19.81Td", "166.39Td", "1.40Qad"
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
    { name: "Eternal warlord (+700%)", val: 800 }, { name: "Ascending Legends (+800%)", val: 900 }, { name: "Titan Hunter (+900%)", val: 1000 }
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

const shinobiRaidData = [
    { name: "None (+0%)", val: 100 }, { name: "Base (+50%)", val: 150 }, { name: "Rage (+100%)", val: 200 },
    { name: "Beast (+200%)", val: 300 }, { name: "Light (+300%)", val: 400 }, { name: "Kitsune (+1000%)", val: 1100 }
];

const dungeonData = [
    { name: "None (+0%)", val: 100 }, { name: "Zoar (+50%)", val: 150 }, { name: "Mikoisa (+100%)", val: 200 },
    { name: "Ervim (+200%)", val: 300 }, { name: "Armon (+300%)", val: 400 }, { name: "Eron (+1000%)", val: 1100 }
];

const achievementOptions = [
    { name: "None (+0%)", val: 100 }, 
    { name: "World 1 (+25%)", val: 125 }, 
    { name: "World 2 (+50%)", val: 150 },
    { name: "World 3 (+75%)", val: 175 },
    { name: "World 4 (+100%)", val: 200 },
    { name: "World 5 (+125%)", val: 225 },
    { name: "World 6 (+150%)", val: 250 }
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
    ]
};

const themes = {
    rank: { primary: '#3b82f6', light: '#60a5fa', border: '#3b82f6', dim: 'rgba(59, 130, 246, 0.15)', glow: 'rgba(59, 130, 246, 0.5)' },
    mastery: { primary: '#ffffff', light: '#bf00ff', border: '#8700bd', dim: 'rgba(135, 0, 189, 0.3)', glow: 'rgba(163, 0, 222, 0.5)' },
    damage: { primary: '#ff003c', light: '#ff003c', border: '#c20030', dim: 'rgba(194, 0, 48, 0.25)', glow: 'rgba(194, 0, 48, 0.4)' },
    gacha: { primary: '#4ade80', light: '#86efac', border: '#4ade80', dim: 'rgba(74, 222, 128, 0.15)', glow: 'rgba(74, 222, 128, 0.5)' }
};