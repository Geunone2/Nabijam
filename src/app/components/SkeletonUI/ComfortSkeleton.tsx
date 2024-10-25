import React from 'react';

export default function ComfortSkeleton() {
    return (
        <>
            <div className='border min-h-96 w-[80%] mx-auto bg-gray-300 rounded animate-pulse p-4 mt-20'></div>
            <div className='flex flex-col min-h-80 w-[80%] mx-auto mt-8'>
                <div className="w-[10%] border-[2px] border-gray-300"></div>
                <div className="mt-4 w-40 h-8 border animate-pulse bg-gray-300 "></div>
                <div className='mt-4 rounded mx-auto w-full h-60 bg-gray-300 animate-pulse border p-4'></div>
            </div>

        </>
    );
}