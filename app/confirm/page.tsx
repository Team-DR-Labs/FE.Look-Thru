"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useClothesStore } from "../../stores/clothesStore";
import { useRouter } from "next/navigation";
import { Mixpanel } from "@/lib/mixpanel";

export default function ConfirmPage() {
    const {
        personImage,
        topImage,
        bottomImage,
        setResultImage,
        setIsLoading,
        setError,
    } = useClothesStore();
    const router = useRouter();

    useEffect(() => {
        if (!personImage || (!topImage && !bottomImage)) {
            router.replace("/select-clothes");
        }
    }, [personImage, topImage, bottomImage, router]);

    const handleTryOnClick = async () => {
        if (personImage && (topImage || bottomImage)) {
            Mixpanel.track("Try On Clicked", {
                topImage: !!topImage,
                bottomImage: !!bottomImage,
            });
            setIsLoading(true);
            setError(null);
            router.push("/processing");

            try {
                const response = await fetch("/api/combine-images", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        personImage,
                        topImage,
                        bottomImage,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to combine images");
                }

                const data = await response.json();
                setResultImage(data.result);
            } catch (error) {
                console.error(error);
                setError(
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
                );
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (!personImage || (!topImage && !bottomImage)) {
        return null; // 리디렉션 중 렌더링 방지
    }

    return (
        <div className="h-full bg-gray-100 flex items-center justify-center p-0 md:p-8">
            <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200">
                <div
                    className="absolute inset-0 opacity-50"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>
            </div>

            <div className="w-full h-full md:w-96 md:h-[852px] bg-[radial-gradient(ellipse_100.00%_100.00%_at_50.00%_100.00%,_#FFC4E6_0%,_white_100%)] md:rounded-[56px] overflow-hidden relative z-10 flex flex-col">
                {/* Back Button */}
                <div className="px-4 py-4 pt-8 md:pt-4">
                    <button onClick={() => router.back()} className="p-2">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <mask
                                id="mask0_18_347"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="24"
                                height="24"
                            >
                                <rect width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_18_347)">
                                <path
                                    d="M7.373 12.75L13.0693 18.4462L12 19.5L4.5 12L12 4.5L13.0693 5.55375L7.373 11.25H19.5V12.75H7.373Z"
                                    fill="#1C1B1F"
                                />
                            </g>
                        </svg>
                    </button>
                </div>
                {/* Header */}
                <div className="self-stretch py-4 flex flex-col justify-center items-center gap-1 overflow-hidden">
                    <div className="inline-flex justify-center items-center gap-1">
                        <div className="opacity-70 text-center justify-start text-pink-600 text-base font-medium font-['Pretendard'] leading-snug">
                            최종 확인
                        </div>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <mask
                                id="mask0_18_256"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                            >
                                <rect width="20" height="20" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_18_256)">
                                <path
                                    opacity="0.7"
                                    d="M7.95836 14.7115L3.51294 10.266L4.40377 9.37501L7.95836 12.9296L15.5963 5.29167L16.4871 6.18271L7.95836 14.7115Z"
                                    fill="#E20181"
                                />
                            </g>
                        </svg>
                    </div>
                    <div className="text-center justify-start text-stone-900 text-2xl font-semibold font-['Pretendard'] leading-9">
                        다음 정보가 맞는지 확인해주세요
                    </div>
                </div>

                {/* Main Content */}
                <div className="self-stretch flex-1 px-5 py-6 flex flex-col justify-start items-center gap-2 overflow-hidden">
                    {personImage && (
                        <div className="self-stretch h-96 relative rounded-2xl overflow-hidden">
                            <Image
                                src={personImage}
                                alt="Person"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div className="self-stretch flex-1 inline-flex justify-start items-start gap-2">
                        {topImage && (
                            <div className="flex-1 h-44 relative rounded-2xl overflow-hidden">
                                <Image
                                    src={topImage}
                                    alt="Top"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        {bottomImage && (
                            <div className="flex-1 h-44 relative rounded-2xl overflow-hidden">
                                <Image
                                    src={bottomImage}
                                    alt="Bottom"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="self-stretch p-4 bg-white rounded-tl-3xl rounded-tr-3xl inline-flex justify-start items-start gap-1">
                    <div
                        onClick={() => router.back()}
                        className="w-16 self-stretch bg-zinc-100 rounded-tl-[100px] rounded-tr-xl rounded-bl-[100px] rounded-br-xl flex justify-center items-center gap-2.5 cursor-pointer"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <mask
                                id="mask0_18_896"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="24"
                                height="24"
                            >
                                <rect width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_18_896)">
                                <path
                                    d="M7.373 12.75L13.0693 18.4462L12 19.5L4.5 12L12 4.5L13.0693 5.55375L7.373 11.25H19.5V12.75H7.373Z"
                                    fill="#1C1B1F"
                                />
                            </g>
                        </svg>
                    </div>
                    <div
                        onClick={handleTryOnClick}
                        className="flex-1 h-16 py-4 bg-pink-600 rounded-tl-xl rounded-tr-[100px] rounded-bl-xl rounded-br-[100px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden cursor-pointer"
                    >
                        <div className="justify-start text-white text-base font-semibold font-['Pretendard'] leading-snug">
                            입어보기 ✨
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
