import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Menu, MessageCircle, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroArchitecture from "@/assets/hero-architecture.jpg";
import officeEditorial from "@/assets/office-editorial.jpg";
import perspectiveDetail from "@/assets/perspective-detail.jpg";

const nav = [
  ["Início", "inicio"], ["O Escritório", "escritorio"], ["Atuação", "atuacao"],
  ["Diferenciais", "diferenciais"], ["Conteúdo", "conteudo"], ["Contato", "contato"],
] as const;

const practices = [
  { number: "01", title: "Área de atuação 01", text: "Conteúdo a ser definido conforme as áreas de atuação reais do escritório." },
  { number: "02", title: "Área de atuação 02", text: "Conteúdo a ser definido conforme as áreas de atuação reais do escritório." },
  { number: "03", title: "Área de atuação 03", text: "Conteúdo a ser definido conforme as áreas de atuação reais do escritório." },
  { number: "04", title: "Área de atuação 04", text: "Conteúdo a ser definido conforme as áreas de atuação reais do escritório." },
];

const differentiators = [
  ["01", "Estratégia", "Cada demanda é compreendida em seu contexto antes de qualquer definição de caminho."],
  ["02", "Precisão", "Análise criteriosa, comunicação objetiva e decisões fundamentadas."],
  ["03", "Proximidade", "Relações profissionais conduzidas com presença, escuta e responsabilidade."],
  ["04", "Confiança", "Clareza em cada etapa e absoluto respeito à singularidade de cada situação."],
] as const;

const articles = ["Análise jurídica em preparação", "Perspectiva institucional em preparação", "Conteúdo jurídico em preparação"];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: .9, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

function ArrowLink({ children, dark = false, onClick }: { children: React.ReactNode; dark?: boolean; onClick?: () => void }) {
  return <Button variant={dark ? "luminous" : "editorial"} size="xl" onClick={onClick}>{children}<ArrowUpRight /></Button>;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return <>
    <motion.header initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .8 }} className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#inicio" className="brand" aria-label="Voltar ao início"><span>NA</span><span className="brand-name">NOME DA ADVOCACIA</span></a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {nav.map(([label, id]) => <a key={id} href={`#${id}`} className="nav-link">{label}</a>)}
        <Button variant="header" size="lg" onClick={() => scrollTo("contato")}>Falar com um advogado <ArrowUpRight /></Button>
      </nav>
      <Button variant="menu" size="iconLg" className="mobile-menu-button" aria-label="Abrir menu" onClick={() => setOpen(true)}><Menu /></Button>
    </motion.header>
    <AnimatePresence>
      {open && <motion.div className="mobile-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: .65, ease: [.76, 0, .24, 1] }}>
        <div className="mobile-menu-top"><span className="brand"><span>NA</span><span className="brand-name">NOME DA ADVOCACIA</span></span><Button variant="menuDark" size="iconLg" aria-label="Fechar menu" onClick={() => setOpen(false)}><X /></Button></div>
        <nav aria-label="Menu móvel">{nav.map(([label, id], index) => <motion.a key={id} href={`#${id}`} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 + index * .07 }}>{label}<span>0{index + 1}</span></motion.a>)}</nav>
        <Button variant="luminous" size="xl" onClick={() => { setOpen(false); scrollTo("contato"); }}>Falar com um advogado <ArrowUpRight /></Button>
      </motion.div>}
    </AnimatePresence>
  </>;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, .25], [1, 0]);
  return <section ref={ref} id="inicio" className="hero">
    <div className="ambient-lines" aria-hidden="true"><i /><i /><i /></div>
    <div className="hero-content">
      <motion.div className="hero-copy" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: .13, delayChildren: .45 } } }}>
        <motion.p className="eyebrow hero-eyebrow" variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: .7 } } }}>Advocacia estratégica <span>—</span> Brasil</motion.p>
        <div className="hero-title-wrap"><motion.h1 variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 1, ease: [.22, 1, .36, 1] } } }}>Direito.<br /><em>Estratégia.</em><br />Precisão.</motion.h1></div>
        <motion.p className="hero-description" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .8 } } }}>Assessoria jurídica conduzida com rigor técnico, visão estratégica e atenção absoluta a cada decisão.</motion.p>
        <motion.div className="hero-actions" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .8 } } }}><ArrowLink dark onClick={() => scrollTo("contato")}>Falar com um advogado</ArrowLink><Button variant="heroGhost" size="xl" onClick={() => scrollTo("escritorio")}>Conhecer o escritório <ArrowDown /></Button></motion.div>
      </motion.div>
      <motion.div className="hero-visual" initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }} animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }} transition={{ delay: .55, duration: 1.25, ease: [.76, 0, .24, 1] }}>
        <motion.img src={heroArchitecture} alt="Interior contemporâneo com concreto, pedra e vidro" width={1600} height={1200} style={{ y: imageY }} />
        <span className="image-index">01 / 03</span>
      </motion.div>
    </div>
    <motion.div className="scroll-indicator" style={{ opacity: indicatorOpacity }}><span>Scroll</span><i /></motion.div>
  </section>;
}

