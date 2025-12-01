import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PrintMaania | Custom Gifts & Merch Ordering",
  description:
    "Modern ARC Print-inspired storefront for premium custom printing, apparel, and gifting with WhatsApp-first workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <AuthProvider>
          <div className="relative min-h-screen pb-16">
            <Navbar />
            {children}
            <WhatsAppFloat />
          </div>
          <Toaster position="bottom-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
