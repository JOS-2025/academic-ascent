import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Assignment Gurus" },
      {
        name: "description",
        content:
          "Learn how Assignment Gurus collects, uses, and protects your personal information when you use our website, Discord community, and educational support services.",
      },
      { property: "og:title", content: "Privacy Policy | Assignment Gurus" },
      {
        property: "og:description",
        content:
          "Assignment Gurus is committed to protecting your privacy. Read how we collect, use, and safeguard your personal information.",
      },
      { property: "og:url", content: "/privacy" },
      { name: "twitter:title", content: "Privacy Policy | Assignment Gurus" },
      {
        name: "twitter:description",
        content: "How Assignment Gurus collects, uses, and protects your personal information.",
      },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24" id={id}>
      <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="We respect your privacy and are committed to protecting your personal information."
      lastUpdated="July 27, 2026"
    >
      <PrivacySection id="information-we-collect" title="Information We Collect">
        <h3 className="font-semibold text-foreground">Personal Information</h3>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Name</li>
          <li>Email address</li>
          <li>Country</li>
          <li>Educational interests</li>
          <li>Information submitted through contact forms</li>
        </ul>
        <h3 className="font-semibold text-foreground pt-2">Technical Information</h3>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>IP address</li>
          <li>Browser type</li>
          <li>Device information</li>
          <li>Pages visited</li>
          <li>Cookies</li>
          <li>Analytics information</li>
        </ul>
      </PrivacySection>

      <PrivacySection id="how-we-use-information" title="How We Use Information">
        <p>Your information may be used to:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Respond to quote requests.</li>
          <li>Provide tutoring and educational support.</li>
          <li>Improve our services.</li>
          <li>Respond to customer inquiries.</li>
          <li>Prevent fraud.</li>
          <li>Analyze website performance.</li>
          <li>Send service-related communications.</li>
        </ul>
        <p>We do not sell personal information.</p>
      </PrivacySection>

      <PrivacySection id="cookies" title="Cookies">
        <p>Our website uses cookies to:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Improve functionality.</li>
          <li>Remember preferences.</li>
          <li>Measure website traffic.</li>
          <li>Improve user experience.</li>
        </ul>
        <p>You may disable cookies through your browser settings.</p>
      </PrivacySection>

      <PrivacySection id="google-analytics" title="Google Analytics">
        <p>
          We use Google Analytics to understand website usage. Analytics data is collected anonymously
          where possible.
        </p>
      </PrivacySection>

      <PrivacySection id="discord" title="Discord">
        <p>
          If you join our Discord community, your interactions are also governed by Discord&apos;s
          Privacy Policy and Terms of Service.
        </p>
      </PrivacySection>

      <PrivacySection id="data-security" title="Data Security">
        <p>
          We use appropriate technical and organizational safeguards to protect personal information
          against unauthorized access, disclosure, or loss. However, no online service can guarantee
          absolute security.
        </p>
      </PrivacySection>

      <PrivacySection id="data-retention" title="Data Retention">
        <p>
          We retain personal information only for as long as necessary to:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Provide services.</li>
          <li>Meet legal obligations.</li>
          <li>Resolve disputes.</li>
          <li>Enforce our agreements.</li>
        </ul>
      </PrivacySection>

      <PrivacySection id="your-rights" title="Your Rights">
        <p>
          Depending on your location, you may have rights to:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Access your personal information.</li>
          <li>Correct inaccurate information.</li>
          <li>Request deletion.</li>
          <li>Restrict processing.</li>
          <li>Object to certain processing activities.</li>
          <li>Request a copy of your data.</li>
        </ul>
        <p>
          To exercise these rights, contact us using the email below.
        </p>
      </PrivacySection>

      <PrivacySection id="childrens-privacy" title="Children&apos;s Privacy">
        <p>
          Our services are not directed to children under the age required by applicable law without
          parental or guardian consent.
        </p>
      </PrivacySection>

      <PrivacySection id="international-users" title="International Users">
        <p>
          Your information may be processed in countries other than your own. By using our services,
          you acknowledge that your information may be transferred and processed in accordance with
          this Privacy Policy.
        </p>
      </PrivacySection>

      <PrivacySection id="changes-to-this-policy" title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The latest version will always be
          available on this website.
        </p>
      </PrivacySection>

      <PrivacySection id="contact" title="Contact">
        <p>For privacy-related questions, contact:</p>
        <p>
          Email:{" "}
          <a
            href="mailto:assignmentsolutions91@gmail.com"
            className="text-brand hover:underline font-medium"
          >
            assignmentsolutions91@gmail.com
          </a>
        </p>
      </PrivacySection>

      <div className="pt-6 border-t border-border/50 text-sm text-muted-foreground">
        <p>
          This Privacy Policy is maintained by Assignment Gurus to answer common privacy questions
          about our website, Discord community, and educational support services.
        </p>
      </div>
    </LegalLayout>
  );
}
