import React from "react";
import { Rajdhani, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Metadata } from "next";

const rajdhani = Rajdhani({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-rajdhani",
});

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-nunito",
});

export const metadata: Metadata = {
    title: "Ravi Auto Service | Expert Bike Repair & Servicing in Navi Mumbai",
    description: "Expert two-wheeler repair, spare parts & servicing in Ghansoli Gaon, Navi Mumbai. Specializing in Hero, Honda, Yamaha, Bajaj, TVS, Royal Enfield. Call 8097901003.",
    keywords: "bike repair Navi Mumbai, two wheeler service Ghansoli, motorcycle mechanic, Ravi Auto Service, bike spare parts Navi Mumbai, Hero Honda service, Yamaha service Navi Mumbai",
    icons: {
        icon: "/images/ravi_auto_logo.png",
        apple: "/images/ravi_auto_logo.png",
    },
    openGraph: {
        title: "Ravi Auto Service — Navi Mumbai",
        description: "All Two Wheeler Spare Parts, Mechanical Work & Service. Ghansoli Gaon, Navi Mumbai.",
        type: "website",
        url: "https://raviautoservice.com",
        siteName: "Ravi Auto Service",
        images: [
            {
                url: "/images/ravi_auto_logo.png",
                width: 1200,
                height: 630,
                alt: "Ravi Auto Service Logo",
            },
        ],
        locale: "en_IN",
    },
    robots: {
        index: true,
        follow: true,
    },
};

import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${rajdhani.variable} ${nunito.variable}`}>
            <body className="font-body bg-dark text-light min-h-screen flex flex-col">
                <Providers>
                    <Navbar />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                    <FloatingWhatsApp />
                </Providers>
                <Analytics />
            </body>
        </html>
    );
}
