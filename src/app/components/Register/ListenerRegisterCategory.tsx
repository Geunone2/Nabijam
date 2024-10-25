import React from 'react';
import {useMobile} from "@/service/MediaQuery";

const categories = [
    '자유', '육아', '진로', '결혼', '외모', '인간관계', '중독',
    '이별', '가족', '친구', '건강', '정신건강', '사랑'
]

interface ListerCategoryProps {
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ComfortCategory({ selectedCategories, setSelectedCategories }: ListerCategoryProps) {

    const isMobile = useMobile();
    const handleClick = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(cat => cat !== category)
                : [...prev, category]
        );
    }

    return (
        <>
            <div className='flex w-full'>
                <label htmlFor='category'
                       className={` ${isMobile ? 'text-2xl' : 'text-3xl'}  font-semibold w-40 text-wrap`}>카테고리</label>

                <div className=' text-center flex gap-4 flex-wrap w-full'>
                    {categories.map(category => (
                        <div
                            key={category}
                            onClick={() => handleClick(category)}
                            className={`text-xl h-fit w-20 p-1 rounded-2xl border-2 cursor-pointer ${selectedCategories.includes(category) ? 'bg-yellow-6 text-white border-yellow-6' : 'bg-white text-black border-yellow-6'}`}
                        >
                            {category}
                        </div>
                    ))}
                </div>
            </div>
        </>);
}
