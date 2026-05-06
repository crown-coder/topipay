"use client";

import { useState } from "react";
import { MotionPage } from "@/components/ui/Motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

export default function WalletPage() {
  const [showFundingModal, setShowFundingModal] = useState(false);
  const [showMoveFundsModal, setShowMoveFundsModal] = useState(false);

  return (
    <>
      <MotionPage className="space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Wallet
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">
              Treasury overview
            </h1>
            <p className="text-sm text-slate-600">
              Review balances, funding sources, and wallet activity.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => setShowFundingModal(true)}>
              Add funding source
            </Button>
            <Button onClick={() => setShowMoveFundsModal(true)}>
              Move funds
            </Button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Available balance</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                  $32,480.12
                </h2>
                <p className="mt-1 text-xs text-slate-500">Updated just now</p>
              </div>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Verified
              </span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Pending", value: "$4,210.40" },
                { label: "Reserved", value: "$2,890.00" },
                { label: "Payout limit", value: "$120,000" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
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
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Weekly inflow</span>
                <span>$96.3k</span>
              </div>
              <div className="mt-3 flex h-20 items-end gap-2">
                {[24, 48, 36, 60, 72, 54, 84].map((value, index) => (
                  <div
                    key={`inflow-${index}`}
                    className="flex-1 rounded-full bg-blue-100"
                    style={{ height: `${value}px` }}
                  >
                    <div className="h-full w-full rounded-full bg-blue-500/70" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Primary accounts
              </h3>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                {[
                  {
                    bank: "Atlas Bank · USD",
                    detail: "**** 4108 · ACH enabled",
                  },
                  {
                    bank: "Northwind Bank · EUR",
                    detail: "**** 2231 · SEPA enabled",
                  },
                ].map((account) => (
                  <div
                    key={account.bank}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {account.bank}
                      </p>
                      <p className="text-xs text-slate-500">{account.detail}</p>
                    </div>
                    <Button variant="ghost">Manage</Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Funding health
              </h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Card settlement</span>
                  <span className="font-semibold text-emerald-600">
                    On track
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Chargebacks</span>
                  <span className="font-semibold text-slate-900">0.12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Rolling reserve</span>
                  <span className="font-semibold text-slate-900">$6,840</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                Recent wallet activity
              </h3>
              <Button variant="ghost">View all</Button>
            </div>
            <div className="mt-4 divide-y divide-slate-200">
              {[
                {
                  label: "Inbound settlement",
                  time: "Today · 4:12 PM",
                  amount: "+$12,400",
                },
                {
                  label: "Payout to Atlas Bank",
                  time: "Yesterday · 2:05 PM",
                  amount: "-$4,800",
                },
                {
                  label: "Card funding",
                  time: "Apr 28 · 11:20 AM",
                  amount: "+$3,200",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-4 text-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.time}</p>
                  </div>
                  <span className="font-semibold text-slate-900">
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Treasury insights
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Maintain a buffer of 2x average daily payouts to avoid delays.
            </p>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-200 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Suggested buffer
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  $18,400
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Next payout run
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  May 2, 10:00 AM
                </p>
              </div>
            </div>
          </div>
        </section>
      </MotionPage>

      <Modal
        isOpen={showFundingModal}
        title="Add funding source"
        onClose={() => setShowFundingModal(false)}
        footer={
          <Button
            className="w-full"
            type="button"
            onClick={() => setShowFundingModal(false)}
          >
            Save funding source
          </Button>
        }
      >
        <p className="text-sm text-slate-600">
          Link a bank account to fund your wallet.
        </p>
        <Input label="Bank name" placeholder="Atlas Bank" />
        <Input label="Account number" placeholder="**** 4108" />
        <Input label="Routing number" placeholder="110000000" />
      </Modal>

      <Modal
        isOpen={showMoveFundsModal}
        title="Move funds"
        onClose={() => setShowMoveFundsModal(false)}
        footer={
          <Button
            className="w-full"
            type="button"
            onClick={() => setShowMoveFundsModal(false)}
          >
            Confirm transfer
          </Button>
        }
      >
        <p className="text-sm text-slate-600">
          Transfer funds between wallets or external accounts.
        </p>
        <Input label="Amount" placeholder="$2,500" />
        <Input
          label="Destination account"
          placeholder="Atlas Bank · **** 4108"
        />
        <Input label="Reference" placeholder="Payout sweep" />
      </Modal>
    </>
  );
}
