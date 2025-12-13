import { Poppins } from "next/font/google";
import "./globals.css";
import CommonLayout from "@/components/client-view/common-layout.js";
import { ThemeProvider } from "@/context/ThemeContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Danish Ali | Full Stack Developer Portfolio",
  description:
    "Creative Full Stack Developer specializing in React, Next.js, Node.js and modern web technologies. Building beautiful, functional digital experiences.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Portfolio",
    "Web Developer",
    "Danish Ali",
  ],
  authors: [{ name: "Danish Ali" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Danish Ali | Full Stack Developer",
    description: "Creative Full Stack Developer Portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider>
          <CommonLayout>{children}</CommonLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
