import React from 'react';

export default function HeaderSkeleton() {
    return (
        <div className="flex flex-col mt-2">
            {/* Skeleton for the top navigation */}
            <nav className='flex text-sm items-center justify-end gap-8 mx-2'>
                <div className="h-4 w-14 bg-gray-300 rounded animate-pulse"></div>
                <div className='border-2 left-1 -mx-6 h-6'/>
                <div className="h-4 w-14 bg-gray-300 rounded animate-pulse"></div>
            </nav>

            <div className="w-full mt-1 mb-2 border-[2px] border-lightGray/30"></div>

            {/* Skeleton for the header */}
            <header className='flex p-4'>
                <nav className='p-2 flex items-center text-2xl gap-28 font-semibold text-gray-400'>
                    <div className='w-40 h-12 items-center bg-gray-300 rounded animate-pulse'></div>
                    <div className='w-32 h-6 bg-gray-300 rounded animate-pulse'></div>
                    <div className='w-32 h-6 bg-gray-300 rounded animate-pulse'></div>
                    <div className='w-32 h-6 bg-gray-300 rounded animate-pulse'></div>
                    <div className='w-32 h-6 bg-gray-300 rounded animate-pulse'></div>
                </nav>
                <div className='flex flex-row items-center gap-6 ml-auto '>
                    <div className='w-40 h-6 bg-gray-300 rounded animate-pulse'></div>
                    <div className='w-12 h-12 bg-gray-300 rounded-full animate-pulse'></div>
                </div>
            </header>

            <div className="w-full mt-1 mb-2 border-[2px] border-lightGray/30"></div>

        </div>
    );
}