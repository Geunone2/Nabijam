import React from 'react';
import {FaSearch} from "react-icons/fa";

export default function ListenerSearch() {
    return (<>
        <div className='flex flex-col gap-1 w-auto ml-10 absolute mt-20'>
            <h1 className='text-xl font-medium'>맞춤 상담사 찾기</h1>
            <div className='flex flex-row items-center'>
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <FaSearch className='text-xl items-center text-gray-500'/>
                <input
                    type="text"
                    placeholder="상담사 검색하기"
                    className='border-2 mx-2 h-[35px] rounded-lg border-gray-300 bg-gray-300 placeholder:text-gray-500 placeholder:p-1 focus:bg-white'>
                </input>
            </div>
        </div>

    </>);
}