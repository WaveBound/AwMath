/* --- script.js --- */

// 1. HELPER FUNCTIONS
const qs = (sel) => document.querySelector(sel);
const getEl = (id) => document.getElementById(id);
const getVal = (id) => { const el = getEl(id); return el ? el.value : ''; };
const getDataVal = (sel) => { const el = qs(`[data-id="${sel}"]`); return el ? el.getAttribute('data-value') : '0'; };

// Suffix Logic
const suffixMap = suffixList.reduce((acc, v) => ({...acc, [v.toLowerCase()]: v}), {});
const suffixExponents = { "none": 0 };
suffixList.forEach((k, i) => suffixExponents[k] = i + 1);

function parseSuffixed(str) {
    const m = (str || "").match(/^([\d\.]+)\s*([a-zA-Z]+)?$/);
    if (!m) return 0n;
    const exp = suffixExponents[suffixMap[(m[2] || "none").toLowerCase()] || "none"] || 0;
    return BigInt(Math.round(parseFloat(m[1]) * 100)) * (10n ** BigInt(exp * 3));
}

function parseInput(inputId, suffixId) {
    const raw = parseFloat(getVal(inputId));
    if (isNaN(raw) || raw < 0) return 0n;
    const suf = getDataVal(suffixId);
    return BigInt(Math.round(raw * 100)) * (10n ** BigInt((suffixExponents[suf] || 0) * 3));
}

function formatNumber(n) {
    if (n === 0n) return "0";
    let val = Number(n) / 100, idx = 0;
    while (val >= 1000 && idx < Object.keys(suffixMap).length) { val /= 1000; idx++; }
    if (idx === 0) return val.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2});
    return (Math.round(val * 100) / 100).toFixed(2) + Object.values(suffixMap)[idx-1];
}

function formatTime(s) {
    if (s === Infinity) return "Forever"; if (s === 0) return "Instant";
    const y = Math.floor(s/31536000), d = Math.floor((s%31536000)/86400), h = Math.floor((s%86400)/3600), m = Math.floor((s%3600)/60), sec = Math.floor(s%60);
    if (y>=1000) return "1000+ y";
    if (y+d+h+m === 0 && s < 1) return s.toFixed(2)+"s";
    return `${y?y+'y ':''}${d?d+'d ':''}${h?h+'h ':''}${m?m+'m ':''}${(y+d===0)?sec+'s':''}`.trim();
}

// 2. STATE
const state = { 
    rankCps: 5.8, masteryCps: 5.8, damageCps: 5.8, 
    unitCount: 0, isPotentialOpen: false, 
    potentialMult: 1, potentialPotionMult: 1, gachaFast: true 
};

