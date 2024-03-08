import React from 'react';
import Link from "next/link";
import {FaCircleArrowRight} from "react-icons/fa6";

export default function MainComfort() {
    return (
        <section>
            <div className='flex flex-col m-4 mt-[10%] mx-auto text-center items-center'>
                <h1 className='text-6xl text-emerald-400 mx-12 font-["Tenada"]'>위로받기</h1>
                <Link href='/counselors' className='mt-2 mx-12 text-xl font-[Tenada] flex items-center gap-1 hover:scale-105'>전체
                    보기 <FaCircleArrowRight className='mb-1'/></Link>
            </div>
            <div className='flex mx-auto m-2 gap-48 h-96 justify-center'>
                <div className='border-8 rounded-lg border-pastel-apricot m-2'>
                    <p className='m-2 text-center'>
                        해당 위치에 커뮤니티 글 내용이 들어가도록 작성
                    </p>
                </div>
                <div className='border-8 rounded-lg border-pastel-apricot m-2'>
                    <p className='m-2 text-center'>
                        해당 위치에 커뮤니티 글 내용이 들어가도록 작성
                    </p>
                </div>
                <div className='border-8 rounded-lg border-pastel-apricot m-2'>
                    <p className='m-2 text-center'>
                        해당 위치에 커뮤니티 글 내용이 들어가도록 작성
                    </p>
                </div>
            </div>
        </section>
    );
}