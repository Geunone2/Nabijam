'use client'
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import Header from "./components/mainpage/Header";
import Footer from "./components/mainpage/Footer";

const inter = Inter({subsets: ["latin"]});

/*
export const metadata: Metadata = {
    title: "나비잠 - 비대면 익명 심리상담 플랫폼",
    description: "비대면으로 자신의 고민을 상담해 보세요.",
};
*/
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    const [status, setStatus] = useState(false);
    const [nickname, setNickname] = useState("");
    const [role, setRole] = useState("");
    useEffect(() => {
        const token = getCookie('accessToken')
        const username = getCookie('nickname')
        const role = getCookie('Role');

        if (token == null) {
            setStatus(false);
        } else {
            setStatus(true);
        }

        if (role === "LISTENER" || role === "MEMBER") {
            setRole(role);
        } else {
            setRole("");
        }

        if(username != null ) {
            setNickname(username.toString());
        }
    }, []);

    return (
        <html lang="en" className={inter.className}>
        <head>
            <link rel="icon" href="/src/app/favicon.ico"/>
            <title>나비잠 - 온라인 정신상담 웹 플랫폼</title>
        </head>
        <body className='flex flex-col w-full mx-auto'>
        <header>
            <Header nickname={nickname} status={status} role={role}/>
        </header>
        <main className='grow'>{children}</main>
        <footer>
            <Footer/>
        </footer>
        </body>
        </html>
    );
}
