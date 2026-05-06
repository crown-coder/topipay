import { formatCurrency, formatDate } from "@/lib/utils";
import type { Transaction } from "@/types";

type TransactionListProps = {
  transactions: Transaction[];
};

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">
          Recent activity
        </h3>
        <button
          type="button"
          className="text-sm font-semibold text-slate-500 hover:text-slate-700"
        >
          View all
        </button>
      </div>
      <div className="mt-6 divide-y divide-slate-200">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex flex-wrap items-center justify-between gap-4 py-4"
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {transaction.merchant}
              </p>
              <p className="text-xs text-slate-500">
                {formatDate(transaction.date)}
              </p>
            </div>
            <div className="text-right">
              <p
                className={
                  transaction.amount >= 0
                    ? "text-sm font-semibold text-emerald-700"
                    : "text-sm font-semibold text-slate-900"
                }
              >
                {formatCurrency(transaction.amount, "USD")}
              </p>
              <p className="text-xs text-slate-500">{transaction.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
