import { useEffect, useRef, useState } from "react";
import {
  Shield, Award, CheckCircle, Truck, Headphones, RefreshCw,
  Star, MapPin, Clock, Phone, Instagram, MessageCircle,
  ChevronRight, Smartphone, ArrowRight, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProducts, type Product } from "@/lib/products";

const WHATSAPP_NUMBER = "5584996727199";
const WHATSAPP_LINK = "https://l.instagram.com/?u=https%3A%2F%2Fwa.link%2Fkpxson%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn2dhWrJNwddkkKX-3U8BELAEus05emWHVp-L4WM_hS53b0yIBqaoNQNFb3LA_aem_wSPbuOrZezmdu1cOVwo_TA&e=AT42wlwyeY47c9FqT7rta1AnnRiK4hYiSHlYnoxwqc3rMkA1g7HqT0VPIbjnoc_7QkhcNbuZAuTTiwrL_DPkYyejIVNvjfdzPcy_s7D_QALaRiOcm70JcqrcUg";
const whatsappMsg = (_msg: string) => WHATSAPP_LINK;

// ─── Scroll animation hook ───
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("animate-fade-in-up"); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    el.style.opacity = "0";
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// Products loaded from shared store


// ─── Header ───
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-deep border-b border-foreground/10 transition-all shadow-md">
      <div className="container mx-auto flex items-center justify-between py-2 min-h-[4.5rem] md:min-h-[6.5rem]">
        <a href="#" className="flex items-center">
          <img src="/logo.png" alt="Império Apple" className="h-14 md:h-24 w-auto mix-blend-screen object-contain -ml-2" />
        </a>
        <div className="flex items-center gap-3">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="bg-gold text-dark-deep hover:bg-gold-light font-semibold">
              <MessageCircle className="h-4 w-4 mr-1 md:mr-2" /> <span className="hidden sm:inline">WhatsApp</span>
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ───
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-dark-deep">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[6px] scale-105"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-dark-deep/70 bg-gradient-to-t from-dark-deep via-dark-deep/60 to-dark-deep/80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-8">
            <Award className="h-4 w-4 text-gold" />
            <span className="text-sm text-gold font-medium">Loja Premium em Natal/RN</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            iPhones com qualidade,{" "}
            <span className="text-gold">procedência</span> e preço justo
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/60 mb-10 max-w-xl mx-auto">
            Novos e seminovos com garantia e confiança total. Os melhores preços do RN, direto para você.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto bg-gold text-dark-deep hover:bg-gold-light font-bold text-base px-8 py-6 shadow-lg shadow-gold/20">
                <MessageCircle className="h-5 w-5 mr-2" /> Falar no WhatsApp
              </Button>
            </a>
            <a href="#produtos">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/20 text-dark-deep hover:bg-primary-foreground/10 font-semibold px-8 py-6">
                Ver iPhones <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust ───
