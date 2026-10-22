import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Heart,
  Instagram,
  Menu,
  MessageCircle,
  MapPin,
  Sparkles,
  SunMedium,
  UsersRound,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

const WHATSAPP_NUMBER = "";
const INSTAGRAM_URL = "https://www.instagram.com/paulabronze.estetica/";
const ADDRESS =
  "Rua Arlindo Ferreira de Aguiar, 182, Bairro Senador Arnon de Melo, Arapiraca — AL, CEP 57315-120";

const services = [
  {
    id: "bronze",
    title: "Bronze Paula Medeiros",
    description: "A luz que se veste na pele — natural, sofisticada, sob medida.",
    items: ["Bronze Sol", "Bronze Premium", "Bronze Redux", "Bronze Orgânico Virgínia"],
    image: "/assets/service-bronze.jpg",
  },
  {
    id: "leveza",
    title: "Experiência Leveza",
    description: "Menos retenção. Mais bem-estar.",
    items: ["Massagem Linfática", "Detox Corpo Inteiro", "Detox Abdominal"],
    image: "/assets/service-leveza.jpg",
  },
  {
    id: "redux",
    title: "Experiência Redux",
    description: "Contornos mais definidos.",
    items: ["Massagem Redux Abdominal", "Massagem Redux Corpo Inteiro"],
    image: "/assets/service-redux.jpg",
  },
  {
    id: "relax",
    title: "Experiência Relax",
    description: "Seu momento de pausa.",
    items: ["Massagem Relaxante", "Massagem Humanizada"],
    image: "/assets/service-relax.jpg",
  },
  {
    id: "termal",
    title: "Experiência Termal",
    description: "Conforto que aquece e transforma.",
    items: ["Massagem com Manta Abdominal", "Massagem com Manta Corpo Inteiro"],
    image: "/assets/service-termal.jpg",
  },
  {
    id: "pes",
    title: "Spa dos Pés",
    description: "Pequenos cuidados. Grandes sensações.",
    items: ["Plástica dos Pés", "Escalda-Pés", "Escalda-Pés com Massagem"],
    image: "/assets/service-pes.jpg",
  },
  {
    id: "pele",
    title: "Pele Perfeita",
    description: "Uma pele saudável transforma tudo.",
    items: ["Limpeza de Pele Essencial", "Limpeza de Pele Profunda"],
    image: "/assets/service-pele.jpg",
  },
  {
    id: "olhar",
    title: "Olhar",
    description: "Detalhes que valorizam sua expressão.",
    items: ["Designer de Sobrancelhas", "Designer com Henna", "Extensão de Cílios"],
    image: "/assets/service-olhar.jpg",
  },
] as const;

