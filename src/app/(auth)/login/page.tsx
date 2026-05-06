import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import { MotionItem, MotionPage, MotionStagger } from "@/components/ui/Motion";

export default function LoginPage() {
  return (
    <MotionPage className="w-full max-w-md rounded-3xl border border-white/20 bg-white/95 p-10 shadow-2xl">
      <MotionStagger className="flex flex-col gap-8">
        <MotionItem>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-blue-500">
              Sign in
            </p>
            <h1 className="text-3xl font-semibold text-slate-950">
              Welcome back to TopiPay.
            </h1>
            <p className="text-sm text-slate-600">
              Access your balance insights and approve payouts in seconds.
            </p>
          </div>
        </MotionItem>
        <MotionItem>
          <LoginForm />
        </MotionItem>
        <MotionItem>
          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-slate-600">
            Need an account?{" "}
            <Link className="font-semibold text-blue-600" href="/signup">
              Create one
            </Link>
          </div>
        </MotionItem>
      </MotionStagger>
    </MotionPage>
  );
}
