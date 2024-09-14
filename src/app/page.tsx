import React, {Suspense} from "react";
import MainPage from "./components/mainpage/MainPage";

export default function Home() {

    return (
        <section className='flex flex-col'>
                <MainPage/>
        </section>
    );
}
