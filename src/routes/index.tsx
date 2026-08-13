import { createFileRoute } from "@tanstack/react-router";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Mail, MessageCircle, Linkedin, ArrowUpRight, X, Play } from "lucide-react";

// CASE ON — videos
import vAcidentes from "@/assets/portfolio/caseon-acidentes-clubes.mp4.asset.json";
import pAcidentes from "@/assets/portfolio/caseon-acidentes-clubes.jpg.asset.json";
import vBB from "@/assets/portfolio/caseon-bb-segasp.mp4.asset.json";
import pBB from "@/assets/portfolio/caseon-bb-segasp.jpg.asset.json";
import vMotion from "@/assets/portfolio/caseon-motion-tracking.mp4.asset.json";
import pMotion from "@/assets/portfolio/caseon-motion-tracking.jpg.asset.json";
import vNicolau from "@/assets/portfolio/caseon-tv-nicolau-verao.mp4.asset.json";
import pNicolau from "@/assets/portfolio/caseon-tv-nicolau-verao.jpg.asset.json";
import vFreitas from "@/assets/portfolio/caseon-untitled.mp4.asset.json";
import pFreitas from "@/assets/portfolio/caseon-untitled.jpg.asset.json";
// Social / feed
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
// Perfil
import avatar from "@/assets/gabriel-tinti.jpg.asset.json";

