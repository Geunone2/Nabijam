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
            description: "오늘 밤은 걱정말고 편히 잠들기를",
            button: '상담하기',
            path: 'counselors',
            image: 'Carousel1'
        },
        {
            id: 2,
            description: "마음의 무거운 짐들은 내려놓고 세상을 자유롭게 날아봐",
            button: '커뮤니티',
            path: 'community',
            image: 'Carousel2'
        },
        {
            id: 3,
            description: "걱정도 좀 덜 하고, 노력도 좀 덜하고, 후회도 좀 덜 하면 좋겠다.",
            button: '나비 story',
            path: 'nabistory',
            image: 'Carousel3'
        },
        {
            id: 4,
            description: "수고했어, 오늘도",
            button: '상담 후기',
            path: 'cosultreview',
            image: 'Carousel4'
        },
        {
            id: 5,
            description: "수없이 많은 별들 중 가장 빛나는 별은 바로 너야",
            button: '마이페이지',
            path: 'mypage',
            image: 'Carousel5'
        },
    ]

    return (
        <div>
            <Carousel className='bg-gradient-to-r from-pastel-yellow to-white rounded-lg text-center p-6 font-["Tenada"] h-5/6'
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
                {items.map((e) => (
                    <>
                        <div key={e.id}>
                            <p className='text-4xl justify-center mt-24 italic mx-auto'>"{e.description}"</p>
                            <Link href={`/${e.path}`}
                                  className='text-xl mt-6 rounded-3xl p-1 mx-auto w-36 justify-center flex items-center gap-1'>{e.button}
                                <FaCircleArrowRight className='mb-1'/></Link>
                        </div>
                        <Image className='float-right -my-36 mx-36 items-center flex' src={`/images/${e.image}.svg`} alt={''} width={230} height={280}/>
                    </>
                ))}
            </Carousel>
        </div>);
}
