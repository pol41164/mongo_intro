export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-3xl text-ink">日光芒果</p>
          <p className="mt-4 max-w-xs text-sm leading-7 text-ink-soft">
            來自台灣南部果園,只挑選曬足陽光、自然完熟的芒果,產地直送到你家。
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">
            Index
          </p>
          <ul className="space-y-3 text-sm text-ink">
            <li>
              <a href="#varieties" className="transition hover:text-accent">
                芒果品種
              </a>
            </li>
            <li>
              <a href="#story" className="transition hover:text-accent">
                產地風土
              </a>
            </li>
            <li>
              <a href="#waitlist" className="transition hover:text-accent">
                搶先登記
              </a>
            </li>
            <li>
              <a href="#contact" className="transition hover:text-accent">
                聯絡我們
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">
            Contact
          </p>
          <ul className="space-y-3 text-sm text-ink-soft">
            <li>hello@sunlitmango.tw</li>
            <li>台灣・南部果園直送(尚未開賣)</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Sunlit Mango</span>
          <span>Grown in Taiwan, Ripened by the Sun</span>
        </div>
      </div>
    </footer>
  );
}
