"use client";
import React from 'react';
import Carousel from "react-material-ui-carousel";
import {FaArrowCircleLeft, FaArrowCircleRight} from "react-icons/fa";
import {FaCircleArrowRight} from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import {useMobile, usePC} from "@/service/MediaQuery"; // 반응형 미디어 쿼리 사용

export default function MultiCarousel() {
    const isMobile = useMobile();

    const items = [
        {
            id: 1,
            description: "수고했어,\n 오늘도",
            button: '상담하기',
            path: 'counselors',
            image: '/images/carouselImage1.svg',
        },
        {
            id: 2,
            description: "오늘 하루도 고생했어요. \n성심성의껏 당신의 대화를 들어줄께요.",
            button: '나비잠 멘토',
            path: 'listeners',
            image: '/images/carouselImage2.svg',
        },
        {
            id: 3,
            description: "마음의 무거운 짐들은 내려놓고\n세상을 자유롭게 날아봐\n",
            button: '커뮤니티',
            path: 'community',
            image: '/images/carouselImage3.svg',
        },
        {
            id: 4,
            description: "걱정도 좀 덜 하고, 노력도 좀 덜 하고,\n후회도 좀 덜 하면 좋겠다.",
            button: '1:1상담',
            path: 'nabistory',
            image: '/images/carouselImage4.svg',
        },
        {
            id: 5,
            description: "수없이 많은 별들 중 가장 빛나는 별은\n바로 너야\n",
            button: '마이페이지',
            path: 'mypage',
            image: '/images/carouselImage5.svg',
        },
    ]

    return (
        <div className='-mt-2'>
            <Carousel
                className='bg-yellow-2 rounded-lg text-white italic items-center '
                NextIcon={<FaArrowCircleRight/>}
                PrevIcon={<FaArrowCircleLeft/>}
                indicators
                indicatorIconButtonProps={{
                    style: {
                        textAlign: 'left',
                        padding: '5px',
                        marginBottom: '4px'
                    }
                }}
                autoPlay
                animation={"slide"}
                duration={500}
            >
                {items.map((e) => (
                    <div key={e.id}
                         className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-between mx-8 mt-8`}>
                        <div className='gap-2 flex flex-col text-center'>
                            <Link href={`/${e.path}`}
                                  className={`rounded-3xl p-1 flex items-center gap-1 justify-center ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
                                {e.button}
                                <FaCircleArrowRight className='mx-1'/>
                            </Link>
                            <p className={`${isMobile ? 'text-4xl' : 'text-6xl'} whitespace-pre-wrap`}>
                                {e.description}
                            </p>
                        </div>
                        <Image src={e.image} alt="Image" width={300} height={300}
                             className={isMobile ? 'h-[300px] w-[300px] object-cover' : 'h-[500px] w-[500px] object-cover'}/>
                    </div>
                ))}
            </Carousel>
        </div>
    );

}