// 3. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    // Clear specific inputs on load
    ['itemAccessoryInput', 'playerStatsInput', 'playerAuraInput', 'playerAvatarInput'].forEach(id => {
        const el = getEl(id); if(el) el.value = "";
    });

    setTheme('rank');

    // --- INITIALIZE DROPDOWNS ---
    // We wrap this in a try-catch to ensure one failure doesn't kill the page
    try {
        // Simple lists
        const suffixes = ['suffixSelect', 'currentMasterySuffixSelect', 'damageSuffixSelect', 'rankMpcSuffix', 'rankCurrentMasterySuffix'];
        suffixes.forEach(id => initDropdown(id, suffixList, 'none'));

        // Data Lists
        initDropdown('potBijuuSelect', bijuuData, 100);
        initDropdown('potMagicEyeSelect', magicEyeData, 0);
        initDropdown('potTitlesSelect', titlesData, 100);
        initDropdown('potRaceSelect', raceData, 100);
        initDropdown('potSayajinSelect', sayajinData, 100);
        initDropdown('potHakiSelect', hakiData, 100);
        initDropdown('potFruitsSelect', fruitsData, 100);
        initDropdown('potBreathingSelect', breathingData, 100);
        initDropdown('potDemonArtSelect', demonArtData, 0);
        initDropdown('potOrgSelect', organizationData, 100);
        initDropdown('potTitanSelect', titanData, 100);
        initDropdown('potTitanPetSelect', titanPetData, 100);
        initDropdown('potShinobiRaidSelect', shinobiRaidData, 100);
        initDropdown('potDungeonSelect', dungeonData, 100);
        initDropdown('potShadowsSelect', shadowsData, 100);
        initDropdown('potShadowGateSelect', shadowGateData, 100);
        initDropdown('potSoloRankSelect', soloRanksData, 100);

        // Complex Lists
        initRankDropdowns(); 
        initMapDropdown(); 
        initMobCountDropdown(); 
        initPotentialRankDropdown(); 
        initAchievementsDropdowns(); 
        initEggCostDropdown(); 
        initWavePlayerDropdown();

        // Attach logic to all dropdowns
        document.querySelectorAll('.custom-select').forEach(setupCustomSelect);
    } catch(e) { console.error("Dropdown Init Failed:", e); }

    // --- BUTTONS & TOGGLES ---
    setupSpeedToggle('fastBtn', 'slowBtn', 'masteryCps', updateMastery);
    setupSpeedToggle('dmgFastBtn', 'dmgSlowBtn', 'damageCps', updateDamage);
    setupSpeedToggle('rankFastBtn', 'rankSlowBtn', 'rankCps', updateRank);
    setupMultiplierToggle('pot2xBtn', 'potNo2xBtn', 'potentialMult', updatePotential);

    const potP = getEl('potPotionBtn'), potNP = getEl('potNoPotionBtn');
    if(potP && potNP) {
        potP.onclick = () => { state.potentialPotionMult = 1.5; potP.classList.add('active'); potNP.classList.remove('active'); updatePotential(); };
        potNP.onclick = () => { state.potentialPotionMult = 1; potNP.classList.add('active'); potP.classList.remove('active'); updatePotential(); };
    }

    const gFast = getEl('gachaFastBtn'), gNorm = getEl('gachaNormalBtn');
    if(gFast && gNorm) {
        gFast.onclick = () => { state.gachaFast = true; gFast.classList.add('active'); gNorm.classList.remove('active'); updateGacha(); };
        gNorm.onclick = () => { state.gachaFast = false; gNorm.classList.add('active'); gFast.classList.remove('active'); updateGacha(); };
    }

    const wClear = getEl('waveClearBtn'), wObtain = getEl('waveObtainBtn');
    if(wClear && wObtain) {
        wClear.onclick = () => { wClear.classList.add('active'); wObtain.classList.remove('active'); updateWave(); };
        wObtain.onclick = () => { wObtain.classList.add('active'); wClear.classList.remove('active'); updateWave(); };
    }

    // --- EVENT LISTENERS ---
    // Update everything on any input change
    document.addEventListener('input', (e) => {
        if (e.target.tagName === 'INPUT') updateAll();
    });

    // Auto-format suffix inputs
    ['dmgInput', 'currentMasteryInput', 'damageDmgInput', 'rankMpcInput', 'rankCurrentMasteryInput'].forEach(id => {
        const el = getEl(id);
        if(el) setupSuffixInput(el, el.nextElementSibling.getAttribute('data-id'), updateAll);
    });

    // --- VIEW SWITCHING ---
    const btnOpen = getEl('btnOpenPotential'), btnBack = getEl('btnBackPotential');
    if(btnOpen && btnBack) {
        const masterMain = getEl('mastery-main-view'), masterSub = getEl('mastery-potential-view');
        btnOpen.onclick = (e) => {
            e.preventDefault(); state.isPotentialOpen = true; 
            masterMain.style.display = 'none'; masterSub.style.display = 'block'; 
            safeClassAdd('#unitsPanel', 'active'); safeClassAdd('#statsPanel', 'active'); 
            safeClassAdd('#achievementsPanel', 'active'); safeClassRemove('#sidePanel', 'active');
            document.querySelectorAll('.custom-select').forEach(el => fitTextToContainer(el.querySelector('.select-selected span')));
        };
        btnBack.onclick = () => {
            state.isPotentialOpen = false; masterSub.style.display = 'none'; masterMain.style.display = 'block';
            safeClassRemove('#unitsPanel', 'active'); safeClassRemove('#statsPanel', 'active'); safeClassRemove('#achievementsPanel', 'active');
        };
    }

    // --- UNITS ---
    const uBtn = getEl('addUnitBtn');
    if(uBtn) {
        for(let i=0; i<8; i++) addUnitInput();
        uBtn.onclick = () => { 
            if (state.unitCount < 16) { 
                addUnitInput(); 
                if(state.unitCount < 16) addUnitInput(); 
                getEl('unitInputsContainer').scrollTop = 0; 
            } 
            if(state.unitCount >= 16) { uBtn.textContent="Max Limit"; uBtn.style.opacity="0.5"; } 
            updatePotential();
        };
    }

    // --- CLICK HANDLING ---
    document.addEventListener('click', (e) => { 
        if (!e.target.closest('.select-selected') && !e.target.closest('.portal-dropdown')) closeAllPortals(); 
    });

    // --- MAX BUTTONS ---
    const btnMaxMap = getEl('btnMaxMap'), btnMaxGlobal = getEl('btnMaxGlobal');
    if(btnMaxMap) btnMaxMap.onclick = () => { maximizeSection(getEl(`map-${getDataVal('potMapSelect')}`)); updatePotential(); };
    if(btnMaxGlobal) btnMaxGlobal.onclick = () => { document.querySelectorAll('.map-section').forEach(maximizeSection); updatePotential(); };

    // Initial Calc
    updateAll();
    // Fit text for all dropdowns on load
    setTimeout(() => {
        document.querySelectorAll('.custom-select').forEach(el => fitTextToContainer(el.querySelector('.select-selected span')));
    }, 100);
});

/* --- GENERATORS --- */

