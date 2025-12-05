const dom = {
    // Rank Tab
    rankMpc: document.getElementById('rankMpcInput'),
    rankCur: document.getElementById('rankCurrentMasteryInput'),
    rankMps: document.getElementById('rankMpsResult'),
    rankCost: document.getElementById('rankCostResult'),
    rankRem: document.getElementById('rankCostRemainingResult'),
    rankTime: document.getElementById('rankTimeResult'),
    rankBar: document.getElementById('rankProgressBar'),
    rankPcnt: document.getElementById('rankPercentLabel'),
    
    // Mastery Tab
    dmg: document.getElementById('dmgInput'),
    masCur: document.getElementById('currentMasteryInput'),
    masRes: document.getElementById('resultBox'),
    masHr: document.getElementById('perHourResult'),
    masDay: document.getElementById('perDayResult'),
    masTot: document.getElementById('totalMasteryResult'),
    dInput: document.getElementById('dayInput'),
    hInput: document.getElementById('hourInput'),
    mInput: document.getElementById('minuteInput'),
    
    // Potential Tab
    potCoin: document.getElementById('potDungeonCoinInput'),
    potCurr: document.getElementById('potDungeonCurrencyInput'),
    potEyeLvl: document.getElementById('potMagicEyeLevel'),
    potWise: document.getElementById('potWiseTrainerInput'),
    potPirate: document.getElementById('potPirateTrainerInput'), 
    potBreathTrainer: document.getElementById('potBreathTrainerInput'), 
    potDemonArtLvl: document.getElementById('potDemonArtLevel'), 
    potLeveTrainer: document.getElementById('potLeveTrainerInput'),
    potRes: document.getElementById('potMpcResult'),
    
    // Potential - Units Panel
    uContainer: document.getElementById('unitInputsContainer'),
    uAddBtn: document.getElementById('addUnitBtn'),
    uRes: document.getElementById('unitsTotalResult'),
    unitsPanel: document.getElementById('unitsPanel'),

    // Potential - Stats Panel
    statsPanel: document.getElementById('statsPanel'),
    itemWeapon: document.getElementById('itemWeaponInput'),
    itemAccessory: document.getElementById('itemAccessoryInput'),
    playerStats: document.getElementById('playerStatsInput'),
    playerAura: document.getElementById('playerAuraInput'),
    playerAvatar: document.getElementById('playerAvatarInput'),
    
    // Achievements
    achievementsPanel: document.getElementById('achievementsPanel'),
    achieveContainer: document.getElementById('achievementsContainer'),

    // Damage Tab
    dmgDmg: document.getElementById('damageDmgInput'),
    crit: document.getElementById('critInput'),
    dmgHero: document.getElementById('heroDmgInput'),
    mobHp: document.getElementById('mobHpResultBox'),
    dpsRes: document.getElementById('dmgPerSecResult'),
    mpmRes: document.getElementById('mobsPerMinuteResult'),
    mphRes: document.getElementById('mobsPerHourResult'),
    ttkRes: document.getElementById('timeToKillResult'),
    
    // Drops
    dropAmt: document.getElementById('dropAmountInput'),
    dropMul: document.getElementById('dropMultiInput'),
    dropChn: document.getElementById('dropChanceInput'),
    dropMin: document.getElementById('dropsPerMinuteResult'),
    dropHr: document.getElementById('dropsPerHourResult'),
    panel: document.getElementById('sidePanel'),
    
    // Gacha Tab
    gachaAmt: document.getElementById('gachaAmountInput'),
    gachaLeg: document.getElementById('gachaLegInput'),
    gachaMyth: document.getElementById('gachaMythInput'),
    gachaSpd: document.getElementById('gachaRealSpeedResult'),
    gachaHr: document.getElementById('gachaPerHourResult'),
    
    gDay: document.getElementById('gachaDayInput'),
    gHour: document.getElementById('gachaHourInput'),
    gMin: document.getElementById('gachaMinuteInput'),
    gachaCostRes: document.getElementById('gachaTotalCostResult'),
    gachaCostLabel: document.getElementById('gachaTotalCostLabel'),
    gachaOpensRes: document.getElementById('gachaTotalOpensResult'),

    // Wave Panel
    waveIn: document.getElementById('waveInput'),
    waveMode: document.querySelector('[data-id="waveModeSelect"]'),
    waveMob: document.getElementById('waveMobHpResult'),
    waveBoss: document.getElementById('waveBossHpResult'),
    waveTotal: document.getElementById('waveTotalHpResult'),
    waveDps: document.getElementById('waveDpsResult')
};

const state = { rankCps: 5.8, masteryCps: 5.8, damageCps: 5.8, unitCount: 0, isPotentialOpen: false, potentialMult: 1, potentialPotionMult: 1, gachaFast: true };

const suffixMap = suffixList.reduce((acc, v) => ({...acc, [v.toLowerCase()]: v}), {});

const suffixes = { "none": 0 }; 
// FIXED: Use the suffixList directly to set exponents
suffixList.forEach((k, i) => suffixes[k] = i + 1);

