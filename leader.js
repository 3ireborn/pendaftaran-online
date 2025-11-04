// === FILE: leader.js ===
window.leaders = [
  { code: "SK001", name: "Sugiarto Kurniawan", phone: "6285218453131", slug: "sugiarto" },
  { code: "AM002", name: "Agnes Marsilah", phone: "6285932684440", slug: "agnes" },
  { code: "SW003", name: "Suwarti", phone: "62881011823140", slug: "suwarti" },
  { code: "IY004", name: "Iyang", phone: "6281388675615", slug: "iyang" },
  { code: "QN005", name: "Queen", phone: "6282199558169", slug: "queen" },
  { code: "RH006", name: "Rahmawan", phone: "6281327498929", slug: "rahmawan" },
  { code: "RG007", name: "Regina", phone: "6281285949074", slug: "regina" },
  { code: "TS008", name: "Tasya", phone: "966563414575", slug: "tasya" },
  { code: "DW009", name: "Divawati", phone: "6586210326", slug: "divawati" },
  { code: "TH010", name: "Tohir", phone: "6281236544821", slug: "tohir" },
  { code: "AP011", name: "Alpiano", phone: "6282252161911", slug: "alpiano" },
  { code: "DN012", name: "Dina", phone: "6281236781273", slug: "dina" }
];

// Isi dropdown
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('leaderSelect');
  window.leaders.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.code;
    opt.textContent = `${l.code} - ${l.name}`;
    select.appendChild(opt);
  });
});
