'use client';
import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { MdCheckCircleOutline } from 'react-icons/md';
import useInput from '@/service/useInput';
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";

export default function LoginPage() {

    const email = useInput('');
    const password = useInput('');
    const router = useRouter();

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
            const { accessToken, nickname, role } = data.data;

            // 쿠키 설정
            document.cookie = `accessToken=${accessToken}; path=/; max-age=${30 * 24 * 60 * 60}`;
            document.cookie = `nickname=${nickname}; path=/; max-age=${30 * 24 * 60 * 60}`;
            document.cookie = `Role=${role}; path=/; max-age=${30 * 24 * 60 * 60}`;

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
                <Link href='/'>
                    <Image src='/images/TextLogo4.svg' alt="icon" width={400} height={400} priority />
                </Link>
                <form onSubmit={handleSubmit} className='border rounded-xl -mt-20 border-yellow-2 bg-white h-[50vh] w-[45%]'>
                    <div className='flex flex-col mt-24'>
                        <div>
                            <input
                                className='block border border-gray-500 w-[80%] mx-auto p-3 rounded-t-2xl placeholder:text-sm hover:border-yellow-2'
                                type="text"
                                id="email"
                                name="email"
                                {...email}
                                placeholder="아이디" />
                            <input
                                className='block border border-gray-500 w-[80%] mx-auto p-3 rounded-b-2xl placeholder:text-sm hover:border-yellow-2'
                                type="password"
                                id="password"
                                name="password"
                                {...password}
                                placeholder="비밀번호" />
                        </div>

                        <div className='mx-auto items-center text-gray-400 flex w-[80%] mt-2'>
                            <MdCheckCircleOutline className='mx-1 text-xl' />
                            <p>로그인 상태 유지</p>
                        </div>

                        <button
                            className='w-[80%] mx-auto bg-yellow-2 text-white text-2xl font-semibold rounded-lg h-16 mt-20'
                            type="submit">로그인
                        </button>
                        <div className='mt-2 mx-auto text-center items-center flex gap-4'>
                            <Link href='/findpassword' className='text-gray-400 text-nowrap'>비밀번호 찾기</Link>
                            <Link href='/findid' className='text-gray-400 text-nowrap'>아이디 찾기</Link>
                            <Link href='/auth/signup' className='text-gray-400 text-nowrap'>회원가입 </Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
