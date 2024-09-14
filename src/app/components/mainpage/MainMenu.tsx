import React from 'react';
import {
    MdCreate, MdOutlineNoteAlt,
    MdOutlineSpeakerNotes,
    MdOutlineSummarize,
    MdOutlineVolunteerActivism
} from 'react-icons/md';
import Link from "next/link";
import {getCookie} from "cookies-next";

export default function MainMenu() {

    const role = getCookie('Role');


    return (<div className='p-10 flex text-yellow-2 items-center text-center justify-center mt-10 text-nowrap'>
        <p className='font-semibold mr-10'>자주 찾는<br/>메뉴</p>
        <div className='flex gap-1 '>

            { role === 'LISTENER' ?
                (<Link href='/consoles' className='flex flex-col items-center '>
                <MdOutlineVolunteerActivism
                    className='text-6xl border-2 rounded-full border-yellow-3 p-2 hover:bg-yellow-3 hover:scale-105 hover:text-white'/>
                <p className='text-sm'>위로하기</p>
            </Link>) : <Link href='/comforts' className='flex flex-col items-center '>
                <MdOutlineVolunteerActivism
                    className='text-6xl border-2 rounded-full border-yellow-3 p-2 hover:bg-yellow-3 hover:scale-105 hover:text-white'/>
                <p className='text-sm'>위로받기</p>
            </Link>}

            <hr className=" border-0 border-t-2 border-dotted w-20 mt-8 mb-2 border-yellow-3"/>

            <Link href='/community' className='flex flex-col items-center'>
                <MdOutlineSpeakerNotes
                    className='text-6xl border-2 rounded-full border-yellow-3 p-2 hover:bg-yellow-3 hover:scale-105 hover:text-white'/>
                <p className='text-sm'>커뮤니티</p>
            </Link>

            <hr className=" border-0 border-t-2 border-dotted w-20 mt-8 mb-2 border-yellow-3"/>

            <Link href='/nabistory' className='flex flex-col items-center'>
                <MdOutlineNoteAlt
                    className='text-6xl border-2 rounded-full border-yellow-3 p-2 hover:bg-yellow-3 hover:scale-105 hover:text-white'/>
                <p className='text-sm'>나비 Story</p>
            </Link>

            <hr className=" border-0 border-t-2 border-dotted w-20 mt-8 mb-2 border-yellow-3"/>

            <Link href='/counselors' className='flex flex-col items-center -mx-2'>
                <MdOutlineSummarize
                    className='text-6xl border-2 rounded-full border-yellow-3 p-2 hover:bg-yellow-3 hover:scale-105 hover:text-white'/>
                <p className='text-sm'>상담사 리스트</p>
            </Link>

            <hr className=" border-0 border-t-2 border-dotted w-20 mt-8 mb-2 border-yellow-3"/>


            <Link href='/todayword' className='flex flex-col items-center'>
                <MdCreate
                    className='text-6xl border-2 rounded-full border-yellow-3 p-2 hover:bg-yellow-3 hover:scale-105 hover:text-white'/>
                <p className='text-sm'>오늘 한 줄</p>
            </Link>

        </div>
    </div>);

}


/*
*             <Link href='/comforts' className='flex flex-col items-center '>
                <MdOutlineVolunteerActivism
                    className='text-6xl border-2 rounded-full border-yellow-3 p-2 hover:bg-yellow-3 hover:scale-105 hover:text-white'/>
                <p className='text-sm'>위로받기</p>
            </Link>
*/