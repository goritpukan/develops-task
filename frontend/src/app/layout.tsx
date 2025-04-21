import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Recipe",
  description: "Task for develops today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
