export interface AuthCheckNickNameProps {
    result: boolean;
}

export default async function AuthCheckNickName(nickname: string): Promise<AuthCheckNickNameProps | null> {


    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/auth/nicknames?nickname=${encodeURIComponent(nickname)}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });

    if (res.ok) {
        const result = await res.json();

        return {
            result: result.data.result,
        }
    } else {
        console.error('응답 실패');
        return null;
    }
}