"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, User } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(event.target as Node)) return;
      setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5 md:px-10">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
          Dashboard
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Good afternoon, Sadiq
        </h2>
      </div>
      <div className="flex items-center gap-3" ref={menuRef}>
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          aria-label="View notifications"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
        </button>
        <div className="relative">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            aria-label="Open user menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <User className="h-4 w-4" aria-hidden="true" />
          </button>
          {menuOpen ? (
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
              <Link
                href="/dashboard/settings"
                className="flex items-center rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                onClick={() => setMenuOpen(false)}
              >
                Settings
              </Link>
              <Link
                href="/login"
                className="mt-1 flex items-center rounded-xl px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                onClick={() => setMenuOpen(false)}
              >
                Sign out
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
