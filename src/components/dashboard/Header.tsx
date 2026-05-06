import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5 md:px-10">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
          Dashboard
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Good afternoon, Avery
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
        >
          Sign out
        </Link>
        <button
          type="button"
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
        >
          New transfer
        </button>
      </div>
    </header>
  );
}