function initDropdown(id, data, def) {
    const parent = qs(`[data-id="${id}"]`);
    if(!parent) return; // Defensive check
    const s = parent.querySelector('.select-items');
    if(!s) return;

    const isStr = typeof data[0] === 'string';
    s.innerHTML = ''; // Clear existing
    
    // Add "None" option if implied by default or string array
    if(id.includes('Suffix')) s.innerHTML += '<div data-value="none">None</div>';
    
    data.forEach((item) => {
        const val = isStr ? (item.val || suffixMap[item.toLowerCase()] || item) : (item.val || item.base || item);
        const name = isStr ? item : item.name;
        s.innerHTML += `<div data-value="${val}">${name}</div>`;
    });
    
    // Set Default
    parent.setAttribute('data-value', def);
    const span = parent.querySelector('.select-selected span');
    
    if(def === 'none' || def === '0' || def === 0) {
        span.textContent = (id.includes('Suffix') || def === 'none') ? 'None' : 'None (+0%)';
        // Try to find the specific "None" item name if available
        if(!isStr && data.length > 0) {
             const found = data.find(x => (x.val||x.base) == def);
             if(found) span.textContent = found.name;
        }
    } else {
       const found = isStr ? data.find(x => x === def) : data.find(x => (x.val||x.base) == def);
       if(found) span.textContent = isStr ? found : found.name;
       else span.textContent = "Select";
    }
    
    // Mark selected in list
    s.querySelectorAll('div').forEach(d => {
        if(d.getAttribute('data-value') == def) d.classList.add('same-as-selected');
    });
}

function initRankDropdowns() {
    ['currentRankSelect', 'targetRankSelect'].forEach(id => {
        const s = qs(`[data-id="${id}"] .select-items`);
        if(!s) return;
        rankCostsData.forEach((_, i) => s.innerHTML += `<div data-value="${i}">Rank ${i}</div>`);
        s.parentElement.setAttribute('data-value', id.startsWith('c') ? '0':'1');
        s.previousElementSibling.querySelector('span').textContent = `Rank ${id.startsWith('c') ? '0':'1'}`;
        // Set initial selected class
        const def = id.startsWith('c') ? '0':'1';
        const opt = s.querySelector(`div[data-value="${def}"]`);
        if(opt) opt.classList.add('same-as-selected');
    });
}

function initPotentialRankDropdown() {
    const el = getEl('potRankOptions');
    if(!el) return;
    rankCostsData.forEach((_, i) => el.innerHTML += `<div data-value="${i}">Rank ${i}</div>`);
    qs('[data-id="potRankSelect"]').setAttribute('data-value', '0');
    el.firstElementChild.classList.add('same-as-selected');
}

function initMapDropdown() {
    const el = getEl('mapOptions'), potEl = getEl('potMapOptions');
    const maps = Object.keys(gameData);
    maps.forEach((m, i) => {
        if(el) el.innerHTML += `<div data-value="${m}">${m}</div>`;
        if(potEl) potEl.innerHTML += `<div data-value="${m.replace(/\s+/g, '')}">${m}</div>`;
    });
    
    const potSel = qs('[data-id="potMapSelect"]');
    if(potSel && maps.length > 0) {
        potSel.setAttribute('data-value', maps[0].replace(/\s+/g, ''));
        potSel.querySelector('span').textContent = maps[0];
        if(potEl) potEl.firstElementChild.classList.add('same-as-selected');
    }
}

function initAchievementsDropdowns() {
    const cont = getEl('achievementsContainer');
    if(!cont) return;
    achievementsData.forEach((a, i) => {
        const d = document.createElement('div');
        d.className = 'input-group';
        d.innerHTML = `<label>${a.title}</label><div class="custom-select full-width" data-id="achieveSelect${i+1}"><div class="select-selected"><span>None (+0%)</span><div class="select-arrow"></div></div><div class="select-items select-hide" id="achieveOptions${i+1}"></div></div>`;
        cont.appendChild(d);
        const el = getEl(`achieveOptions${i+1}`);
        a.options.forEach((o, x) => el.innerHTML += `<div data-value="${o.val}" class="${x===0?'same-as-selected':''}">${o.name}</div>`);
        qs(`[data-id="achieveSelect${i+1}"]`).setAttribute('data-value', '100');
    });
}

function initEggCostDropdown() {
    const el = getEl('eggCostOptions'), p = qs('[data-id="eggCostSelect"]');
    if(!el || !p) return;
    eggData.forEach((d, i) => el.innerHTML += `<div data-value="${d.name}" data-cost="${d.cost}" data-curr="${d.currency}" class="${i===0?'same-as-selected':''}">${d.name} (${d.cost})</div>`);
    p.setAttribute('data-value', eggData[0].name); p.setAttribute('data-cost', eggData[0].cost); p.setAttribute('data-curr', eggData[0].currency);
}

function initMobCountDropdown() {
    const el = getEl('mobCountOptions');
    if(!el) return;
    for(let i=1; i<=10; i++) el.innerHTML += `<div data-value="${i}" class="${i===1?'same-as-selected':''}">${i}</div>`;
}

