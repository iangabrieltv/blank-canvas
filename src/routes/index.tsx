import { useState, type FormEvent } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowRight, Clock3, Heart, Instagram, MapPin, Menu, MessageCircle, Phone, Sparkle, Sprout, Star, SunMedium, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { navigation, services, site, spaceImages, testimonials, type Service } from '@/lib/site-content';
import bookingBackground from '@/assets/booking-clean.png';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Paula Medeiros Estética | A luz que se veste na pele' },
    { name: 'description', content: site.heroDescription },
    { property: 'og:title', content: 'Paula Medeiros Estética | Bronzeamento e bem-estar' },
    { property: 'og:description', content: site.heroDescription },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [procedure, setProcedure] = useState('');
  const [notice, setNotice] = useState('');
  const [gallery, setGallery] = useState<number | null>(null);
  const [spaceOffset, setSpaceOffset] = useState(0);
  const [reviewOffset, setReviewOffset] = useState(0);
  const [storyOpen, setStoryOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const scrollTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const openBooking = (service?: Service, item?: string) => {
    setSelectedService(null); setNotice(''); setCategory(service?.title ?? ''); setProcedure(item ?? ''); setBookingOpen(true);
  };
  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!site.whatsappNumber) { setNotice('O número completo do WhatsApp precisa ser confirmado pela Paula para enviar seu agendamento.'); return; }
    const data = new FormData(event.currentTarget);
    const message = `Olá, Paula! Gostaria de agendar.\nNome: ${data.get('name')}\nServiço: ${category}\nProcedimento: ${procedure}\nData: ${data.get('date')}\nHorário: ${data.get('time')}\nPode confirmar a disponibilidade?`;
    window.open(`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };
  const bookingButton = (className = '') => <Button className={`pill ${className}`} onClick={() => openBooking()}><MessageCircle />Agendar pelo WhatsApp</Button>;
  const currentCategory = services.find((service) => service.title === category);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

  return <main className="paula-site">
    <section id="inicio" className="hero-section">
      <img src={site.images.hero} className="hero-image" alt="Paula Medeiros com blazer branco e camisa preta" />
      <header className="site-header page-width">
        <Button variant="ghost" className="logo-button" onClick={() => scrollTo('inicio')} aria-label="Paula Medeiros — início"><img src={site.images.logo} alt="Paula Medeiros Estética" /></Button>
        <nav aria-label="Navegação principal" className="desktop-nav">{navigation.map((item) => <Button key={item.id} variant="ghost" className={`nav-link ${item.id === 'inicio' ? 'active' : ''}`} onClick={() => scrollTo(item.id)}>{item.label}</Button>)}</nav>
        {bookingButton('header-booking')}
        <Button variant="ghost" size="icon" className="mobile-menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        {menuOpen && <nav className="mobile-nav" aria-label="Navegação no celular">{navigation.map((item) => <Button key={item.id} variant="ghost" onClick={() => scrollTo(item.id)}>{item.label}</Button>)}</nav>}
      </header>
      <div className="hero-body page-width"><div className="hero-copy">
        <p className="eyebrow">Bronzeamento e estética</p>
        <h1>{site.heroTitle}</h1>
        <p className="hero-description">{site.heroDescription}</p>
        <div className="hero-actions">{bookingButton()}<Button variant="ghost" className="text-action" onClick={() => scrollTo('servicos')}>Conheça nossos serviços <ArrowRight /></Button></div>
      </div></div>
    </section>
    <section className="benefits-band" aria-label="Diferenciais"><div className="page-width benefits-grid">
      {[{ Icon: SunMedium, text: <>Bronzeamento natural<br />com segurança</> }, { Icon: Sprout, text: <>Procedimentos estéticos<br />personalizados</> }, { Icon: Heart, text: <>Atendimento humanizado<br />e exclusivo</> }, { Icon: Sparkle, text: <>Ambiente acolhedor<br />e sofisticado</> }].map(({ Icon, text }, i) => <div className="benefit" key={i}><Icon /><p>{text}</p></div>)}
    </div></section>
    <section id="servicos" className="services-section"><div className="page-width services-layout">
      <div className="section-intro"><p className="eyebrow">Nossos serviços</p><h2>Cuide de você<br />de dentro pra fora.</h2><p>Aqui, cada detalhe é pensado para realçar sua beleza, cuidar do seu bem-estar e proporcionar uma experiência única.</p>{bookingButton()}</div>
      <div className="services-grid">{services.map((service) => <article key={service.id} className="service-card"><img src={service.image} alt={service.title} /><div className="service-copy"><h3>{service.title}</h3><p>{service.description}</p><Button variant="link" onClick={() => setSelectedService(service)} className="learn-more">Saiba mais <ArrowRight /></Button></div></article>)}</div>
    </div></section>
    <section id="sobre" className="about-section"><img className="about-portrait" src={site.images.about} alt="Paula Medeiros usando blazer claro" /><div className="about-copy"><p className="eyebrow">Quem sou eu</p><h2>Paula Medeiros</h2><p className="eyebrow about-subtitle">Beleza, cuidado e propósito</p>{site.about.map((text) => <p key={text}>{text}</p>)}<Button className="pill" onClick={() => setStoryOpen(true)}>Conheça minha história <ArrowRight /></Button></div><img className="about-signature" src={site.images.signature} alt="Realçar a beleza que já existe em você. Paula Medeiros." /></section>
    <section id="espaco" className="space-section"><div className="page-width space-layout"><div className="section-intro"><p className="eyebrow">Nosso espaço</p><h2>Um ambiente pensado<br />para o seu bem-estar</h2><p>Cada detalhe do nosso espaço foi planejado para proporcionar conforto, privacidade e uma experiência única, do início ao fim.</p><Button className="pill" onClick={() => setGallery(0)}>Conheça nosso espaço <ArrowRight /></Button></div><div className="space-grid">{spaceImages.map((_, index) => { const actual = (index + spaceOffset) % spaceImages.length; const image = spaceImages[actual]; if (!image) return null; return <Button variant="ghost" key={index} className="space-photo" onClick={() => setGallery(actual)} aria-label={`Ampliar ${image.alt}`}><img src={image.image} alt={image.alt} /></Button>; })}</div><Button variant="ghost" size="icon" className="round-arrow space-next" aria-label="Próximas fotos" onClick={() => setSpaceOffset((v) => (v + 1) % 3)}><ArrowRight /></Button></div></section>
    <section id="depoimentos" className="testimonials-section"><div className="page-width testimonials-layout"><div className="section-intro"><p className="eyebrow">Depoimentos</p><h2>Quem já viveu,<br />recomenda.</h2><p>A satisfação das nossas clientes é a prova de que estamos no caminho certo.</p><Button variant="outline" className="pill outline-pill" onClick={() => setReviewsOpen(true)}>Ver mais depoimentos</Button></div><div className="testimonials-grid">{testimonials.map((_, index) => { const review = testimonials[(index + reviewOffset) % testimonials.length]; if (!review) return null; return <article className="review-card" key={review.name}><img src={review.image} alt={review.name} /><blockquote>“{review.text}”</blockquote><p className="review-name">– {review.name}</p><div className="stars" aria-label="5 estrelas">{Array.from({ length: 5 }, (_, i) => <Star key={i} />)}</div></article>; })}</div><Button variant="ghost" size="icon" className="round-arrow review-next" aria-label="Próximos depoimentos" onClick={() => setReviewOffset((v) => (v + 1) % 3)}><ArrowRight /></Button></div></section>
    <section className="booking-band"><img src={bookingBackground} alt="" /><div className="page-width booking-band-content"><div><p className="eyebrow">Pronta para se sentir ainda mais linda?</p><h2>Agende seu horário</h2><p>Escolha o serviço, o melhor horário e fale comigo pelo WhatsApp.</p></div>{bookingButton()}</div></section>
    <footer id="contato"><div className="page-width footer-main"><img className="footer-logo" src={site.images.logo} alt={site.name} /><div><p className="eyebrow">Contato</p><p className="contact-line"><Phone />{site.phoneLabel}</p><div className="footer-socials"><Button variant="ghost" size="icon" asChild aria-label="Instagram"><a href={site.instagram} target="_blank" rel="noreferrer"><Instagram /></a></Button><Button variant="ghost" size="icon" aria-label="WhatsApp" onClick={() => openBooking()}><MessageCircle /></Button></div></div><div><p className="eyebrow">Endereço</p><p className="contact-line"><MapPin /><span>Rua Arlindo Ferreira de Aguiar, 182<br />Senador Arnon de Melo<br />Arapiraca - AL, CEP 57315-120</span></p></div><div><p className="eyebrow">Horário de funcionamento</p><p className="contact-line"><Clock3 /><span>{site.days}<br />{site.hours}</span></p></div><a className="map-link" href={mapUrl} target="_blank" rel="noreferrer" aria-label="Ver endereço no Google Maps"><img src={site.images.map} alt="Mapa de localização do espaço" /></a></div><div className="footer-bottom"><div className="page-width"><p>© 2026 Paula Medeiros Estética. Todos os direitos reservados.</p><div><span>Siga nossas redes</span><a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a><Button variant="ghost" size="icon" onClick={() => openBooking()} aria-label="WhatsApp"><MessageCircle /></Button></div></div></div></footer>
    <Dialog open={selectedService !== null} onOpenChange={(open) => { if (!open) setSelectedService(null); }}><DialogContent className="site-dialog"><DialogTitle>{selectedService?.title}</DialogTitle><DialogDescription>{selectedService?.description}</DialogDescription><div className="procedure-list">{selectedService?.items.map((item) => <Button key={item} variant="outline" onClick={() => { if (selectedService) openBooking(selectedService, item); }}>{item}<ArrowRight /></Button>)}</div></DialogContent></Dialog>
    <Dialog open={bookingOpen} onOpenChange={setBookingOpen}><DialogContent className="site-dialog booking-dialog"><DialogTitle>Agende seu horário</DialogTitle><DialogDescription>O horário será confirmado pela Paula.</DialogDescription><form onSubmit={submitBooking} className="booking-form"><label className="full-field">Nome completo<input name="name" placeholder="Seu nome" required /></label><label>Serviço<select required value={category} onChange={(e) => { setCategory(e.target.value); setProcedure(''); }}><option value="">Selecione</option>{services.map((s) => <option key={s.id}>{s.title}</option>)}</select></label><label>Procedimento<select required value={procedure} onChange={(e) => setProcedure(e.target.value)} disabled={!currentCategory}><option value="">Selecione</option>{currentCategory?.items.map((item) => <option key={item}>{item}</option>)}</select></label><label>Data pretendida<input type="date" name="date" required /></label><label>Horário pretendido<input type="time" name="time" required /></label>{notice && <p className="booking-notice full-field" role="alert">{notice}</p>}<Button className="pill full-field" type="submit"><MessageCircle />Continuar pelo WhatsApp</Button></form></DialogContent></Dialog>
    <Dialog open={gallery !== null} onOpenChange={(open) => { if (!open) setGallery(null); }}><DialogContent className="site-dialog gallery-dialog"><DialogTitle>Nosso espaço</DialogTitle><DialogDescription>{gallery !== null ? spaceImages[gallery]?.alt : ''}</DialogDescription>{gallery !== null && <img src={spaceImages[gallery]?.image} alt={spaceImages[gallery]?.alt} />}<Button variant="outline" onClick={() => setGallery((v) => ((v ?? 0) + 1) % 3)}>Próxima foto <ArrowRight /></Button></DialogContent></Dialog>
    <Dialog open={storyOpen} onOpenChange={setStoryOpen}><DialogContent className="site-dialog"><DialogTitle>Paula Medeiros</DialogTitle><DialogDescription>Beleza, cuidado e propósito</DialogDescription>{site.about.map((text) => <p key={text}>{text}</p>)}{bookingButton()}</DialogContent></Dialog>
    <Dialog open={reviewsOpen} onOpenChange={setReviewsOpen}><DialogContent className="site-dialog"><DialogTitle>Quem já viveu, recomenda.</DialogTitle><DialogDescription>Depoimentos</DialogDescription>{testimonials.map((review) => <blockquote className="expanded-review" key={review.name}>“{review.text}”<cite>– {review.name}</cite></blockquote>)}</DialogContent></Dialog>
  </main>;
}
