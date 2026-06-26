const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    method: options.method || "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  };

  if (config.body && typeof config.body !== "string") {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Request failed");
  }

  return data.data ?? data;
}

async function requestFormData(endpoint, method, formData) {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method,
    credentials: "include",
    body: formData,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Request failed");
  }

  return data.data ?? data;
}

export async function apiGet(endpoint) {
  return request(endpoint, { method: "GET" });
}

export async function apiPost(endpoint, data) {
  return request(endpoint, { method: "POST", body: data });
}

export async function getCategories() {
  return apiGet("/api/categories");
}

export async function createCategory(formData) {
  return requestFormData("/api/categories", "POST", formData);
}

export async function updateCategory(id, formData) {
  return requestFormData(`/api/categories/${id}`, "PUT", formData);
}

export async function deleteCategory(id) {
  return request(`/api/categories/${id}`, { method: "DELETE" });
}

export async function createProduct(formData) {
  return requestFormData("/api/products", "POST", formData);
}

export async function updateProduct(id, formData) {
  return requestFormData(`/api/products/${id}`, "PUT", formData);
}

export async function deleteProduct(id) {
  return request(`/api/products/${id}`, { method: "DELETE" });
}

export async function getProductsByCategory(slug, options = {}) {
  const query = new URLSearchParams(options).toString();
  return apiGet(`/api/products/category/${slug}${query ? `?${query}` : ""}`);
}

export async function getProducts(options = {}) {
  const query = new URLSearchParams(options).toString();
  return apiGet(`/api/products${query ? `?${query}` : ""}`);
}
