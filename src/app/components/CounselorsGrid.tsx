import React from 'react';
import {Counselor} from "@/service/Counselors";
import CounselorsCard from "@/app/components/CounselorsCard";

type Props = { counselors: Counselor[] };
export default function CounselorsGrid({counselors}: Props) {
    return (<ul>
        {counselors.map((counselor) => <li key={counselor.path}><CounselorsCard counselor={counselor}/></li>)}
    </ul>);
}