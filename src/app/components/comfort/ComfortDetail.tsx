import React, {useState, useCallback} from 'react';
import ComfortContent from "@/app/components/comfort/ComfortContent";
import ComfortCategory from "@/app/components/comfort/ComfortCategory";
import useInput from '@/service/useInput';
import {getCookie} from "cookies-next";
import Swal from "sweetalert2";

export default function ComfortDetail() {
    const [showComfortContent, setShowComfortContent] = useState(false);
    const title = useInput('');
    const content = useInput('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // 제목과 내용 변경을 추적하는 핸들러
    const handleInputChange = useCallback((e) => {
        if (e.target.name === 'title') {
            title.onChange(e);
        } else if (e.target.name === 'content') {
            content.onChange(e);
        }
    }, [title, content]);

    const handleClick = () => {
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
                window.location.replace(`/comforts`);
            } else {
                setShowComfortContent(false);
            }
        })
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            title: title.value,
            content: content.value,
            category: selectedCategories,
        };

        const token = getCookie('accessToken');

        const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/comforts`, {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            alert("정상적으로 작성되었습니다.");
            window.location.replace('/comforts');
        } else {
            console.error('작성에 실패하였습니다.');
        }
    };

    return (
        <>
            {showComfortContent ? (
                <ComfortContent/>
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
                                onChange={handleInputChange}
                            />
                            <div className="mx-auto w-[90%] border-[2px] border-lightGray/30"></div>
                            <textarea
                                name="content"
                                id="content"
                                className='p-4 mt-4 w-[90%] h-[380px] outline-0 mx-auto block placeholder:text-xl placeholder:font-medium resize-none'
                                title="내용을 입력해주세요."
                                placeholder="오늘의 고민은 무엇인가요? 이 곳에 고민을 털어놓아보세요."
                                value={content.value}
                                onChange={handleInputChange}
                            />
                        </div>
                        <ComfortCategory
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                        />
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
};

