"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useClothesStore } from "../../stores/clothesStore";
import { useRouter } from "next/navigation";
import { saveAs } from "file-saver";
import { Mixpanel } from "@/lib/mixpanel";

export default function DonePage() {
    const { resultImage, clearAllImages } = useClothesStore();
    const router = useRouter();

    useEffect(() => {
        if (!resultImage) {
            router.replace("/select-clothes");
        } else {
            Mixpanel.track("여기 confirm 페이지 도달");
        }
    }, [resultImage, router]);

    const handleSaveImage = () => {
        if (resultImage) {
            Mixpanel.track("confirm 저장 누름");
            saveAs(resultImage, "look-thru-result.png");
        }
    };

    if (!resultImage) {
        return null; // 리디렉션 중 렌더링 방지
    }

    const handleMainPage = () => {
        Mixpanel.track("Returned to Main Page");
        router.push("/");
    };

    return (
        <div className="h-full bg-gray-100 flex items-center justify-center p-0 md:p-8">
            <div className="w-full h-full md:w-96 md:h-[852px] bg-[radial-gradient(ellipse_100.00%_100.00%_at_50.00%_100.00%,_#FFC4E6_0%,_white_100%)] md:rounded-[56px] overflow-hidden relative z-10 flex flex-col">
                {/* Header */}
                <div className="self-stretch py-4 mt-16 flex flex-col justify-center items-center gap-1 overflow-hidden">
                    <div className="inline-flex justify-center items-center gap-2">
                        <div className="opacity-70 text-center justify-start text-pink-600 text-base font-medium font-['Pretendard'] leading-snug">
                            옷 갈아입기 성공!
                        </div>
                        <svg
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <mask
                                id="mask0_18_1025"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="21"
                                height="20"
                            >
                                <rect
                                    x="0.5"
                                    width="20"
                                    height="20"
                                    fill="#D9D9D9"
                                />
                            </mask>
                            <g mask="url(#mask0_18_1025)">
                                <path
                                    opacity="0.7"
                                    d="M5.91655 8.42791L4.75467 9.07041C4.57634 9.17083 4.39204 9.19729 4.20176 9.14979C4.01162 9.10229 3.86634 8.9893 3.76592 8.81083L2.41988 6.45521C2.31947 6.27673 2.29301 6.09111 2.34051 5.89833C2.38801 5.70541 2.50099 5.55875 2.67947 5.45833L7.05447 2.91666H8.28842C8.4294 2.91666 8.5421 2.95889 8.62655 3.04333C8.71085 3.12778 8.75301 3.24048 8.75301 3.38146V3.67C8.75301 4.1443 8.92558 4.55402 9.27072 4.89916C9.61586 5.24416 10.0256 5.41666 10.4999 5.41666C10.9742 5.41666 11.3839 5.24416 11.729 4.89916C12.0742 4.55402 12.2468 4.1443 12.2468 3.67V3.38146C12.2468 3.24048 12.2889 3.12778 12.3732 3.04333C12.4577 2.95889 12.5704 2.91666 12.7113 2.91666H13.9453L18.3203 5.45833C18.4988 5.55875 18.6118 5.70541 18.6593 5.89833C18.7068 6.09111 18.6803 6.27673 18.5799 6.45521L17.2338 8.81083C17.1334 8.9893 16.9902 9.10014 16.8043 9.14333C16.6184 9.18666 16.432 9.15812 16.2451 9.05771L15.0832 8.44062V16.346C15.0832 16.5555 15.0127 16.7307 14.8715 16.8717C14.7306 17.0128 14.5554 17.0833 14.3459 17.0833H6.65384C6.4444 17.0833 6.26919 17.0128 6.12822 16.8717C5.9871 16.7307 5.91655 16.5555 5.91655 16.346V8.42791ZM7.16655 6.33333V15.8333H13.8332V6.33333L16.4005 7.74208L17.2595 6.29166L13.6843 4.19229H13.4197C13.2915 4.89534 12.9593 5.48347 12.423 5.95666C11.8866 6.43 11.2456 6.66666 10.4999 6.66666C9.75419 6.66666 9.11315 6.43 8.57676 5.95666C8.04051 5.48347 7.70829 4.89534 7.58009 4.19229H7.31551L3.7403 6.29166L4.59926 7.74208L7.16655 6.33333Z"
                                    fill="#E20181"
                                />
                            </g>
                        </svg>
                    </div>
                    <div className="text-center justify-start text-stone-900 text-2xl font-semibold font-['Pretendard'] leading-9">
                        옷을 갈아입었어요!
                    </div>
                </div>
                {/* Main Content */}
                <div className="self-stretch flex-1 px-5 py-5 flex justify-center items-center overflow-hidden">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden">
                        <Image
                            className="object-cover"
                            src={resultImage}
                            alt="Done"
                            fill
                        />
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="w-96 p-4 pb-12 bg-white rounded-tl-3xl rounded-tr-3xl inline-flex justify-start items-start gap-1">
                    <button
                        onClick={handleMainPage}
                        className="flex-1 self-stretch bg-zinc-100 rounded-tl-[100px] rounded-tr-xl rounded-bl-[100px] rounded-br-xl flex justify-center items-center gap-2.5"
                    >
                        <div className="justify-start text-stone-900 text-base font-semibold font-['Pretendard'] leading-snug">
                            처음으로 돌아가기
                        </div>
                    </button>
                    <button
                        onClick={() => {
                            Mixpanel.track("confirm 저장 누름");
                        }}
                        className="flex-1 h-16 py-4 bg-pink-600 rounded-tl-xl rounded-tr-[100px] rounded-bl-xl rounded-br-[100px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden"
                    >
                        <div className="justify-start text-white text-base font-semibold font-['Pretendard'] leading-snug">
                            저장하기
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
