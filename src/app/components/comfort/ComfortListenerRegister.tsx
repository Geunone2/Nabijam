'use client';

import React, {useState} from 'react';
import {getCookie} from 'cookies-next';
import useInput from '@/service/useInput';
import Swal from 'sweetalert2';
import {useParams} from "next/navigation";

export default function ComfortListenerRegister() {
    const consoleContent = useInput('');
    const {id} = useParams();
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = {
            content: consoleContent.value,
            comfortBoardId: Number(id),
        };

        const token = getCookie('accessToken');

        const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/consoles`, {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            Swal.fire({
                title: "위로하기 답변",
                text: "답변하시겠습니까?",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "답변하기",
                confirmButtonColor: "#FAAD00",
                cancelButtonText: "취소하기",
                cancelButtonColor: "#FF0000"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({title: "답변 완료!", text: "답변이 등록되었습니다.", icon: "success", timer: 1000});
                    window.location.reload();
                }
            })
        } else {
            console.error('작성에 실패하였습니다.');
        }
    };

    const handleBackClick = () => {
        window.location.replace('/comforts');
    };

    return (
        <>
            <div className='flex flex-col mx-auto'>
                <form onSubmit={handleSubmit}>
                    <div className='mt-4 rounded-lg mx-auto border-yellow-2 border-2'>
                            <textarea
                                name="content"
                                id="content"
                                className='w-full rounded-lg mt-2 placeholder:pt-[100px] text-xl p-1 h-[250px] outline-0 block placeholder:text-4xl placeholder:text-center placeholder:items-center resize-none  transition-all duration-500'
                                title="내용을 입력해주세요."
                                placeholder="답변하기"
                                value={consoleContent.value}
                                onChange={consoleContent.onChange}
                                style={{lineHeight: '1.8'}}
                            />
                    </div>
                    <div className='mt-4 w-full flex justify-between'>
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
