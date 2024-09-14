"use client";
import React, { useEffect, useState } from 'react';
import ComfortListDetail from "@/app/components/comfort/ComfortListlDetail";
import { getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import useInput from '@/service/useInput';
import Swal from "sweetalert2";

export default function ComfortContentModify() {
    const title = useInput('');
    const content = useInput('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        const fetchComfort = async () => {
            try {
                //@ts-ignore
                const data = await ComfortListDetail(BigInt(id));
                if (data) {
                    title.onChange({ target: { value: data.title } });
                    content.onChange({ target: { value: data.content } });
                }
            } catch (err) {
                console.error('위로받기 글 가져오기 실패');
            }
        };
        fetchComfort();
    }, [id]);

    const handleClick = () => {
        if (id) {
            router.push(`/comforts/${id.toString()}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = getCookie('accessToken');
        const formData = {
            title: title.value,
            content: content.value,
        };

        try {
            const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/comforts/${id.toString()}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                Swal.fire({
                    title: "위로받기 수정",
                    text: "정말로 수정하시겠습니까?",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonText: "수정",
                    confirmButtonColor: "#FAAD00",
                    cancelButtonText: "취소",
                    cancelButtonColor: "#FF0000"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({ title: "수정 완료!", text: "수정되었습니다.", icon: "success", timer: 1000 });
                        setIsSubmitted(true);
                        router.push(`/comforts/${id.toString()}`);
                    }
                    // If canceled, do nothing, just keep the form open
                });
            } else {
                alert('게시글 수정에 실패하였습니다.');
            }
        } catch (err) {
            console.error('게시글 수정 중 오류 발생');
        }
    };

    return (
        <>
            {isSubmitted ? (
                <div className='flex flex-col text-center mt-20'>
                    <h1 className='text-5xl font-[Tenada]'>수정 완료</h1>
                    <span className='mt-2 text-xl'>게시글이 성공적으로 수정되었습니다.</span>
                    <button
                        type="button"
                        onClick={handleClick}
                        className='bg-gray-300 text-xl p-1.5 rounded-lg mt-4 w-36'
                    >
                        돌아가기
                    </button>
                </div>
            ) : (
                <>
                    <div className='flex flex-col text-center mt-20'>
                        <h1 className='text-5xl font-[Tenada]'>위로 받기</h1>
                        <span className='mt-2 text-xl'>내용은 비밀이 보장되므로, 작은 고민이라도 괜찮아요.</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='mt-14 rounded-lg mx-auto border-yellow-6 border-2 h-[45%] w-[80%]'>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className='p-4 mt-14 w-[90%] mx-auto outline-0 block text-2xl placeholder:text-4xl placeholder:font-medium'
                                title="제목을 입력해주세요."
                                placeholder="제목"
                                value={title.value}
                                onChange={title.onChange}
                            />
                            <div className="mx-auto w-[90%] border-[2px] border-lightGray/30"></div>
                            <textarea
                                name="content"
                                id="content"
                                className='p-4 mt-4 w-[90%] h-[380px] outline-0 mx-auto block placeholder:text-xl placeholder:font-medium resize-none'
                                title="내용을 입력해주세요."
                                placeholder="오늘의 고민은 무엇인가요? 이 곳에 고민을 털어놓아보세요."
                                value={content.value}
                                onChange={content.onChange}
                            />
                        </div>
                        <div className='mt-4 mx-auto w-[80%] flex justify-between'>
                            <button
                                type="button"
                                onClick={handleClick}
                                className='bg-gray-300 text-xl p-1.5 rounded-lg w-36'
                            >
                                돌아가기
                            </button>
                            <button
                                type="submit"
                                className='bg-yellow-6 text-xl p-1.5 rounded-lg text-white w-36'
                            >
                                작성완료
                            </button>
                        </div>
                    </form>
                </>
            )}
        </>
    );
}
