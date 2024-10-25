import React from 'react';
import {useMobile} from "@/service/MediaQuery";

const categories = [
    '자유', '육아', '진로', '결혼', '외모', '인간관계', '중독',
    '이별', '가족', '친구', '건강', '정신건강', '사랑'
]

interface ComfortCategoryProps {
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function RegisterCategory({selectedCategories, setSelectedCategories}: ComfortCategoryProps) {

    const isMobile = useMobile();

    const handleClick = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(cat => cat !== category)
                : [...prev, category]
        );
    }

    return (
        <>
            <span
                className={` ${isMobile ? 'w-[95%]' : 'w-[80%]'}  mx-auto flex font-medium text-3xl text-nowrap mt-6 font-[Tenada] text-yellow-6`}>카테고리 설정</span>
            <div className={` ${isMobile ? 'w-[95%]' : 'w-[80%]'} flex text-center mx-auto rounded-lg mt-3`}>
                <div className='flex gap-1 p-1 flex-wrap'>
                    {categories.map(category => (
                        <div
                            key={category}
                            onClick={() => handleClick(category)}
                            className={`text-xl w-[98px] h-fit p-1 rounded-2xl border-2 cursor-pointer ${selectedCategories.includes(category) ? 'bg-yellow-6 text-white border-yellow-6' : 'bg-white text-black border-yellow-6'}`}
                        >
                            {category}
                        </div>
                    ))}
                </div>
            </div>
        </>);
}