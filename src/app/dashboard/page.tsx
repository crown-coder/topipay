"use client";

import { useEffect, useState } from "react";
import BalanceCard from "@/components/dashboard/BalanceCard";
import KycStatusCard from "@/components/dashboard/KycStatusCard";
import TransactionList from "@/components/dashboard/TransactionList";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { MotionItem, MotionStagger } from "@/components/ui/Motion";
import type { Transaction } from "@/types";

const transactions: Transaction[] = [
  {
    id: "txn_5401",
    merchant: "CloudTransit",
    amount: -189.4,
    status: "Completed",
    date: "2026-04-29",
  },
  {
    id: "txn_5400",
    merchant: "Mercury Foods",
    amount: -72.13,
    status: "Completed",
    date: "2026-04-28",
  },
  {
    id: "txn_5399",
    merchant: "Inbound payout",
    amount: 1250,
    status: "Settled",
    date: "2026-04-28",
  },
];

const volumeSeries = [42, 65, 58, 72, 92, 74, 110, 96, 84, 120, 88, 104];

export default function DashboardPage() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    setShowPasswordModal(true);
  }, []);

  return (
    <>
      <MotionStagger className="space-y-8">
        <MotionItem>
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Overview
              </p>
              <h1 className="text-2xl font-semibold text-slate-900">
                Payment performance
              </h1>
              <p className="text-sm text-slate-600">
                Real-time visibility into balances, transactions, and payout
                health.
              </p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
              Verified business
            </span>
          </header>
        </MotionItem>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <MotionStagger className="space-y-6">
            <MotionItem>
              <BalanceCard balance={12480.55} currency="USD" />
            </MotionItem>
            <MotionItem>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Payment volume
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">
                    Last 12 weeks
                  </span>
                </div>
                <div className="mt-6 flex h-32 items-end gap-2">
                  {volumeSeries.map((value, index) => (
                    <div
                      key={`vol-${index}`}
                      className="flex-1 rounded-full bg-blue-100"
                      style={{ height: `${value}px` }}
                    >
                      <div className="h-full w-full rounded-full bg-blue-500/70" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                  <span>$248k processed</span>
                  <span className="text-emerald-600">+14.2% vs last month</span>
                </div>
              </div>
            </MotionItem>
          </MotionStagger>

          <MotionStagger className="space-y-6">
            <MotionItem>
              <KycStatusCard />
            </MotionItem>
            <MotionItem>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Quick actions
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Move funds instantly or request a payout.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button>Send money</Button>
                  <Button variant="outline">Request payout</Button>
                </div>
              </div>
            </MotionItem>
            <MotionItem>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Risk signals
                </h3>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Chargeback rate</span>
                    <span className="font-semibold text-slate-900">0.21%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Dispute window</span>
                    <span className="font-semibold text-slate-900">3 open</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Success rate</span>
                    <span className="font-semibold text-emerald-600">
                      98.4%
                    </span>
                  </div>
                </div>
              </div>
            </MotionItem>
          </MotionStagger>
        </div>

        <MotionItem>
          <TransactionList transactions={transactions} />
        </MotionItem>
      </MotionStagger>

      <Modal
        isOpen={showPasswordModal}
        title="Set transaction password"
        onClose={() => setShowPasswordModal(false)}
        footer={
          <Button
            className="w-full"
            type="button"
            onClick={() => setShowPasswordModal(false)}
          >
            Save password
          </Button>
        }
      >
        <p className="text-sm text-slate-600">
          Add an extra layer of security before approving payouts and
          withdrawals.
        </p>
        <Input
          label="Transaction password"
          type="password"
          placeholder="Create a secure password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Re-enter password"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
        />
      </Modal>
    </>
  );
}
