'use client'

import { useEffect, useState } from "react";
import getCsrf from "../api/auth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
const loginUrl = `${apiUrl}/login`;
const fieldClass = "min-w-0 rounded-md border border-foreground px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

export default function LoginForm() {

  const [csrfToken, setCsrfToken] = useState("");
  useEffect(() => {
    getCsrf().then((token) => {
      setCsrfToken(token);
    });
    
  }, [])

  return (
    <form aria-label="Admin login" method="post" action={loginUrl} className="grid gap-4 al">
      {csrfToken && <input type="hidden" name="_csrf" value={csrfToken} />}
      <label className="grid gap-1">
        Username
        <input className={fieldClass} name="username" autoComplete="username" required />
      </label>
      <label className="grid gap-1">
        Password
        <input className={fieldClass} type="password" name="password" autoComplete="current-password" required />
      </label>
      <button
        type="submit"
        disabled={!csrfToken}
        className="rounded-md border border-cocoa bg-pistachio px-4 py-2 font-medium text-cocoa enabled:hover:bg-blush focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:opacity-50"
      >
        Log in
      </button>
    </form>
  );
}
