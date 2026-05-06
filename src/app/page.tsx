import Link from "next/link";
import { MotionItem, MotionPage, MotionStagger } from "@/components/ui/Motion";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <MotionPage className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-16">
        <div className="flex flex-col gap-6">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
            TopiPay
          </p>
          <h1 className="max-w-2xl text-5xl font-semibold leading-tight text-slate-950">
            A calm, fast way to move money and track every payment.
          </h1>
          <p className="max-w-xl text-lg text-slate-600">
            Keep your balance, transfers, and payouts in a single workspace with
            clear visibility and zero noise.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/login"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
            >
              Create account
            </Link>
          </div>
        </div>
        <MotionStagger className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Balances",
              description:
                "Real-time balances across cards, wallets, and bank accounts.",
            },
            {
              title: "Transfers",
              description:
                "Move funds instantly with smart routing and alerts.",
            },
            {
              title: "Insights",
              description:
                "Surface trends with clear, decision-ready summaries.",
            },
          ].map((card) => (
            <MotionItem
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{card.description}</p>
            </MotionItem>
          ))}
        </MotionStagger>
      </MotionPage>
    </div>
  );
}
