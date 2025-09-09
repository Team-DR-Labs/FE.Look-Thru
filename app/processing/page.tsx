"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClothesStore } from "../../stores/clothesStore";
import Image from "next/image";

export default function ProcessingPage() {
    const [progress, setProgress] = useState(0);
    const router = useRouter();
    const { personImage, topImage, bottomImage } = useClothesStore();

    useEffect(() => {
        if (!personImage || (!topImage && !bottomImage)) {
            router.replace("/select-clothes");
        }
    }, [personImage, topImage, bottomImage, router]);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(timer);
                    router.push("/done"); // TODO: 결과 페이지로 이동
                    return 100;
                }
                return prevProgress + 1;
            });
        }, 100); // 100ms마다 1%씩 증가하여 10초 완성

        return () => {
            clearInterval(timer);
        };
    }, [router]);

    if (!personImage || (!topImage && !bottomImage)) {
        return null; // 리디렉션 중 렌더링 방지
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0 md:p-8">
            <div className="w-full h-screen md:w-96 md:h-[852px] bg-[radial-gradient(ellipse_100.00%_100.00%_at_50.00%_100.00%,_#FFC4E6_0%,_white_100%)] md:rounded-[56px] overflow-hidden relative z-10 flex flex-col">
                {/* Header */}
                <div className="self-stretch py-4 mt-16 flex flex-col justify-center items-center gap-1 overflow-hidden">
                    <div className="inline-flex justify-center items-center gap-1">
                        <div className="opacity-70 text-center justify-start text-pink-600 text-base font-medium font-['Pretendard'] leading-snug">
                            옷 입어보는 중
                        </div>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <mask
                                id="mask0_18_966"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                            >
                                <rect width="20" height="20" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_18_966)">
                                <path
                                    opacity="0.7"
                                    d="M5.19238 11.25C4.84863 11.25 4.5544 11.1276 4.30967 10.8827C4.06481 10.638 3.94238 10.3437 3.94238 10C3.94238 9.65625 4.06481 9.36201 4.30967 9.11729C4.5544 8.87243 4.84863 8.75 5.19238 8.75C5.53613 8.75 5.83044 8.87243 6.0753 9.11729C6.32002 9.36201 6.44238 9.65625 6.44238 10C6.44238 10.3437 6.32002 10.638 6.0753 10.8827C5.83044 11.1276 5.53613 11.25 5.19238 11.25ZM10.0001 11.25C9.65634 11.25 9.36211 11.1276 9.11738 10.8827C8.87252 10.638 8.75009 10.3437 8.75009 10C8.75009 9.65625 8.87252 9.36201 9.11738 9.11729C9.36211 8.87243 9.65634 8.75 10.0001 8.75C10.3438 8.75 10.6381 8.87243 10.8828 9.11729C11.1277 9.36201 11.2501 9.65625 11.2501 10C11.2501 10.3437 11.1277 10.638 10.8828 10.8827C10.6381 11.1276 10.3438 11.25 10.0001 11.25ZM14.8078 11.25C14.4641 11.25 14.1697 11.1276 13.9249 10.8827C13.6802 10.638 13.5578 10.3437 13.5578 10C13.5578 9.65625 13.6802 9.36201 13.9249 9.11729C14.1697 8.87243 14.4641 8.75 14.8078 8.75C15.1516 8.75 15.4458 8.87243 15.6905 9.11729C15.9354 9.36201 16.0578 9.65625 16.0578 10C16.0578 10.3437 15.9354 10.638 15.6905 10.8827C15.4458 11.1276 15.1516 11.25 14.8078 11.25Z"
                                    fill="#E20181"
                                />
                            </g>
                        </svg>
                    </div>
                    <div className="text-center justify-start text-stone-900 text-2xl font-semibold font-['Pretendard'] leading-9">
                        옷을 입혀보고 있어요
                    </div>
                    <div className="text-center justify-start text-black/70 text-base font-medium font-['Pretendard'] leading-snug">
                        잠시만 기다려주세요...
                    </div>
                </div>

                {/* Image Placeholder */}
                <div className="self-stretch flex-1 px-4 py-16 flex flex-col justify-center items-center gap-8 overflow-hidden">
                    <Image
                        className="w-64 h-64"
                        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f440/512.gif"
                        alt="Processing"
                        width={256}
                        height={256}
                        unoptimized
                    />
                </div>

                {/* Progress Bar Section */}
                <div className="self-stretch px-4 pt-4 pb-6 rounded-tl-3xl rounded-tr-3xl inline-flex justify-start items-start gap-1">
                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch px-0.5 inline-flex justify-between items-start">
                            <div className="text-center justify-start text-stone-900/80 text-sm font-medium font-['Pretendard'] leading-tight">
                                현재 진행 중...
                            </div>
                            <div className="text-center justify-start text-stone-900/80 text-sm font-medium font-['Pretendard'] leading-tight">
                                {progress}%
                            </div>
                        </div>
                        <div className="self-stretch h-2 bg-white/40 rounded-[100px] flex flex-col justify-center items-start gap-2.5 overflow-hidden">
                            <div
                                className="h-full bg-pink-600 rounded-2xl transition-all duration-100 ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
