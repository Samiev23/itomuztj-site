import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: "Ҳисоби нави омӯзишӣ дар ITomuz TJ бисозед",
};

export default function SignupLayout({ children }: { children: ReactNode }) {
  return children;
}
