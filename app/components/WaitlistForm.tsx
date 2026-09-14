"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!EMAIL_PATTERN.test(trimmed)) {
      setStatus("error");
      setMessage("請輸入有效的 Email 格式,例如 you@example.com。");
      return;
    }

    // 目前尚未串接後端儲存,先單純告知使用者敬請期待。
    setStatus("success");
    setMessage("已收到你的登記!開賣好消息請耐心等候通知。");
    setEmail("");
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col sm:flex-row sm:items-stretch"
      >
        <label htmlFor="waitlist-email" className="sr-only">
          Email
        </label>
        <input
          id="waitlist-email"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
          }}
          placeholder="you@example.com"
          aria-invalid={status === "error"}
          className={`w-full border bg-paper-raised px-5 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none sm:flex-1 ${
            status === "error"
              ? "border-red-700 focus:border-red-700"
              : "border-line focus:border-accent"
          }`}
        />
        <button
          type="submit"
          className="mt-3 border border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition hover:border-accent hover:bg-accent sm:mt-0 sm:border-l-0"
        >
          加入名單 →
        </button>
      </form>
      {message && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-sm ${status === "error" ? "text-red-700" : "text-accent-2"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
