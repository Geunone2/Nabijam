import React from 'react';
import MultiCarousel from "@/app/components/MultiCarousel";

export default function Review() {

    return (
        <>
            <div className='flex justify-between h-2/3 p-6 gap-20'>
                <div className='border-8 rounded-lg border-emerald-400 w-full'>
                    <h1 className='text-3xl font-["Tenada"] m-4'>상담후기</h1>
                    <p className="w-[98%] mx-auto -mt-2 mb-2 border-[2px] border-lightGray/30"></p>
                </div>
            </div>
        </>
    );
}

// <div className='border-8 rounded-lg border-emerald-400 w-full'>
//     <h1 className='text-3xl font-["Tenada"] m-4'>커뮤니티</h1>
//     <p className="w-[95%] mx-auto -mt-2 mb-2 border-[2px] border-lightGray/30"></p>
// </div>