function initWavePlayerDropdown() {
    const el = getEl('wavePlayerOptions');
    if(!el) return;
    for(let i=1; i<=12; i++) el.innerHTML += `<div data-value="${i}" class="${i===1?'same-as-selected':''}">${i}</div>`;
}

function addUnitInput() {
    const cont = getEl('unitInputsContainer');
    if(!cont) return;
    state.unitCount++;
    const d = document.createElement('div'); d.className = 'input-group unit-input-group';
    d.innerHTML = `<label>Unit ${state.unitCount} (%)</label><input type="number" class="numeric-input unit-input" placeholder="0">`;
    cont.appendChild(d);
}

/* --- CALCULATION UPDATES --- */

function updateAll() { updateMastery(); updateDamage(); updateRank(); updatePotential(); updateGacha(); updateWave(); }

function updateMastery() {
    const base = parseInput('dmgInput', 'suffixSelect');
    const cur = parseInput('currentMasteryInput', 'currentMasterySuffixSelect');
    let dps = (base > 0n) ? base * BigInt(Math.round(state.masteryCps * 100)) / 100n : 0n;
    
    const resBox = getEl('resultBox'); if(resBox) resBox.innerHTML = dps ? formatNumber(dps) : "--";
    const phRes = getEl('perHourResult'); if(phRes) phRes.innerHTML = dps ? formatNumber(dps * 3600n) : "--";
    const pdRes = getEl('perDayResult'); if(pdRes) pdRes.innerHTML = dps ? formatNumber(dps * 86400n) : "--";
    
    const sec = BigInt((parseInt(getVal('dayInput'))||0)*86400 + (parseInt(getVal('hourInput'))||0)*3600 + (parseInt(getVal('minuteInput'))||0)*60);
    const tmRes = getEl('totalMasteryResult'); if(tmRes) tmRes.innerHTML = (base > 0n || cur > 0n) ? formatNumber(cur + (dps * sec)) : "--";
}

function updateRank() {
    const mpc = parseInput('rankMpcInput', 'rankMpcSuffix');
    const cur = parseInput('rankCurrentMasteryInput', 'rankCurrentMasterySuffix');
    const start = parseInt(getDataVal('currentRankSelect')) || 0;
    const end = parseInt(getDataVal('targetRankSelect')) || 1;
    
    let mps = (mpc > 0n) ? mpc * BigInt(Math.round(state.rankCps * 100)) / 100n : 0n;
    const rMps = getEl('rankMpsResult'); if(rMps) rMps.innerHTML = mps ? formatNumber(mps) : "--";

    const bar = getEl('rankProgressBar'), txt = getEl('rankPercentLabel');
    const tCost = getEl('rankCostResult'), tRem = getEl('rankCostRemainingResult'), tTime = getEl('rankTimeResult');

    if(!bar || !tCost) return;

    if (start >= end) {
        tCost.innerHTML = "--"; tRem.innerHTML = "--"; tTime.innerHTML = "Target too low";
        bar.style.width = "0%"; txt.innerHTML = "0%"; return;
    }

    let cost = 0n;
    for(let i=start+1; i<=end; i++) if(i < rankCostsData.length) cost += parseSuffixed(rankCostsData[i]);
    
    tCost.innerHTML = formatNumber(cost);
    const rem = (cost > cur) ? cost - cur : 0n;
    tRem.innerHTML = formatNumber(rem);
    
    const pct = (cost > 0n) ? Math.min(100, Number((cur * 10000n) / cost) / 100) : 0;
    bar.style.width = pct + "%"; txt.innerHTML = pct.toFixed(1) + "%";
    
    if (rem === 0n) tTime.innerHTML = "0.00s";
    else if (mps > 0n) { const s = Number(rem) / Number(mps); tTime.innerHTML = (s < 60) ? s.toFixed(2)+"s" : formatTime(s); } 
    else tTime.innerHTML = "Infinite";
}

