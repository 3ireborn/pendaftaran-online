// utils-token.js
export function getAdminToken() {
  // Ambil token dari localStorage admin
  const token = localStorage.getItem("npa_admin_token");
  if (!token) {
    console.warn("⚠️ Token GitHub belum diatur di Admin Panel.");
  }
  return token;
}
