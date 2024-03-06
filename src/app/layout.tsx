import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "나비잠 - 비대면 익명 심리상담 플랫폼",
    description: "비대면으로 자신의 고민을 상담해 보세요.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className='flex flex-col w-full mx-auto'>
        <Header/>
        <main className='grow'>{children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}
