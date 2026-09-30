import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Akış | Teknik Servis İş Takibi",
  icons: { icon: "/icon.svg" },
  description:
    "Küçük teknik servis işletmeleri için servis talebi toplama, görev takibi ve raporlama otomasyonu.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