function updatePotential() {
    const wVal = parseFloat(getVal('itemWeaponInput'));
    const base = BigInt(Math.round((isNaN(wVal) || wVal === 0 ? 1 : wVal) * 100));

    // Multipliers config to save space
    const config = [
        {id:'potDungeonCoinInput',t:'n'}, {id:'potDungeonCurrencyInput',t:'n'},
        {id:'potWiseTrainerInput',t:'200'}, {id:'potPirateTrainerInput',t:'200'},
        {id:'potBreathTrainerInput',t:'200'}, {id:'potLeveTrainerInput',t:'200'},
        {id:'itemAccessoryInput',t:'n'}, {id:'playerStatsInput',t:'n'},
        {id:'playerAuraInput',t:'n'}, {id:'playerAvatarInput',t:'n'},
        {id:'potBijuuSelect',t:'v'}, {id:'potTitlesSelect',t:'v'},
        {id:'potRaceSelect',t:'v'}, {id:'potSayajinSelect',t:'v'},
        {id:'potHakiSelect',t:'v'}, {id:'potFruitsSelect',t:'v'},
        {id:'potBreathingSelect',t:'v'}, {id:'potOrgSelect',t:'v'},
        {id:'potTitanSelect',t:'v'}, {id:'potTitanPetSelect',t:'v'},
        {id:'potShinobiRaidSelect',t:'v'}, {id:'potDungeonSelect',t:'v'},
        {id:'potShadowsSelect',t:'v'}, {id:'potShadowGateSelect',t:'v'},
        {id:'potSoloRankSelect',t:'v'}
    ];

    let product = base;
    let factorCount = 0;

    // Process Simple Configs
    config.forEach(c => {
        let val = 100n;
        if(c.t === 'v') {
            val = BigInt(getDataVal(c.id));
        } else if(c.t === 'n' || c.t === '200') {
            const raw = parseInt(getVal(c.id)) || 0;
            if(c.t === '200' && raw > 200) { getEl(c.id).value = 200; val = 300n; } // 100+200
            else val = BigInt(raw + 100);
        }
        product *= val;
        factorCount++;
    });

    // Special: Magic Eye
    const eyeBase = parseFloat(getDataVal('potMagicEyeSelect'));
    let eyeLvl = parseInt(getVal('potMagicEyeLevel')) || 0;
    if (eyeLvl > 50) { eyeLvl = 50; getEl('potMagicEyeLevel').value = 50; }
    let eyeBonus = eyeBase + (eyeBase * 0.1 * eyeLvl);
    if (Math.round(eyeBonus) === 1098 && eyeLvl === 50) eyeBonus = 1100;
    product *= BigInt(Math.round(100 + eyeBonus)); factorCount++;
    // Update Span
    const eyeItem = magicEyeData.find(e => e.base === eyeBase);
    if(eyeItem) qs('[data-id="potMagicEyeSelect"] span').textContent = `${eyeItem.name.split(' (')[0]} (+${Math.round(eyeBonus)}%)`;

    // Special: Demon Art
    const daBase = parseFloat(getDataVal('potDemonArtSelect'));
    let daLvl = parseInt(getVal('potDemonArtLevel')) || 0;
    if (daLvl > 50) { daLvl = 50; getEl('potDemonArtLevel').value = 50; }
    let daBonus = daBase + (daBase * 0.1 * daLvl);
    if (Math.round(daBonus) === 1098 && daLvl === 50) daBonus = 1100;
    product *= BigInt(Math.round(100 + daBonus)); factorCount++;
    const daItem = demonArtData.find(e => e.base === daBase);
    if(daItem) qs('[data-id="potDemonArtSelect"] span').textContent = `${daItem.name.split(' (')[0]} (+${Math.round(daBonus)}%)`;

    // Special: Rank
    const r = BigInt(getDataVal('potRankSelect'));
    if (r > 0n) product *= (100n + (100n * (2n ** (r - 1n)))); else product *= 100n;
    factorCount++;

    // Special: Units
    let uTot = 0;
    document.querySelectorAll('.unit-input').forEach(i => uTot += parseFloat(i.value)||0);
    getEl('unitsTotalResult').innerHTML = uTot.toLocaleString() + "%";
    product *= BigInt(Math.round(100 + uTot)); factorCount++;

    // Special: Achievements
    const secret = BigInt(getDataVal('achieveSelect1'));
    let other = 0;
    for(let i=2; i<=achievementsData.length; i++) other += (parseInt(getDataVal(`achieveSelect${i}`)||100) - 100);
    getEl('achievementsTotalResult').textContent = other + "%";
    product *= secret; factorCount++;
    product *= BigInt(100 + other); factorCount++;

    // Final Math
    const divisor = 100n ** BigInt(factorCount);
    let result = product / divisor;

    result = result * BigInt(state.potentialMult);
    if (state.potentialPotionMult === 1.5) result = (result * 15n) / 10n;
    
    const potRes = getEl('potMpcResult'); if(potRes) potRes.innerHTML = (result > 0n) ? formatNumber(result) : "0";
}

