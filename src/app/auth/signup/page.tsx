'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthCheckNickName from '@/app/components/authcheck/AuthCheckNickName';
import AuthCheckEmail from '@/app/components/authcheck/AuthCheckEmail';
import Swal from 'sweetalert2';
import ImageRegister from '@/app/components/Register/ImageRegister';
import useInput from '@/service/useInput';
import Image from 'next/image'

export default function SignUpPage() {
    const email = useInput('');
    const nickname = useInput('');
    const password = useInput('');
    const checkPassword = useInput('');
    const router = useRouter();

    const [nicknameValid, setNickNameValid] = useState<boolean | null>(null);
    const [nicknameMessage, setNicknameMessage] = useState<string>('');

    const [emailValid, setEmailValid] = useState<boolean | null>(null);
    const [emailMessage, setEmailMessage] = useState<string>('');

    const [profileURL, setProfileURL] = useState<string>('');

    const handleImageUpload = (url: string) => {
        setProfileURL(url);
    };

    const handleCheckNickname = async () => {
        if (nickname.value.length > 0) {
            try {
                const result = await AuthCheckNickName(nickname.value);
                if (result) {
                    if (result.result) {
                        setNickNameValid(false);
                        setNicknameMessage('이미 사용 중인 닉네임입니다.');
                    } else {
                        setNickNameValid(true);
                        setNicknameMessage('사용 가능한 닉네임입니다.');
                    }
                } else {
                    alert("서버에서 오류가 발생했습니다.");
                }
            } catch (error) {
                console.error("닉네임 중복 체크 중 오류 발생:", error);
                alert("닉네임 중복 체크 중 오류가 발생했습니다.");
            }
        }
    };

    const handleCheckEmail = async () => {
        if (email.value.length > 0) {
            try {
                const result = await AuthCheckEmail(email.value);
                if (result) {
                    if (result.result) {
                        setEmailValid(false);
                        setEmailMessage('이미 사용 중인 이메일입니다.');
                    } else {
                        setEmailValid(true);
                        setEmailMessage('사용 가능한 이메일입니다.');
                    }
                } else {
                    alert("서버에서 오류가 발생했습니다.");
                }
            } catch (error) {
                console.error("이메일 중복 체크 중 오류 발생:", error);
                alert("이메일 중복 체크 중 오류가 발생했습니다.");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            email: email.value,
            nickname: nickname.value,
            password: password.value,
            checkPassword: checkPassword.value,
            profile: profileURL // 프로필 이미지 URL 추가
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/auth/members`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (res.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: '회원가입 성공',
                    text: '회원가입되었습니다.',
                    timer: 2000,
                    willClose: () => {
                        router.push('/auth/login');
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '회원가입 실패',
                    text: '다시 확인해주세요.',
                    confirmButtonColor: '#FAAC01'
                });
            }
        } catch (error) {
            console.error("회원가입 중 오류 발생:", error);
            Swal.fire({
                icon: 'error',
                title: '회원가입 실패',
                text: '다시 확인해주세요.'
            });
        }
    };

    return (
        <>
            <Link href='/'>
                <Image src='/images/TextLogo4.svg' alt="icon" className='mx-auto -mb-32 -mt-8' width={400} height={400} priority/>
            </Link>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col h-full mt-10 text-nowrap w-[60%] mx-auto'>
                    <div className='px-6 py-8 rounded border-yellow-6 border-2 shadow-xl text-black w-full'>
                        <h2 className='font-semibold text-4xl text-center mb-4'>회원가입</h2>
                        <div className="w-full mt-1 mb-12 border-[1px] border-lightGray/30"></div>
                        <div className='gap-16 flex flex-col'>
                            {/* 프로필 이미지 업로드 */}
                            <div className='flex flex-col items-center gap-2'>
                                <div className='flex'>
                                    <ImageRegister />
                                </div>
                                <label htmlFor='profileImage' className='text-ms text-center font-semibold w-32'>프로필 설정</label>
                            </div>
                            {/* 이메일 입력란 */}
                            <div className='flex items-center gap-2 -mb-6 -mt-4'>
                                <label htmlFor='email' className='text-ms font-semibold w-32 text-wrap -mt-6'>아이디(이메일)<span className='text-red-500'>*</span></label>
                                <div className='w-full mx-2'>
                                    <div className='flex items-center gap-1'>
                                        <input
                                            className='block border border-yellow-6 w-[84%] p-3 rounded placeholder:text-sm'
                                            pattern='^[^\s@]{1,50}@[^\s@]{1,50}\S*$'
                                            title='잘못된 아이디(이메일) 형식입니다. 다시 입력해주세요.'
                                            type="text"
                                            {...email}
                                            placeholder="아이디를 입력해주세요"
                                        /><br/>
                                        <button
                                            type="button"
                                            onClick={handleCheckEmail}
                                            className='border p-3 rounded border-yellow-6'>
                                            중복 확인
                                        </button>
                                    </div>
                                    <span className={`mt-2 ml-2 ${emailValid === false ? 'text-red-500' : 'text-green-500'}`}>{emailMessage}</span>
                                </div>
                            </div>
                            {/* 닉네임 입력란 */}
                            <div className='flex items-center gap-2 -mb-6'>
                                <label htmlFor='userName' className='text-ms font-semibold w-32 -mt-6'>닉네임<span className='text-red-500'>*</span></label>
                                <div className='w-full mx-2'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            id="userName"
                                            className='block border border-yellow-6 w-[84%] p-3 rounded placeholder:text-sm'
                                            type="text"
                                            pattern='^[a-zA-Z가-힣]{2,8}$'
                                            {...nickname}
                                            title='닉네임을 2~8글자로 입력해주세요.'
                                            placeholder="닉네임을 입력해주세요"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleCheckNickname}
                                            className='border p-3 rounded border-yellow-6'>
                                            중복 확인
                                        </button>
                                    </div>
                                    <span className={`mt-2 ml-2 ${nicknameValid === false ? 'text-red-500' : 'text-green-500'}`}>{nicknameMessage}</span>
                                </div>
                            </div>
                            {/* 비밀번호 입력란 */}
                            <div className='flex items-center'>
                                <label htmlFor='password' className='text-ms font-semibold w-32'>비밀번호<span className='text-red-500'>*</span></label>
                                <input
                                    id="password"
                                    className='block border border-yellow-6 w-[82%] p-3 rounded placeholder:text-sm'
                                    type="password"
                                    pattern='^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,14}$'
                                    title='잘못된 비밀번호 형식입니다. 다시 입력해주세요.'
                                    {...password}
                                    placeholder="비밀번호를 입력해주세요(영어/숫자/특수문자 1개씩 필수 입력)"
                                /><br/>
                            </div>
                            {/* 비밀번호 확인 입력란 */}
                            <div className='flex items-center'>
                                <label htmlFor='checkPassword' className='text-ms font-semibold w-32 text-wrap'>비밀번호 재확인<span className='text-red-500'>*</span></label>
                                <div className='flex flex-col text-wrap w-[82%]'>
                                    <input
                                        id="checkPassword"
                                        className='block border border-yellow-6 w-full p-3 rounded placeholder:text-sm'
                                        type="password"
                                        {...checkPassword}
                                        placeholder="비밀번호를 다시 입력해주세요"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            className='w-full mt-12 bg-yellow-400 text-center py-3 rounded text-black text-2xl font-[Tenada] hover:scale-105 hover:bg-yellow-500 my-1'
                            type="submit">가입하기
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
