'use client'

import React, {useRef, useState} from 'react';
import Image from 'next/image'

interface ImageUrlProps {
    ImageUrl: (data: string) => void;
}

export default function ImageRegister({ImageUrl}: ImageUrlProps) {

    const [profile, setProfile] = useState('/images/Profile.jpeg');
    const fileInput = useRef(null);

    const handleImage = async (e) => {
        const file = e.target.files[0]

        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e: any) => {
            if (reader.readyState === 2) {
                setProfile(e.target.result)
            }
        }

        const formData = new FormData();
        formData.append('file', file)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/file`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (!res.ok) {
                throw new Error('이미지 업로드 실패');
            }

            const data = await res.json();
            const Profile_URL = data.data;
            ImageUrl(Profile_URL);
        } catch (e) {
            console.log(e);
        }
    }
    return (<div>
        <a href="#" onClick={() => fileInput.current.click()}>
            <Image src={profile} width={250} height={250} alt="프로필 이미지"/>
        </a>
        <input type="file" name="Profile_URL" id="input-file" accept='image/*'
               style={{display: "none"}} ref={fileInput} onChange={handleImage}/>
    </div>);
}