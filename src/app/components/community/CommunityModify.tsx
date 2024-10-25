'use client';
import useInput from '@/service/useInput';
import React, {useEffect} from 'react';
import {useParams, useRouter} from "next/navigation";
import {getCookie} from "cookies-next";
import Swal from "sweetalert2";
import CommunityListDetail from "@/app/components/community/CommunityListDetail";

export default function CommunityModify() {

    const title = useInput('');
    const content = useInput('');
    const {id} = useParams();

    const router = useRouter();

    useEffect(() => {
        const fetchCommunity = async () => {
            try {
                //@ts-ignore
                const data = await CommunityListDetail(BigInt(id));
                if (data) {
                    title.onChange({target: {value: data.title}});
                    content.onChange({target: {value: data.content}});
                }
            } catch (err) {
                console.error('커뮤니티 글 가져오기 실패')
            }
        }
        fetchCommunity();
    }, [id]);

    const handleClick = () => {
        if (id) {
            router.push(`/community/${id.toString()}`);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = getCookie('accessToken');

        const formData = {
            title: title.value,
            content: content.value,
        };


        try {
            const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/community/${id.toString()}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                Swal.fire({
                    title: "커뮤니티 글 수정",
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
                        router.push(`/community/${id.toString()}`);
                    }
                });
            } else {
                Swal.fire({title: "게시글 수정에 실패하였습니다.", text: "다시 시도해주세요.", icon: "error", timer: 1000});
            }
        } catch (err) {
            console.error('게시글 수정 중 오류 발생');
        }

    }

    return (<>
        <form onSubmit={handleSubmit}>
            <div
                className={`mt-14 rounded-lg mx-auto border-yellow-6 border-2 h-[45%] w-[80%]`}>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className={`p-4 mt-14 w-[90%] mx-auto outline-0 block text-4xl placeholder:text-4xl placeholder:font-medium`}
                    title="제목을 입력해주세요."
                    placeholder="제목"
                    value={title.value}
                    onChange={title.onChange}
                />
                <div className="mx-auto w-[90%] border-[2px] border-lightGray/30"></div>
                <textarea
                    name="content"
                    id="content"
                    className={`p-4 mt-4 w-[90%] h-[380px] outline-0 mx-auto block placeholder:text-xl placeholder:font-medium text-2xl resize-none`}
                    title="내용을 입력해주세요."
                    placeholder="오늘의 고민은 무엇인가요? 이 곳에 고민을 털어놓아보세요."
                    value={content.value}
                    onChange={content.onChange}
                />
            </div>
            <div className={`mt-4 mx-auto w-[80%] flex justify-between`}>
                <button
                    type="button"
                    onClick={handleClick}
                    className={`bg-gray-300 text-xl p-1.5 rounded-lg w-36`}
                >
                    돌아가기
                </button>
                <button
                    type="submit"
                    className={`bg-yellow-6 text-xl p-1.5 rounded-lg text-white w-36`}
                >
                    작성완료
                </button>
            </div>
        </form>

    </>);
}