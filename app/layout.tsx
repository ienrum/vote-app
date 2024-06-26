import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8930752195122705"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <section className="flex flex-col justify-center items-center pt-20">
          <Card className="px-8 pt-8 md:w-1/2 lg:w-1/3 w-full border-none  shadow-none">
            <CardContent>{children}</CardContent>
            <CardFooter>
              <p>© {new Date().getFullYear()} My Company</p>
            </CardFooter>
          </Card>
        </section>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
