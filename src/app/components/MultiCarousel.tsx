"use client";
import React from 'react';
import Carousel from "react-material-ui-carousel";
import {FaArrowCircleLeft, FaArrowCircleRight} from "react-icons/fa";
import {FaCircleArrowRight} from "react-icons/fa6";
import Link from "next/link";


export default function MultiCarousel() {


    const items = [
        {
            description: "오늘 밤은 걱정말고 편히 잠들기를",
            button: '상담하기',
            path: 'counselors'
        },
        {
            description: "마음의 무거운 짐들은 내려놓고 세상을 자유롭게 날아봐",
            button: '커뮤니티',
            path: 'community'
        },
        {
            description: "걱정도 좀 덜 하고, 노력도 좀 덜하고, 후회도 좀 덜 하면 좋겠다.",
            button: '나비 story',
            path: 'nabistory'
        },
        {
            description: "수고했어, 오늘도",
            button: '상담 후기',
            path: 'consultingreview'
        },
        {
            description: "수없이 많은 별들 중 가장 빛나는 별은 바로 너야",
            button: '마이페이지',
            path: 'mypage'
        },
    ]

    return (
        <div>
            <Carousel className='bg-pastel-apricot rounded-lg  text-center p-6 font-["Tenada"]'
                      NextIcon={<FaArrowCircleRight/>}
                      PrevIcon={<FaArrowCircleLeft/>}
                      indicators
                      indicatorIconButtonProps={{
                          style: {
                              textAlign: 'center',
                              marginTop: '150px',
                              padding: '5px',
                          }
                      }}
                      autoPlay
                      animation={"slide"}
                      duration={500}
            >
                {items.map((element, index) => (
                    <div className='items-center justify-center'>
                        <h1 key={index} className='text-3xl mt-24 italic mx-auto'>"{element.description}"</h1>
                        <Link href={`/${element.path}`}
                              className='text-xl mt-6 rounded-3xl p-1 mx-auto w-36 justify-center flex items-center gap-1'>{element.button}
                            <FaCircleArrowRight className='mb-1'/></Link>
                    </div>
                ))}
            </Carousel>
        </div>);
}
