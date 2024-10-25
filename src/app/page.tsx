import React, {Suspense} from "react";
import MainPage from "./components/mainpage/MainPage";
import {Metadata} from "next";



export default function Home() {



    return (
        <section className='flex flex-col'>
                <MainPage/>
        </section>
    );
}
