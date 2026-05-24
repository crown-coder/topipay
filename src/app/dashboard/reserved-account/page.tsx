"use client";

import { useState } from "react";
import { MotionPage } from "@/components/ui/Motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

export default function ReservedAccountPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  return (
    <>
      <MotionPage className="space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Reserved Accounts
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">
              Dedicated collection accounts
            </h1>
            <p className="text-sm text-slate-600">
              Issue virtual accounts for customers to pay in local currency.
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            Create reserved account
          </Button>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-blue-100/80 bg-gradient-to-br from-white via-white to-blue-50/70 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total collections</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                  $482,120.44
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Updated 2 minutes ago
                </p>
              </div>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                12 active accounts
              </span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Today",
                  value: "$18,420",
                  tone: "border-blue-200/70 bg-blue-50/60",
                },
                {
                  label: "This week",
                  value: "$102,880",
                  tone: "border-emerald-200/70 bg-emerald-50/60",
                },
                {
                  label: "Success rate",
                  value: "99.2%",
                  tone: "border-indigo-200/70 bg-indigo-50/60",
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
            <div className="mt-6">
              <p className="text-sm text-slate-500">Collection velocity</p>
              <div className="mt-3 flex h-20 items-end gap-2">
                {[24, 48, 36, 60, 72, 54, 84].map((value, index) => (
                  <div
                    key={`collection-${index}`}
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
                Routing rules
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Configure settlement routing for virtual accounts.
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Auto-sweep to primary wallet</span>
                  <span className="font-semibold text-emerald-600">
                    Enabled
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Settlement window</span>
                  <span className="font-semibold text-slate-900">T+1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>FX conversion</span>
                  <span className="font-semibold text-slate-900">Manual</span>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline">Manage routing</Button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Compliance status
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Monitor reserved account compliance controls.
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>BVN verification</span>
                  <span className="font-semibold text-emerald-600">
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Transaction monitoring</span>
                  <span className="font-semibold text-slate-900">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Limit guardrails</span>
                  <span className="font-semibold text-slate-900">Standard</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Active reserved accounts
              </h3>
              <p className="text-sm text-slate-600">
                Use dedicated account numbers per customer or business unit.
              </p>
            </div>
            <Button variant="ghost">Export list</Button>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-5 gap-4 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <span>Account name</span>
              <span>Bank</span>
              <span>Account number</span>
              <span>Status</span>
              <span className="text-right">Action</span>
            </div>
            <div className="divide-y divide-slate-200">
              {[
                {
                  name: "Acme Retail",
                  bank: "TopiPay Bank",
                  number: "3200012345",
                  status: "Active",
                },
                {
                  name: "Orion Logistics",
                  bank: "TopiPay Bank",
                  number: "3200012877",
                  status: "Active",
                },
                {
                  name: "Northwind Subscriptions",
                  bank: "TopiPay Bank",
                  number: "3200013990",
                  status: "Paused",
                },
              ].map((account) => (
                <div
                  key={account.number}
                  className="grid grid-cols-5 gap-4 px-4 py-4 text-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {account.name}
                    </p>
                    <p className="text-xs text-slate-500">NGN collections</p>
                  </div>
                  <div className="text-slate-600">{account.bank}</div>
                  <div className="text-slate-600">{account.number}</div>
                  <div>
                    <span
                      className={
                        account.status === "Active"
                          ? "rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                          : "rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
                      }
                    >
                      {account.status}
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => {
                        setSelectedAccount(account.name);
                        setShowRenameModal(true);
                      }}
                    >
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </MotionPage>

      <Modal
        isOpen={showCreateModal}
        title="Create reserved account"
        onClose={() => setShowCreateModal(false)}
        footer={
          <Button
            className="w-full"
            type="button"
            onClick={() => setShowCreateModal(false)}
          >
            Create account
          </Button>
        }
      >
        <p className="text-sm text-slate-600">
          Generate a new virtual account for a customer or business unit.
        </p>
        <Input label="Account name" placeholder="Acme Retail" />
        <Input label="Customer ID" placeholder="cus_1021" />
        <Input label="Currency" placeholder="NGN" />
      </Modal>

      <Modal
        isOpen={showRenameModal}
        title="Manage reserved account"
        onClose={() => setShowRenameModal(false)}
        footer={
          <Button
            className="w-full"
            type="button"
            onClick={() => setShowRenameModal(false)}
          >
            Save changes
          </Button>
        }
      >
        <p className="text-sm text-slate-600">
          Update the reserved account display name or pause collections.
        </p>
        <Input
          label="Account name"
          placeholder="Account display name"
          value={selectedAccount ?? ""}
          onChange={(event) => setSelectedAccount(event.target.value)}
        />
        <Input label="Status" placeholder="Active" />
      </Modal>
    </>
  );
}
