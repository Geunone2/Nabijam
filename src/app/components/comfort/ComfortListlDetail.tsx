import {getCookie} from "cookies-next";

export interface ConsoleProps {
    id: string;
    nickname: string;
    profile: string;
    content: string;
    timestamp: string;
    memberId: string;
}


export interface ComfortListDetailProps {
    timestamp: string;
    id: bigint;
    categories: [];
    title: string;
    content: string;
    writerId: string;
    writerProfile: string;
    writerNickname: string;
    createdAt: string;
    isAnswered: boolean;
    consoles: ConsoleProps[];
}

export default async function ComfortListDetail(id: bigint): Promise<ComfortListDetailProps | null> {
    const token = getCookie("accessToken");

    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/comforts/${id.toString()}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const result = await res.json();

        return {
            id: result.data.id,
            title: result.data.title,
            content: result.data.content,
            writerId: result.data.writerId,
            writerProfile: result.data.writerProfile,
            writerNickname: result.data.writerNickname,
            categories: result.data.categories,
            timestamp: result.data.timestamp,
            createdAt: result.data.createdAt,
            isAnswered: result.data.isAnswered,
            consoles: result.data.consoles,
        };
    } else {
        console.error("응답 실패");
        return null;
    }
}
