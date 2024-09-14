'use client';

import React, {useState} from 'react';
import {getCookie} from 'cookies-next';
import useInput from '@/service/useInput';
import Swal from 'sweetalert2';

export default function ConsoleDetail({id, title, categories, content, writerNickname}) {
    const consoleContent = useInput('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedContent, setSubmittedContent] = useState('');

    const handleSubmit = async (e) => {
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
            setSubmittedContent(consoleContent.value);
            Swal.fire({
                title: "위로하기 답변",
                text: "답변하시겠습니까?",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "답변하기",
                confirmButtonColor: "#FAAD00",
                cancelButtonText:"취소하기",
                cancelButtonColor: "#FF0000"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({title: "답변 완료!", text: "답변이 등록되었습니다.", icon: "success", timer: 1000})
                    setIsSubmitted(true);
                }
            })
        } else {
            console.error('작성에 실패하였습니다.');
            alert('작성에 실패하였습니다.');
        }
    };

    const handleBackClick = () => {
        window.location.replace('/consoles');
    };

    return (
        <>
            <div className='border-4 rounded-xl min-h-96 w-[80%] mx-auto border-yellow-6 p-4 flex flex-col mt-20'>
                <div className='justify-between flex flex-row mt-2'>
                    <div className='flex flex-col gap-1'>
                        <p className='mx-2 text-yellow-6 font-semibold text-start'>#{categories.join(' # ')}</p>
                        <h1 className='text-4xl font-semibold mx-2'>{title}</h1>
                    </div>
                    <p className='text-sm text-gray-500 mt-10 mx-2'>작성자: {writerNickname}</p>
                </div>

                <div className="mx-auto w-full border-[1px] border-lightGray/30 mt-2 mb-2"></div>

                <div className='mt-6 mx-4'>
                    <p className='text-lg'>{content}</p>
                </div>
            </div>

            {!isSubmitted ? (
                <div className='flex flex-col h-[30%] w-[80%] mx-auto mt-8'>
                    <div className="w-[10%] border-[2px] border-yellow-2"></div>
                    <h1 className='font-[Tenada] text-start mt-4 text-2xl'>전문가의 답변</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='mt-4 rounded-lg mx-auto border-yellow-2 border-2'>
                            <textarea
                                name="content"
                                id="content"
                                className='w-full rounded-lg pt-[100px] text-xl p-1 h-[250px] outline-0 block placeholder:text-4xl placeholder:text-center placeholder:items-center resize-none  transition-all duration-500'
                                title="내용을 입력해주세요."
                                placeholder="답변하기"
                                value={consoleContent.value}
                                onChange={consoleContent.onChange}
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
            ) : (
                <div className='flex flex-col h-[30%] w-[80%] mx-auto mt-8'>
                    <div className="w-[10%] border-[2px] border-yellow-2"></div>
                    <h1 className='font-[Tenada] text-start mt-4 text-2xl'>전문가의 답변</h1>
                    <div className='mt-4 rounded-lg mx-auto w-full h-[250px] text-start border-yellow-2 border-2 p-4'>
                        <p className='text-lg'>{submittedContent}</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleBackClick}
                        className='bg-gray-300 text-xl p-1.5 rounded-lg w-36 mt-4'
                    >
                        돌아가기
                    </button>
                </div>
            )}
        </>
    );
}
