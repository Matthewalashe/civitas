import "./globals.css";
import type { Metadata } from "next";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Civitas",
  description: "Urban & Property Intelligence",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
