import { formatCurrency } from "@/lib/utils";

type BalanceCardProps = {
  balance: number;
  currency: string;
};

export default function BalanceCard({ balance, currency }: BalanceCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[url('/assets/card-balance-bg.png')] bg-cover bg-center p-6 shadow-sm">
      <div className="absolute inset-0 bg-white/75" />
      <div className="relative">
        <p className="text-sm text-slate-600">Total balance</p>
        <h3 className="mt-4 text-4xl font-semibold text-slate-950">
          {formatCurrency(balance, currency)}
        </h3>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
            +12.4% this month
          </span>
          <span>Next settlement in 2 days</span>
        </div>
      </div>
    </div>
  );
}
