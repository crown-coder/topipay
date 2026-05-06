"use client";

import { useMemo, useState } from "react";
import { MotionPage } from "@/components/ui/Motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Transaction } from "@/types";

type TransactionRow = Transaction & {
  method: string;
  channel: string;
  fee: number;
  customer: string;
};

const transactions: TransactionRow[] = [
  {
    id: "txn_9201",
    merchant: "Nova Freight",
    amount: -420.12,
    status: "Completed",
    date: "2026-04-29",
    method: "Card",
    channel: "Online",
    fee: 6.3,
    customer: "Orion Logistics",
  },
  {
    id: "txn_9200",
    merchant: "Inbound payout",
    amount: 1275.5,
    status: "Settled",
    date: "2026-04-28",
    method: "Bank transfer",
    channel: "ACH",
    fee: 2.1,
    customer: "Lumen Studio",
  },
  {
    id: "txn_9199",
    merchant: "Lumen Cards",
    amount: -89.99,
    status: "Completed",
    date: "2026-04-28",
    method: "Card",
    channel: "Online",
    fee: 1.9,
    customer: "Mason & Co",
  },
  {
    id: "txn_9198",
    merchant: "Bluepeak Hosting",
    amount: -64.0,
    status: "Completed",
    date: "2026-04-27",
    method: "Card",
    channel: "Online",
    fee: 1.2,
    customer: "Bluepeak Hosting",
  },
  {
    id: "txn_9197",
    merchant: "Starlight Labs",
    amount: -315.75,
    status: "Completed",
    date: "2026-04-27",
    method: "Card",
    channel: "In-app",
    fee: 4.6,
    customer: "Starlight Labs",
  },
  {
    id: "txn_9196",
    merchant: "Inbound payout",
    amount: 820.25,
    status: "Settled",
    date: "2026-04-26",
    method: "Bank transfer",
    channel: "Wire",
    fee: 1.8,
    customer: "Atlas Banking",
  },
  {
    id: "txn_9195",
    merchant: "Mercury Foods",
    amount: -72.13,
    status: "Completed",
    date: "2026-04-25",
    method: "Card",
    channel: "POS",
    fee: 1.3,
    customer: "Mercury Foods",
  },
  {
    id: "txn_9194",
    merchant: "Atlas Bank",
    amount: 2280.0,
    status: "Settled",
    date: "2026-04-25",
    method: "Bank transfer",
    channel: "ACH",
    fee: 2.4,
    customer: "Atlas Bank",
  },
  {
    id: "txn_9193",
    merchant: "Nexa Retail",
    amount: -142.88,
    status: "Completed",
    date: "2026-04-24",
    method: "Card",
    channel: "Online",
    fee: 2.2,
    customer: "Nexa Retail",
  },
  {
    id: "txn_9192",
    merchant: "CloudTransit",
    amount: -189.4,
    status: "Pending",
    date: "2026-04-24",
    method: "Card",
    channel: "Online",
    fee: 2.8,
    customer: "CloudTransit",
  },
  {
    id: "txn_9191",
    merchant: "Aurora Labs",
    amount: -510.0,
    status: "Failed",
    date: "2026-04-23",
    method: "Card",
    channel: "In-app",
    fee: 0,
    customer: "Aurora Labs",
  },
  {
    id: "txn_9190",
    merchant: "Inbound payout",
    amount: 930.5,
    status: "Settled",
    date: "2026-04-22",
    method: "Bank transfer",
    channel: "Wire",
    fee: 1.7,
    customer: "Northwind Bank",
  },
];

const statusOptions: Transaction["status"][] = [
  "Completed",
  "Pending",
  "Settled",
  "Failed",
];

export default function TransactionsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    Transaction["status"] | "all"
  >("all");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const filtered = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesQuery = query
        ? txn.merchant.toLowerCase().includes(query.toLowerCase()) ||
          txn.id.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesStatus =
        statusFilter === "all" ? true : txn.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (nextPage: number) => {
    setPage(Math.min(Math.max(1, nextPage), totalPages));
  };

  return (
    <MotionPage className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Transactions
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Transaction activity
          </h1>
          <p className="text-sm text-slate-600">
            Track incoming and outgoing payment activity across all channels.
          </p>
        </div>
        <Button>Export CSV</Button>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-[220px] flex-1">
            <Input
              label="Search"
              placeholder="Search by merchant or transaction ID"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <label className="flex min-w-[180px] flex-col gap-2 text-sm text-slate-700">
            <span className="font-medium text-slate-900">Status</span>
            <select
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as Transaction["status"] | "all",
                )
              }
            >
              <option value="all">All</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {filtered.length} results
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Processed today
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">$28,420</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Settled this week
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              $134,880
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Failed payments
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">12</p>
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <div className="grid grid-cols-5 gap-4 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <span>Transaction</span>
            <span>Customer</span>
            <span>Method</span>
            <span>Fees</span>
            <span className="text-right">Amount</span>
          </div>
          <div className="divide-y divide-slate-200">
            {paged.map((txn) => (
              <div
                key={txn.id}
                className="grid grid-cols-5 gap-4 px-4 py-4 text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-900">{txn.merchant}</p>
                  <p className="text-xs text-slate-500">
                    {formatDate(txn.date)} · {txn.id}
                  </p>
                  <span
                    className={
                      txn.status === "Completed"
                        ? "mt-2 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700"
                        : txn.status === "Pending"
                          ? "mt-2 inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700"
                          : txn.status === "Settled"
                            ? "mt-2 inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700"
                            : "mt-2 inline-flex rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700"
                    }
                  >
                    {txn.status}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{txn.customer}</p>
                  <p className="text-xs text-slate-500">Account owner</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{txn.method}</p>
                  <p className="text-xs text-slate-500">{txn.channel}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    {formatCurrency(txn.fee, "USD")}
                  </p>
                  <p className="text-xs text-slate-500">Processing fee</p>
                </div>
                <div className="text-right">
                  <p
                    className={
                      txn.amount >= 0
                        ? "font-semibold text-emerald-600"
                        : "font-semibold text-slate-900"
                    }
                  >
                    {formatCurrency(txn.amount, "USD")}
                  </p>
                  <p className="text-xs text-slate-500">Net amount</p>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No transactions match your filters.
            </div>
          ) : null}
        </div>
        {filtered.length > 0 ? (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
            <p className="text-slate-500">
              Showing {(currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, filtered.length)} of{" "}
              {filtered.length} transactions
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === currentPage;
                return (
                  <button
                    key={`page-${pageNumber}`}
                    type="button"
                    onClick={() => handlePageChange(pageNumber)}
                    className={
                      isActive
                        ? "rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white"
                        : "rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-slate-300"
                    }
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <Button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        ) : null}
      </section>
    </MotionPage>
  );
}
