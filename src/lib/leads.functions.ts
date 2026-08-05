import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  formType: z.enum(["quote", "contact"]),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional().default(""),
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
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        country: data.country || null,
        subject: data.subject || null,
        level: data.level || null,
        deadline: data.deadline || null,
        message: data.message,
      })
      .select("id")
      .single();

    if (error || !row) {
      console.error("[lead] failed to save submission", error);
      throw new Error("We could not save your request. Please try again or email us directly.");
    }

    const { sendLeadNotification } = await import("./lead-email.server");
    const delivery = await sendLeadNotification({ ...data, id: row.id });

    await supabaseAdmin
      .from("quote_requests")
      .update({ email_sent: delivery.sent, email_error: delivery.error ?? null })
      .eq("id", row.id);

    if (!delivery.sent) {
      console.error("[lead] email delivery failed", delivery.error);
      throw new Error(
        "We saved your details but could not send the notification email. Please email assignmentsolutions91@gmail.com so we can respond right away.",
      );
    }

    return { ok: true as const, id: row.id };
  });
