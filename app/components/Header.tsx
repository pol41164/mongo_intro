"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/#varieties", index: "01", label: "芒果品種" },
  { href: "/#story", index: "02", label: "產地風土" },
  { href: "/blog", index: "03", label: "部落格" },
  { href: "/game", index: "04", label: "小遊戲" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-baseline gap-2.5"
        >
          <span className="font-display text-lg text-ink">日光芒果</span>
          <span className="hidden font-mono text-[11px] tracking-[0.3em] text-ink-soft sm:inline">
            SUNLIT MANGO
          </span>
        </Link>

        <div className="hidden items-center gap-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-transparent pb-1 transition hover:border-accent hover:text-ink"
            >
              <span className="text-ink-soft/60">{link.index}</span> {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/#waitlist"
          className="hidden font-mono text-xs uppercase tracking-[0.2em] text-ink transition hover:text-accent lg:block"
        >
          搶先登記 →
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "關閉選單" : "開啟選單"}
          aria-expanded={open}
          className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5 border border-line lg:hidden"
        >
          <span
            className={`h-px w-4 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-4 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-line lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-6 py-2 font-mono text-xs uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-ink-soft transition hover:text-ink"
              >
                <span className="text-ink-soft/60">{link.index}</span> {link.label}
              </Link>
            ))}
            <Link
              href="/#waitlist"
              onClick={() => setOpen(false)}
              className="py-4 text-accent"
            >
              搶先登記 →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
