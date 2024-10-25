"use client";


import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {FaArrowCircleLeft, FaArrowCircleRight, FaArrowRight} from "react-icons/fa";
import {ListenersListAll, ListenersListProps} from "@/app/components/listeners/ListenersListAll";
import Carousel from "react-material-ui-carousel";
import {MdLocalPhone, MdLocationOn, MdOutlineEmail} from "react-icons/md";
import Image from "next/image";
import ListenerDetail from "@/app/components/listeners/ListenerDetail";
import {useMobile} from "@/service/MediaQuery";

export default function MainListeners() {

    const isMobile = useMobile();

    const [showListenersDetail, setShowListenersDetail] = useState(false);
    const [selectedListener, setSelectedListener] = useState<ListenersListProps | null>(null);
    const [mainListeners, setMainListeners] = useState<ListenersListProps[]>([]);

    const groupMainListeners = (listeners, groupSize) => {
        let groupedListeners = [];
        for (let i = 0; i < listeners.length; i += groupSize) {
            groupedListeners.push(listeners.slice(i, i + groupSize));
        }
        return groupedListeners;
    }

    const groupedMainListeners = groupMainListeners(mainListeners, isMobile ? 1 : 3);

    useEffect(() => {
        const fetchMainListeners = async () => {
            try {
                const data = await ListenersListAll();
                setMainListeners(data);
            } catch (err) {
                console.error('상담사를 불러오는 데 실패했습니다.');
            }
        }
        fetchMainListeners();
    }, []);

    const handleCloseModal = () => {
        setShowListenersDetail(false);
    }

    const handleDetailClick = (listener: ListenersListProps) => {
        setShowListenersDetail(true);
        setSelectedListener(listener);
    }

    return (<section className='mt-10'>

        {showListenersDetail && selectedListener && (
            <div
                onClick={handleCloseModal}
                className='fixed inset-0 bg-black/50 flex flex-col justify-center items-center z-50'>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className='bg-white rounded-xl shadow-lg w-[70%] h-auto '>
                    <ListenerDetail
                        nickname={selectedListener.nickname}
                        categories={selectedListener.categories}
                        profile={selectedListener.profile}
                        career={selectedListener.career}
                        education={selectedListener.education}
                    />
                </div>
            </div>
        )}

        <div className='flex flex-row w-[80%] justify-between mx-auto'>
            <p className={`font-semibold ${isMobile ? 'text-xl' : 'text-2xl'}`}>누구에게 상담 받고 싶나요 ?</p>
            <Link href='/listeners'
                  className={`text-gray-400 flex ${isMobile ? 'text-xl' : 'text-2xl'} items-center gap-1`}>더 많은 상담사
                만나기 <FaArrowRight/></Link>
        </div>

        {/* 상담사 리스트 멀티 캐러셀 */}
        <Carousel
            className={`rounded-lg italic items-center ${isMobile ? ' w-[60%]' : 'w-[80%]'} h-auto mx-auto`}
            NextIcon={<FaArrowCircleRight/>}
            PrevIcon={<FaArrowCircleLeft/>}
            indicators
            indicatorIconButtonProps={{
                style: {
                    padding: '5px',
                }
            }}
            autoPlay
            animation={"slide"}
            duration={500}
        >
            {groupedMainListeners.map((group, index) => (
                <div key={index} className={`flex flex-row justify-around`}>
                    {group.map((listener) => (
                        <div
                            key={listener.id}
                            onClick={() => handleDetailClick(listener)}
                            className={`flex flex-col items-center text-center ${isMobile ? 'w-full' : 'w-[30%]'} gap-5 bg-white border-yellow-2 border-4 rounded-4xl overflow-hidden whitespace-nowrap text-ellipsis`}
                        >
                            <Image
                                src={listener.profile}
                                alt="Listener Image"
                                width={isMobile ? 230 : 480}
                                height={isMobile ? 300 : 400}
                                className={isMobile ? 'w-full h-[300px]' : 'w-full h-[400px]'}
                            />
                            <div className='flex flex-col'>
                                <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-semibold`}>
                                    {listener.nickname} <span className='text-lg font-medium'>상담사</span>
                                </h1>
                                <p className='text-yellow-2 mt-auto font-bold'>
                                    #{listener.categories.join(' #')}
                                </p>
                            </div>
                            <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600 italic overflow-hidden whitespace-nowrap text-ellipsis max-w-full`}>
                                {listener.description}
                            </h2>
                            <p className='flex flex-row items-center gap-0.5'>
                                <MdLocationOn/> {listener.address}
                            </p>
                            <p className='flex flex-row items-center gap-0.5'>
                                <MdLocalPhone/> {listener.contactNumber}
                            </p>
                            <p className='flex flex-row items-center gap-0.5'>
                                <MdOutlineEmail/> {listener.email}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </Carousel>


    </section>);
}