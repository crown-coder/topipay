import { MotionPage } from "@/components/ui/Motion";

export default function DeveloperPage() {
  return (
    <MotionPage className="space-y-2">
      <h1 className="text-2xl font-semibold text-slate-900">Developer API</h1>
      <p className="text-sm text-slate-600">
        Manage API keys and developer settings.
      </p>
    </MotionPage>
  );
}
