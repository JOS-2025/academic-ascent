import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  formType: z.enum(["quote", "contact"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional().default(""),
  whatsapp: z.string().trim().max(50).optional().default(""),
  country: z.string().trim().max(100).optional().default(""),
  subject: z.string().trim().max(150).optional().default(""),
  level: z.string().trim().max(100).optional().default(""),
  deadline: z.string().trim().max(50).optional().default(""),
  message: z.string().trim().min(1).max(5000),
});

export type LeadInput = z.input<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("quote_requests")
      .insert({
        form_type: data.formType,
        full_name: data.name,
        email: data.email,
        phone: data.phone || null,
        whatsapp: data.whatsapp || null,
        country: data.country || null,
        subject: data.subject || null,
        academic_level: data.level || null,
        deadline: data.deadline || null,
        message: data.message,
        status: "new",
      })
      .select("id")
      .single();

    if (error || !row) {
      console.error("[lead] failed to save submission", error);
      throw new Error("We could not save your request. Please try again or email us directly.");
    }

    // The submission is safely stored at this point. Email delivery is a
    // best-effort notification and must never discard a stored lead.
    try {
      const { sendLeadNotification } = await import("./lead-email.server");
      const delivery = await sendLeadNotification({ ...data, id: row.id });
      await supabaseAdmin
        .from("quote_requests")
        .update({ email_sent: delivery.sent, email_error: delivery.error ?? null })
        .eq("id", row.id);
      if (!delivery.sent) console.error("[lead] email delivery failed", delivery.error);
    } catch (emailError) {
      console.error("[lead] email delivery threw", emailError);
      await supabaseAdmin
        .from("quote_requests")
        .update({ email_sent: false, email_error: String(emailError) })
        .eq("id", row.id);
    }

    return { ok: true as const, id: row.id };
  });
