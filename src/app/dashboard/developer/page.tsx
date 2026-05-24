import { MotionPage } from "@/components/ui/Motion";

export default function DeveloperPage() {
  return (
    <MotionPage className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-500">
          Developer
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Developer API</h1>
        <p className="text-sm text-slate-600">
          Manage API keys and developer settings.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            label: "Live keys",
            value: "2 active",
            tone: "border-emerald-200/70 bg-emerald-50/60",
          },
          {
            label: "Test keys",
            value: "3 active",
            tone: "border-blue-200/70 bg-blue-50/60",
          },
          {
            label: "Webhook secrets",
            value: "1 configured",
            tone: "border-indigo-200/70 bg-indigo-50/60",
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
        <h2 className="text-lg font-semibold text-slate-900">
          Environment settings
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Toggle test mode, rotate keys, and manage IP allowlists.
        </p>
      </section>
    </MotionPage>
  );
}
