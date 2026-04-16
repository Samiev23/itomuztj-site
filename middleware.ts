import { NextResponse } from "next/server";
import { auth } from "@/auth";

function adminEmailMatches(sessionEmail: string | null | undefined): boolean {
  const admin = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const user = sessionEmail?.trim().toLowerCase();
  return Boolean(admin && user && user === admin);
}

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  // Танҳо /admin — ҳамаи роутҳои дигар (масалан /courses) бе санҷиши админ
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (!req.auth?.user?.email) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", `${pathname}${req.nextUrl.search}`);
    return NextResponse.redirect(url);
  }

  if (!adminEmailMatches(req.auth.user.email)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  // Як шаблон: `/admin` ва `/admin/...` — бидуни дублии `/admin`
  matcher: ["/admin/:path*"],
};