function TrustSection() {
  const ref = useScrollReveal();
  const stats = [
    { icon: Shield, label: "Garantia em todos os aparelhos" },
    { icon: Award, label: "Procedência comprovada" },
    { icon: CheckCircle, label: "Segurança na compra" },
  ];
  return (
    <section className="py-12 md:py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Mais de <span className="text-gold">2.000</span> clientes satisfeitos
          </h2>
          <p className="text-muted-foreground">Confiança que se comprova em cada venda</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {stats.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border hover:border-gold/30 transition-colors">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <Icon className="h-7 w-7 text-gold" />
              </div>
              <p className="font-semibold text-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Products ───
function ProductsSection() {
  const ref = useScrollReveal();
  const products = getProducts();
  return (
    <section id="produtos" className="py-12 md:py-20 bg-secondary" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Nossos <span className="text-gold">iPhones</span>
          </h2>
          <p className="text-muted-foreground">Escolha o seu e fale conosco pelo WhatsApp</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {products.map((p) => (
            <div key={p.id} className="group bg-card rounded-xl border border-border hover:border-gold/40 transition-all hover:shadow-lg hover:shadow-gold/5 overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-muted to-card flex items-center justify-center p-8 overflow-hidden">
                {p.image ? (
                  <img src={p.image} alt={p.model} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                ) : (
                  <Smartphone className="h-24 w-24 text-muted-foreground/30 group-hover:text-gold/40 transition-colors" />
                )}
              </div>
              <div className="p-5 text-center">
                <h3 className="font-bold text-lg text-foreground mb-1">{p.model}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.storage}</p>
                <a href={whatsappMsg(`Olá! Tenho interesse no ${p.model} ${p.storage}. Podemos negociar?`)} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-gold text-dark-deep hover:bg-gold-light font-semibold">
                    Quero esse <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Diferenciais ───
function DifferentialsSection() {
  const ref = useScrollReveal();
  const items = [
    { icon: Smartphone, title: "Preço competitivo", desc: "Atacado e varejo com os melhores preços do RN" },
    { icon: CheckCircle, title: "Aparelhos revisados", desc: "Todos testados e aprovados antes da venda" },
    { icon: Truck, title: "Entrega rápida", desc: "Receba seu iPhone o mais rápido possível" },
    { icon: RefreshCw, title: "Troca facilitada", desc: "Troque seu iPhone antigo por um novo" },
  ];
  return (
    <section id="diferenciais" className="py-20 bg-dark-deep" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-2">
            Por que escolher a <span className="text-gold">Império Apple</span>?
          </h2>
          <p className="text-primary-foreground/50">Diferenciais que fazem a diferença</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className={`p-6 rounded-xl bg-dark border border-primary-foreground/10 hover:border-gold/30 transition-colors ${title === "Troca facilitada" ? "lg:col-start-2" : ""}`}>
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-bold text-primary-foreground mb-2">{title}</h3>
              <p className="text-sm text-primary-foreground/50">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trade-in ───
function TradeInSection() {
  const ref = useScrollReveal();
  const steps = [
    { n: "1", title: "Envie os dados", desc: "Nos conte o modelo e estado do seu iPhone atual" },
    { n: "2", title: "Receba a avaliação", desc: "Avaliamos e informamos o valor de troca" },
    { n: "3", title: "Faça o upgrade", desc: "Use o valor como desconto no seu iPhone novo" },
  ];
  return (
    <section id="troque" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Troque seu <span className="text-gold">iPhone</span>
          </h2>
          <p className="text-muted-foreground">Processo simples, rápido e vantajoso</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mb-10">
          {steps.map(({ n, title, desc }) => (
            <div key={n} className="text-center">
              <div className="w-14 h-14 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-gold">{n}</span>
              </div>
              <h3 className="font-bold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href={whatsappMsg("Olá! Gostaria de avaliar meu iPhone para troca.")} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-gold text-dark-deep hover:bg-gold-light font-bold px-8 py-6 shadow-lg shadow-gold/20">
              <RefreshCw className="h-5 w-5 mr-2" /> Avaliar meu iPhone
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}


// ─── Location ───
function LocationSection() {
  const ref = useScrollReveal();
  return (
    <section id="localizacao" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            <span className="text-gold">Localização</span>
          </h2>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-foreground">Endereço</h3>
                <p className="text-muted-foreground text-sm">Shopping Seaway – Natal/RN</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-foreground">Horário</h3>
                <p className="text-muted-foreground text-sm">Seg a Sáb: 10h às 21h</p>
                <p className="text-muted-foreground text-sm">Dom: 14h às 20h</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-foreground">Contato</h3>
                <p className="text-muted-foreground text-sm">WhatsApp: (84) 99672-7199</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-border h-64">
            <iframe
              title="Localização Império Apple"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.0!2d-35.19!3d-5.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNTAnMjQuMCJTIDM1wrAxMSc0Mi4wIlc!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ───
function FinalCTA() {
  const ref = useScrollReveal();
  return (
    <section className="py-24 bg-dark-deep relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
          Garanta já o seu iPhone com <span className="text-gold">segurança</span>
        </h2>
        <p className="text-primary-foreground/50 text-lg mb-10 max-w-xl mx-auto">
          Preço que cabe no bolso, confiança que não tem preço. Fale com a gente agora.
        </p>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="bg-gold text-dark-deep hover:bg-gold-light font-bold text-lg px-10 py-7 shadow-xl shadow-gold/20">
            <MessageCircle className="h-6 w-6 mr-2" /> Falar no WhatsApp agora
          </Button>
        </a>
      </div>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer className="py-10 bg-dark border-t border-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <img src="/logo.png" alt="Império Apple" className="h-24 md:h-28 w-auto mix-blend-screen object-contain" />
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/imperioapplenatal?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-gold transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-gold transition-colors">
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
          <p className="text-xs text-primary-foreground/30">© 2026 Império Apple. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp ───
function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-primary-foreground" />
    </a>
  );
}

// ─── Main ───
export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <TrustSection />
      <ProductsSection />
      <DifferentialsSection />
      <TradeInSection />
      <LocationSection />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
