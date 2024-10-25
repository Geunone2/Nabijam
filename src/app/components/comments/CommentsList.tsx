import React from 'react';
import {getCookie} from "cookies-next";

export interface CommentsDetailProps {
    id: string;
    nickname: string;
    profile: string;
    content: string;
    timestamp: string;
    consoleId: string;
}

export default async function CommentsList(consoleId: string): Promise<CommentsDetailProps[] | null> {
    const token = getCookie('accessToken');

    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/consoles/${consoleId}/comments`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });

    if (res.ok) {
        const result = await res.json();

        // 여러 댓글이 배열로 반환되는 경우
        if (Array.isArray(result.data)) {
            return result.data.map((comment: any) => ({
                id: comment.id,
                nickname: comment.nickname,
                profile: comment.profile,
                content: comment.content,
                timestamp: comment.timestamp,
                consoleId: comment.consoleId,
            }));
        } else {
            console.error("Unexpected data format");
            return null;
        }
    } else {
        console.error("응답 실패");
        return null;
    }
}
