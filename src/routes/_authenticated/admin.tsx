import { useMemo, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LogOut, RefreshCcw, Inbox, ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  listLeads,
  updateLeadStatus,
  isAdmin as isAdminFn,
  LEAD_STATUSES,
  STATUS_LABELS,
  type LeadStatus,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Assignment Gurus" },
      { name: "description", content: "Manage incoming quote and contact requests." },
      { property: "og:title", content: "Admin Dashboard | Assignment Gurus" },
      { property: "og:description", content: "Manage incoming quote and contact requests." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminDashboard,
});

const statusStyles: Record<string, string> = {
  new: "bg-brand/10 text-brand",
  contacted: "bg-amber-500/10 text-amber-600",
  in_progress: "bg-purple-500/10 text-purple-600",
  completed: "bg-emerald-500/10 text-emerald-600",
  closed: "bg-muted text-muted-foreground",
};

function AdminDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchLeads = useServerFn(listLeads);
  const checkAdmin = useServerFn(isAdminFn);
  const setStatus = useServerFn(updateLeadStatus);
  const [filter, setFilter] = useState<"all" | LeadStatus>("all");

  const adminQuery = useQuery({ queryKey: ["is-admin"], queryFn: () => checkAdmin({}) });
  const leadsQuery = useQuery({
    queryKey: ["leads"],
    queryFn: () => fetchLeads({}),
    enabled: adminQuery.data?.admin === true,
  });

  const mutation = useMutation({
    mutationFn: (vars: { id: string; status: LeadStatus }) => setStatus({ data: vars }),
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Update failed"),
  });

  const rows = useMemo(() => {
    const all = leadsQuery.data ?? [];
    return filter === "all" ? all : all.filter((r) => r.status === filter);
  }, [leadsQuery.data, filter]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  if (adminQuery.isLoading) {
    return <Shell><p className="text-muted-foreground">Checking access…</p></Shell>;
  }

  if (!adminQuery.data?.admin) {
    return (
      <Shell>
        <div className="glass rounded-2xl p-8 text-center">
          <ShieldAlert className="mx-auto h-10 w-10 text-brand" />
          <h2 className="mt-4 font-display text-xl font-bold">Admin access required</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account is signed in but does not have the admin role.
          </p>
          <button onClick={signOut} className="mt-6 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-brand">
            Sign out
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">Submissions</h1>
          <p className="text-sm text-muted-foreground">
            {leadsQuery.data?.length ?? 0} total requests
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => leadsQuery.refetch()}
            className="inline-flex items-center gap-2 rounded-xl border border-border/60 px-4 py-2 text-sm font-medium hover:bg-secondary transition"
          >
            <RefreshCcw className="h-4 w-4" /> Refresh
          </button>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-brand"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", ...LEAD_STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              filter === s ? "bg-gradient-brand text-white shadow-brand" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {s === "all" ? "All" : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {leadsQuery.isLoading ? (
        <p className="mt-10 text-muted-foreground">Loading submissions…</p>
      ) : rows.length === 0 ? (
        <div className="mt-10 glass rounded-2xl p-10 text-center">
          <Inbox className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No submissions in this view yet.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {rows.map((r) => (
            <div key={r.id} className="glass rounded-2xl p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-lg">{r.full_name}</h2>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusStyles[r.status] ?? "bg-secondary"}`}>
                      {STATUS_LABELS[r.status as LeadStatus] ?? r.status}
                    </span>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                      {r.form_type === "quote" ? "Quote" : "Contact"}
                    </span>
                  </div>
                  <a href={`mailto:${r.email}`} className="text-sm text-brand hover:underline">{r.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={r.status}
                    disabled={mutation.isPending}
                    onChange={(e) => mutation.mutate({ id: r.id, status: e.target.value as LeadStatus })}
                    className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <dl className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                <Detail label="Phone" value={r.phone} />
                <Detail label="WhatsApp" value={r.whatsapp} />
                <Detail label="Country" value={r.country} />
                <Detail label="Subject" value={r.subject} />
                <Detail label="Academic level" value={r.academic_level} />
                <Detail label="Deadline" value={r.deadline} />
                <Detail label="Submitted" value={new Date(r.created_at).toLocaleString()} />
              </dl>

              {r.message ? (
                <div className="mt-4 rounded-xl bg-secondary/60 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Message</div>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{r.message}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </Shell>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value?.trim() ? value : "—"}</dd>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-secondary/30 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link to="/" className="text-xs text-muted-foreground hover:text-brand transition">← Assignment Gurus</Link>
        <div className="mt-4">{children}</div>
      </div>
    </main>
  );
}
