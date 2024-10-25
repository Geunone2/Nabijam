import React, {useCallback} from 'react';
import {getCookie} from "cookies-next";
import useInput from '@/service/useInput';
import Swal from "sweetalert2";
import {RiArrowRightDoubleLine} from "react-icons/ri";
import {useMobile} from "@/service/MediaQuery";

export default function CommentsRegister({consoleId}) {

    const isMobile = useMobile();

    const content = useInput("");

    const handleCommentsChange = useCallback((e) => {
        if (e.target.name === 'content') {
            content.onChange(e);
        }
    }, [content]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            content: content.value,
        }
        const token = getCookie("accessToken");
        try {
            Swal.fire({
                title: "댓글 달기",
                text: "댓글을 등록하시겠습니까?",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "등록하기",
                confirmButtonColor: "#FAAD00",
                cancelButtonText: "취소하기",
                cancelButtonColor: "#FF0000"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/consoles/${consoleId.toString()}/comments`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(formData),
                    });

                    if (res.ok) {
                        Swal.fire({title: "등록 완료!", text: "댓글이 등록되었습니다.", icon: "success", timer: 1000});
                        window.location.reload();
                    } else {
                        Swal.fire({title: "댓글 등록이 실패하였습니다.", text: "다시 시도해주세요.", icon: "error", timer: 1000});
                    }
                }
            })
        } catch (err) {
            console.error('댓글 등록 중 오류 발생', err)
        }
    }

    return (<>
        <div className="relative">
            <form onSubmit={handleSubmit}>
                <div className="relative">
                <textarea
                    name="content"
                    className={`mt-2 w-full h-28 border rounded-2xl p-2 resize-none pr-10 outline-none ${isMobile ? 'text-lg placeholder:text-2xl' : 'text-2xl placeholder:text-3xl'}`}
                    placeholder="댓글을 입력해주세요."
                    value={content.value}
                    onChange={handleCommentsChange}
                    style={{paddingBottom: '2rem'}}
                />
                    <button type="submit" className="absolute bottom-2 right-1">
                        <RiArrowRightDoubleLine className={`${isMobile ? 'text-4xl' : 'text-5xl'} text-gray-400`}/>
                    </button>
                </div>
            </form>
        </div>
    </>);
}