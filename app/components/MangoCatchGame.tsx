"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GAME_SECONDS = 15;
const BASKET_WIDTH = 16; // percent of game area width
const MANGO_SIZE = 8; // percent of game area width
const CATCH_LINE = 88; // percent of game area height where the basket sits

type Mango = {
  id: number;
  x: number; // percent
  y: number; // percent
  speed: number; // percent per second
};

type Status = "idle" | "playing" | "ended";

export default function MangoCatchGame() {
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [basketX, setBasketX] = useState(50);
  const [mangoes, setMangoes] = useState<Mango[]>([]);
  const [bestScore, setBestScore] = useState(0);

  const areaRef = useRef<HTMLDivElement>(null);
  const basketXRef = useRef(50);
  const nextIdRef = useRef(0);
  const spawnAccRef = useRef(0);
  const spawnIntervalRef = useRef(900);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const endAtRef = useRef(0);

  const moveBasketTo = useCallback((clientX: number) => {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(
      100 - BASKET_WIDTH / 2,
      Math.max(BASKET_WIDTH / 2, percent),
    );
    basketXRef.current = clamped;
    setBasketX(clamped);
  }, []);

  function startGame() {
    setScore(0);
    setTimeLeft(GAME_SECONDS);
    setMangoes([]);
    basketXRef.current = 50;
    setBasketX(50);
    nextIdRef.current = 0;
    spawnAccRef.current = 0;
    spawnIntervalRef.current = 900;
    lastTsRef.current = null;
    endAtRef.current = performance.now() + GAME_SECONDS * 1000;
    setStatus("playing");
  }

  useEffect(() => {
    if (status !== "playing") return;

    function tick(ts: number) {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const remainingMs = endAtRef.current - ts;
      setTimeLeft(Math.max(0, Math.ceil(remainingMs / 1000)));

      if (remainingMs <= 0) {
        setStatus("ended");
        return;
      }

      spawnAccRef.current += dt * 1000;
      let spawned: Mango | null = null;
      if (spawnAccRef.current >= spawnIntervalRef.current) {
        spawnAccRef.current = 0;
        spawnIntervalRef.current = Math.max(
          420,
          spawnIntervalRef.current - 15,
        );
        spawned = {
          id: nextIdRef.current++,
          x: Math.random() * (100 - MANGO_SIZE) + MANGO_SIZE / 2,
          y: -MANGO_SIZE,
          speed: 32 + Math.random() * 22,
        };
      }

      setMangoes((prev) => {
        const withSpawn = spawned ? [...prev, spawned] : prev;
        const next: Mango[] = [];
        let caught = 0;

        for (const m of withSpawn) {
          const y = m.y + m.speed * dt;
          const reachedBasket = y >= CATCH_LINE;
          const withinBasket =
            Math.abs(m.x - basketXRef.current) <
            (BASKET_WIDTH + MANGO_SIZE) / 2.4;

          if (reachedBasket && withinBasket) {
            caught += 1;
            continue;
          }
          if (y > 104) continue;
          next.push({ ...m, y });
        }

        if (caught > 0) setScore((s) => s + caught);
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [status]);

  useEffect(() => {
    if (status !== "playing") return;
    function onKeyDown(e: KeyboardEvent) {
      const area = areaRef.current;
      if (!area) return;
      const step = 6;
      if (e.key === "ArrowLeft") {
        basketXRef.current = Math.max(
          BASKET_WIDTH / 2,
          basketXRef.current - step,
        );
        setBasketX(basketXRef.current);
      } else if (e.key === "ArrowRight") {
        basketXRef.current = Math.min(
          100 - BASKET_WIDTH / 2,
          basketXRef.current + step,
        );
        setBasketX(basketXRef.current);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [status]);

  useEffect(() => {
    if (status === "ended") {
      setBestScore((b) => Math.max(b, score));
    }
  }, [status, score]);

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
        <span>
          得分 <span className="text-ink">{score}</span>
        </span>
        <span>
          剩餘時間 <span className="text-ink">{timeLeft}s</span>
        </span>
        <span>
          最佳 <span className="text-ink">{bestScore}</span>
        </span>
      </div>

      <div
        ref={areaRef}
        onPointerMove={(e) => {
          if (status === "playing") moveBasketTo(e.clientX);
        }}
        className="relative h-[420px] touch-none select-none overflow-hidden border border-line bg-paper-raised"
      >
        {mangoes.map((m) => (
          <span
            key={m.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-3xl"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            🥭
          </span>
        ))}

        <span
          className="absolute -translate-x-1/2 text-4xl"
          style={{ left: `${basketX}%`, top: `${CATCH_LINE}%` }}
        >
          🧺
        </span>

        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-paper/90 px-6 text-center backdrop-blur-sm">
            {status === "idle" ? (
              <>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  Mini Game
                </p>
                <h3 className="font-display text-2xl text-ink">接芒果</h3>
                <p className="max-w-xs text-sm leading-6 text-ink-soft">
                  15 秒內移動籃子接住掉落的芒果,滑鼠 / 手指拖曳,或用左右方向鍵操作,純娛樂不計代價。
                </p>
              </>
            ) : (
              <>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                  Time&apos;s Up
                </p>
                <h3 className="font-display text-3xl text-ink">本輪得分 {score}</h3>
                <p className="text-sm text-ink-soft">最佳紀錄 {bestScore} 顆</p>
              </>
            )}
            <button
              type="button"
              onClick={startGame}
              className="mt-2 border border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition hover:border-accent hover:bg-accent"
            >
              {status === "idle" ? "開始遊戲 →" : "再玩一次 →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
