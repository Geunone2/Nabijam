'use client';

import React, {useEffect, useState} from 'react';
import ConsoleListAll, {ConsoleListProps} from "@/app/components/console/ConsoleListAll";
import {MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank} from 'react-icons/md';
import ConsoleSearch from "@/app/components/console/ConsoleSearch";
import {FaSortNumericDown, FaSortNumericUp} from "react-icons/fa";
import ConsoleDetail from './ConsoleDetail';

export default function ConsoleContent() {
    const [showConsoleDetail, setShowConsoleDetail] = useState(false);
    const [consoles, setConsoles] = useState<ConsoleListProps[]>([]);
    const [selectedComfort, setSelectedComfort] = useState<ConsoleListProps | null>(null);
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


    const handleSortOrder = (order: 'asc' | 'desc') => {
        setSortOrder(order);
        setConsoles(sortConsoles([...consoles], order));
    }

    const handleClick = (console: ConsoleListProps) => {
        setShowConsoleDetail(true);
        setSelectedComfort(console);
    }

    return (
        <>
            <div className='flex flex-col text-center mt-20'>
                <h1 className='text-5xl font-[Tenada]'>위로하기</h1>

                {showConsoleDetail && selectedComfort ? (
                    <ConsoleDetail
                        id={selectedComfort.id}
                        title={selectedComfort.title}
                        categories={selectedComfort.categories}
                        content={selectedComfort.content}
                        writerNickname={selectedComfort.writerNickname}
                    />
                ) : (
                    <>
                        {/* 등록된 글 목록 & 검색 */}
                        <div className='border-2 border-yellow-6 w-[70%] h-screen mx-auto mt-12 rounded-lg'>
                            <div className='flex flex-row items-center justify-between p-4'>
                                <p className='font-[Tenada] text-2xl mx-2 text-center'>등록된 글 목록</p>
                                <ConsoleSearch/>
                            </div>

                            {/* 카테고리, 제목, 작성일, 답변여부 */}
                            <div className='flex flex-col items-center p-2 text-xl font-bold'>
                                <div className='flex w-full'>
                                    {/* 왼쪽 섹션: 카테고리 제목 */}
                                    <div className='flex w-1/2'>
                                        <p className='w-1/2 text-start mx-8'>카테고리</p>
                                        <p className='w-1/2 text-center'>제목</p>
                                    </div>
                                    {/* 오른쪽 섹션: 작성일 답변여부 */}
                                    <div className='flex w-1/2 justify-end gap-32'>
                                        <div className='flex flex-row'>
                                            <p className='text-center'>작성일</p>
                                            {sortOrder === 'desc' ? (
                                                <button onClick={() => handleSortOrder('asc')}
                                                        className=' text-2xl mx-1'>
                                                    <FaSortNumericDown/>
                                                </button>
                                            ) : (
                                                <button onClick={() => handleSortOrder('desc')}
                                                        className=' text-2xl mx-1'>
                                                    <FaSortNumericUp/>
                                                </button>
                                            )}
                                        </div>
                                        <p className=' text-center'>답변여부</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {consoles.map((console) => (
                                    <div
                                        key={console.id}
                                        onClick={() => handleClick(console)}
                                        className='table border-collapse border border-solid w-full'
                                    >
                                        <div className='flex flex-col items-center p-2 text-xl'>
                                            <div className='flex w-full'>
                                                {/* 왼쪽 섹션: 카테고리 제목 */}
                                                <div className='flex w-1/2'>
                                                    <p className='w-1/2 text-start mx-5 text-yellow-1 font-semibold'>{console.categories.join(', ')}</p>
                                                    <h1 className='w-1/2 text-center text-ellipsis whitespace-nowrap overflow-hidden -mx-4'>{console.title}</h1>
                                                </div>
                                                {/* 오른쪽 섹션: 작성일 답변여부 */}
                                                <div className='flex w-1/2 justify-end gap-40 mx-4'>
                                                    <p>{new Date(console.createdAt).toLocaleDateString().replace(/\.$/, '')}</p>
                                                    {console.isAnswered ? (
                                                        <MdOutlineCheckBox className="items-center text-center text-yellow-6"/>
                                                    ) : (
                                                        <MdOutlineCheckBoxOutlineBlank
                                                            className="items-center text-center text-yellow-6"/>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