document.addEventListener('DOMContentLoaded', () => {
    const inputsToClear = [ dom.itemAccessory, dom.playerStats, dom.playerAura, dom.playerAvatar ];
    inputsToClear.forEach(input => input.value = "");
    setTheme('rank');
    initSuffixDropdowns(); initRankDropdowns(); initMapDropdown(); initMobCountDropdown(); initPotentialRankDropdown(); 
    initBijuuDropdown(); initMagicEyeDropdown(); initTitlesDropdown(); initRaceDropdown(); initSayajinDropdown(); 
    initHakiDropdown(); initFruitsDropdown(); initBreathingDropdown(); initDemonArtDropdown(); initOrganizationDropdown(); 
    initTitanDropdown(); initTitanPetDropdown(); initShinobiRaidDropdown(); initDungeonDropdown(); initPotentialMapDropdown(); initShadowsDropdown(); 
    initShadowGateDropdown(); initSoloRankDropdown(); initAchievementsDropdowns(); initEggCostDropdown(); initWavePlayerDropdown();

    document.querySelectorAll('.custom-select').forEach(setupCustomSelect);
    setupSpeedToggle('fastBtn', 'slowBtn', 'masteryCps', updateMastery);
    setupSpeedToggle('dmgFastBtn', 'dmgSlowBtn', 'damageCps', updateDamage);
    setupSpeedToggle('rankFastBtn', 'rankSlowBtn', 'rankCps', updateRank);
    setupMultiplierToggle('pot2xBtn', 'potNo2xBtn', 'potentialMult', updatePotential);

    const potPotionBtn = document.getElementById('potPotionBtn');
    const potNoPotionBtn = document.getElementById('potNoPotionBtn');
    potPotionBtn.addEventListener('click', () => { state.potentialPotionMult = 1.5; potPotionBtn.classList.add('active'); potNoPotionBtn.classList.remove('active'); updatePotential(); });
    potNoPotionBtn.addEventListener('click', () => { state.potentialPotionMult = 1; potNoPotionBtn.classList.add('active'); potPotionBtn.classList.remove('active'); updatePotential(); });
    
    // Gacha Toggle
    const gFast = document.getElementById('gachaFastBtn');
    const gNorm = document.getElementById('gachaNormalBtn');
    gFast.addEventListener('click', () => { state.gachaFast = true; gFast.classList.add('active'); gNorm.classList.remove('active'); updateGacha(); });
    gNorm.addEventListener('click', () => { state.gachaFast = false; gNorm.classList.add('active'); gFast.classList.remove('active'); updateGacha(); });
    
    // Wave Panel Toggle Logic
    const wClear = document.getElementById('waveClearBtn');
    const wObtain = document.getElementById('waveObtainBtn');
    wClear.addEventListener('click', () => { wClear.classList.add('active'); wObtain.classList.remove('active'); updateWave(); });
    wObtain.addEventListener('click', () => { wObtain.classList.add('active'); wClear.classList.remove('active'); updateWave(); });

    const inputs = [dom.dmg, dom.masCur, dom.dInput, dom.hInput, dom.mInput, dom.dmgDmg, dom.crit, dom.dmgHero, dom.dropAmt, dom.dropMul, dom.dropChn, dom.rankMpc, dom.rankCur, dom.gachaAmt, dom.gachaLeg, dom.gachaMyth, dom.gDay, dom.gHour, dom.gMin, dom.waveIn];
    inputs.forEach(el => { if(el) el.addEventListener('input', updateAll) });

    setupSuffixInput(dom.dmg, 'suffixSelect', updateMastery);
    setupSuffixInput(dom.masCur, 'currentMasterySuffixSelect', updateMastery);
    setupSuffixInput(dom.dmgDmg, 'damageSuffixSelect', updateDamage);
    setupSuffixInput(dom.rankMpc, 'rankMpcSuffix', updateRank);
    setupSuffixInput(dom.rankCur, 'rankCurrentMasterySuffix', updateRank);

    const btnOpenPot = document.getElementById('btnOpenPotential'), btnBackPot = document.getElementById('btnBackPotential');
    const masterMain = document.getElementById('mastery-main-view'), masterSub = document.getElementById('mastery-potential-view');

    btnOpenPot.addEventListener('click', (e) => {
        e.preventDefault(); state.isPotentialOpen = true; 
        masterMain.style.display = 'none'; masterSub.style.display = 'block'; 
        dom.unitsPanel.classList.add('active'); dom.statsPanel.classList.add('active'); dom.achievementsPanel.classList.add('active'); dom.panel.classList.remove('active');
        document.querySelectorAll('.custom-select').forEach(el => fitTextToContainer(el.querySelector('.select-selected span')));
    });
    btnBackPot.addEventListener('click', () => {
        state.isPotentialOpen = false; masterSub.style.display = 'none'; masterMain.style.display = 'block';
        dom.unitsPanel.classList.remove('active'); dom.statsPanel.classList.remove('active'); dom.achievementsPanel.classList.remove('active');
    });

    [dom.potCoin, dom.potCurr, dom.potEyeLvl, dom.potWise, dom.potPirate, dom.potBreathTrainer, dom.potDemonArtLvl, dom.potLeveTrainer, 
        dom.itemWeapon, dom.itemAccessory, dom.playerStats, dom.playerAura, dom.playerAvatar].forEach(el => el.addEventListener('input', updatePotential));

    for(let i=0; i<8; i++) addUnitInput();
    dom.uAddBtn.addEventListener('click', () => { if (state.unitCount >= 16) return; addUnitInput(); if (state.unitCount < 16) addUnitInput(); dom.uContainer.scrollTop = 0; updateAddButtonState(); });

    document.addEventListener('click', (e) => { if (!e.target.closest('.select-selected') && !e.target.closest('.portal-dropdown')) closeAllPortals(); });

    function maximizeSection(section) {
        if (!section) return;
        section.querySelectorAll('.custom-select').forEach(sel => {
            const optionsContainer = sel.querySelector('.select-items');
            if (optionsContainer && optionsContainer.children.length > 0) {
                const lastOption = optionsContainer.lastElementChild;
                sel.setAttribute('data-value', lastOption.getAttribute('data-value'));
                const span = sel.querySelector('.select-selected span');
                span.textContent = lastOption.textContent;
                Array.from(optionsContainer.children).forEach(child => child.classList.remove('same-as-selected'));
                lastOption.classList.add('same-as-selected');
                fitTextToContainer(span);
            }
        });
        section.querySelectorAll('input.numeric-input, input.compact-input').forEach(input => {
            input.value = input.id.toLowerCase().includes('level') ? 50 : 200; 
        });
    }

    document.getElementById('btnMaxMap').addEventListener('click', () => {
        const mapSelect = document.querySelector('[data-id="potMapSelect"]');
        const currentMapKey = mapSelect.getAttribute('data-value'); 
        const activeSection = document.getElementById(`map-${currentMapKey}`);
        maximizeSection(activeSection);
        updatePotential();
    });

    document.getElementById('btnMaxGlobal').addEventListener('click', () => {
        const allMapSections = document.querySelectorAll('.map-section');
        allMapSections.forEach(section => {
            maximizeSection(section);
        });
        updatePotential();
    });

    updateAll();
    document.querySelectorAll('.custom-select').forEach(el => fitTextToContainer(el.querySelector('.select-selected span')));
});

function addUnitInput() {
    if (state.unitCount >= 16) return;
    state.unitCount++;
    const div = document.createElement('div');
    div.className = 'input-group unit-input-group';
    div.innerHTML = `<label>Unit ${state.unitCount} (%)</label><input type="number" class="numeric-input unit-input" placeholder="0">`;
    div.querySelector('input').addEventListener('input', updatePotential);
    dom.uContainer.appendChild(div);
}

function updateAddButtonState() {
        if (state.unitCount >= 16) { dom.uAddBtn.textContent = "Max Limit Reached (16)"; dom.uAddBtn.style.opacity = "0.5"; dom.uAddBtn.style.cursor = "not-allowed"; }
}

