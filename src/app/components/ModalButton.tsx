"use client";

import React, {useState} from 'react';
import SearchModal from "@/app/components/SearchModal";

export default function ModalButton() {

    const [showModal, setShowModal] = useState(false);

    const clickModal = () => setShowModal(!showModal);
    return (<>
        <div>
            <p onClick={clickModal} className='text-pastel-green-bold font-[Tenada] hover:scale-105 hover:text-emerald-200'>로그인</p>
        </div>
        {showModal && <SearchModal clickModal={clickModal}/>}
    </>);
}