'use client';

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {
    MdCreate,
    MdOutlineNoteAlt,
    MdOutlineSpeakerNotes,
    MdOutlineSummarize,
    MdOutlineVolunteerActivism
} from "react-icons/md";
import {getCookie} from "cookies-next";


export default function MainSideBar() {

    const [barPosition, setBarPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [role, setRole] = useState('');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        if (scrollY < 480) {
            setIsVisible(false);
            setBarPosition(480);
        } else {
            setIsVisible(true);
            const position = Math.min(1800, 140 + scrollY);
            setBarPosition(position);
        }
    };

    useEffect(() => {
        const cookieRole = getCookie('Role');
        setRole(cookieRole || '');
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>

            <aside style={{top: barPosition, opacity: isVisible ? 1 : 0}}
                   className='flex flex-col absolute transition-all left-20 ease-out text-center gap-1'>
                <p className='font-semibold text-yellow-3'>자주<br/>찾는 메뉴</p>
                <div className='flex flex-col gap-1'>

                    {role === "LISTENER" ?
                        <> <Link href='/comforts' className='flex flex-col items-center'>
                            <MdOutlineVolunteerActivism
                                className='text-yellow-3 text-6xl border-2 rounded-full border-yellow-3 p-2 hover:bg-yellow-3 hover:scale-105 hover:text-white'/>
                            <p className='text-sm'>위로하기</p>
                        </Link></> :
                        <> <Link href='/comforts' className='flex flex-col items-center'>
                            <MdOutlineVolunteerActivism
                                className='text-yellow-3 text-6xl border-2 rounded-full border-yellow-3 p-2 hover:bg-yellow-3 hover:scale-105 hover:text-white'/>
                            <p className='text-sm'>위로받기</p>
                        </Link></>}

                    <hr className=" border-0 border-l-2 border-dotted h-5 mx-auto border-yellow-3"/>
                    <Link href='/community' className='flex flex-col items-center'>
                        <MdOutlineSpeakerNotes
                            className='text-yellow-3 text-6xl border-2 rounded-full border-yellow-3 p-2 hover:bg-yellow-3 hover:scale-105 hover:text-white'/>
                        <p className='text-sm'>커뮤니티</p>
                    </Link>
                    <hr className="border-0 border-l-2 border-dotted h-5 mx-auto border-yellow-3"/>
                    <Link href='/nabistory' className='flex flex-col items-center'>
                        <MdOutlineNoteAlt
                            className='text-yellow-3 text-6xl border-2 rounded-full border-yellow-3 p-2 hover:bg-yellow-3 hover:scale-105 hover:text-white'/>
                        <p className='text-sm'>나비 Story</p>
                    </Link>
                    <hr className="border-0 border-l-2 border-dotted h-5 mx-auto border-yellow-3"/>
                    <Link href='/counselors' className='flex flex-col items-center -mx-2'>
                        <MdOutlineSummarize
                            className='text-yellow-3 text-6xl border-2 rounded-full border-yellow-3 p-2 hover:bg-yellow-3 hover:scale-105 hover:text-white'/>
                        <p className='text-sm'>상담사 리스트</p>
                    </Link>
                    <hr className="border-0 border-l-2 border-dotted h-5 mx-auto border-yellow-3"/>
                    <Link href='/todayword' className='flex flex-col items-center'>
                        <MdCreate
                            className='text-yellow-3 text-6xl border-2 rounded-full border-yellow-3 p-2 hover:bg-yellow-3 hover:scale-105 hover:text-white'/>
                        <p className='text-sm'>오늘 한 줄</p>
                    </Link>
                </div>
            </aside>
        </>
    );
}
