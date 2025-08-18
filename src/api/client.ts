export const API_BASE = 'http://localhost:8000/v1';

export async function apiGet(path: string) {
  const token = localStorage.getItem('access_token') || '';
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const text = await res.text();
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const err: any = new Error('Invalid JSON response');
    err.status = res.status;
    err.raw = text.slice(0, 300);
    throw err;
  }
  const json = text ? JSON.parse(text) : {};
  if (!res.ok) {
    const err: any = new Error(json?.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = json;
    throw err;
  }
  return json;
}
