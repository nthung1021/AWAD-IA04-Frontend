let ACCESS_TOKEN: string | null = null;

export function setAccessToken(token: string) {
  ACCESS_TOKEN = token;
}

export function getAccessToken() {
  return ACCESS_TOKEN;
}

export function clearAccessToken() {
  ACCESS_TOKEN = null;
}

export function setRefreshTokenLocal(token: string) {
  if (typeof window !== 'undefined') localStorage.setItem('refreshToken', token);
}

export function getRefreshToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
}

export function clearRefreshTokenLocal() {
  if (typeof window !== 'undefined') localStorage.removeItem('refreshToken');
}

export function clearTokens() {
  clearAccessToken();
  clearRefreshTokenLocal();
}
