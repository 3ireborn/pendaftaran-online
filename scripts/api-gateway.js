import { getAdminToken } from './utils-token.js';

export async function onRequestPost(context) {
  const GITHUB_TOKEN = getAdminToken(); // token diambil dari localStorage
  const owner = "3ireborn";
  const repo = "pendaftaran-online";

  if (!GITHUB_TOKEN) {
    return new Response(JSON.stringify({ error: "Token belum diatur di Admin Panel." }), {
      headers: { "Content-Type": "application/json" },
      status: 403
    });
  }

  try {
    const body = await context.request.json();
    const newData = { name: body.name, wa: body.wa, slug: body.slug };

    // Ambil data lama
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/data/leaders.json`;
    const res = await fetch(url, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    const json = await res.json();
    const oldData = JSON.parse(atob(json.content));

    // Tambahkan data baru
    oldData.push(newData);

    // Upload ke GitHub
    const update = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `Tambah mitra baru (${body.name}) via Leader Panel`,
        content: btoa(JSON.stringify(oldData, null, 2)),
        sha: json.sha
      })
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Gagal update data." }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
  }
