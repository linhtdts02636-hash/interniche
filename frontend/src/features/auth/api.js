import { apiGet, apiPost } from "../../config/apiClient";

export async function loginUser(idToken) {
  return apiPost("/api/v1/auth/login", { idToken });
}

export async function registerUser(idToken, username) {
  return apiPost("/api/v1/auth/register", { idToken, username });
}

export async function logoutUser() {
  return apiPost("/api/v1/auth/logout");
}

export async function validateMe() {
  return apiGet("/api/v1/auth/me");
}