function updateDamage() {
    const baseDmg = parseInput('damageDmgInput', 'damageSuffixSelect');
    const critPercent = parseFloat(getVal('critInput')) || 0;
    const heroPercent = parseFloat(getVal('heroDmgInput')) || 0;
    
    const mobSel = qs('[data-id="mobSelect"]');
    const hpString = mobSel ? mobSel.getAttribute('data-hp') : "0";
    const hpBox = getEl('mobHpResultBox'); if(hpBox) hpBox.textContent = hpString || "--";
    
    const mobHp = parseSuffixed(hpString);
    const mobCount = parseInt(getDataVal('mobCountSelect')) || 1;

    const multScaled = BigInt(Math.round(1000 + (critPercent * 5))); 
    const cpsScaled = BigInt(Math.round(state.damageCps * 100)); 
    const numClick = baseDmg * cpsScaled * multScaled;
    const numHero = baseDmg * BigInt(Math.round(heroPercent * 2000));
    const totalNum = numClick + numHero; 

    const dps = getEl('dmgPerSecResult'), mpm = getEl('mobsPerMinuteResult');
    const mph = getEl('mobsPerHourResult'), ttk = getEl('timeToKillResult');
    const dMin = getEl('dropsPerMinuteResult'), dHr = getEl('dropsPerHourResult');

    if(!dps) return;
    if (baseDmg <= 0n) { dps.innerHTML="--"; mpm.innerHTML="--"; mph.innerHTML="--"; ttk.innerHTML="0s"; dMin.innerHTML="--"; dHr.innerHTML="--"; return; }
    
    dps.innerHTML = formatNumber(totalNum / 100000n);

    if (mobHp <= 0n) { ttk.innerHTML="Select Mob"; mpm.innerHTML="--"; mph.innerHTML="--"; dMin.innerHTML="--"; dHr.innerHTML="--"; return; }

    let sec = 0;
    const oneHit = baseDmg * multScaled;
    if (oneHit >= (mobHp * 1000n)) sec = 0;
    else {
        if (totalNum === 0n) { ttk.innerHTML="Forever"; return; }
        sec = Number((mobHp * 100000n * 100n) / totalNum) / 100;
    }

    ttk.innerHTML = (sec < 60) ? sec.toFixed(2) + "s" : formatTime(sec);

    const respawn = 2.0;
    let kpm = 0;
    if (mobCount === 1) {
        const cycle = sec + respawn;
        if (cycle > 0) kpm = 60 / cycle;
    } else {
        const limit = (sec > 0) ? (respawn / sec) : 999999;
        kpm = Math.min(mobCount, limit) * (60/respawn);
    }

    mpm.innerHTML = kpm.toLocaleString(undefined, {maxFractionDigits: 2});
    mph.innerHTML = (kpm*60).toLocaleString(undefined, {maxFractionDigits: 2});

    const chance = (parseFloat(getVal('dropChanceInput'))||0) / 100;
    const amt = (parseFloat(getVal('dropAmountInput'))||0) * ((parseFloat(getVal('dropMultiInput'))||100)/100);
    dMin.innerHTML = (kpm * chance * amt).toLocaleString(undefined, {maxFractionDigits: 2});
    dHr.innerHTML = (kpm * 60 * chance * amt).toLocaleString(undefined, {maxFractionDigits: 2});
}

function updateGacha() {
    const amt = parseInt(getVal('gachaAmountInput')) || 1;
    const prob = ((parseFloat(getVal('gachaLegInput'))||0) + (parseFloat(getVal('gachaMythInput'))||0)) / 100;
    const egg = qs('[data-id="eggCostSelect"]');
    if(!egg) return;
    const cost = parseSuffixed(egg.getAttribute('data-cost'));

    const baseT = state.gachaFast ? 1.2 : 2.0;
    const avgT = baseT + ((1 - Math.pow(1 - prob, amt)) * 1.0);
    const eps = (avgT > 0) ? amt / avgT : 0;

    const dur = (parseInt(getVal('gachaDayInput'))||0)*86400 + (parseInt(getVal('gachaHourInput'))||0)*3600 + (parseInt(getVal('gachaMinuteInput'))||0)*60;
    const opens = Math.floor(eps * dur);

    getEl('gachaRealSpeedResult').innerHTML = eps.toLocaleString(undefined, {maxFractionDigits: 2});
    getEl('gachaPerHourResult').innerHTML = Math.floor(eps * 3600).toLocaleString();
    getEl('gachaTotalCostResult').innerHTML = formatNumber(BigInt(opens) * cost);
    getEl('gachaTotalCostLabel').innerHTML = `Total ${egg.getAttribute('data-curr')} Cost`;
    getEl('gachaTotalOpensResult').innerHTML = opens.toLocaleString();
}

function updateWave() {
    let wave = parseInt(getVal('waveInput')) || 1;
    if (wave > 1000) { wave = 1000; getEl('waveInput').value = 1000; }
    if (wave < 1) { wave = 1; getEl('waveInput').value = 1; }

    const wOb = getEl('waveObtainBtn');
    if (wOb && wOb.classList.contains('active') && wave > 1) wave--;

    const mode = getDataVal('waveModeSelect');
    const data = waveScalingData[mode];
    
    const els = { mob: getEl('waveMobHpResult'), boss: getEl('waveBossHpResult'), total: getEl('waveTotalHpResult'), dps: getEl('waveDpsResult') };
    if (!data || mode === "None") { Object.values(els).forEach(e => {if(e) e.innerHTML = "--"}); return; }

    let hp = parseSuffixed(data.base);
    let inc = parseSuffixed(data.increment);
    const isShinobi = (mode === "Shinobi" || mode === "Shadow Gate");
    
    if (isShinobi) {
        if (wave <= 5) hp = (wave === 1) ? hp : (hp * [0n, 8n, 12n, 16n, 200n][wave-1]) / 3n;
        else {
            hp = (hp * 200n) / 3n;
            for (let w = 6; w <= wave; w++) {
                hp += inc;
                if (w % 5 === 0) { hp *= 10n; inc *= 10n; }
            }
        }
    } else {
        for (let w = 2; w <= wave; w++) {
            hp += inc;
            if (w % 5 === 0) { hp *= 10n; inc *= 10n; }
        }
    }

    const players = parseInt(getDataVal('wavePlayerSelect')) || 1;
    if (players > 1) hp = (hp * BigInt(100 + ((players - 1) * 25))) / 100n;

    let mobHp = (mode === "AoT Defense") ? hp / 4n : (hp * 12n) / 100n;
    let total = hp + mobHp;

    els.mob.innerHTML = formatNumber(mobHp);
    els.boss.innerHTML = formatNumber(hp);
    els.total.innerHTML = formatNumber(total);
    els.dps.innerHTML = formatNumber(total / 60n);
}

