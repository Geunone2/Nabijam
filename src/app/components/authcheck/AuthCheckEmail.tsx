export interface AuthCheckEmailProps {
    result: boolean;
}

export default async function AuthCheckEmail(email: string): Promise<AuthCheckEmailProps | null> {


    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/auth/emails?email=${encodeURIComponent(email)}`, {
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