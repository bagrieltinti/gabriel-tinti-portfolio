import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";

// CASE ON — videos
import vAcidentes from "@/assets/portfolio/caseon-acidentes-clubes.mp4.asset.json";
import pAcidentes from "@/assets/portfolio/caseon-acidentes-clubes.jpg.asset.json";
import vBB from "@/assets/portfolio/caseon-bb-segasp.mp4.asset.json";
import pBB from "@/assets/portfolio/caseon-bb-segasp.jpg.asset.json";
import vMotion from "@/assets/portfolio/caseon-motion-tracking.mp4.asset.json";
import pMotion from "@/assets/portfolio/caseon-motion-tracking.jpg.asset.json";

import vRender from "@/assets/portfolio/caseon-render.mp4.asset.json";
import pRender from "@/assets/portfolio/caseon-render.jpg.asset.json";
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
// Landi Turbina — estampas
import iBarulhentosF from "@/assets/portfolio/landi-camiseta-barulhentos-frente.webp.asset.json";
import iBarulhentosC from "@/assets/portfolio/landi-camiseta-barulhentos-costas.webp.asset.json";
import iSw4 from "@/assets/portfolio/landi-camiseta-sw4-costas.webp.asset.json";
import iFusca from "@/assets/portfolio/landi-camiseta-fusca-catequese.webp.asset.json";
import iF250F from "@/assets/portfolio/landi-camiseta-f250-frente.webp.asset.json";
import iF250C from "@/assets/portfolio/landi-camiseta-f250-costas.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gabriel Tinti — Diretor Criativo & Editor Audiovisual" },
      {
        name: "description",
        content:
          "Portfólio criativo de Gabriel Tinti — sócio-fundador da Agência Gama Comunicação. Edição de vídeo, direção criativa e design gráfico em 16:9, 9:16 e 1:1.",
      },
      { property: "og:title", content: "Gabriel Tinti — Portfólio Criativo" },
      {
        property: "og:description",
        content:
          "Edição de vídeo, motion e design gráfico. Trabalhos em 16:9, 9:16 e 1:1.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

/* ---------- Data ---------- */

type Ratio = "16:9" | "9:16" | "1:1";
type Media =
  | { kind: "video"; src: string; poster: string }
  | { kind: "image"; src: string };

type Work = {
  title: string;
  client: string;
  ratio: Ratio;
  tag: string;
  media: Media;
};

const WORKS: Work[] = [
  { title: "Acidentes em clubes", client: "CASE ON", ratio: "16:9", tag: "VT · Social",
    media: { kind: "video", src: vAcidentes.url, poster: pAcidentes.url } },
  { title: "Aniversário BB SEGASP", client: "CASE ON", ratio: "9:16", tag: "Motion",
    media: { kind: "video", src: vBB.url, poster: pBB.url } },
  { title: "Alinhamento & Balanceamento", client: "CASE ON", ratio: "1:1", tag: "Feed",
    media: { kind: "image", src: iAlinhamento.url } },
  { title: "TV Nicolau · Verão", client: "CASE ON", ratio: "9:16", tag: "VT TV",
    media: { kind: "video", src: vNicolau.url, poster: pNicolau.url } },
  { title: "Motion Tracking · Callouts", client: "CASE ON", ratio: "16:9", tag: "After Effects",
    media: { kind: "video", src: vMotion.url, poster: pMotion.url } },
  { title: "Institucional", client: "CASE ON", ratio: "1:1", tag: "Design",
    media: { kind: "image", src: iInstitucional.url } },
  { title: "Camiseta · Barulhentos", client: "Landi Turbina", ratio: "9:16", tag: "Estampa",
    media: { kind: "image", src: iBarulhentosF.url } },
  { title: "Camiseta · Fusca / Catequese", client: "Landi Turbina", ratio: "9:16", tag: "Estampa",
    media: { kind: "image", src: iFusca.url } },
  { title: "Social · Post", client: "CASE ON", ratio: "16:9", tag: "Feed",
    media: { kind: "image", src: iInstitucional.url } },

  { title: "Camiseta · SW4", client: "Landi Turbina", ratio: "1:1", tag: "Estampa",
    media: { kind: "image", src: iSw4.url } },
  { title: "Social · Post", client: "CASE ON", ratio: "1:1", tag: "Feed",
    media: { kind: "image", src: iSocial1.url } },
  { title: "Barulhentos · Costas", client: "Landi Turbina", ratio: "1:1", tag: "Estampa",
    media: { kind: "image", src: iBarulhentosC.url } },
  { title: "Social · Post", client: "CASE ON", ratio: "1:1", tag: "Feed",
    media: { kind: "image", src: iSocial2.url } },
  { title: "Untitled · Cut", client: "CASE ON", ratio: "9:16", tag: "Reels",
    media: { kind: "video", src: vUntitled.url, poster: pUntitled.url } },
  { title: "Social · Post", client: "CASE ON", ratio: "1:1", tag: "Feed",
    media: { kind: "image", src: iSocial3.url } },
  { title: "Camiseta · F-250 Frente", client: "Landi Turbina", ratio: "1:1", tag: "Estampa",
    media: { kind: "image", src: iF250F.url } },
  { title: "Social · Post", client: "CASE ON", ratio: "1:1", tag: "Feed",
    media: { kind: "image", src: iSocial4.url } },
  { title: "Camiseta · F-250 Costas", client: "Landi Turbina", ratio: "1:1", tag: "Estampa",
    media: { kind: "image", src: iF250C.url } },
  { title: "Social · Post", client: "CASE ON", ratio: "1:1", tag: "Feed",
    media: { kind: "image", src: iSocial5.url } },
];

const TIMELINE = [
  {
    period: "jun 2026 — atual",
    role: "Diretor Executivo",
    org: "Agência Gama Comunicação",
    note: "Sócio-fundador. Direção criativa e executiva da agência: estratégia de marca, planejamento de conteúdo, comercial e liderança do time de criação. Do briefing à entrega — com foco em resultado e presença digital.",
  },
  {
    period: "jul 2026 — atual",
    role: "Editor de Vídeo & Conteúdo",
    org: "CASE ON",
    note: "Papel principal em edição de vídeo — VTs para redes sociais e TV, motion tracking, callouts e finalização. Também assumo captação, gravação e tratamento de imagem em Photoshop e Lightroom. Fluxo completo Adobe: Premiere, After Effects, Photoshop e Lightroom.",
  },
  {
    period: "dez 2024 — jun 2026",
    role: "Designer Gráfico & Dev",
    org: "Landi Turbina",
    note: "Criação de artes, identidade e estampas de camiseta para eventos e séries (Barulhentos, Fusca, SW4, F-250). Programei sistemas internos hoje em produção — gerador de SKUs e sistema de RH — reduzindo trabalho manual do time.",
  },
  {
    period: "mar 2024 — jun 2026",
    role: "Marketing & Design",
    org: "Landi Turbina",
    note: "Atuação em campanhas, materiais de comunicação e apoio criativo ao time de marketing.",
  },
  {
    period: "set 2022 — mar 2024",
    role: "Editor de Vídeo & Graphic Designer",
    org: "CASE ON",
    note: "Edição de VTs para social e TV, motion graphics, peças de feed e identidade. Suíte Adobe completa: Premiere, After Effects, Photoshop e Lightroom.",
  },
  {
    period: "mar 2022 — set 2022",
    role: "Designer Gráfico",
    org: "GPmais Assessoria de Marketing",
    note: "Estágio remoto. Peças de feed, identidade visual e apoio às contas da agência.",
  },
];

/* ---------- Hooks ---------- */

function useReveal<T extends HTMLElement>() {
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
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ---------- Sections ---------- */

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/60 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="#top" className="font-display text-xl">
          Gabriel Tinti<span className="text-gradient">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#work" className="hover:text-foreground transition">Trabalhos</a>
          <a href="#about" className="hover:text-foreground transition">Trajetória</a>
          <a href="#contact" className="hover:text-foreground transition">Contato</a>
        </div>
        <a
          href="https://wa.me/5500000000000"
          className="text-sm px-4 py-2 rounded-full bg-brand text-primary-foreground hover:opacity-90 transition"
        >
          Falar comigo
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const [xy, setXy] = useState({ x: 0, y: 0 });
  return (
    <section
      id="top"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setXy({
          x: ((e.clientX - r.left) / r.width - 0.5) * 20,
          y: ((e.clientY - r.top) / r.height - 0.5) * 20,
        });
      }}
      className="noise-overlay relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden"
      style={{ background: "var(--gradient-radial)" } as CSSProperties}
    >
      <div className="mx-auto max-w-7xl px-6 w-full">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
          Portfólio · 2026
        </p>
        <h1
          className="font-display text-[clamp(3rem,11vw,11rem)] leading-[0.95] tracking-tight"
          style={{ transform: `translate3d(${xy.x}px, ${xy.y}px, 0)`, transition: "transform 300ms ease-out" }}
        >
          Gabriel <span className="italic text-gradient">Tinti</span>
        </h1>
        <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-4xl">
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            Editor de vídeo, diretor criativo e designer. Construindo marcas em movimento
            entre 16:9, 9:16 e 1:1 — do longo ao vertical.
          </p>
          <a
            href="#work"
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-widest"
          >
            <span>Ver trabalhos</span>
            <span className="inline-block w-10 h-px bg-foreground transition-all group-hover:w-16" />
          </a>
        </div>
      </div>
    </section>
  );
}

