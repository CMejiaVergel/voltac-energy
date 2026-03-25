import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LegalModals } from "@/components/layout/LegalModals";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voltac Energy | Soluciones Fotovoltaicas Seguras e Inteligentes",
  description: "Diseñamos e implementamos proyectos de energía solar On-Grid, Off-Grid, y granjas solares en Colombia. Ahorra hasta 100% en tu factura, con certificación RETIE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} antialiased h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <LegalModals />
      </body>
    </html>
  );
}
