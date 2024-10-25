"use client";

import useInput from "@/service/useInput";
import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {getCookie} from "cookies-next";
import Swal from "sweetalert2";
import ComfortMemberDetail from "@/app/components/comfort/ComfortMemberDetail";
import ComfortListDetail from "@/app/components/comfort/ComfortListlDetail";

export default function ComfortListenerModify() {
    const content = useInput("");
    const {id} = useParams();  // 게시글 ID
    const router = useRouter();
    const [ConsoleId, setConsoleId] = useState<string | null>(null);  // 수정할 답변의 ID
    const nickname = getCookie("nickname");  // 쿠키에서 닉네임을 가져옴

    useEffect(() => {
        const fetchComfort = async () => {
            try {
                //@ts-ignore
                const data = await ComfortListDetail(BigInt(id));
                if (data && data.consoles.length > 0) {
                    const consoleToModify = data.consoles.find((console: any) => console.nickname === nickname);  // 닉네임이 일치하는 답변 찾기
                    if (consoleToModify) {
                        setConsoleId(consoleToModify.id);  // 해당 콘솔 ID 설정
                        content.onChange({target: {value: consoleToModify.content}});  // 해당 콘솔 내용 설정
                    }
                }
            } catch (err) {
                console.error('위로하기 글 가져오기 실패');
            }
        };
        fetchComfort();
    }, [id, nickname]);

    const handleBackClick = () => {
        if (id) {
            router.push(`/comforts/${id.toString()}`);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            content: content.value
        };
        Swal.fire({
            title: "위로하기 수정",
            text: "정말로 수정하시겠습니까?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "수정",
            confirmButtonColor: "#FAAD00",
            cancelButtonText: "취소",
            cancelButtonColor: "#FF0000"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = getCookie("accessToken");

                try {
                    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/consoles/${ConsoleId?.toString()}`, {  // ConsoleId로 요청
                        method: 'PATCH',  // PATCH 요청으로 수정
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(formData),
                    });
                    if (res.ok) {
                        Swal.fire({title: "수정 완료!", text: "수정되었습니다.", icon: "success", timer: 1000});
                        router.push(`/comforts/${id.toString()}`);
                    } else {
                        Swal.fire({title: "답변 수정에 실패하였습니다.", text: "다시 시도해주세요.", icon: "error", timer: 1000});
                    }

                } catch (err) {
                    console.error('게시글 수정 중 오류 발생');
                }
            }
        });
    }

    return (
        <>
            <ComfortMemberDetail/>
            <div className='flex flex-col h-[30%] w-[80%] mx-auto mt-8'>
                <div className="w-[10%] border-[2px] border-yellow-2"></div>
                <h1 className='font-[Tenada] text-start mt-4 text-2xl'>전문가의 답변</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mt-4 rounded-lg mx-auto border-yellow-2 border-2'>
                        <textarea
                            name="content"
                            id="content"
                            className='w-full rounded-lg mt-2 placeholder:pt-[100px] text-xl p-1 h-[250px] outline-0 block placeholder:text-4xl placeholder:text-center placeholder:items-center resize-none  transition-all duration-500'
                            title="내용을 입력해주세요."
                            placeholder="답변하기"
                            value={content.value}
                            onChange={content.onChange}
                            style={{lineHeight: '1.8'}}
                        />
                    </div>
                    <div className='mt-4 w-full flex justify-between p-2'>
                        <button
                            type="button"
                            onClick={handleBackClick}
                            className='bg-gray-300 text-xl p-1.5 rounded-lg w-36'
                        >
                            뒤로가기
                        </button>
                        <button
                            type="submit"
                            className='bg-white border-yellow-2 border text-xl p-1.5 rounded-lg text-black w-36'
                        >
                            작성완료
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