function updateMastery() {
    const base = parseInput(dom.dmg, 'suffixSelect');
    const cur = parseInput(dom.masCur, 'currentMasterySuffixSelect');
    let dps = (base > 0n) ? base * BigInt(Math.round(state.masteryCps * 100)) / 100n : 0n;
    dom.masRes.innerHTML = dps ? formatNumber(dps) : "--";
    dom.masHr.innerHTML = dps ? formatNumber(dps * 3600n) : "--";
    dom.masDay.innerHTML = dps ? formatNumber(dps * 86400n) : "--";
    const sec = BigInt((parseInt(dom.dInput.value)||0)*86400 + (parseInt(dom.hInput.value)||0)*3600 + (parseInt(dom.mInput.value)||0)*60);
    dom.masTot.innerHTML = (base > 0n || cur > 0n) ? formatNumber(cur + (dps * sec)) : "--";
}

function updatePotential() {
    [dom.potWise, dom.potPirate, dom.potBreathTrainer, dom.potLeveTrainer].forEach(input => { if(input && parseInt(input.value) > 200) input.value = 200; });
    const wVal = parseFloat(dom.itemWeapon.value);
    const safeWVal = (isNaN(wVal) || wVal === 0) ? 1 : wVal;
    const base = BigInt(Math.round(safeWVal * 100)); 
    const rankSel = document.querySelector('[data-id="potRankSelect"]');
    const rank = BigInt(rankSel.getAttribute('data-value') || 0);
    let rankBonus = 0n; if (rank > 0n) rankBonus = 100n * (2n ** (rank - 1n));
    const rankFactor = 100n + rankBonus;

    const coinFactor = BigInt((parseInt(dom.potCoin.value) || 0) + 100);
    const currFactor = BigInt((parseInt(dom.potCurr.value) || 0) + 100);
    const wiseFactor = BigInt((parseInt(dom.potWise.value) || 0) + 100);
    const pirateFactor = BigInt((parseInt(dom.potPirate.value) || 0) + 100);
    const breathTrainerFactor = BigInt((parseInt(dom.potBreathTrainer.value) || 0) + 100);
    const leveTrainerFactor = BigInt((parseInt(dom.potLeveTrainer.value) || 0) + 100);
    const itemAccessoryFactor = BigInt((parseInt(dom.itemAccessory.value) || 0) + 100);
    const playerStatsFactor = BigInt((parseInt(dom.playerStats.value) || 0) + 100);
    const auraFactor = BigInt((parseInt(dom.playerAura.value) || 0) + 100);
    const avatarFactor = BigInt((parseInt(dom.playerAvatar.value) || 0) + 100);
    
    const bijuuFactor = BigInt(document.querySelector('[data-id="potBijuuSelect"]').getAttribute('data-value') || 100);
    const titlesFactor = BigInt(document.querySelector('[data-id="potTitlesSelect"]').getAttribute('data-value') || 100);
    const raceFactor = BigInt(document.querySelector('[data-id="potRaceSelect"]').getAttribute('data-value') || 100);
    const sayajinFactor = BigInt(document.querySelector('[data-id="potSayajinSelect"]').getAttribute('data-value') || 100);
    const hakiFactor = BigInt(document.querySelector('[data-id="potHakiSelect"]').getAttribute('data-value') || 100);
    const fruitFactor = BigInt(document.querySelector('[data-id="potFruitsSelect"]').getAttribute('data-value') || 100);
    const breathingFactor = BigInt(document.querySelector('[data-id="potBreathingSelect"]').getAttribute('data-value') || 100);
    const orgFactor = BigInt(document.querySelector('[data-id="potOrgSelect"]').getAttribute('data-value') || 100);
    const titanFactor = BigInt(document.querySelector('[data-id="potTitanSelect"]').getAttribute('data-value') || 100);
    const titanPetFactor = BigInt(document.querySelector('[data-id="potTitanPetSelect"]').getAttribute('data-value') || 100);
    const shinobiRaidFactor = BigInt(document.querySelector('[data-id="potShinobiRaidSelect"]').getAttribute('data-value') || 100);
    const dungeonFactor = BigInt(document.querySelector('[data-id="potDungeonSelect"]').getAttribute('data-value') || 100);
    const shadowsFactor = BigInt(document.querySelector('[data-id="potShadowsSelect"]').getAttribute('data-value') || 100);
    const shadowGateFactor = BigInt(document.querySelector('[data-id="potShadowGateSelect"]').getAttribute('data-value') || 100);
    const soloRankFactor = BigInt(document.querySelector('[data-id="potSoloRankSelect"]').getAttribute('data-value') || 100);

    const secretBossEl = document.querySelector(`[data-id="achieveSelect1"]`);
    const secretBossVal = BigInt(secretBossEl ? secretBossEl.getAttribute('data-value') || 100 : 100);
    let otherAchievePercent = 0;
    for(let i=2; i<=achievementsData.length; i++){
        const achSel = document.querySelector(`[data-id="achieveSelect${i}"]`);
        if(achSel) otherAchievePercent += (parseInt(achSel.getAttribute('data-value')) || 100) - 100;
    }
    const generalAchievementFactor = BigInt(Math.round(100 + otherAchievePercent));
    document.getElementById('achievementsTotalResult').textContent = otherAchievePercent.toLocaleString() + "%";

    const eyeSel = document.querySelector('[data-id="potMagicEyeSelect"]');
    const eyeBase = parseFloat(eyeSel.getAttribute('data-value')) || 0;
    let eyeLvl = parseInt(dom.potEyeLvl.value); if (eyeLvl > 50) { eyeLvl = 50; dom.potEyeLvl.value = 50; } if (isNaN(eyeLvl) || eyeLvl < 0) eyeLvl = 0;
    let eyePercentBonus = eyeBase + (eyeBase * 0.1 * eyeLvl);
    if (Math.round(eyePercentBonus) === 1098 && eyeLvl === 50) eyePercentBonus = 1100;
    
    const eyeFactor = BigInt(Math.round(100 + eyePercentBonus));
    const eyeObj = magicEyeData.find(e => e.base === eyeBase);
    if (eyeObj) {
        const newLabel = `${eyeObj.name.split(' (')[0]} (+${Math.round(eyePercentBonus)}%)`;
        const span = eyeSel.querySelector('.select-selected span');
        span.textContent = newLabel; fitTextToContainer(span); 
    }

    const daSel = document.querySelector('[data-id="potDemonArtSelect"]');
    const daBase = parseFloat(daSel.getAttribute('data-value')) || 0;
    let daLvl = parseInt(dom.potDemonArtLvl.value); if (daLvl > 50) { daLvl = 50; dom.potDemonArtLvl.value = 50; } if (isNaN(daLvl) || daLvl < 0) daLvl = 0;
    let daPercentBonus = daBase + (daBase * 0.1 * daLvl);
    if (Math.round(daPercentBonus) === 1098 && daLvl === 50) daPercentBonus = 1100;

    const daFactor = BigInt(Math.round(100 + daPercentBonus));
    const daObj = demonArtData.find(e => e.base === daBase);
    if (daObj) {
        const newLabel = `${daObj.name.split(' (')[0]} (+${Math.round(daPercentBonus)}%)`;
        const span = daSel.querySelector('.select-selected span');
        span.textContent = newLabel; fitTextToContainer(span); 
    }

    let totalUnitPercent = 0;
    document.querySelectorAll('.unit-input').forEach(input => totalUnitPercent += parseFloat(input.value) || 0);
    dom.uRes.innerHTML = totalUnitPercent.toLocaleString() + "%";
    const unitFactor = BigInt(Math.round(100 + totalUnitPercent));
    
    let result = (base * rankFactor * coinFactor * currFactor * wiseFactor * bijuuFactor * eyeFactor * titlesFactor * raceFactor * sayajinFactor * unitFactor * hakiFactor * fruitFactor * pirateFactor * breathingFactor * breathTrainerFactor * daFactor * orgFactor * titanFactor * titanPetFactor * leveTrainerFactor * shinobiRaidFactor * dungeonFactor * itemAccessoryFactor * playerStatsFactor * secretBossVal * generalAchievementFactor * auraFactor * avatarFactor * shadowGateFactor * shadowsFactor * soloRankFactor) / 100000000000000000000000000000000000000000000000000000000000000n;
    result = result * BigInt(state.potentialMult);
    if (state.potentialPotionMult === 1.5) result = (result * 15n) / 10n;
    dom.potRes.innerHTML = (result > 0n) ? formatNumber(result) : "0";
}

