import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "PadelTime — All Padel Courts in Warsaw",
    description: "Schedule and availability of padel courts in Warsaw. Book courts at We Are Padel, Padlovnia, Warsaw Padel Club, InterPadel and others.",
    keywords: "padel, Warsaw, courts, booking, schedule, tennis",
    openGraph: {
        title: "PadelTime Warsaw — All Padel Courts",
        description: "Find and book padel courts in Warsaw. Real-time availability and schedules.",
        type: "website",
        locale: "en_US",
    },
    alternates: {
        languages: {
            'en': '/en',
            'pl': '/pl',
        },
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.className} antialiased`}>
        {children}
        </body>
        </html>
    );
}