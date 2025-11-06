const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export async function register(payload) {
  const r = await fetch(`${API_BASE}/api/register`, {
    method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(payload)
  });
  return r.json();
}

export async function login({ username, password }) {
  const r = await fetch(`${API_BASE}/api/login`, {
    method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ username, password })
  });
  return r.json();
}

export function saveToken(tkn) { localStorage.setItem('sms_token', tkn); }
export function getToken() { return localStorage.getItem('sms_token'); }

export async function getStudents(department) {
  const token = getToken();
  const url = `${API_BASE}/api/students` + (department ? `?department=${encodeURIComponent(department)}` : '');
  const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` }});
  return r.json();
}

export async function getStudentById(id) {
  const token = getToken();
  const r = await fetch(`${API_BASE}/api/student/${id}`, { headers: { Authorization: `Bearer ${token}` }});
  return r.json();
}
