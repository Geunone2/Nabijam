import React, {useEffect, useState} from 'react';
import {FaRegComment} from "react-icons/fa";
import Image from 'next/image'
import ComfortListDetail, {ConsoleProps} from "@/app/components/comfort/ComfortListlDetail";
import {getCookie} from "cookies-next";
import {useParams, useRouter} from "next/navigation";
import Swal from "sweetalert2";
import ComfortListenerRegister from "@/app/components/comfort/ComfortListenerRegister";
import CommentsRegister from "@/app/components/comments/CommentsRegister";
import CommentsDetail from "@/app/components/comments/CommentsDetail";
import CommentsList from '../comments/CommentsList';
import {useMobile} from '@/service/MediaQuery';

interface Props {
    consoles: ConsoleProps[];
}

export default function ComfortListenerDetail({consoles}: Props) {

    const isMobile = useMobile();

    const [role, setRole] = useState("");
    const router = useRouter();
    const {id} = useParams();
    const [nickName, setNickName] = useState<string | null>(null);
    const [activeCommentBoxId, setActiveCommentBoxId] = useState<string | null>(null); // 클릭된 답변의 ID 저장
    const [commentCount, setCommentCount] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const role = getCookie("Role");
        const nickName = getCookie("nickname");
        if (role === "MEMBER" || role === "LISTENER") {
            setRole(role);
        } else {
            setRole("");
        }

        if (nickName) {
            setNickName(nickName);
        }

        const fetchComfort = async () => {
            //@ts-ignore
            await ComfortListDetail(BigInt(id));
        }
        fetchComfort();
    }, [id]);

    useEffect(() => {
        const fetchCommentCounts = async () => {
            const counts: { [key: string]: number } = {};
            for (const console of consoles) {
                const comments = await CommentsList(console.id); // 댓글 리스트 가져오기
                counts[console.id] = comments.length; // 댓글 개수 저장
            }
            setCommentCount(counts); // 상태에 저장
        };

        fetchCommentCounts();
    }, [consoles]);


    const handleModifyClick = () => {
        router.push(`/comforts/${id.toString()}/modify`);
    }

    const handleDeleteClick = async (consoleId: string) => {

        const token = getCookie('accessToken');

        try {
            Swal.fire({
                title: "위로하기 삭제",
                text: "정말로 삭제하시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "삭제",
                confirmButtonColor: "#FAAD00",
                cancelButtonText: "취소",
                cancelButtonColor: "#FF0000",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/consoles/${consoleId}`, {
                        method: 'DELETE',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (res.ok) {
                        Swal.fire({title: "삭제 완료!", text: "삭제되었습니다.", icon: "success", timer: 1000});
                        window.location.replace(`/comforts/${id.toString()}`);
                    } else {
                        Swal.fire({title: "게시글 삭제에 실패하였습니다.", text: "다시 시도해주세요.", icon: "error", timer: 1000});
                    }
                }
            });
        } catch (err) {
            console.error("삭제 요청 중 오류 발생", err);
        }
    };

    const handleCommentClick = (consoleId: string) => {
        setActiveCommentBoxId(prev => (prev === consoleId ? null : consoleId));
    }

    const handleCommentCountUpdate = (consoleId: string, count: number) => {
        setCommentCount(prev => ({...prev, [consoleId]: count}));
    }

    return (
        <>
            <div className='flex flex-col mx-auto mt-8 mb-10'>
                <div className={` ${isMobile ? 'w-[95%]' : 'w-[80%]'} mx-auto`}>
                    <div className={`${isMobile ? 'w-[25%]' : 'w-[15%]'}  border-[4px] border-yellow-2`}></div>
                    <h1 className={`font-[Tenada] text-start mt-4 ${isMobile ? 'text-3xl' : 'text-4xl'}`}>전문가의 답변</h1>
                </div>
                <div className={`mx-auto ${isMobile ? 'w-[95%]' : 'w-[80%]'}`}> {/* 하단 여백 추가 */}
                    {consoles.length > 0 ? (
                        consoles.map((console) => (
                            <div
                                className='mt-10 rounded-lg mx-auto w-full h-auto text-start border-yellow-2 border-2 p-4'
                                key={console.id}
                            >
                                <div className='mb-4'>
                                    <div className='flex flex-row justify-between items-center mx-2'>
                                        <div className='flex flex-row gap-1 items-center'>
                                            <p className={` ${isMobile ? 'text-3xl' : 'text-4xl'}`}>{console.nickname} <span
                                                className={` ${isMobile ? 'text-xl' : 'text-2xl'}`}>상담사</span>
                                            </p>
                                            <Image src={console.profile} alt="Profile" width={30} height={30}
                                                   className={`rounded-full object-cover  ${isMobile ? ' w-[30px] h-[30px] ' : ' w-[60px] h-[60px] '}`}/>
                                        </div>
                                        <p className={`${isMobile ? 'text-lg' : 'text-xl'} mt-2`}>{console.timestamp}</p>
                                    </div>

                                    <div className="mx-auto w-full border-[1px] border-lightGray/30 mt-2 mb-2"></div>

                                    <div className={`mx-1 mt-4 whitespace-pre-wrap ${isMobile ? 'text-xl' : 'text-3xl'}`}
                                         style={{lineHeight: '1.8'}}>{console.content}</div>
                                </div>

                                <div className='mx-1 flex flex-row gap-6 justify-between mt-10 text-center items-center'>
                                    <div className='flex flex-row items-center text-center gap-2'>
                                        <FaRegComment className={`mt-4 ${isMobile ? 'text-3xl' : 'text-4xl'} text-yellow-6`}
                                                      onClick={() => handleCommentClick(console.id)}/>
                                        {commentCount[console.id] > 0 &&
                                            <span className={`mt-4  ${isMobile ? 'text-2xl' : 'text-3xl'} text-yellow-6`}>{commentCount[console.id]}</span>}
                                    </div>
                                    {role === "LISTENER" && nickName === console.nickname ? (
                                        <div className='gap-4 flex flex-row'>
                                            <button
                                                onClick={handleModifyClick}
                                                className='border-2 p-1 w-16 bg-yellow-6 border-yellow-6 rounded-xl text-white text-xl'
                                            >
                                                수정
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(console.id)}
                                                className='border-2 p-1 w-16 bg-yellow-6 border-yellow-6 rounded-xl text-white text-xl'
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    ) : null}
                                </div>

                                {activeCommentBoxId === console.id && (
                                    <>
                                        <CommentsRegister consoleId={console.id}/>
                                        <CommentsDetail consoleId={console.id}
                                                        onCommentCount={(count) => handleCommentCountUpdate(console.id, count)}/>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <>
                            {role === "MEMBER" && (
                                <div
                                    className='relative mt-10 rounded-lg mx-auto w-full h-[250px] text-start border-yellow-2 border-2 p-4'>
                                    <p className={`${isMobile ? 'text-4xl' : 'text-6xl'} items-center text-center mt-20 text-gray-500`}>아직
                                        등록된 답변이
                                        없습니다.</p>
                                </div>
                            )}
                        </>
                    )}

                    {role === "LISTENER" && !consoles.some((console) => console.nickname === nickName) && (
                        <div className='h-[30%] mx-auto'>
                            <ComfortListenerRegister/>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
