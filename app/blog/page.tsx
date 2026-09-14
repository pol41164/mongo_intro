import type { Metadata } from "next";
import Link from "next/link";
import { ParallaxImage, Reveal } from "../components/Parallax";

export const metadata: Metadata = {
  title: "部落格 | 日光芒果",
  description: "關於芒果挑選、風土與保存的小知識,來自日光芒果果園。",
};

const posts = [
  {
    slug: "how-to-pick",
    tag: "挑選指南",
    date: "2026.05.12",
    title: "芒果怎麼挑?看、摸、聞三步驟",
    image: "/images/mango-whole.jpg",
    excerpt:
      "市場上芒果品種琳瑯滿目,到底該怎麼挑才不會踩雷?其實只要掌握「看、摸、聞」三個步驟,新手也能挑出又香又甜的完熟芒果。",
    paragraphs: [
      "第一步是「看」。成熟的芒果表皮會呈現飽滿而均勻的色澤,愛文芒果轉紅、金煌芒果轉金黃,表皮出現細密的果點也是完熟的訊號。避免挑選表皮大片凹陷、發黑或有裂痕的果實,這通常代表已經碰傷或開始腐壞。",
      "第二步是「摸」。用手掌輕輕包住芒果、以指腹微微施力,完熟的芒果會有恰到好處的彈性,像是輕壓成熟酪梨的手感;如果硬得像石頭,代表還需要幾天追熟,若已經軟爛出水則表示過熟了。",
      "第三步是「聞」。靠近蒂頭聞聞看,完熟芒果會散發濃郁自然的果香;如果幾乎聞不到香氣,通常是還未熟成,可以放在室溫下等待兩三天再享用。",
    ],
  },
  {
    slug: "terroir",
    tag: "產地風土",
    date: "2026.06.03",
    title: "產地風土:為什麼台灣芒果特別甜",
    image: "/images/mango-tree.jpg",
    excerpt:
      "同樣是芒果,台灣南部產區種出的果實卻總是特別香甜多汁。答案藏在日照、土壤與日夜溫差裡。",
    paragraphs: [
      "台灣芒果主要產區集中在台南玉井、高雄六龜與屏東枋山一帶,這些地區夏季日照充足、雨量適中,讓芒果有足夠的光合作用累積糖分。",
      "丘陵地形帶來的日夜溫差,則是甜度的關鍵推手——白天高溫促進養分合成,夜晚涼爽減緩呼吸作用消耗,糖分因此得以留在果肉裡,吃起來自然更加濃郁香甜。",
      "此外,台灣果農長年累積的疏果、套袋與採收經驗,也讓每一顆芒果都能在最適合的時機採收,從產地到餐桌保留住最完整的風味。",
    ],
  },
  {
    slug: "storage",
    tag: "保存知識",
    date: "2026.06.20",
    title: "芒果保存與追熟:從冰箱到餐桌的正確方式",
    image: "/images/mango-sliced.jpg",
    excerpt:
      "剛到貨的芒果偏硬是正常現象,掌握正確的追熟與保存方式,才能吃到風味最完整的那一口。",
    paragraphs: [
      "若收到的芒果還偏硬,建議先放在室溫、避免陽光直射的地方追熟,通常 2–4 天即可轉軟。想加速追熟,可以和香蕉或蘋果一起放進紙袋,利用它們釋放的乙烯氣體幫忙催熟。",
      "完熟後如果還沒有要馬上吃,可以移入冷藏保存,並盡量在 3–5 天內享用完畢,以維持最佳的香氣與口感。",
      "如果一次買太多吃不完,也可以去皮切塊後冷凍保存,做成芒果冰沙、芒果冰或加進優格裡,是炎炎夏日消暑的好選擇。",
    ],
  },
];

export default function BlogPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <Reveal className="mb-14 border-b border-line pb-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Journal
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            部落格
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-ink-soft">
            關於芒果挑選、產地風土與保存方式的小知識,來自日光芒果果園的第一線分享。
          </p>
        </Reveal>

        <div className="flex flex-col gap-20 sm:gap-24">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90}>
              <article className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
                <ParallaxImage
                  src={post.image}
                  alt={post.title}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="relative aspect-[16/11] overflow-hidden border border-line"
                  imgClassName="object-cover"
                  speed={14}
                />
                <div>
                  <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
                    <span className="text-accent">{post.tag}</span>
                    <span className="text-line">|</span>
                    <span>{post.date}</span>
                  </p>
                  <h2 className="mt-3 font-display text-2xl text-ink sm:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-ink-soft">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 max-w-lg space-y-4 text-sm leading-7 text-ink-soft">
                    {post.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 border-t border-line pt-8">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.2em] text-ink transition hover:text-accent"
          >
            ← 回首頁
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
