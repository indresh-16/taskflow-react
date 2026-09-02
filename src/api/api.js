const API_URL = "https://calm-cat-production-3639.up.railway.app";

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await response.json();

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error(data.message || "Unauthorized");
  }

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}