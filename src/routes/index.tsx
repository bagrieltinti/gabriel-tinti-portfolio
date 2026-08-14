import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronRight,
  Mail,
  MessageCircle,
  Linkedin,
  MoveUpRight,
  Play,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

const WHATSAPP = "https://wa.me/5514998202760";
const EMAIL = "gabrieltintic@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/gabriel-tinti-da-costa-670b48269/";
const asset = (name: string) => `/media/${name}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gabriel Tinti — Audiovisual & Design" },
      {
        name: "description",
        content:
          "Portfólio de Gabriel Tinti. Edição, motion e design para marcas, produtos e campanhas que precisam comunicar com clareza.",
      },
      { property: "og:title", content: "Gabriel Tinti — Audiovisual & Design" },
      {
        property: "og:description",
        content: "Direção criativa, edição e design com foco em clareza, ritmo e entrega.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

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
  tone: string;
  fit?: "cover" | "contain";
};

const VIDEOS: Work[] = [
  {
    id: "nicolau",
    title: "TV Nicolau · Verão",
    client: "CASE ON / TV Nicolau",
    year: "2025",
    ratio: "16:9",
    tag: "VT de TV",
    tone: "ochre",
    description:
      "VT de ofertas para televisão, com apresentação de produtos e preços. A edição equilibra volume de informação, ritmo comercial e leitura rápida em tela grande.",
    media: [
      {
        kind: "video",
        src: asset("caseon-tv-nicolau-verao.mp4"),
        poster: asset("caseon-tv-nicolau-verao.jpg"),
      },
    ],
  },
  {
    id: "acidentes",
    title: "Acidentes em Clubes",
    client: "CASE ON / SEGASP Sport",
    year: "2025",
    ratio: "9:16",
    tag: "Cortes · Social",
    tone: "blue",
    description:
      "Cortes verticais extraídos de um vídeo maior, pensados como chamada para o conteúdo completo e editados para a atenção rápida das redes.",
    media: [
      {
        kind: "video",
        src: asset("caseon-acidentes-clubes.mp4"),
        poster: asset("caseon-acidentes-clubes.jpg"),
      },
    ],
  },
  {
    id: "bb-segasp",
    title: "Aniversário BB Segasp",
    client: "CASE ON / SEGASP",
    year: "2025",
    ratio: "1:1",
    tag: "Motion · Social",
    tone: "red",
    description:
      "Peça de celebração em 1:1 para o SEGASP, com motion gráfico direto, contraste forte e uma linguagem adequada ao feed.",
    media: [
      {
        kind: "video",
        src: asset("caseon-bb-segasp.mp4"),
        poster: asset("caseon-bb-segasp.jpg"),
      },
    ],
  },
  {
    id: "freitas",
    title: "Super Freitas · Ofertas",
    client: "CASE ON / Super Freitas",
    year: "2024",
    ratio: "1:1",
    tag: "VT · Ofertas",
    tone: "green",
    description:
      "VT de ofertas para supermercado, resolvendo preço, produto e chamada em um espaço quadrado de leitura imediata.",
    media: [
      {
        kind: "video",
        src: asset("caseon-untitled.mp4"),
        poster: asset("caseon-untitled.jpg"),
      },
    ],
  },
  {
    id: "motion",
    title: "Motion Tracking · Callouts",
    client: "Landi Turbina / teste",
    year: "2025",
    ratio: "16:9",
    tag: "After Effects",
    tone: "violet",
    description:
      "Teste de motion tracking com callouts para a Landi Turbina, explorando como informação técnica pode acompanhar um objeto em movimento.",
    media: [
      {
        kind: "video",
        src: asset("caseon-motion-tracking.mp4"),
        poster: asset("caseon-motion-tracking.jpg"),
      },
    ],
  },
];

const SOCIAL: Work[] = [
  {
    id: "serginho-institucional",
    title: "Serginho Pneus · Institucional",
    client: "Freela / Serginho Pneus",
    year: "2024",
    ratio: "4:5",
    tag: "Instagram 1080×1350",
    tone: "yellow",
    description:
      "Peça institucional para uma oficina de Avaré-SP, com foco em serviço, proximidade e clareza de mensagem.",
    media: [{ kind: "image", src: asset("caseon-institucional.webp") }],
  },
  {
    id: "serginho-alinhamento",
    title: "Alinhamento & Balanceamento",
    client: "Freela / Serginho Pneus",
    year: "2024",
    ratio: "4:5",
    tag: "Instagram 1080×1350",
    tone: "cyan",
    description:
      "Conteúdo de feed sobre alinhamento e balanceamento, traduzindo um serviço técnico em uma peça de leitura simples.",
    media: [{ kind: "image", src: asset("caseon-alinhamento-balanceamento.webp") }],
  },
];

const CAROUSEL: Work = {
  id: "educoom",
  title: "Jornalismo & Publicidade",
  client: "Faculdade / @educoom",
  year: "2024",
  ratio: "4:5",
  tag: "Carrossel contínuo",
  tone: "coral",
  description:
    "Cinco cards desenhados como uma única composição horizontal. Cada peça precisa funcionar sozinha, mas também entregar a próxima quando o usuário desliza.",
  media: [1, 2, 3, 4, 5].map((i) => ({
    kind: "image" as const,
    src: asset(`caseon-social-${i}.webp`),
    label: `Card ${i}`,
  })),
};

const SHIRTS: Work[] = [
  {
    id: "barulhentos",
    title: "Os Barulhentos",
    client: "Landi Turbina",
    year: "2025",
    ratio: "1:1",
    tag: "Frente & costas",
    tone: "pink",
    fit: "contain",
    description:
      "Camiseta criada para um evento da Landi Turbina. Ilustração e composição tipográfica foram pensadas em conjunto nos dois lados.",
    media: [
      { kind: "image", src: asset("landi-camiseta-barulhentos-frente.webp"), label: "Frente" },
      { kind: "image", src: asset("landi-camiseta-barulhentos-costas.webp"), label: "Costas" },
    ],
  },
  {
    id: "f250",
    title: "F-250",
    client: "Landi Turbina",
    year: "2025",
    ratio: "1:1",
    tag: "Frente & costas",
    tone: "orange",
    fit: "contain",
    description:
      "Estampa para a linha F-250, combinando frente ilustrada e verso com composição tipográfica hierarquizada.",
    media: [
      { kind: "image", src: asset("landi-camiseta-f250-frente.webp"), label: "Frente" },
      { kind: "image", src: asset("landi-camiseta-f250-costas.webp"), label: "Costas" },
    ],
  },
  {
    id: "sw4",
    title: "SW4",
    client: "Landi Turbina",
    year: "2025",
    ratio: "1:1",
    tag: "Estampa",
    tone: "lime",
    fit: "contain",
    description: "Estampa de traço técnico para a linha SW4.",
    media: [{ kind: "image", src: asset("landi-camiseta-sw4-costas.webp"), label: "Costas" }],
  },
  {
    id: "fusca",
    title: "Fusca",
    client: "Landi Turbina",
    year: "2024",
    ratio: "1:1",
    tag: "Estampa",
    tone: "brown",
    fit: "contain",
    description: "Estampa temática com ilustração vetorial e paleta de terra.",
    media: [{ kind: "image", src: asset("landi-camiseta-fusca.webp") }],
  },
];

const ALL_WORKS = [...VIDEOS, ...SOCIAL, CAROUSEL, ...SHIRTS];

const TIMELINE = [
  [
    "2026 — atual",
    "Diretor Executivo",
    "Agência Gama Comunicação",
    "Sócio-fundador. Direção criativa e executiva, estratégia de marca e liderança do time de criação.",
    "gama",
  ],
  [
    "2025 — atual",
    "Editor de Vídeo & Conteúdo",
    "CASE ON",
    "VTs para redes sociais e TV, motion tracking, callouts, captação e finalização no fluxo Adobe.",
    "caseon",
  ],
  [
    "2024 — 2026",
    "Designer Gráfico & Desenvolvedor",
    "Landi Turbina",
    "Artes, identidade, estampas e sistemas internos em produção para reduzir trabalho manual do time.",
    "landi",
  ],
  [
    "2024 — 2026",
    "Marketing & Design",
    "Landi Turbina",
    "Campanhas, materiais de comunicação e apoio criativo ao time de marketing.",
    "landi",
  ],
  [
    "2022 — 2024",
    "Editor de Vídeo & Graphic Designer",
    "CASE ON",
    "Edição de VTs para social e TV, motion graphics, peças de feed e identidade.",
    "caseon",
  ],
  [
    "2022",
    "Designer Gráfico",
    "GPmais Assessoria de Marketing",
    "Estágio remoto com peças de feed, identidade e apoio às contas da agência.",
    "gpmais",
  ],
];

const TIMELINE_LOGOS: Record<string, { src: string; alt: string }> = {
  gama: { src: asset("logo-gama.png"), alt: "Gama Comunicação" },
  caseon: { src: asset("logo-caseon.png"), alt: "CaseOn" },
  landi: { src: asset("logo-landi-turbina.png"), alt: "Landi Turbina" },
  gpmais: { src: asset("logo-gpmais.png"), alt: "GPmais" },
};

function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -50px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}

function useScrollProgress() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      const scrollY = Math.min(window.scrollY, 1200);
      root.style.setProperty("--scroll-progress", String(max ? root.scrollTop / max : 0));
      root.style.setProperty("--scroll-y", String(scrollY));
      raf = 0;
    };
    const handleScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const links = [
    ["Trabalhos", "#trabalhos"],
    ["Processo", "#processo"],
    ["Sobre", "#sobre"],
  ];
  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <a className="nav-mark" href="#top" aria-label="Voltar ao início">
        <span className="nav-icon" aria-hidden="true">
          <i />
          <i />
        </span>
      </a>
      <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Navegação principal">
        {links.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
        <a className="nav-contact" href={WHATSAPP} target="_blank" rel="noreferrer">
          Vamos conversar <ArrowUpRight size={14} />
        </a>
      </nav>
      <button
        className="nav-toggle"
        type="button"
        onClick={() => setMenuOpen((value) => !value)}
        aria-label="Abrir menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero section-frame">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="eyebrow-index">01</span> Audiovisual & design / Avaré — SP
        </p>
        <h1>
          Gabriel
          <br />
          <em>Tinti.</em>
        </h1>
        <p className="hero-lede">
          Direção, edição e design para marcas que precisam <strong>comunicar melhor.</strong>
        </p>
        <a className="text-link" href="#trabalhos">
          Ver trabalhos <ArrowDown size={16} />
        </a>
      </div>
      <div className="hero-brief">
        <div className="hero-brief-top">
          <span>Como posso ajudar</span>
          <span>01 / 03</span>
        </div>
        <p className="hero-brief-lede">
          A partir do objetivo, organizo a <strong>mensagem</strong>, o formato e a entrega.
        </p>
        <div className="hero-facts">
          <div>
            <span>01</span>
            <strong>Clareza</strong>
            <p>Uma ideia que chega rápido.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Execução</strong>
            <p>Arquivo pronto para ir ao ar.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Consistência</strong>
            <p>Peças que conversam entre si.</p>
          </div>
        </div>
        <div className="hero-side-note">
          <span>role para explorar</span>
          <i />
        </div>
      </div>
    </section>
  );
}

function DisciplineStrip() {
  const items = [
    "Direção criativa",
    "Edição de vídeo",
    "Motion design",
    "Captação",
    "Identidade visual",
    "Design para redes",
  ];
  return (
    <section className="discipline-strip" aria-label="Áreas de atuação">
      <div className="discipline-track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>
            <i>✳</i>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function SectionIntro({
  index,
  label,
  title,
  emphasis,
  text,
}: {
  index: string;
  label: string;
  title: string;
  emphasis: string;
  text: ReactNode;
}) {
  const reveal = useReveal<HTMLElement>(0.18);
  return (
    <header ref={reveal} className="section-intro reveal">
      <p className="eyebrow">
        <span className="eyebrow-index">{index}</span> {label}
      </p>
      <div className="section-intro-body">
        <h2>
          {title}
          <br />
          <em>{emphasis}</em>
        </h2>
        <p>{text}</p>
      </div>
    </header>
  );
}

function MediaContent({
  work,
  media,
  active = false,
  videoRef,
}: {
  work: Work;
  media: Media;
  active?: boolean;
  videoRef?: RefObject<HTMLVideoElement | null>;
}) {
  if (media.kind === "video") {
    return (
      <video
        ref={videoRef}
        className="media-object"
        src={media.src}
        poster={media.poster}
        muted
        loop
        playsInline
        preload="metadata"
        autoPlay={active}
        controls={false}
      />
    );
  }
  return (
    <img
      className={`media-object ${work.fit === "contain" ? "is-contain" : ""}`}
      src={media.src}
      alt={`${work.title} — ${work.client}`}
      loading="lazy"
      decoding="async"
    />
  );
}

function WorkCard({
  work,
  className = "",
  onOpen,
}: {
  work: Work;
  className?: string;
  onOpen: (id: string) => void;
}) {
  const reveal = useReveal<HTMLElement>();
  const video = useRef<HTMLVideoElement | null>(null);
  const [activeMedia, setActiveMedia] = useState(0);
  const media = work.media[activeMedia];
  const handleEnter = () => {
    if (video.current) void video.current.play().catch(() => undefined);
  };
  const handleLeave = () => {
    if (video.current) {
      video.current.pause();
      video.current.currentTime = 0;
    }
  };
  return (
    <article ref={reveal} className={`work-card reveal ${className} tone-${work.tone}`}>
      <button
        className="work-visual"
        type="button"
        onClick={() => onOpen(work.id)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-label={`Abrir ${work.title}`}
      >
        <MediaContent work={work} media={media} active={false} videoRef={video} />
        <span className="work-index">{work.ratio}</span>
        <span className="work-open">
          <MoveUpRight size={18} />
        </span>
        {media.kind === "video" && (
          <span className="work-play">
            <Play size={13} fill="currentColor" /> motion
          </span>
        )}
      </button>
      <div className="work-meta">
        <div>
          <p className="work-client">
            {work.client} <span>· {work.year}</span>
          </p>
          <h3>{work.title}</h3>
        </div>
        {work.media.length > 1 ? (
          <div className="media-switch" aria-label={`Escolher imagem de ${work.title}`}>
            {work.media.map((item, index) => (
              <button
                key={item.label ?? index}
                className={index === activeMedia ? "is-active" : ""}
                type="button"
                onClick={() => setActiveMedia(index)}
              >
                {item.label ?? `0${index + 1}`}
              </button>
            ))}
          </div>
        ) : (
          <span className="work-tag">{work.tag}</span>
        )}
      </div>
    </article>
  );
}

function VideosSection({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <section id="trabalhos" className="content-section work-section section-frame">
      <SectionIntro
        index="02"
        label="Seleção de trabalhos"
        title="Imagem em"
        emphasis="movimento."
        text={
          <>
            <strong>Edição, motion e direção</strong> para TV, social e conteúdo de marca. Cada peça
            parte do objetivo, do canal e do tempo disponível.
          </>
        }
      />
      <div className="video-grid">
        <div className="video-column video-column-main">
          <WorkCard work={VIDEOS[0]} onOpen={onOpen} className="video-card video-card-1" />
          <div className="video-subgrid">
            <WorkCard work={VIDEOS[2]} onOpen={onOpen} className="video-card video-card-3" />
            <WorkCard work={VIDEOS[3]} onOpen={onOpen} className="video-card video-card-4" />
          </div>
        </div>
        <div className="video-column video-column-side">
          <WorkCard work={VIDEOS[1]} onOpen={onOpen} className="video-card video-card-2" />
          <WorkCard work={VIDEOS[4]} onOpen={onOpen} className="video-card video-card-5" />
        </div>
      </div>
    </section>
  );
}

function ContinuousCarousel({ onOpen }: { onOpen: (id: string) => void }) {
  const reveal = useReveal<HTMLDivElement>();
  const carouselItems = [...CAROUSEL.media, ...CAROUSEL.media];
  return (
    <div ref={reveal} className="carousel-showcase reveal">
      <div className="carousel-heading">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-index">02A</span> Formato contínuo
          </p>
          <h3>
            Uma imagem.
            <br />
            <em>Cinco momentos.</em>
          </h3>
        </div>
        <button type="button" className="outline-action" onClick={() => onOpen(CAROUSEL.id)}>
          Abrir projeto <ArrowUpRight size={15} />
        </button>
      </div>
      <div className="carousel-window" onClick={() => onOpen(CAROUSEL.id)}>
        <div className="carousel-track">
          {carouselItems.map((media, index) => (
            <img
              key={`${media.src}-${index}`}
              src={media.src}
              alt={`Carrossel @educoom — card ${(index % 5) + 1}`}
              loading="lazy"
              draggable={false}
            />
          ))}
        </div>
        <span className="carousel-hint">
          arraste ou passe o cursor <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );
}

function SocialSection({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <section className="content-section social-section section-frame">
      <SectionIntro
        index="03"
        label="Social & feed"
        title="Peças que"
        emphasis="explicam."
        text={
          <>
            Peças para <strong>explicar serviços, apresentar ofertas</strong> e dar consistência à
            presença digital. Conteúdo pensado para leitura rápida e ação clara.
          </>
        }
      />
      <div className="social-grid">
        {SOCIAL.map((work) => (
          <WorkCard key={work.id} work={work} onOpen={onOpen} />
        ))}
      </div>
      <ContinuousCarousel onOpen={onOpen} />
    </section>
  );
}

function ShirtsSection({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <section className="content-section shirts-section section-frame">
      <SectionIntro
        index="04"
        label="Landi Turbina"
        title="Objeto, tipo e"
        emphasis="personalidade."
        text={
          <>
            Identidade aplicada em produto: <strong>ilustração, tipografia e acabamento</strong>{" "}
            para uma linha reconhecível à primeira vista.
          </>
        }
      />
      <div className="shirt-grid">
        {SHIRTS.map((work) => (
          <WorkCard key={work.id} work={work} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

function Journey() {
  const reveal = useReveal<HTMLElement>();
  return (
    <section id="processo" className="content-section journey-section section-frame">
      <div ref={reveal} className="reveal journey-inner">
        <SectionIntro
          index="05"
          label="Trajetória"
          title="Do primeiro"
          emphasis="corte ao comando."
          text={
            <>
              Experiência construída em <strong>projetos reais</strong>: da execução diária à
              direção de criação e às decisões que fazem o trabalho avançar.
            </>
          }
        />
        <div className="timeline">
          <div className="timeline-axis" aria-hidden="true">
            <span>2022</span>
            <span>agora</span>
          </div>
          {TIMELINE.map(([period, role, org, description, logo], index) => {
            const logoAsset = TIMELINE_LOGOS[logo];
            return (
              <article
                className={`timeline-item ${index % 2 ? "is-offset" : ""}`}
                key={`${period}-${role}`}
              >
                <span className="timeline-dot" />
                <div className="timeline-period">
                  <span>{period}</span>
                  <small>{index === 0 ? "em andamento" : "experiência"}</small>
                </div>
                <div className="timeline-card">
                  <div className="timeline-card-top">
                    <span className="timeline-number">0{index + 1}</span>
                    <span className="timeline-marker">{index === 0 ? "agora" : "arquivo"}</span>
                  </div>
                  <h3>{role}</h3>
                  <div className="timeline-company">
                    <img
                      className={`timeline-logo timeline-logo-${logo}`}
                      src={logoAsset.src}
                      alt={`${logoAsset.alt} — ${org}`}
                      loading="lazy"
                    />
                    <p className="timeline-org">{org}</p>
                  </div>
                  <p className="timeline-description">{description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="about-section section-frame">
      <div className="about-photo">
        <img src={asset("gabriel-tinti.jpg")} alt="Gabriel Tinti" />
        <span>
          sobre
          <br />o autor
        </span>
      </div>
      <div className="about-copy">
        <p className="eyebrow">
          <span className="eyebrow-index">06</span> Sobre
        </p>
        <h2>
          A comunicação precisa funcionar antes de chamar atenção.{" "}
          <em>Eu organizo a mensagem, o formato e a entrega.</em>
        </h2>
        <p>
          Trabalho com edição, motion e design para marcas, campanhas e conteúdos de rotina. A
          experiência vai da operação — roteiro visual, corte, peça e acabamento — à direção de
          criação na Agência Gama.
        </p>
        <a className="text-link" href={LINKEDIN} target="_blank" rel="noreferrer">
          Mais no LinkedIn <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}

function ContactSection({ onOpen }: { onOpen: () => void }) {
  const ref = useRef<HTMLElement | null>(null);
  const reveal = useReveal<HTMLElement>();
  const [prompted, setPrompted] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || prompted) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPrompted(true);
          window.setTimeout(onOpen, 700);
          observer.disconnect();
        }
      },
      { threshold: 0.42 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [onOpen, prompted]);
  return (
    <section ref={ref} className="contact-section section-frame">
      <div ref={reveal} className="reveal contact-inner">
        <p className="eyebrow">
          <span className="eyebrow-index">07</span> Última coisa
        </p>
        <h2>
          Vamos colocar o projeto
          <br />
          em <em>produção?</em>
        </h2>
        <p>
          Se você já tem uma demanda ou ainda está organizando o que precisa ser feito, me escreva.
          A conversa começa pelo contexto e pelo próximo passo.
        </p>
        <button type="button" className="contact-trigger" onClick={onOpen}>
          Falar sobre o projeto <ChevronRight size={18} />
        </button>
        <div className="contact-details">
          <span>Gabriel Tinti · Avaré, SP</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>
      <div className="contact-scribble" aria-hidden="true">
        ✳
      </div>
    </section>
  );
}

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose, open]);
  if (!open) return null;
  return (
    <div
      className="contact-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      onClick={onClose}
    >
      <div className="contact-modal-card" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Fechar">
          <X size={18} />
        </button>
        <p className="eyebrow">
          <span className="eyebrow-index">contato</span> vamos começar
        </p>
        <h2 id="contact-title">Qual é a ideia?</h2>
        <p className="modal-copy">
          Me diga o que precisa ser resolvido. Eu respondo pessoalmente e alinhamos o próximo passo.
        </p>
        <div className="contact-options">
          <a href={WHATSAPP} target="_blank" rel="noreferrer">
            <MessageCircle size={19} />
            <span>
              <strong>WhatsApp</strong>
              <small>conversa rápida</small>
            </span>
            <ArrowUpRight size={16} />
          </a>
          <a href={`mailto:${EMAIL}`}>
            <Mail size={19} />
            <span>
              <strong>E-mail</strong>
              <small>{EMAIL}</small>
            </span>
            <ArrowUpRight size={16} />
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            <Linkedin size={19} />
            <span>
              <strong>LinkedIn</strong>
              <small>ver perfil</small>
            </span>
            <ArrowUpRight size={16} />
          </a>
        </div>
        <p className="modal-foot">
          <Check size={14} /> resposta pessoal, conversa objetiva
        </p>
      </div>
    </div>
  );
}

function WorkModal({
  work,
  index,
  onClose,
  onNavigate,
}: {
  work: Work | null;
  index: number;
  onClose: () => void;
  onNavigate: (direction: number) => void;
}) {
  const [mediaIndex, setMediaIndex] = useState(0);
  useEffect(() => setMediaIndex(0), [work?.id]);
  const isCarousel = work?.id === CAROUSEL.id;
  useEffect(() => {
    if (!work) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        if (isCarousel) {
          setMediaIndex((currentIndex) => (currentIndex + 1) % work.media.length);
        } else {
          onNavigate(1);
        }
      }
      if (event.key === "ArrowLeft") {
        if (isCarousel) {
          setMediaIndex(
            (currentIndex) => (currentIndex - 1 + work.media.length) % work.media.length,
          );
        } else {
          onNavigate(-1);
        }
      }
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [isCarousel, onClose, onNavigate, work]);
  if (!work) return null;
  const current = work.media[mediaIndex] ?? work.media[0];
  const moveCarousel = (direction: number) => {
    setMediaIndex(
      (currentIndex) => (currentIndex + direction + work.media.length) % work.media.length,
    );
  };
  return (
    <div className="work-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="work-modal-top">
        <span>
          {String(index + 1).padStart(2, "0")} / {String(ALL_WORKS.length).padStart(2, "0")}
        </span>
        <button type="button" onClick={onClose} aria-label="Fechar projeto">
          <X size={19} />
        </button>
      </div>
      <div
        className={`work-modal-content ${isCarousel ? "is-carousel" : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        {isCarousel ? (
          <div className="modal-feed-card">
            <div className="modal-feed-header">
              <span className="feed-avatar" aria-hidden="true">
                <i />
              </span>
              <span className="feed-account">
                <strong>@educoom</strong>
                <small>jornalismo & publicidade</small>
              </span>
              <span className="feed-position">
                {String(mediaIndex + 1).padStart(2, "0")} /{" "}
                {String(work.media.length).padStart(2, "0")}
              </span>
            </div>
            <div className="modal-feed-visual">
              <img src={current.src} alt={`${work.title} — ${current.label}`} />
              <button
                className="modal-carousel-arrow modal-carousel-prev"
                type="button"
                onClick={() => moveCarousel(-1)}
                aria-label="Card anterior"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                className="modal-carousel-arrow modal-carousel-next"
                type="button"
                onClick={() => moveCarousel(1)}
                aria-label="Próximo card"
              >
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="modal-feed-footer">
              <div className="feed-dots" aria-label="Navegação do carrossel">
                {work.media.map((item, itemIndex) => (
                  <button
                    className={itemIndex === mediaIndex ? "is-active" : ""}
                    type="button"
                    key={item.src}
                    onClick={() => setMediaIndex(itemIndex)}
                    aria-label={`Abrir card ${itemIndex + 1}`}
                  />
                ))}
              </div>
              <span>deslize para continuar</span>
            </div>
          </div>
        ) : (
          <div className={`modal-media modal-${work.ratio}`}>
            <MediaContent work={work} media={current} active />
          </div>
        )}
        <aside className="modal-info">
          <p className="work-client">
            {work.client} <span>· {work.year}</span>
          </p>
          <h2>{work.title}</h2>
          <p className="modal-description">{work.description}</p>
          <div className="modal-meta">
            <span>{work.ratio}</span>
            <span>{work.tag}</span>
          </div>
          {work.media.length > 1 && (
            <div className="modal-media-switch">
              {work.media.map((item, itemIndex) => (
                <button
                  className={itemIndex === mediaIndex ? "is-active" : ""}
                  type="button"
                  key={item.label ?? itemIndex}
                  onClick={() => setMediaIndex(itemIndex)}
                >
                  {item.label ?? `0${itemIndex + 1}`}
                </button>
              ))}
            </div>
          )}
        </aside>
      </div>
      <div className="work-modal-bottom">
        <button type="button" onClick={() => onNavigate(-1)}>
          <ArrowLeft size={17} /> anterior
        </button>
        <button type="button" onClick={() => onNavigate(1)}>
          próximo <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />;
}

