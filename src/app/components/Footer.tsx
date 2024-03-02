import React from 'react';
import {IoLogoFacebook, IoLogoGoogle, IoLogoInstagram, IoLogoYoutube} from "react-icons/io";
import {PiButterflyFill} from "react-icons/pi";
import Image from "next/image";

export default function Footer() {
    return (
        <footer>
            <div className="w-full my-[2%] mt-2 border-[2px] border-lightGray/30"></div>
            <div className='text-gray-600 py-2 text-sm font-semibold'>
                <div className='flex justify-center gap-12 text-left'>
                    <div>
                        대표ㅣ박근원, 안진표, 이서윤
                    </div>
                    <div>
                        주소ㅣ대전광역시 유성구 동서대로 125(덕명동, 국립한밭대학교) N5동
                    </div>
                </div>
                <div className='flex justify-center gap-12'>
                    <div>
                        대표번호ㅣ010-3099-4426
                    </div>
                    <div>
                        이메일ㅣrmsdnjsaos@gmail.com
                    </div>
                </div>
            </div>
            <div className='flex items-center text-3xl justify-center gap-40 p-2 font-["Tenada"] my-3'>
                <div className='flex items-center gap-2'>
                    <p className='text-yellow-500 mb-2'><PiButterflyFill/></p>
                    <p>ⓝ 나비잠 주식회사</p>
                </div>
                <div className='flex gap-4'>
                    <IoLogoFacebook/>
                    <IoLogoInstagram/>
                    <IoLogoGoogle/>
                    <IoLogoYoutube/>
                </div>
            </div>
        </footer>);
}