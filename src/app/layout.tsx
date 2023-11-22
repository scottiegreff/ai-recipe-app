import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "./context/AuthProvider";
import NavMenu from "./components/NavMenu";
import { authOptions } from "@/lib/nextauthOptions";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Recipe App",

  description:
    "An app that uses AI to generate recipes based on the users dietary restrictions and preferences.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <main className="">
            <NavMenu />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
