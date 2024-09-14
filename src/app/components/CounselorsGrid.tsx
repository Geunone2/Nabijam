import React from 'react';
import {Counselor} from "@/service/service";
import CounselorsCard from "@/app/components/CounselorsCard";

type Props = { counselors: Counselor[] };
export default function CounselorsGrid({counselors}: Props) {
    return (<ul className='flex flex-row justify-center'>
        {counselors.map((counselor) => <li key={counselor.path} ><CounselorsCard counselor={counselor}/></li>)}
    </ul>);
}