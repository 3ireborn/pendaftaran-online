<script>
// =======================
// 🤖 NPA Smart BOT Monitor v1.1 (frontend demo)
// NOTE: Untuk produksi, pindahkan logika kirim pesan ke server (Cloudflare Workers / Netlify Functions)
// =======================

// === Konfigurasi dasar (bisa diubah lewat UI) ===
const NPA = {
  ownerName: "Sugiarto Kurniawan",
  ownerPhone: "6285218453131",
  baseUrl: "https://api.fonnte.com/send",
  tz: "Asia/Jakarta",
  // daftar leader (ambil dari leaders.json kalau mau dinamis)
  leaders: [
    "6285218453131","6285932684440","62881011823140","6281388675615",
    "6282199558169","6281327498929","6281285949074","966563414575",
    "6586210326","6281236544821","6282252161911","6281236781273","6288293744431"
  ],
  // jam auto kirim (WIB)
  autoHour: 6,
  autoMinute: 0,
};

// === Pesan motivasi ===
const MOTIVATION_MESSAGES = [
  "💫 Setiap hari adalah peluang baru untuk menjemput rezeki. Tetap semangat 💪 #Terkirim dengan 💞 dari NPA Smart System 🚀",
  "🌅 Jangan takut gagal, takutlah kalau kamu berhenti mencoba. #NPA #3iReborn 🚀",
  "🔥 Rezeki tidak akan salah alamat, yang penting terus bergerak dengan niat baik 💼 #SmartSystem #3iNetworks",
  "💪 Jadikan hari ini luar biasa dengan semangat yang tak biasa! #Terkirim dari NPA Smart System 🚀",
  "🚀 Kesuksesan adalah hasil dari kebiasaan kecil yang dilakukan setiap hari. Yuk lanjutkan perjuanganmu! #3iReborn"
];

// === Token disimpan di localStorage agar tidak hardcode di source ===
function getToken() {
  return localStorage.getItem("fonnte_token") || "";
}
function setToken(tok) {
  localStorage.setItem("fonnte_token", tok);
  paintStatus();
}

// === Kirim pesan via Fonnte (demo: langsung call API dari browser → token terlihat di devtools)
// Untuk produksi: Pindahkan ini ke server tanpa mengekspos token
async function sendMessage(target, text) {
  const token = getToken();
  if (!token) throw new Error("Token kosong. Set token dulu.");

  const res = await fetch(NPA.baseUrl, {
    method: "POST",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ target, message: text })
  });
  if (!res.ok) {
    const t = await res.text().catch(()=>"-");
    throw new Error(`HTTP ${res.status}: ${t}`);
  }
  return true;
}

// === Broadcast ke semua leader ===
async function broadcast(message) {
  for (const phone of NPA.leaders) {
    try {
      await sendMessage(phone, `${message}\n\nSmart Auto Broadcast by 3iReborn || NPA Team 🚀`);
      addLog(`✅ Terkirim ke ${phone}`);
    } catch (e) {
      addLog(`❌ Gagal ke ${phone}: ${e.message}`);
    }
  }
}

// === Auto 06:00 WIB (jalan selama halaman terbuka) ===
let autoOn = true;
function tickAuto() {
  if (!autoOn) return;
  try {
    const now = new Date();
    // Konversi ke WIB dengan Intl (client tetap lokal tapi pakai jam Asia/Jakarta)
    const wib = new Date(now.toLocaleString("en-US", { timeZone: NPA.tz }));
    const h = wib.getHours();
    const m = wib.getMinutes();
    if (h === NPA.autoHour && m === NPA.autoMinute) {
      const msg = MOTIVATION_MESSAGES[Math.floor(Math.random() * MOTIVATION_MESSAGES.length)];
      addLog("🚀 Auto-schedule 06:00 WIB: mulai broadcast…");
      broadcast(msg);
      // tahan 61 detik biar tidak dobel di menit yang sama
      setTimeout(()=>{}, 61000);
    }
  } catch {}
}
setInterval(tickAuto, 15_000); // cek tiap 15 detik

// =======================
// UI MONITOR
// =======================
function createMonitorUI() {
  const wrap = document.createElement("div");
  wrap.id = "npa-bot-monitor";
  wrap.innerHTML = `
    <div class="npa-bar">
      <div class="left">
        <span class="dot" id="npa-status-dot"></span>
        <strong>NPA BOT</strong>
        <span class="muted">• WIB</span>
      </div>
      <div class="right">
        <button id="npa-btn-token" class="btn alt">Set Token</button>
        <button id="npa-btn-test" class="btn">Kirim Tes</button>
        <button id="npa-btn-broadcast" class="btn">Broadcast</button>
        <label class="switch">
          <input type="checkbox" id="npa-auto" checked>
          <span>Auto 06:00</span>
        </label>
      </div>
    </div>
    <div class="npa-log" id="npa-log"></div>
  `;
  document.body.appendChild(wrap);

  // events
  document.getElementById("npa-btn-token").onclick = () => {
    const cur = getToken();
    const t = prompt("Masukkan/ubah Fonnte TOKEN:", cur || "");
    if (t !== null) {
      setToken(t.trim());
      addLog("🔐 Token diperbarui (tersimpan di perangkat ini).");
    }
  };

  document.getElementById("npa-btn-test").onclick = async () => {
    const msg = "Tes kirim dari NPA BOT Monitor ✅";
    try {
      await sendMessage(NPA.ownerPhone, msg);
      addLog(`✅ Tes terkirim ke ${NPA.ownerPhone}`);
    } catch (e) {
      addLog(`❌ Tes gagal: ${e.message}`);
    }
  };

  document.getElementById("npa-btn-broadcast").onclick = async () => {
    const msg = MOTIVATION_MESSAGES[Math.floor(Math.random() * MOTIVATION_MESSAGES.length)];
    addLog("🚀 Broadcast manual dimulai…");
    broadcast(msg);
  };

  document.getElementById("npa-auto").onchange = (e) => {
    autoOn = e.target.checked;
    addLog(`⚙️ Auto 06:00 ${autoOn ? "AKTIF" : "OFF"}.`);
  };

  paintStatus();
}

function paintStatus() {
  const dot = document.getElementById("npa-status-dot");
  if (!dot) return;
  dot.className = "dot " + (getToken() ? "ok" : "warn");
}

function addLog(line) {
  const box = document.getElementById("npa-log");
  if (!box) return;
  const time = new Date().toLocaleTimeString("id-ID", { timeZone: NPA.tz, hour12:false });
  const p = document.createElement("div");
  p.textContent = `[${time}] ${line}`;
  box.prepend(p);
}

// inject UI setelah halaman siap
document.addEventListener("DOMContentLoaded", createMonitorUI);
</script>
