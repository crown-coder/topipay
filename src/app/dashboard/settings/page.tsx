import { MotionPage } from "@/components/ui/Motion";

export default function SettingsPage() {
  return (
    <MotionPage className="space-y-2">
      <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
      <p className="text-sm text-slate-600">
        Update business profile, permissions, and preferences.
      </p>
    </MotionPage>
  );
}
