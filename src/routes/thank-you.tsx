import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Check,
  Home,
  MessageCircle,
  ShieldCheck,
  Headphones,
  Smile,
  ArrowRight,
  Mail,
} from "lucide-react";

// Replace with your WhatsApp number in international format when available.
const WHATSAPP_LINK = "https://wa.me/";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You | AssignmentGurus" },
      {
        name: "description",
        content: "Your request has been received by AssignmentGurus.",
      },
      { property: "og:title", content: "Thank You | AssignmentGurus" },
      {
        property: "og:description",
        content: "Your request has been received by AssignmentGurus.",
      },
      { property: "og:url", content: "/thank-you" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Thank You | AssignmentGurus" },
      {
        name: "twitter:description",
        content: "Your request has been received by AssignmentGurus.",
      },
    ],
    links: [{ rel: "canonical", href: "/thank-you" }],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ConfirmationSection />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 py-4"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="glass flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3.5">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-brand grid place-items-center shadow-brand">
              <span className="text-white font-bold text-sm font-display">AG</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-brand blur-lg opacity-40 group-hover:opacity-70 transition -z-10" />
            </div>
            <span className="font-display font-bold text-base sm:text-lg tracking-tight">
              Assignment Gurus
            </span>
          </Link>

          <a
            href="mailto:assignmentsolutions91@gmail.com"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-brand hover:shadow-lg hover:scale-[1.03] transition-transform"
          >
            <Mail className="h-4 w-4" />
            Email Us
          </a>
        </div>
      </div>
    </motion.header>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-36 pb-12 sm:pt-40 sm:pb-16 bg-hero">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-8 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-gradient-brand shadow-brand"
        >
          <Check className="h-12 w-12 sm:h-14 sm:w-14 text-white" strokeWidth={3} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
        >
          Thank You for Your Request!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          We have received your request and our team will review it shortly. We will contact you
          with the next steps.
        </motion.p>
      </div>
    </section>
  );
}

function ConfirmationSection() {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glass rounded-3xl p-6 sm:p-10 shadow-glass"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-emerald-100 grid place-items-center">
              <Check className="h-5 w-5 text-emerald-600" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
              Request Submitted Successfully
            </h2>
          </div>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium">
              Your request has been successfully submitted.
            </p>
            <p>A member of our team will reach out soon.</p>
            <div className="flex items-start gap-3 rounded-2xl bg-brand/5 p-4">
              <ClockIcon className="h-5 w-5 text-brand mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Expected response time</p>
                <p>Usually within a few minutes to a few hours.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-brand hover:shadow-2xl hover:scale-[1.03] transition-all"
            >
              <Home className="h-4 w-4" />
              Return to Homepage
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl glass px-6 py-3.5 text-sm font-semibold hover:scale-[1.03] transition-transform"
            >
              <MessageCircle className="h-4 w-4" />
              Contact Us on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustSection() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Secure & Confidential",
      description: "Your information is handled with strict confidentiality and never shared without permission.",
    },
    {
      icon: Headphones,
      title: "Professional Support",
      description: "Our experienced team provides reliable, courteous academic assistance tailored to your needs.",
    },
    {
      icon: Smile,
      title: "Customer Satisfaction",
      description: "We are committed to delivering high-quality support that helps you succeed with confidence.",
    },
  ];

  return (
    <section className="pb-16 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="rounded-2xl border border-border/50 bg-card p-6 hover:shadow-glass transition-shadow"
            >
              <div className="h-11 w-11 rounded-xl bg-gradient-brand-soft grid place-items-center mb-4">
                <item.icon className="h-5 w-5 text-brand" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-brand grid place-items-center shadow-brand">
              <span className="text-white font-bold text-sm font-display">AG</span>
            </div>
            <span className="font-display font-bold">Assignment Gurus</span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Terms of Service
            </Link>
            <a
              href="mailto:assignmentsolutions91@gmail.com"
              className="text-muted-foreground hover:text-foreground transition"
            >
              assignmentsolutions91@gmail.com
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Assignment Gurus. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
