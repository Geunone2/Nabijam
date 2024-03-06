import Image from "next/image";
import MultiCarousel from "@/app/components/MultiCarousel";
import Review from "@/app/components/Review";
import GiftShopBox from "@/app/components/GiftShopBox";
import React from "react";
import Community from "@/app/components/Community";

export default function Home() {
    return (
        <>  <MultiCarousel/>
            <Community/>
        </>
    );
}
