// === FILE: leader.js ===
// Daftar Leader 3iReborn
const leaders = [
  { code: "SK001", name: "Sugiarto Kurniawan", phone: "6285218453131" },
  { code: "AM002", name: "Agnes Marsilah", phone: "6285932684440" },
  { code: "SW003", name: "Suwarti", phone: "62881011823140" },
  { code: "IY004", name: "Iyang", phone: "6281388675615" },
  { code: "QN005", name: "Queen", phone: "6282199558169" },
  { code: "RH006", name: "Rahmawan", phone: "6281327498929" },
  { code: "RG007", name: "Regina", phone: "6281285949074" },
  { code: "TS008", name: "Tasya", phone: "966563414575" },
  { code: "DW009", name: "Divawati", phone: "6586210326" },
  { code: "TH010", name: "Tohir", phone: "6281236544821" },
  { code: "AP011", name: "Alpiano", phone: "6282252161911" },
  { code: "DN012", name: "Dina", phone: "6281236781273" }
];

// Isi dropdown otomatis
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('leaderSelect');
  leaders.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.code;
    opt.textContent = `${l.code} - ${l.name}`;
    select.appendChild(opt);
  });
});
