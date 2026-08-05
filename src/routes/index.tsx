import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Clock,
  Users,
  MessageCircle,
  ArrowRight,
  BookOpen,
  Calculator,
  BarChart3,
  DollarSign,
  Code2,
  FlaskConical,
  Quote as QuoteIcon,
  Pencil,
  Target,
  FileCheck,
  Zap,
  Globe,
  Wallet,
  Heart,
  Star,
  ChevronDown,
  Menu,
  X,
  Check,
  Mail,
  Circle,
  Layers,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { trackLeadFormSubmit } from "@/lib/gtag";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Assignment Gurus | Academic Tutoring & Educational Support" },
      {
        name: "description",
        content:
          "Expert tutoring and personalized academic support in math, statistics, finance, programming and more. Request a free quote and join our secure Discord learning community.",
      },
      { property: "og:title", content: "Assignment Gurus | Academic Tutoring & Educational Support" },
      {
        property: "og:description",
        content:
          "Personalized one-on-one tutoring with experienced experts. Confidential, flexible, and available 24/7 through our Discord community.",
      },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: "Assignment Gurus | Academic Tutoring & Educational Support" },
      { name: "twitter:description", content: "Expert tutoring. Personalized learning. Academic success." },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Assignment Gurus",
          description: "Expert Tutoring. Personalized Learning. Academic Success.",
          url: "/",
          logo: "/favicon.png",
        }),
      },
    ],
  }),
  component: LandingPage,
});

/* ---------- Utility hooks ---------- */
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

