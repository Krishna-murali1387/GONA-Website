import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm email | GONA",
  description: "Confirming your GONA account email.",
  robots: { index: false, follow: false },
};

export default function AuthCallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
