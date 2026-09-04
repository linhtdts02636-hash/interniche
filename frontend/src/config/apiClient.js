const API_BASE = "http://localhost:8080";

async function request(path, method, body) {
  const res = await fetch(API_BASE + path, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function apiPost(path, body) {
  return request(path, "POST", body);
}

export async function apiGet(path) {
  return request(path, "GET");
}

export async function apiDelete(path, body) {
  return request(path, "DELETE", body);
}

export async function apiPatch(path, body) {
  return request(path, "PATCH", body);
}

export async function apiPut(path, body) {
  return request(path, "PUT", body);
}
