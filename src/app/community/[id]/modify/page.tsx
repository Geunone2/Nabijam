import React from 'react';
import CommunityModify from "@/app/components/community/CommunityModify";

export default function CommunityModifyPage() {
    return (<>
        <div className='flex flex-col text-center'>
            <h1 className='text-5xl font-bold mt-10'>커뮤니티</h1>
            <span className='mt-4 text-xl'>어떤 고민이든 안전하게 공유할 수 있는 공간입니다. 편안하게 이야기해 주세요</span>
        </div>
        <CommunityModify/>
    </>);
}