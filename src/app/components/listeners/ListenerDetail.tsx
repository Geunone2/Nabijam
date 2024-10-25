'use client';

import React from 'react'
import Image from 'next/image'
import {MdOutlineBusinessCenter, MdOutlineSchool} from 'react-icons/md';
import {useMobile} from "@/service/MediaQuery";

export default function ListenerDetail({nickname, profile, categories, career, education}) {

    const isMobile = useMobile();

    return (
        <>
            {isMobile ? (
                <div className='mx-auto flex flex-col bg-gradient-to-r from-gray-100 to-white'>
                    <div className='flex flex-row justify-between items-center p-6 w-full'>
                        <h1 className='text-5xl font-semibold'>{nickname} <span className='text-3xl font-medium'>상담사</span></h1>
                        <p className='text-yellow-2 font-bold mt-2 text-xl'>#{categories.join(' #')}</p>
                    </div>
                    <div className="w-full  border-[2px] border-yellow-6/30"></div>
                    <div className='flex justify-center'>
                        <Image src={profile} alt="Profile Image" className='rounded-xl w-full h-[480px]' width={300} height={150} />
                    </div>
                    <div className='flex flex-col gap-6 p-4 mt-6'>
                        <p className='text-3xl flex items-center font-medium gap-2'>
                            <MdOutlineBusinessCenter className='text-5xl' />
                            경력
                        </p>
                        <ul className='mx-4 mb-4 list-disc font-sans'>
                            {career.map((item, index) => (
                                <li key={index} className='mt-2 text-xl'>{item}</li>
                            ))}
                        </ul>
                        <p className='text-3xl flex items-center font-medium gap-2'>
                            <MdOutlineSchool className='text-5xl' />
                            학력
                        </p>
                        <ul className='mx-4 list-disc font-sans mb-10'>
                            {education.map((item, index) => (
                                <li key={index} className='mt-2 text-xl'>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className='mx-auto flex h-full bg-gradient-to-r from-gray-100 to-white'>
                    <div className='flex flex-col p-10 w-full'>
                        <div className='flex flex-row gap-2'>
                            <h1 className='text-6xl font-semibold'>{nickname} <span className='text-4xl font-medium'>상담사</span></h1>
                            <p className='text-yellow-2 font-bold mt-auto text-2xl'>#{categories.join(' #')}</p>
                        </div>
                        <div className="w-full mt-4 mb-2 border-[2px] border-yellow-6/30"></div>
                        <div className='flex flex-col gap-6 p-4'>
                            <p className='text-4xl flex items-center font-medium gap-2'>
                                <MdOutlineBusinessCenter className='text-6xl -mt-1' />
                                경력
                            </p>
                            <ul className='mx-4 mb-4 list-disc font-sans'>
                                {career.map((item, index) => (
                                    <li key={index} className='mt-2 text-2xl'>{item}</li>
                                ))}
                            </ul>
                            <p className='text-4xl flex items-center font-medium gap-2'>
                                <MdOutlineSchool className='text-6xl -mt-1' />
                                학력
                            </p>
                            <ul className='mx-4 list-disc font-sans'>
                                {education.map((item, index) => (
                                    <li key={index} className='mt-2 text-2xl'>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <Image src={profile} alt="Profile Image" className='rounded-r-xl' width={500} height={200} />
                </div>
            )}
        </>
    );
}