import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { AuthProviders } from "@/components/AuthProviders";
import { Navbar } from "@/components/Navbar";
import { SITE_TITLE } from "@/lib/site";
import { THEME_STORAGE_KEY } from "@/lib/theme";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}else{document.documentElement.setAttribute("data-theme","dark");}}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export const metadata: Metadata = {
  title: SITE_TITLE,
  description:
    "Сайтсозӣ, Android, дизайн ва зиёда — омӯзиши IT бо забони тоҷикӣ. Аз сифр то касбӣ дар платформаи ITomuz TJ.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = null;
  try {
    session = await auth();
  } catch (e) {
    console.error("[auth] session in root layout", e);
  }

  return (
    <html lang="tg" suppressHydrationWarning data-theme="dark" className={`${ibmPlexSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        <Script id="itomuz-theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <AuthProviders session={session}>
          <Navbar />
          {children}
        </AuthProviders>
      </body>
    </html>
  );
}
