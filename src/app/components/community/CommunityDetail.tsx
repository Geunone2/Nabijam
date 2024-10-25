'use client';
import React, {useEffect, useState} from 'react';
import CommunityListDetail, {CommunityListDetailProps} from "@/app/components/community/CommunityListDetail";
import {useParams, useRouter} from "next/navigation";
import Image from 'next/image'
import {getCookie} from "cookies-next";
import Swal from "sweetalert2";
import {useMobile} from "@/service/MediaQuery";

export default function CommunityDetail() {

    const isMobile = useMobile();

    const [community, setCommunity] = useState<CommunityListDetailProps | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null); // 로그인한 사용자 이름 상태
    const {id} = useParams();
    const router = useRouter();

    useEffect(() => {
        // 로그인된 사용자 이름 가져오기
        const userName = getCookie('nickname'); // 쿠키에서 'nickname' 값 가져오기
        if (userName) {
            setLoggedInUser(userName.toString()); // 문자열로 변환하여 상태에 저장
        }

        const fetchCommunity = async () => {
            if (id) {
                try {
                    //@ts-ignore
                    const data = await CommunityListDetail(BigInt(id));
                    setCommunity(data);
                } catch (err) {
                    console.error("커뮤니티 게시글 상세 정보를 불러오는 데 실패했습니다.")
                }
            }
        }
        fetchCommunity();
    }, [id]);

    const handleModifyClick = () => {
        router.push(`/community/${id.toString()}/modify`);
    }

    const handleDeleteClick = () => {
        const token = getCookie('accessToken');

        try {
            Swal.fire({
                title: "커뮤니티 글 삭제",
                text: "정말로 삭제하시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "삭제",
                confirmButtonColor: "#FAAD00",
                cancelButtonText: "취소",
                cancelButtonColor: "#FF0000",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // '삭제' 버튼이 눌렸을 때만 삭제 요청을 보냄
                    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/community/${id.toString()}`, {
                        method: 'DELETE',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({communityBoardId: id.toString()}),
                    });

                    if (res.ok) {
                        Swal.fire({title: "삭제 완료!", text: "삭제되었습니다.", icon: "success", timer: 1000});
                        router.push(`/community`);
                    } else {
                        Swal.fire({title: "게시글 삭제에 실패하였습니다.", text: "다시 시도해주세요.", icon: "error", timer: 1000});
                    }
                }
            });
        } catch (err) {
            console.error("삭제 요청 중 오류 발생", err);
        }
    }

    if (!community) {
        return null;
    }

    return (<>
        {isMobile ? (<>
            <section className='w-[95%] mx-auto mt-20'>
                <div className="w-[20%] border-[4px] border-yellow-6"></div>

                <div className='flex flex-row justify-between'>
                    <h1 className='text-4xl mt-4 font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>{community.title}</h1>
                    <div className='flex flex-row items-end gap-4'>
                        <p className='text-3xl'>{community.nickname}</p>
                        <Image src={community.profile} alt="Profile" width={100} height={100}
                               className='rounded-full w-[45px] h-[45px]'/>
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <p className='text-2xl text-yellow-2 font-bold mt-2'>{community.categories.join(', ')}</p>
                    <p className='items-end text-xl mt-1'>{community.timestamp}</p>
                </div>
                <p className='mt-8 text-2xl h-[480px]'>{community.content}</p>

                {/* 로그인된 사용자와 작성자가 같을 경우에만 수정/삭제 버튼 표시 */}
                {loggedInUser === community.nickname && (
                    <div className='flex flex-row mb-2 justify-end'>
                        <button
                            type="button"
                            onClick={handleModifyClick}
                            className={`bg-white border-yellow-2 border-4 text-black text-3xl p-1.5 rounded-lg w-fit mx-2`}
                        >
                            수정하기
                        </button>
                        <button
                            type="button"
                            onClick={handleDeleteClick}
                            className={`bg-white border-yellow-2 border-4 text-black p-1.5 text-3xl rounded-lg w-fit mx-2`}
                        >
                            삭제하기
                        </button>
                    </div>
                )}

                <div className="w-full border-[4px] border-yellow-6"></div>
            </section>

            <section className='w-[95%] mx-auto mt-10'>
                <h1 className='text-4xl font-semibold'>댓글 <span className='text-yellow-2'>0</span>개가 달렸어요.</h1>
                <div className='border-2 h-[420px] mt-2'>

                </div>
            </section>
        </>) : (<>
            <section className='w-[80%] mx-auto mt-20'>
                <div className="w-[10%] border-[4px] border-yellow-6"></div>

                <div className='flex flex-row justify-between'>
                    <h1 className='text-6xl mt-4 font-semibold'>{community.title}</h1>
                    <div className='flex flex-row items-end gap-4'>
                        <p className='text-4xl'>{community.nickname}</p>
                        <Image src={community.profile} alt="Profile" width={100} height={100}
                               className='rounded-full w-[60px] h-[60px]'/>
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <p className='text-4xl text-yellow-2 font-bold mt-2'>{community.categories.join(', ')}</p>
                    <p className='items-end text-2xl mt-1'>{community.timestamp}</p>
                </div>
                <p className='mt-8 text-3xl h-[480px]'>{community.content}</p>

                {/* 로그인된 사용자와 작성자가 같을 경우에만 수정/삭제 버튼 표시 */}
                {loggedInUser === community.nickname && (
                    <div className='flex flex-row mb-2 justify-end'>
                        <button
                            type="button"
                            onClick={handleModifyClick}
                            className={`bg-white border-yellow-2 border-4 text-black text-3xl p-1.5 rounded-lg w-fit mx-2`}
                        >
                            수정하기
                        </button>
                        <button
                            type="button"
                            onClick={handleDeleteClick}
                            className={`bg-white border-yellow-2 border-4 text-black p-1.5 text-3xl rounded-lg w-fit mx-2`}
                        >
                            삭제하기
                        </button>
                    </div>
                )}

                <div className="w-full border-[4px] border-yellow-6"></div>
            </section>

            <section className='w-[80%] mx-auto mt-10'>
                <h1 className='text-4xl font-semibold'>댓글 <span className='text-yellow-2'>0</span>개가 달렸어요.</h1>
                <div className='border-2 h-[420px] mt-2'>

                </div>
            </section>
        </>)}

    </>);
}
