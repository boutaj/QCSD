import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ReactNode } from "react";
import type { Metadata } from "next";
import FooterSection from "@/components/sections/footer";
import Header from "@/components/sections/header";
import AuthProvider from "@/components/AuthProvider";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Home | QCSD",
  description: "UC San Diego's club for Quantum Computing",
};

const RootLayout = async ({children}: Readonly<{children: ReactNode}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="p-6">
              <Header session={await auth()} />
              {children}
            </div>
            <hr />
            <FooterSection />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;