import React from 'react';
import Link from "next/link";
import {FaCircleArrowRight} from "react-icons/fa6";

export default function MainCommunity() {
    return (
        <section>
            <div className='flex m-4 mt-20 mx-auto flex-col text-center items-center'>
                <h1 className='text-6xl text-emerald-400 mx-12 font-["Tenada"]'>커뮤니티</h1>
                <Link href='/community' className='mt-2 mx-12 text-xl font-[Tenada] flex items-center gap-1 hover:scale-105'>전체
                    보기 <FaCircleArrowRight className='mb-1'/></Link>
            </div>
            <div className='flex mx-auto gap-48 m-2 h-96 justify-center'>
                <div className='border-8 rounded-lg border-pastel-apricot m-2'>
                    <p className='p-2'>
                        해당 위치에 커뮤니티 글 내용이 들어가도록 작성
                    </p>
                </div>
                <div className='border-8 rounded-lg border-pastel-apricot m-2 '>
                    <p className='p-2'>
                        해당 위치에 커뮤니티 글 내용이 들어가도록 작성
                    </p>
                </div>
                <div className='border-8 rounded-lg border-pastel-apricot m-2 '>
                    <p className='p-2'>
                        해당 위치에 커뮤니티 글 내용이 들어가도록 작성
                    </p>
                </div>
            </div>
        </section>
    );
}