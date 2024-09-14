"use client"
import React from 'react';
import {FaSearch} from "react-icons/fa";


export default function ComfortSearch() {

    return (
        < div className='flex flex-row items-center'>
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <FaSearch className='text-xl items-center'/>
            <input
                type="text"
                placeholder="검색하기"
                className='border-2 mx-2 w-80 h-[35px] rounded-lg border-gray-500 placeholder:p-1'>
            </input>
        </div>);
}