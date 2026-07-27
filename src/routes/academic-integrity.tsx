import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";

export const Route = createFileRoute("/academic-integrity")({
  head: () => ({
    meta: [
      { title: "Academic Integrity | Assignment Gurus" },
      {
        name: "description",
        content:
          "Assignment Gurus is committed to honest learning. Read our Academic Integrity Statement to understand how our services support your education without encouraging academic misconduct.",
      },
      { property: "og:title", content: "Academic Integrity | Assignment Gurus" },
      {
        property: "og:description",
        content:
          "Our Academic Integrity Statement explains how Assignment Gurus supports learning while expecting users to follow their institution's academic integrity policies.",
      },
      { property: "og:url", content: "/academic-integrity" },
      { name: "twitter:title", content: "Academic Integrity | Assignment Gurus" },
      {
        name: "twitter:description",
        content: "Assignment Gurus supports honest learning and academic responsibility.",
      },
    ],
    links: [{ rel: "canonical", href: "/academic-integrity" }],
  }),
  component: AcademicIntegrityPage,
});

function AcademicIntegrityPage() {
  return (
    <LegalLayout
      title="Academic Integrity"
      description="Our commitment to honest learning and academic responsibility."
      lastUpdated="July 27, 2026"
    >
      <section className="scroll-mt-24">
        <div className="text-muted-foreground leading-relaxed space-y-4">
          <p>
            Assignment Gurus provides tutoring, educational guidance, editing, proofreading,
            research methodology support, citation assistance, programming mentorship, mathematics
            coaching, and related educational services. These services are designed to help you
            understand your coursework, develop your skills, and improve your academic confidence.
          </p>
          <p>
            Users are responsible for producing and submitting their own academic work in compliance
            with their institution&apos;s academic integrity policies. Our support should be used as a
            learning aid, not as a substitute for your own effort or original work.
          </p>
          <p>
            Assignment Gurus does not encourage, support, or facilitate academic dishonesty,
            plagiarism, cheating, or any form of academic misconduct. We reserve the right to refuse
            requests that ask us to complete assignments, take exams, or engage in any activity that
            violates academic integrity standards.
          </p>
          <p>
            By using our services, you agree to use any tutoring, feedback, or educational materials
            responsibly and to ensure that your final submissions reflect your own learning and
            original work.
          </p>
        </div>
      </section>

      <div className="pt-6 border-t border-border/50 text-sm text-muted-foreground">
        <p>
          This Academic Integrity Statement is maintained by Assignment Gurus to clarify the
          educational purpose of our services and the responsibilities of our users.
        </p>
      </div>
    </LegalLayout>
  );
}
