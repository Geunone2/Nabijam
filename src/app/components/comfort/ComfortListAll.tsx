import {getCookie} from "cookies-next";

export interface ComfortListProps {
    id: string;
    title: string;
    createdAt: string;
}

export async function ComfortListAll(): Promise<ComfortListProps[]> {

    const token = getCookie('accessToken');

    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/comforts`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });


    if (res.ok) {
        const result = await res.json();

        return result.data.map((item: ComfortListProps) => ({
            id: item.id,
            title: item.title,
            createdAt: item.createdAt
        }))
    } else {
        console.error('응답 실패')
        return [];
    }
}