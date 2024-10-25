'use client'

import React, {useEffect, useState} from 'react';
import ComfortContent from "@/app/components/comfort/ComfortContent";
import {getCookie} from "cookies-next";
import ConsoleContent from "@/app/components/console/ConsoleContent";

export default function ComfortPage() {

    const [role, setRole] = useState("");

    useEffect(() => {
        const role = getCookie('Role');

        if (role === "LISTENER" || role === "MEMBER") {
            setRole(role);
        } else {
            setRole("");
        }
    }, []);

    return (
        <>
            {role === "LISTENER" ? <ConsoleContent/> : <ComfortContent/>}
        </>
    );
}