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
      setMessage("Fyll i namn och modell.");
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
        setMessage(`Ordern kunde inte skickas (HTTP ${response.status}).`);
        return;
      }

      form.reset();
      setMessage("Ordern togs emot.");
    } catch {
      setMessage("Ordern kunde inte skickas. Kontrollera API:t och webbläsarens konsol.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldClass = "rounded-md border border-current/25 px-3 py-2";

  return (
    <form className="grid gap-4" onSubmit={submitOrder}>
      <label className="grid gap-1">
        Namn
        <input className={fieldClass} name="name" autoComplete="name" required />
      </label>
      <label className="grid gap-1">
        Modell
        <input className={fieldClass} name="model" required />
      </label>
      <label className="grid gap-1">
        Anteckning (valfritt)
        <textarea className={fieldClass} name="notes" rows={3} />
      </label>
      <button
        className="rounded-md bg-foreground px-4 py-2 font-medium text-background disabled:opacity-50"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Skickar…" : "Skicka testorder"}
      </button>
      <p role="status">{message}</p>
    </form>
  );
}
