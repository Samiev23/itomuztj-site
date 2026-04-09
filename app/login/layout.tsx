import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: "Ба ҳисоби ITomuz ворид шавед",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
