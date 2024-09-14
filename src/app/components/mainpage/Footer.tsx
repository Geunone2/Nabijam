import React from 'react';
import {IoLogoFacebook, IoLogoGoogle, IoLogoInstagram, IoLogoYoutube} from "react-icons/io";
import {PiButterflyFill} from "react-icons/pi";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className='text-white bg-footer mt-20 items-center text-center'>
            <div className='mx-auto flex justify-center gap-20'>

                <div className='mt-20 text-sm font-semibold flex'>
                    <div className='flex flex-col text-left gap-2'>
                        <h1 className='text-xl'>Copyrightⓝ 나비잠 주식회사</h1>
                        <p> 대표ㅣ박근원, 이서윤</p>
                        <p>주소ㅣ대전광역시 유성구 동서대로 125(덕명동, 국립한밭대학교) N5동</p>
                        <p>
                            대표번호ㅣ010-3099-4426 이메일ㅣrmsdnjsaos@gmail.com
                        </p>
                    </div>
                </div>
                <div className=' mt-20 flex items-center text-4xl p-2'>
                    <div className='flex gap-4'>
                        <IoLogoFacebook/>
                        <IoLogoInstagram/>
                        <IoLogoGoogle/>
                        <IoLogoYoutube/>
                    </div>
                </div>
            </div>
        </footer>);
}