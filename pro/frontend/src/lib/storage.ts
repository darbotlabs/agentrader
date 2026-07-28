import { DEFAULT_BACKEND_URL, STORAGE } from "./contracts";

export { STORAGE, DEFAULT_BACKEND_URL };

export function getAppUrl(): string {
  if (typeof localStorage === "undefined") return DEFAULT_BACKEND_URL;
  return localStorage.getItem(STORAGE.APP_URL) || DEFAULT_BACKEND_URL;
}

export function setAppUrl(url: string) {
  localStorage.setItem(STORAGE.APP_URL, url);
}

export function getAdminPassword(): string {
  if (typeof localStorage === "undefined") return "";
  return localStorage.getItem(STORAGE.ADMIN_PASSWORD) || "";
}

export function setAdminPassword(password: string) {
  localStorage.setItem(STORAGE.ADMIN_PASSWORD, password);
}

export function clearSession() {
  localStorage.removeItem(STORAGE.ADMIN_PASSWORD);
}

export function isLoggedIn(): boolean {
  return Boolean(getAdminPassword());
}

export function getDeveloperMode(): boolean {
  return !!localStorage.getItem(STORAGE.DEVELOPER_MODE_ENABLED);
}

export function setDeveloperMode(enabled: boolean) {
  if (enabled) localStorage.setItem(STORAGE.DEVELOPER_MODE_ENABLED, "true");
  else localStorage.removeItem(STORAGE.DEVELOPER_MODE_ENABLED);
}
