import { MotionPage } from "@/components/ui/Motion";

export default function WebhooksPage() {
  return (
    <MotionPage className="space-y-2">
      <h1 className="text-2xl font-semibold text-slate-900">Webhook Event</h1>
      <p className="text-sm text-slate-600">
        Monitor webhook deliveries and retry events.
      </p>
    </MotionPage>
  );
}
