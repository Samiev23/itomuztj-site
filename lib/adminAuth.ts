import { redirect } from "next/navigation";
import { auth } from "@/auth";

export function isAdminEmail(email: string | null | undefined): boolean {
  const admin = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const user = email?.trim().toLowerCase();
  return Boolean(admin && user && user === admin);
}

/** Server-only: redirects if not admin. */
export async function assertAdminSession(callbackPath = "/admin") {
  const session = await auth();
  if (!session?.user?.email) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackPath)}`);
  }
  if (!isAdminEmail(session.user.email)) {
    redirect("/");
  }
  return session;
}
