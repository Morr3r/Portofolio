import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Afghany Yogaswara | 3D Mobile Developer Portfolio",
  description:
    "An immersive 3D room portfolio for Afghany Yogaswara, a mobile developer and frontend developer from Bandung.",
  authors: [{ name: "Afghany Yogaswara" }],
  openGraph: {
    title: "Afghany Yogaswara | 3D Mobile Developer Portfolio",
    description:
      "Explore Afghany Yogaswara's cinematic interactive 3D room portfolio built with Next.js, React Three Fiber, GSAP, and WebGL.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#082d51"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
