'use client';

import {useRouter} from "next/navigation";
import {useMobile} from "@/service/MediaQuery";

export default function MainComfort() {
    const isMobile = useMobile();

    const router = useRouter();

    const handleClick = () => {
        router.push('/comforts')
    }


    return (
        <section className={`mt-16 flex flex-col items-center ${isMobile ? 'mb-16' : ''}  text-center`}>
            <div>
                <h1 className={`font-semibold text-yellow-6 italic mb-8 ${isMobile ? 'text-5xl' : 'text-7xl'}`}>오늘 하루
                    힘드셨나요 ?</h1>
                <p className='text-3xl italic font-medium mb-8'>고민이 있다면 마음 놓고 털어놓으세요.<br/>마음이 한결 가벼워질 거에요.</p>
            </div>


            <button onClick={handleClick}
                    className={`p-2 mt-4 border-2 border-yellow-2 text-2xl placeholder:text-gray-400 placeholder:text-center rounded-xl w-[80%] h-28 hover:bg-yellow-6 hover:text-white duration-300`}>
                '오늘, 나의 고민은 무엇인가요?<br/>이 곳에 고민을 털어놓아보세요.'
            </button>
        </section>
    );
}
