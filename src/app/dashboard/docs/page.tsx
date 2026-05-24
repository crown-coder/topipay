import { MotionPage } from "@/components/ui/Motion";

export default function DocsPage() {
  return (
    <MotionPage className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-500">Docs</p>
        <h1 className="text-2xl font-semibold text-slate-900">Documentation</h1>
        <p className="text-sm text-slate-600">
          Explore integration guides and API references.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-blue-100/70 bg-gradient-to-br from-white via-white to-blue-50/70 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Quickstart
          </p>
          <h2 className="mt-3 text-lg font-semibold text-slate-900">
            Launch a payment flow in minutes
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            SDK setup, auth, and first charge walk-throughs will live here.
          </p>
        </div>
        <div className="rounded-3xl border border-indigo-100/70 bg-indigo-50/40 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            API reference
          </p>
          <h2 className="mt-3 text-lg font-semibold text-slate-900">
            Endpoints, schemas, and error codes
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Browse resources by product, version, and language.
          </p>
        </div>
      </section>
    </MotionPage>
  );
}
