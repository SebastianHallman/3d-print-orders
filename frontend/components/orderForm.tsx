"use client";

import { useState, type FormEvent } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export default function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const notes = String(data.get("notes") ?? "").trim();
    const order = {
      name: String(data.get("name") ?? "").trim(),
      model: String(data.get("model") ?? "").trim(),
      ...(notes ? { notes } : {}),
    };

    if (!order.name || !order.model) {
      setMessage("Enter your name and the model.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`${apiUrl}/orders/add`, {
        method: "POST",
        credentials: "omit",
        redirect: "error",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        setMessage(`Could not submit the order (HTTP ${response.status}).`);
        return;
      }

      form.reset();
      setMessage("Order received.");
    } catch {
      setMessage("Could not submit the order. Check the API and your browser console.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldClass = "rounded-md border border-current/25 px-3 py-2";

  return (
    <form lang="en" className="grid gap-4" onSubmit={submitOrder}>
      <label className="grid gap-1">
        Name
        <input className={fieldClass} name="name" autoComplete="name" required />
      </label>
      <label className="grid gap-1">
        Model
        <input className={fieldClass} name="model" required />
      </label>
      <label className="grid gap-1">
        Notes (optional)
        <textarea className={fieldClass} name="notes" rows={3} placeholder="Material, color, done by date etc"/>
      </label>
      <button
        className="rounded-md bg-foreground px-4 py-2 font-medium text-background disabled:opacity-50"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting…" : "Submit order"}
      </button>
      <p role="status">{message}</p>
    </form>
  );
}
