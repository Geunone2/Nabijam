"use client"
import React, {useEffect} from 'react';


export default function ListenerRegisterCareer({careerField, setCareerField}) {


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
            <div className='flex items-start'>
                <label htmlFor='career' className='text-ms font-semibold w-32 text-wrap mt-3'>경력</label>
                <div className='-mx-1 flex flex-col gap-6 w-[80%]'>
                    {careerField.map((field, index) => (
                        <div key={index} className='flex'>
                            <input
                                id={`career-${index}`}
                                className='block border border-yellow-6 p-3 rounded placeholder:text-sm w-full'
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
            </div>
            {/* 경력 추가 버튼 */}
            <div
                className='ml-[124px] border -mt-4 border-dotted p-1 w-fit rounded-lg border-gray-500 text-sm text-gray-500 cursor-pointer'
                onClick={addCareerField}
            >
                + 경력 추가
            </div>
        </>
    );
}