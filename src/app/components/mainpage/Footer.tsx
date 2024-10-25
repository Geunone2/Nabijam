import React from 'react';
import {IoLogoFacebook, IoLogoGoogle, IoLogoInstagram, IoLogoYoutube} from "react-icons/io";
import {useMobile} from "@/service/MediaQuery";

export default function Footer() {

    const isMobile = useMobile();

    return (
        <footer className='text-white bg-footer items-center text-center p-6 mt-auto'> {/* mt-auto 추가 */}
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-center gap-20`}>
                <div className={`mt-20 ${isMobile ? 'text-xl' : 'text-2xl'} font-semibold flex`}>
                    <div className={`mx-auto flex flex-col text-left gap-6 ${isMobile ? 'text-center' : 'mb-20 '}`}>
                        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'}`}>Copyright ⓝ 나비잠 주식회사</h1>
                        <p>대표ㅣ박근원, 이서윤</p>
                        <p>주소ㅣ대전광역시 유성구 동서대로 125(덕명동, 국립한밭대학교) N5동</p>
                        <p>대표번호ㅣ010-3099-4426 이메일ㅣrmsdnjsaos@gmail.com</p>
                    </div>
                </div>
                <div className={`flex ${isMobile ? 'justify-center' : 'items-center'} text-6xl p-2`}>
                    <div className='flex gap-4'>
                        <IoLogoFacebook/>
                        <IoLogoInstagram/>
                        <IoLogoGoogle/>
                        <IoLogoYoutube/>
                    </div>
                </div>
            </div>
        </footer>
    );
}
