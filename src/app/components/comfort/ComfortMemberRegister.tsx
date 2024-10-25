import React, {useState, useCallback} from 'react';
import ComfortContent from "@/app/components/comfort/ComfortContent";
import RegisterCategory from "@/app/components/comfort/RegisterCategory";
import useInput from '@/service/useInput';
import {getCookie} from "cookies-next";
import Swal from "sweetalert2";
import {useMobile} from "@/service/MediaQuery";

export default function ComfortMemberRegister() {
    const isMobile = useMobile();
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

        Swal.fire({
            title: "위로받기 작성",
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
                    Swal.fire({
                        title: "작성 완료!",
                        text: "글이 등록되었습니다.",
                        icon: "success",
                        timer: 30000
                    }).then(() => {
                        window.location.replace('/comforts');
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
            {showComfortContent ? (
                <ComfortContent/>
            ) : (
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
                                name="title"
                                id="title"
                                className={`p-4 mt-14 w-[95%] mx-auto outline-0 block  placeholder:font-medium ${isMobile ? 'text-2xl placeholder:text-3xl' : 'text-3xl placeholder:text-5xl'}`}
                                title="제목을 입력해주세요."
                                placeholder="제목"
                                value={title.value}
                                onChange={handleInputChange}
                            />
                            <div className="mx-auto w-[95%] border-[2px] border-lightGray/30"></div>
                            <textarea
                                name="content"
                                id="content"
                                className={`p-4 mt-4 w-[95%] h-[60%] outline-0 mx-auto block placeholder:text-2xl placeholder:font-medium resize-none ${isMobile ? 'placeholder:text-lg text-lg' : 'placeholder:text-2xl text-2xl'}`}
                                title="내용을 입력해주세요."
                                placeholder="오늘의 고민은 무엇인가요? 이 곳에 고민을 털어놓아보세요."
                                value={content.value}
                                onChange={handleInputChange}
                            />
                        </div>
                        <RegisterCategory
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                        />
                        <div className={`mt-10 mx-auto ${isMobile ? 'w-[95%]' : 'w-[80%]'} flex justify-between`}>
                            <button
                                type="button"
                                onClick={handleBackClick}
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
            )}
        </>
    );
};

