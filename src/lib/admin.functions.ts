import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const LEAD_STATUSES = ["new", "contacted", "in_progress", "completed", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In Progress",
  completed: "Completed",
  closed: "Closed",
};

export type LeadRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  country: string | null;
  subject: string | null;
  academic_level: string | null;
  deadline: string | null;
  message: string | null;
  form_type: string;
  status: string;
  created_at: string;
};

export const isAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { admin: data === true };
  });

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("quote_requests")
      .select(
        "id, full_name, email, phone, whatsapp, country, subject, academic_level, deadline, message, form_type, status, created_at",
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[admin] failed to list leads", error);
      throw new Error("Could not load submissions.");
    }
    return (data ?? []) as LeadRow[];
  });

export const updateLeadStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ id: z.string().uuid(), status: z.enum(LEAD_STATUSES) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("quote_requests")
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) {
      console.error("[admin] failed to update status", error);
      throw new Error("Could not update status. Admin access is required.");
    }
    return { ok: true as const };
  });
