import { createFileRoute } from "@tanstack/react-router";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

// CASE ON — videos
import vAcidentes from "@/assets/portfolio/caseon-acidentes-clubes.mp4.asset.json";
import pAcidentes from "@/assets/portfolio/caseon-acidentes-clubes.jpg.asset.json";
import vBB from "@/assets/portfolio/caseon-bb-segasp.mp4.asset.json";
import pBB from "@/assets/portfolio/caseon-bb-segasp.jpg.asset.json";
import vMotion from "@/assets/portfolio/caseon-motion-tracking.mp4.asset.json";
import pMotion from "@/assets/portfolio/caseon-motion-tracking.jpg.asset.json";
import vNicolau from "@/assets/portfolio/caseon-tv-nicolau-verao.mp4.asset.json";
import pNicolau from "@/assets/portfolio/caseon-tv-nicolau-verao.jpg.asset.json";
import vUntitled from "@/assets/portfolio/caseon-untitled.mp4.asset.json";
import pUntitled from "@/assets/portfolio/caseon-untitled.jpg.asset.json";
// CASE ON — images
import iInstitucional from "@/assets/portfolio/caseon-institucional.webp.asset.json";
import iAlinhamento from "@/assets/portfolio/caseon-alinhamento-balanceamento.webp.asset.json";
import iSocial1 from "@/assets/portfolio/caseon-social-1.webp.asset.json";
import iSocial2 from "@/assets/portfolio/caseon-social-2.webp.asset.json";
import iSocial3 from "@/assets/portfolio/caseon-social-3.webp.asset.json";
import iSocial4 from "@/assets/portfolio/caseon-social-4.webp.asset.json";
import iSocial5 from "@/assets/portfolio/caseon-social-5.webp.asset.json";
// Landi Turbina
import iBarulhentosF from "@/assets/portfolio/landi-camiseta-barulhentos-frente.webp.asset.json";
import iBarulhentosC from "@/assets/portfolio/landi-camiseta-barulhentos-costas.webp.asset.json";
import iSw4 from "@/assets/portfolio/landi-camiseta-sw4-costas.webp.asset.json";
import iFusca from "@/assets/portfolio/landi-camiseta-fusca-catequese.webp.asset.json";
import iF250F from "@/assets/portfolio/landi-camiseta-f250-frente.webp.asset.json";
import iF250C from "@/assets/portfolio/landi-camiseta-f250-costas.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gabriel Tinti — Portfólio Editorial de Direção Criativa" },
      {
        name: "description",
        content:
          "Portfólio editorial de Gabriel Tinti. Edição de vídeo, motion, design e direção criativa — trabalhos em 16:9, 9:16, 1:1 e 1080×1350.",
      },
      { property: "og:title", content: "Gabriel Tinti — Portfólio Editorial" },
      {
        property: "og:description",
        content:
          "Uma seleção editorial de VTs, motion e design por Gabriel Tinti — sócio-fundador da Agência Gama.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

/* ---------- Data ---------- */

type Ratio = "16:9" | "9:16" | "1:1" | "4:5";
type Media =
  | { kind: "video"; src: string; poster: string }
  | { kind: "image"; src: string };

type Work = {
  id: string;
  title: string;
  client: string;
  year: string;
  ratio: Ratio;
  tag: string;
  description: string;
  media: Media;
};

const WORKS: Work[] = [
  {
    id: "acidentes",
    title: "Acidentes em Clubes",
    client: "CASE ON",
    year: "2025",
    ratio: "16:9",
    tag: "VT · Social",
    description:
      "Edição narrativa com cortes rítmicos e sound design, priorizando ritmo de consumo em feed.",
    media: { kind: "video", src: vAcidentes.url, poster: pAcidentes.url },
  },
  {
    id: "bb-segasp",
    title: "Aniversário BB Segasp",
    client: "CASE ON",
    year: "2025",
    ratio: "9:16",
    tag: "Motion · Reels",
    description:
      "Peça motion vertical para redes sociais — cinética tipográfica e transições contínuas.",
    media: { kind: "video", src: vBB.url, poster: pBB.url },
  },
  {
    id: "nicolau",
    title: "TV Nicolau · Verão",
    client: "CASE ON",
    year: "2025",
    ratio: "9:16",
    tag: "VT · TV",
    description:
      "Comercial de campanha sazonal com foco em direção de arte e finalização de cor.",
    media: { kind: "video", src: vNicolau.url, poster: pNicolau.url },
  },
  {
    id: "motion",
    title: "Motion Tracking · Callouts",
    client: "CASE ON",
    year: "2024",
    ratio: "16:9",
    tag: "After Effects",
    description:
      "Callouts com rastreamento 3D e composição no After Effects para reforço de informação.",
    media: { kind: "video", src: vMotion.url, poster: pMotion.url },
  },
  {
    id: "untitled",
    title: "Untitled · Cut",
    client: "CASE ON",
    year: "2024",
    ratio: "9:16",
    tag: "Reels",
    description:
      "Corte experimental — exercício de ritmo, camadas de áudio e transições invisíveis.",
    media: { kind: "video", src: vUntitled.url, poster: pUntitled.url },
  },
  {
    id: "institucional",
    title: "Institucional",
    client: "CASE ON",
    year: "2024",
    ratio: "1:1",
    tag: "Design",
    description:
      "Peça institucional com tratamento tipográfico editorial e paleta calibrada em Lightroom.",
    media: { kind: "image", src: iInstitucional.url },
  },
  {
    id: "alinhamento",
    title: "Alinhamento & Balanceamento",
    client: "CASE ON",
    year: "2024",
    ratio: "1:1",
    tag: "Feed",
    description: "Post de feed com hierarquia clara e composição centralizada.",
    media: { kind: "image", src: iAlinhamento.url },
  },
  {
    id: "s1",
    title: "Feed · Série 01",
    client: "CASE ON",
    year: "2024",
    ratio: "1:1",
    tag: "Feed",
    description: "Peça de série editorial para grid do Instagram.",
    media: { kind: "image", src: iSocial1.url },
  },
  {
    id: "s2",
    title: "Feed · Série 02",
    client: "CASE ON",
    year: "2024",
    ratio: "1:1",
    tag: "Feed",
    description: "Peça de série editorial para grid do Instagram.",
    media: { kind: "image", src: iSocial2.url },
  },
  {
    id: "s3",
    title: "Feed · Série 03",
    client: "CASE ON",
    year: "2024",
    ratio: "1:1",
    tag: "Feed",
    description: "Peça de série editorial para grid do Instagram.",
    media: { kind: "image", src: iSocial3.url },
  },
  {
    id: "s4",
    title: "Feed · Série 04",
    client: "CASE ON",
    year: "2024",
    ratio: "1:1",
    tag: "Feed",
    description: "Peça de série editorial para grid do Instagram.",
    media: { kind: "image", src: iSocial4.url },
  },
  {
    id: "s5",
    title: "Feed · Série 05",
    client: "CASE ON",
    year: "2024",
    ratio: "1:1",
    tag: "Feed",
    description: "Peça de série editorial para grid do Instagram.",
    media: { kind: "image", src: iSocial5.url },
  },
  {
    id: "barul-f",
    title: "Barulhentos · Frente",
    client: "Landi Turbina",
    year: "2025",
    ratio: "9:16",
    tag: "Estampa",
    description:
      "Ilustração e composição tipográfica para estampa de camiseta da série Barulhentos.",
    media: { kind: "image", src: iBarulhentosF.url },
  },
  {
    id: "barul-c",
    title: "Barulhentos · Costas",
    client: "Landi Turbina",
    year: "2025",
    ratio: "9:16",
    tag: "Estampa",
    description: "Verso da camiseta Barulhentos, com hierarquia tipográfica.",
    media: { kind: "image", src: iBarulhentosC.url },
  },
  {
    id: "sw4",
    title: "SW4 · Estampa",
    client: "Landi Turbina",
    year: "2025",
    ratio: "9:16",
    tag: "Estampa",
    description: "Estampa para linha SW4 — traço técnico e composição centralizada.",
    media: { kind: "image", src: iSw4.url },
  },
  {
    id: "fusca",
    title: "Fusca · Catequese",
    client: "Landi Turbina",
    year: "2024",
    ratio: "9:16",
    tag: "Estampa",
    description: "Estampa temática — ilustração vetorial e paleta terra.",
    media: { kind: "image", src: iFusca.url },
  },
  {
    id: "f250-f",
    title: "F-250 · Frente",
    client: "Landi Turbina",
    year: "2025",
    ratio: "9:16",
    tag: "Estampa",
    description: "Estampa da linha F-250, frente da peça.",
    media: { kind: "image", src: iF250F.url },
  },
  {
    id: "f250-c",
    title: "F-250 · Costas",
    client: "Landi Turbina",
    year: "2025",
    ratio: "9:16",
    tag: "Estampa",
    description: "Verso da peça F-250 — composição com hierarquia tipográfica.",
    media: { kind: "image", src: iF250C.url },
  },
];

const TIMELINE = [
  {
    period: "jun 2026 — atual",
    role: "Diretor Executivo",
    org: "Agência Gama Comunicação",
    quote:
      "Sócio-fundador. Direção criativa e executiva — estratégia de marca, planejamento de conteúdo e liderança do time de criação, do briefing à entrega.",
  },
  {
    period: "jul 2026 — atual",
    role: "Editor de Vídeo & Conteúdo",
    org: "CASE ON",
    quote:
      "Edição de vídeo como papel principal — VTs para redes sociais e TV, motion tracking, callouts e finalização. Também assumo captação, gravação e tratamento em Photoshop e Lightroom. Fluxo completo Adobe: Premiere, After Effects, Photoshop e Lightroom.",
  },
  {
    period: "dez 2024 — jun 2026",
    role: "Designer Gráfico & Desenvolvedor",
    org: "Landi Turbina",
    quote:
      "Criação de artes, identidade e estampas para linhas de camisetas. Desenvolvi sistemas internos hoje em produção — gerador de SKUs e sistema de RH — reduzindo trabalho manual do time.",
  },
  {
    period: "mar 2024 — jun 2026",
    role: "Marketing & Design",
    org: "Landi Turbina",
    quote:
      "Campanhas, materiais de comunicação e apoio criativo ao time de marketing.",
  },
  {
    period: "set 2022 — mar 2024",
    role: "Editor de Vídeo & Graphic Designer",
    org: "CASE ON",
    quote:
      "Edição de VTs para social e TV, motion graphics, peças de feed e identidade — suíte Adobe completa.",
  },
  {
    period: "mar 2022 — set 2022",
    role: "Designer Gráfico",
    org: "GPmais Assessoria de Marketing",
    quote: "Estágio remoto — peças de feed, identidade e apoio às contas da agência.",
  },
];

/* ---------- Hooks ---------- */

function useReveal<T extends HTMLElement>(threshold = 0.14) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

// Lerp-based smooth scroll indicator + expose global scroll progress as CSS var
function useScrollProgress() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const p = Math.min(1, Math.max(0, h.scrollTop / (h.scrollHeight - h.clientHeight)));
      document.documentElement.style.setProperty("--scroll-p", String(p));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

// Parallax on element based on viewport position
function useParallax<T extends HTMLElement>(strength = 0.08) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = r.top + r.height / 2;
      const delta = (center - vh / 2) / vh; // -1..1
      el.style.setProperty("--pll", String(-delta * strength * 100));
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);
  return ref;
}

