<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Follow-Up 179 Hybrid | 3iReborn</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #e6f0ff, #f9fbff);
      color: #001f4d;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
    }
    .card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
      padding: 2rem;
      width: 90%;
      max-width: 400px;
      text-align: center;
    }
    input, select, button {
      width: 100%;
      padding: 0.8rem;
      margin: 0.5rem 0;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 1rem;
    }
    button {
      background: linear-gradient(90deg, #007bff, #00c3ff);
      color: white;
      border: none;
      cursor: pointer;
      transition: 0.3s;
      font-weight: 600;
    }
    button:hover {
      opacity: 0.85;
    }
    .success {
      background: #e0ffe5;
      color: #007b55;
      padding: 0.8rem;
      border-radius: 8px;
      margin-top: 1rem;
      display: none;
    }
  </style>
</head>
<body>

  <div class="card">
    <h2>📞 Follow-Up 179 Hybrid</h2>
    <p>Sistem follow-up otomatis 1–7–9 hari<br>dengan mode pintar Program 3iReborn 💙</p>

    <input id="nama" type="text" placeholder="Nama Lengkap">
    <input id="wa" type="text" placeholder="Nomor WhatsApp (628...)">
    <select id="mode">
      <option value="leader">Kirim ke Leader</option>
      <option value="system">Kirim ke System AI</option>
    </select>
    <button onclick="simpanData()">Kirim Data</button>

    <div class="success" id="notif">✅ Data tersimpan! Tim follow-up akan menghubungi Anda dalam 1–7–9 hari.</div>
  </div>

  <script>
    function simpanData() {
      const nama = document.getElementById("nama").value.trim();
      const wa = document.getElementById("wa").value.trim();
      const mode = document.getElementById("mode").value;
      if (!nama || !wa) return alert("Isi dulu nama & nomor WA ya beb 😄");

      // Simulasi kirim ke sistem / leader
      if (mode === "leader") {
        alert("📤 Data dikirim ke Leader. Tunggu follow-up dalam waktu dekat 💬");
      } else {
        alert("🤖 Data dikirim ke sistem AI Follow-Up. Anda akan dihubungi otomatis 🕒");
      }

      // Notifikasi tampil
      document.getElementById("notif").style.display = "block";
      document.getElementById("nama").value = "";
      document.getElementById("wa").value = "";
    }
  </script>

</body>
</html>
