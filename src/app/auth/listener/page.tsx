'use client';

import useInput from '@/service/useInput';
import React, {useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {useRouter} from 'next/navigation'
import ListenerRegisterCategory from '@/app/components/Register/ListenerRegisterCategory';
import ListenerRegisterCareer from "@/app/components/Register/ListenerRegisterCareer";
import AuthCheckNickName from "@/app/components/authcheck/AuthCheckNickName";
import AuthCheckEmail from "@/app/components/authcheck/AuthCheckEmail";
import Swal from "sweetalert2";

export default function SignUpPage() {

    const email = useInput('')
    const nickname = useInput('')
    const password = useInput('')
    const checkPassword = useInput('');
    const phoneNumber = useInput('');
    const address = useInput('');
    const [careerField, setCareerField] = useState<string[]>([]);
    const description = useInput('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [nicknameValid, setNickNameValid] = useState<boolean | null>(null);
    const [nicknameMessage, setNicknameMessage] = useState<string>('');
    const [emailValid, setEmailValid] = useState<boolean | null>(null);
    const [emailMessage, setEmailMessage] = useState<string>('');

    const router = useRouter();

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
                console.error("닉네임 중복 체크 중 오류 발생:", error);
                alert("닉네임 중복 체크 중 오류가 발생했습니다.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email: email.value,
            nickname: nickname.value,
            password: password.value,
            checkPassword: checkPassword.value,
            phoneNumber: phoneNumber.value,
            profile: "https://chat.openai.com/c/aeb3d4a6-85bf-4a0a-9b24-b80da062c9e2",
            address: address.value,
            career: careerField,
            description: description.value,
            category: selectedCategories,
        };

        const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/auth/listeners`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(formData),
        })

        if (res.status === 201) {
            Swal.fire({icon: 'success', title: '회원가입 성공', text: '회원가입되었습니다.', timer: 2000}).then(() => {
                router.replace('/auth/login');
            });
        } else {
            Swal.fire({icon: 'error', title: '회원가입 실패', text: '다시 확인해주세요.'});
        }
    }

    return (
        <>
            <Link href='/'>
                <Image src='/images/TextLogo4.svg' alt="icon" className='mx-auto -mb-32 -mt-8' width={400} height={400}
                       priority/>
            </Link>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col h-full mt-10 text-nowrap w-[45%] mx-auto'>
                    <div className='px-6 py-8 rounded border-yellow-6 border-2 shadow-xl text-black w-full'>
                        <h2 className='font-semibold w-full mx-auto text-3xl text-center mb-4'><span
                            className='text-yellow-6'>상담사</span> 회원가입</h2>

                        <div className='flex flex-col'>

                            <div className="w-full mt-1 mb-16 border-[1px] border-lightGray/30"></div>
                        </div>
                        <div className='gap-8 flex flex-col'>

                            {/* 프로필 설정 */}
                            <div className='flex flex-col text-center items-center gap-2 -mt-12'>
                                이미지 들어갈곳
                                <p className='text-ms font-semibold'>프로필 설정</p>
                            </div>

                            {/* 아이디(이메일) */}
                            <div className='flex items-center gap-2 -mb-6 mx-2'>
                                <label htmlFor='email'
                                       className='text-ms font-semibold w-32 text-wrap -mt-6'>아이디(이메일)<span
                                    className='text-red-500'>*</span></label>
                                <div className='w-full'>
                                    <div className='flex items-center gap-1'>
                                        <input
                                            className='block border border-yellow-6 w-[82%] p-3 rounded placeholder:text-sm'
                                            pattern='^[^\s@]{1,50}@[^\s@]{1,50}\S*$'
                                            title='잘못된 아이디(이메일) 형식입니다. 다시 입력해주세요.'
                                            type="text"
                                            {...email}
                                            placeholder="아이디를 입력해주세요"/><br/>

                                        <button
                                            type="button"
                                            onClick={handleCheckEmail}
                                            className='border p-3 rounded border-yellow-6'>
                                            중복 확인
                                        </button>
                                    </div>
                                    <span
                                        className={`mt-2 ml-2 ${emailValid === false ? 'text-red-500' : 'text-green-500'}`}>{emailMessage}</span>
                                </div>
                            </div>

                            {/* 비밀번호 */}
                            <div className='flex items-center'>
                                <label htmlFor='password'
                                       className='text-ms font-semibold w-32 text-wrap'>비밀번호<span
                                    className='text-red-500'>*</span></label>
                                <input
                                    id="password"
                                    className='-mx-1 block border border-yellow-6 w-[80%] p-3 rounded placeholder:text-sm'
                                    type="password"
                                    pattern='^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,14}$'
                                    title='잘못된 비밀번호 형식입니다. 다시 입력해주세요.'
                                    {...password}
                                    placeholder="비밀번호를 입력해주세요(영여/숫자/특수문자 1개씩 필수 입력)"/><br/>
                            </div>

                            {/* 비밀번호 재확인 */}
                            <div className='flex items-center'>
                                <label htmlFor='checkPassword' className='text-ms font-semibold w-32 text-wrap'>비밀번호
                                    재확인<span className='text-red-500'>*</span></label>
                                <input
                                    id="checkPassword"
                                    className='-mx-1 block border border-yellow-6 w-[80%] p-3 rounded placeholder:text-sm'
                                    type="password"
                                    {...checkPassword}
                                    placeholder="비밀번호를 다시 입력해주세요"/>
                            </div>

                            {/* 닉네임 */}
                            <div className='flex items-center gap-2 -mb-6 mx-2'>
                                <label htmlFor='userName' className='text-ms font-semibold w-32 -mt-6'>닉네임<span
                                    className='text-red-500'>*</span></label>
                                <div className='w-full'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            id="userName"
                                            className=' block border border-yellow-6 w-[82%] p-3 rounded placeholder:text-sm'
                                            type="text"
                                            pattern='^[a-zA-Z가-힣]{2,8}$'
                                            {...nickname}
                                            title='닉네임을 2~8글자로 입력해주세요.'
                                            placeholder="닉네임을 입력해주세요"/>
                                        <button
                                            type="button"
                                            onClick={handleCheckNickname}
                                            className='border p-3 rounded border-yellow-6'>
                                            중복 확인
                                        </button>
                                    </div>
                                    <span
                                        className={`mt-2 ml-2 ${nicknameValid === false ? 'text-red-500' : 'text-green-500'}`}>{nicknameMessage}</span>
                                </div>
                            </div>

                            {/* 전화번호 */}
                            <div className='flex items-center'>
                                <label htmlFor='phoneNumber'
                                       className='text-ms font-semibold w-32 text-wrap'>전화번호</label>
                                <input
                                    id="phoneNumber"
                                    className='-mx-1 block border border-yellow-6 w-[80%] p-3  rounded placeholder:text-sm'
                                    type="text"
                                    pattern='(010)-\d{3,4}-\d{4}'
                                    {...phoneNumber}
                                    title='잘못된 전화번호 형식입니다. 다시 입력해주세요.'
                                    placeholder="하이픈(-) 없이 전화번호를 입력해주세요"/><br/>
                            </div>

                            {/* 주소 */}
                            <div className='flex items-center'>
                                <label htmlFor='address' className='text-ms font-semibold w-32 text-wrap'>주소</label>
                                <input
                                    id="address"
                                    className='-mx-1 block border border-yellow-6 w-[80%] p-3  rounded placeholder:text-sm'
                                    type="text"
                                    pattern='^[a-zA-Z0-9가-힣\s,.-]{1,50}$'
                                    {...address}
                                    title='잘못된 주소 형식입니다. 50글자 이내로 다시 입력해주세요.'
                                    placeholder="주소를 입력해주세요"/><br/>
                            </div>

                            {/* 경력 */}
                            <ListenerRegisterCareer careerField={careerField} setCareerField={setCareerField}/>

                            {/* 카테고리 */}
                            <div className='flex items-center'>
                                <label htmlFor='category' className='text-ms font-semibold w-32'>카테고리</label>
                                <ListenerRegisterCategory
                                    selectedCategories={selectedCategories}
                                    setSelectedCategories={setSelectedCategories}
                                />
                            </div>

                            {/* 한 줄 소개 */}
                            <div className='flex items-center'>
                                <label htmlFor='description'
                                       className='text-ms font-semibold w-32 text-wrap'>한줄소개</label>
                                <input
                                    id="description"
                                    className='-mx-1 block border border-yellow-6 w-[80%] p-3  rounded placeholder:text-sm'
                                    type="text"
                                    pattern='^[a-zA-Z0-9가-힣\s,.-]{1,50}$'
                                    {...description}
                                    title='잘못된 형식입니다. 50글자 이내로 다시 입력해주세요.'
                                    placeholder="간단하게 한 줄로 소개 부탁드립니다."/><br/>
                            </div>
                            <button
                                className=' w-full mt-12 bg-yellow-400 text-center py-3 rounded text-black text-2xl font-[Tenada] hover:scale-105 hover:bg-yellow-500 my-1'
                                type="submit">가입하기
                            </button>

                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}


/*
 <div className='flex items-center'>
                                <label htmlFor='career' className='text-ms font-semibold w-32 text-wrap'>경력</label>
                                <input
                                    id="career"
                                    className='block border border-yellow-6 w-[86%] p-3  rounded placeholder:text-sm'
                                    type="text"
                                    pattern='^[a-zA-Z가-힣]{2,8}$'
                                    {...nickname}
                                    title='잘못된 경력 형식입니다. 50글자 이내로 다시 입력해주세요.'
                                    placeholder="경력을 입력해주세요"/><br/>
                            </div>
                            <div
                                className='mx-[124px] border border-dotted p-1 w-fit rounded-lg border-gray-500 text-sm -mt-6 text-gray-500'>
                                + 경력 추가
                            </div>
 */

