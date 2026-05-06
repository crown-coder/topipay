export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[url('/assets/auth-banner.png')] bg-cover bg-center">
      <div className="min-h-screen bg-gradient-to-tr from-slate-950/70 via-blue-900/40 to-slate-950/20">
        <main className="mx-auto flex min-h-screen max-w-6xl items-center justify-end px-6 py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
