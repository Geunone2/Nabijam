'use client';

import React, {useEffect, useState} from 'react';
import ComfortListDetail, {ComfortListDetailProps} from "@/app/components/comfort/ComfortListlDetail";
import {useParams, useRouter} from "next/navigation";
import Image from 'next/image'
import Swal from "sweetalert2";
import {getCookie} from "cookies-next";
import {useMobile} from "@/service/MediaQuery";

export default function ComfortMemberDetail() {

    const isMobile = useMobile();

    const [comfort, setComfort] = useState<ComfortListDetailProps | null>(null);
    const {id} = useParams(); // URL 파라미터에서 id 가져오기
    const router = useRouter();

    const [role, setRole] = useState("");

    useEffect(() => {

        const role = getCookie("Role");

        if (role === "MEMBER" || role === "LISTENER") {
            setRole(role);
        } else {
            setRole("");
        }
        const fetchComfort = async () => {
            if (id) {
                try {
                    //@ts-ignore
                    const data = await ComfortListDetail(BigInt(id));
                    setComfort(data);
                } catch (err) {
                    console.error("게시글을 불러오는 데 실패했습니다.");
                }
            }
        };


        fetchComfort();
    }, [id]);

    const handleModifyClick = () => {
        router.push(`/comforts/${id.toString()}/modify`);
    }

    const handleBackClick = () => {
        router.push(`/comforts`);
    }

    const handleDeleteClick = async () => {
        const token = getCookie('accessToken');

        try {
            Swal.fire({
                title: "위로받기 삭제",
                text: "정말로 삭제하시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "삭제",
                confirmButtonColor: "#FAAD00",
                cancelButtonText: "취소",
                cancelButtonColor: "#FF0000",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // '삭제' 버튼이 눌렸을 때만 삭제 요청을 보냄
                    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/comforts/${id.toString()}`, {
                        method: 'DELETE',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({comfortBoardId: id.toString()}),
                    });

                    if (res.ok) {
                        Swal.fire({title: "삭제 완료!", text: "삭제되었습니다.", icon: "success", timer: 1000});
                        router.push(`/comforts`);
                    } else {
                        Swal.fire({title: "게시글 삭제에 실패하였습니다.", text: "다시 시도해주세요.", icon: "error", timer: 1000});
                    }
                }
            });
        } catch (err) {
            console.error("삭제 요청 중 오류 발생", err);
        }
    };


    if (!comfort) {
        return null;
    }


    return (
        <>
            {role === "LISTENER" ? (<>
                <div className='flex flex-col text-center'>
                    <h1 className={`font-bold mt-8 ${isMobile ? 'text-5xl' : 'text-7xl'}`}>위로 하기</h1>
                    {isMobile ? (
                        <span className='mt-4 text-2xl'>내용은 비밀이 보장되므로,<br/>작은 고민이라도 괜찮아요.</span>) : (
                        <span className='mt-4 text-3xl'>내용은 비밀이 보장되므로, 작은 고민이라도 괜찮아요.</span>)}
                </div>
            </>) : (<>
                <div className='flex flex-col text-center'>
                    <h1 className={`font-bold mt-8 ${isMobile ? 'text-5xl' : 'text-7xl'}`}>위로
                        받기</h1>
                    {isMobile ? (
                        <span className='mt-4 text-2xl'>내용은 비밀이 보장되므로,<br/>작은 고민이라도 괜찮아요.</span>) : (
                        <span className='mt-4 text-3xl'>내용은 비밀이 보장되므로, 작은 고민이라도 괜찮아요.</span>)}

                </div>
            </>)}
            <div
                className={`border-4 rounded-xl h-[50%] ${isMobile ? 'w-[95%]' : 'w-[80%]'} mx-auto border-yellow-6 p-4 flex flex-col mt-4`}>
                <div className='justify-between flex flex-row mt-2'>
                    <div className='flex flex-col gap-2'>
                        <p className={`mx-2 ${isMobile ? 'text-2xl' : 'text-3xl'} text-yellow-6 font-semibold`}>#{comfort.categories.join(' #')}</p>
                        <h1 className={`${isMobile ? 'text-4xl' : 'text-5xl'} font-semibold mx-2`}>{comfort.title}</h1>
                    </div>
                    <div className='flex items-center mt-10'>
                        <p className={` ${isMobile ? 'text-xl' : 'text-3xl'}  text-gray-500 mx-2`}>작성자: {comfort.writerNickname}</p>
                        <Image src={comfort.writerProfile} alt="Profile" width={80} height={80}
                               className={`rounded-full object-cover  ${isMobile ? ' w-[30px] h-[30px] ' : ' w-[60px] h-[60px] '}`}/>
                    </div>
                </div>

                <div className="mx-auto w-full border-[1px] border-lightGray/30 mt-2 mb-2"></div>

                <div className='mt-6 mx-4'>
                    <p className={`whitespace-pre-wrap  ${isMobile ? 'text-xl' : 'text-3xl'} `}>{comfort.content}</p>
                </div>

                {role === "MEMBER" ? (<>
                    <div className='flex flex-col mt-auto'>
                        <span
                            className={`w-fit ${isMobile ? 'text-lg' : 'text-xl'} ml-auto mr-4`}>{new Date(comfort.createdAt).toLocaleDateString().replace(/\.$/, '')} 작성</span>
                        <div className='flex flex-row justify-between'>
                            <button
                                type="button"
                                onClick={handleBackClick}
                                className={`bg-white border-gray-600 border-2 text-gray-500 ${isMobile ? 'text-2xl' : 'text-3xl'}  p-1.5 rounded-lg w-fit`}
                            >
                                뒤로가기
                            </button>

                            <div className='flex flex-row'>
                                <button
                                    type="button"
                                    onClick={handleModifyClick}
                                    className={`bg-white border-gray-600 border-2 text-gray-500 ${isMobile ? 'text-2xl' : 'text-3xl'}  p-1.5 rounded-lg w-fit mx-2`}
                                >
                                    수정하기
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDeleteClick}
                                    className={`bg-white border-gray-600 border-2 text-gray-500 ${isMobile ? 'text-2xl' : 'text-3xl'}  p-1.5 rounded-lg w-fit mx-2`}
                                >
                                    삭제하기
                                </button>
                            </div>
                        </div>
                    </div>
                </>) : (<></>)}

            </div>
        </>
    );
}