/* --- UI HELPERS --- */

function setupSpeedToggle(fId, sId, key, cb) {
    const f = getEl(fId), s = getEl(sId);
    if(!f || !s) return;
    f.onclick = () => { state[key] = 5.8; f.classList.add('active'); s.classList.remove('active'); cb(); };
    s.onclick = () => { state[key] = 4.5; s.classList.add('active'); f.classList.remove('active'); cb(); };
}

function setupMultiplierToggle(onId, offId, key, cb) {
    const on = getEl(onId), off = getEl(offId);
    if(!on || !off) return;
    on.onclick = () => { state[key] = 2; on.classList.add('active'); off.classList.remove('active'); cb(); };
    off.onclick = () => { state[key] = 1; off.classList.add('active'); on.classList.remove('active'); cb(); };
}

function setupSuffixInput(inp, selId, cb) {
    const h = () => {
        const m = inp.value.trim().match(/^([\d\.]+)\s*([a-zA-Z]+)$/);
        if (m && suffixMap[m[2].toLowerCase()]) {
            inp.value = m[1];
            const sel = qs(`[data-id="${selId}"]`);
            if(sel) {
                const val = suffixMap[m[2].toLowerCase()];
                sel.setAttribute('data-value', val);
                sel.querySelector('span').textContent = val;
                const items = sel.querySelectorAll('.select-items div');
                items.forEach(d => d.classList.remove('same-as-selected'));
                const match = Array.from(items).find(d => d.getAttribute('data-value') == val);
                if(match) match.classList.add('same-as-selected');
            }
        }
        cb();
    };
    inp.addEventListener('blur', h); 
    inp.addEventListener('keydown', e => { if(e.key==='Enter') { e.preventDefault(); h(); inp.blur(); }});
}

function setTheme(name) {
    const t = themes[name]; if(!t) return;
    const r = document.documentElement.style;
    r.setProperty('--primary', t.primary); r.setProperty('--primary-light', t.light);
    r.setProperty('--primary-border', t.border); r.setProperty('--primary-dim', t.dim); r.setProperty('--primary-glow', t.glow);
}

function safeClassAdd(sel, cls) { const el = qs(sel); if(el) el.classList.add(cls); }
function safeClassRemove(sel, cls) { const el = qs(sel); if(el) el.classList.remove(cls); }

// DROPDOWN PORTAL LOGIC
let activePortal = null;
function closeAllPortals() { if (activePortal) { activePortal.remove(); activePortal = null; } document.querySelectorAll('.select-selected').forEach(el => el.classList.remove('select-arrow-active')); }

