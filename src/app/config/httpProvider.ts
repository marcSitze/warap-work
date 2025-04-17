import { AUTH_TOKEN, REFRESH_TOKEN } from "@/constants/local-storage-keys";
import { API_URL } from ".";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions<T> {
  method?: HttpMethod;
  body?: T;
  headers?: HeadersInit;
}

interface DataProvider {
  get: <T>(url: string, headers?: HeadersInit) => Promise<T>;
  post: <T, U>(url: string, body: U, headers?: HeadersInit) => Promise<T>;
  put: <T, U>(url: string, body: U, headers?: HeadersInit) => Promise<T>;
  patch: <T, U>(url: string, body: U, headers?: HeadersInit) => Promise<T>;
  delete: <T>(url: string, headers?: HeadersInit) => Promise<T>;
}

const createDataProvider = (): DataProvider => {
  const request = async <T, U = unknown>(
    url: string,
    { method = "GET", body, headers }: RequestOptions<U> = {}
  ): Promise<T> => {
    const response = await fetch(`${API_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
      const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        body: JSON.stringify({ token: localStorage.getItem(REFRESH_TOKEN) }),
        headers: { "Content-Type": "application/json" },
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        localStorage.setItem(AUTH_TOKEN, data.accessToken);

        // Retry original request with new token
        const result = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
        });
        return result.json();
      }
    } else {
      // Refresh failed, force logout
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
    }

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  return {
    get: (url, headers) => request(url, { method: "GET", headers }),
    post: (url, body, headers) =>
      request(url, { method: "POST", body, headers }),
    put: (url, body, headers) => request(url, { method: "PUT", body, headers }),
    patch: (url, body, headers) =>
      request(url, { method: "PATCH", body, headers }),
    delete: (url, headers) => request(url, { method: "DELETE", headers }),
  };
};

export default createDataProvider;
