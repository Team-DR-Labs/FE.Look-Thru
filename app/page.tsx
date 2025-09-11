"use client";

import { useRouter } from "next/navigation";
import { useClothesStore } from "../stores/clothesStore";
import { useEffect } from "react";
import Image from "next/image";
import { Mixpanel } from "@/lib/mixpanel";

export default function Home() {
    const router = useRouter();
    const clearAllImages = useClothesStore((state) => state.clearAllImages);

    useEffect(() => {
        clearAllImages();
    }, [clearAllImages]);

    const handleStartClick = () => {
        Mixpanel.track("intro 넘어감");
        router.push("/select-clothes");
    };

    return (
        <div className="h-full bg-gray-100 flex items-center justify-center p-0 md:p-8 font-pretendard">
            <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200">
                <div
                    className="absolute inset-0 opacity-50"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>
            </div>
            <div className="w-full h-full md:w-96 md:h-[852px] bg-[radial-gradient(ellipse_100.00%_100.00%_at_50.00%_100.00%,_#FFC4E6_0%,_white_100%)] md:rounded-[56px] overflow-hidden relative z-10 flex flex-col justify-between">
                {/* Header, text and image */}
                <div className="flex flex-col items-center pt-16 text-center">
                    <div className="self-stretch py-4 flex flex-col justify-center items-center gap-1 overflow-hidden">
                        <div className="inline-flex justify-center items-center gap-1">
                            <div className="opacity-70 text-pink-600 text-base font-medium leading-snug">
                                시작하기
                            </div>
                            <svg
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <mask
                                    id="mask0_18_822"
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
                                <g mask="url(#mask0_18_822)">
                                    <path
                                        opacity="0.7"
                                        d="M5.91667 8.42791L4.7548 9.07041C4.57646 9.17083 4.39216 9.19729 4.20188 9.14979C4.01174 9.10229 3.86646 8.9893 3.76605 8.81083L2.42 6.45521C2.31959 6.27673 2.29313 6.09111 2.34063 5.89833C2.38813 5.70541 2.50112 5.55875 2.67959 5.45833L7.05459 2.91666H8.28855C8.42952 2.91666 8.54223 2.95889 8.62667 3.04333C8.71098 3.12778 8.75313 3.24048 8.75313 3.38146V3.67C8.75313 4.1443 8.9257 4.55402 9.27084 4.89916C9.61598 5.24416 10.0257 5.41666 10.5 5.41666C10.9743 5.41666 11.384 5.24416 11.7292 4.89916C12.0743 4.55402 12.2469 4.1443 12.2469 3.67V3.38146C12.2469 3.24048 12.289 3.12778 12.3733 3.04333C12.4578 2.95889 12.5705 2.91666 12.7115 2.91666H13.9454L18.3204 5.45833C18.4989 5.55875 18.6119 5.70541 18.6594 5.89833C18.7069 6.09111 18.6804 6.27673 18.58 6.45521L17.234 8.81083C17.1335 8.9893 16.9904 9.10014 16.8044 9.14333C16.6185 9.18666 16.4322 9.15812 16.2452 9.05771L15.0833 8.44062V16.346C15.0833 16.5555 15.0128 16.7307 14.8717 16.8717C14.7307 17.0128 14.5555 17.0833 14.346 17.0833H6.65396C6.44452 17.0833 6.26931 17.0128 6.12834 16.8717C5.98723 16.7307 5.91667 16.5555 5.91667 16.346V8.42791ZM7.16667 6.33333V15.8333H13.8333V6.33333L16.4006 7.74208L17.2596 6.29166L13.6844 4.19229H13.4198C13.2916 4.89534 12.9594 5.48347 12.4231 5.95666C11.8867 6.43 11.2457 6.66666 10.5 6.66666C9.75431 6.66666 9.11327 6.43 8.57688 5.95666C8.04063 5.48347 7.70841 4.89534 7.58021 4.19229H7.31563L3.74042 6.29166L4.59938 7.74208L7.16667 6.33333Z"
                                        fill="#E20181"
                                    />
                                </g>
                            </svg>
                        </div>
                        <div className="text-stone-900 text-2xl font-semibold leading-9">
                            망설임은 이제 그만,
                            <br />
                            직접 눈으로 확인해보세요
                        </div>
                    </div>
                    <div className="py-8">
                        <picture>
                            <source
                                srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f52e/512.webp"
                                type="image/webp"
                            />
                            <img
                                src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f52e/512.gif"
                                alt="🔮"
                                width="256"
                                height="256"
                            />
                        </picture>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="w-full flex flex-col items-center ">
                    <div className="w-full p-4 bg-white rounded-tl-3xl rounded-tr-3xl inline-flex flex-col justify-start items-center gap-3">
                        <button
                            onClick={handleStartClick}
                            className="w-full h-16 py-4 bg-pink-600 rounded-[100px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden"
                        >
                            <div className="justify-start text-white text-base font-semibold leading-snug">
                                시작하기
                            </div>
                        </button>
                        <a
                            href="https://lookthru.hashnode.space/default-guide/6rcc7j247kcv67o07lky66as67cp7lmo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm font-medium leading-tight hover:underline"
                        >
                            개인정보보호정책 →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
