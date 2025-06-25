export function getAuthToken(): string | null {
  const raw = localStorage.getItem('auth');
  if (!raw) return null;
  try {
    return JSON.parse(raw).token as string;
  } catch {
    return null;
  }
}

export function saveAuth(data: { userId: number; token: string; role: string }) {
  localStorage.setItem('auth', JSON.stringify(data));
}

export function clearAuth() {
  localStorage.removeItem('auth');
}
