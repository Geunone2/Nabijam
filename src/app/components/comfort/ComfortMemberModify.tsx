"use client";
import React, {useEffect, useState} from 'react';
import ComfortListDetail from "@/app/components/comfort/ComfortListlDetail";
import {getCookie} from "cookies-next";
import {useParams, useRouter} from "next/navigation";
import useInput from '@/service/useInput';
import Swal from "sweetalert2";
import {useMobile} from "@/service/MediaQuery";

export default function ComfortMemberModify() {
    const isMobile = useMobile();
    const title = useInput('');
    const content = useInput('');
    const {id} = useParams();
    const router = useRouter();

    useEffect(() => {
        const fetchComfort = async () => {
            try {
                //@ts-ignore
                const data = await ComfortListDetail(BigInt(id));
                if (data) {
                    title.onChange({target: {value: data.title}});
                    content.onChange({target: {value: data.content}});
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
                        Swal.fire({title: "수정 완료!", text: "수정되었습니다.", icon: "success", timer: 1000});
                        router.push(`/comforts/${id.toString()}`);
                    }
                });
            } else {
                Swal.fire({title: "게시글 수정에 실패하였습니다.", text: "다시 시도해주세요.", icon: "error", timer: 1000});

            }
        } catch (err) {
            console.error('게시글 수정 중 오류 발생');
        }
    };

    return (
        <>
            <div className='flex flex-col text-center'>
                <h1 className={`font-bold mt-8 ${isMobile ? 'text-5xl' : 'text-7xl'}`}>위로
                    받기</h1>
                {isMobile ? (
                    <span className='mt-4 text-2xl'>내용은 비밀이 보장되므로,<br/>작은 고민이라도 괜찮아요.</span>) : (
                    <span className='mt-4 text-3xl'>내용은 비밀이 보장되므로, 작은 고민이라도 괜찮아요.</span>)}
            </div>
            <form onSubmit={handleSubmit}>
                <div
                    className={`mt-4 rounded-lg mx-auto border-yellow-6 border-2  h-[500px] ${isMobile ? 'w-[95%]' : 'w-[80%]'}`}>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className={`p-4 mt-14 w-[95%] mx-auto outline-0 block  placeholder:font-medium ${isMobile ? 'text-2xl placeholder:text-3xl' : 'text-3xl placeholder:text-5xl'}`}
                        title="제목을 입력해주세요."
                        placeholder="제목"
                        value={title.value}
                        onChange={title.onChange}
                    />
                    <div className="mx-auto w-[95%] border-[2px] border-lightGray/30"></div>
                    <textarea
                        name="content"
                        id="content"
                        className={`p-4 mt-4 w-[95%] h-[60%] outline-0 mx-auto block placeholder:text-2xl placeholder:font-medium resize-none ${isMobile ? 'placeholder:text-lg text-lg' : 'placeholder:text-2xl text-2xl'}`}
                        title="내용을 입력해주세요."
                        placeholder="오늘의 고민은 무엇인가요? 이 곳에 고민을 털어놓아보세요."
                        value={content.value}
                        onChange={content.onChange}
                    />
                </div>
                <div className={`mt-10 mx-auto ${isMobile ? 'w-[95%]' : 'w-[80%]'} flex justify-between`}>
                    <button
                        type="button"
                        onClick={handleClick}
                        className={`bg-gray-300 ${isMobile ? 'text-2xl' : 'text-3xl'} p-1.5 rounded-lg w-40`}
                    >
                        돌아가기
                    </button>
                    <button
                        type="submit"
                        className={`bg-yellow-6 ${isMobile ? 'text-2xl' : 'text-3xl'} p-1.5 rounded-lg text-white w-40`}
                    >
                        작성완료
                    </button>
                </div>
            </form>
        </>
    );
}
