import Image from "next/image";
import { HeroParallax, ParallaxImage, Reveal } from "./components/Parallax";
import WaitlistForm from "./components/WaitlistForm";
import LuckyDraw from "./components/LuckyDraw";

const varieties = [
  {
    name: "愛文芒果促銷",
    en: "IRWIN",
    season: "6–7 月",
    region: "台南・玉井",
    image: "/images/mango-hero.jpg",
    desc: "果皮豔紅、蜜香濃郁,果肉細緻無纖維,是台灣芒果的經典代表。",
  },
  {
    name: "金煌芒果",
    en: "JINHUANG",
    season: "7–8 月",
    region: "高雄・六龜",
    image: "/images/mango-sliced.jpg",
    desc: "果實碩大、色澤金黃,甜度高而酸味低,一顆可重達兩台斤。",
  },
  {
    name: "玉文芒果",
    en: "YUWEN",
    season: "6–8 月",
    region: "台南・玉井",
    image: "/images/mango-whole.jpg",
    desc: "愛文與凱特雜交品種,晚熟耐儲運,甜度高且風味濃郁。",
  },
  {
    name: "凱特芒果",
    en: "KEITT",
    season: "8–9 月",
    region: "屏東・枋山",
    image: "/images/mango-green.jpg",
    desc: "果皮青綠帶紅暈,果肉紮實少纖維,是夏末最後的鮮甜滋味。",
  },
];

export default function Home() {
  return (
    <main id="top" className="flex-1">
      {/* hero */}
      <section className="relative flex h-[70vh] min-h-[440px] items-end overflow-hidden sm:h-[85vh] sm:min-h-[560px]">
        <HeroParallax className="absolute -inset-y-[12%] inset-x-0" speed={0.25}>
          <Image
            src="/images/mango-hero.jpg"
            alt="剛採下、沾著露水的成熟芒果"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </HeroParallax>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
          <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.3em] text-accent-soft">
            Sunlit Mango — 台灣芒果直送
          </p>
          <h1
            className="animate-fade-up mt-6 max-w-2xl font-display text-4xl leading-[1.3] text-white sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            全日陽光,
            <br />
            才捨得摘下這一顆。
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-md text-base leading-8 text-white/80"
            style={{ animationDelay: "260ms" }}
          >
            來自台灣南部果園,顆顆自然完熟的芒果,從果園到餐桌,鎖住盛夏的濃郁香甜。
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-wrap items-center gap-8 font-mono text-xs uppercase tracking-[0.2em]"
            style={{ animationDelay: "400ms" }}
          >
            <a
              href="#varieties"
              className="border-b border-white pb-1 text-white transition hover:border-accent-soft hover:text-accent-soft"
            >
              認識芒果品種 →
            </a>
            <a href="#waitlist" className="text-white/70 transition hover:text-white">
              搶先登記
            </a>
          </div>
        </div>
      </section>

      {/* usp strip */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 divide-y divide-line border-b border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="px-6 py-8 text-center sm:text-left">
            <p className="font-display text-3xl text-ink">100%</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              台灣在地鮮採
            </p>
          </div>
          <div className="px-6 py-8 text-center sm:text-left">
            <p className="font-display text-3xl text-ink">24H</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              產地直送到府
            </p>
          </div>
          <div className="px-6 py-8 text-center sm:text-left">
            <p className="font-display text-3xl text-ink">自然完熟</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
              不催熟、不打蠟
            </p>
          </div>
        </div>
      </section>

      {/* varieties */}
      <section id="varieties" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="mb-12 flex items-end justify-between border-b border-line pb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">01 · Varieties</p>
            <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">芒果品種</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
          {varieties.map((v, i) => (
            <Reveal key={v.name} delay={i * 90}>
              <ParallaxImage
                src={v.image}
                alt={v.name}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="relative aspect-[16/11] overflow-hidden border border-line"
                imgClassName="object-cover transition duration-500 hover:scale-105"
                speed={14}
              />
              <div className="mt-5 flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl text-ink sm:text-3xl">{v.name}</h3>
                <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
                  {v.en}
                </span>
              </div>
              <p className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
                <span>產季 {v.season}</span>
                <span className="text-line">|</span>
                <span>{v.region}</span>
              </p>
              <p className="mt-3 max-w-md text-sm leading-6 text-ink-soft">{v.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* story */}
      <section id="story" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="mb-12 border-b border-line pb-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">02 · Terroir</p>
          <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">產地風土</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <ParallaxImage
              src="/images/mango-tree.jpg"
              alt="枝頭上結果的芒果樹"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="relative aspect-[4/3] overflow-hidden border border-line"
              speed={22}
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-md text-base leading-8 text-ink-soft">
              我們與台灣南部的果農契作,堅持不催熟、不打蠟,讓每一顆芒果在枝頭上曬足陽光,自然轉紅、自然轉甜。
              清晨採收後當天分級包裝,將果園裡最新鮮的滋味,直送到你手上。
            </p>
          </Reveal>
        </div>
      </section>

      {/* lucky draw */}
      <section id="lucky-draw" className="mx-auto max-w-6xl px-6 py-24 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Lucky Draw
          </p>
          <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            手氣不錯,就送你優惠
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-8 text-ink-soft">
            每天一次機會,50% 機率抽中芒果 9 折優惠券,點下面按鈕試試手氣!
          </p>
          <div className="mt-8 flex justify-center">
            <LuckyDraw />
          </div>
        </Reveal>
      </section>

      {/* waitlist */}
      <section id="waitlist" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="mb-12 flex items-end justify-between border-b border-line pb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              03 · Coming Soon
            </p>
            <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
              還沒開賣,先幫你留位置
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="max-w-md text-base leading-8 text-ink-soft">
              今年產季即將開始,我們還在為第一批鮮採芒果做準備。留下 Email,
              一開賣就馬上通知你,讓你搶先嚐到今年最甜的那一口。
            </p>
          </Reveal>

          <Reveal delay={120}>
            <WaitlistForm />
            <p className="mt-6 text-sm leading-6 text-ink-soft">
              企業採購 / 批發合作,歡迎直接來信{" "}
              <a
                href="mailto:hello@sunlitmango.tw"
                className="border-b border-ink text-ink transition hover:border-accent hover:text-accent"
              >
                hello@sunlitmango.tw
              </a>{" "}
              洽詢。
            </p>
          </Reveal>
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="mx-auto max-w-3xl px-6 pb-32 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Contact</p>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            有其他問題想先問我們?
          </h2>
          <p className="mt-6 text-ink-soft">
            無論是芒果品種、產季或合作提案,都歡迎寫信給我們,我們會盡快回覆你。
          </p>
          <a
            href="mailto:hello@sunlitmango.tw"
            className="mt-10 inline-block border-b border-ink font-mono text-sm uppercase tracking-[0.2em] text-ink transition hover:border-accent hover:text-accent"
          >
            hello@sunlitmango.tw
          </a>
        </Reveal>
      </section>
    </main>
  );
}
