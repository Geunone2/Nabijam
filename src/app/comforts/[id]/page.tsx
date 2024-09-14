'use client';

import React, {useEffect, useState} from 'react';
import ComfortListDetail, {ComfortListDetailProps} from "@/app/components/comfort/ComfortListlDetail";
import {useParams, useRouter} from "next/navigation";
import {FaRegComment} from 'react-icons/fa';

export default function ComfortDetail() {

    const [comfort, setComfort] = useState<ComfortListDetailProps | null>(null);
    const {id} = useParams(); // URL 파라미터에서 id 가져오기
    const router = useRouter();

    useEffect(() => {
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

    if (!comfort) {
        return null; // 기존의 빈 배열을 반환하던 것을 null로 수정
    }


    return (
        <>
            <div className='border-4 rounded-xl min-h-96 w-[80%] mx-auto border-yellow-6 p-4 flex flex-col mt-20'>
                <div className='justify-between flex flex-row mt-2'>
                    <div className='flex flex-col gap-1'>
                        <p className='mx-2 text-yellow-6 font-semibold'>#{comfort.categories.join(' # ')}</p>
                        <h1 className='text-4xl font-semibold mx-2'>{comfort.title}</h1>
                    </div>
                    <p className='text-sm text-gray-500 mt-10 mx-2'>작성자: {comfort.writerNickname}</p>
                </div>

                <div className="mx-auto w-full border-[1px] border-lightGray/30 mt-2 mb-2"></div>

                <div className='mt-6 mx-4'>
                    <p className='text-lg'>{comfort.content}</p>
                </div>

                <div className='mt-80 flex justify-between'>
                    <button
                        type="button"
                        onClick={handleBackClick}
                        className='bg-white border-gray-600 border-2 text-gray-500 text-xl p-1.5 rounded-lg w-36 h-11 mt-6'
                    >
                        뒤로가기
                    </button>
                    <div className='flex flex-col'>
                        <span className='w-fit ml-12'>{comfort.createdAt}</span>
                        <div className='flex flex-row'>
                            <button
                                type="button"
                                onClick={handleModifyClick}
                                className='bg-white border-gray-600 border-2 text-gray-500 text-xl p-1.5 rounded-lg w-36 mx-2'
                            >
                                수정하기
                            </button>
                            <button
                                type="button"
                                className='bg-white border-gray-600 border-2 text-gray-500 text-xl p-1.5 rounded-lg w-36 mx-2'
                            >
                                삭제하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col h-[30%] w-[80%] mx-auto mt-8'>
                <div className="w-[10%] border-[2px] border-yellow-2"></div>
                <h1 className='font-[Tenada] text-start mt-4 text-2xl'>전문가의 답변</h1>
                <div>
                    {comfort.consoles.length > 0 ? (
                        comfort.consoles.map(console => (
                            <div
                                className='relative mt-4 rounded-lg mx-auto w-full h-[250px] text-start border-yellow-2 border-2 p-4'>
                                <div key={console.id} className='mb-4'>
                                    <div className='flex flex-row justify-between items-center mt-2 mx-2'>
                                        <p className='text-xl'>{console.nickname} <span className='text-sm'>상담사</span>
                                        </p>
                                        <p>{new Date(console.timestamp).toLocaleDateString().replace(/\.$/, '')}</p>
                                    </div>

                                    <div className="mx-auto w-full border-[1px] border-lightGray/30 mt-2 mb-2"></div>

                                    <div className='mx-1 mt-2'>{console.content}</div>
                                </div>
                                <div className='absolute bottom-2 left-2 text-xl mx-2 flex flex-row gap-6'>
                                    <FaRegComment/>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div
                            className='relative mt-4 rounded-lg mx-auto w-full h-[250px] text-start border-yellow-2 border-2 p-4'>
                            <p className='text-4xl items-center text-center mt-20 text-gray-500'>아직 등록된 답변이 없습니다.</p>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