function MediaLayer({ media, alt }: { media: Media; alt: string }) {
  const vRef = useRef<HTMLVideoElement | null>(null);
  if (media.kind === "video") {
    return (
      <video
        ref={vRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={media.src}
        poster={media.poster}
        muted
        loop
        playsInline
        preload="none"
        onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
        onMouseLeave={(e) => {
          e.currentTarget.pause();
          e.currentTarget.currentTime = 0;
        }}
        aria-label={alt}
      />
    );
  }
  return (
    <img
      src={media.src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

function BentoItem({ work, className }: { work: Work; className: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`bento-item fade-up group ${className}`}>
      <MediaLayer media={work.media} alt={`${work.title} — ${work.client}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-background/70 backdrop-blur border border-border">
          {work.tag}
        </span>
      </div>
      <div className="absolute left-4 right-4 bottom-4 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
        <h3 className="font-display text-xl md:text-2xl leading-tight">{work.title}</h3>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">{work.client}</p>
      </div>
    </div>
  );
}

function Bento() {
  const spans = [
    "md:col-span-3 md:row-span-2 aspect-video",
    "md:col-span-2 md:row-span-3 aspect-[9/16]",
    "md:col-span-1 md:row-span-2 aspect-square",
    "md:col-span-2 md:row-span-3 aspect-[9/16]",
    "md:col-span-2 md:row-span-2 aspect-video",
    "md:col-span-2 md:row-span-2 aspect-square",
    "md:col-span-1 md:row-span-3 aspect-[9/16]",
    "md:col-span-2 md:row-span-3 aspect-[9/16]",
    "md:col-span-3 md:row-span-2 aspect-video",
    "md:col-span-2 md:row-span-2 aspect-square",
    "md:col-span-1 md:row-span-2 aspect-square",
    "md:col-span-2 md:row-span-2 aspect-square",
    "md:col-span-1 md:row-span-2 aspect-square",
    "md:col-span-2 md:row-span-3 aspect-[9/16]",
    "md:col-span-1 md:row-span-2 aspect-square",
    "md:col-span-2 md:row-span-2 aspect-square",
    "md:col-span-1 md:row-span-2 aspect-square",
    "md:col-span-2 md:row-span-2 aspect-square",
    "md:col-span-1 md:row-span-2 aspect-square",
  ];

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Seleção · 2022–2026
            </p>
            <h2 className="font-display text-5xl md:text-7xl leading-none">
              Trabalhos <span className="italic text-gradient">selecionados</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Uma amostra do que produzo entre VTs, motion, cortes verticais e estampas.
          </p>
        </div>

        <div className="bento-grid grid grid-cols-2 md:grid-cols-6 auto-rows-[100px] md:auto-rows-[120px] gap-3 md:gap-4">
          {WORKS.map((w, i) => (
            <BentoItem key={i} work={w} className={spans[i % spans.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="py-24 md:py-32 border-t border-border">
      <div ref={ref} className="fade-up mx-auto max-w-7xl px-6 grid md:grid-cols-[1fr_2fr] gap-12">
        <div>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Trajetória
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-none">
            Do freela<br />à <span className="italic text-gradient">Gama</span>.
          </h2>
          <div className="mt-8 flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-muted to-secondary border border-border shrink-0" />
            <div className="min-w-0">
              <p className="font-medium">Gabriel Tinti</p>
              <p className="text-sm text-muted-foreground">Sócio-fundador · Agência Gama</p>
              <p className="text-sm text-muted-foreground mt-1">Avaré, São Paulo · Brasil</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Premiere", "After Effects", "Photoshop", "Lightroom", "Motion", "Direção Criativa"].map((s) => (
              <span key={s} className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>

        <ol className="relative border-l border-border pl-8 space-y-10">
          {TIMELINE.map((t, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-brand shadow-[0_0_0_4px_color-mix(in_oklab,var(--brand)_20%,transparent)]" />
              <p className="text-xs tracking-widest uppercase text-muted-foreground">
                {t.period}
              </p>
              <h3 className="font-display text-2xl md:text-3xl mt-1">{t.role}</h3>
              <p className="text-sm text-foreground/80">{t.org}</p>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">{t.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 md:py-40 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
          Vamos criar
        </p>
        <h2 className="font-display text-6xl md:text-9xl leading-[0.9]">
          Tem um <span className="italic text-gradient">projeto</span>
          <br />em mente?
        </h2>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/5500000000000"
            className="px-8 py-4 rounded-full bg-brand text-primary-foreground text-sm uppercase tracking-widest hover:opacity-90 transition"
          >
            Chamar no WhatsApp
          </a>
          <a
            href="mailto:contato@agenciagama.com"
            className="px-8 py-4 rounded-full border border-border text-sm uppercase tracking-widest hover:bg-accent transition"
          >
            Enviar e-mail
          </a>
        </div>
        <p className="mt-16 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Gabriel Tinti · Agência Gama Comunicação
        </p>
      </div>
    </section>
  );
}

function WhatsAppFab() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 2400);
    }, 10000);
    return () => clearInterval(id);
  }, []);
  return (
    <a
      href="https://wa.me/5500000000000"
      aria-label="Falar no WhatsApp"
      className={`fixed bottom-6 right-6 z-50 grid place-items-center w-14 h-14 rounded-full bg-brand text-primary-foreground shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--brand)_60%,transparent)] hover:scale-105 transition-transform ${pulse ? "fab-pulse" : ""}`}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
      </svg>
    </a>
  );
}

/* ---------- Page ---------- */

function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Bento />
      <About />
      <Contact />
      <WhatsAppFab />
    </div>
  );
}
