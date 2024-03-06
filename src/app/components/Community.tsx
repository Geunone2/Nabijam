import React from 'react';
import Link from "next/link";
import {FaCircleArrowRight} from "react-icons/fa6";

export default function Community() {
    return (
        <>
            <div className='flex m-4 mt-8 mx-auto justify-between'>
                <h1 className='text-4xl mx-12 font-["Tenada"]'>커뮤니티</h1>
                <Link href='/community' className='mt-2 mx-12 text-xl font-[Tenada] flex items-center gap-1'>전체 보기 <FaCircleArrowRight className='mb-1'/></Link>
            </div>
            <p className="w-auto mx-auto -mt-2 mb-2 border-[2px] border-lightGray/30"></p>
            <div className='flex mx-auto gap-24 m-2 w-[80%] h-[50%]'>
                <div className='border-8 rounded-lg border-pastel-apricot m-2 w-full'>
                    <p className="w-[95%] mx-auto -mt-2 mb-2 border-[2px] border-lightGray/30"></p>
                    <div className='p-2'>
                        해당 위치에 커뮤니티 글 내용이 들어가도록 작성
                    </div>
                </div>
                <div className='border-8 rounded-lg border-pastel-apricot m-2 w-full'>
                    <div className='m-2'>
                        해당 위치에 커뮤니티 글 내용이 들어가도록 작성
                    </div>
                </div>
                <div className='border-8 rounded-lg border-pastel-apricot m-2 w-full'>
                    <div className='m-2'>
                        해당 위치에 커뮤니티 글 내용이 들어가도록 작성
                    </div>
                </div>
            </div>
        </>
    );
}