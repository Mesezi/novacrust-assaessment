import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit,  } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/react";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});


export const metadata: Metadata = {
  title: "Novacrust Assessment",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
      >
           <NuqsAdapter>
        {children}
           </NuqsAdapter>
      </body>
    </html>
  );
}
