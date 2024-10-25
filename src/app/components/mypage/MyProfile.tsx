import React from 'react';
import Image from 'next/image'
import {useMobile} from "@/service/MediaQuery";

export default function MyProfile() {

    const isMobile = useMobile();

    return (
        <>
            {isMobile ? (<>
                <article className='w-full'>
                    <div
                        className='border-4 border-yellow-6 rounded-2xl flex flex-row mt-4 items-center w-full h-[240px] p-4 gap-4'>

                        {/* {mypage.profile}이 들어갈 곳 */}
                        <Image src="/images/profile.jpeg" alt="Default Profile" width={250} height={250} className='w-[90px] h-[90px]'/>

                        <div className='flex flex-col gap-8 w-full'>

                            {/* {mypage.nickname}이 들어갈 곳 */}
                            <div className='flex flex-row justify-between'>
                                <p className='text-2xl'><span className='text-3xl'>닉네임</span> : 짱구</p>
                                <button className='bg-yellow-6 text-black text-xl rounded-xl p-2'>닉네임 수정</button>
                            </div>

                            {/* {mypage.address}이 들어갈 곳 */}
                            <div className='flex flex-row justify-between'>
                                <p className='text-2xl'><span className='text-3xl'>아이디</span> : test1@test.com</p>
                                <button className='bg-yellow-6 text-black text-xl rounded-xl p-2'>비밀번호 수정</button>
                            </div>

                        </div>
                    </div>
                </article>
            </>) : (<>
                <article className='w-full'>
                    <h1 className='text-6xl w-fit font-semibold mt-20'>내 프로필</h1>
                    <div
                        className='border-4 border-yellow-6 rounded-2xl flex flex-row mt-32 items-center w-[95%] mx-auto h-[40%] p-4 gap-4'>

                        {/* {mypage.profile}이 들어갈 곳 */}
                        <Image src="/images/profile.jpeg" alt="Default Profile" width={250} height={250}/>

                        <div className='flex flex-col gap-20 w-full'>

                            {/* {mypage.nickname}이 들어갈 곳 */}
                            <div className='flex flex-row justify-between'>
                                <p className='text-4xl'><span className='text-5xl'>닉네임</span> : 짱구</p>
                                <button className='bg-yellow-6 text-black text-2xl rounded-xl p-2'>닉네임 수정</button>
                            </div>

                            {/* {mypage.address}이 들어갈 곳 */}
                            <div className='flex flex-row justify-between'>
                                <p className='text-4xl'><span className='text-5xl'>아이디</span> : test1@test.com</p>
                                <button className='bg-yellow-6 text-black text-2xl rounded-xl p-2'>비밀번호 수정</button>
                            </div>

                        </div>
                    </div>
                </article>
            </>)}
        </>);
}