function updateDamage() {
    const baseDmg = parseInput(dom.dmgDmg, 'damageSuffixSelect');
    const critPercent = parseFloat(dom.crit.value) || 0;
    const heroPercent = parseFloat(dom.dmgHero.value) || 0;
    
    const mobSel = document.querySelector('[data-id="mobSelect"]');
    const hpString = mobSel.getAttribute('data-hp');
    const mobHp = parseSuffixedString(hpString);
    
    dom.mobHp.textContent = hpString || "--";
    const mobCountVal = parseInt(document.querySelector('[data-id="mobCountSelect"]').getAttribute('data-value')) || 1;

    const multiplierScaled = BigInt(Math.round(1000 + (critPercent * 5))); 
    const cpsScaled = BigInt(Math.round(state.damageCps * 100)); 
    
    const numeratorClick = baseDmg * cpsScaled * multiplierScaled;
    const numeratorHero = baseDmg * BigInt(Math.round(heroPercent * 2000));
    const totalNumerator = numeratorClick + numeratorHero; 

    if (baseDmg > 0n) {
            dom.dpsRes.innerHTML = formatNumber(totalNumerator / 100000n);
    } else {
            dom.dpsRes.innerHTML = "--"; dom.mpmRes.innerHTML = "--"; dom.mphRes.innerHTML = "--"; dom.ttkRes.innerHTML = "0s"; dom.dropMin.innerHTML = "--"; dom.dropHr.innerHTML = "--"; return;
    }

    if (mobHp <= 0n) {
        dom.ttkRes.innerHTML = "Select Mob"; dom.mpmRes.innerHTML = "--"; dom.mphRes.innerHTML = "--"; dom.dropMin.innerHTML = "--"; dom.dropHr.innerHTML = "--"; return;
    }

    let timeSeconds = 0;
    const oneHitDmgScaled = baseDmg * multiplierScaled; 
    const mobHpScaledForHit = mobHp * 1000n; 

    if (oneHitDmgScaled >= mobHpScaledForHit) { timeSeconds = 0; } 
    else {
        if (totalNumerator === 0n) { dom.ttkRes.innerHTML = "Forever"; dom.mpmRes.innerHTML = "0"; dom.mphRes.innerHTML = "0"; dom.dropMin.innerHTML = "0"; dom.dropHr.innerHTML = "0"; return; }
        const mobHpScaledForTime = mobHp * 100000n;
        timeSeconds = Number(mobHpScaledForTime * 100n / totalNumerator) / 100;
    }

    dom.ttkRes.innerHTML = (timeSeconds < 60) ? timeSeconds.toFixed(2) + "s" : formatTime(timeSeconds);

    const respawnTime = 2.0;
    const spawnsPerMinute = 60 / respawnTime; 
    let killsPerMin = 0;
    
    if (mobCountVal === 1) {
        const totalCycleTime = timeSeconds + respawnTime;
        if (totalCycleTime > 0) killsPerMin = 60 / totalCycleTime;
    } else {
        let mobLimit = (timeSeconds > 0) ? (respawnTime / timeSeconds) : 999999;
        const effectiveKillsPerWave = Math.min(mobCountVal, mobLimit);
        killsPerMin = effectiveKillsPerWave * spawnsPerMinute;
    }

    const killsPerHour = killsPerMin * 60;
    dom.mpmRes.innerHTML = killsPerMin.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    dom.mphRes.innerHTML = killsPerHour.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });

    const dAmount = parseFloat(dom.dropAmt.value) || 0;
    const dMulti = (parseFloat(dom.dropMul.value) || 100) / 100;
    const dChance = parseFloat(dom.dropChn.value) || 0;

    const effectiveAmount = dAmount * dMulti;
    const chanceFactor = dChance / 100;
    
    const totalDropsPerMin = killsPerMin * chanceFactor * effectiveAmount;
    const totalDropsPerHour = killsPerHour * chanceFactor * effectiveAmount;
    
    dom.dropMin.innerHTML = totalDropsPerMin.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    dom.dropHr.innerHTML = totalDropsPerHour.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function updateRank() {
    const mpc = parseInput(dom.rankMpc, 'rankMpcSuffix');
    const cur = parseInput(dom.rankCur, 'rankCurrentMasterySuffix');
    const start = parseInt(document.querySelector('[data-id="currentRankSelect"]').getAttribute('data-value')) || 0;
    const end = parseInt(document.querySelector('[data-id="targetRankSelect"]').getAttribute('data-value')) || 1;
    let mps = (mpc > 0n) ? mpc * BigInt(Math.round(state.rankCps * 100)) / 100n : 0n;
    dom.rankMps.innerHTML = mps ? formatNumber(mps) : "--";

    if (start >= end) {
        dom.rankCost.innerHTML = "--"; dom.rankRem.innerHTML = "--"; dom.rankTime.innerHTML = "Target Rank must be higher";
        dom.rankBar.style.width = "0%"; dom.rankPcnt.innerHTML = "0%"; return;
    }

    let cost = 0n;
    for(let i=start+1; i<=end; i++) if(i < rankCostsData.length) cost += parseSuffixedString(rankCostsData[i]);
    dom.rankCost.innerHTML = formatNumber(cost);
    const rem = (cost > cur) ? cost - cur : 0n;
    dom.rankRem.innerHTML = formatNumber(rem);
    const pct = (cost > 0n) ? Math.min(100, Number((cur * 10000n) / cost) / 100) : 0;
    dom.rankBar.style.width = pct + "%"; dom.rankPcnt.innerHTML = pct.toFixed(1) + "%";
    if (rem === 0n) dom.rankTime.innerHTML = "0.00s";
    else if (mps > 0n) { const s = Number(rem) / Number(mps); dom.rankTime.innerHTML = (s < 60) ? s.toFixed(2)+"s" : formatTime(s); } 
    else dom.rankTime.innerHTML = "Infinite";
}

