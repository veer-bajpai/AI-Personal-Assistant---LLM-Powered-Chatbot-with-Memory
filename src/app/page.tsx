const API =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" &&
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1"
    ? "https://friday-backend-qair.onrender.com"
    : "http://localhost:8000");

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers ?? {});

  const hasBody = init?.body !== undefined && !(init.body instanceof FormData);

  if (hasBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!hasBody && headers.has("Content-Type")) {
    headers.delete("Content-Type");
  }

  const url = `${API}${path}`;

  let response: Response;

  try {
    response = await fetch(url, {
      ...init,
      headers,
    });
  } catch {
    throw new Error(
      `Could not connect to Friday API at ${API}. Check that the backend is reachable.`,
    );
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");

    throw new Error(
      `Friday API returned ${response.status}: ${
        body || response.statusText || "Request failed"
      }`,
    );
  }

  return response.json();
}
