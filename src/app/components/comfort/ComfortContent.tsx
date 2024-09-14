'use client'

import React, {useEffect, useState} from 'react';
import ComfortDetail from "@/app/components/comfort/ComfortDetail";
import {FaPen, FaSortNumericDown, FaSortNumericUp} from "react-icons/fa";
import {ComfortListAll, ComfortListProps} from "@/app/components/comfort/ComfortListAll";
import {useRouter} from 'next/navigation';
import ComfortSearch from "@/app/components/comfort/ComfortSearch";


export default function ComfortContent() {

    const [showComfortDetail, setShowComfortDetail] = useState(false);
    const [comforts, setComforts] = useState<ComfortListProps[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const router = useRouter();

    const sortComforts = (data: ComfortListProps[], order: 'asc' | 'desc') => {
        return data.sort((a, b) => {
            if (order === 'asc') {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        })
    }

    useEffect(() => {
        const fetchComforts = async () => {
            try {
                const data = await ComfortListAll();
                setComforts(sortComforts(data, 'desc'));
            } catch (err) {
                console.error("게시글을 불러오는 데 실패했습니다.");
            }
        };
        fetchComforts();
    }, []);


    const handleSortOrder = (order: 'asc' | 'desc') => {
        setSortOrder(order);
        setComforts(sortComforts([...comforts], order));  // 기존 데이터 재정렬
    };


    const handleClick = () => {
        setShowComfortDetail(true);
    }

    const handleDetailClick = (id: string) => {
        router.push(`/comforts/${id}`);
    }

    return (
        <>
            {showComfortDetail ?
                (<ComfortDetail/>
                ) : (
                    <>
                        <div className='flex flex-col text-center mt-20'>
                            <h1 className='text-5xl font-[Tenada]'>위로 받기</h1>
                            <span className='mt-2 text-xl'>내용은 비밀이 보장되므로, 작은 고민이라도 괜찮아요.</span>
                        </div>
                        <div className='flex justify-center mt-12'>
                            <button
                                onClick={handleClick}
                                className='w-[60%] text-center bg-yellow-6 p-8 rounded-lg'
                            >
                                <div className='flex flex-row justify-center gap-2 text-white text-xl'>
                                    <FaPen className='mt-1'/>
                                    <span>고민을 털어 놓으면 한결 마음이 편질거에요.</span>
                                </div>
                            </button>
                        </div>

                        {comforts.length === 0 ? (
                            <div className='flex justify-center mt-6'>
                                <div className='w-[60%] text-center bg-user-gray p-4 rounded-lg'>
                                    아직 기록된 고민이 없어요.
                                </div>
                            </div>
                        ) : (

                            <>
                                <div className='flex flex-row justify-between w-[60%] mx-auto mt-4'>
                                    {/* 검색 컴포넌트 */}
                                    <ComfortSearch/>
                                    {/* 내림차순, 오름차순 컴포넌트 */}
                                    {sortOrder === 'desc' ?
                                        <button onClick={() => handleSortOrder('asc')}
                                                className='text-2xl mx-2 flex items-center gap-0.5'>
                                            <span className='text-lg font-semibold'>정렬</span><FaSortNumericDown/>
                                        </button> :
                                        <button onClick={() => handleSortOrder('desc')}
                                                className='text-2xl mx-2 flex items-center gap-0.5'>
                                            <span className='text-lg font-semibold'>정렬</span><FaSortNumericUp/>
                                        </button>}
                                </div>

                                {/* 위로받기 게시글 전체 목록 */}
                                <div className="flex flex-col gap-5 text-center mt-2 items-center mx-auto">
                                    {comforts.map((comfort) => (
                                        <div key={comfort.id}
                                             onClick={() => handleDetailClick(comfort.id)}
                                             className='flex rounded-lg border-2 items-center font-semibold border-yellow-6 p-6 w-[60%] '>
                                            <h1 className='text-lg mx-auto'>{comfort.title}</h1>
                                            <p className='w-auto text-xs text-gray-400'>{new Date(comfort.createdAt).toLocaleDateString().replace(/\.$/, '')}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                    </>
                )}
        </>);
}

/*
*                               {comforts.map((comfort) => (
                                    <span key={comfort.id} className='flex rounded-lg border-2 justify-between text-center font-[Tenada] border-yellow-6 p-8 w-[60%] '>
                                        <RiFeedbackLine className='text-3xl text-yellow-6'/>
                                        <h1 className='text-xl'>{comfort.title}</h1>
                                        <p>{new Date(comfort.createdAt).toLocaleDateString()}</p>
                                    </span>
                                ))}
* */