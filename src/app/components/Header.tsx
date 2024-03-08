import React from 'react';
import Link from "next/link";

;
import {FiUser} from "react-icons/fi";
import SearchModal from "@/app/components/SearchModal";
import ModalButton from "@/app/components/ModalButton";

export default function Header() {
    return (
        <>
            <nav className='flex justify-end text-2xl gap-12 mx-6 mt-4'>
                <div className='border-2 left-1 -mx-6 mb-1'/>
                <ModalButton/>
                <div className='border-2 left-1 -mx-6 mb-1'/>
                <Link href='/auth/register' className='font-["Tenada"]'>회원가입</Link>
            </nav>
            <div className="w-full mt-2 mb-2 border-[2px] border-lightGray/30"></div>

            <header className='flex items-center p-4 font-["Tenada"] '>
                <Link href='/'>
                    <h1 className='text-3xl flex text-yellow-400 whitespace-nowrap'>나비잠
                    </h1>
                </Link>
                <nav className='flex text-2xl gap-16 font-semibold text-pastel-gray mx-20'>
                    <Link href='/counselors' className='hover:text-gray-700 hover:scale-105'>위로받기</Link>
                    <Link href='/community' className='hover:text-gray-700 hover:scale-105'>커뮤니티</Link>
                    <Link href='/diary' className='hover:text-gray-700 hover:scale-105'>나비 Story</Link>
                </nav>
                <Link href='/mypage' className='ml-auto mb-2 text-3xl'> <FiUser/></Link>
            </header>
        </>
    );
}