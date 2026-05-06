"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  BadgeCheck,
  BookOpen,
  Code2,
  LayoutGrid,
  LifeBuoy,
  Settings,
  ShieldCheck,
  Users,
  Wallet,
  Webhook,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navSections = [
  {
    section: "Dashboard",
    items: [
      { name: "Overview", href: "/dashboard", icon: LayoutGrid },
      { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
      { name: "KYC", href: "/dashboard/kyc", icon: BadgeCheck },
    ],
  },
  {
    section: "Collections",
    items: [
      {
        name: "Transactions",
        href: "/dashboard/transactions",
        icon: ShieldCheck,
      },
      { name: "Customers", href: "/dashboard/customers", icon: Users },
      {
        name: "Reserved Account",
        href: "/dashboard/reserved-account",
        icon: ShieldCheck,
      },
    ],
  },
  {
    section: "Disbursements",
    items: [
      { name: "Transfer", href: "/dashboard/transfer", icon: ArrowLeftRight },
    ],
  },
  {
    section: "Merchant",
    items: [
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
      { name: "Webhook Event", href: "/dashboard/webhooks", icon: Webhook },
      { name: "Developer API", href: "/dashboard/developer", icon: Code2 },
      { name: "Support", href: "/dashboard/support", icon: LifeBuoy },
      { name: "Documentation", href: "/dashboard/docs", icon: BookOpen },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="relative hidden w-64 flex-col overflow-hidden border-r border-slate-200 bg-[url('/assets/sidebar-bg.png')] bg-cover bg-center px-6 py-8 md:flex">
      {/* <div className="absolute inset-0 bg-slate-950/10" /> */}
      <div className="relative z-10">
        <div className="text-sm uppercase tracking-[0.3em] text-slate-500">
          TopiPay
        </div>
        <nav className="mt-10 flex flex-1 flex-col gap-8">
          {navSections.map((group) => (
            <div key={group.section} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {group.section}
              </p>
              <div className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-semibold transition",
                        isActive
                          ? "bg-blue-50 text-blue-700 shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
          New: payouts can now be scheduled up to 30 days in advance.
        </div>
      </div>
    </aside>
  );
}
