import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { SearchProvider } from "@/contexts/SearchContext";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Littera",
  description: "Littera is a platform for reporting litter in the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <SearchProvider>
          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset>
              <AppHeader />
              <main className="h-full pt-24 md:pt-12">{children}</main>
              <Toaster />
            </SidebarInset>
          </SidebarProvider>
        </SearchProvider>
        <Analytics />
      </body>
    </html>
  );
}
