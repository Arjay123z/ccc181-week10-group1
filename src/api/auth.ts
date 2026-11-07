const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'campusconnect_token';

export type User = {
  id: number;
  name: string;
  email: string;
};

export type LoginResult = {
  token: string;
  user: User;
};

// Our own error type: the page only ever shows its friendly message.
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function messageFor(status: number): string {
  if (status === 400 || status === 401) {
    return 'Wrong email or password.';
  }
  if (status >= 500) {
    return 'Something went wrong on our side. Please try again later.';
  }
  return 'Something went wrong. Please try again.';
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResult> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    // Server stopped or wrong address: fetch itself fails.
    throw new ApiError('Cannot reach the server. Please try again.', 0);
  }

  if (!response.ok) {
    throw new ApiError(messageFor(response.status), response.status);
  }
  return (await response.json()) as LoginResult;
}

export async function getMe(token: string): Promise<User> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    throw new ApiError('Cannot reach the server. Please try again.', 0);
  }

  if (!response.ok) {
    throw new ApiError('Not logged in.', response.status);
  }
  return (await response.json()) as User;
}

// Token lives in sessionStorage only. Never log it or put it in a URL.
export function saveToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function readToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function clearToken(): void {
  sessionStorage.removeItem(TOKEN_KEY);
}