const WHATSAPP = "https://wa.me/5514998202760";
const EMAIL = "gabrieltintic@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/gabriel-tinti-da-costa-670b48269/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gabriel Tinti — Portfólio de Edição de Vídeo e Design" },
      {
        name: "description",
        content:
          "Portfólio de Gabriel Tinti: VTs para TV e redes sociais, motion, peças de feed e estampas. Trabalhos para SEGASP, Super Freitas, Serginho Pneus e Landi Turbina.",
      },
      { property: "og:title", content: "Gabriel Tinti — Portfólio Editorial" },
      {
        property: "og:description",
        content:
          "VTs, motion, peças de feed e estampas por Gabriel Tinti — editor de vídeo e diretor criativo em Avaré, SP.",
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
  | { kind: "video"; src: string; poster: string; label?: string }
  | { kind: "image"; src: string; label?: string };

type Work = {
  id: string;
  title: string;
  client: string;
  year: string;
  ratio: Ratio;
  tag: string;
  description: string;
  media: Media[];
};

/* Vídeos — CASE ON */
const VIDEOS: Work[] = [
  {
    id: "nicolau",
    title: "TV Nicolau · Verão",
    client: "CASE ON · TV Nicolau",
    year: "2025",
    ratio: "16:9",
    tag: "VT de TV",
    description:
      "VT de ofertas para televisão, com apresentação de produtos e preços. Formato 16:9 para exibição em TV.",
    media: [{ kind: "video", src: vNicolau.url, poster: pNicolau.url }],
  },
  {
    id: "acidentes",
    title: "Acidentes em Clubes",
    client: "CASE ON · SEGASP Sport",
    year: "2025",
    ratio: "9:16",
    tag: "Cortes · Social",
    description:
      "Cortes verticais extraídos de um vídeo maior, feitos como chamada para o conteúdo completo. Formato 9:16 para redes sociais.",
    media: [{ kind: "video", src: vAcidentes.url, poster: pAcidentes.url }],
  },
  {
    id: "bb-segasp",
    title: "Aniversário BB Segasp",
    client: "CASE ON · SEGASP",
    year: "2025",
    ratio: "1:1",
    tag: "Motion · Social",
    description:
      "Peça em 1:1 para o SEGASP parabenizando o Banco do Brasil pelo aniversário.",
    media: [{ kind: "video", src: vBB.url, poster: pBB.url }],
  },
  {
    id: "freitas",
    title: "Super Freitas · VT de Ofertas",
    client: "CASE ON · Super Freitas Supermercados",
    year: "2024",
    ratio: "1:1",
    tag: "VT · Ofertas",
    description:
      "VT de ofertas para o Super Freitas Supermercados, produzido pela CASE ON. Formato 1:1.",
    media: [{ kind: "video", src: vFreitas.url, poster: pFreitas.url }],
  },
  {
    id: "motion",
    title: "Motion Tracking · Callouts",
    client: "Landi Turbina · Teste",
    year: "2025",
    ratio: "16:9",
    tag: "After Effects",
    description:
      "Vídeo de teste com callouts e motion tracking desenvolvido para a Landi Turbina.",
    media: [{ kind: "video", src: vMotion.url, poster: pMotion.url }],
  },
];

/* Social / feed */
const SOCIAL: Work[] = [
  {
    id: "serginho-institucional",
    title: "Serginho Pneus · Institucional",
    client: "Freela · Serginho Pneus",
    year: "2024",
    ratio: "4:5",
    tag: "Instagram 1080×1350",
    description:
      "Peça institucional para o Serginho Pneus, oficina mecânica de Avaré-SP. Trabalho freelance em formato Instagram 1080×1350.",
    media: [{ kind: "image", src: iInstitucional.url }],
  },
  {
    id: "serginho-alinhamento",
    title: "Serginho Pneus · Alinhamento & Balanceamento",
    client: "Freela · Serginho Pneus",
    year: "2024",
    ratio: "4:5",
    tag: "Instagram 1080×1350",
    description:
      "Conteúdo de feed sobre alinhamento e balanceamento para o Serginho Pneus, oficina mecânica de Avaré-SP. Formato 1080×1350.",
    media: [{ kind: "image", src: iAlinhamento.url }],
  },
];

const CAROUSEL: Work = {
  id: "educoom",
  title: "@educoom · Jornalismo & Publicidade",
  client: "Faculdade · @educoom",
  year: "2024",
  ratio: "4:5",
  tag: "Carrossel contínuo · 1080×1350",
  description:
    "Carrossel de cinco cards em que cada imagem se conecta à seguinte, formando uma única composição horizontal contínua no feed. Conteúdo sobre Jornalismo e Publicidade para a página @educoom, produzido na faculdade. Formato 1080×1350.",
  media: [iSocial1, iSocial2, iSocial3, iSocial4, iSocial5].map((a) => ({
    kind: "image" as const,
    src: a.url,
  })),
};

/* Estampas — camisetas (1:1) */
const SHIRTS: Work[] = [
  {
    id: "barulhentos",
    title: "Barulhentos",
    client: "Landi Turbina",
    year: "2025",
    ratio: "1:1",
    tag: "Frente & Costas",
    description:
      "Camiseta criada para o evento da Landi Turbina. Ilustração e composição tipográfica na frente, com hierarquia tipográfica no verso.",
    media: [
      { kind: "image", src: iBarulhentosF.url, label: "Frente" },
      { kind: "image", src: iBarulhentosC.url, label: "Costas" },
    ],
  },
  {
    id: "f250",
    title: "F-250",
    client: "Landi Turbina",
    year: "2025",
    ratio: "1:1",
    tag: "Frente & Costas",
    description:
      "Estampa da linha F-250 — frente ilustrada e verso com composição tipográfica hierarquizada.",
    media: [
      { kind: "image", src: iF250F.url, label: "Frente" },
      { kind: "image", src: iF250C.url, label: "Costas" },
    ],
  },
  {
    id: "sw4",
    title: "SW4",
    client: "Landi Turbina",
    year: "2025",
    ratio: "1:1",
    tag: "Estampa",
    description: "Estampa para a linha SW4 — traço técnico e composição centralizada.",
    media: [{ kind: "image", src: iSw4.url, label: "Costas" }],
  },
  {
    id: "fusca",
    title: "Fusca · Catequese",
    client: "Landi Turbina",
    year: "2024",
    ratio: "1:1",
    tag: "Estampa",
    description: "Estampa temática — ilustração vetorial e paleta terra.",
    media: [{ kind: "image", src: iFusca.url }],
  },
];

const ALL_WORKS: Work[] = [...VIDEOS, ...SOCIAL, CAROUSEL, ...SHIRTS];

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

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return mobile;
}

