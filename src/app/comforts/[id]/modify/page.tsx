"use client";

import React, {useEffect, useState} from 'react';
import ComfortMemberModify from "@/app/components/comfort/ComfortMemberModify";
import {getCookie} from "cookies-next";
import ComfortListenerModify from "@/app/components/comfort/ComfortListenerModify";

export default function ModifyPage() {

    const [role, setRole] = useState("");

    useEffect(() => {
        const role = getCookie("Role");

        if (role === "LISTENER" || role === "MEMBER") {
            setRole(role);
        } else {
            setRole("");
        }
    }, []);

    return (
        <>
            {role === "LISTENER" ? (<ComfortListenerModify/>) : (<ComfortMemberModify/>)}
        </>);
}