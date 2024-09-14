import React from 'react';
import Header from "@/app/components/mainpage/Header";
import MultiCarousel from "@/app/components/mainpage/MultiCarousel";
import MainMenu from "@/app/components/mainpage/MainMenu";
import MainComfort from "@/app/components/mainpage/MainComfort";
import MainCounselors from "@/app/components/mainpage/MainCounselors";
import MainCommunity from "@/app/components/mainpage/MainCommunity";
import Footer from "@/app/components/mainpage/Footer";

export default function MainPage() {
    return (<div>
        <MultiCarousel/>
        <MainMenu/>
        <MainComfort/>
        <MainCounselors/>
        <MainCommunity/>
    </div>);
}