import React from 'react';

type Props = {
    clickModal: () => void;
}

export default function SearchModal({clickModal}: Props) {
    return (
        <div className='z-10 fixed top-0 left-0 w-full h-full bg-black/[.2]  flex justify-center items-center border-4'
             onClick={clickModal}>
            <div className='pt-10 gap-1 w-[28rem] h-[33rem] rounded-lg bg-white flex flex-col border-4'
                 onClick={(e) => e.stopPropagation()}>
                <p className='p-4 text-4xl mb-4 font-[Tenada] text-emerald-700'>로그인</p>
                <div className='mt-12'>
                    <div className='rounded-lg mx-2 border-gray-200 border-2'>
                        <input className=' w-full flex items-center border-solid border-gray-500 p-2 text-gray-700'
                               type="text"
                               placeholder="이메일 또는 전화번호"/>
                    </div>
                    <div className='rounded-lg mx-2 border-gray-200 border-2 mt-1'>
                        <input type="text"
                               className='w-full flex items-center border-solid border-gray-500 p-2 text-gray-700'
                               placeholder="비밀번호"/>
                    </div>
                    <div className=' text-center p-2 mt-12 border-2 rounded-lg w-[80%] mx-auto border-emerald-400 bg-emerald-400 text-white font-[Tenada]'> 로그인 </div>
                    <div className='flex content-evenly justify-end mx-2 mt-4'>
                        <button className='border-none p-2 bg-gray' onClick={clickModal}>뒤로가기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}