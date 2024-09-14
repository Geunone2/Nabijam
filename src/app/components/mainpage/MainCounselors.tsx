import React from 'react';
import Link from "next/link";
import {FaArrowRight} from "react-icons/fa";
import CounselorsGrid from "@/app/components/CounselorsGrid";
import {getAllCounselors} from "@/service/service";

export default async function MainCounselors() {
    const counselors = await getAllCounselors();
    return (<section className='mt-20'>
        <div className='flex flex-row w-[60%] justify-between mx-auto'>
            <p className='font-semibold'>누구에게 상담 받고 싶나요 ?</p>
            <Link href='/counselors' className='text-gray-400 flex items-center gap-1'>더 많은 상담사
                만나기 <FaArrowRight/></Link>
        </div>
        <div>
            <CounselorsGrid counselors={counselors}/>
        </div>
    </section>);
}