function Positioning() {
  return <section className="positioning section-pad"><div className="container editorial-grid">
    <Reveal><p className="eyebrow dark">Nosso posicionamento</p></Reveal>
    <Reveal className="positioning-copy"><h2>Mais do que orientação jurídica.<br /><em>Estratégia.</em></h2><div className="two-col-copy"><p>Compreendemos o Direito como instrumento de clareza para decisões complexas. Cada questão exige leitura profunda, pensamento independente e uma estratégia construída sob medida.</p><p>Nossa atuação une rigor técnico, proximidade e responsabilidade — sempre com comunicação direta e absoluto respeito à singularidade de cada contexto.</p></div></Reveal>
  </div></section>;
}

function Principles() {
  const items = ["Atuação estratégica", "Atendimento personalizado", "Análise individualizada", "Comunicação clara"];
  return <section className="principles"><div className="container principles-grid">{items.map((item, i) => <Reveal key={item} delay={i * .08} className="principle"><span>0{i + 1}</span><p>{item}</p></Reveal>)}</div></section>;
}

function Practices() {
  return <section id="atuacao" className="section-pad practices"><div className="container"><Reveal className="section-heading"><p className="eyebrow dark">Áreas de atuação</p><h2>Conhecimento que orienta<br />decisões <em>relevantes.</em></h2><p>As áreas abaixo são espaços reservados para as especialidades reais do escritório.</p></Reveal>
    <div className="practice-list">{practices.map((item) => <div className="practice-row" key={item.number}><span className="practice-number">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><ArrowUpRight /><div className="practice-mobile-text">{item.text}</div></div>)}</div>
  </div></section>;
}

function Statement() {
  return <section className="dark-statement"><div className="statement-grid" aria-hidden="true" /><Reveal className="container statement-inner"><p className="eyebrow">Clareza em cada escolha</p><h2>Decisões importantes<br />exigem <em>precisão.</em></h2><div className="statement-foot"><span>Estratégia</span><span>Responsabilidade</span><span>Confiança</span></div></Reveal></section>;
}

function Office() {
  return <section id="escritorio" className="section-pad office"><div className="container office-grid">
    <Reveal className="office-image"><img src={officeEditorial} alt="Escada escultural em ambiente corporativo contemporâneo" width={1200} height={1504} loading="lazy" /><span>Arquitetura como expressão de precisão</span></Reveal>
    <Reveal className="office-copy"><p className="eyebrow dark">O escritório</p><h2>Uma advocacia construída sobre estratégia, confiança e <em>precisão.</em></h2><p>Trabalhamos a partir de uma compreensão integral de cada demanda. A técnica sustenta nossas análises; a estratégia define o caminho; a proximidade orienta cada relação.</p><p>Esta apresentação institucional será complementada com a história, a visão e os compromissos reais do escritório.</p><ArrowLink>Conhecer o escritório</ArrowLink></Reveal>
  </div></section>;
}

