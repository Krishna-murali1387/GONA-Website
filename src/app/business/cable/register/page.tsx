import { CableRegisterWizard } from "@/components/business/cable-register-wizard";
import { cableSite } from "@/config/cable.config";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Register Your Cable Network",
  description:
    "Create a GONA account and submit your Cable Network application for Super Admin review.",
  path: cableSite.registerPath,
});

export default function CableRegisterPage() {
  return (
    <main className="min-h-[70vh] bg-[#F7F7F8]">
      <CableRegisterWizard />
    </main>
  );
}