function updateGacha() {
    const TIME_NORMAL = 2.0;    
    const TIME_FAST = 1.2;      
    const SLOW_DELAY = 1.0;     
    const batchSize = parseInt(dom.gachaAmt.value) || 1;
    const legChance = (parseFloat(dom.gachaLeg.value) || 0) / 100;
    const mythChance = (parseFloat(dom.gachaMyth.value) || 0) / 100;
    
    const days = parseInt(dom.gDay.value) || 0;
    const hours = parseInt(dom.gHour.value) || 0;
    const mins = parseInt(dom.gMin.value) || 0;

    const eggSel = document.querySelector('[data-id="eggCostSelect"]');
    
    const costPerEgg = parseSuffixedString(eggSel.getAttribute('data-cost') || "0");
    
    const currency = eggSel.getAttribute('data-curr') || "Yen";

    const baseTimePerBatch = state.gachaFast ? TIME_FAST : TIME_NORMAL;
    const pRare = legChance + mythChance;
    const pAnyRareInBatch = 1 - Math.pow(1 - pRare, batchSize);
    const averageTimePerBatch = baseTimePerBatch + (pAnyRareInBatch * SLOW_DELAY);

    let eggsPerSecond = 0;
    if (averageTimePerBatch > 0) { eggsPerSecond = batchSize / averageTimePerBatch; }

    const totalDurationSeconds = (days * 86400) + (hours * 3600) + (mins * 60);
    const totalOpens = Math.floor(eggsPerSecond * totalDurationSeconds);

    const totalCost = BigInt(totalOpens) * costPerEgg;

    dom.gachaSpd.innerHTML = eggsPerSecond.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 });
    dom.gachaHr.innerHTML = Math.floor(eggsPerSecond * 3600).toLocaleString();
    
    dom.gachaCostRes.innerHTML = formatNumber(totalCost);
    dom.gachaCostLabel.innerHTML = `Total ${currency} Cost`;
    dom.gachaOpensRes.innerHTML = totalOpens.toLocaleString();
}

function updateWave() {
    // 1. Get current wave from input
    let wave = parseInt(dom.waveIn.value) || 1;

    // --- SAFETY LIMIT: Max Wave 1000 ---
    if (wave > 1000) {
        wave = 1000;
        dom.waveIn.value = "1000"; // Visually fix the input
    }
    if (wave < 1) {
        wave = 1;
        dom.waveIn.value = "1";
    }
    
    // --- FIX: OBTAIN MODE LOGIC ---
    // If "Obtain Wave" is active, we calculate based on (Input - 1)
    // unless the input is 1.
    const isObtainMode = document.getElementById('waveObtainBtn').classList.contains('active');
    if (isObtainMode && wave > 1) {
        wave = wave - 1;
    }
    // ------------------------------

    const modeKey = dom.waveMode.getAttribute('data-value') || "None";
    const data = waveScalingData[modeKey];

    if (!data || modeKey === "None") {
        dom.waveMob.innerHTML = "--";
        dom.waveBoss.innerHTML = "--";
        dom.waveTotal.innerHTML = "--";
        dom.waveDps.innerHTML = "--";
        return;
    }

    let currentHp = 0n;

    // --- SPECIFIC LOGIC FOR SHINOBI & SHADOW GATE ---
    if (modeKey === "Shinobi" || modeKey === "Shadow Gate") {
        const baseVal = parseSuffixedString(data.base);
        
        if (wave === 1) {
            currentHp = baseVal;
        } else if (wave === 2) {
            currentHp = (baseVal * 8n) / 3n;
        } else if (wave === 3) {
            currentHp = (baseVal * 12n) / 3n;
        } else if (wave === 4) {
            currentHp = (baseVal * 16n) / 3n;
        } else if (wave === 5) {
            currentHp = (baseVal * 200n) / 3n;
        } else {
            // --- Wave 6+ Logic ---
            currentHp = (baseVal * 200n) / 3n;
            let currentInc = parseSuffixedString(data.increment);

            for (let w = 6; w <= wave; w++) {
                currentHp = currentHp + currentInc;
                if (w % 5 === 0) {
                    currentHp = currentHp * 10n;
                    currentInc = currentInc * 10n;
                }
            }
        }
    } 
    // --- STANDARD LOGIC FOR AOT DEFENSE ---
    else {
        currentHp = parseSuffixedString(data.base); 
        let currentInc = parseSuffixedString(data.increment);
        
        for (let w = 2; w <= wave; w++) {
            currentHp = currentHp + currentInc;
            if (w % 5 === 0) {
                currentHp = currentHp * 10n;
                currentInc = currentInc * 10n;
            }
        }
    }

    // --- PLAYER COUNT SCALING ---
    // 1 Player = Base HP (100%)
    // Every extra player adds 25% base HP
    const playerSel = document.querySelector('[data-id="wavePlayerSelect"]');
    const playerCount = parseInt(playerSel ? playerSel.getAttribute('data-value') : 1) || 1;
    
    if (playerCount > 1) {
        // Example: 2 players = 125% (100 + 25)
        const bonusPercent = BigInt((playerCount - 1) * 25);
        currentHp = (currentHp * (100n + bonusPercent)) / 100n;
    }

    // Calculate Result Boxes
    let mobHp = 0n;
    if (modeKey === "AoT Defense") {
        mobHp = currentHp / 4n; 
    } else {
        mobHp = (currentHp * 12n) / 100n; 
    }

    const totalHp = currentHp + mobHp;
    const dpsNeeded = totalHp / 60n;

    dom.waveMob.innerHTML = formatNumber(mobHp);
    dom.waveBoss.innerHTML = formatNumber(currentHp);
    dom.waveTotal.innerHTML = formatNumber(totalHp);
    dom.waveDps.innerHTML = formatNumber(dpsNeeded);
}

function updateAll() { updateMastery(); updateDamage(); updateRank(); updatePotential(); updateGacha(); updateWave(); }

function setTheme(name) {
    const t = themes[name]; if(!t) return;
    const r = document.documentElement.style;
    r.setProperty('--primary', t.primary); r.setProperty('--primary-light', t.light);
    r.setProperty('--primary-border', t.border); r.setProperty('--primary-dim', t.dim); r.setProperty('--primary-glow', t.glow);
}

