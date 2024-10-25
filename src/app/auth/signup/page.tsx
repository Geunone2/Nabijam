'use client'

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import AuthCheckNickName from '@/app/components/authcheck/AuthCheckNickName';
import AuthCheckEmail from '@/app/components/authcheck/AuthCheckEmail';
import Swal from 'sweetalert2';
import ImageRegister from '@/app/components/Register/ImageRegister';
import useInput from '@/service/useInput';
import {useMobile} from "@/service/MediaQuery";

export default function SignUpPage() {

    const isMobile = useMobile();
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

    const handleImageUpload = (data: string) => {
        setProfileURL(data);
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
            profile: profileURL || `/images/Profile.jpeg`,
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
            <form onSubmit={handleSubmit}>
                <div className={`flex flex-col h-full mt-10 text-nowrap ${isMobile ? 'w-full' : 'w-[60%]'}  mx-auto`}>
                    <div className='px-6 py-8 rounded border-yellow-6 border-2 shadow-xl text-black w-full'>
                        <h2 className='font-semibold text-7xl text-center mb-4'>회원가입</h2>
                        <div className='flex flex-col'>
                            <div className="w-full mt-1 border-[1px] border-lightGray/30"></div>
                            <p className='text-2xl mt-1 self-end'><span className='text-red-500'>*</span> 은 필수 항목입니다.
                            </p>
                        </div>
                        <div className='gap-16 flex flex-col'>
                            {/* 프로필 이미지 업로드 */}
                            <div className='flex flex-col items-center gap-2'>
                                <div className='flex'>
                                    <ImageRegister ImageUrl={handleImageUpload}/>
                                </div>
                                <label htmlFor='profileImage' className='text-4xl text-center font-semibold w-fit'>프로필
                                    설정</label>
                            </div>

                            {/*아이디(이메일)*/}

                            <div className='flex flex-col gap-12 w-full'>
                                <div className='flex items-center'>
                                    <label htmlFor='email'
                                           className={` ${isMobile ? 'text-2xl' : 'text-3xl'}  font-semibold w-40 text-wrap`}>아이디<br/>(이메일)<span
                                        className='text-red-500'>*</span></label>

                                    <div className='w-full'>
                                        <div className='flex items-center gap-1'>
                                            <input
                                                className={`block border border-yellow-6 p-5 w-full rounded ${isMobile ? ' placeholder:text-lg':' placeholder:text-xl'}`}
                                                pattern='^[^\s@]{1,50}@[^\s@]{1,50}\S*$'
                                                title='잘못된 아이디(이메일) 형식입니다. 다시 입력해주세요.'
                                                type="text"
                                                {...email}
                                                placeholder="아이디를 입력해주세요"/><br/>

                                            <button
                                                type="button"
                                                onClick={handleCheckEmail}
                                                className='border p-4 text-2xl rounded border-yellow-6'>
                                                중복 확인
                                            </button>
                                        </div>
                                        <span
                                            className={`${emailValid === false ? 'text-red-500 text-2xl' : 'text-green-500 text-2xl'}`}>{emailMessage}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 닉네임 입력란 */}
                            <div className='flex items-center'>
                                <label htmlFor='userName'
                                       className={` ${isMobile ? 'text-2xl' : 'text-3xl'}  font-semibold w-40 text-wrap`}>닉네임<span
                                    className='text-red-500'>*</span></label>

                                <div className='w-full'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            id="userName"
                                            className={`block border border-yellow-6 p-5 w-full rounded ${isMobile ? ' placeholder:text-lg':' placeholder:text-xl'}`}
                                            type="text"
                                            pattern='^[a-zA-Z가-힣]{2,8}$'
                                            {...nickname}
                                            title='닉네임을 2~8글자로 입력해주세요.'
                                            placeholder="닉네임을 입력해주세요"/>
                                        <button
                                            type="button"
                                            onClick={handleCheckNickname}
                                            className='border p-4 text-2xl rounded border-yellow-6'>
                                            중복 확인
                                        </button>
                                    </div>
                                    <span
                                        className={` ${nicknameValid === false ? 'text-red-500 text-2xl' : 'text-green-500 text-2xl'}`}>{nicknameMessage}</span>
                                </div>
                            </div>
                            {/* 비밀번호 입력란 */}
                            <div className='flex items-center'>
                                <label htmlFor='password'
                                       className={` ${isMobile ? 'text-2xl' : 'text-3xl'}  font-semibold w-40 text-wrap`}>비밀번호<span
                                    className='text-red-500'>*</span></label>

                                <input
                                    id="password"
                                    className={`block border border-yellow-6 p-5 w-full rounded ${isMobile ? ' placeholder:text-lg':' placeholder:text-xl'}`}
                                    type="password"
                                    pattern='^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,14}$'
                                    title='잘못된 비밀번호 형식입니다. 다시 입력해주세요.'
                                    {...password}
                                    placeholder="비밀번호를 입력해주세요(영여/숫자/특수문자 1개씩 필수 입력)"/><br/>
                            </div>
                            {/* 비밀번호 확인 입력란 */}
                            <div className='flex items-center'>
                                <label htmlFor='checkPassword'
                                       className={` ${isMobile ? 'text-2xl' : 'text-3xl'}  font-semibold w-40 text-wrap`}>비밀번호<br/>재확인<span
                                    className='text-red-500'>*</span></label>
                                <input
                                    id="checkPassword"
                                    className={`block border border-yellow-6 p-5 w-full rounded ${isMobile ? ' placeholder:text-lg':' placeholder:text-xl'}`}
                                    type="password"
                                    {...checkPassword}
                                    placeholder="비밀번호를 다시 입력해주세요"/>
                            </div>
                        </div>
                        <button
                            className='w-full mt-12 bg-yellow-400 text-center h-24 rounded text-black text-5xl font-[Tenada] hover:scale-105 hover:bg-yellow-500  items-center'
                            type="submit">가입하기
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
