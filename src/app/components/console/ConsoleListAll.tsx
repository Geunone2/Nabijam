import React from 'react';
import {getCookie} from "cookies-next";

export interface ConsoleListProps {
    id: string;
    title: string;
    createdAt: string;
    categories: [];
    content: string;
    isAnswered: boolean;
    writerNickname: string;
}

export default async function ConsoleListAll() {

    const token = getCookie('accessToken');

    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/comforts/all`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (res.ok) {
        const result = await res.json();

        return result.data.map((item: ConsoleListProps) => ({
            id: item.id,
            title: item.title,
            createdAt: item.createdAt,
            categories: item.categories,
            content: item.content,
            isAnswered: item.isAnswered,
            writerNickname: item.writerNickname
        }))
    } else {
        console.error('응답 실패');
        return [];
    }

}