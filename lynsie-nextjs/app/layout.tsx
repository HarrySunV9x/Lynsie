import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Nav from "@/app/nav";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "lynsie",
    description: "my private technology spirited park",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">

        <body className={inter.className}>
        <Nav/>
        {children}
        </body>
        </html>
    );
}