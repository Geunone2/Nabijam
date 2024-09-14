'use client'

import React from 'react';
import Link from "next/link";
import {FiUser} from "react-icons/fi";
import Image from "next/image";
import Logout from "@/app/components/mainpage/Logout";

interface HeaderProps {
    nickname: string;
    status: boolean;
    role: string;
}

export default function Header({nickname, status, role}: HeaderProps) {


    return (
        <>

            {status ? (
                <>
                    <nav className='flex text-center text-sm items-center justify-end gap-8 mx-6 mt-2'>
                        <Logout/>
                        <div className='border-2 left-1 -mx-6 h-6'/>
                        <Link href='/mypage' className='font-[Tenada] text-xs hover:text-yellow-6'>마이페이지</Link>
                    </nav>

                    <div className="w-full mt-1 mb-2 border-[2px] border-lightGray/30"></div>

                    <header className='flex p-4 font-["Tenada"] text-nowrap overflow-y-hidden scrollbar-hide'>
                        <nav
                            className='p-2 flex items-center text-2xl gap-32 font-semibold text-gray-400 mx-72 relative'>
                            <div className='absolute mt-14 -mx-[400px]'>
                                <Link href='/' className='text-3xl text-yellow-400'>
                                    <Image src='/images/TextLogo4.svg' alt="icon" width={425} height={350} priority/>
                                </Link>
                            </div>
                                {role === "LISTENER" ?
                                    <Link href='/consoles' className=' hover:text-gray-700 hover:scale-105' >위로하기</Link> :
                                    <Link href='/comforts' className='hover:text-gray-700 hover:scale-105' >위로받기</Link>}
                            <Link href='/community' className='hover:text-gray-700 hover:scale-105'>커뮤니티</Link>
                            <Link href='/navistory' className='hover:text-gray-700 hover:scale-105'>나비 Story</Link>
                            <Link href='/mypage' className='hover:text-gray-700 hover:scale-105'>마이 페이지</Link>
                        </nav>
                        {role === "LISTENER" ?
                            <div className='flex mx-20 gap-4 text-center items-center  '>
                                <p className='text-lg font-[Tenada]'><span className='text-yellow-6'>{nickname}</span> 상담사님
                                    환영합니다.</p>
                                <Link href='/mypage' className='-mt-2 text-3xl'> <FiUser/></Link>
                            </div> :
                            <div className='flex mx-24 gap-4 text-center items-center '>
                                <p className='text-lg font-[Tenada]'><span className='text-yellow-6'>{nickname}</span>님
                                    환영합니다.</p>
                                <Link href='/mypage' className='-mt-2 text-3xl'> <FiUser/></Link>
                            </div>
                        }
                    </header>
                    <div className="w-full mt-1 mb-2 border-[2px] border-lightGray/30"></div>
                </>
            ) : (
                <>
                    <nav className='flex text-center text-sm items-center justify-end gap-8 mx-6 mt-2'>
                        <Link href='/auth/listener' className='font-["Tenada"]'><span
                            className='text-yellow-6'>상담사</span><br/>회원가입</Link>
                        <div className='border-2 left-1 -mx-6 h-6'/>
                        <Link href='/auth/login' className='font-["Tenada"]'>로그인</Link>
                        <div className='border-2 left-1 -mx-6 h-6'/>
                        <Link href='/auth/signup' className='font-["Tenada"]'>회원가입</Link>
                    </nav>

                    <div className="w-full mt-1 mb-2 border-[2px] border-lightGray/30"></div>

                    <header className='flex p-4 font-["Tenada"] text-nowrap overflow-y-hidden scrollbar-hide'>
                        <nav
                            className='p-2 flex items-center text-2xl gap-32 font-semibold text-gray-400 mx-72 relative'>
                            <div className='absolute mt-14 -mx-[400px]'>
                                <Link href='/' className='text-3xl text-yellow-400'>
                                    <Image src='/images/TextLogo4.svg' alt="icon" width={425}
                                           height={350}
                                           priority/>
                                </Link>
                            </div>
                            <Link href='/comforts' className='hover:text-gray-700 hover:scale-105'>위로받기</Link>
                            <Link href='/community' className='hover:text-gray-700 hover:scale-105'>커뮤니티</Link>
                            <Link href='/navistory' className='hover:text-gray-700 hover:scale-105'>나비 Story</Link>
                            <Link href='/mypage' className='hover:text-gray-700 hover:scale-105'>마이 페이지</Link>
                        </nav>
                        <Link href='/mypage' className='mt-2 ml-auto text-3xl'> <FiUser/></Link>
                    </header>
                    <div className="w-full mt-1 mb-2 border-[2px] border-lightGray/30"></div>
                </>
            )}


        </>
    );
}

/*
*  {nickname ? (<p>`${nickname}님 환영합니다.`</p>) : (<>
                    <Link href='/auth/listener' className='font-["Tenada"]'><span
                        className='text-yellow-6'>상담사</span><br/>회원가입</Link>
                    <div className='border-2 left-1 -mx-6 h-6'/>
                    <Link href='/auth/login' className='font-["Tenada"]'>로그인</Link>
                    <div className='border-2 left-1 -mx-6 h-6'/>
                    <Link href='/auth/signup' className='font-["Tenada"]'>회원가입</Link>
                </>)}
* */