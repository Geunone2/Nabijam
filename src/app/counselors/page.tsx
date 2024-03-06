import React from 'react';
import {IoIosSearch} from 'react-icons/io';
import CounselorsGrid from "@/app/components/CounselorsGrid";
import {getAllCounselors} from "@/service/service";

export default async function CounselorsPage() {
    const counselors = await getAllCounselors();
    return (<>
        <div className="w-full mb-2 border-[2px] border-lightGray/30"></div>
        <div className='flex justify-between p-2'>
            <p className='text-3xl font-[Tenada] mx-2'>심리 상담</p>
            <div className='mx-4'>
                <form className='flex items-center gap-2 mb-2'>
                    <input
                        className='w-full border-4 rounded-lg outline-none placeholder-black focus:placeholder-gray-400'
                        type="text" name="Search" placeholder=" 전문가 상담 검색"
                        size={30}/>
                    <IoIosSearch/>
                </form>
            </div>
        </div>
        <div className="w-full mb-2 border-[2px] border-lightGray/30"></div>
        <section>
            <CounselorsGrid counselors={counselors}/>
        </section>
    </>);
}