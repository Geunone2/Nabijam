'use client'

import React, {useEffect, useState} from 'react';
import ComfortMemberRegister from "@/app/components/comfort/ComfortMemberRegister";
import {FaPen, FaSortNumericDown, FaSortNumericUp} from "react-icons/fa";
import {ComfortListAll, ComfortListProps} from "@/app/components/comfort/ComfortListAll";
import {useRouter} from 'next/navigation';
import ComfortSearch from "@/app/components/comfort/ComfortSearch";
import Pagination from '@mui/material/Pagination';
import {useMobile} from "@/service/MediaQuery";

export default function ComfortContent() {

    const isMobile = useMobile();

    const [showComfortMemberRegister, setShowComfortMemberRegister] = useState(false);
    const [comforts, setComforts] = useState<ComfortListProps[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const [currentPage, setCurrentPage] = useState(1);
    const [comfortsPerPage] = useState(4);

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
        setShowComfortMemberRegister(true);
    }

    const handleDetailClick = (id: string) => {
        router.push(`/comforts/${id}`);
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    }

    const currentComforts = comforts.slice(
        (currentPage - 1) * comfortsPerPage,
        currentPage * comfortsPerPage
    );

    return (
        <>
            {showComfortMemberRegister ? (
                <ComfortMemberRegister/>
            ) : (
                <>
                    {comforts.length === 0 ? (
                        <section className='content-center '>
                            <div className='flex flex-col text-center'>
                                <h1 className={`font-bold mt-52 ${isMobile ? 'text-5xl' : 'text-7xl'}`}>위로 받기</h1>
                                {isMobile ? (
                                    <span className='mt-4 text-2xl'>내용은 비밀이 보장되므로,<br/>작은 고민이라도 괜찮아요.</span>) : (
                                    <span className='mt-4 text-3xl'>내용은 비밀이 보장되므로, 작은 고민이라도 괜찮아요.</span>)}
                            </div>
                            <div className='flex justify-center mt-8'>
                                <button
                                    onClick={handleClick}
                                    className={`${isMobile ? 'w-[95%]' : 'w-[75%]'} h-28 text-center bg-yellow-6 p-8 rounded-lg`}
                                >
                                    <div
                                        className={`flex flex-row justify-center gap-2 text-white ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                                        <FaPen className='mt-1'/>
                                        <span>고민을 털어 놓으면 한결 마음이 편질거에요.</span>
                                    </div>
                                </button>
                            </div>
                            <div className='flex justify-center mt-6 mb-52 '>
                                <div className={`${isMobile ? 'w-[95%] text-2xl' : 'w-[75%] text-3xl '} h-20 text-center bg-user-gray p-4 rounded-lg`}>
                                    <span>아직 기록된 고민이 없어요.</span>
                                </div>
                            </div>
                        </section>
                    ) : (

                        <section className='content-center'>

                            <div className='flex flex-col text-center'>
                                <h1 className={`font-bold mt-8 ${isMobile ? 'text-5xl' : 'text-7xl'}`}>위로
                                    받기</h1>
                                {isMobile ? (
                                    <span className='mt-4 text-2xl'>내용은 비밀이 보장되므로,<br/>작은 고민이라도 괜찮아요.</span>) : (
                                    <span className='mt-4 text-3xl'>내용은 비밀이 보장되므로, 작은 고민이라도 괜찮아요.</span>)}

                            </div>
                            <div className='flex justify-center mt-8'>
                                <button
                                    onClick={handleClick}
                                    className={`${isMobile ? 'w-[95%]' : 'w-[75%]'} h-28 text-center bg-yellow-6 p-8 rounded-lg`}
                                >
                                    <div
                                        className={`flex flex-row justify-center gap-2 text-white ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                                        <FaPen className='mt-1'/>
                                        <span>고민을 털어 놓으면 한결 마음이 편질거에요.</span>
                                    </div>
                                </button>
                            </div>
                            <div className={`flex flex-row justify-between ${isMobile ? 'w-[95%]' : 'w-[75%]'} mx-auto mt-4`}>
                                {/* 검색 컴포넌트 */}
                                <ComfortSearch/>
                                {/* 내림차순, 오름차순 컴포넌트 */}
                                {sortOrder === 'desc' ? (
                                    <button onClick={() => handleSortOrder('asc')}
                                            className='text-2xl  flex items-center gap-0.5'>
                                        <span className='text-lg font-semibold'>정렬</span><FaSortNumericDown/>
                                    </button>
                                ) : (
                                    <button onClick={() => handleSortOrder('desc')}
                                            className='text-2xl  flex items-center gap-0.5'>
                                        <span className='text-lg font-semibold'>정렬</span><FaSortNumericUp/>
                                    </button>
                                )}
                            </div>

                            {/* 위로받기 게시글 전체 목록 */}
                            <div className="flex flex-col gap-5  mt-2 items-center mx-auto">
                                {currentComforts.map((comfort) => (
                                    <div key={comfort.id}
                                         onClick={() => handleDetailClick(comfort.id)}
                                         className={`flex rounded-lg justify-between border-2 items-center font-semibold border-yellow-6 p-6 ${isMobile ? 'w-[95%] h-[100px]' : 'w-[75%]'}`}>
                                        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'}  w-1/2 text-ellipsis whitespace-nowrap overflow-hidden`}>{comfort.title}</h1>
                                        <p className={`${isMobile ? 'text-lg' : 'text-xl'} w-1/2 text-gray-400 text-end`}>{comfort.createdAt}</p>
                                    </div>
                                ))}

                                <Pagination
                                    count={Math.ceil(comforts.length / comfortsPerPage)}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    className="p-1 mb-10 mt-5"
                                />
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    );
}
