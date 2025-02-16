import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: {
    default: "CQ Bot",
    template: "%s | CQ Bot",
  },
  description:
    "Your go-to platform for intelligent note-taking and productivity insights.",
  openGraph: {
    title: "CQ Bot",
    description:
      "Discover smart note-taking tools and productivity insights to enhance your workflow.",
    url: "https://cqbot.netlify.app",
    siteName: "CQ Bot",
    images: [
      {
        url: "https://cqbot.netlify.app/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CQ Bot",
    description:
      "Discover smart note-taking tools and productivity insights to enhance your workflow.",
    images: ["https://cqbot.netlify.app/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className="antialiased flex flex-row">
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
