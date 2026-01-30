import "./globals.css";
import type { Metadata } from "next";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Civitas",
  description: "Urban & Property Intelligence",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