function setupCustomSelect(sel) {
    const selected = sel.querySelector('.select-selected');
    const items = sel.querySelector('.select-items'); 
    
    if(!selected || !items) return;

    selected.addEventListener('click', e => { 
        e.stopPropagation(); 
        if (selected.classList.contains('select-arrow-active')) { closeAllPortals(); return; }
        
        closeAllPortals(); 
        selected.classList.add('select-arrow-active'); 
        
        const rect = selected.getBoundingClientRect();
        const portal = document.createElement('div');
        portal.className = 'portal-dropdown';
        portal.style.width = rect.width + 'px';
        portal.style.left = rect.left + 'px';
        
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        if (spaceBelow < 200 && spaceAbove > spaceBelow) {
            portal.style.bottom = (window.innerHeight - rect.top) + 'px';
            portal.style.maxHeight = Math.min(250, spaceAbove - 10) + 'px';
            portal.style.flexDirection = 'column-reverse'; 
        } else {
            portal.style.top = (rect.bottom + 5) + 'px';
            portal.style.maxHeight = Math.min(250, spaceBelow - 10) + 'px';
        }

        // Clone content to portal
        portal.innerHTML = items.innerHTML;
        document.body.appendChild(portal);
        activePortal = portal;

        // Attach listeners to portal items
        portal.querySelectorAll('div').forEach(div => {
            div.addEventListener('click', (evt) => {
                evt.stopPropagation();
                const val = div.getAttribute('data-value');
                const txt = div.textContent;
                
                // Update Original Select
                sel.setAttribute('data-value', val);
                ['data-hp', 'data-cost', 'data-curr'].forEach(attr => {
                    if(div.hasAttribute(attr)) sel.setAttribute(attr, div.getAttribute(attr));
                });

                const span = selected.querySelector('span');
                if(span) { span.textContent = txt; fitTextToContainer(span); }

                // Update visual state of original items
                items.querySelectorAll('div').forEach(d => d.classList.remove('same-as-selected'));
                const originalOption = Array.from(items.children).find(c => c.getAttribute('data-value') == val);
                if(originalOption) originalOption.classList.add('same-as-selected');

                // Logic Hooks
                const id = sel.getAttribute('data-id');
                if (id === 'mapSelect') {
                    const mobs = gameData[val] || [];
                    const mobOpt = getEl('mobOptions');
                    if(mobOpt) {
                        mobOpt.innerHTML = mobs.length ? '' : '<div data-value="none">No Mobs</div>';
                        mobs.forEach((m, i) => mobOpt.innerHTML += `<div data-value="${m.name}" data-hp="${m.hp}" class="${i===0?'same-as-selected':''}">${m.name}</div>`);
                        const first = mobs[0] || {name:'No Mobs', hp:''};
                        const ms = qs('[data-id="mobSelect"]');
                        if(ms) {
                            ms.setAttribute('data-value', first.name); ms.setAttribute('data-hp', first.hp);
                            ms.querySelector('span').textContent = first.name;
                        }
                    }
                }
                
                // Rank logic
                if (id === 'currentRankSelect' || id === 'targetRankSelect') {
                     const cur = parseInt(getDataVal('currentRankSelect'));
                     document.querySelectorAll('#targetRankOptions div').forEach(d => d.classList.toggle('disabled', parseInt(d.getAttribute('data-value')) <= cur));
                     if(id === 'currentRankSelect') {
                         const tgt = parseInt(getDataVal('targetRankSelect'));
                         if(tgt <= parseInt(val)) {
                             const tSel = qs('[data-id="targetRankSelect"]');
                             const newVal = Math.min(parseInt(val)+1, rankCostsData.length-1);
                             tSel.setAttribute('data-value', newVal); 
                             tSel.querySelector('span').textContent = `Rank ${newVal}`;
                         }
                     }
                }

                if (id === 'potMapSelect') {
                    document.querySelectorAll('.map-section').forEach(sec => sec.classList.remove('active'));
                    const targetSec = getEl(`map-${val}`);
                    if(targetSec) targetSec.classList.add('active');
                }

                closeAllPortals();
                updateAll();
            });
        });
    });
}

function maximizeSection(section) {
    if (!section) return;
    section.querySelectorAll('.custom-select').forEach(sel => {
        const items = sel.querySelector('.select-items');
        if (items && items.children.length > 0) {
            const last = items.lastElementChild;
            const val = last.getAttribute('data-value');
            const txt = last.textContent;
            sel.setAttribute('data-value', val);
            const span = sel.querySelector('span');
            span.textContent = txt; fitTextToContainer(span);
        }
    });
    section.querySelectorAll('input.numeric-input, input.compact-input').forEach(input => {
        input.value = input.id.toLowerCase().includes('level') ? 50 : 200; 
    });
}

function fitTextToContainer(span) {
    if(!span) return;
    let size = 16; span.style.fontSize = size + 'px';
    const parent = span.parentElement; if(!parent || parent.clientWidth === 0) return; 
    const maxWidth = parent.clientWidth - 45; 
    while (span.scrollWidth > maxWidth && size > 9) { size--; span.style.fontSize = size + 'px'; }
}

window.addEventListener('resize', closeAllPortals);
window.addEventListener('scroll', (e) => { if (activePortal && (e.target === activePortal || activePortal.contains(e.target))) return; closeAllPortals(); }, true);

// Tab Logic
document.querySelectorAll('.tab-button').forEach(b => {
    b.onclick = () => {
        document.querySelectorAll('.tab-button, .tab-content').forEach(el => el.classList.remove('active'));
        b.classList.add('active');
        const tab = b.dataset.tab;
        const content = getEl(tab + '-content');
        if(content) content.classList.add('active');
        setTheme(tab);

        safeClassRemove('#sidePanel', 'active');
        safeClassRemove('#unitsPanel', 'active');
        safeClassRemove('#statsPanel', 'active');
        safeClassRemove('#achievementsPanel', 'active');
        safeClassRemove('#wavePanel', 'active');

        if (tab === 'damage') {
            safeClassAdd('#sidePanel', 'active'); 
            safeClassAdd('#wavePanel', 'active');
        } 
        else if (tab === 'mastery' && state.isPotentialOpen) {
            safeClassAdd('#unitsPanel', 'active'); 
            safeClassAdd('#statsPanel', 'active'); 
            safeClassAdd('#achievementsPanel', 'active'); 
        }
    };
});