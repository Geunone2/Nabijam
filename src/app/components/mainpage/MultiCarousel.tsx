"use client";
import React from 'react';
import Carousel from "react-material-ui-carousel";
import {FaArrowCircleLeft, FaArrowCircleRight} from "react-icons/fa";
import {FaCircleArrowRight} from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";


export default function MultiCarousel() {


    const items = [
        {
            id: 1,
            description: " 오늘 하루도 고생했어요. 언제나 힘들면 저희한테 기대주세요.\n 성심성의껏 당신의 대화를 들어줄께요.",
            button: '상담하기',
            path: 'counselors',
        },
        {
            id: 2,
            description: " 마음의 무거운 짐들은 내려놓고\n 세상을 자유롭게 날아봐\n",
            button: '커뮤니티',
            path: 'community',
        },
        {
            id: 3,
            description: " 걱정도 좀 덜 하고, 노력도 좀 덜 하고,\n 후회도 좀 덜 하면 좋겠다.",
            button: '나비story',
            path: 'nabistory',
        },
        {
            id: 4,
            description: " 수고했어,\n 오늘도 \n",
            button: '상담후기',
            path: 'cosultreview',
        },
        {
            id: 5,
            description: " 수없이 많은 별들 중 가장 빛나는 별은\n 바로 너야\n",
            button: '마이페이지',
            path: 'mypage',
        },
    ]

    return (
        <div className='-mt-2'>
            <Carousel
                className='bg-yellow-2 rounded-lg text-white italic h-[60vh] items-center'
                NextIcon={<FaArrowCircleRight/>}
                PrevIcon={<FaArrowCircleLeft/>}
                indicators
                indicatorIconButtonProps={{
                    style: {
                        textAlign: 'left',
                        marginTop: '330px',
                        padding: '5px',
                    }
                }}
                autoPlay
                animation={"slide"}
                duration={500}
            >
                {items.map((e) => (
                    <div key={e.id}>
                        <div>
                            <Link href={`/${e.path}`}
                                  className='mx-36 mt-60 text-2xl rounded-3xl p-1 w-auto flex items-center gap-1'>{e.button}
                                <FaCircleArrowRight className='mx-1'/></Link>
                            <p className='mx-32 text-4xl italic whitespace-pre-wrap'>{e.description}</p>

                        </div>
                        <Image src='/images/carouselImage.svg' alt='CarouselImage' width={500} height={500}
                               className='float-right -mt-72 mx-32'/>

                    </div>
                ))}
            </Carousel>
        </div>);
}
