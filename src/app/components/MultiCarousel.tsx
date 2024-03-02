'use client';

import React from 'react';
import Carousel from "react-material-ui-carousel";
import {FaArrowCircleLeft, FaArrowCircleRight} from "react-icons/fa";

export default function MultiCarousel() {
    const items = [
        {
            description: "오늘 밤은 걱정말고 편히 잠들기를"
        },
        {
            description: "마음의 무거운 짐들은 내려놓고 세상을 자유롭게 날아봐"
        },
        {
            description: "걱정도 좀 덜 하고, 노력도 좀 덜하고, 후회도 좀 덜 하면 좋겠다."
        },
        {
            description: "수고했어, 오늘도"
        },
        {
            description: "수없이 많은 별들 중 가장 빛나는 별은 바로 너야"
        },
    ]

    return (
        <>
            <Carousel className='rounded-lg bg-emerald-500 text-center p-6 font-["Tenada"]'
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
                    <h1 key={index} className='text-3xl mt-24 italic mx-auto'>"{element.description}"</h1>))}
            </Carousel>
        </>)
        ;
}