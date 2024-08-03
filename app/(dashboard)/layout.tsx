import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import "../globals.css";
import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import { ToastProvider } from "@/lib/TaostProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BShop - Admin Dashboard",
  description: "It is the shop for different products to sale online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang='en'>
      <body>
        <SignedOut>
          {/* <SignInButton /> */}
        </SignedOut>
        {/* <SignedIn>
          <UserButton />
        </SignedIn> */}
        <ToastProvider/>
        <div className="flex max-lg:flex-col text-grey-1">
        <LeftSideBar/>
        <TopBar/>
        <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  </ClerkProvider>
  );
}