document.querySelectorAll('.tab-button').forEach(b => {
    b.addEventListener('click', () => {
        document.querySelectorAll('.tab-button, .tab-content').forEach(el => el.classList.remove('active'));
        b.classList.add('active');
        const tab = b.dataset.tab;
        document.getElementById(tab + '-content').classList.add('active');
        setTheme(tab);

        // --- Sidebar Logic ---
        dom.panel.classList.remove('active'); // Drop panel (Right)
        dom.unitsPanel.classList.remove('active'); // Units (Left)
        dom.statsPanel.classList.remove('active'); // Stats (Left)
        dom.achievementsPanel.classList.remove('active'); // Achiev (Right)
        const wavePanel = document.getElementById('wavePanel'); // Wave (Left)
        if(wavePanel) wavePanel.classList.remove('active');

        if (tab === 'damage') {
            dom.panel.classList.add('active'); // Show Drops
            if(wavePanel) wavePanel.classList.add('active'); // Show Wave
        } 
        else if (tab === 'mastery') {
            if (state.isPotentialOpen) { 
                dom.unitsPanel.classList.add('active'); 
                dom.statsPanel.classList.add('active'); 
                dom.achievementsPanel.classList.add('active'); 
            }
        }
    });
});

function initSuffixDropdowns() {
    const ids = ['suffixSelect', 'currentMasterySuffixSelect', 'damageSuffixSelect', 'rankMpcSuffix', 'rankCurrentMasterySuffix'];
    ids.forEach(id => {
        const s = document.querySelector(`[data-id="${id}"] .select-items`);
        s.innerHTML = '<div data-value="none" class="same-as-selected">None</div>';
        Object.values(suffixMap).forEach(v => s.innerHTML += `<div data-value="${v}">${v}</div>`);
        s.parentElement.setAttribute('data-value', 'none');
    });
}

function initRankDropdowns() {
    const ids = ['currentRankSelect', 'targetRankSelect'];
    ids.forEach(id => {
        const s = document.querySelector(`[data-id="${id}"] .select-items`);
        rankCostsData.forEach((_, i) => s.innerHTML += `<div data-value="${i}" class="${(id === 'currentRankSelect' && i === 0) || (id === 'targetRankSelect' && i === 1) ? 'same-as-selected' : ''}">Rank ${i}</div>`);
        const defVal = id === 'currentRankSelect' ? '0' : '1';
        s.parentElement.setAttribute('data-value', defVal);
        s.previousElementSibling.querySelector('span').textContent = `Rank ${defVal}`;
    });
    updateDisabledTargetRanks(0);
}

function initPotentialRankDropdown() {
    const el = document.getElementById('potRankOptions');
    const parent = document.querySelector('[data-id="potRankSelect"]');
    rankCostsData.forEach((_, i) => el.innerHTML += `<div data-value="${i}" class="${i===0?'same-as-selected':''}">Rank ${i}</div>`);
    parent.setAttribute('data-value', '0');
}

function initPotentialMapDropdown() {
    const el = document.getElementById('potMapOptions');
    const parent = document.querySelector('[data-id="potMapSelect"]');
    const maps = Object.keys(gameData);
    maps.forEach((map, i) => el.innerHTML += `<div data-value="${map.replace(/\s+/g, '')}" class="${i===0?'same-as-selected':''}">${map}</div>`);
    if(maps.length > 0) { parent.setAttribute('data-value', maps[0].replace(/\s+/g, '')); parent.querySelector('span').textContent = maps[0]; }
}

function initAchievementsDropdowns() {
    achievementsData.forEach((achievement, index) => {
        const i = index + 1; 
        const div = document.createElement('div');
        div.className = 'input-group';
        div.innerHTML = `<label>${achievement.title}</label><div class="custom-select full-width" data-id="achieveSelect${i}"><div class="select-selected"><span>None (+0%)</span><div class="select-arrow"></div></div><div class="select-items select-hide" id="achieveOptions${i}"></div></div>`;
        dom.achieveContainer.appendChild(div);
        const el = document.getElementById(`achieveOptions${i}`);
        achievement.options.forEach((opt, idx) => el.innerHTML += `<div data-value="${opt.val}" class="${idx===0?'same-as-selected':''}">${opt.name}</div>`);
        document.querySelector(`[data-id="achieveSelect${i}"]`).setAttribute('data-value', '100');
    });
}

