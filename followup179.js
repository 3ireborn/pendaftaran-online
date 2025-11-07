// FOLLOW-UP 179 SYSTEM - by NPA Digital System
// Terhubung otomatis dengan LP Master (data tersimpan di localStorage)

const FOLLOWUP_KEY = "followUpList";

// Helper untuk format tanggal
function formatDate(d) {
  return d.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
}

// Simpan follow-up baru
function addFollowUp(name, phone, leader = "NPA") {
  const arr = JSON.parse(localStorage.getItem(FOLLOWUP_KEY) || "[]");
  const now = Date.now();
  const entry = {
    name,
    phone,
    leader,
    createdAt: now,
    reminders: [
      { day: 1, time: now + 1 * 86400000, done: false },
      { day: 7, time: now + 7 * 86400000, done: false },
      { day: 9, time: now + 9 * 86400000, done: false },
    ],
  };
  arr.push(entry);
  localStorage.setItem(FOLLOWUP_KEY, JSON.stringify(arr));
  return entry;
}

// Cek jadwal follow-up yang sudah waktunya
function checkFollowUpDue() {
  const arr = JSON.parse(localStorage.getItem(FOLLOWUP_KEY) || "[]");
  const now = Date.now();
  const due = [];

  arr.forEach((entry) => {
    entry.reminders.forEach((r) => {
      if (!r.done && now >= r.time) {
        due.push({
          name: entry.name,
          phone: entry.phone,
          leader: entry.leader,
          day: r.day,
          time: r.time,
        });
        r.done = true;
      }
    });
  });

  if (due.length) {
    localStorage.setItem(FOLLOWUP_KEY, JSON.stringify(arr));
  }
  return due;
}

// Tampilkan notifikasi follow-up di halaman
function renderFollowUpPopup(dueList) {
  if (!dueList.length) return;
  const wrap = document.createElement("div");
  wrap.style = `
    position:fixed;bottom:20px;right:20px;background:#0b3d91;color:#fff;
    padding:20px;border-radius:16px;box-shadow:0 6px 20px rgba(0,0,0,.3);
    max-width:300px;z-index:9999;font-family:Poppins,sans-serif;
  `;
  wrap.innerHTML = `<h4>📆 Follow-Up Hari Ini</h4>`;
  dueList.forEach((p) => {
    const msg = encodeURIComponent(
      `Assalamu'alaikum ${p.name} 🙏🏻\n\nSaya dari 3iReborn (Leader: ${p.leader}).\nMengingatkan kembali acara Zoom Meeting & peluang 3iReborn yang kemarin kamu minati 💫\n\nApakah masih berminat ikut?`
    );
    const link = `https://wa.me/${p.phone}?text=${msg}`;
    const btn = document.createElement("a");
    btn.href = link;
    btn.target = "_blank";
    btn.style = `
      display:block;background:#25D366;color:#fff;padding:8px 12px;
      border-radius:8px;text-decoration:none;font-weight:600;margin:6px 0;
    `;
    btn.textContent = `Follow-Up ${p.name} (Hari ke-${p.day})`;
    wrap.appendChild(btn);
  });
  document.body.appendChild(wrap);
}

// Jalankan sistem saat halaman dibuka
window.addEventListener("load", () => {
  const due = checkFollowUpDue();
  renderFollowUpPopup(due);
});
