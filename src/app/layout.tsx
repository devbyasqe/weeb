import type { Metadata } from "next";
import { DM_Sans, Google_Sans_Code } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/theme";
import LenisProvider from "@/components/providers/lenis";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});
const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weeb - Explore Anime, Manga, Characters & Voice Actors Online",
  description:
    "Weeb is your ultimate anime and manga hub! Discover detailed information on anime series, manga titles, characters, voice actors, and creators. Powered by the Jikan API, Weeb helps fans track, explore, and enjoy Japanese animation and manga content.",
  keywords: [
    "anime",
    "manga",
    "anime database",
    "manga database",
    "voice actors",
    "anime characters",
    "anime series",
    "Japanese animation",
    "anime info",
    "manga info",
    "Weeb app",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-none" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${googleSansCode.variable}`}>
        <LenisProvider />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="bg-gray-background relative mx-auto min-h-[calc(100svh-4.75rem)] w-[95%] max-w-7xl transition-all duration-300 sm:max-md:max-w-160">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
