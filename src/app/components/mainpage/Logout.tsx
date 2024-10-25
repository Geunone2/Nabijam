import React from 'react';
import {deleteCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import Swal from "sweetalert2";

export default function Logout() {

    const router = useRouter();
    const handleClick = () => {

        deleteCookie('accessToken');
        deleteCookie('nickname');
        deleteCookie('Role');
        deleteCookie('Profile');

        Swal.fire({
            icon: 'success', title: '로그아웃 성공', text: '로그아웃되었습니다.', timer: 2000, willClose(popup: HTMLElement) {
                window.location.replace("/");
            }
        });


    }


    return (
        <button className='font-[Tenada] text-2xl hover:text-yellow-6' onClick={handleClick}>로그아웃</button>
    )
}