/* ---------- Helpers ---------- */

const aspectClass = (r: Ratio) =>
  r === "16:9" ? "aspect-video"
  : r === "9:16" ? "aspect-[9/16]"
  : r === "4:5" ? "aspect-[4/5]"
  : "aspect-square";

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
      className={`fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        solid ? "w-[min(94%,780px)]" : "w-[min(94%,900px)]"
      }`}
    >
      <div
        className={`glass-strong rounded-full pl-4 pr-2 sm:px-6 py-2 sm:py-2.5 grid grid-cols-[minmax(0,1fr)_auto] sm:flex items-center justify-between gap-3 transition-all ${
          solid ? "shadow-[var(--shadow-lift)]" : ""
        }`}
      >
        <a href="#top" className="font-display text-lg sm:text-xl truncate">
          Gabriel <span className="italic text-gradient">Tinti</span>
        </a>
        <div className="hidden md:flex items-center gap-7 text-[13px] text-muted-foreground">
          <a href="#videos" className="link-underline hover:text-foreground transition">Vídeos</a>
          <a href="#social" className="link-underline hover:text-foreground transition">Social</a>
          <a href="#estampas" className="link-underline hover:text-foreground transition">Estampas</a>
          <a href="#journey" className="link-underline hover:text-foreground transition">Trajetória</a>
        </div>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 inline-flex items-center gap-2 min-h-11 text-[12px] sm:text-[13px] px-4 py-2 rounded-full bg-foreground text-primary-foreground hover:bg-brand transition-colors"
        >
          <MessageCircle size={15} strokeWidth={2} />
          <span>Falar</span>
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
      className="grain relative min-h-[100svh] flex flex-col justify-end pt-28 pb-14 sm:pb-16 overflow-hidden"
      style={{ background: "var(--gradient-warm)" } as CSSProperties}
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 w-full">
        <div className="flex items-center gap-3 mb-6 sm:mb-8 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
          <span className="inline-block w-8 h-px bg-foreground/30" />
          <span>Editor de vídeo & diretor criativo</span>
        </div>

        <h1 className="font-display text-[clamp(3.2rem,13vw,14rem)] leading-[0.88] tracking-[-0.04em]">
          Gabriel
          <br />
          <span className="italic font-normal text-gradient">Tinti.</span>
        </h1>

        <div className="mt-10 md:mt-14 grid md:grid-cols-[1.5fr_auto] gap-8 md:gap-10 items-end">
          <p className="text-[16px] md:text-xl leading-relaxed text-foreground/75 max-w-2xl font-light">
            VTs para TV e redes sociais, motion, peças de feed e estampas.
            Trabalhos em <em className="font-display italic">16:9</em>,{" "}
            <em className="font-display italic">9:16</em>,{" "}
            <em className="font-display italic">1:1</em> e{" "}
            <em className="font-display italic">1080×1350</em>.
          </p>
          <a
            href="#videos"
            className="group inline-flex items-center gap-4 min-h-11 text-[11px] uppercase tracking-[0.3em] text-foreground/70 hover:text-foreground transition-colors"
          >
            <span>Ver seleção</span>
            <span className="relative block w-12 h-px bg-foreground/30 overflow-hidden">
              <span className="absolute inset-0 bg-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee ---------- */

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
    <section className="border-y border-border/60 py-5 sm:py-6 overflow-hidden">
      <div className="marquee-track font-display text-xl sm:text-2xl md:text-4xl text-foreground/70 whitespace-nowrap">
        {doubled.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-8 sm:gap-12">
            <span className="italic">{s}</span>
            <span className="text-brand">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- Section header ---------- */

function SectionHead({
  kicker,
  title,
  italic,
  text,
}: {
  kicker: string;
  title: string;
  italic: string;
  text: string;
}) {
  return (
    <header className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-16 items-end mb-10 md:mb-20">
      <div>
        <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3 sm:mb-4">
          {kicker}
        </p>
        <h2 className="font-display text-[clamp(2.2rem,7vw,5.5rem)] leading-[0.95]">
          {title}
          <br />
          <span className="italic text-gradient">{italic}</span>
        </h2>
      </div>
      <p className="text-foreground/70 text-base md:text-lg leading-relaxed max-w-md md:ml-auto md:text-right font-light">
        {text}
      </p>
    </header>
  );
}

/* ---------- Card ---------- */

function WorkCard({
  work,
  span,
  onOpen,
}: {
  work: Work;
  span: string;
  onOpen: (id: string) => void;
}) {
  const ref = useReveal<HTMLElement>();
  const vRef = useRef<HTMLVideoElement | null>(null);
  const [face, setFace] = useState(0);
  const isPair = work.media.length > 1;
  const media = work.media[face];

  return (
    <article ref={ref} className={`fade-up ${span}`}>
      <button
        type="button"
        onClick={() => onOpen(work.id)}
        className="group block w-full text-left"
      >
        <div className={`media-frame card-lift ${aspectClass(work.ratio)}`}>
          {media.kind === "video" ? (
            <video
              ref={vRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={media.src}
              poster={media.poster}
              muted
              loop
              playsInline
              preload="none"
              onMouseEnter={(e) => void e.currentTarget.play().catch(() => {})}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
          ) : (
            <img
              src={media.src}
              alt={`${work.title} — ${work.client}`}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full ${
                work.tag.includes("Frente") || work.tag === "Estampa"
                  ? "object-contain p-2"
                  : "object-cover"
              }`}
            />
          )}

          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="font-mono-tag text-[10px] px-2 py-1 rounded-full glass text-foreground/80">
              {work.ratio}
            </span>
            {media.kind === "video" && (
              <span className="font-mono-tag text-[10px] px-2 py-1 rounded-full glass text-foreground/80 inline-flex items-center gap-1">
                <Play size={9} fill="currentColor" /> VT
              </span>
            )}
          </div>

          {isPair && (
            <div
              className="absolute top-3 right-3 flex items-center gap-1 glass rounded-full p-1"
              onClick={(e) => e.stopPropagation()}
            >
              {work.media.map((m, i) => (
                <span
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => setFace(i)}
                  onKeyDown={(e) => e.key === "Enter" && setFace(i)}
                  className={`font-mono-tag text-[10px] px-2.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                    face === i
                      ? "bg-foreground text-primary-foreground"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {m.label ?? i + 1}
                </span>
              ))}
            </div>
          )}

          <div className="absolute inset-x-3 bottom-3 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
            <div className="glass rounded-2xl px-4 py-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="min-w-0">
                <p className="font-display text-base sm:text-lg leading-tight truncate">
                  {work.title}
                </p>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-widest truncate">
                  {work.client} · {work.year}
                </p>
              </div>
              <span className="shrink-0 grid place-items-center w-9 h-9 rounded-full bg-foreground text-primary-foreground">
                <ArrowUpRight size={15} />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-baseline">
          <div className="min-w-0">
            <h3 className="font-display text-lg md:text-2xl leading-tight truncate">
              {work.title}
            </h3>
            <p className="text-[12px] text-muted-foreground mt-0.5 truncate">
              <span className="font-mono-tag">{work.tag}</span>
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

/* ---------- Seções ---------- */

function VideosSection({ onOpen }: { onOpen: (id: string) => void }) {
  const spans = [
    "col-span-12 md:col-span-8",
    "col-span-6 md:col-span-4",
    "col-span-6 md:col-span-4",
    "col-span-6 md:col-span-4",
    "col-span-12 md:col-span-4",
  ];
  return (
    <section id="videos" className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <SectionHead
          kicker="Vídeo & Motion"
          title="VTs e"
          italic="movimento"
          text="Comerciais para TV, cortes verticais para redes sociais, peças em 1:1 e experimentos de motion tracking."
        />
        <div className="grid grid-cols-12 gap-3 sm:gap-5 md:gap-6">
          {VIDEOS.map((w, i) => (
            <WorkCard key={w.id} work={w} span={spans[i] ?? "col-span-6 md:col-span-4"} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialSection({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <section id="social" className="py-16 sm:py-24 md:py-32 border-t border-border/60">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <SectionHead
          kicker="Social & Feed"
          title="Peças de"
          italic="feed"
          text="Conteúdos em 1080×1350 para Instagram — institucionais, informativos e carrosséis contínuos."
        />
        <div className="grid grid-cols-12 gap-3 sm:gap-5 md:gap-6">
          {SOCIAL.map((w) => (
            <WorkCard key={w.id} work={w} span="col-span-6 md:col-span-4" onOpen={onOpen} />
          ))}
        </div>
        <CarouselShowcase onOpen={onOpen} />
      </div>
    </section>
  );
}

function CarouselShowcase({ onOpen }: { onOpen: (id: string) => void }) {
  const ref = useReveal<HTMLDivElement>(0.1);
  return (
    <div ref={ref} className="fade-up mt-12 md:mt-20">
      <div className="grid md:grid-cols-[minmax(0,1fr)_auto] gap-4 md:gap-10 items-end mb-5">
        <div className="min-w-0">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Carrossel contínuo · @educoom
          </p>
          <h3 className="font-display text-2xl md:text-4xl leading-tight">
            Jornalismo & <span className="italic text-gradient">Publicidade</span>
          </h3>
          <p className="mt-3 text-foreground/70 font-light max-w-2xl text-sm md:text-base">
            Cinco cards 1080×1350 desenhados como uma única imagem horizontal — ao
            deslizar, as peças se conectam sem vinco entre elas.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpen(CAROUSEL.id)}
          className="shrink-0 inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-full glass text-[11px] uppercase tracking-[0.25em] hover:bg-white transition-colors"
        >
          Ampliar <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="media-frame">
        <div className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max">
            {CAROUSEL.media.map((m, i) => (
              <img
                key={i}
                src={m.src}
                alt={`Carrossel @educoom — card ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="block h-[46vw] max-h-[540px] w-auto md:h-[420px] select-none"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 font-mono-tag text-[11px] text-muted-foreground">
        Arraste para o lado · 5 cards · 1080×1350
      </p>
    </div>
  );
}

function ShirtsSection({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <section id="estampas" className="py-16 sm:py-24 md:py-32 border-t border-border/60">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <SectionHead
          kicker="Landi Turbina"
          title="Estampas de"
          italic="camiseta"
          text="Ilustração, tipografia e composição para linhas de camisetas — algumas com frente e costas pensadas em conjunto."
        />
        <div className="grid grid-cols-12 gap-3 sm:gap-5 md:gap-6">
          {SHIRTS.map((w) => (
            <WorkCard
              key={w.id}
              work={w}
              span="col-span-6 md:col-span-3"
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Timeline ---------- */

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
    <section id="journey" className="py-16 sm:py-24 md:py-32 border-t border-border/60">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <header className="mb-12 md:mb-20 max-w-3xl">
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Trajetória
          </p>
          <h2 className="font-display text-[clamp(2.2rem,7vw,5.5rem)] leading-[0.95]">
            De estagiário<br />à <span className="italic text-gradient">sócio-fundador</span>.
          </h2>
        </header>

        <div ref={wrapRef} className="relative pl-7 md:pl-0">
          <div ref={trackRef} className="tl-track left-1 md:left-1/2 md:-translate-x-1/2" />
          <ol className="space-y-10 md:space-y-24">
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
      <span className="absolute left-1 md:left-1/2 top-3 -translate-x-1/2 z-10">
        <span className="block w-3 h-3 rounded-full bg-brand shadow-[0_0_0_6px_color-mix(in_oklab,var(--brand)_18%,transparent)]" />
      </span>

      <div
        className={`pl-6 md:pl-0 md:grid md:grid-cols-2 md:gap-16 ${
          isLeft ? "" : "md:[&>*:first-child]:col-start-2"
        }`}
      >
        <div className={`${isLeft ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
          <div className="glass rounded-2xl p-5 md:p-8 card-lift">
            <p className="font-mono-tag text-[10px] sm:text-[11px] uppercase tracking-widest text-muted-foreground">
              {item.period}
            </p>
            <h3 className="font-display text-xl md:text-4xl mt-2 leading-tight">
              {item.role}
            </h3>
            <p className="text-sm text-foreground/60 mt-1">{item.org}</p>
            <blockquote
              className={`mt-4 font-display italic text-base md:text-xl leading-[1.55] text-foreground/85 ${
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
    <section className="py-16 sm:py-24 md:py-32 border-t border-border/60">
      <div
        ref={ref}
        className="fade-up mx-auto max-w-[1400px] px-5 sm:px-6 grid md:grid-cols-[auto_1fr] gap-8 md:gap-20 items-start"
      >
        <div className="flex md:block gap-5 items-center">
          <div className="relative shrink-0">
            <img
              src={avatar.url}
              alt="Retrato de Gabriel Tinti"
              loading="lazy"
              decoding="async"
              className="w-24 h-24 md:w-44 md:h-44 rounded-full object-cover border border-border shadow-[var(--shadow-float)]"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 md:w-7 md:h-7 rounded-full bg-brand border-4 border-background" />
          </div>
          <div className="md:mt-6 min-w-0">
            <p className="font-display text-2xl md:text-3xl">Gabriel Tinti</p>
            <p className="text-sm text-muted-foreground">Avaré, São Paulo · Brasil</p>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-[13px] text-foreground/70 hover:text-brand transition-colors"
            >
              <Linkedin size={15} /> LinkedIn
            </a>
          </div>
        </div>

        <div>
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Sobre
          </p>
          <p className="font-display text-2xl md:text-5xl leading-[1.15] text-foreground/90">
            Faço vídeo como quem escreve um parágrafo —{" "}
            <span className="italic text-gradient">ritmo, hierarquia e respiro</span>{" "}
            em cada corte.
          </p>
          <p className="mt-6 md:mt-8 text-foreground/70 text-base md:text-lg leading-relaxed font-light max-w-2xl">
            Trabalho na intersecção entre edição, motion e design. Uso a suíte
            Adobe completa e programo quando o problema pede software. Como
            sócio-fundador da Agência Gama, dirijo criação e resultado.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contato ---------- */

function Contact() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="contact"
      className="py-20 sm:py-28 md:py-36 border-t border-border/60 grain"
      style={{ background: "var(--gradient-warm)" } as CSSProperties}
    >
      <div ref={ref} className="fade-up mx-auto max-w-[1400px] px-5 sm:px-6 text-center">
        <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Contato
        </p>
        <h2 className="font-display text-[clamp(2.2rem,8vw,6rem)] leading-[0.95]">
          Vamos criar<br />
          <span className="italic text-gradient">algo juntos</span>.
        </h2>

        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 min-h-13 px-7 py-4 rounded-full bg-foreground text-primary-foreground text-[12px] uppercase tracking-[0.25em] hover:bg-brand transition-colors"
          >
            <MessageCircle size={17} />
            Chamar no WhatsApp
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center justify-center gap-3 min-h-13 px-7 py-4 rounded-full glass text-[12px] uppercase tracking-[0.25em] text-foreground hover:bg-white transition-colors"
          >
            <Mail size={17} />
            Enviar e-mail
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 min-h-13 px-7 py-4 rounded-full glass text-[12px] uppercase tracking-[0.25em] text-foreground hover:bg-white transition-colors"
          >
            <Linkedin size={17} />
            LinkedIn
          </a>
        </div>

        <p className="mt-8 font-mono-tag text-[13px] text-muted-foreground">
          (14) 99820-2760 · {EMAIL}
        </p>

        <p className="mt-16 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} · Gabriel Tinti · Agência Gama Comunicação
        </p>
      </div>
    </section>
  );
}

/* ---------- Theater modal ---------- */

function Theater({ work, onClose }: { work: Work | null; onClose: () => void }) {
  const isMobile = useIsMobile();
  const [face, setFace] = useState(0);

  useEffect(() => setFace(0), [work?.id]);

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

  const isStrip = work.id === CAROUSEL.id;
  const media = work.media[face] ?? work.media[0];
  const frameAspect =
    work.ratio === "16:9" ? "aspect-video max-w-[92vw] md:max-w-[76vw]"
    : work.ratio === "9:16" ? "aspect-[9/16] max-h-[70vh] md:max-h-[80vh] max-w-[min(92vw,45vh)] md:max-w-[min(92vw,50vh)]"
    : work.ratio === "4:5" ? "aspect-[4/5] max-h-[70vh] md:max-h-[80vh] max-w-[min(92vw,60vh)]"
    : "aspect-square max-w-[min(92vw,62vh)]";

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto flex items-start md:items-center justify-center p-4 md:p-10 backdrop-in"
      style={{ background: "color-mix(in oklab, var(--paper) 62%, transparent)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`modal-in relative w-full ${isStrip ? "max-w-6xl" : "max-w-6xl md:grid md:grid-cols-[1fr_320px]"} gap-6 md:gap-10 items-center my-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {isStrip ? (
          <div className="media-frame">
            <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max">
                {work.media.map((m, i) => (
                  <img
                    key={i}
                    src={m.src}
                    alt={`${work.title} — card ${i + 1}`}
                    className="block h-[52vh] w-auto"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={`media-frame mx-auto w-full ${frameAspect}`}>
            {media.kind === "video" ? (
              <video
                className="absolute inset-0 w-full h-full object-contain bg-black/5"
                src={media.src}
                poster={media.poster}
                controls
                autoPlay
                loop
                playsInline
              />
            ) : (
              <img
                src={media.src}
                alt={`${work.title} — ${work.client}`}
                className="absolute inset-0 w-full h-full object-contain"
              />
            )}
          </div>
        )}

        <aside className={`glass-strong rounded-2xl p-5 md:p-7 mt-4 md:mt-0 ${isStrip ? "md:mt-6" : ""}`}>
          <p className="font-mono-tag text-[10px] uppercase tracking-widest text-muted-foreground">
            {work.client} · {work.year}
          </p>
          <h3 className="font-display text-2xl md:text-4xl mt-2 leading-tight">
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
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/75 font-light">
            {work.description}
          </p>

          {!isStrip && work.media.length > 1 && (
            <div className="mt-5 flex gap-2">
              {work.media.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setFace(i)}
                  className={`flex-1 min-h-11 text-[11px] uppercase tracking-[0.2em] rounded-full transition-colors ${
                    face === i
                      ? "bg-foreground text-primary-foreground"
                      : "bg-foreground/5 text-foreground/70"
                  }`}
                >
                  {m.label ?? `0${i + 1}`}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-5 w-full min-h-12 text-[11px] uppercase tracking-[0.3em] px-4 py-3 rounded-full bg-foreground text-primary-foreground hover:bg-brand transition-colors"
          >
            Fechar
          </button>
        </aside>

        {!isMobile && (
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-4 right-4 grid place-items-center w-11 h-11 rounded-full glass-strong text-foreground hover:bg-white transition"
          >
            <X size={17} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- FAB ---------- */

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
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
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
    () => ALL_WORKS.find((w) => w.id === openId) ?? null,
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
      <VideosSection onOpen={handleOpen} />
      <SocialSection onOpen={handleOpen} />
      <ShirtsSection onOpen={handleOpen} />
      <Journey />
      <About />
      <Contact />
      <WhatsAppFab />
      <Theater work={openWork} onClose={handleClose} />
    </div>
  );
}
