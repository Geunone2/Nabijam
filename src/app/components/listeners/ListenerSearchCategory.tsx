'use client';
import React, {useState} from 'react';
import {FaMinus, FaPlus} from "react-icons/fa";

export default function ListenerSearchCategory() {
    const [detail, setDetail] = useState(false);

    return (
        <>
            <div className='flex flex-col w-auto ml-10 absolute'>
                <div className='flex flew-row items-center mt-44 gap-36'>
                    <h1 className='font-medium text-lg'>카테고리</h1>
                    {detail ? (<FaPlus/>) : (<FaMinus/>)}
                </div>
                <div className="w-auto  mb-2 border-[1px] border-lightGray/30"></div>
            </div>
        </>);
}