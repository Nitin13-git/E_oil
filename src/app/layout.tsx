import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Botanica Bliss - Premium Essential Oils & Aromatherapy Products",
  description: "Discover our collection of 100% pure essential oils, carrier oils, and aromatherapy products. Founded by Soham Katiyar & Nitin Kushwaha. Premium quality, naturally sourced botanicals.",
  keywords: "essential oils, aromatherapy, carrier oils, natural oils, lavender oil, peppermint oil, eucalyptus oil, wellness, Botanica Bliss, ayurvedic oils",
  openGraph: {
    title: "Botanica Bliss - Premium Essential Oils & Aromatherapy Products",
    description: "Experience pure essential oils crafted with love. Founded by Soham Katiyar & Nitin Kushwaha.",
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
