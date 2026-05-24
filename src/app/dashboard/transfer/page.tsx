"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MotionPage } from "@/components/ui/Motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

type TransferStatus = "Completed" | "Processing" | "Scheduled" | "Failed";

type Transfer = {
  id: string;
  beneficiary: string;
  bank: string;
  amount: number;
  status: TransferStatus;
  date: string;
  method: string;
};

const transfers: Transfer[] = [
  {
    id: "trf_9021",
    beneficiary: "Orion Logistics",
    bank: "Atlas Bank",
    amount: 8200,
    status: "Completed",
    date: "2026-04-29",
    method: "Instant",
  },
  {
    id: "trf_9020",
    beneficiary: "Lumen Studio",
    bank: "Northwind Bank",
    amount: 1450,
    status: "Processing",
    date: "2026-04-29",
    method: "Standard",
  },
  {
    id: "trf_9019",
    beneficiary: "Starlight Labs",
    bank: "TopiPay Bank",
    amount: 560,
    status: "Scheduled",
    date: "2026-04-30",
    method: "Scheduled",
  },
  {
    id: "trf_9018",
    beneficiary: "Northwind Retail",
    bank: "Atlas Bank",
    amount: 2840,
    status: "Completed",
    date: "2026-04-28",
    method: "Instant",
  },
  {
    id: "trf_9017",
    beneficiary: "Summit Ventures",
    bank: "TopiPay Bank",
    amount: 1920,
    status: "Failed",
    date: "2026-04-27",
    method: "Standard",
  },
];

const statusOptions: Array<TransferStatus | "all"> = [
  "all",
  "Completed",
  "Processing",
  "Scheduled",
  "Failed",
];

