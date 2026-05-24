"use client";

import { useState } from "react";
import { MotionPage } from "@/components/ui/Motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function SettingsPage() {
  const [enable2fa, setEnable2fa] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);
  const [payoutApprovals, setPayoutApprovals] = useState(true);
  const [dailyLimit, setDailyLimit] = useState("50000");
  const [ipAllowlist, setIpAllowlist] = useState("203.0.113.24, 203.0.113.88");

  return (
    <MotionPage className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-500">
          Settings
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-600">
          Update business profile, permissions, and preferences.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            label: "Business profile",
            value: "4 sections complete",
            tone: "border-blue-200/70 bg-blue-50/60",
          },
          {
            label: "Security",
            value: "2FA enabled",
            tone: "border-emerald-200/70 bg-emerald-50/60",
          },
          {
            label: "Notifications",
            value: "3 channels active",
            tone: "border-amber-200/70 bg-amber-50/60",
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
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Business profile
                </h2>
                <p className="text-sm text-slate-600">
                  Update legal entity details used for KYC and payouts.
                </p>
              </div>
              <Button variant="outline">Edit profile</Button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Input label="Business name" placeholder="TopiPay Labs" />
              <Input label="Business email" placeholder="finance@topipay.co" />
              <Input label="Country" placeholder="Nigeria" />
              <Input label="State" placeholder="Lagos" />
              <Input label="Support contact" placeholder="+234 802 123 4567" />
              <Input label="Website" placeholder="https://topipay.co" />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Team & roles
                </h2>
                <p className="text-sm text-slate-600">
                  Control who can approve, schedule, or release transfers.
                </p>
              </div>
              <Button>Add member</Button>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid grid-cols-4 gap-4 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <span>Name</span>
                <span>Role</span>
                <span>Status</span>
                <span className="text-right">Action</span>
              </div>
              <div className="divide-y divide-slate-200 text-sm">
                {[
                  {
                    name: "Sadiq",
                    role: "Owner",
                    status: "Active",
                  },
                  {
                    name: "Riley Chen",
                    role: "Finance Admin",
                    status: "Active",
                  },
                  {
                    name: "Morgan Dale",
                    role: "Approver",
                    status: "Invited",
                  },
                ].map((member) => (
                  <div
                    key={member.name}
                    className="grid grid-cols-4 gap-4 px-4 py-4"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">
                        {member.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {member.name.split(" ")[0].toLowerCase()}@topipay.co
                      </p>
                    </div>
                    <div className="text-slate-600">{member.role}</div>
                    <div>
                      <span
                        className={
                          member.status === "Active"
                            ? "rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                            : "rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
                        }
                      >
                        {member.status}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="ghost">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-indigo-100/70 bg-indigo-50/40 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Workspace preferences
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Manage team access, approval flows, and payout policies.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Security</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span>
                  <span className="block font-semibold text-slate-900">
                    Two-factor authentication
                  </span>
                  <span className="text-xs text-slate-500">
                    Require 2FA for payout approvals.
                  </span>
                </span>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                  checked={enable2fa}
                  onChange={(event) => setEnable2fa(event.target.checked)}
                />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span>
                  <span className="block font-semibold text-slate-900">
                    IP allowlist
                  </span>
                  <span className="text-xs text-slate-500">
                    Restrict dashboard access to approved IPs.
                  </span>
                </span>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                  defaultChecked
                />
              </label>
              <Input
                label="Allowed IPs"
                placeholder="203.0.113.24, 203.0.113.88"
                value={ipAllowlist}
                onChange={(event) => setIpAllowlist(event.target.value)}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">
              Notifications
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span>
                  <span className="block font-semibold text-slate-900">
                    Email alerts
                  </span>
                  <span className="text-xs text-slate-500">
                    Receive payout and chargeback notifications.
                  </span>
                </span>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                  checked={emailAlerts}
                  onChange={(event) => setEmailAlerts(event.target.checked)}
                />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span>
                  <span className="block font-semibold text-slate-900">
                    Slack alerts
                  </span>
                  <span className="text-xs text-slate-500">
                    Push incident alerts to #payments-ops.
                  </span>
                </span>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                  checked={slackAlerts}
                  onChange={(event) => setSlackAlerts(event.target.checked)}
                />
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">
              Payout controls
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span>
                  <span className="block font-semibold text-slate-900">
                    Require approval for payouts
                  </span>
                  <span className="text-xs text-slate-500">
                    Route transfers over $5,000 to approvals.
                  </span>
                </span>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                  checked={payoutApprovals}
                  onChange={(event) => setPayoutApprovals(event.target.checked)}
                />
              </label>
              <Input
                label="Daily payout limit"
                placeholder="50000"
                value={dailyLimit}
                onChange={(event) => setDailyLimit(event.target.value)}
              />
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">Reset limits</Button>
                <Button>Save changes</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionPage>
  );
}
