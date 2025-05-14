import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import ScrollUnlocker from "@/components/ScrollUnlocker";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Intervise | Your AI Career Assistant",
  description:
    "An AI-powered platform designed to help job seekers accelerate their career journey. From crafting tailored resumes and cover letters to staying updated with weekly industry insights, Intervise is your intelligent companion for career development.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo-icon.png" sizes="any" />
        </head>
        <body className={`${inter.className} `}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Header />
            <main className="min-h-screen">
              <ScrollUnlocker />
              {children}
            </main>
            <Toaster richColors />
            {/* Footer */}
            <footer className="bg-muted/50 py-6 text-center text-gray-200">
              <p>
                © All Rights Reserved By{" "}
                <span className="bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 text-transparent bg-clip-text font-bold text-2xl">
                  Intervise
                </span>
              </p>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
