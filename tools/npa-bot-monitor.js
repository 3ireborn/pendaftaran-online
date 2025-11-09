// =======================
// 🤖 NPA Smart BOT v1.0 FULL MODE
// Powered by NPA Smart System x 3iReborn
// =======================

const TOKEN = "a2vtTGhWMnWxFZtxw1U1"; // <- Ganti token di sini kalau perlu update
const OWNER_NAME = "Sugiarto Kurniawan";
const OWNER_PHONE = "6285218453131";
const BASE_URL = "https://api.fonnte.com/send";

// 🕕 Jadwal auto broadcast motivasi setiap hari 06:00 WIB
const MOTIVATION_MESSAGES = [
  "💫 Setiap hari adalah peluang baru untuk menjemput rezeki. Tetap semangat 💪 #Terkirim dengan 💞 dari NPA Smart System 🚀",
  "🌅 Jangan takut gagal, takutlah kalau kamu berhenti mencoba. #NPA #3iReborn 🚀",
  "🔥 Rezeki tidak akan salah alamat, yang penting terus bergerak dengan niat baik 💼 #SmartSystem #3iNetworks",
  "💪 Jadikan hari ini luar biasa dengan semangat yang tak biasa! #Terkirim dari NPA Smart System 🚀",
  "🚀 Kesuksesan adalah hasil dari kebiasaan kecil yang dilakukan setiap hari. Yuk lanjutkan perjuanganmu! #3iReborn"
];

// =======================
// 🧠 Auto Reply Keyword
// =======================
async function handleIncomingMessage(sender, message) {
  message = message.toLowerCase();

  let reply = "";
  if (message.includes("#motivasi")) {
    reply = MOTIVATION_MESSAGES[Math.floor(Math.random() * MOTIVATION_MESSAGES.length)];
  } else if (message.includes("#daftar")) {
    reply = `📋 Klik link pendaftaran resmi kamu di sini:\nhttps://3ireborn.github.io/pendaftaran-online/index-v2.html?leader=sugiarto-kurniawan`;
  } else if (message.includes("#zoom")) {
    reply = "🎥 Jadwal Zoom 3iReborn GRATIS:\nSenin, Rabu, Jumat: 19:00 WIB\nRabu (Minggu ke-2 & ke-4): 14:00 WIB\nJoin: https://bit.ly/Zoom3ireborn";
  } else if (message.includes("#info")) {
    reply = "📢 3iReborn adalah program perlindungan + investasi + penghasilan.\nInfo lengkap:\nhttps://3ireborn.github.io/pendaftaran-online/master-lp.html";
  } else if (message.includes("#kontak")) {
    reply = `📞 Hubungi Leader Anda:\n${OWNER_NAME}\nhttps://wa.me/${OWNER_PHONE}`;
  }

  if (reply) {
    await sendMessage(sender, reply);
  }
}

// =======================
// 📤 Kirim pesan via Fonnte
// =======================
async function sendMessage(target, text) {
  try {
    await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Authorization": TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        target: target,
        message: text
      })
    });
    console.log(`✅ Sent to ${target}`);
  } catch (err) {
    console.error(`❌ Error sending to ${target}:`, err);
  }
}

// =======================
// ⏰ Auto Broadcast tiap 06:00 WIB
// =======================
async function autoBroadcast() {
  const leaderList = [
    "6285218453131", "6285932684440", "62881011823140",
    "6281388675615", "6282199558169", "6281327498929",
    "6281285949074", "966563414575", "6586210326",
    "6281236544821", "6282252161911", "6281236781273",
    "6288293744431"
  ];

  const message = MOTIVATION_MESSAGES[Math.floor(Math.random() * MOTIVATION_MESSAGES.length)];
  for (const leader of leaderList) {
    await sendMessage(leader, message + "\n\nSmart Auto Broadcast by 3iReborn || NPA Team");
  }
}

// Jalankan broadcast otomatis
setInterval(() => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  if (hours === 6 && minutes === 0) {
    console.log("🚀 Sending daily motivation broadcast...");
    autoBroadcast();
  }
}, 60000); // cek setiap menit
