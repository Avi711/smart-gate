import "@/app/globals.css";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { ClientTranslationProvider } from "@/app/components/client-translation-provider";
import { Toaster } from "@/components/ui/sonner";
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Smart Gate Access - Compatible Mode",
  description: "Control your garage door remotely - Compatible version",
};

// This is a completely separate layout that doesn't inherit from the root layout
export default function CompatibleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
