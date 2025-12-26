import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "EssenceOils - Premium Essential Oils & Aromatherapy Products",
  description: "Discover our collection of 100% pure essential oils, carrier oils, and aromatherapy products. Premium quality, globally sourced botanicals for your wellness journey.",
  keywords: "essential oils, aromatherapy, carrier oils, natural oils, lavender oil, peppermint oil, eucalyptus oil, wellness",
  openGraph: {
    title: "EssenceOils - Premium Essential Oils & Aromatherapy Products",
    description: "Discover our collection of 100% pure essential oils, carrier oils, and aromatherapy products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
