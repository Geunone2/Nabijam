'use client';
import React, {useState} from 'react';
import CommunityRegister from "@/app/components/community/CommunityRegister";
import {FaPen} from "react-icons/fa";
import CommunityList from "@/app/components/community/CommunityList";
import {useMobile} from "@/service/MediaQuery";

export default function CommunityContent() {

    const isMobile = useMobile();

    const [showCommunityRegister, setShowCommunityRegister] = useState(false);

    const handleClick = () => {
        setShowCommunityRegister(!showCommunityRegister);
    }

    return (
        <>
            {showCommunityRegister ? (<CommunityRegister/>) : (
                <>
                    {isMobile ? (<>
                        <div className='w-[95%] mx-auto mt-4 flex justify-end'>
                            <button
                                onClick={handleClick}
                                className='w-[20%] text-center bg-yellow-6 p-3 rounded-lg block text-ellipsis'
                            >
                                <div
                                    className='flex flex-row justify-center gap-2 text-white text-xl whitespace-nowrap'>
                                    <FaPen className='mt-1'/>
                                    <span>사연 작성</span>
                                </div>
                            </button>
                        </div>
                    </>) : (<>
                        <div className='w-[80%] mx-auto mt-4 flex justify-end'>
                            <button
                                onClick={handleClick}
                                className='w-[15%] text-center bg-yellow-6 p-3 rounded-lg block text-ellipsis'
                            >
                                <div
                                    className='flex flex-row justify-center gap-2 text-white text-4xl whitespace-nowrap'>
                                    <FaPen className='mt-1'/>
                                    <span>사연 작성</span>
                                </div>
                            </button>
                        </div>
                    </>)}
                    <CommunityList/>
                </>
            )}
        </>);
}