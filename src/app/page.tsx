import Image from "next/image";
import MultiCarousel from "@/app/components/MultiCarousel";
import Review from "@/app/components/Review";
import GiftShopBox from "@/app/components/GiftShopBox";

export default function Home() {
    return (
        <>
            <MultiCarousel/>
            <Review/>
        </>
    );
}
