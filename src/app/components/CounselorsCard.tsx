import React from 'react';
import Link from "next/link";
import {Counselor} from "@/service/service";
import Image from "next/image";

type Props = { counselor: Counselor };

export default function CounselorsCard({counselor: {name, path, description, phoneNumber, department}}: Props) {
    return (
        <Link href={`/counselors/${path}`}>
            <div className=' rounded bg-yellow-3  flex flex-col m-4 h-[105%] w-80'>
                <Image src={`/images/${path}.jpeg`} alt={name} width={300} height={600} className='border mx-auto mt-4 '/>
                <div className='my-auto mx-2 text-white overflow-hidden'>
                    <p className='font-semibold mb-2 mx-1 text-xl'>이름: {name}</p>
                    <p>• 전화번호: {phoneNumber}</p>
                    <p>• 직업: {department}</p>
                    <p className='overflow-auto'>• 한줄 소개: {description}</p>
                </div>
            </div>
        </Link>
    );
}