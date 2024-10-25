'use client';
import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import {MdCheckCircleOutline} from 'react-icons/md';
import useInput from '@/service/useInput';
import {useRouter} from 'next/navigation';
import Swal from "sweetalert2";
import {useMobile, usePC} from "@/service/MediaQuery";

export default function LoginPage() {
    const isMobile = useMobile();
    const isPC = usePC();

    const email = useInput('');
    const password = useInput('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email: email.value,
            password: password.value
        };

        const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        });

        const data = await res.json();

        if (res.ok) {
            const {accessToken, nickname, role, profile} = data.data;

            // 쿠키 설정
            document.cookie = `accessToken=${accessToken}; path=/; max-age=${30 * 24 * 60 * 60}`;
            document.cookie = `nickname=${nickname}; path=/; max-age=${30 * 24 * 60 * 60}`;
            document.cookie = `Role=${role}; path=/; max-age=${30 * 24 * 60 * 60}`;
            document.cookie = `Profile=${profile}; path=/; max-age=${30 * 24 * 60 * 60}\`;`

            // SweetAlert2로 성공 메시지 표시 후 리다이렉트
            Swal.fire({
                icon: 'success',
                title: '로그인 성공!',
                text: '로그인되었습니다.',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                window.location.replace('/');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: '로그인 실패!',
                text: '다시 로그인해주세요.',
                confirmButtonColor: "#FAAC01"
            });
        }
    };

    return (
        <section>
            <div className='flex flex-col items-center text-center'>
                {isPC && (<Link href='/'>
                    <Image src='/images/TextLogo.png' alt="icon" width={350} height={350} priority/>
                </Link>)}

                <form onSubmit={handleSubmit}
                      className={`border rounded-xl border-yellow-2 bg-white ${isMobile ? 'w-full mt-28 mb-20' : 'w-[70%] mt-12 mb-20'} `}>
                    <div className='flex flex-col mt-24'>
                        <div>
                            <input
                                className='block border border-gray-500 w-[80%] mx-auto p-6 rounded-t-2xl text-2xl placeholder:text-2xl hover:border-yellow-2'
                                type="text"
                                id="email"
                                name="email"
                                {...email}
                                placeholder="아이디"/>
                            <input
                                className='block border border-gray-500 w-[80%] mx-auto p-6 rounded-b-2xl text-2xl placeholder:text-2xl hover:border-yellow-2'
                                type="password"
                                id="password"
                                name="password"
                                {...password}
                                placeholder="비밀번호"/>
                        </div>

                        <div className='mx-auto items-center text-gray-400 flex w-[80%] mt-2'>
                            <MdCheckCircleOutline className='mx-1 text-3xl'/>
                            <p className='text-2xl'>로그인 상태 유지</p>
                        </div>

                        <button
                            className='w-[80%] mx-auto bg-yellow-2 text-white text-5xl font-semibold rounded-lg h-24 mt-20'
                            type="submit">로그인
                        </button>
                        <div className='mt-4 text-xl justify-center w-[80%] mx-auto flex gap-8 mb-10'>
                            <Link href='/findpassword' className='text-gray-400 text-nowrap w-40'>비밀번호 찾기</Link>
                            <Link href='/findid' className='text-gray-400 text-nowrap w-40'>아이디 찾기</Link>
                            <Link href='/auth/signup' className='text-gray-400 text-nowrap w-40'>회원가입 </Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