function Portfolio() {
  useScrollProgress();
  const [openWork, setOpenWork] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const activeWork = useMemo(
    () => ALL_WORKS.find((work) => work.id === openWork) ?? null,
    [openWork],
  );
  const activeIndex = activeWork ? ALL_WORKS.findIndex((work) => work.id === activeWork.id) : 0;
  const navigateWork = useCallback((direction: number) => {
    setOpenWork((current) => {
      const currentIndex = ALL_WORKS.findIndex((work) => work.id === current);
      const nextIndex = (currentIndex + direction + ALL_WORKS.length) % ALL_WORKS.length;
      return ALL_WORKS[nextIndex].id;
    });
  }, []);
  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);
  const closeWork = useCallback(() => setOpenWork(null), []);
  return (
    <div className="portfolio-page">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <DisciplineStrip />
        <VideosSection onOpen={setOpenWork} />
        <SocialSection onOpen={setOpenWork} />
        <ShirtsSection onOpen={setOpenWork} />
        <Journey />
        <About />
        <ContactSection onOpen={openContact} />
      </main>
      <footer className="site-footer section-frame">
        <span>© {new Date().getFullYear()} Gabriel Tinti</span>
        <span>direção · edição · design</span>
        <a
          className="back-to-top"
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          voltar ao topo <ArrowUp size={14} />
        </a>
      </footer>
      <ContactModal open={contactOpen} onClose={closeContact} />
      <WorkModal
        work={activeWork}
        index={activeIndex}
        onClose={closeWork}
        onNavigate={navigateWork}
      />
    </div>
  );
}
