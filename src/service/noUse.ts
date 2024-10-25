/*
<div className='flex flex-col h-[30%] w-[80%] mx-auto mt-8'>
                <div className="w-[10%] border-[2px] border-yellow-2"></div>
                <h1 className='font-[Tenada] text-start mt-4 text-2xl'>전문가의 답변</h1>
                <div>
                    {comfort.consoles.length > 0 ? (
                        comfort.consoles.map(console => (
                            <div
                                className='relative mt-4 rounded-lg mx-auto w-full h-[250px] text-start border-yellow-2 border-2 p-4'>
                                <div key={console.id} className='mb-4'>

                                    <div className='flex flex-row justify-between items-center mt-2 mx-2'>
                                        <div className='flex flex-row gap-1'>
                                            <p className='text-xl'>{console.nickname} <span
                                                className='text-sm'>상담사</span>
                                            </p>
                                            <Image src={console.profile} alt="Profile" width={30} height={30}
                                                   className="rounded-full object-cover w-[30px] h-[30px] "/>
                                        </div>
                                        <p>{console.timestamp}</p>
                                    </div>

                                    <div className="mx-auto w-full border-[1px] border-lightGray/30 mt-2 mb-2"></div>

                                    <div className='mx-1 mt-4 whitespace-pre-wrap text-xl' style={{ lineHeight: '1.8' }}>{console.content}</div>
                                </div>
                                <div className='absolute bottom-2 left-2 text-xl mx-2 flex flex-row gap-6'>
                                    <FaRegComment/>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div
                            className='relative mt-4 rounded-lg mx-auto w-full h-[250px] text-start border-yellow-2 border-2 p-4'>
                            <p className='text-4xl items-center text-center mt-20 text-gray-500'>아직 등록된 답변이 없습니다.</p>
                        </div>
                    )}

                </div>
            </div>
    */