/* ---------- Scroll Progress ---------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-brand z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}

/* ---------- Navbar ---------- */
const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#how", label: "How It Works" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-300 ${
          scrolled ? "" : ""
        }`}
      >
        <div
          className={`glass flex items-center justify-between rounded-2xl px-4 sm:px-6 transition-all duration-300 ${
            scrolled ? "py-2.5" : "py-3.5"
          }`}
        >
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-brand grid place-items-center shadow-brand">
              <span className="text-white font-bold text-sm font-display">AG</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-brand blur-lg opacity-40 group-hover:opacity-70 transition -z-10" />
            </div>
            <span className="font-display font-bold text-base sm:text-lg tracking-tight">
              Assignment Gurus
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-foreground transition rounded-lg hover:bg-foreground/5"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#quote"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-brand hover:shadow-lg hover:scale-[1.03] transition-transform"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-foreground/5"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass mt-2 rounded-2xl p-3 lg:hidden"
            >
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-foreground/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="mt-2 block text-center rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white"
              >
                Request a Quote
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const mouse = useMousePosition();
  const heroRef = useRef<HTMLDivElement>(null);
  const tx = typeof window !== "undefined" ? (mouse.x / window.innerWidth - 0.5) * 20 : 0;
  const ty = typeof window !== "undefined" ? (mouse.y / window.innerHeight - 0.5) * 20 : 0;

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-hero"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              width: 6 + (i % 4) * 4,
              height: 6 + (i % 4) * 4,
              background:
                i % 3 === 0
                  ? "rgba(37,99,235,0.35)"
                  : i % 3 === 1
                  ? "rgba(124,58,237,0.35)"
                  : "rgba(6,182,212,0.35)",
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            Trusted by 10,000+ students worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
          >
            Academic Support That{" "}
            <span className="text-gradient">Helps You Learn</span> with Confidence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
          >
            Connect with experienced tutors for personalized guidance in mathematics, statistics,
            accounting, finance, programming, research methods, study skills, editing,
            proofreading, and exam preparation. Receive one-on-one educational support through
            our secure Discord community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#quote"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-brand hover:shadow-2xl hover:scale-[1.03] transition-all"
            >
              Request a Free Quote
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#discord"
              className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3.5 text-sm font-semibold hover:scale-[1.03] transition-transform"
            >
              <MessageCircle className="h-4 w-4" />
              Join Discord
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex items-center gap-6 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-brand" /> 100% Confidential
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-2" /> 24/7 Support
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-brand-accent" /> 98% Satisfaction
            </div>
          </motion.div>
        </div>

        {/* Dashboard illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          style={{ transform: `translate(${tx}px, ${ty}px)` }}
        >
          <HeroDashboard />
        </motion.div>
      </div>
    </section>
  );
}

function HeroDashboard() {
  return (
    <div className="relative aspect-square max-w-xl mx-auto">
      {/* Glow */}
      <div className="absolute inset-8 bg-gradient-brand rounded-[3rem] blur-3xl opacity-30" />

      {/* Main card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-4 glass rounded-3xl p-6 flex flex-col gap-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-brand grid place-items-center">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold">Learning Dashboard</div>
              <div className="text-[10px] text-muted-foreground">Session in progress</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-brand/10 to-brand-2/10 p-4">
          <div className="text-xs text-muted-foreground mb-1">Learning Progress</div>
          <div className="flex items-end justify-between mb-2">
            <div className="text-2xl font-bold font-display">87%</div>
            <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +12% this week
            </div>
          </div>
          <div className="h-2 rounded-full bg-white/60 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "87%" }}
              transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
              className="h-full bg-gradient-brand rounded-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border/50 bg-white/50 p-3">
            <div className="text-[10px] text-muted-foreground">Subject</div>
            <div className="text-sm font-semibold flex items-center gap-1.5 mt-0.5">
              <Calculator className="h-3.5 w-3.5 text-brand" /> Statistics
            </div>
          </div>
          <div className="rounded-xl border border-border/50 bg-white/50 p-3">
            <div className="text-[10px] text-muted-foreground">Tutor</div>
            <div className="text-sm font-semibold flex items-center gap-1.5 mt-0.5">
              <div className="h-4 w-4 rounded-full bg-gradient-brand" /> Dr. Chen
            </div>
          </div>
        </div>

        <div className="mt-auto rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <div className="text-xs font-medium text-emerald-900">
            Secure ticket #A-2847 — private
          </div>
        </div>
      </motion.div>

      {/* Floating tutor card */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -left-4 top-16 glass rounded-2xl p-3 pr-4 flex items-center gap-3 shadow-brand"
      >
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-gradient-brand grid place-items-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
        </div>
        <div>
          <div className="text-xs font-semibold">Tutor Available</div>
          <div className="text-[10px] text-muted-foreground">Reply in ~2 min</div>
        </div>
      </motion.div>

      {/* Floating support card */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-2 top-8 glass rounded-2xl p-3 flex items-center gap-2"
      >
        <div className="h-8 w-8 rounded-lg bg-brand-accent/20 grid place-items-center">
          <MessageCircle className="h-4 w-4 text-brand-accent" />
        </div>
        <div className="text-xs font-semibold">Live Support</div>
      </motion.div>

      {/* Floating subject card */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute -right-4 bottom-12 glass rounded-2xl p-3"
      >
        <div className="text-[10px] text-muted-foreground mb-1">Subject Selection</div>
        <div className="flex gap-1.5">
          {[Calculator, Code2, BarChart3].map((Icon, i) => (
            <div key={i} className="h-7 w-7 rounded-lg bg-gradient-to-br from-brand/20 to-brand-2/20 grid place-items-center">
              <Icon className="h-3.5 w-3.5 text-brand" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Counter ---------- */
function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, mv]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------- Stats ---------- */
const STATS = [
  { value: 10000, suffix: "+", label: "Students Assisted" },
  { value: 98, suffix: "%", label: "Student Satisfaction" },
  { value: 24, suffix: "/7", label: "Support Available" },
  { value: 100, suffix: "%", label: "Confidential" },
];

function Stats() {
  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl sm:text-5xl font-bold text-gradient">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
const SERVICES = [
  { icon: BookOpen, title: "Academic Tutoring", desc: "One-on-one guidance across a wide range of academic disciplines." },
  { icon: Pencil, title: "Essay Editing & Proofreading", desc: "Polish structure, clarity, grammar, and citations." },
  { icon: Calculator, title: "Mathematics Support", desc: "From algebra to advanced calculus, taught step-by-step." },
  { icon: BarChart3, title: "Statistics Tutoring", desc: "Hypothesis testing, regression, SPSS, R, and more." },
  { icon: FileCheck, title: "Accounting Tutoring", desc: "Financial, managerial, and audit concepts made clear." },
  { icon: DollarSign, title: "Finance Tutoring", desc: "Corporate finance, valuation, derivatives, portfolio theory." },
  { icon: Code2, title: "Programming Mentorship", desc: "Python, Java, C++, JavaScript, SQL and more." },
  { icon: FlaskConical, title: "Research Methodology", desc: "Study design, methods, and data interpretation." },
  { icon: QuoteIcon, title: "Citation & Referencing", desc: "APA, MLA, Harvard, Chicago, Vancouver — done right." },
  { icon: Target, title: "Study Skills & Exams", desc: "Time management, note-taking, and exam strategy." },
];

function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Our Services"
          title="Personalized support across every academic subject"
          subtitle="From foundational concepts to advanced topics, our tutors help you build lasting understanding — not shortcuts."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-2xl p-6 hover:shadow-brand transition-all"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-0 group-hover:opacity-[0.04] transition" />
              <div className="relative">
                <div className="h-11 w-11 rounded-xl bg-gradient-brand grid place-items-center shadow-brand mb-4 group-hover:scale-110 transition-transform">
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-5 flex items-center gap-3 text-xs font-semibold">
                  <a href="#quote" className="text-brand hover:text-brand-2 inline-flex items-center gap-1 transition">
                    Request Quote <ArrowRight className="h-3 w-3" />
                  </a>
                  <span className="text-muted-foreground/40">·</span>
                  <a href="#how" className="text-muted-foreground hover:text-foreground transition">
                    Learn More
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
const FEATURES = [
  { icon: Users, title: "Experienced Tutors", desc: "Vetted experts with advanced degrees and real teaching experience." },
  { icon: Sparkles, title: "Personalized Learning", desc: "Sessions tailored to your goals, pace, and learning style." },
  { icon: ShieldCheck, title: "Confidential Support", desc: "Private tickets and end-to-end secure Discord community." },
  { icon: Clock, title: "Flexible Scheduling", desc: "Book sessions that fit your timezone and study routine." },
  { icon: Zap, title: "Fast Response", desc: "Typical first reply within minutes, not days." },
  { icon: Heart, title: "One-on-One Guidance", desc: "Focused attention that builds real understanding." },
  { icon: Wallet, title: "Affordable Plans", desc: "Transparent pricing with quotes tailored to each request." },
  { icon: Globe, title: "Worldwide Support", desc: "Students in 60+ countries served every month." },
];

function Features() {
  return (
    <section className="relative py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="A better way to get the help you need"
          subtitle="Built for students who want to actually learn — with transparency, privacy, and real human support."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-5 group"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand/15 to-brand-2/15 grid place-items-center mb-3 group-hover:from-brand group-hover:to-brand-2 transition-all">
                <f.icon className="h-5 w-5 text-brand group-hover:text-white transition" />
              </div>
              <div className="font-semibold text-sm">{f.title}</div>
              <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How It Works ---------- */
const STEPS = [
  { title: "Request a Quote", desc: "Tell us about your subject, level, and goals in our short quote form." },
  { title: "Receive Consultation", desc: "We follow up quickly with tutor matches and clear pricing." },
  { title: "Join Our Discord Community", desc: "Access our secure server to communicate with tutors and students." },
  { title: "Open Private Support Ticket", desc: "Your private channel keeps everything organized and confidential." },
  { title: "Get Connected With an Expert", desc: "Meet a tutor matched to your subject and learning style." },
  { title: "Receive Personalized Guidance", desc: "Learn concepts step-by-step at your own pace." },
];

function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how" className="relative py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="How It Works"
          title="From quote to expert guidance in six steps"
          subtitle="A clear, predictable process built around your privacy and success."
        />

        <div ref={containerRef} className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-px bg-gradient-brand md:-translate-x-1/2 origin-top"
          />

          <div className="space-y-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="h-12 w-12 rounded-full bg-gradient-brand grid place-items-center shadow-brand ring-4 ring-background">
                    <span className="text-white font-display font-bold text-sm">{i + 1}</span>
                  </div>
                </div>

                {/* Card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="glass rounded-2xl p-5 hover:shadow-brand transition">
                    <div className="text-xs font-semibold text-brand uppercase tracking-wider">
                      Step {i + 1}
                    </div>
                    <div className="mt-1 font-display font-semibold text-lg">{step.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.desc}</div>
                  </div>
                </div>
                <div className="hidden md:block md:w-[calc(50%-3rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
const TESTIMONIALS = [
  { name: "Sarah M.", role: "Business Analytics, MSc", text: "My statistics grade jumped from a C to an A. My tutor explained regression in a way that finally clicked. Absolutely worth it.", initials: "SM" },
  { name: "James O.", role: "Undergraduate, Finance", text: "Fast response, patient tutors, and super clear guidance on my valuation homework. The Discord ticket system feels really professional.", initials: "JO" },
  { name: "Priya R.", role: "PhD Candidate", text: "The research methodology support helped me structure my thesis proposal. My supervisor was genuinely impressed with the improvement.", initials: "PR" },
  { name: "Daniel K.", role: "CS Undergraduate", text: "Programming mentorship changed how I think about problems. I now actually enjoy debugging.", initials: "DK" },
  { name: "Elena V.", role: "Accounting Diploma", text: "Confidential, quick, and truly helpful. I passed my exam thanks to how clearly my tutor broke down concepts.", initials: "EV" },
];

function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      id="reviews"
      className="relative py-24 bg-secondary/30"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Reviews"
          title="Loved by students around the world"
          subtitle="Real stories from students who partnered with Assignment Gurus."
        />
        <div className="mt-14 relative">
          <div className="relative h-[280px] sm:h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 glass rounded-3xl p-8 sm:p-10"
              >
                <QuoteIcon className="h-8 w-8 text-brand/30 mb-4" />
                <p className="text-lg sm:text-xl leading-relaxed font-medium">
                  "{TESTIMONIALS[idx].text}"
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-brand grid place-items-center text-white font-semibold text-sm">
                    {TESTIMONIALS[idx].initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{TESTIMONIALS[idx].name}</div>
                    <div className="text-xs text-muted-foreground">{TESTIMONIALS[idx].role}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === idx ? "w-8 bg-gradient-brand" : "w-2 bg-border hover:bg-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const FAQS = [
  { q: "Is Assignment Gurus a tutoring service or an assignment-writing service?", a: "We are strictly an educational tutoring and academic support service. We help students learn, understand, and improve — students remain responsible for producing and submitting their own work." },
  { q: "How does the pricing work?", a: "Every request is unique, so we provide personalized quotes based on subject, level, scope, and turnaround. Submit our short quote form for a free, no-obligation estimate." },
  { q: "How do I communicate with my tutor?", a: "After joining our secure Discord community, you'll receive a private support ticket where you can chat with your matched tutor directly." },
  { q: "Is my information kept confidential?", a: "Yes. All communication is private, tickets are only visible to you and your tutor, and we never share your information." },
  { q: "How quickly can I get help?", a: "Most students receive a response within minutes. Turnaround for actual tutoring sessions depends on the subject and scope." },
  { q: "Do you support my subject or country?", a: "We support the vast majority of academic subjects and students in 60+ countries worldwide." },
];

function FAQ() {
  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="FAQ"
          title="Answers to common questions"
          subtitle="Everything you need to know before requesting a quote."
        />
        <div className="mt-12">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="glass rounded-2xl border-0 px-5 data-[state=open]:shadow-brand"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4 font-semibold text-sm sm:text-base">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* ---------- Quote Form ---------- */
function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!data.get("name") || !data.get("email") || !data.get("message")) {
      toast.error("Please fill in required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      trackLeadFormSubmit({ form_location: "quote_form" });
      form.reset();
      navigate({ to: "/thank-you" });
    }, 900);

  };

  return (
    <section id="quote" className="relative py-24 bg-secondary/30 overflow-hidden">
      <div className="absolute inset-0 bg-hero opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Request a Quote"
          title="Get a free, personalized quote"
          subtitle="Tell us about your goals — we'll match you with a tutor and send a transparent quote."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 glass rounded-3xl p-6 sm:p-10 shadow-brand"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="mx-auto h-16 w-16 rounded-full bg-gradient-brand grid place-items-center shadow-brand"
                >
                  <Check className="h-8 w-8 text-white" strokeWidth={3} />
                </motion.div>
                <h3 className="mt-6 font-display text-2xl font-bold">Quote request received!</h3>
                <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                  We'll review your details and reply within a few minutes. Meanwhile, join our
                  Discord community to get started.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href="#discord"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-brand"
                  >
                    <MessageCircle className="h-4 w-4" /> Join Discord
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold"
                  >
                    Submit another
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={onSubmit}
                className="grid sm:grid-cols-2 gap-4"
              >
                <Field label="Full Name *">
                  <Input name="name" required placeholder="Jane Doe" />
                </Field>
                <Field label="Email *">
                  <Input name="email" type="email" required placeholder="jane@school.edu" />
                </Field>
                <Field label="Country">
                  <Input name="country" placeholder="United Kingdom" />
                </Field>
                <Field label="Subject">
                  <Input name="subject" placeholder="Statistics" />
                </Field>
                <Field label="Level of Study">
                  <Input name="level" placeholder="Undergraduate / MSc / PhD" />
                </Field>
                <Field label="Deadline (Optional)">
                  <Input name="deadline" type="date" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Message *">
                    <Textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us what you're working on and where you'd like help."
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-brand hover:scale-[1.02] transition disabled:opacity-70 w-full sm:w-auto"
                  >
                    {loading ? "Sending..." : "Request My Free Quote"}
                    {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                  <p className="text-xs text-muted-foreground">
                    We'll never share your details. Response within minutes.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-foreground/80">{label}</Label>
      {children}
    </div>
  );
}

/* ---------- Discord CTA ---------- */
function DiscordCTA() {
  return (
    <section id="discord" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-brand animate-gradient p-10 sm:p-16 text-center shadow-brand"
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-8 right-8 opacity-20">
            <Layers className="h-20 w-20 text-white" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-medium text-white mb-6">
              <Circle className="h-2 w-2 fill-white text-white animate-pulse" />
              Community online now
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight">
              Join Our Learning Community
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/90 text-base sm:text-lg leading-relaxed">
              Join our secure Discord community to connect with tutors, ask academic questions,
              receive study guidance, and collaborate with other learners.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://discord.gg/pzzan5BjSh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-brand hover:scale-105 transition-transform shadow-xl"
              >
                <MessageCircle className="h-4 w-4" /> Join Discord
              </a>
              <a
                href="#quote"
                className="inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur border border-white/25 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/25 transition"
              >
                Request Quote
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const navigate = useNavigate();
  return (
    <section id="contact" className="relative py-24 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Get in touch"
          subtitle="Have a question? Reach us any way you like — we typically reply within minutes."
        />
        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 sm:p-8 space-y-6"
          >
            <div>
              <div className="text-xs font-semibold text-brand uppercase tracking-wider">Email</div>
              <a href="mailto:assignmentsolutions91@gmail.com" className="mt-1 flex items-center gap-2 font-semibold text-lg hover:text-brand transition">
                <Mail className="h-5 w-5" /> assignmentsolutions91@gmail.com
              </a>
            </div>
            <div>
              <div className="text-xs font-semibold text-brand uppercase tracking-wider">Community</div>
              <a
                href="https://discord.gg/pzzan5BjSh"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-brand"
              >
                <MessageCircle className="h-4 w-4" /> Join Our Discord
              </a>
            </div>
            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-brand" /> Available 24/7 · Response within minutes
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message sent! We'll be in touch shortly.");
              trackLeadFormSubmit({ form_location: "contact_form" });
              (e.currentTarget as HTMLFormElement).reset();
              navigate({ to: "/thank-you" });
            }}

            className="glass rounded-2xl p-6 sm:p-8 space-y-4"
          >
            <Field label="Name">
              <Input name="name" required placeholder="Your name" />
            </Field>
            <Field label="Email">
              <Input name="email" type="email" required placeholder="you@email.com" />
            </Field>
            <Field label="Message">
              <Textarea name="message" required rows={4} placeholder="How can we help?" />
            </Field>
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-brand hover:scale-[1.02] transition"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-brand grid place-items-center shadow-brand">
                <span className="text-white font-bold text-sm font-display">AG</span>
              </div>
              <span className="font-display font-bold">Assignment Gurus</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Expert Tutoring. Personalized Learning. Academic Success.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-3">
              Explore
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              {[
                ["Home", "#home"],
                ["Services", "#services"],
                ["FAQ", "#faq"],
                ["Contact", "#contact"],
                ["Privacy Policy", "/privacy"],
                ["Terms of Service", "/terms"],
                ["Academic Integrity", "/academic-integrity"],
              ].map(([label, href]) =>
                href.startsWith("/") ? (
                  <Link
                    key={label}
                    to={href}
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    {label}
                  </Link>
                ) : (
                  <a key={label} href={href} className="text-muted-foreground hover:text-foreground transition">
                    {label}
                  </a>
                ),
              )}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-3">
              Educational Disclaimer
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Assignment Gurus provides tutoring, educational guidance, editing, proofreading,
              research methodology support, and study assistance. Students remain responsible for
              producing and submitting their own academic work in accordance with their
              institution's academic integrity policies.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Assignment Gurus. All rights reserved.
          </div>
          <div className="text-xs text-muted-foreground">Made with care for students worldwide.</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Section Header ---------- */
function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-brand mb-4"
      >
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-4 text-base text-muted-foreground leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ---------- Page ---------- */
function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <QuoteForm />
        <DiscordCTA />
        <Contact />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
