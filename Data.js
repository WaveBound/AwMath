/* --- Data.js --- */

// --- Helpers ---
const mk = (names, vals, key = 'val') => names.map((n, i) => ({
    name: `${n} (+${vals[i]}%)`, 
    [key]: key === 'val' ? 100 + vals[i] : vals[i] 
}));

const ach = (title, names, vals) => ({ title, options: mk(names, vals) });

const suffixList = ['K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc','Ud','Dd','Td','Qad','Qid','Sxd','Spd','Ocd','Nod','Dec','Und','Duo','Tri','Qua','Qui','Six','Sep','Oct','Nuo'];

const rankCostsData = [
    "0", "30k", "252k", "2.12M", "17.78M", "149.36M", "1.25B", "10.54B", "88.53B", "743.63B", 
    "6.25T", "52.47T", "440.75T", "3.7Qa", "31.1Qa", "261.23Qa", "2.19Qi", "18.43Qi", "154.83Qi", 
    "1.30Sx", "10.93Sx", "91.77Sx", "770.88Sx", "6.48Sp", "54.29Sp", "456.90Sp", "3.84Oc", "32.24Oc", 
    "270.81Oc", "2.27No", "19.11No", "160.51No", "1.35Dc", "11.33Dc", "95.13Dc", "799.13Dc", "6.71Ud", 
    "56.39Ud", "473.65Ud", "3.98Dd", "131.33Dd", "2.84Td", "25.24Td", "224.65Td", "752.4Td", "6.55Qad", 
    "56.95Qad", "1.41Qid", "12.54Qid", "111.65Qid", "993.65Qid", "???", "???"
];

const bijuuData = mk(
    ["None", "Chomeiha", "Shukaro", "Matabi", "Isobuya", "Son Goro", "Gyurin", "Kurara"],
    [0, 50, 100, 200, 300, 400, 600, 1000]
);

const magicEyeData = mk(
    ["None", "Izula", "Namoli", "Obir", "Shizui", "Itac", "Marara", "Saske"],
    [0, 5, 10, 35, 50, 70, 110, 183], 'base'
);

