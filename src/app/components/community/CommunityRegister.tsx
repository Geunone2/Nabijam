'use client'

import useInput from '@/service/useInput';
import React, {useCallback, useState} from 'react';
import Swal from "sweetalert2";
import {getCookie} from "cookies-next";
import CommunityContent from "@/app/components/community/CommunityContent";
import RegisterCategory from "@/app/components/comfort/RegisterCategory";

export default function CommunityRegister() {

    const title = useInput('');
    const content = useInput('');
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [showCommunityContent, setShowCommunityContent] = useState(false);

    const handleInputChange = useCallback((e) => {
        if (e.target.name === 'title') {
            title.onChange(e);
        } else if (e.target.name === 'content') {
            content.onChange(e);
        }
    }, [title, content]);

    const handleBackClick = () => {
        Swal.fire({
            title: '돌아가시겠습니까?',
            text: '작성한 내용은 저장되지 않습니다. 돌아가시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#FAAC01",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "뒤로가기"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.replace(`/community`);
            } else {
                setShowCommunityContent(false);
            }
        })
    }


    const handlesubmit = async (e) => {
        e.preventDefault();

        const formData = {
            title: title.value,
            content: content.value,
            category: selectedCategory,
        };

        Swal.fire({
            title: "커뮤니티 작성",
            text: "작성하시겠습니까?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "작성하기",
            confirmButtonColor: "#FAAD00",
            cancelButtonText: "취소하기",
            cancelButtonColor: "#FF0000"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = getCookie('accessToken');

                const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/community`, {
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
                        title: "작성 완료!",
                        text: "글이 등록되었습니다.",
                        icon: "success",
                        timer: 1000
                    }).then(() => {
                        window.location.replace('/community');
                    });
                } else {
                    Swal.fire({
                        title: "실패",
                        text: "작성에 실패하였습니다. 다시 시도해주세요.",
                        icon: "error"
                    });
                }
            }
        });
    };


    return (
        <>
            {showCommunityContent ? (<CommunityContent/>) : (
                <form onSubmit={handlesubmit}>
                    <div className='mt-14 rounded-lg mx-auto border-yellow-6 border-2 h-[45%] w-[80%]'>
                        {/* 제목 */}
                        <input
                            name="title"
                            id="title"
                            className='p-4 mt-14 w-[90%] mx-auto outline-0 block text-4xl placeholder:text-4xl placeholder:font-medium'
                            title="제목을 입력해주세요."
                            placeholder="제목"
                            value={title.value}
                            onChange={handleInputChange}
                        />
                        <div className="mx-auto w-[90%] border-[2px] border-lightGray/30"></div>

                        {/* 내용 */}
                        <textarea
                            name="content"
                            id="content"
                            className="p-4 mt-4 w-[90%] h-[380px] outline-0 mx-auto block placeholder:text-xl placeholder:font-medium text-2xl resize-none"
                            placeholder="사연을 적어주세요."
                            value={content.value}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* 카테고리 */}
                    <RegisterCategory selectedCategories={selectedCategory}
                                      setSelectedCategories={setSelectedCategory}/>
                    <div className='mt-4 mx-auto w-[80%] flex justify-between'>
                        <button
                            type="button"
                            onClick={handleBackClick}
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
            )}


        </>);
}