/* ---------- Nav ---------- */

function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        solid ? "w-[min(94%,780px)]" : "w-[min(94%,880px)]"
      }`}
    >
      <div
        className={`glass-strong rounded-full px-4 sm:px-6 py-2.5 grid grid-cols-[minmax(0,1fr)_auto] sm:flex items-center justify-between gap-3 transition-all ${
          solid ? "shadow-[var(--shadow-lift)]" : ""
        }`}
      >
        <a href="#top" className="font-display text-lg sm:text-xl truncate">
          Gabriel <span className="italic text-gradient">Tinti</span>
        </a>
        <div className="hidden md:flex items-center gap-7 text-[13px] text-muted-foreground">
          <a href="#work" className="link-underline hover:text-foreground transition">Trabalhos</a>
          <a href="#journey" className="link-underline hover:text-foreground transition">Trajetória</a>
          <a href="#contact" className="link-underline hover:text-foreground transition">Contato</a>
        </div>
        <a
          href="https://wa.me/5500000000000"
          className="shrink-0 text-[12px] sm:text-[13px] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-foreground text-primary-foreground hover:bg-brand transition-colors"
        >
          Falar
        </a>
      </div>
    </nav>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section
      id="top"
      className="grain relative min-h-[100svh] flex flex-col justify-end pt-32 pb-16 overflow-hidden"
      style={{ background: "var(--gradient-warm)" } as CSSProperties}
    >
      <div className="mx-auto max-w-[1400px] px-6 w-full">
        <div className="flex items-center gap-3 mb-8 text-[11px] tracking-[0.35em] uppercase text-muted-foreground">
          <span className="inline-block w-8 h-px bg-foreground/30" />
          <span>Portfólio Editorial · 2026</span>
        </div>

        <h1 className="font-display text-[clamp(3.2rem,13vw,14rem)] leading-[0.88] tracking-[-0.04em]">
          Gabriel
          <br />
          <span className="italic font-normal text-gradient">Tinti.</span>
        </h1>

        <div className="mt-14 grid md:grid-cols-[1.5fr_auto] gap-10 items-end">
          <p className="text-[17px] md:text-xl leading-relaxed text-foreground/75 max-w-2xl font-light">
            Diretor criativo, editor de vídeo e designer. Uma seleção editorial
            de trabalhos em <em className="font-display italic">16:9</em>,{" "}
            <em className="font-display italic">9:16</em>,{" "}
            <em className="font-display italic">1:1</em> e{" "}
            <em className="font-display italic">1080×1350</em> — do longo ao vertical,
            do estático ao motion.
          </p>
          <a
            href="#work"
            className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-foreground/70 hover:text-foreground transition-colors"
          >
            <span>Ver seleção</span>
            <span className="relative block w-12 h-px bg-foreground/30 overflow-hidden">
              <span className="absolute inset-0 bg-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </span>
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-muted-foreground flex flex-col items-center gap-2">
        <span>Scroll</span>
        <span className="block w-px h-8 bg-gradient-to-b from-foreground/40 to-transparent" />
      </div>
    </section>
  );
}

/* ---------- Marquee de disciplinas ---------- */

function DisciplineStrip() {
  const items = [
    "Direção Criativa",
    "Edição de Vídeo",
    "Motion Design",
    "Captação & Fotografia",
    "Tratamento em Lightroom",
    "After Effects",
    "Premiere Pro",
    "Photoshop",
    "Identidade Visual",
    "Design para Redes",
  ];
  const doubled = [...items, ...items];
  return (
    <section className="border-y border-border/60 py-6 overflow-hidden">
      <div className="marquee-track font-display text-2xl md:text-4xl text-foreground/70 whitespace-nowrap">
        {doubled.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-12">
            <span className="italic">{s}</span>
            <span className="text-brand">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- Card de trabalho ---------- */

function WorkCard({
  work,
  size,
  onOpen,
}: {
  work: Work;
  size: "sm" | "md" | "lg" | "wide";
  onOpen: (id: string) => void;
}) {
  const ref = useReveal<HTMLElement>();
  const mediaRef = useParallax<HTMLDivElement>(0.06);
  const vRef = useRef<HTMLVideoElement | null>(null);

  const aspect =
    work.ratio === "16:9" ? "aspect-video"
    : work.ratio === "9:16" ? "aspect-[9/16]"
    : work.ratio === "4:5" ? "aspect-[4/5]"
    : "aspect-square";

  const colSpan =
    size === "wide" ? "md:col-span-12"
    : size === "lg" ? "md:col-span-8"
    : size === "md" ? "md:col-span-6"
    : "md:col-span-4";

  return (
    <article
      ref={ref}
      className={`fade-up col-span-12 ${colSpan}`}
    >
      <button
        type="button"
        onClick={() => onOpen(work.id)}
        className="group block w-full text-left"
      >
        <div className={`media-frame card-lift ${aspect}`}>
          <div
            ref={mediaRef}
            className="absolute inset-0"
            style={{ transform: "translate3d(0, calc(var(--pll,0) * 1%), 0)" }}
          >
            {work.media.kind === "video" ? (
              <video
                ref={vRef}
                className="absolute inset-0 w-full h-full object-cover"
                src={work.media.src}
                poster={work.media.poster}
                muted
                loop
                playsInline
                preload="none"
                onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
            ) : (
              <img
                src={work.media.src}
                alt={`${work.title} — ${work.client}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>

          {/* Ratio + play badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="font-mono-tag text-[10px] px-2 py-1 rounded-full glass text-foreground/80">
              {work.ratio}
            </span>
            {work.media.kind === "video" && (
              <span className="font-mono-tag text-[10px] px-2 py-1 rounded-full glass text-foreground/80 inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" /> VT
              </span>
            )}
          </div>

          {/* Glass info panel on hover */}
          <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="glass rounded-2xl px-4 py-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="min-w-0">
                <p className="font-display text-lg leading-tight truncate">{work.title}</p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest">
                  {work.client} · {work.year}
                </p>
              </div>
              <span className="shrink-0 grid place-items-center w-9 h-9 rounded-full bg-foreground text-primary-foreground">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Meta strip below */}
        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-baseline">
          <div className="min-w-0">
            <h3 className="font-display text-xl md:text-2xl leading-tight truncate">
              {work.title}
            </h3>
            <p className="text-[12px] text-muted-foreground mt-0.5 truncate">
              {work.client} · <span className="font-mono-tag">{work.tag}</span>
            </p>
          </div>
          <span className="font-mono-tag text-[11px] text-muted-foreground shrink-0">
            {work.year}
          </span>
        </div>
      </button>
    </article>
  );
}