const titlesData = mk(
    ["None", "Apprentice", "Adept", "Elementalist", "Commander", "Heroic Leader", "Shadow Emperor", "Divine Guardian", "Soul Reaper", "Eternal warlord", "Ascending Legends", "Titan Hunter", "Shadow Monarch"],
    [0, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
);

const raceData = mk(
    ["None", "Shark", "Cyborg", "Sayajin", "Angel", "Dragon", "Ghoul"],
    [0, 50, 100, 200, 400, 600, 1000]
);

const sayajinData = mk(
    ["None", "Goha", "Califa", "Truncs", "Bardo", "Vegetal", "Brol", "Vegetal"],
    [0, 50, 100, 200, 300, 400, 600, 1000]
);

const hakiData = mk(
    ["None", "Stone", "Emerald", "Sapphire", "Blossom", "Golden", "Inferno", "Phantom"],
    [0, 50, 100, 200, 300, 400, 600, 1000]
);

const fruitsData = mk(
    ["None", "Tremor Fruit", "Ice Fruit", "Flame Fruit", "Fruit of Love", "Fruit of Darkness"],
    [0, 50, 100, 200, 300, 600]
);

const breathingData = mk(
    ["None", "Fire", "Water", "Nature", "Lightning", "Stone", "Sound", "Blood"],
    [0, 50, 100, 200, 300, 400, 600, 1000]
);

const demonArtData = mk(
    ["None", "Donma", "Enru", "Akazar", "Koshibo", "Gyuro", "Duke", "Muzaro"],
    [0, 5, 10, 35, 50, 70, 110, 183], 'base'
);

const organizationData = mk(
    ["None", "Flowers", "Unicorn", "Wings", "Swords", "Snake", "Eagle", "Dragon"],
    [0, 50, 100, 200, 300, 400, 600, 1000]
);

const titanData = mk(
    ["None", "Cart", "Female", "Jaw", "Armored", "Beast", "Colossus", "Hunter"],
    [0, 50, 100, 200, 300, 400, 600, 1000]
);

const titanPetData = mk(
    ["None", "Messenger Pigeon", "Patrol Crow", "Small Horse", "Marley Owl", "Scout Dog", "White Bird", "Military Cat"],
    [0, 50, 100, 200, 300, 400, 600, 1000]
);

const shinobiRaidData = mk(
    ["None", "Base", "Rage", "Beast", "Light", "Kitsune"],
    [0, 50, 100, 200, 300, 1000]
);

const dungeonData = mk(
    ["None", "Zoar", "Mikoisa", "Ervim", "Armon", "Eron"],
    [0, 50, 100, 200, 300, 1000]
);

const shadowsData = mk(
    ["None", "Tenk", "Greed", "Eron", "Keisal", "Berrion", "Igris"],
    [0, 50, 100, 200, 300, 400, 600]
);

const soloRanksData = mk(
    ["None", "Rank-E", "Rank-C", "Rank-B", "Rank-A", "Rank-AA", "Rank-S", "Rank-SS"],
    [0, 50, 100, 200, 300, 400, 600, 1000]
);

const shadowGateData = mk(
    ["None", "Yoo Jen-Hu", "Baek Yuon-ho", "Chui Jung-in", "Cha Hea-en", "Soung Jon-Woo"],
    [0, 50, 100, 200, 400, 1000]
);

// --- NEW DATA ADDED HERE ---
const captainsData = mk(
    ["None", "Morgom", "Nezani", "Tagishi", "Helmego", "Copy", "Rima", "Smoky"],
    [0, 50, 100, 200, 300, 400, 600, 1000]
);

const pirateTowerData = mk(
    ["None", "Ghoul Soul", "Strong Punch", "Earthquake Punch", "Ice Aura", "Gear 5"],
    [0, 50, 100, 200, 400, 800]
);
// ----------------------------

const achievementsData = [
    ach("Secret Boss (Multiplier)", ["None", "World 1", "World 2", "World 3", "World 4", "World 5", "World 6", "World 7"], [0, 25, 50, 75, 100, 125, 150, 175]),
    ach("Mastery", ["None", "500K Mastery", "500M Mastery", "500B Mastery", "5Qi Mastery", "50Sx Mastery", "50Sp Mastery", "100Sp Mastery", "600Sp Mastery",
    "4Oc Mastery", "50Oc Mastery", "200Oc Mastery", "4No Mastery", "40No Mastery", "600No Mastery", "2Dc Mastery", "80Dc Mastery", "5Ud Mastery",
    "90Ud Mastery", "1Dd Mastery", "10Dd Maastery"], 
    [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]),
    ach("Master Slayer", ["None", "1K Kills!", "10k Kills!", "100k Kills!", "1M Kills!", "10M Kills!", "20M Kills!", "30M Kills!"], [0, 5, 10, 15, 20, 25, 30, 35, 40]),
    ach("Easy Dungeon", ["None", "Room 5!", "Room 15!", "Room 30!", "Room 40!", "Complete 25 times!"], [0, 5, 10, 15, 20, 30]),
    ach("Medium Dungeon", ["None", "Room 5!", "Room 15!", "Room 30!", "Room 40!", "Room 50!", "Complete 25 times!"], [0, 5, 10, 15, 20, 25, 35]),
    ach("Hard Dungeon", ["None", "Room 5!", "Room 15!", "Room 30!", "Room 40!", "Room 50!", "Complete 25 times!"], [0, 5, 10, 15, 20, 25, 35]),
    ach("Shinobi Raid", ["None", "Wave 25!", "Wave 50!", "Wave 125!", "Wave 175!", "Wave 200!", "Wave 250!", "Wave 275!", "Wave 325!", "Wave 350!", "Wave 400!", "Wave 425!"], [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110]),
    ach("Defense", ["None", "Wave 10!", "Wave 20!", "Wave 40!", "Wave 50!", "Wave 60!", "Wave 90!", "Wave 100!", "Wave 130!", "Wave 150!", "Wave 160!"], [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]),
    ach("Shadow Gate", ["None", "Wave 10!", "Wave 25!", "Wave 75!", "Wave 100!", "Wave 125!", "Wave 175!", "Wave 225!", "Wave 275!", "Wave 325!", "Wave 375!", "Wave 400!", "Wave 450!", "Wave 475!"], [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130]),
    ach("Pirate Tower", ["None", "Floor 5!", "Floor 10!", "Floor 20!", "Floor 25!", "Floor 30!", "Floor 35!", "Floor 45!", "Floor 60!", "Floor 65", "Floor 80!", "Floor 90!", "Floor 95!"], [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120])
];

const gameData = {
    "Shinobi Village": [ {name:"Zabuzao",hp:"5.78k"}, {name:"Tobao",hp:"615k"}, {name:"Nargato",hp:"20.75M"}, {name:"Peixame",hp:"205M"}, {name:"Madeira",hp:"2B"}, {name:"Itaxin",hp:"30Qa"} ],
    "Namek Planet": [ {name:"Picole",hp:"3B"}, {name:"Frioso",hp:"797.85B"}, {name:"Friozaco",hp:"30T"}, {name:"Bubu",hp:"1Qa"}, {name:"Jeromin",hp:"20Qa"}, {name:"Gekao",hp:"80Sx"} ],
    "Desert Land": [ {name:"Cobinha",hp:"40Qa"}, {name:"Buguinho",hp:"600Qa"}, {name:"Marcao",hp:"80Qi"}, {name:"Cometa",hp:"3Sx"}, {name:"Edmundo",hp:"50Sx"}, {name:"Leopardo",hp:"80No"} ],
    "Demon Land": [ {name:"Demon",hp:"500Sx"}, {name:"Lyokko",hp:"80Sp"}, {name:"Jyutaro",hp:"4Oc"}, {name:"Dola",hp:"300Oc"}, {name:"Mokushibo",hp:"10No"}, {name:"Alaza",hp:"6Dd"} ],
    "Paradis": [ {name:"Richala",hp:"700Dc"}, {name:"Famale Titan",hp:"80Ud"}, {name:"Mandile",hp:"5.5Dd"}, {name:"Blind",hp:"100Dd"}, {name:"Colosso",hp:"5Td"} , {name:"Elen yage",hp:"200Qid"} ],
    "Shadow City": [ {name:"TangFak",hp:"8Td"}, {name:"Sunly",hp:"400Qad"}, {name:"Haler",hp:"20Qid"}, {name:"Thomas",hp:"2Sxd"}, {name:"Frieze",hp:"50Spd"}, {name:"Belu",hp:"100Dc"} ],
    "Marine Island": [ {name:"Soldier",hp:"10Spd"}, {name:"Captain",hp:"50Ocd"}, {name:"Vice Admiral",hp:"2Nod"}, {name:"Admiral",hp:"500Vg"} ]
};

const waveScalingData = {
    "Shinobi": { base: "300B", increment: "4T" },
    "Shadow Gate": { base: "375No", increment: "5Dc" },
    "AoT Defense": { base: "6Oc", increment: "6Oc" },
    "None": { base: "0", increment: "0", overrides: null }
};

const eggData = [
    { name: "Shinobi Village", cost: "25", currency: "Yen" },
    { name: "Namek Planet", cost: "500", currency: "Yen" },
    { name: "Desert Land", cost: "5k", currency: "Yen" },
    { name: "Demon Land", cost: "500k", currency: "Yen" },
    { name: "Paradis", cost: "500m", currency: "Yen" },
    { name: "Shadow City", cost: "50b", currency: "Yen" },
    { name: "Marine Island", cost: "500b", currency: "Yen" }
];

const themes = {
    rank: { primary: '#3b82f6', light: '#60a5fa', border: '#3b82f6', dim: 'rgba(59, 130, 246, 0.15)', glow: 'rgba(59, 130, 246, 0.5)' },
    mastery: { primary: '#ffffff', light: '#bf00ff', border: '#8700bd', dim: 'rgba(135, 0, 189, 0.3)', glow: 'rgba(163, 0, 222, 0.5)' },
    damage: { primary: '#ff003c', light: '#ff003c', border: '#c20030', dim: 'rgba(194, 0, 48, 0.25)', glow: 'rgba(194, 0, 48, 0.4)' },
    gacha: { primary: '#4ade80', light: '#86efac', border: '#4ade80', dim: 'rgba(74, 222, 128, 0.15)', glow: 'rgba(74, 222, 128, 0.5)' }
};

const mapUIConfig = [
    {
        mapId: "ShinobiVillage",
        items: [
            { type: 'select', label: 'Bijuu Gacha', id: 'potBijuuSelect', source: bijuuData },
            { type: 'special', label: 'Magic Eyes', id: 'potMagicEyeSelect', lvlId: 'potMagicEyeLevel', source: magicEyeData }
        ]
    },
    {
        mapId: "NamekPlanet",
        items: [
            { type: 'select', label: 'Race Gacha', id: 'potRaceSelect', source: raceData },
            { type: 'select', label: 'Sayajin Gacha', id: 'potSayajinSelect', source: sayajinData },
            { type: 'select', label: 'Titles', id: 'potTitlesSelect', source: titlesData },
            { type: 'trainer', label: 'Wise Trainer (%)', id: 'potWiseTrainerInput' }
        ]
    },
    {
        mapId: "DesertLand",
        items: [
            { type: 'select', label: 'Haki Gacha', id: 'potHakiSelect', source: hakiData },
            { type: 'select', label: 'Fruits Gacha', id: 'potFruitsSelect', source: fruitsData },
            { type: 'trainer', label: 'Pirate Trainer (%)', id: 'potPirateTrainerInput' }
        ]
    },
    {
        mapId: "DemonLand",
        items: [
            { type: 'select', label: 'Breathing Gacha', id: 'potBreathingSelect', source: breathingData },
            { type: 'trainer', label: 'Breath Trainer (%)', id: 'potBreathTrainerInput' },
            { type: 'special', label: 'Demon Art', id: 'potDemonArtSelect', lvlId: 'potDemonArtLevel', source: demonArtData }
        ]
    },
    {
        mapId: "Paradis",
        items: [
            { type: 'select', label: 'Titan Gacha', id: 'potTitanSelect', source: titanData },
            { type: 'select', label: 'Titan Pet', id: 'potTitanPetSelect', source: titanPetData },
            { type: 'trainer', label: 'Leve Trainer (%)', id: 'potLeveTrainerInput' },
            { type: 'select', label: 'Organization', id: 'potOrgSelect', source: organizationData }
        ]
    },
    {
        mapId: "ShadowCity",
        items: [
            { type: 'select', label: 'Shadows Gacha', id: 'potShadowsSelect', source: shadowsData },
            { type: 'select', label: 'Shadow Gate', id: 'potShadowGateSelect', source: shadowGateData },
            { type: 'select', label: 'Solo Rank', id: 'potSoloRankSelect', source: soloRanksData }
        ]
    },
    {
        mapId: "MarineIsland",
        items: [
            { type: 'select', label: 'Captains Gacha', id: 'potCaptainsSelect', source: captainsData },
            { type: 'select', label: 'Pirate Tower', id: 'potPirateTowerSelect', source: pirateTowerData },
            { type: 'trainer', label: 'Sanji Trainer (%)', id: 'potSanjiTrainerInput' }
        ]
    }
];