"use client";

import { useMemo, useState } from "react";
import { MotionPage } from "@/components/ui/Motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { formatCurrency } from "@/lib/utils";

type CustomerStatus = "Active" | "At risk" | "Inactive";

type Customer = {
  id: string;
  name: string;
  email: string;
  region: string;
  totalVolume: number;
  lastPayment: string;
  status: CustomerStatus;
  riskScore: number;
  avgTicket: number;
  tier: "Standard" | "Growth" | "Enterprise";
  last90Days: number;
};

const customers: Customer[] = [
  {
    id: "cus_1021",
    name: "Orion Logistics",
    email: "finance@orionlog.com",
    region: "NG",
    totalVolume: 124820,
    lastPayment: "Apr 29, 2026",
    status: "Active",
    riskScore: 12,
    avgTicket: 840,
    tier: "Enterprise",
    last90Days: 52840,
  },
  {
    id: "cus_1020",
    name: "Lumen Studio",
    email: "payments@lumen.studio",
    region: "NG",
    totalVolume: 58400,
    lastPayment: "Apr 28, 2026",
    status: "Active",
    riskScore: 18,
    avgTicket: 430,
    tier: "Growth",
    last90Days: 22900,
  },
  {
    id: "cus_1019",
    name: "Starlight Labs",
    email: "ops@starlightlabs.io",
    region: "US",
    totalVolume: 31200,
    lastPayment: "Apr 27, 2026",
    status: "At risk",
    riskScore: 62,
    avgTicket: 520,
    tier: "Growth",
    last90Days: 11800,
  },
  {
    id: "cus_1018",
    name: "Northwind Retail",
    email: "ap@northwind.co",
    region: "UK",
    totalVolume: 24890,
    lastPayment: "Apr 25, 2026",
    status: "Active",
    riskScore: 24,
    avgTicket: 310,
    tier: "Standard",
    last90Days: 9400,
  },
  {
    id: "cus_1017",
    name: "Atlas Banking",
    email: "treasury@atlas.com",
    region: "NG",
    totalVolume: 198400,
    lastPayment: "Apr 24, 2026",
    status: "Inactive",
    riskScore: 41,
    avgTicket: 1240,
    tier: "Enterprise",
    last90Days: 22100,
  },
  {
    id: "cus_1016",
    name: "Mercury Foods",
    email: "billing@mercuryfoods.com",
    region: "CA",
    totalVolume: 14210,
    lastPayment: "Apr 22, 2026",
    status: "Active",
    riskScore: 16,
    avgTicket: 190,
    tier: "Standard",
    last90Days: 5200,
  },
  {
    id: "cus_1015",
    name: "Aurora Retail",
    email: "billing@auroraretail.com",
    region: "US",
    totalVolume: 40210,
    lastPayment: "Apr 21, 2026",
    status: "Active",
    riskScore: 22,
    avgTicket: 510,
    tier: "Growth",
    last90Days: 16800,
  },
  {
    id: "cus_1014",
    name: "Summit Ventures",
    email: "treasury@summit.io",
    region: "US",
    totalVolume: 90500,
    lastPayment: "Apr 20, 2026",
    status: "Active",
    riskScore: 9,
    avgTicket: 1520,
    tier: "Enterprise",
    last90Days: 31420,
  },
];

export default function CustomersPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | "all">(
    "all",
  );
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Customer | null>(null);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return customers.filter((customer) => {
      const matchesQuery = query
        ? customer.name.toLowerCase().includes(query.toLowerCase()) ||
          customer.email.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesStatus =
        statusFilter === "all" ? true : customer.status === statusFilter;
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
            Customers
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Customer intelligence
          </h1>
          <p className="text-sm text-slate-600">
            Track customer health, revenue contribution, and risk signals.
          </p>
        </div>
        <Button>Add customer</Button>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            label: "Active customers",
            value: "412",
            tone: "border-emerald-200/70 bg-emerald-50/60",
          },
          {
            label: "Monthly volume",
            value: "$1.24M",
            tone: "border-blue-200/70 bg-blue-50/60",
          },
          {
            label: "At-risk accounts",
            value: "18",
            tone: "border-amber-200/70 bg-amber-50/60",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-3xl border p-6 shadow-sm ${stat.tone}`}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {stat.label}
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-[220px] flex-1">
            <Input
              label="Search"
              placeholder="Search by customer or email"
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
                setStatusFilter(event.target.value as CustomerStatus | "all")
              }
            >
              <option value="all">All</option>
              <option value="Active">Active</option>
              <option value="At risk">At risk</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {filtered.length} results
          </span>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <div className="grid grid-cols-6 gap-4 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <span>Customer</span>
            <span>Region</span>
            <span>Last payment</span>
            <span>Total volume</span>
            <span className="text-right">Status</span>
            <span className="text-right">Action</span>
          </div>
          <div className="divide-y divide-slate-200">
            {paged.map((customer) => (
              <div
                key={customer.id}
                className="grid grid-cols-6 gap-4 px-4 py-4 text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    {customer.name}
                  </p>
                  <p className="text-xs text-slate-500">{customer.email}</p>
                </div>
                <div className="text-slate-600">{customer.region}</div>
                <div className="text-slate-600">{customer.lastPayment}</div>
                <div className="font-semibold text-slate-900">
                  {formatCurrency(customer.totalVolume, "USD")}
                </div>
                <div className="flex justify-end">
                  <span
                    className={
                      customer.status === "Active"
                        ? "rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                        : customer.status === "At risk"
                          ? "rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
                          : "rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                    }
                  >
                    {customer.status}
                  </span>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setSelected(customer)}
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No customers match your filters.
            </div>
          ) : null}
        </div>
        {filtered.length > 0 ? (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
            <p className="text-slate-500">
              Showing {(currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, filtered.length)} of{" "}
              {filtered.length} customers
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
        isOpen={Boolean(selected)}
        title="Customer profile"
        onClose={() => setSelected(null)}
        footer={
          <Button
            className="w-full"
            type="button"
            onClick={() => setSelected(null)}
          >
            Done
          </Button>
        }
      >
        {selected ? (
          <div className="space-y-4 text-sm text-slate-600">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Customer
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {selected.name}
              </p>
              <p className="text-xs text-slate-500">{selected.email}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Status
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {selected.status}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Tier
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {selected.tier}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Risk score
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {selected.riskScore}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Avg ticket
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {formatCurrency(selected.avgTicket, "USD")}
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Last 90 days volume
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {formatCurrency(selected.last90Days, "USD")}
              </p>
            </div>
          </div>
        ) : null}
      </Modal>
    </MotionPage>
  );
}
