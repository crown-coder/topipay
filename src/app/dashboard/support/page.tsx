import { MotionPage } from "@/components/ui/Motion";

export default function SupportPage() {
  return (
    <MotionPage className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-500">
          Support
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Support</h1>
        <p className="text-sm text-slate-600">
          View support tickets and contact the TopiPay team.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            label: "Open tickets",
            value: "3",
            tone: "border-amber-200/70 bg-amber-50/60",
          },
          {
            label: "Resolved this week",
            value: "18",
            tone: "border-emerald-200/70 bg-emerald-50/60",
          },
          {
            label: "Average response",
            value: "1h 12m",
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

      <section className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Priority queue</h2>
        <p className="mt-2 text-sm text-slate-600">
          High-priority issues and escalations will surface here.
        </p>
      </section>
    </MotionPage>
  );
}