const differentiators = [
  { icon: SunMedium, label: "Cuidado personalizado" },
  { icon: Sparkles, label: "Experiências sob medida" },
  { icon: Heart, label: "Atendimento humanizado" },
  { icon: UsersRound, label: "Ambiente acolhedor" },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<(typeof services)[number] | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [notice, setNotice] = useState("");
  const [spaceIndex, setSpaceIndex] = useState(0);
  const bookingRef = useRef<HTMLDivElement>(null);

  const category = useMemo(
    () => services.find((service) => service.title === selectedCategory),
    [selectedCategory],
  );

  const openBooking = (service?: (typeof services)[number], procedure?: string) => {
    setNotice("");
    if (service) {
      setSelectedCategory(service.title);
      setSelectedProcedure(procedure ?? "");
    }
    setSelectedService(null);
    setBookingOpen(true);
  };

  useEffect(() => {
    if (!bookingOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBookingOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    window.setTimeout(() => bookingRef.current?.querySelector<HTMLInputElement>("input")?.focus(), 30);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [bookingOpen]);

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice("");

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const date = String(form.get("date") ?? "").trim();
    const time = String(form.get("time") ?? "").trim();

    if (!name || !selectedCategory || !selectedProcedure || !date || !time) {
      setNotice("Preencha todos os campos para continuar.");
      return;
    }

    if (!WHATSAPP_NUMBER) {
      setNotice("O WhatsApp ainda precisa ser configurado com o número oficial da Paula.");
      return;
    }

    const message = `Olá, Paula! Gostaria de solicitar um agendamento.\n\nNome: ${name}\nServiço: ${selectedCategory}\nProcedimento: ${selectedProcedure}\nData pretendida: ${date}\nHorário pretendido: ${time}\n\nPoderia confirmar a disponibilidade? Obrigada!`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const spaceImages = [
    "/assets/space-01.jpg",
    "/assets/space-02.jpg",
    "/assets/space-03.jpg",
  ];

  return (
    <main className="min-h-screen bg-[#F6EFE5] text-[#32180F]">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#32180F]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <button onClick={() => scrollTo("inicio")} className="flex items-center gap-3" aria-label="Paula Medeiros Estética - início">
            <img src="/assets/logo-paula-medeiros.png" alt="Paula Medeiros Estética" className="h-12 w-auto object-contain" />
          </button>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {["Início", "Sobre a Paula", "Serviços", "Espaço", "Depoimentos", "Contato"].map((item) => {
              const id = { Início: "inicio", "Sobre a Paula": "sobre", Serviços: "servicos", Espaço: "espaco", Depoimentos: "depoimentos", Contato: "contato" }[item];
              return (
                <button key={item} onClick={() => scrollTo(id)} className="text-[12px] font-medium tracking-wide text-[#F6EFE5]/80 transition hover:text-white">
                  {item}
                </button>
              );
            })}
          </nav>

          <button onClick={() => openBooking()} className="hidden rounded-full bg-[#C58A57] px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-[#A65F30] lg:inline-flex">
            <MessageCircle className="mr-2 h-4 w-4" />
            Agendar pelo WhatsApp
          </button>

          <button onClick={() => setMenuOpen((open) => !open)} className="rounded-full border border-white/15 p-2 text-[#F6EFE5] lg:hidden" aria-label="Abrir menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#32180F] px-5 py-5 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-4">
              {["Início", "Sobre a Paula", "Serviços", "Espaço", "Depoimentos", "Contato"].map((item) => {
                const id = { Início: "inicio", "Sobre a Paula": "sobre", Serviços: "servicos", Espaço: "espaco", Depoimentos: "depoimentos", Contato: "contato" }[item];
                return <button key={item} onClick={() => scrollTo(id)} className="text-left text-sm text-[#F6EFE5]">{item}</button>;
              })}
              <button onClick={() => { setMenuOpen(false); openBooking(); }} className="mt-2 rounded-full bg-[#C58A57] px-5 py-3 text-sm font-semibold text-white">Agendar pelo WhatsApp</button>
            </div>
          </div>
        )}
      </header>

      <section id="inicio" className="relative isolate overflow-hidden bg-[#32180F] pt-20 text-[#F6EFE5]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(197,138,87,0.24),transparent_34%),linear-gradient(110deg,#32180F_0%,#51291B_54%,#32180F_100%)]" />
        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-end gap-10 px-5 pb-0 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="z-10 max-w-xl pb-20 pt-20 lg:pb-28">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.38em] text-[#D8B57B]">Bronzeamento e estética</p>
            <h1 className="max-w-2xl font-serif text-5xl leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">A luz que se veste na pele.</h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-[#F6EFE5]/75 sm:text-lg">Bronzeamento e cuidados estéticos com uma experiência leve, sofisticada e feita para você.</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button onClick={() => openBooking()} className="inline-flex items-center rounded-full bg-[#C58A57] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#A65F30]">
                <MessageCircle className="mr-2 h-4 w-4" /> Agendar pelo WhatsApp
              </button>
              <button onClick={() => scrollTo("servicos")} className="inline-flex items-center rounded-full border border-[#D8B57B]/60 px-6 py-3.5 text-sm font-medium text-[#F6EFE5] transition hover:bg-white/5">
                Conheça nossos serviços <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="relative flex min-h-[580px] items-end justify-center lg:min-h-[650px]">
            <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-[#C58A57]/10 blur-3xl" />
            <img src="/assets/paula-hero.jpg" alt="Paula Medeiros usando blazer branco e camisa preta" className="relative z-10 max-h-[650px] w-full object-contain object-bottom drop-shadow-2xl" />
            <div className="absolute bottom-16 right-2 z-20 hidden text-right lg:block">
              <p className="font-serif text-4xl italic text-[#D8B57B]">Paula Medeiros</p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.32em] text-[#F6EFE5]/65">Beleza · autoestima · bem-estar</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#C58A57]/25 bg-[#F6EFE5]" aria-label="Diferenciais">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {differentiators.map(({ icon: Icon, label }, index) => (
            <div key={label} className={`flex items-center gap-3 px-5 py-7 ${index < 3 ? "lg:border-r lg:border-[#C58A57]/30" : ""}`}>
              <Icon className="h-6 w-6 shrink-0 stroke-[1.25] text-[#A65F30]" />
              <span className="text-xs leading-5 text-[#51291B]/80">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="servicos" className="scroll-mt-20 bg-[#F6EFE5] py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.7fr] lg:items-end">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A65F30]">Nossos serviços</p>
              <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Cuide de você de dentro pra fora.</h2>
            </div>
            <div className="flex items-end justify-between gap-6">
              <p className="max-w-xl text-sm leading-6 text-[#51291B]/75">Cada detalhe é pensado para realçar sua beleza, cuidar do seu bem-estar e proporcionar uma experiência única.</p>
              <button onClick={() => openBooking()} className="hidden shrink-0 rounded-full bg-[#A65F30] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#51291B] sm:inline-flex">Agendar minha experiência</button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article key={service.id} className="group overflow-hidden rounded-2xl border border-[#C58A57]/25 bg-white/45 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#32180F]/5">
                <div className="relative h-40 overflow-hidden bg-[#51291B]">
                  <img src={service.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#32180F]/65 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-[#32180F]/35 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">Experiência</span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl">{service.title}</h3>
                  <p className="mt-2 min-h-12 text-xs leading-5 text-[#51291B]/70">{service.description}</p>
                  <button onClick={() => setSelectedService(service)} className="mt-5 inline-flex items-center text-xs font-semibold text-[#A65F30] transition hover:text-[#32180F]">Conhecer serviços <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="sobre" className="scroll-mt-20 bg-[#E8D8C5]/50">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="relative min-h-[520px] overflow-hidden bg-[#51291B]">
            <img src="/assets/paula-about.jpg" alt="Paula Medeiros usando blazer claro" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#32180F]/45 to-transparent" />
          </div>
          <div className="flex items-center px-6 py-20 sm:px-10 lg:px-16">
            <div className="max-w-xl">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A65F30]">Quem sou eu</p>
              <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Prazer, sou Paula Medeiros.</h2>
              <div className="mt-7 space-y-4 text-sm leading-7 text-[#51291B]/75">
                <p>Realçar a beleza que já existe em você é o que inspira cada experiência. Na Paula Medeiros Estética, cada atendimento é pensado para valorizar o cuidado pessoal, a autoestima e o bem-estar.</p>
                <p>Um espaço para desacelerar, cuidar de você e viver uma experiência feita com atenção aos detalhes.</p>
              </div>
              <button onClick={() => openBooking()} className="mt-8 inline-flex items-center rounded-full bg-[#A65F30] px-6 py-3.5 text-xs font-semibold text-white transition hover:bg-[#51291B]">Agende sua experiência <ArrowRight className="ml-2 h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </section>

      <section id="espaco" className="scroll-mt-20 bg-[#32180F] py-24 text-[#F6EFE5] lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.7fr] lg:items-end">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D8B57B]">Nosso espaço</p>
              <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Um ambiente pensado para o seu bem-estar.</h2>
              <p className="mt-6 max-w-md text-sm leading-6 text-[#F6EFE5]/65">Conheça o espaço onde cada experiência é preparada para receber você.</p>
              <button onClick={() => openBooking()} className="mt-8 inline-flex items-center rounded-full border border-[#D8B57B]/60 px-5 py-3 text-xs font-semibold text-[#F6EFE5]">Conheça nosso espaço <ArrowRight className="ml-2 h-4 w-4" /></button>
            </div>
            <div>
              <div className="grid grid-cols-3 gap-3">
                {spaceImages.map((src, index) => (
                  <button key={src} onClick={() => setSpaceIndex(index)} className={`relative aspect-[4/5] overflow-hidden rounded-xl border transition ${spaceIndex === index ? "border-[#D8B57B]" : "border-white/10"}`} aria-label={`Abrir imagem do espaço ${index + 1}`}>
                    <img src={src} alt="Foto do espaço — substituir pelo arquivo real" className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-3 text-left text-[10px] text-white/70">Foto do espaço</div>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[11px] text-[#F6EFE5]/45">As imagens desta galeria são placeholders e devem ser substituídas pelas fotos reais do estabelecimento.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="depoimentos" className="scroll-mt-20 bg-[#F6EFE5] py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:items-center">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A65F30]">Depoimentos</p>
              <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Quem já viveu, recomenda.</h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-[#51291B]/70">A satisfação das nossas clientes é a prova de que estamos no caminho certo.</p>
            </div>
            <div className="rounded-2xl border border-dashed border-[#C58A57]/50 bg-white/35 p-10 text-center">
              <Heart className="mx-auto h-8 w-8 text-[#A65F30]" />
              <h3 className="mt-5 font-serif text-2xl">Depoimentos reais em breve.</h3>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#51291B]/65">A seção está preparada para receber avaliações autorizadas de clientes, sem inventar nomes, notas ou textos.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#51291B] py-14 text-[#F6EFE5]">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(216,181,123,.35), transparent 28%), radial-gradient(circle at 80% 50%, rgba(197,138,87,.22), transparent 30%)" }} />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-5 sm:flex-row sm:items-center lg:px-8">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#D8B57B]">Pronta para se sentir ainda mais linda?</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Seu próximo momento de cuidado começa aqui.</h2>
            <p className="mt-2 text-sm text-[#F6EFE5]/65">Escolha sua experiência e fale conosco para combinar seu horário.</p>
          </div>
          <button onClick={() => openBooking()} className="inline-flex shrink-0 items-center rounded-full bg-[#C58A57] px-6 py-3.5 text-xs font-semibold text-white transition hover:bg-[#A65F30]">Agendar minha experiência <ArrowRight className="ml-2 h-4 w-4" /></button>
        </div>
      </section>

      <footer id="contato" className="scroll-mt-20 bg-[#24100A] py-14 text-[#F6EFE5]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr_1fr_1.2fr]">
            <div>
              <img src="/assets/logo-paula-medeiros.png" alt="Paula Medeiros Estética" className="h-16 w-auto object-contain object-left" />
              <p className="mt-5 max-w-xs text-xs leading-6 text-[#F6EFE5]/55">Beleza, autoestima e bem-estar em uma experiência feita para você.</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D8B57B]">Contato</p>
              <div className="mt-5 space-y-4 text-xs text-[#F6EFE5]/70">
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white"><Instagram className="h-4 w-4" /> @paulabronze.estetica</a>
                <button onClick={() => openBooking()} className="flex items-center gap-3 hover:text-white"><MessageCircle className="h-4 w-4" /> Agendamento pelo WhatsApp</button>
              </div>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D8B57B]">Endereço</p>
              <p className="mt-5 flex gap-3 text-xs leading-6 text-[#F6EFE5]/70"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{ADDRESS}</p>
              <p className="mt-5 flex gap-3 text-xs text-[#F6EFE5]/55"><Clock3 className="h-4 w-4 shrink-0" />Horário de funcionamento a confirmar.</p>
            </div>
            <div className="rounded-2xl border border-[#D8B57B]/20 bg-[#32180F] p-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D8B57B]">Localização</p>
              <p className="mt-4 text-xs leading-5 text-[#F6EFE5]/60">Abra o endereço no Google Maps para conferir a rota.</p>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full bg-[#C58A57] px-5 py-3 text-xs font-semibold text-white">Ver no Google Maps</a>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[10px] text-[#F6EFE5]/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Paula Medeiros Estética. Todos os direitos reservados.</p>
            <div className="flex gap-5"><a href="#" onClick={(e) => e.preventDefault()}>Política de privacidade</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a></div>
          </div>
        </div>
      </footer>

      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1A0B07]/70 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-label={selectedService.title}>
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-[#F6EFE5] p-7 shadow-2xl sm:rounded-3xl sm:p-9">
            <div className="flex items-start justify-between gap-5">
              <div><p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A65F30]">Experiência</p><h2 className="mt-2 font-serif text-3xl">{selectedService.title}</h2><p className="mt-3 text-sm leading-6 text-[#51291B]/70">{selectedService.description}</p></div>
              <button onClick={() => setSelectedService(null)} className="rounded-full border border-[#C58A57]/30 p-2" aria-label="Fechar"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {selectedService.items.map((item) => (
                <button key={item} onClick={() => openBooking(selectedService, item)} className="flex items-center justify-between rounded-xl border border-[#C58A57]/25 bg-white/50 p-4 text-left text-sm transition hover:border-[#A65F30] hover:bg-white"><span>{item}</span><ArrowRight className="h-4 w-4 text-[#A65F30]" /></button>
              ))}
            </div>
          </div>
        </div>
      )}

      {bookingOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#1A0B07]/75 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-label="Solicitar agendamento">
          <div ref={bookingRef} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-[#F6EFE5] p-7 shadow-2xl sm:rounded-3xl sm:p-9">
            <div className="flex items-start justify-between gap-5">
              <div><p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A65F30]">Agendamento</p><h2 className="mt-2 font-serif text-3xl sm:text-4xl">Vamos combinar sua experiência.</h2><p className="mt-3 text-sm leading-6 text-[#51291B]/65">O horário informado é uma solicitação e será confirmado pela Paula.</p></div>
              <button onClick={() => setBookingOpen(false)} className="rounded-full border border-[#C58A57]/30 p-2" aria-label="Fechar"><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={submitBooking} className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2"><span className="mb-2 block text-xs font-semibold">Nome completo</span><input name="name" required className="w-full rounded-xl border border-[#C58A57]/30 bg-white/60 px-4 py-3 text-sm outline-none transition focus:border-[#A65F30]" placeholder="Seu nome" /></label>
              <label><span className="mb-2 block text-xs font-semibold">Categoria do serviço</span><select required value={selectedCategory} onChange={(event) => { setSelectedCategory(event.target.value); setSelectedProcedure(""); }} className="w-full rounded-xl border border-[#C58A57]/30 bg-white/60 px-4 py-3 text-sm outline-none focus:border-[#A65F30]"><option value="">Selecione</option>{services.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}</select></label>
              <label><span className="mb-2 block text-xs font-semibold">Procedimento desejado</span><select required value={selectedProcedure} onChange={(event) => setSelectedProcedure(event.target.value)} disabled={!category} className="w-full rounded-xl border border-[#C58A57]/30 bg-white/60 px-4 py-3 text-sm outline-none focus:border-[#A65F30] disabled:cursor-not-allowed disabled:opacity-50"><option value="">Selecione</option>{category?.items.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
              <label><span className="mb-2 block text-xs font-semibold">Data pretendida</span><input name="date" type="date" required min={new Date().toISOString().split("T")[0]} className="w-full rounded-xl border border-[#C58A57]/30 bg-white/60 px-4 py-3 text-sm outline-none focus:border-[#A65F30]" /></label>
              <label><span className="mb-2 block text-xs font-semibold">Horário pretendido</span><input name="time" type="time" required className="w-full rounded-xl border border-[#C58A57]/30 bg-white/60 px-4 py-3 text-sm outline-none focus:border-[#A65F30]" /></label>
              {notice && <p className="sm:col-span-2 rounded-xl border border-[#A65F30]/30 bg-[#A65F30]/10 px-4 py-3 text-xs leading-5 text-[#51291B]" role="alert">{notice}</p>}
              <div className="sm:col-span-2 flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end"><button type="button" onClick={() => setBookingOpen(false)} className="rounded-full border border-[#C58A57]/35 px-6 py-3 text-sm font-medium">Fechar</button><button type="submit" className="inline-flex items-center justify-center rounded-full bg-[#A65F30] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#51291B]"><MessageCircle className="mr-2 h-4 w-4" />Continuar pelo WhatsApp</button></div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