function initBijuuDropdown() { const el = document.getElementById('potBijuuOptions'); bijuuData.forEach((b, i) => el.innerHTML += `<div data-value="${b.val}" class="${i===0?'same-as-selected':''}">${b.name}</div>`); document.querySelector('[data-id="potBijuuSelect"]').setAttribute('data-value', '100'); }
function initMagicEyeDropdown() { const el = document.getElementById('potMagicEyeOptions'); magicEyeData.forEach((e, i) => el.innerHTML += `<div data-value="${e.base}" class="${i===0?'same-as-selected':''}">${e.name}</div>`); document.querySelector('[data-id="potMagicEyeSelect"]').setAttribute('data-value', '0'); }
function initTitlesDropdown() { const el = document.getElementById('potTitlesOptions'); titlesData.forEach((t, i) => el.innerHTML += `<div data-value="${t.val}" class="${i===0?'same-as-selected':''}">${t.name}</div>`); document.querySelector('[data-id="potTitlesSelect"]').setAttribute('data-value', '100'); }
function initRaceDropdown() { const el = document.getElementById('potRaceOptions'); raceData.forEach((r, i) => el.innerHTML += `<div data-value="${r.val}" class="${i===0?'same-as-selected':''}">${r.name}</div>`); document.querySelector('[data-id="potRaceSelect"]').setAttribute('data-value', '100'); }
function initSayajinDropdown() { const el = document.getElementById('potSayajinOptions'); sayajinData.forEach((s, i) => el.innerHTML += `<div data-value="${s.val}" class="${i===0?'same-as-selected':''}">${s.name}</div>`); document.querySelector('[data-id="potSayajinSelect"]').setAttribute('data-value', '100'); }
function initHakiDropdown() { const el = document.getElementById('potHakiOptions'); hakiData.forEach((h, i) => el.innerHTML += `<div data-value="${h.val}" class="${i===0?'same-as-selected':''}">${h.name}</div>`); document.querySelector('[data-id="potHakiSelect"]').setAttribute('data-value', '100'); }
function initFruitsDropdown() { const el = document.getElementById('potFruitsOptions'); fruitsData.forEach((f, i) => el.innerHTML += `<div data-value="${f.val}" class="${i===0?'same-as-selected':''}">${f.name}</div>`); document.querySelector('[data-id="potFruitsSelect"]').setAttribute('data-value', '100'); }
function initBreathingDropdown() { const el = document.getElementById('potBreathingOptions'); breathingData.forEach((b, i) => el.innerHTML += `<div data-value="${b.val}" class="${i===0?'same-as-selected':''}">${b.name}</div>`); document.querySelector('[data-id="potBreathingSelect"]').setAttribute('data-value', '100'); }
function initDemonArtDropdown() { const el = document.getElementById('potDemonArtOptions'); demonArtData.forEach((e, i) => el.innerHTML += `<div data-value="${e.base}" class="${i===0?'same-as-selected':''}">${e.name}</div>`); document.querySelector('[data-id="potDemonArtSelect"]').setAttribute('data-value', '0'); }
function initOrganizationDropdown() { const el = document.getElementById('potOrgOptions'); organizationData.forEach((o, i) => el.innerHTML += `<div data-value="${o.val}" class="${i===0?'same-as-selected':''}">${o.name}</div>`); document.querySelector('[data-id="potOrgSelect"]').setAttribute('data-value', '100'); }
function initTitanDropdown() { const el = document.getElementById('potTitanOptions'); titanData.forEach((t, i) => el.innerHTML += `<div data-value="${t.val}" class="${i===0?'same-as-selected':''}">${t.name}</div>`); document.querySelector('[data-id="potTitanSelect"]').setAttribute('data-value', '100'); }
function initTitanPetDropdown() { const el = document.getElementById('potTitanPetOptions'); titanPetData.forEach((t, i) => el.innerHTML += `<div data-value="${t.val}" class="${i===0?'same-as-selected':''}">${t.name}</div>`); document.querySelector('[data-id="potTitanPetSelect"]').setAttribute('data-value', '100'); }
function initShinobiRaidDropdown() { const el = document.getElementById('potShinobiRaidOptions'); shinobiRaidData.forEach((t, i) => el.innerHTML += `<div data-value="${t.val}" class="${i===0?'same-as-selected':''}">${t.name}</div>`); document.querySelector('[data-id="potShinobiRaidSelect"]').setAttribute('data-value', '100'); }
function initDungeonDropdown() { const el = document.getElementById('potDungeonOptions'); dungeonData.forEach((t, i) => el.innerHTML += `<div data-value="${t.val}" class="${i===0?'same-as-selected':''}">${t.name}</div>`); document.querySelector('[data-id="potDungeonSelect"]').setAttribute('data-value', '100'); }
function initShadowsDropdown() { const el = document.getElementById('potShadowsOptions'); shadowsData.forEach((t, i) => el.innerHTML += `<div data-value="${t.val}" class="${i===0?'same-as-selected':''}">${t.name}</div>`); document.querySelector('[data-id="potShadowsSelect"]').setAttribute('data-value', '100'); }
function initShadowGateDropdown() { const el = document.getElementById('potShadowGateOptions'); shadowGateData.forEach((t, i) => el.innerHTML += `<div data-value="${t.val}" class="${i===0?'same-as-selected':''}">${t.name}</div>`); document.querySelector('[data-id="potShadowGateSelect"]').setAttribute('data-value', '100'); }
function initSoloRankDropdown() { const el = document.getElementById('potSoloRankOptions'); soloRanksData.forEach((t, i) => el.innerHTML += `<div data-value="${t.val}" class="${i===0?'same-as-selected':''}">${t.name}</div>`); document.querySelector('[data-id="potSoloRankSelect"]').setAttribute('data-value', '100'); }

function initMapDropdown() {
    const mapSelect = document.getElementById('mapOptions');
    Object.keys(gameData).forEach(k => mapSelect.innerHTML += `<div data-value="${k}">${k}</div>`);
}

function initEggCostDropdown() {
    const el = document.getElementById('eggCostOptions');
    const parent = document.querySelector('[data-id="eggCostSelect"]');
    
    eggData.forEach((d, i) => {
        const label = `${d.name} (${d.cost})`;
        el.innerHTML += `<div data-value="${d.name}" data-cost="${d.cost}" data-curr="${d.currency}" class="${i===0?'same-as-selected':''}">${label}</div>`;
    });
    
    if(eggData.length > 0) {
        const first = eggData[0];
        parent.setAttribute('data-value', first.name);
        parent.setAttribute('data-cost', first.cost);
        parent.setAttribute('data-curr', first.currency);
        parent.querySelector('span').textContent = `${first.name} (${first.cost})`;
    }
}

function initMobCountDropdown() {
    const mobCountSelect = document.getElementById('mobCountOptions');
    for(let i=1; i<=10; i++) mobCountSelect.innerHTML += `<div data-value="${i}" class="${i===1?'same-as-selected':''}">${i}</div>`;
}

function initWavePlayerDropdown() {
    const el = document.getElementById('wavePlayerOptions');
    const parent = document.querySelector('[data-id="wavePlayerSelect"]');
    // Populate for 1 to 12 players
    for(let i=1; i<=12; i++) {
        el.innerHTML += `<div data-value="${i}" class="${i===1?'same-as-selected':''}">${i}</div>`;
    }
    parent.setAttribute('data-value', '1');
}

function parseSuffixedString(str) {
    const m = (str || "").match(/^([\d\.]+)\s*([a-zA-Z]+)?$/);
    if (!m) return 0n;
    const exp = suffixes[suffixMap[(m[2] || "none").toLowerCase()] || "none"] || 0;
    return BigInt(Math.round(parseFloat(m[1]) * 100)) * (10n ** BigInt(exp * 3));
}

function parseInput(inEl, selId) {
    const raw = parseFloat(inEl.value);
    if (isNaN(raw) || raw < 0) return 0n;
    const suf = document.querySelector(`[data-id="${selId}"]`).getAttribute('data-value');
    return BigInt(Math.round(raw * 100)) * (10n ** BigInt((suffixes[suf] || 0) * 3));
}

function formatNumber(n) {
    if (n === 0n) return "0";
    // Convert BigInt to Number and account for the base multiplier (assuming inputs are x100)
    let val = Number(n) / 100, idx = 0;
    
    // Determine suffix (k, m, b, etc.)
    while (val >= 1000 && idx < Object.keys(suffixMap).length) { val /= 1000; idx++; }
    
    // If no suffix, let locale handling take care of rounding
    if (idx === 0) return val.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2});
    val = Math.round(val * 100) / 100;
    
    return val.toFixed(2) + Object.values(suffixMap)[idx-1];
}

function formatTime(s) {
    if (s === Infinity) return "Forever"; if (s === 0) return "Instant";
    const y = Math.floor(s/31536000), d = Math.floor((s%31536000)/86400), h = Math.floor((s%86400)/3600), m = Math.floor((s%3600)/60), sec = Math.floor(s%60);
    if (y>=1000) return "1000+ y";
    if (y+d+h+m === 0 && s < 1) return s.toFixed(2)+"s";
    return `${y?y+'y ':''}${d?d+'d ':''}${h?h+'h ':''}${m?m+'m ':''}${(y+d===0)?sec+'s':''}`.trim();
}

