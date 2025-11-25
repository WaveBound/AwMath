<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>DPS Calculator</title>
<style>
  body { background:#111; color:white; font-family:Arial; display:flex; justify-content:center; padding:40px; }
  .card { background:#1d1d1d; padding:30px; width:420px; border-radius:14px; box-shadow:0 0 20px #000; }
  input, select, button { padding:10px; border-radius:6px; border:none; font-size:16px; }
  .row { display:flex; gap:10px; margin-top:12px; }
  .mode-btn { flex:1; cursor:pointer; background:#333; color:#ccc; }
  .mode-btn.active { background:#4a5cff; color:white; }
  #resultBox { margin-top:20px; background:#222; padding:18px; border-radius:10px; text-align:center; font-size:20px; }
  .small { font-size:13px; opacity:0.7; }
</style>
</head>
<body>
<div class="card">
  <h2 style="text-align:center;">DPS Calculator</h2>

  <div class="row" style="align-items:center;">
    <input id="dmgInput" placeholder="Enter value..." style="flex:1;" />
    <select id="suffixSelect" style="width:110px;">
      <option value="none">None</option>
      <option value="K">K</option>
      <option value="M">M</option>
      <option value="B">B</option>
      <option value="T">T</option>
      <option value="Qa">Qa</option>
      <option value="Qi">Qi</option>
      <option value="Sx">Sx</option>
      <option value="Sp">Sp</option>
      <option value="Oc">Oc</option>
      <option value="No">No</option>
      <option value="Dc">Dc</option>
      <option value="Ud">Ud</option>
      <option value="Dd">Dd</option>
      <option value="Td">Td</option>
      <option value="Qad">Qad</option>
      <option value="Qid">Qid</option>
      <option value="Sxd">Sxd</option>
      <option value="Spd">Spd</option>
      <option value="Ocd">Ocd</option>
      <option value="Nod">Nod</option>
      <option value="Vg">Vg</option>
      <option value="Uvg">Uvg</option>
      <option value="Dvg">Dvg</option>
      <option value="Tvg">Tvg</option>
    </select>
  </div>

  <div class="row">
    <button id="fastBtn" class="mode-btn active">Fast Click <span class="small">(5.8/s)</span></button>
    <button id="slowBtn" class="mode-btn">Slow Click <span class="small">(4.5/s)</span></button>
  </div>

  <div id="resultBox">Result: --</div>
</div>

<script>
const dmgInput = document.getElementById("dmgInput");
const suffixSelect = document.getElementById("suffixSelect");
const resultBox = document.getElementById("resultBox");
const fastBtn = document.getElementById("fastBtn");
const slowBtn = document.getElementById("slowBtn");

let cps = 5.8;

fastBtn.onclick = () => { cps = 5.8; fastBtn.classList.add("active"); slowBtn.classList.remove("active"); update(); };
slowBtn.onclick = () => { cps = 4.5; slowBtn.classList.add("active"); fastBtn.classList.remove("active"); update(); };

dmgInput.oninput = update;
suffixSelect.onchange = update;

const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod", "Vg", "Uvg", "Dvg", "Tvg"];

function applySuffix(num, suf) {
  if (suf === "none") return num.toString();
  const idx = suffixes.indexOf(suf);
  const div = 1000 ** idx;
  return (num / div).toFixed(2) + suf;
}

function update() {
  const dmg = parseFloat(dmgInput.value);
  if (isNaN(dmg)) { resultBox.innerHTML = "Result: --"; return; }

  const dps = dmg * cps;
  const suf = suffixSelect.value;

  if (suf === "none") {
    resultBox.innerHTML = "Result: " + dps;
  } else {
    resultBox.innerHTML = "Result: " + applySuffix(dps, suf);
  }
}
</script>
</body>
</html>
