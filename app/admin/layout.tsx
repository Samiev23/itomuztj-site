import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { assertAdminSession } from "@/lib/adminAuth";

export const metadata: Metadata = {
  title: "Админ | ITomuz TJ",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await assertAdminSession();
  return <AdminShell>{children}</AdminShell>;
}
