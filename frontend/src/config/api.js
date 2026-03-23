const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

if (!API_BASE_URL) {
  console.warn("VITE_API_URL is not configured. API calls may fail.");
}

export function getApiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}
