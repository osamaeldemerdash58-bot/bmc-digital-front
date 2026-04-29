const API_BASE = 'https://bmc-digital-server.vercel.app/api';

export async function fetchAPI(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export async function putAPI(endpoint, data) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export async function postAPI(endpoint, data) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export async function deleteAPI(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export function getTranslation(data, section, lang) {
  if (!data || !data[section]) return null;
  return data[section][lang] || data[section].ar;
}

export async function fetchAllData() {
  const [siteConfig, translations, techs, testimonials, faqs, services] = await Promise.all([
    fetchAPI('/site-config'),
    fetchAPI('/translations'),
    fetchAPI('/techs'),
    fetchAPI('/testimonials'),
    fetchAPI('/faqs'),
    fetchAPI('/services'),
  ]);

  // translations is already an object keyed by section from the API
  return {
    siteConfig,
    translations,
    techs,
    testimonials,
    faqs,
    services,
  };
}