import Image from "next/image";
import MultiCarousel from "@/app/components/MultiCarousel";
import Review from "@/app/components/Review";
import GiftShopBox from "@/app/components/GiftShopBox";
import React from "react";
import MainCommunity from "@/app/components/MainCommunity";
import MainComfort from "@/app/components/MainComfort";

export default function Home() {
    return (
        <section>
            <MultiCarousel/>
            <MainCommunity/>
            <MainComfort/>
        </section>
    );
}
