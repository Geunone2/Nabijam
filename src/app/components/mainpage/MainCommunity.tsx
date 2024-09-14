import Link from 'next/link';
import React from 'react';

export default function MainCommunity() {
    return (
        <section className='mt-60 h-[85vh] bg-orange-100 flex flex-col items-center text-center'>
            <div>
                <h1 className='font-[Tenada] text-5xl mb-4 mt-12'>같이 소통해요</h1>
                <p className='text-lg'>비슷한 고민을 가진 사람들과 대화를 나눠보세요.</p>
            </div>
            <div className='bg-yellow-2 p-8 w-[60%]'>
                <p className='overflow-hidden overflow-ellipsis whitespace-nowrap text-white text-xl'>인기있는 사연 👀 | 취업을 하고
                    싶은데 제가 가지고 있는 능력이 너무 부족한 것 같아요. 앞으로 제가 어떻게 해야 될까요 ? 너무 막막해서 힘들어요</p>
            </div>
            <div className='w-[60%] mt-14'>
                <div className='justify-between flex text-center items-center'>
                    <p className='text-2xl'>전문가의 조언</p>
                    <Link href='counselors' className='text-yellow-2'>전체보기</Link>
                </div>
                <div className='flex gap-6 mt-10'>
                    <div className='shadow-lg rounded-lg h-[30vh] w-full bg-white'>본문 내용</div>
                    <div className='shadow-lg rounded-lg h-[30vh] w-full bg-white'>본문 내용</div>
                    <div className='shadow-lg rounded-lg h-[30vh] w-full bg-white'>본문 내용</div>
                </div>
            </div>
        </section>
    );
}

/*
*    <section className='w-full h-auto justify-center '>
            <div className='flex rounded-3xl m-4 mx-auto flex-col bg-white w-[98%] h-auto'>
                <div className='mx-10 justify-between flex items-center'>
                    <Link href='/community'
                          className='items-center flex text-5xl mt-20 text-yellow-3 font-["Tenada"]'><FaUsers
                        className='-my-3 m-2 mb-0.5'/> 커뮤니티</Link>
                    <Link href='/community'
                          className='-mx-6 mt-16 text-2xl text-gray-500 font-[Tenada] flex hover:scale-105 hover:text-black'>더보기 <IoIosArrowForward/>
                    </Link>
                </div>
                <div className='flex flex-row m-4'>
                    <div className='border-2 rounded-lg shadow-2xl m-2 w-full relative'>
                        <h1 className='p-4 mt-4 text-4xl font-semibold font-[Tenada]'>
                            일 할 자신이 없어요.
                        </h1>
                        <div className='mx-4 mt-4 flex flex-col'>
                            <p className='text-2xl'>
                                본문
                                내용<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            </p>
                            <p className='p-4 text-3xl font-bold bottom-0 left-0 absolute'>박근투</p>
                        </div>
                        <div className='right-0 bottom-0 absolute text-3xl p-4'>
                            <FaRegHeart/>
                        </div>
                    </div>
                    <div className='border-2 rounded-lg shadow-2xl m-2 w-full relative'>
                        <h1 className='p-4 mt-4 text-4xl font-semibold font-[Tenada]'>
                            제가 취업할 수 있을까요 ?
                        </h1>
                        <div className='mx-4 mt-4 flex flex-col'>
                            <p className='text-2xl'>
                                본문
                                내용<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            </p>
                            <p className='p-4 text-3xl font-bold bottom-0 left-0 absolute'>이서윤</p>
                        </div>
                        <div className='right-0 bottom-0 absolute text-3xl p-4'>
                            <FaRegHeart/>
                        </div>
                    </div>
                    <div className='border-2 rounded-lg shadow-2xl m-2 w-full relative'>
                        <h1 className='p-4 mt-4 text-4xl font-semibold font-[Tenada]'>
                            억지로 살아가는 기분이에요.
                        </h1>
                        <div className='mx-4 mt-4 flex flex-col'>
                            <p className='text-2xl'>
                                본문
                                내용<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            </p>
                            <p className='p-4 text-3xl font-bold bottom-0 left-0 absolute'>박근원</p>
                        </div>
                        <div className='right-0 bottom-0 absolute text-3xl p-4'>
                            <FaRegHeart/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
*/