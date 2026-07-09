const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = {
  get: async (url, config = {}) => {
    let finalUrl = `${BASE_URL}${url}`;
    if (config.params) {
      const query = new URLSearchParams(config.params).toString();
      finalUrl += `?${query}`;
    }
    const response = await fetch(finalUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json", ...config.headers },
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || "Request failed");
      err.response = { data };
      throw err;
    }
    return { data };
  },
  post: async (url, body, config = {}) => {
    const finalUrl = `${BASE_URL}${url}`;
    const response = await fetch(finalUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...config.headers },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || "Request failed");
      err.response = { data };
      throw err;
    }
    return { data };
  },
};

export default api;
