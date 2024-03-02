import React from 'react';
import Link from "next/link";
import {IoHome} from "react-icons/io5";
import {FiUser} from "react-icons/fi";
import {PiButterflyFill} from "react-icons/pi";

export default function Header() {
    return (
        <>
            <nav className='flex justify-end text-2xl gap-12 mx-6 mt-4 font-["Tenada"]'>
                <Link href='/expertregister'>전문가 등록</Link>
                <div className='border-2 left-1 -mx-6 mb-1'/>
                <Link href='/signin' className='text-green-700'>로그인</Link>
                <div className='border-2 left-1 -mx-6 mb-1'/>
                <Link href='/signup'>회원가입</Link>
            </nav>
            <div className="w-full mt-2 mb-2 border-[2px] border-lightGray/30"></div>
            <header className='flex items-center p-4 font-["Tenada"]'>
                <Link href='/'>
                    <h1 className='text-4xl text-yellow-500 flex '>나비잠
                    </h1>
                </Link>
                <nav className='flex text-2xl gap-20 font-semibold text-gray-600 mx-20'>
                    <Link href='/counselors' className='hover:text-green-700 hover:scale-105'>상담하기</Link>
                    <Link href='/comunity' className='hover:text-green-700 hover:scale-105'>커뮤니티</Link>
                    <Link href='/diary' className='hover:text-green-700 hover:scale-105'>나비 Story</Link>
                    <Link href='/giftshop' className='hover:text-green-700 hover:scale-105'>상담내역 확인</Link>
                </nav>
                <Link href='/mypage' className='ml-auto text-3xl'> <FiUser/></Link>
            </header>
        </>
    );
}