import { Inter } from "next/font/google";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased light text-md`}
    >
      <body className="min-h-full font-sans flex flex-col">
        <ReactQueryProvider>
          {children}
          <Toaster position="top-center" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
