// Server-only email delivery for lead form submissions.
// Sending runs through Lovable's managed email service, which requires a
// verified sender domain for this project. Until that domain is configured the
// send fails loudly so the UI never shows a false success.

const RECIPIENT = "assignmentsolutions91@gmail.com";

export type LeadEmailPayload = {
  id: string;
  formType: "quote" | "contact";
  name: string;
  email: string;
  phone?: string;
  country?: string;
  subject?: string;
  level?: string;
  deadline?: string;
  message: string;
};

export type LeadEmailResult = { sent: boolean; error?: string };

export function renderLeadEmail(payload: LeadEmailPayload): { subject: string; html: string } {
  const rows: [string, string][] = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone || "—"],
    ["Country", payload.country || "—"],
    ["Subject", payload.subject || "—"],
    ["Level of study", payload.level || "—"],
    ["Deadline", payload.deadline || "—"],
    ["Form", payload.formType === "quote" ? "Quote request" : "Contact form"],
    ["Reference", payload.id],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a">
      <h2 style="margin:0 0 16px">New ${payload.formType === "quote" ? "quote" : "contact"} request</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="font-weight:600">${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:20px 0 8px">Message</h3>
      <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(payload.message)}</p>
    </div>
  `;

  return { subject: `New ${payload.formType} request from ${payload.name}`, html };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendLeadNotification(payload: LeadEmailPayload): Promise<LeadEmailResult> {
  const { subject, html } = renderLeadEmail(payload);

  try {
    const mod = (await import("./lead-mailer.server")) as {
      deliver?: (args: { to: string; subject: string; html: string }) => Promise<LeadEmailResult>;
    };
    if (!mod.deliver) {
      return { sent: false, error: "Email sender is not configured for this project yet." };
    }
    return await mod.deliver({ to: RECIPIENT, subject, html });
  } catch (error) {
    return { sent: false, error: error instanceof Error ? error.message : String(error) };
  }
}
