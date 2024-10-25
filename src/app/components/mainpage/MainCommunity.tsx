'use client';
import React, {useEffect, useState} from 'react';
import CommunityListAll, {CommunityListProps} from "@/app/components/community/CommunityListAll";
import {FaArrowCircleLeft, FaArrowCircleRight} from "react-icons/fa";
import Carousel from "react-material-ui-carousel";
import {useRouter} from "next/navigation";
import Image from 'next/image'

export default function MainCommunity() {

    const [mainCommunity, setMainCommunity] = useState<CommunityListProps[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchMainCommunity = async () => {
            try {
                const data = await CommunityListAll();
                setMainCommunity(data);
            } catch (err) {
                console.error('커뮤니티 게시글을 불러오는 데 실패했습니다.')
            }
        }
        fetchMainCommunity();
    }, []);

    const handleDetailClick = (id: string) => {
        router.push(`/community/${id}`);
    }

    return (<section className="mt-12">
        <div className='flex flex-col items-center text-center'>
            <h1 className='font-semibold text-yellow-6 text-7xl mb-4 mt-12'>같이 소통해요</h1>
            <p className='text-2xl'>비슷한 고민을 가진 사람들과 대화를 나눠보세요.</p>
        </div>

        <Carousel
            className={`rounded-lg mt-10 h-auto mx-auto bg-yellow-2 p-8 w-[80%] flex flex-col items-center`}
            NextIcon={<FaArrowCircleRight/>}
            PrevIcon={<FaArrowCircleLeft/>}
            indicators={false}
            autoPlay
            animation={"slide"}
            duration={500}
        >
            {mainCommunity.map((community) => (
                <div key={community.id}
                     onClick={() => handleDetailClick(community.id)}
                >
                    <p className='w-[95%] mx-auto overflow-hidden overflow-ellipsis whitespace-nowrap text-white text-2xl'><span className='text-start'>인기있는 사연 👀 | </span>{community.content}</p>
                </div>
            ))}
        </Carousel>
        <div className='w-[80%] mx-auto mt-8 mb-4'>
            <p className='text-5xl font-medium mb-4'>최근 등록된 글</p>
            <div className='flex flex-row gap-4'>
                {mainCommunity.map((community) => (
                    <div key={community.id}
                         onClick={() => handleDetailClick(community.id)}
                         className='flex flex-col border-4 w-full rounded-3xl border-yellow-2 p-2'
                    >
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-col '>
                                <p className='text-4xl'>제목{community.title}</p>
                                <p className='text-2xl text-yellow-2'>{community.categories.join(', ')}</p>
                            </div>
                            <Image src={community.profile} alt="Profile Image" width={100} height={100}
                                   className="rounded-full w-[30px] h-[30px]"/>
                        </div>
                        <p> 내용 {community.content}</p>
                    </div>
                ))}
            </div>
        </div>

    </section>);
}


/*
*   <section className='mt-12 flex flex-col items-center text-center'>
            <div className="w-[64%] mt-1 mb-10 border-[2px] border-lightGray/30"></div>

            <div className='w-[60%] mt-14'>
                <div className='justify-between flex text-center items-center'>
                    <p className='text-2xl'>전문가의 조언</p>
                    <Link href='counselors' className='text-yellow-2'>전체보기</Link>
                </div>
                <div className='flex gap-6 mt-10'>
                    <div className='shadow-lg rounded-lg border-yellow-6 border-2 h-[30vh] w-full bg-white'>본문 내용</div>
                    <div className='shadow-lg rounded-lg border-yellow-6 border-2 h-[30vh] w-full bg-white'>본문 내용</div>
                    <div className='shadow-lg rounded-lg border-yellow-6 border-2 h-[30vh] w-full bg-white'>본문 내용</div>
                </div>
            </div>
        </section>
        * */