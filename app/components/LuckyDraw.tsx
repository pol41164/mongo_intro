"use client";

import { useEffect, useState } from "react";

type DrawResult = {
  date: string;
  won: boolean;
  code?: string;
};

const STORAGE_KEY = "mango-lucky-draw";
const WIN_RATE = 0.5;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `MANGO90-${code}`;
}

export default function LuckyDraw() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<DrawResult | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: DrawResult = JSON.parse(raw);
        if (saved.date === todayKey()) {
          setResult(saved);
        }
      }
    } catch {
      // localStorage unavailable — treat as no previous draw
    }
  }, []);

  function handleDraw() {
    if (drawing || result) return;
    setDrawing(true);
    window.setTimeout(() => {
      const won = Math.random() < WIN_RATE;
      const next: DrawResult = won
        ? { date: todayKey(), won: true, code: generateCode() }
        : { date: todayKey(), won: false };
      setResult(next);
      setDrawing(false);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore persistence failure
      }
    }, 800);
  }

  async function handleCopy() {
    if (!result?.code) return;
    try {
      await navigator.clipboard.writeText(result.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full bg-ink px-10 py-4 font-mono text-xs uppercase tracking-[0.2em] text-paper transition hover:bg-accent"
      >
        開始抽獎
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lucky-draw-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="animate-fade-up relative w-full max-w-sm rounded-3xl bg-paper-raised p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="關閉"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition hover:bg-ink/5 hover:text-ink"
            >
              ✕
            </button>

            <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">
              Lucky Draw
            </p>

            {!result && (
              <>
                <p className="mt-5 text-5xl">🎁</p>
                <h3 id="lucky-draw-title" className="mt-4 font-display text-2xl text-ink">
                  芒果優惠券抽獎
                </h3>
                <p className="mx-auto mt-3 max-w-[22rem] text-sm leading-7 text-ink-soft">
                  有 <span className="font-semibold text-accent">50%</span> 的機會抽中芒果
                  <span className="font-semibold text-accent">9 折</span>優惠券,
                  <br />
                  快來試試手氣!
                </p>
                <button
                  type="button"
                  onClick={handleDraw}
                  disabled={drawing}
                  className="mt-7 w-full rounded-full bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition hover:bg-accent disabled:opacity-60"
                >
                  {drawing ? "抽獎中…" : "開始抽獎"}
                </button>
              </>
            )}

            {result?.won && (
              <>
                <p className="mt-5 text-5xl">🎉</p>
                <h3 className="mt-4 font-display text-2xl text-accent">恭喜中獎!</h3>
                <p className="mx-auto mt-2 max-w-[22rem] text-sm leading-7 text-ink-soft">
                  你抽中了芒果 9 折優惠券
                </p>
                <div className="mt-5 rounded-2xl border-2 border-dashed border-accent/40 bg-paper px-4 py-3 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-soft">
                    優惠碼
                  </p>
                  <p className="mt-1 font-mono text-lg font-semibold tracking-[0.15em] text-accent">
                    {result.code}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="mt-7 w-full rounded-full bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition hover:bg-accent"
                >
                  {copied ? "已複製!" : "複製優惠碼"}
                </button>
                <p className="mt-4 text-xs leading-5 text-ink-soft">
                  開賣後結帳輸入此碼即可享 9 折。
                </p>
              </>
            )}

            {result && !result.won && (
              <>
                <p className="mt-5 text-5xl">🥭</p>
                <h3 className="mt-4 font-display text-2xl text-ink">尚未中獎</h3>
                <p className="mx-auto mt-3 max-w-[22rem] text-sm leading-7 text-ink-soft">
                  很可惜,這次沒有抽中優惠券。
                  <br />
                  明天再回來試試手氣吧!
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-7 w-full rounded-full bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition hover:bg-accent"
                >
                  關閉
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
