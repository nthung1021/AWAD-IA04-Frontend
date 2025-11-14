export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

export type RegisterPayload = { name: string; email: string; password: string };
export type RegisterResponse = {
  message: string;
  data: { id: string; name: string; email: string; createdAt: string };
};

type ApiErrorShape = { message?: string; field?: 'name' | 'email' | 'password'; code?: string };

export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  const res = await fetch(`${API_BASE}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {

    const err: ApiErrorShape = {
      message: json?.message ?? 'Registration failed',
      field: json?.field,
      code: json?.code,
    };

    throw err as any;
  }
  return json;
}
