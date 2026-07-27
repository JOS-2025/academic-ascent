import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

interface LegalLayoutProps {
  title: string;
  description?: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LEGAL_LINKS = [
  { label: "Home", href: "/" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Academic Integrity", href: "/academic-integrity" },
  { label: "Contact", href: "/#contact" },
];

export function LegalLayout({ title, description, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <LegalHeader />
      <main>
        <section className="relative bg-hero pt-32 pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl font-bold tracking-tight"
            >
              {title}
            </motion.h1>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                {description}
              </motion.p>
            )}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-3 text-sm text-muted-foreground"
            >
              Last updated: {lastUpdated}
            </motion.p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="space-y-12">{children}</div>
          </div>
        </section>
      </main>
      <LegalFooter />
    </div>
  );
}

function LegalHeader() {
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`glass flex items-center justify-between rounded-2xl px-4 sm:px-6 transition-all duration-300 ${
            scrolled ? "py-2.5" : "py-3.5"
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-brand grid place-items-center shadow-brand">
              <span className="text-white font-bold text-sm font-display">AG</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-brand blur-lg opacity-40 group-hover:opacity-70 transition -z-10" />
            </div>
            <span className="font-display font-bold text-base sm:text-lg tracking-tight">
              Assignment Gurus
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {LEGAL_LINKS.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/#quote"
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
              {LEGAL_LINKS.map((l) => (
                <MobileNavLink key={l.href} href={l.href} label={l.label} onClick={() => setOpen(false)} />
              ))}
              <a
                href="/#quote"
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

function NavLink({ href, label }: { href: string; label: string }) {
  const baseClasses =
    "px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-foreground transition rounded-lg hover:bg-foreground/5";
  if (href.startsWith("#")) {
    return (
      <a href={href} className={baseClasses}>
        {label}
      </a>
    );
  }
  return (
    <Link to={href} className={baseClasses}>
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  const baseClasses = "block px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-foreground/5";
  if (href.startsWith("#")) {
    return (
      <a href={href} onClick={onClick} className={baseClasses}>
        {label}
      </a>
    );
  }
  return (
    <Link to={href} onClick={onClick} className={baseClasses}>
      {label}
    </Link>
  );
}

function LegalFooter() {
  return (
    <footer className="relative border-t border-border/50 bg-background py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-brand grid place-items-center shadow-brand">
                <span className="text-white font-bold text-sm font-display">AG</span>
              </div>
              <span className="font-display font-bold">Assignment Gurus</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Expert Tutoring. Personalized Learning. Academic Success.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-3">
              Legal
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-foreground transition"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-foreground transition"
              >
                Privacy Policy
              </Link>
              <Link
                to="/academic-integrity"
                className="text-muted-foreground hover:text-foreground transition"
              >
                Academic Integrity
              </Link>
              <Link
                to="/#contact"
                className="text-muted-foreground hover:text-foreground transition"
              >
                Contact
              </Link>
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
              institution&apos;s academic integrity policies.
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
