const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

/** @typedef {{ id: number, customer: string, model: string, status: string }} Order */

/**
 * @param {AbortSignal} [signal]
 * @returns {Promise<Order[] | null>} The orders, or null if login is required.
 */
export default async function getOrders(signal) {
  const response = await fetch(`${apiUrl}/orders`, {
    credentials: "include",
    cache: "no-store",
    signal,
  });

  if (response.status === 401) return null;
  if (!response.ok) throw new Error(`Could not load orders (HTTP ${response.status})`);
  return response.json();
}

/** @param {{ name: string, model: string, notes?: string }} order */
export function addOrder(order) {
  return fetch(`${apiUrl}/orders/add`, {
    method: "POST",
    credentials: "omit",
    redirect: "error",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
}

export function updateOrder(id, status, csrfToken) {
  if (typeof status !== "string") {
    throw new TypeError("Order status must be a string");
  }

  if (typeof id !== "number") {
    throw new TypeError("Id must be an integer");
  }

  return fetch(`${apiUrl}/orders/status/${id}`, {
    method: "PATCH",
    credentials: "include",
    redirect: "error",
    headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": csrfToken },
    body: JSON.stringify({status}),
  });


}

/**
 * @param {number} id
 * @param {string} csrfToken
 */
export function deleteOrder(id, csrfToken) {
  if (!Number.isInteger(id)) {
    throw new TypeError("Id must be an integer");
  }

  return fetch(`${apiUrl}/orders/${id}`, {
    method: "DELETE",
    credentials: "include",
    redirect: "error",
    headers: { "X-CSRF-TOKEN": csrfToken },
  });
}