function setupSpeedToggle(fastId, slowId, key, cb) {
    const f = document.getElementById(fastId), s = document.getElementById(slowId);
    f.onclick = () => { state[key] = 5.8; f.classList.add('active'); s.classList.remove('active'); cb(); };
    s.onclick = () => { state[key] = 4.5; s.classList.add('active'); f.classList.remove('active'); cb(); };
}

function setupMultiplierToggle(onBtnId, offBtnId, stateKey, cb) {
    const onBtn = document.getElementById(onBtnId), offBtn = document.getElementById(offBtnId);
    onBtn.onclick = () => { state[stateKey] = 2; onBtn.classList.add('active'); offBtn.classList.remove('active'); cb(); };
    offBtn.onclick = () => { state[stateKey] = 1; offBtn.classList.add('active'); onBtn.classList.remove('active'); cb(); };
}

function setupSuffixInput(inp, selId, cb) {
    const h = () => {
        const m = inp.value.trim().match(/^([\d\.]+)\s*([a-zA-Z]+)$/);
        if (m && suffixMap[m[2].toLowerCase()]) {
            inp.value = m[1];
            const sel = document.querySelector(`[data-id="${selId}"]`);
            const val = suffixMap[m[2].toLowerCase()];
            sel.setAttribute('data-value', val);
            sel.querySelector('span').textContent = val;
            sel.querySelectorAll('.select-items div').forEach(d => d.classList.remove('same-as-selected'));
            sel.querySelector(`.select-items div[data-value="${val}"]`).classList.add('same-as-selected');
        }
        cb();
    };
    inp.addEventListener('blur', h); inp.addEventListener('keydown', e => { if(e.key==='Enter') { e.preventDefault(); h(); inp.blur(); }});
}

let activePortal = null;
function closeAllPortals() { if (activePortal) { activePortal.remove(); activePortal = null; } document.querySelectorAll('.select-selected').forEach(el => el.classList.remove('select-arrow-active')); }

function setupCustomSelect(sel) {
    const selected = sel.querySelector('.select-selected');
    const items = sel.querySelector('.select-items'); 
    
    selected.addEventListener('click', e => { 
        e.stopPropagation(); 
        if (selected.classList.contains('select-arrow-active')) { closeAllPortals(); return; }
        closeAllPortals(); selected.classList.add('select-arrow-active'); 
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

        portal.innerHTML = items.innerHTML;
        document.body.appendChild(portal);
        activePortal = portal;

        portal.querySelectorAll('div').forEach(div => {
            div.addEventListener('click', (evt) => {
                evt.stopPropagation();
                const val = div.getAttribute('data-value');
                const txt = div.textContent;
                sel.setAttribute('data-value', val);
                if(div.hasAttribute('data-hp')) sel.setAttribute('data-hp', div.getAttribute('data-hp'));
                if(div.hasAttribute('data-cost')) sel.setAttribute('data-cost', div.getAttribute('data-cost'));
                if(div.hasAttribute('data-curr')) sel.setAttribute('data-curr', div.getAttribute('data-curr'));

                const span = selected.querySelector('span');
                span.textContent = txt; fitTextToContainer(span);

                const id = sel.getAttribute('data-id');
                if (id === 'mapSelect') updateMobDropdown(val);
                if (id === 'currentRankSelect' || id === 'targetRankSelect') handleRankLogic(id, parseInt(val));
                if (id === 'potRankSelect') span.textContent = `Rank ${val}`;
                if (id === 'potMapSelect') {
                    const mapKey = val; 
                    document.querySelectorAll('.map-section').forEach(sec => sec.classList.remove('active'));
                    const targetSec = document.getElementById(`map-${mapKey}`);
                    if(targetSec) targetSec.classList.add('active');
                }
                if (id === 'waveModeSelect') updateWave();
                if (id === 'wavePlayerSelect') updateWave();

                items.querySelectorAll('div').forEach(d => d.classList.remove('same-as-selected'));
                const origItem = Array.from(items.children).find(c => c.textContent === txt);
                if(origItem) origItem.classList.add('same-as-selected');

                closeAllPortals();
                updateAll();
            });
        });
    });
}

window.addEventListener('resize', closeAllPortals);
window.addEventListener('scroll', (e) => { if (activePortal && (e.target === activePortal || activePortal.contains(e.target))) return; closeAllPortals(); }, true);

function fitTextToContainer(span) {
    if(!span) return;
    let size = 16; span.style.fontSize = size + 'px';
    const parent = span.parentElement; if(!parent || parent.clientWidth === 0) return; 
    const maxWidth = parent.clientWidth - 45; 
    while (span.scrollWidth > maxWidth && size > 9) { size--; span.style.fontSize = size + 'px'; }
}

function updateMobDropdown(map) {
    const sel = document.querySelector('[data-id="mobSelect"]');
    const items = document.getElementById('mobOptions');
    const mobs = gameData[map] || [];
    items.innerHTML = mobs.length ? '' : '<div data-value="none">No Mobs</div>';
    mobs.forEach((m, i) => items.innerHTML += `<div data-value="${m.name}" data-hp="${m.hp}" class="${i===0?'same-as-selected':''}">${m.name}</div>`);
    const first = mobs[0] || {name:'No Mobs', hp:''};
    sel.setAttribute('data-value', first.name); sel.setAttribute('data-hp', first.hp);
    sel.querySelector('span').textContent = first.name;
}

function handleRankLogic(id, val) {
    const curSel = document.querySelector('[data-id="currentRankSelect"]');
    const tgtSel = document.querySelector('[data-id="targetRankSelect"]');
    const cur = parseInt(curSel.getAttribute('data-value')) || 0;
    const tgt = parseInt(tgtSel.getAttribute('data-value')) || 0;

    if (id === 'currentRankSelect') {
        updateDisabledTargetRanks(val);
        if (tgt <= val) setSelect(tgtSel, Math.min(val + 1, rankCostsData.length - 1));
    } else if (tgt <= cur) setSelect(tgtSel, Math.min(cur + 1, rankCostsData.length - 1));
}

function setSelect(el, idx) {
    el.setAttribute('data-value', idx); el.querySelector('span').textContent = `Rank ${idx}`;
    el.querySelectorAll('.select-items div').forEach(d => d.classList.toggle('same-as-selected', d.getAttribute('data-value') == idx));
}

function updateDisabledTargetRanks(cur) {
    document.querySelectorAll('#targetRankOptions div').forEach(d => d.classList.toggle('disabled', parseInt(d.getAttribute('data-value')) <= cur));
}