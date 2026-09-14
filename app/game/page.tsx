import type { Metadata } from "next";
import Link from "next/link";
import MangoCatchGame from "../components/MangoCatchGame";

export const metadata: Metadata = {
  title: "接芒果小遊戲 | 日光芒果",
  description: "15 秒限時接芒果小遊戲,純娛樂放鬆一下。",
};

export default function GamePage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="mb-14 border-b border-line pb-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            04 · Just for Fun
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            接芒果小遊戲
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-ink-soft">
            趁著等待產季開賣的空檔,來接接看從樹上掉下來的芒果吧!
          </p>
        </div>

        <MangoCatchGame />

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.2em] text-ink transition hover:text-accent"
          >
            ← 回首頁
          </Link>
        </div>
      </section>
    </main>
  );
}
