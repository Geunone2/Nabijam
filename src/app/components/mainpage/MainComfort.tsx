'use client';

import {useRouter} from "next/navigation";

export default function MainComfort() {

    const router = useRouter();

    const handleClick = () => {
        router.push('/comforts')
    }


    return (
        <section className='mt-10 flex flex-col items-center text-center'>
            <div>
                <h1 className='font-semibold text-yellow-6 italic text-5xl mb-4 '>오늘 하루 힘드셨나요 ?</h1>
                <p className='text-lg italic font-medium'>고민이 있다면 마음 놓고 털어놓으세요. 마음이 한결 가벼워질 거에요.</p>
            </div>


            <button onClick={handleClick}
                    className='p-2 mt-10 border-2 border-yellow-2 placeholder:text-gray-400 placeholder:text-center rounded-xl w-[60%] h-20 hover:bg-yellow-6 hover:text-white duration-300'>
                '오늘, 나의 고민은 무엇인가요? 이 곳에 고민을 털어놓아보세요.'
            </button>
        </section>
    );
}
