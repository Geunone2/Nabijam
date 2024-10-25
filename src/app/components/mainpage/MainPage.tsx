'use client'

import React from 'react';
import MultiCarousel from "@/app/components/mainpage/MultiCarousel";
import MainComfort from "@/app/components/mainpage/MainComfort";
import MainListeners from "@/app/components/mainpage/MainListeners";
import MainCommunity from "@/app/components/mainpage/MainCommunity";
import MainSideBar from "@/app/components/mainpage/MainSideBar";
import { usePC} from "@/service/MediaQuery";


export default function MainPage() {
    const isPC = usePC();
    return (<>
        <MultiCarousel/>
        {isPC ? (<MainSideBar/>) : (<></>)}
        <MainComfort/>
        <MainListeners/>
        <MainCommunity/>
    </>);
}