function Differentials() {
  return <section id="diferenciais" className="section-pad differentials"><div className="container"><Reveal className="section-heading compact"><p className="eyebrow dark">Como pensamos</p><h2>Princípios que orientam<br />nossa <em>atuação.</em></h2></Reveal><div className="differential-list">{differentiators.map(([n, title, text]) => <div className="differential-row" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p><Plus /></div>)}</div></div></section>;
}

function Process() {
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { once: true, margin: "-20%" });
  const steps = [["01", "Primeiro contato", "Escuta inicial e compreensão do contexto."], ["02", "Análise", "Leitura técnica e criteriosa das informações."], ["03", "Estratégia", "Definição clara do caminho jurídico."], ["04", "Atuação", "Condução próxima, responsável e transparente."]];
  return <section className="section-pad process"><div className="container"><Reveal className="section-heading compact"><p className="eyebrow dark">Processo</p><h2>Como <em>trabalhamos.</em></h2></Reveal><div className="process-line" ref={ref}><motion.i initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1.8, ease: [.22, 1, .36, 1] }} />{steps.map(([n, title, text], index) => <Reveal key={n} delay={index * .12} className="process-step"><span>{n}</span><b>{title}</b><p>{text}</p></Reveal>)}</div></div></section>;
}

function EditorialQuote() { return <section className="editorial-quote"><Reveal><span>“</span><h2>O melhor caminho começa<br />com uma boa <em>estratégia.</em></h2></Reveal></section>; }

function Articles() {
  return <section id="conteudo" className="section-pad articles"><div className="container"><Reveal className="articles-head"><div><p className="eyebrow dark">Conteúdo</p><h2>Perspectivas <em>jurídicas.</em></h2></div><p>Reflexões e análises serão publicadas neste espaço após aprovação editorial do escritório.</p></Reveal><div className="article-list">{articles.map((title, i) => <article key={title}><div className="article-image">{i === 0 && <img src={perspectiveDetail} alt="Detalhe abstrato de pedra e metal" width={1408} height={1008} loading="lazy" />}<span>Imagem editorial</span></div><div className="article-copy"><p>Conteúdo em preparação</p><h3>{title}</h3><span>Data a definir</span></div><Button variant="article" size="iconLg" aria-label={`Ler ${title}`}><ArrowUpRight /></Button></article>)}</div></div></section>;
}

