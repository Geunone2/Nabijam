import React from 'react';
import Link from "next/link";
import {Counselor} from "@/service/Counselors";
import Image from "next/image";

type Props = { counselor: Counselor };

export default function CounselorsCard({counselor: {name, path, description, phoneNumber, department}}: Props) {
    return (<Link href={`/counselors/${path}`}>
            <div className='rounded-md border-4 overflow-hidden shadow-lg  flex m-4 w-auto'>
                <Image src={`/images/${path}.jpeg`} alt={name} width={200} height={400} className='border'/>
                <div className='font-[Tenada] my-auto mx-10 text-xl'>
                    <p>이름: {name}</p>
                    <p>전화번호: {phoneNumber}</p>
                    <p>직업: {department}</p>
                    <p className='overflow-hidden'>한줄 소개: {description}</p>
                </div>
            </div>
        </Link>

    );
}