/* ---------- Grid de trabalhos ---------- */

function Works({ onOpen }: { onOpen: (id: string) => void }) {
  // Asymmetric editorial rhythm
  const layout: Array<"sm" | "md" | "lg" | "wide"> = [
    "lg", "md", "md", "sm", "sm", "md",
    "wide",
    "md", "md", "sm", "sm", "sm", "sm",
    "lg", "md",
    "sm", "sm", "sm",
  ];

  return (
    <section id="work" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6">
        <header className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-end mb-16 md:mb-24">
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground mb-4">
              § 01 · Seleção
            </p>
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95]">
              Trabalhos<br />
              <span className="italic text-gradient">selecionados</span>
            </h2>
          </div>
          <p className="text-foreground/70 text-lg leading-relaxed max-w-md md:ml-auto md:text-right font-light">
            Uma amostra editorial do que produzo — VTs, motion, cortes verticais,
            peças estáticas e estampas — para marcas, canais e séries.
          </p>
        </header>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {WORKS.map((w, i) => (
            <WorkCard key={w.id} work={w} size={layout[i % layout.length]} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Timeline com linha desenhada ---------- */

function Journey() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = r.top - vh * 0.5;
      const total = r.height - vh * 0.2;
      const p = Math.min(1, Math.max(0, -start / total));
      track.style.setProperty("--tl-progress", String(p));
      raf = 0;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  return (
    <section id="journey" className="py-24 md:py-36 border-t border-border/60">
      <div className="mx-auto max-w-[1400px] px-6">
        <header className="mb-16 md:mb-24 max-w-3xl">
          <p className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground mb-4">
            § 02 · Trajetória
          </p>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95]">
            De estagiário<br />à <span className="italic text-gradient">sócio-fundador</span>.
          </h2>
          <p className="mt-8 text-foreground/70 text-lg leading-relaxed font-light">
            Quatro anos entre agência, indústria e criação autoral — capítulos de uma
            trajetória que hoje se concentra em direção criativa e edição de vídeo.
          </p>
        </header>

        <div ref={wrapRef} className="relative pl-8 md:pl-0">
          {/* Line: mobile → left margin, desktop → center */}
          <div
            ref={trackRef}
            className="tl-track left-2 md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-14 md:space-y-24">
            {TIMELINE.map((t, i) => (
              <JourneyItem key={i} item={t} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function JourneyItem({
  item,
  index,
}: {
  item: (typeof TIMELINE)[number];
  index: number;
}) {
  const ref = useReveal<HTMLLIElement>(0.2);
  const isLeft = index % 2 === 0;

  return (
    <li ref={ref} className="fade-up relative">
      {/* Node */}
      <span className="absolute left-2 md:left-1/2 top-2 -translate-x-1/2 z-10">
        <span className="block w-3.5 h-3.5 rounded-full bg-brand shadow-[0_0_0_6px_color-mix(in_oklab,var(--brand)_18%,transparent)]" />
      </span>

      <div
        className={`pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-16 ${
          isLeft ? "" : "md:[&>*:first-child]:col-start-2"
        }`}
      >
        <div className={`${isLeft ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
          <div className="glass rounded-2xl p-6 md:p-8 card-lift">
            <p className="font-mono-tag text-[11px] uppercase tracking-widest text-muted-foreground">
              {item.period}
            </p>
            <h3 className="font-display text-2xl md:text-4xl mt-2 leading-tight">
              {item.role}
            </h3>
            <p className="text-sm text-foreground/60 mt-1">{item.org}</p>
            <blockquote
              className={`mt-5 font-display italic text-lg md:text-xl leading-[1.55] text-foreground/85 relative ${
                isLeft ? "md:border-r-2 md:pr-4" : "md:border-l-2 md:pl-4"
              } border-brand/50`}
            >
              {item.quote}
            </blockquote>
          </div>
        </div>
      </div>
    </li>
  );
}

/* ---------- Sobre ---------- */

function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="py-24 md:py-32 border-t border-border/60">
      <div ref={ref} className="fade-up mx-auto max-w-[1400px] px-6 grid md:grid-cols-[auto_1fr] gap-12 md:gap-20 items-start">
        <div className="flex md:block gap-6 items-start">
          <div className="relative shrink-0">
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-accent to-secondary border border-border shadow-[var(--shadow-float)] grid place-items-center overflow-hidden">
              <span className="font-display text-4xl md:text-6xl text-foreground/40">GT</span>
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 md:w-8 md:h-8 rounded-full bg-brand border-4 border-background" />
          </div>
          <div className="md:mt-6">
            <p className="font-display text-2xl md:text-3xl">Gabriel Tinti</p>
            <p className="text-sm text-muted-foreground">Avaré, São Paulo · Brasil</p>
          </div>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground mb-4">
            § 03 · Sobre
          </p>
          <p className="font-display text-3xl md:text-5xl leading-[1.15] text-foreground/90">
            Faço vídeo como quem escreve um parágrafo —{" "}
            <span className="italic text-gradient">ritmo, hierarquia e respiro</span>{" "}
            em cada corte.
          </p>
          <p className="mt-8 text-foreground/70 text-lg leading-relaxed font-light max-w-2xl">
            Trabalho na intersecção entre edição, motion e design. Uso a suíte
            Adobe completa e programo quando o problema pede software.
            Como sócio-fundador da Agência Gama, dirijo criação e resultado.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contato ---------- */

function Contact() {
  return (
    <section
      id="contact"
      className="grain relative py-32 md:py-48 border-t border-border/60 overflow-hidden"
      style={{ background: "var(--gradient-warm)" } as CSSProperties}
    >
      <div className="mx-auto max-w-[1400px] px-6 text-center">
        <p className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground mb-8">
          § 04 · Vamos criar
        </p>
        <h2 className="font-display text-[clamp(3rem,11vw,10rem)] leading-[0.9] tracking-[-0.03em]">
          Tem um<br />
          <span className="italic text-gradient">projeto</span> em mente?
        </h2>
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/5500000000000"
            className="px-8 py-4 rounded-full bg-foreground text-primary-foreground text-[12px] uppercase tracking-[0.3em] hover:bg-brand transition-colors"
          >
            Chamar no WhatsApp
          </a>
          <a
            href="mailto:contato@agenciagama.com"
            className="px-8 py-4 rounded-full glass text-[12px] uppercase tracking-[0.3em] text-foreground hover:bg-white transition-colors"
          >
            Enviar e-mail
          </a>
        </div>
        <p className="mt-20 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} · Gabriel Tinti · Agência Gama Comunicação
        </p>
      </div>
    </section>
  );
}

/* ---------- Theater modal (FLIP-ish) ---------- */

function Theater({
  work,
  onClose,
}: {
  work: Work | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!work) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [work, onClose]);

  if (!work) return null;

  const frameAspect =
    work.ratio === "16:9" ? "aspect-video max-w-[92vw] md:max-w-[80vw]"
    : work.ratio === "9:16" ? "aspect-[9/16] max-h-[85vh] max-w-[min(92vw,50vh)]"
    : work.ratio === "4:5" ? "aspect-[4/5] max-h-[85vh]"
    : "aspect-square max-w-[min(92vw,70vh)]";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10 backdrop-in"
      style={{ background: "color-mix(in oklab, var(--paper) 60%, transparent)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-in relative w-full max-w-6xl grid md:grid-cols-[1fr_320px] gap-6 md:gap-10 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`media-frame mx-auto w-full ${frameAspect}`}>
          {work.media.kind === "video" ? (
            <video
              className="absolute inset-0 w-full h-full object-contain bg-black/5"
              src={work.media.src}
              poster={work.media.poster}
              controls
              autoPlay
              loop
              playsInline
            />
          ) : (
            <img
              src={work.media.src}
              alt={`${work.title} — ${work.client}`}
              className="absolute inset-0 w-full h-full object-contain"
            />
          )}
        </div>

        <aside className="glass-strong rounded-2xl p-6 md:p-7">
          <p className="font-mono-tag text-[10px] uppercase tracking-widest text-muted-foreground">
            {work.client} · {work.year}
          </p>
          <h3 className="font-display text-3xl md:text-4xl mt-2 leading-tight">
            {work.title}
          </h3>
          <div className="mt-4 flex gap-2 flex-wrap">
            <span className="font-mono-tag text-[10px] px-2 py-1 rounded-full bg-foreground/5 text-foreground/70">
              {work.ratio}
            </span>
            <span className="font-mono-tag text-[10px] px-2 py-1 rounded-full bg-foreground/5 text-foreground/70">
              {work.tag}
            </span>
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-foreground/75 font-light">
            {work.description}
          </p>
          <button
            onClick={onClose}
            className="mt-6 w-full text-[11px] uppercase tracking-[0.3em] px-4 py-3 rounded-full bg-foreground text-primary-foreground hover:bg-brand transition-colors"
          >
            Fechar
          </button>
        </aside>

        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute -top-3 -right-3 md:top-4 md:right-4 grid place-items-center w-10 h-10 rounded-full glass-strong text-foreground hover:bg-white transition"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ---------- FAB WhatsApp ---------- */

function WhatsAppFab() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 2400);
    }, 12000);
    return () => clearInterval(id);
  }, []);
  return (
    <a
      href="https://wa.me/5500000000000"
      aria-label="Falar no WhatsApp"
      className={`fixed bottom-5 right-5 z-50 grid place-items-center w-14 h-14 rounded-full bg-brand text-primary-foreground shadow-[var(--shadow-glow)] hover:scale-105 transition-transform ${pulse ? "fab-pulse" : ""}`}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
      </svg>
    </a>
  );
}

/* ---------- Progress bar ---------- */

function ScrollBar() {
  return (
    <div
      className="fixed top-0 left-0 z-[70] h-[2px] w-full origin-left bg-brand"
      style={{ transform: "scaleX(var(--scroll-p, 0))" }}
    />
  );
}

/* ---------- Page ---------- */

function Portfolio() {
  useScrollProgress();
  const [openId, setOpenId] = useState<string | null>(null);
  const openWork = useMemo(
    () => WORKS.find((w) => w.id === openId) ?? null,
    [openId],
  );
  const handleOpen = useCallback((id: string) => setOpenId(id), []);
  const handleClose = useCallback(() => setOpenId(null), []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollBar />
      <Nav />
      <Hero />
      <DisciplineStrip />
      <Works onOpen={handleOpen} />
      <Journey />
      <About />
      <Contact />
      <WhatsAppFab />
      <Theater work={openWork} onClose={handleClose} />
    </div>
  );
}
