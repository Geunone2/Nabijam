"use client"
import React, {useEffect} from 'react';
import {useMobile} from "@/service/MediaQuery";


export default function ListenerRegisterCareer({careerField, setCareerField}) {

    const isMobile = useMobile();

    useEffect(() => {
        if (careerField.length === 0) {
            setCareerField([""]);
        }
    }, [careerField, setCareerField]);


    const addCareerField = () => {
        setCareerField([...careerField, ""]);
    }

    const removeCareerField = (index) => {
        setCareerField(careerField.filter((_, i) => i !== index))
    }

    const handleChange = (index, value) => {
        const updatedField = [...careerField];
        updatedField[index] = value;
        setCareerField(updatedField);
    }

    return (
        <>
            {/* 경력 label과 입력 필드들 */}
            <div className='flex items-center'>
                <label htmlFor='career'
                       className={` ${isMobile ? 'text-2xl' : 'text-3xl'}  font-semibold w-40 text-wrap`}>경력</label>

                <div className='flex flex-col w-full'>
                    <div className=' flex flex-col gap-6 w-full'>
                        {careerField.map((field, index) => (
                            <div key={index} className='flex'>
                                <input
                                    id={`career-${index}`}
                                    className={`block border border-yellow-6 p-5 w-full rounded ${isMobile ? ' placeholder:text-lg':' placeholder:text-xl'}`}
                                    type="text"
                                    value={field}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    placeholder="경력을 입력해주세요"
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeCareerField(index)}
                                        className='-mx-6 font-bold text-gray-500'
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* 경력 추가 버튼 */}
                    <div
                        className=' border mt-4 border-dotted p-1 w-fit rounded-lg border-gray-500 text-xl text-gray-500 cursor-pointer'
                        onClick={addCareerField}
                    >
                        + 경력 추가
                    </div>
                </div>
            </div>
        </>
    );
}