export default function TransferPage() {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferStep, setTransferStep] = useState(0);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TransferStatus | "all">(
    "all",
  );
  const [page, setPage] = useState(1);
  const [schedule, setSchedule] = useState<"instant" | "scheduled">("instant");
  const [speed, setSpeed] = useState<"standard" | "instant">("standard");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<"USD" | "NGN" | "EUR">("USD");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [destinationBank, setDestinationBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const filtered = useMemo(() => {
    return transfers.filter((transfer) => {
      const matchesQuery = query
        ? transfer.beneficiary.toLowerCase().includes(query.toLowerCase()) ||
          transfer.id.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesStatus =
        statusFilter === "all" ? true : transfer.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [query, statusFilter]);

  useEffect(() => {
    if (!showTransferModal) return;
    setTransferStep(0);
  }, [showTransferModal]);

  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (nextPage: number) => {
    setPage(Math.min(Math.max(1, nextPage), totalPages));
  };

  const amountValue = Number(amount.replace(/[^0-9.]/g, ""));
  const feeValue = amountValue ? Math.max(2.5, amountValue * 0.008) : 0;
  const totalValue = amountValue + feeValue;
  const stepLabels = ["Details", "Schedule", "Review"];

  return (
    <MotionPage className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-500">
            Transfers
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">Transfer</h1>
          <p className="text-sm text-slate-600">
            Initiate and manage outgoing transfers with approvals and
            scheduling.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">Download report</Button>
          <Button onClick={() => setShowTransferModal(true)}>
            New transfer
          </Button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            label: "Scheduled payouts",
            value: "14 queued",
            tone: "border-amber-200/70 bg-amber-50/60",
          },
          {
            label: "Total transfer volume",
            value: "$182,400",
            tone: "border-blue-200/70 bg-blue-50/60",
          },
          {
            label: "Success rate",
            value: "99.1%",
            tone: "border-emerald-200/70 bg-emerald-50/60",
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

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Transfer workspace
              </h2>
              <p className="text-sm text-slate-600">
                Build transfers, request approvals, and schedule payouts from a
                single flow.
              </p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Secure flow
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                label: "Approvals needed",
                value: "3",
                tone: "border-amber-200/70 bg-amber-50/60",
              },
              {
                label: "Ready to release",
                value: "$24,800",
                tone: "border-emerald-200/70 bg-emerald-50/60",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl border px-4 py-3 ${item.tone}`}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => setShowTransferModal(true)}>
              Create transfer
            </Button>
            <Button variant="outline">Request approval</Button>
            <Button variant="ghost">Bulk upload</Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-blue-100/70 bg-gradient-to-br from-white via-white to-blue-50/70 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Transfer summary
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Review fees and arrival timing before submitting.
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Estimated fee</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(feeValue, currency)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Net amount</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(amountValue, currency)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total debit</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(totalValue, currency)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>ETA</span>
                <span className="font-semibold text-emerald-600">
                  {speed === "instant" ? "Minutes" : "Next business day"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Recent beneficiaries
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {["Orion Logistics", "Lumen Studio", "Summit Ventures"].map(
                (name) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{name}</p>
                      <p className="text-xs text-slate-500">
                        TopiPay Bank · NGN
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => setShowTransferModal(true)}
                    >
                      Use
                    </Button>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Recent transfers
            </h2>
            <p className="text-sm text-slate-600">
              Track the latest approvals, failures, and scheduled payouts.
            </p>
          </div>
          <Button variant="ghost">View all</Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="min-w-[220px] flex-1">
            <Input
              label="Search"
              placeholder="Search by beneficiary or transfer ID"
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
                setStatusFilter(event.target.value as TransferStatus | "all")
              }
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All" : status}
                </option>
              ))}
            </select>
          </label>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {filtered.length} results
          </span>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <div className="grid grid-cols-5 gap-4 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <span>Beneficiary</span>
            <span>Bank</span>
            <span>Method</span>
            <span>Status</span>
            <span className="text-right">Amount</span>
          </div>
          <div className="divide-y divide-slate-200">
            {paged.map((transfer) => (
              <div
                key={transfer.id}
                className="grid grid-cols-5 gap-4 px-4 py-4 text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    {transfer.beneficiary}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(transfer.date)} · {transfer.id}
                  </p>
                </div>
                <div className="text-slate-600">{transfer.bank}</div>
                <div className="text-slate-600">{transfer.method}</div>
                <div>
                  <span
                    className={
                      transfer.status === "Completed"
                        ? "rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                        : transfer.status === "Processing"
                          ? "rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
                          : transfer.status === "Scheduled"
                            ? "rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                            : "rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700"
                    }
                  >
                    {transfer.status}
                  </span>
                </div>
                <div className="text-right font-semibold text-slate-900">
                  {formatCurrency(transfer.amount, "USD")}
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500">
              No transfers match your filters.
            </div>
          ) : null}
        </div>
        {filtered.length > 0 ? (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
            <p className="text-slate-500">
              Showing {(currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, filtered.length)} of{" "}
              {filtered.length} transfers
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

      <Modal
        isOpen={showTransferModal}
        title="New transfer"
        onClose={() => setShowTransferModal(false)}
      >
        <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-xs text-slate-600">
            Add beneficiary details, set the schedule, and review the payout
            summary before submitting.
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {stepLabels.map((label, index) => (
                <span
                  key={label}
                  className={
                    transferStep === index ? "text-blue-600" : "text-slate-400"
                  }
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="h-1 rounded-full bg-slate-100">
              <div
                className="h-1 rounded-full bg-blue-500 transition-all"
                style={{ width: `${((transferStep + 1) / 3) * 100}%` }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {transferStep === 0 ? (
              <motion.div
                key="step-details"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Beneficiary name"
                    placeholder="Orion Logistics"
                    value={beneficiaryName}
                    onChange={(event) => setBeneficiaryName(event.target.value)}
                  />
                  <Input
                    label="Destination bank"
                    placeholder="Atlas Bank"
                    value={destinationBank}
                    onChange={(event) => setDestinationBank(event.target.value)}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Account number"
                    placeholder="0123456789"
                    value={accountNumber}
                    onChange={(event) => setAccountNumber(event.target.value)}
                  />
                  <Input
                    label="Reference"
                    placeholder="April supplier payout"
                    value={reference}
                    onChange={(event) => setReference(event.target.value)}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                  <Input
                    label="Amount"
                    type="number"
                    placeholder="2500"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                  />
                  <label className="flex flex-col gap-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">Currency</span>
                    <select
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      value={currency}
                      onChange={(event) =>
                        setCurrency(event.target.value as "USD" | "NGN" | "EUR")
                      }
                    >
                      <option value="USD">USD</option>
                      <option value="NGN">NGN</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </label>
                </div>
              </motion.div>
            ) : null}

            {transferStep === 1 ? (
              <motion.div
                key="step-schedule"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <label className="flex flex-col gap-2 text-sm text-slate-700">
                  <span className="font-medium text-slate-900">Notes</span>
                  <textarea
                    className="min-h-[100px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Add any context for your finance team"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                  />
                </label>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Scheduling
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["instant", "scheduled"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setSchedule(option as "instant" | "scheduled")
                        }
                        className={cn(
                          "rounded-full border px-4 py-1 text-xs font-semibold capitalize transition",
                          schedule === option
                            ? "border-blue-200 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {schedule === "scheduled" ? (
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <Input
                        label="Scheduled date"
                        type="date"
                        value={scheduledDate}
                        onChange={(event) =>
                          setScheduledDate(event.target.value)
                        }
                      />
                      <Input
                        label="Scheduled time"
                        type="time"
                        value={scheduledTime}
                        onChange={(event) =>
                          setScheduledTime(event.target.value)
                        }
                      />
                    </div>
                  ) : null}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Transfer speed
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      {
                        key: "standard",
                        label: "Standard (T+1)",
                      },
                      {
                        key: "instant",
                        label: "Instant (minutes)",
                      },
                    ].map((option) => (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() =>
                          setSpeed(option.key as "standard" | "instant")
                        }
                        className={cn(
                          "rounded-full border px-4 py-1 text-xs font-semibold transition",
                          speed === option.key
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}

            {transferStep === 2 ? (
              <motion.div
                key="step-review"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Beneficiary</span>
                    <span className="font-semibold text-slate-900">
                      {beneficiaryName || "-"}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span>Bank</span>
                    <span className="font-semibold text-slate-900">
                      {destinationBank || "-"}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span>Account number</span>
                    <span className="font-semibold text-slate-900">
                      {accountNumber || "-"}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span>Reference</span>
                    <span className="font-semibold text-slate-900">
                      {reference || "-"}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span>Schedule</span>
                    <span className="font-semibold text-slate-900">
                      {schedule === "instant"
                        ? "Instant"
                        : `${scheduledDate || "-"} ${scheduledTime || ""}`}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Estimated fee</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(feeValue, currency)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span>Net amount</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(amountValue, currency)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span>Total debit</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(totalValue, currency)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span>ETA</span>
                    <span className="font-semibold text-emerald-600">
                      {speed === "instant" ? "Minutes" : "Next business day"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => setTransferStep((prev) => Math.max(0, prev - 1))}
              disabled={transferStep === 0}
            >
              Back
            </Button>
            <div className="flex gap-3">
              {transferStep < 2 ? (
                <Button
                  type="button"
                  onClick={() =>
                    setTransferStep((prev) => Math.min(2, prev + 1))
                  }
                >
                  Continue
                </Button>
              ) : (
                <>
                  <Button variant="outline" type="button">
                    Request approval
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowTransferModal(false)}
                  >
                    Submit transfer
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </MotionPage>
  );
}