function Faq() {
  const faqs = [["Como funciona o primeiro atendimento?", "O contato inicial serve para compreender a necessidade apresentada e orientar os próximos passos. Detalhes do atendimento serão definidos pelo escritório."], ["Quais informações devo apresentar?", "Os documentos e dados necessários variam conforme a situação. A equipe indicará o que deve ser reunido após o contato inicial."], ["Como funciona a análise do caso?", "Cada demanda passa por uma leitura individualizada antes da definição de qualquer estratégia ou encaminhamento."], ["Como entrar em contato?", "Utilize o formulário ou um dos canais indicados. Os dados reais de contato devem ser inseridos antes da publicação."]];
  return <section className="section-pad faq"><div className="container faq-grid"><Reveal><p className="eyebrow dark">Perguntas frequentes</p><h2>Informação clara,<br />desde o <em>início.</em></h2></Reveal><Reveal><Accordion type="single" collapsible>{faqs.map(([q, a], i) => <AccordionItem value={`item-${i}`} key={q}><AccordionTrigger><span>0{i + 1}</span>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion></Reveal></div></section>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  return <><section className="final-cta"><div className="container"><Reveal><p className="eyebrow">Contato direto</p><h2>Seu próximo passo começa<br />com uma <em>conversa.</em></h2><p>Converse com nossa equipe para uma primeira compreensão da sua necessidade.</p><div><ArrowLink dark onClick={() => scrollTo("contact-form")}>Falar com um advogado</ArrowLink><Button variant="whatsapp" size="xl"><MessageCircle /> WhatsApp</Button></div></Reveal></div></section>
  <section id="contato" className="section-pad contact"><div className="container contact-grid"><Reveal className="contact-details"><p className="eyebrow dark">Contato</p><h2>Vamos conversar.</h2><p>Os dados abaixo são marcadores temporários e devem ser substituídos pelas informações reais do escritório.</p>{[["Telefone", "[telefone]"], ["WhatsApp", "[WhatsApp]"], ["E-mail", "[e-mail]"], ["Endereço", "[endereço completo]"], ["Horário", "[horário de atendimento]"]].map(([label, value]) => <div className="contact-line" key={label}><span>{label}</span><b>{value}</b></div>)}</Reveal>
    <Reveal><form id="contact-form" onSubmit={submit}><div className="field"><label htmlFor="name">Nome</label><input id="name" name="name" placeholder="Como podemos chamar você?" required /></div><div className="form-split"><div className="field"><label htmlFor="email">E-mail</label><input id="email" type="email" name="email" placeholder="seu@email.com" required /></div><div className="field"><label htmlFor="phone">Telefone</label><input id="phone" name="phone" placeholder="(00) 00000-0000" required /></div></div><div className="field"><label htmlFor="message">Mensagem</label><textarea id="message" name="message" rows={5} placeholder="Conte-nos brevemente como podemos ajudar" required /></div><Button variant="submit" size="xl" type="submit">{sent ? "Mensagem registrada" : "Enviar mensagem"}<ArrowUpRight /></Button>{sent && <p className="form-note">Demonstração concluída. O envio real será conectado quando o canal de atendimento for definido.</p>}</form></Reveal></div></section></>;
}

function Footer() { return <footer><div className="container"><div className="footer-main"><div><span className="brand brand-footer"><span>NA</span><span className="brand-name">NOME DA ADVOCACIA</span></span><p>Estratégia, clareza e precisão para decisões que importam.</p></div><div><b>Navegação</b>{nav.slice(1).map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</div><div><b>Contato</b><span>[e-mail]</span><span>[telefone]</span><span>[cidade — UF]</span></div><div><b>Redes</b><span>[LinkedIn]</span><span>[Instagram]</span></div></div><div className="footer-bottom"><span>© 2026 Nome da Advocacia. Conteúdo institucional provisório.</span><a href="#privacidade">Política de privacidade</a><button onClick={() => scrollTo("inicio")} aria-label="Voltar ao topo">Topo <ArrowUpRight /></button></div></div></footer>; }

function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 }); const [active, setActive] = useState(false);
  useEffect(() => { const move = (e: globalThis.MouseEvent) => setPosition({ x: e.clientX, y: e.clientY }); const over = (e: globalThis.MouseEvent) => setActive(Boolean((e.target as HTMLElement).closest("a,button,.hero-visual,.office-image"))); window.addEventListener("mousemove", move); window.addEventListener("mouseover", over); return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); }; }, []);
  return <motion.div className={`cursor ${active ? "active" : ""}`} animate={{ x: position.x, y: position.y }} transition={{ type: "spring", damping: 28, stiffness: 350, mass: .2 }} aria-hidden="true" />;
}

export function LawFirmSite() { return <main><Cursor /><Header /><Hero /><Positioning /><Principles /><Practices /><Statement /><Office /><Differentials /><Process /><EditorialQuote /><Articles /><Faq /><Contact /><Footer /><a className="floating-whatsapp" href="#contato" aria-label="Falar com um advogado pelo WhatsApp"><MessageCircle /><span>Falar com um advogado</span></a></main>; }