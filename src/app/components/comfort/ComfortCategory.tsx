import React from 'react';

const categories = [
    '자유', '육아', '진로', '결혼', '외모', '인간관계', '중독',
    '이별', '가족', '친구', '건강', '정신건강', '사랑'
]

interface ComfortCategoryProps {
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ComfortCategory({ selectedCategories, setSelectedCategories }: ComfortCategoryProps) {

    const handleClick = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(cat => cat !== category)
                : [...prev, category]
        );
    }

    return (
        <>
            <span className='w-[80%] mx-auto flex font-medium text-lg text-nowrap mt-2 font-[Tenada] text-yellow-6'>카테고리 설정</span>
            <div className='flex text-center mx-auto w-[80%] rounded-lg bg-gray-100'>
                <div className='mx-auto flex gap-8 mt-1 flex-wrap'>
                    {categories.map(category => (
                        <div
                            key={category}
                            onClick={() => handleClick(category)}
                            className={`text-sm  h-fit w-16 p-1 rounded-2xl border-2 cursor-pointer ${selectedCategories.includes(category) ? 'bg-yellow-6 text-white border-yellow-6' : 'bg-white text-black border-yellow-6'}`}
                        >
                            {category}
                        </div>
                    ))}
                </div>
            </div>
        </>);
}