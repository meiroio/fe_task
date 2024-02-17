const BASE_URL = "http://localhost:3000";

export const api = {
  get(endpoint: string) {
    return fetch(`${BASE_URL}${endpoint}`, { method: "GET" });
  },
  delete(endpoint: string) {
    return fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
    });
  },
};
