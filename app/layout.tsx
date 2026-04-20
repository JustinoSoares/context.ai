import { Inter } from "next/font/google";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, viewport-fit=cover"
/>;

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
      className={`${inter.variable} h-full antialiased light! text-md`}
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
