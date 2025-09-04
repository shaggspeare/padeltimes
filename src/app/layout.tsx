import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
    title: "PadelTime — Всі падел корти Києва",
    description: "Розклад та доступність падел кортів у Києві. Бронювання кортів у RSP, Rejo, PadelBaza, GrandPrix та інших.",
    keywords: "падел, padel, київ, корти, бронювання, розклад",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="uk">
        <body className={`${inter.className} antialiased`}>
        {children}
        </body>
        </html>
    );
}