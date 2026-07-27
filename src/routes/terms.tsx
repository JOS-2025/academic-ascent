import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Assignment Gurus" },
      {
        name: "description",
        content:
          "Read the Terms of Service for Assignment Gurus, including our educational purpose, payment policies, confidentiality, and prohibited activities.",
      },
      { property: "og:title", content: "Terms of Service | Assignment Gurus" },
      {
        property: "og:description",
        content:
          "Assignment Gurus Terms of Service govern your use of our academic tutoring, Discord community, and educational support services.",
      },
      { property: "og:url", content: "/terms" },
      { name: "twitter:title", content: "Terms of Service | Assignment Gurus" },
      {
        name: "twitter:description",
        content: "Terms of Service for the Assignment Gurus educational support platform.",
      },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function LegalSection({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24" id={`section-${number}`}>
      <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">
        {number}. {title}
      </h2>
      <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      description="By using Assignment Gurus, you agree to these terms. Our services are designed to support your learning, not replace your academic responsibility."
      lastUpdated="July 27, 2026"
    >
      <LegalSection number={1} title="About Assignment Gurus">
        <p>
          Assignment Gurus is an educational support platform that connects students with
          experienced tutors and academic mentors. Our services include tutoring, study guidance,
          proofreading, editing, research methodology support, citation assistance, programming
          mentorship, mathematics coaching, accounting tutoring, finance tutoring, and exam
          preparation.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Eligibility">
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            You must be at least 18 years old or have permission from a parent or legal guardian to
            use our services.
          </li>
          <li>
            By using our platform, you confirm that the information you provide is accurate and
            complete.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number={3} title="Educational Purpose">
        <p>
          Our services are intended solely for educational and learning purposes. Students remain
          fully responsible for:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Completing and submitting their own academic work.</li>
          <li>Following their institution&apos;s academic integrity policies.</li>
          <li>Using any tutoring, editing, or feedback responsibly.</li>
        </ul>
        <p>Assignment Gurus does not encourage or support academic misconduct.</p>
      </LegalSection>

      <LegalSection number={4} title="Requesting Support">
        <p>Students may request assistance by:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Completing a quote request form.</li>
          <li>Joining our Discord community.</li>
          <li>Opening a private support ticket.</li>
          <li>Contacting us via email.</li>
        </ul>
        <p>
          We reserve the right to decline any request that violates our policies or applicable laws.
        </p>
      </LegalSection>

      <LegalSection number={5} title="Payments">
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Quotes are provided before any tutoring or educational support begins.</li>
          <li>Payment terms will be communicated before services are delivered.</li>
          <li>Prices may change without prior notice.</li>
        </ul>
      </LegalSection>

      <LegalSection number={6} title="Revisions">
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            If educational materials require clarification or correction based on the agreed scope,
            reasonable revisions may be provided.
          </li>
          <li>Revision requests must be submitted within the agreed revision period.</li>
        </ul>
      </LegalSection>

      <LegalSection number={7} title="Confidentiality">
        <p>
          We respect your privacy. Information shared during tutoring sessions or private support
          tickets is treated confidentially and will not be shared except where required by law.
        </p>
      </LegalSection>

      <LegalSection number={8} title="Intellectual Property">
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            All website content, branding, graphics, logos, and educational materials created by
            Assignment Gurus remain our intellectual property unless otherwise agreed.
          </li>
          <li>Users may not reproduce or distribute our content without written permission.</li>
        </ul>
      </LegalSection>

      <LegalSection number={9} title="Prohibited Activities">
        <p>Users may not:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Abuse tutors or staff.</li>
          <li>Share malicious software.</li>
          <li>Attempt unauthorized access to our systems.</li>
          <li>Use the platform for illegal activities.</li>
          <li>Impersonate another person.</li>
          <li>Harass other community members.</li>
        </ul>
        <p>Violations may result in suspension or permanent removal.</p>
      </LegalSection>

      <LegalSection number={10} title="Service Availability">
        <p>
          While we strive to provide continuous service, we cannot guarantee uninterrupted
          availability. Maintenance, technical issues, or circumstances beyond our control may
          occasionally affect access.
        </p>
      </LegalSection>

      <LegalSection number={11} title="Limitation of Liability">
        <p>Assignment Gurus is not liable for:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Academic grades.</li>
          <li>Admission decisions.</li>
          <li>Scholarship outcomes.</li>
          <li>Institutional disciplinary actions.</li>
          <li>User misuse of educational guidance.</li>
        </ul>
        <p>
          Our liability is limited to the amount paid for the specific service where permitted by
          law.
        </p>
      </LegalSection>

      <LegalSection number={12} title="Third-Party Services">
        <p>Our platform may link to:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Discord</li>
          <li>Google Analytics</li>
          <li>Payment providers</li>
          <li>Other third-party services</li>
        </ul>
        <p>
          We are not responsible for the policies or practices of these external platforms.
        </p>
      </LegalSection>

      <LegalSection number={13} title="Changes to These Terms">
        <p>
          We may update these Terms at any time. Updated versions become effective immediately after
          publication on this website.
        </p>
      </LegalSection>

      <LegalSection number={14} title="Contact">
        <p>Questions regarding these Terms may be directed to:</p>
        <p>
          Email:{" "}
          <a
            href="mailto:assignmentsolutions91@gmail.com"
            className="text-brand hover:underline font-medium"
          >
            assignmentsolutions91@gmail.com
          </a>
        </p>
      </LegalSection>

      <section className="scroll-mt-24" id="academic-integrity">
        <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">
          Academic Integrity Statement
        </h2>
        <div className="text-muted-foreground leading-relaxed space-y-3">
          <p>
            Assignment Gurus provides tutoring, educational guidance, editing, proofreading,
            research methodology support, citation assistance, programming mentorship, mathematics
            coaching, and related educational services. Users are responsible for producing and
            submitting their own academic work in compliance with their institution&apos;s academic
            integrity policies.
          </p>
        </div>
      </section>

      <div className="pt-6 border-t border-border/50 text-sm text-muted-foreground">
        <p>
          These Terms of Service are maintained by Assignment Gurus. They govern your use of our
          website, Discord community, and educational support services.
        </p>
      </div>
    </LegalLayout>
  );
}
