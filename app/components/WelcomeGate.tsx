"use client";

import { useEffect, useState, type FormEvent } from "react";

const STORAGE_KEY = "visitor-name";

export default function WelcomeGate() {
  const [name, setName] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setName(stored);
    } catch {
      // localStorage 無法使用時忽略,退回每次輸入
    }
    setReady(true);
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setName(trimmed);
    try {
      localStorage.setItem(STORAGE_KEY, trimmed);
    } catch {
      // 忽略儲存失敗
    }
  }

  function handleReset() {
    setName(null);
    setInput("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // 忽略清除失敗
    }
  }

  if (!ready) return null;

  if (name) {
    return (
      <div className="border-b border-line bg-paper-raised">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            歡迎光臨,<span className="text-ink">{name}</span>
          </p>
          <button
            type="button"
            onClick={handleReset}
            aria-label="不是我 / 重新輸入稱呼"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft transition hover:text-ink"
          >
            不是我 ×
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-6 backdrop-blur-sm">
      <div className="w-full max-w-sm border border-line bg-paper-raised p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Welcome
        </p>
        <h2 className="mt-3 font-display text-2xl text-ink">怎麼稱呼您?</h2>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          留下您的稱呼,讓我們歡迎您的到來。
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <label htmlFor="visitor-name" className="sr-only">
            您的稱呼
          </label>
          <input
            id="visitor-name"
            type="text"
            required
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="請輸入您的稱呼"
            className="w-full border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            className="border border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition hover:border-accent hover:bg-accent"
          >
            進入網站 →
          </button>
        </form>
      </div>
    </div>
  );
}
