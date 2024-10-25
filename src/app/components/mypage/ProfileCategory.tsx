'use client'

import React, {useState} from 'react';
import Image from 'next/image';
import MyProfile from "@/app/components/mypage/MyProfile";
import MyComfort from "@/app/components/mypage/MyComfort";
import MyCommunity from "@/app/components/mypage/MyCommunity";
import MyCounseling from "@/app/components/mypage/MyCounseling";
import {useMobile} from "@/service/MediaQuery";

export default function ProfileCategory() {

    const isMobile = useMobile();
    const [selectedMenu, setSelectedMenu] = useState('profile'); // 현재 선택된 메뉴를 추적하는 상태

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    return (
        <>
            {isMobile ? (<>
                <section className='flex flex-row'>
                    <div className='border-l-2 h-full w-full shadow-custom'>

                        <ul className='flex flex-col gap-4 p-4 mx-4 mt-8 mb-2 font-bold'>
                            <li
                                className={`text-5xl cursor-pointer ${selectedMenu === 'profile' ? 'text-black' : 'text-gray-400'}`}
                                onClick={() => handleMenuClick('profile')}>
                                내 프로필
                                {selectedMenu === 'profile' && (
                                    <>
                                    <span>
                                        <div className="w-[180px] mt-1.5 border-[2px] border-black"></div>
                                    </span>
                                        {selectedMenu === 'profile' && <MyProfile/>}
                                    </>
                                )}
                            </li>
                            <li
                                className={`text-5xl cursor-pointer ${selectedMenu === 'comfort' ? 'text-black' : 'text-gray-400'}`}
                                onClick={() => handleMenuClick('comfort')}>
                                위로받기
                                {selectedMenu === 'comfort' && (
                                    <>
                                    <span>
                                        <div className="w-[180px] mt-1.5 border-[2px] border-black"></div>
                                    </span>
                                        {selectedMenu === 'comfort' && <MyComfort/>}
                                    </>
                                )}
                            </li>
                            <li
                                className={`text-5xl cursor-pointer ${selectedMenu === 'community' ? 'text-black' : 'text-gray-400'}`}
                                onClick={() => handleMenuClick('community')}>
                                커뮤니티
                                {selectedMenu === 'community' && (
                                    <>
                                    <span>
                                        <div className="w-[180px] mt-1.5 border-[2px] border-black"></div>
                                    </span>
                                        {selectedMenu === 'community' && <MyCommunity/>}
                                    </>
                                )}
                            </li>
                            <li
                                className={`text-5xl cursor-pointer ${selectedMenu === 'counseling' ? 'text-black' : 'text-gray-400'}`}
                                onClick={() => handleMenuClick('counseling')}>
                                상담내역
                                {selectedMenu === 'counseling' && (
                                    <>
                                    <span>
                                        <div className="w-[180px] mt-1.5 border-[2px] border-black"></div>
                                    </span>
                                        {selectedMenu === 'counseling' && <MyCounseling/>}
                                    </>
                                )}
                            </li>
                        </ul>
                    </div>
                </section>
            </>) : (<>
                <section className='flex flex-row'>
                    <aside className='mx-20 border-l-2 h-full w-[40%] shadow-custom'>
                        <div className='flex flex-col items-center gap-4'>
                            <Image src='/images/Profile.jpeg' alt="Default Profile" width={400} height={400}
                                   className='w-[200px] h-[200px]'/>

                            {/* {mypage.nickname}이 들어갈 곳 */}
                            <h1 className='text-5xl'>짱구</h1>

                            {/* {mypage.address}가 들어갈 곳 */}
                            <h2 className='text-2xl'>test1@test.com</h2>
                        </div>

                        <ul className='flex flex-col gap-28 p-4 mx-4 mt-8 mb-2 font-bold'>
                            <li
                                className={`text-5xl cursor-pointer ${selectedMenu === 'profile' ? 'text-black' : 'text-gray-400'}`}
                                onClick={() => handleMenuClick('profile')}>
                                내 프로필
                                {selectedMenu === 'profile' && (
                                    <span>
                                    <div className="w-[40%] mt-1.5 border-[2px] border-black"></div>
                                </span>
                                )}
                            </li>
                            <li
                                className={`text-5xl cursor-pointer ${selectedMenu === 'comfort' ? 'text-black' : 'text-gray-400'}`}
                                onClick={() => handleMenuClick('comfort')}>
                                위로받기
                                {selectedMenu === 'comfort' && (
                                    <span>
                                    <div className="w-[40%] mt-1.5 border-[2px] border-black"></div>
                                </span>
                                )}
                            </li>
                            <li
                                className={`text-5xl cursor-pointer ${selectedMenu === 'community' ? 'text-black' : 'text-gray-400'}`}
                                onClick={() => handleMenuClick('community')}>
                                커뮤니티
                                {selectedMenu === 'community' && (
                                    <span>
                                    <div className="w-[40%] mt-1.5 border-[2px] border-black"></div>
                                </span>
                                )}
                            </li>
                            <li
                                className={`text-5xl cursor-pointer ${selectedMenu === 'counseling' ? 'text-black' : 'text-gray-400'}`}
                                onClick={() => handleMenuClick('counseling')}>
                                상담내역
                                {selectedMenu === 'counseling' && (
                                    <span>
                                    <div className="w-[40%] mt-1.5 border-[2px] border-black"></div>
                                </span>
                                )}
                            </li>
                        </ul>
                    </aside>

                    {/* 선택된 메뉴에 따라 MyProfile 컴포넌트가 표시됨 */}
                    {selectedMenu === 'profile' && <MyProfile/>}
                    {selectedMenu === 'comfort' && <MyComfort/>}
                    {selectedMenu === 'community' && <MyCommunity/>}
                    {selectedMenu === 'counseling' && <MyCounseling/>}

                    {/* 다른 메뉴를 선택할 경우 다른 컴포넌트나 내용을 표시할 수 있음 */}
                </section>
            </>)}

        </>
    );
}
