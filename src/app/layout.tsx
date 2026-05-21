import type { Metadata, Viewport } from "next";
import { ClientProtection } from "@/components/ClientProtection";
import "./globals.css";

export const metadata: Metadata = {
  title: "Afghany Yogaswara | Frontend Developer",
  description:
    "",
  authors: [{ name: "Afghany Yogaswara" }],
  openGraph: {
    title: "Afghany Yogaswara | Frontend Developer",
    description:
      "",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f6f2e9" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if ("scrollRestoration" in window.history) {
                  window.history.scrollRestoration = "manual";
                }

                window.scrollTo(0, 0);

                window.addEventListener("pageshow", function () {
                  window.scrollTo(0, 0);
                });

                var storedTheme = localStorage.getItem("portfolio-theme");
                var systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
                var theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : systemTheme;
                document.documentElement.dataset.theme = theme;
                document.documentElement.style.colorScheme = theme;
              } catch (_) {
                document.documentElement.dataset.theme = "dark";
                document.documentElement.style.colorScheme = "dark";
              }
            `
          }}
        />
        <ClientProtection />
        {children}
      </body>
    </html>
  );
}
