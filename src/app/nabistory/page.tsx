'use client';

import React, {useState} from 'react';
import useInput from "@/service/useInput"

export default function SignUpPage() {
    const userId = useInput('')
    const userName = useInput('')
    const userPassword = useInput('')
    const userPhone = useInput('')

    const [passwordCheck, setPasswordCheck] = useState('')
    const [passwordError, setPasswordError] = useState(false)


    const handlePassword = (e) => {
        const newValue = e.target.value;
        setPasswordError(userPassword.value !== newValue) //같으면 false 다르면 true
        setPasswordCheck(newValue)

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userPassword.value !== passwordCheck) {
            setPasswordError(true)
            return 0;
        } else {
            setPasswordError(false)
        }
    }

    return (
        <div className='flex flex-col h-full '>
            <div className='container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2'>
                <div className='px-6 py-8 rounded border-gray-200 border-4 shadow-xl text-black w-full'>
                    <h2 className='font-[Tenada]  text-6xl text-center mb-4'>회원가입</h2>
                    <form onSubmit={handleSubmit}>
                        <label className='font-[Tenada] text-lg'>아이디</label>
                        <input className='block border border-gray-500 w-full p-3 rounded mb-4 placeholder:text-sm'
                               pattern='^[^\s@]{1,50}@[^\s@]{1,50}$'
                               title='잘못된 아이디(  이메일) 형식입니다. 다시 입력해주세요.'
                               type="text"
                               {...userId}
                               placeholder="아이디를 입력해주세요"/><br/>

                        <label className='font-[Tenada] text-lg'>닉네임</label>
                        <input className='block border border-gray-500 w-full p-3 rounded mb-4 placeholder:text-sm'
                               type="text"
                               pattern='^[a-zA-Z가-힣]{2,8}$'
                               {...userName}
                               title='닉네임을 2~8글자로 입력해주세요.'
                               placeholder="닉네임을 입력해주세요"/><br/>

                        <label className='font-[Tenada] text-lg'>비밀번호</label>
                        <input className='block border border-gray-500 w-full p-3 rounded mb-4 placeholder:text-sm'
                               type="password"
                               pattern='^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,14}$'
                               title='잘못된 비밀번호 형식입니다. 다시 입력해주세요.'
                               {...userPassword}
                               placeholder="비밀번호를 입력해주세요(영여/숫자/특수문자 1개씩 필수 입력)"/><br/>

                        <label className='font-[Tenada] text-lg'>비밀번호 재확인</label>
                        <input className='block border border-gray-500 w-full p-3 rounded mb-8 placeholder:text-sm'
                               type="password"
                               value={passwordCheck}
                               onChange={handlePassword}
                               placeholder="비밀번호를 다시 입력해주세요"/>
                        {passwordError &&
                            <div className='mx-0.5 -mt-8 mb-4' style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</div>}

                        <label className='font-[Tenada] text-lg'>전화번호</label>
                        <input className='block border border-gray-500 w-full p-3 rounded mb-4 placeholder:text-sm'
                               type="text"
                               pattern='^\d{3}-\d{4}-\d{4}$'
                               title='잘못된 전화번호 형식입니다. 다시 입력해주세요'
                               {...userPhone}
                               placeholder="전화번호를 입력해주세요 (000-0000-0000)"/> <br/>

                        <button
                            className=' w-full bg-yellow-400 text-center py-3 rounded text-black text-2xl font-[Tenada] hover:scale-105 hover:bg-yellow-500 my-1'
                            type="submit">가입하기
                        </button>
                    </form>
                </div>
            </div>
        </div>)
        ;
}