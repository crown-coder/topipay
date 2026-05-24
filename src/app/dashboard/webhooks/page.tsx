import { MotionPage } from "@/components/ui/Motion";

export default function WebhooksPage() {
  return (
    <MotionPage className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-500">
          Webhooks
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Webhook Event</h1>
        <p className="text-sm text-slate-600">
          Monitor webhook deliveries and retry events.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            label: "Delivery rate",
            value: "99.6%",
            tone: "border-emerald-200/70 bg-emerald-50/60",
          },
          {
            label: "Retries (24h)",
            value: "6",
            tone: "border-amber-200/70 bg-amber-50/60",
          },
          {
            label: "Active endpoints",
            value: "4",
            tone: "border-blue-200/70 bg-blue-50/60",
          },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-3xl border p-6 shadow-sm ${item.tone}`}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {item.label}
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-blue-100/70 bg-gradient-to-br from-white via-white to-blue-50/70 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Delivery log</h2>
        <p className="mt-2 text-sm text-slate-600">
          Event delivery history will appear here with status and retry context.
        </p>
      </section>
    </MotionPage>
  );
}
