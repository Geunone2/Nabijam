'use client';

import React, {useEffect, useState} from 'react';
import ConsoleListAll, {ConsoleListProps} from "@/app/components/console/ConsoleListAll";
import {MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank} from 'react-icons/md';
import ConsoleSearch from "@/app/components/console/ConsoleSearch";
import {FaSortNumericDown, FaSortNumericUp} from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import {useRouter} from "next/navigation";
import {useMobile} from "@/service/MediaQuery";

export default function ConsoleContent() {

    const isMobile = useMobile();

    const [consoles, setConsoles] = useState<ConsoleListProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [consolesPerPage] = useState(10);
    const router = useRouter();
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const sortConsoles = (data: ConsoleListProps[], order: 'asc' | 'desc') => {
        return data.sort((a, b) => {
            if (order === 'asc') {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });
    }

    useEffect(() => {
        const fetchConsoles = async () => {
            try {
                const data = await ConsoleListAll();
                setConsoles(sortConsoles(data, 'desc'));
            } catch (err) {
                console.error('게시글을 불러오는 데 실패했습니다.');
            }
        }
        fetchConsoles();
    }, []);

    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    }

    const currentConsoles = consoles.slice(
        (currentPage - 1) * consolesPerPage,
        currentPage * consolesPerPage
    );

    const handleSortOrder = (order: 'asc' | 'desc') => {
        setSortOrder(order);
        setConsoles(sortConsoles([...consoles], order));
    }

    const handleClick = (id: string) => {
        router.push(`/comforts/${id}`);
    }

    return (
        <>
            <div className='flex flex-col text-center'>
                <h1 className={`font-bold mt-8 ${isMobile ? 'text-5xl' : 'text-7xl'}`}>위로 하기</h1>
                {isMobile ? (
                    <span className='mt-4 text-2xl'>내용은 비밀이 보장되므로,<br/>작은 고민이라도 괜찮아요.</span>) : (
                    <span className='mt-4 text-3xl'>내용은 비밀이 보장되므로, 작은 고민이라도 괜찮아요.</span>)}
                <div
                    className={`border-2 border-yellow-6 ${isMobile ? 'w-[95%]' : 'w-[75%]'} h-full mx-auto mt-12 rounded-lg flex flex-col`}>
                    <div>
                        <div className='flex flex-row items-center justify-between p-4'>
                            <p className='font-[Tenada] text-5xl mx-2 text-center'>등록된 글 목록</p>
                            <ConsoleSearch/>
                        </div>

                        {isMobile ? (<>
                                <div className='flex flex-row w-full text-3xl font-bold mb-1'>
                                    <p className='w-3/4 text-start mx-2'>제목</p>
                                    <p className='w-1/4 text-end mx-2'>답변여부</p>
                                </div>
                            </>
                        ) : (<>
                                <div className='flex flex-col items-center p-2 text-4xl font-bold'>
                                    <div className='flex w-full'>
                                        <div className='flex w-1/2'>
                                            <p className='w-1/2 text-start mx-8'>카테고리</p>
                                            <p className='w-1/2 text-center'>제목</p>
                                        </div>
                                        <div className='flex w-1/2 justify-end gap-32'>
                                            <div className='flex flex-row'>
                                                <p className='text-center'>작성일</p>
                                                {sortOrder === 'desc' ? (
                                                    <button onClick={() => handleSortOrder('asc')}
                                                            className=' text-4xl mx-1'>
                                                        <FaSortNumericDown/>
                                                    </button>
                                                ) : (
                                                    <button onClick={() => handleSortOrder('desc')}
                                                            className=' text-4xl mx-1'>
                                                        <FaSortNumericUp/>
                                                    </button>
                                                )}
                                            </div>
                                            <p className=' text-center'>답변여부</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}


                        <div>
                            {currentConsoles.map((console, index) => (
                                <div
                                    key={console.id}
                                    onClick={() => handleClick(console.id)}
                                    className={`table w-full border-b border-solid border-gray-300 `}
                                >
                                    {isMobile ? (<>
                                        <div className='flex flex-row text-2xl h-16 items-center justify-between'>
                                            <div className='text-start text-ellipsis whitespace-nowrap overflow-hidden mx-2'>
                                                {console.title.length > 25 ? console.title.slice(0, 25) + '...' : console.title}
                                            </div>
                                            <div className=''>
                                                {console.isAnswered ? (
                                                    <MdOutlineCheckBox className='text-5xl text-yellow-6'/>
                                                ) : (
                                                    <MdOutlineCheckBoxOutlineBlank
                                                        className='text-5xl text-yellow-6'/>
                                                )}
                                            </div>
                                        </div>
                                    </>) : (<>
                                        <div className='flex flex-col items-center p-2 text-3xl h-16'>
                                            <div className='flex w-full'>
                                                {/* 카테고리와 제목 */}
                                                <div className='flex w-1/2'>
                                                    <p className='w-1/2 text-start mx-5 text-yellow-1 font-semibold'>
                                                        {console.categories.join(', ')}
                                                    </p>
                                                    <h1 className='w-1/2 text-start text-ellipsis whitespace-nowrap overflow-hidden'>
                                                        {console.title}
                                                    </h1>
                                                </div>

                                                {/* 작성일과 답변여부 */}
                                                <div className='flex w-1/2 justify-end gap-20'>
                                                    <p className='w-1/2 text-start'>{console.createdAt}</p>
                                                    {console.isAnswered ? (
                                                        <MdOutlineCheckBox className='text-5xl text-yellow-6'/>
                                                    ) : (
                                                        <MdOutlineCheckBoxOutlineBlank
                                                            className='text-5xl text-yellow-6'/>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                    </>)}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex justify-center p-4'>
                        <Pagination
                            count={Math.ceil(consoles.length / consolesPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
