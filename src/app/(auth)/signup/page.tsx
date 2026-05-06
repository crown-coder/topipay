import Link from "next/link";
import SignupForm from "@/components/auth/SignupForm";
import { MotionItem, MotionPage, MotionStagger } from "@/components/ui/Motion";

export default function SignupPage() {
  return (
    <MotionPage className="w-full max-w-md rounded-3xl border border-white/20 bg-white/95 p-10 shadow-2xl">
      <MotionStagger className="flex flex-col gap-8">
        <MotionItem>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-blue-500">
              Create account
            </p>
            <h1 className="text-3xl font-semibold text-slate-950">
              Start moving money with confidence.
            </h1>
            <p className="text-sm text-slate-600">
              Create your workspace and invite your finance team in minutes.
            </p>
          </div>
        </MotionItem>
        <MotionItem>
          <SignupForm />
        </MotionItem>
        <MotionItem>
          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-slate-600">
            Already have an account?{" "}
            <Link className="font-semibold text-blue-600" href="/login">
              Sign in
            </Link>
          </div>
        </MotionItem>
      </MotionStagger>
    </MotionPage>
  );
}
