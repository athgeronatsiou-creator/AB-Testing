import { getApiUrl } from "./config";

const API_URL = getApiUrl();

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const errorMessage = body.error || `Request failed with status ${res.status}`;
      if (res.status === 401) {
        throw new Error("Unauthorized: Please sign in again");
      }
      throw new Error(errorMessage);
    }
    return res.json();
  } catch (error) {
    // Handle network errors (fetch failures, CORS, etc.)
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(
        `Unable to connect to the server. Please ensure the backend is running at ${API_URL}`
      );
    }
    // Re-throw other errors as-is
    throw error;
  }
}


