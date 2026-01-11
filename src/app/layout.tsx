import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Providers } from "./providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vedanta Oil - Pure & Natural Essential Oils | Premium Quality Since Trust",
  description: "Discover 100% pure therapeutic-grade essential oils at Vedanta Oil. We offer lavender, peppermint, eucalyptus, tea tree, and 50+ essential oils. GC/MS tested, naturally sourced from finest botanicals worldwide.",
  keywords: "essential oils, pure essential oils, therapeutic grade oils, lavender oil, peppermint oil, eucalyptus oil, tea tree oil, aromatherapy oils, natural oils, organic essential oils, Vedanta Oil, buy essential oils online India",
  openGraph: {
    title: "Vedanta Oil - Pure & Natural Essential Oils",
    description: "Premium quality 100% pure essential oils. GC/MS tested for purity. Shop lavender, peppermint, eucalyptus & more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className="antialiased">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
