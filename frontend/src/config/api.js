const BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
export const API_BASE_URL = `${BASE_URL}/api`;

if (!BASE_URL) {
  console.warn("VITE_API_URL is not configured. API calls may fail.");
}

export function getApiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export default API_BASE_URL;
