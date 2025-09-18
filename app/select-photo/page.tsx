"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useClothesStore } from "../../stores/clothesStore";
import { useRouter } from "next/navigation";
import { Mixpanel } from "@/lib/mixpanel";

export default function SelectPhoto() {
    const {
        personImage,
        setPersonImage,
        topImage,
        bottomImage,
        hatImage,
        outerwearImage,
        shoesImage,
    } = useClothesStore();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);

    useEffect(() => {
        if (
            !topImage &&
            !bottomImage &&
            !hatImage &&
            !outerwearImage &&
            !shoesImage
        ) {
            router.replace("/select-clothes");
        }
    }, [
        topImage,
        bottomImage,
        hatImage,
        outerwearImage,
        shoesImage,
        router,
    ]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        Mixpanel.track("select-photo 사진 업로드");
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPersonImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNextClick = () => {
        if (
            personImage &&
            (topImage || bottomImage || hatImage || outerwearImage || shoesImage)
        ) {
            Mixpanel.track("select-photo 넘어감");
            router.push("/confirm");
        }
    };

    if (
        !topImage &&
        !bottomImage &&
        !hatImage &&
        !outerwearImage &&
        !shoesImage
    ) {
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
                {/* Header */}
                <div className="mt-20 self-stretch py-4 flex flex-col justify-center items-center gap-1 overflow-hidden">
                    <div className="inline-flex justify-center items-center gap-1">
                        <div className="opacity-70 text-center justify-start text-pink-600 text-base font-medium font-['Pretendard'] leading-snug">
                            입힐 사진 선택
                        </div>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <mask
                                id="mask0_18_321"
                                style={{ maskType: "alpha" }}
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                            >
                                <rect width="20" height="20" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_18_321)">
                                <path
                                    opacity="0.7"
                                    d="M7.56413 11.5385H15.3525L12.766 8.14104L10.7852 10.6731L9.47746 9.05459L7.56413 11.5385ZM6.71475 14.5833C6.29378 14.5833 5.93746 14.4375 5.64579 14.1458C5.35413 13.8542 5.20829 13.4979 5.20829 13.0769V3.58979C5.20829 3.16882 5.35413 2.8125 5.64579 2.52084C5.93746 2.22917 6.29378 2.08334 6.71475 2.08334H16.2018C16.6228 2.08334 16.9791 2.22917 17.2708 2.52084C17.5625 2.8125 17.7083 3.16882 17.7083 3.58979V13.0769C17.7083 13.4979 17.5625 13.8542 17.2708 14.1458C16.9791 14.4375 16.6228 14.5833 16.2018 14.5833H6.71475ZM6.71475 13.3333H16.2018C16.266 13.3333 16.3248 13.3066 16.3781 13.2531C16.4316 13.1998 16.4583 13.141 16.4583 13.0769V3.58979C16.4583 3.52563 16.4316 3.46688 16.3781 3.41354C16.3248 3.36007 16.266 3.33334 16.2018 3.33334H6.71475C6.65058 3.33334 6.59183 3.36007 6.5385 3.41354C6.48503 3.46688 6.45829 3.52563 6.45829 3.58979V13.0769C6.45829 13.141 6.48503 13.1998 6.5385 13.2531C6.59183 13.3066 6.65058 13.3333 6.71475 13.3333ZM3.79808 17.5C3.37711 17.5 3.02079 17.3542 2.72913 17.0625C2.43746 16.7708 2.29163 16.4145 2.29163 15.9935V5.25646H3.54163V15.9935C3.54163 16.0577 3.56836 16.1165 3.62183 16.1698C3.67517 16.2233 3.73392 16.25 3.79808 16.25H14.5352V17.5H3.79808Z"
                                    fill="#E20181"
                                />
                            </g>
                        </svg>
                    </div>
                    <div className="text-center justify-start text-stone-900 text-2xl font-semibold font-['Pretendard'] leading-9">
                        어떤 사진에 입힐지 알려주세요
                    </div>
                    <div className="text-center justify-start text-black/50 text-base font-medium font-['Pretendard'] leading-snug">
                    되도록 전신 사진을 선택해주세요!
                    </div>
                </div>

                {/* Main Content */}
                <div className="self-stretch flex-1 px-5 py-5 flex flex-col justify-start items-center gap-3 overflow-hidden">
                    {personImage ? (
                        <>
                            <div className="w-full h-96 relative rounded-2xl shadow-lg overflow-hidden">
                                <Image
                                    src={personImage}
                                    alt="Uploaded person"
                                    fill
                                    className="object-cover rounded-2xl"
                                />
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="pl-6 pr-7 py-3 bg-white/50 rounded-[100px] outline-2 outline-offset-[-2px] outline-white inline-flex justify-center items-center gap-2 overflow-hidden"
                            >
                                <svg
                                    width="21"
                                    height="20"
                                    viewBox="0 0 21 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <mask
                                        id="mask0_18_937"
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
                                    <g mask="url(#mask0_18_937)">
                                        <path
                                            d="M4.92308 17.0833C4.50211 17.0833 4.14579 16.9375 3.85413 16.6458C3.56246 16.3541 3.41663 15.9978 3.41663 15.5769V4.4231C3.41663 4.00213 3.56246 3.64581 3.85413 3.35415C4.14579 3.06248 4.50211 2.91665 4.92308 2.91665H11.3975V4.16665H4.92308C4.85892 4.16665 4.80017 4.19338 4.74683 4.24685C4.69336 4.30019 4.66663 4.35894 4.66663 4.4231V15.5769C4.66663 15.641 4.69336 15.6998 4.74683 15.7531C4.80017 15.8066 4.85892 15.8333 4.92308 15.8333H16.0768C16.141 15.8333 16.1998 15.8066 16.2531 15.7531C16.3066 15.6998 16.3333 15.641 16.3333 15.5769V9.97602H17.5833V15.5769C17.5833 15.9978 17.4375 16.3541 17.1458 16.6458C16.8541 16.9375 16.4978 17.0833 16.0768 17.0833H4.92308ZM6.12496 13.9583H14.9389L12.1987 10.3046L9.85892 13.3494L8.19225 11.2179L6.12496 13.9583ZM15.5881 8.24519V4.47748L14.0464 5.9904L13.1762 5.12019L16.2131 2.08331L19.25 5.12019L18.3798 5.9904L16.8381 4.47748V8.24519H15.5881Z"
                                            fill="#1D1D1D"
                                            fillOpacity="0.5"
                                        />
                                    </g>
                                </svg>
                                <div onClick={() => Mixpanel.track("select-photo 사진 재업로드")} className="text-center justify-start text-stone-900/50 text-base font-medium font-['Pretendard'] leading-snug">
                                    재업로드
                                </div>
                            </button>
                        </>
                    ) : (
                        <>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-96 bg-white/50 rounded-2xl outline-4 outline-offset-[-4px] outline-white flex flex-col justify-center items-center gap-2 overflow-hidden cursor-pointer"
                            >
                                <svg
                                    width="65"
                                    height="65"
                                    viewBox="0 0 65 65"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <mask
                                        id="mask0_18_382"
                                        style={{ maskType: "alpha" }}
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="65"
                                        height="65"
                                    >
                                        <rect
                                            x="0.5"
                                            y="0.5"
                                            width="64"
                                            height="64"
                                            fill="#D9D9D9"
                                        />
                                    </mask>
                                    <g mask="url(#mask0_18_382)">
                                        <path
                                            d="M14.654 55.1667C13.3069 55.1667 12.1667 54.7 11.2334 53.7667C10.3 52.8333 9.83337 51.6931 9.83337 50.346V14.654C9.83337 13.3069 10.3 12.1667 11.2334 11.2333C12.1667 10.3 13.3069 9.83332 14.654 9.83332H35.372V13.8333H14.654C14.4487 13.8333 14.2607 13.9189 14.09 14.09C13.9189 14.2607 13.8334 14.4487 13.8334 14.654V50.346C13.8334 50.5513 13.9189 50.7393 14.09 50.91C14.2607 51.0811 14.4487 51.1667 14.654 51.1667H50.346C50.5514 51.1667 50.7394 51.0811 50.91 50.91C51.0812 50.7393 51.1667 50.5513 51.1667 50.346V32.4233H55.1667V50.346C55.1667 51.6931 54.7 52.8333 53.7667 53.7667C52.8334 54.7 51.6932 55.1667 50.346 55.1667H14.654ZM18.5 45.1667H46.7047L37.936 33.4747L30.4487 43.218L25.1154 36.3973L18.5 45.1667ZM48.782 26.8847V14.828L43.8487 19.6693L41.064 16.8847L50.782 7.16666L60.5 16.8847L57.7154 19.6693L52.782 14.828V26.8847H48.782Z"
                                            fill="#1D1D1D"
                                            fillOpacity="0.5"
                                        />
                                    </g>
                                </svg>
                                <div className="text-center justify-start text-stone-900/50 text-xl font-medium font-['Pretendard'] leading-7">
                                    여기를 클릭하여 <br />
                                    사진을 업로드 해주세요
                                </div>
                            </div>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowPrivacyPopup(true);
                                }}
                                className="pl-6 pr-7 py-3 bg-white/50 rounded-[100px] outline outline-2 outline-offset-[-2px] outline-white inline-flex justify-center items-center gap-2 overflow-hidden cursor-pointer"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <mask
                                        id="mask0_180_5503"
                                        style={{ maskType: "alpha" }}
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="20"
                                        height="20"
                                    >
                                        <rect
                                            width="20"
                                            height="20"
                                            fill="#D9D9D9"
                                        />
                                    </mask>
                                    <g mask="url(#mask0_180_5503)">
                                        <path
                                            d="M9.37504 13.9583H10.625V9.16665H9.37504V13.9583ZM10 7.7404C10.1907 7.7404 10.3506 7.67588 10.4796 7.54685C10.6087 7.41783 10.6732 7.25797 10.6732 7.06727C10.6732 6.87658 10.6087 6.71672 10.4796 6.58769C10.3506 6.4588 10.1907 6.39435 10 6.39435C9.80935 6.39435 9.64949 6.4588 9.52046 6.58769C9.39143 6.71672 9.32692 6.87658 9.32692 7.06727C9.32692 7.25797 9.39143 7.41783 9.52046 7.54685C9.64949 7.67588 9.80935 7.7404 10 7.7404ZM10.0015 17.9166C8.9065 17.9166 7.87726 17.7089 6.91379 17.2933C5.95032 16.8778 5.11226 16.3138 4.39962 15.6014C3.68698 14.8891 3.12275 14.0514 2.70692 13.0883C2.29122 12.1253 2.08337 11.0963 2.08337 10.0014C2.08337 8.90644 2.29115 7.8772 2.70671 6.91373C3.12226 5.95026 3.68622 5.1122 4.39858 4.39956C5.11094 3.68692 5.94865 3.12269 6.91171 2.70685C7.87476 2.29116 8.90372 2.08331 9.99858 2.08331C11.0936 2.08331 12.1228 2.29109 13.0863 2.70665C14.0498 3.1222 14.8878 3.68616 15.6005 4.39852C16.3131 5.11088 16.8773 5.94859 17.2932 6.91165C17.7089 7.8747 17.9167 8.90366 17.9167 9.99852C17.9167 11.0935 17.7089 12.1228 17.2934 13.0862C16.8778 14.0497 16.3139 14.8878 15.6015 15.6004C14.8891 16.313 14.0514 16.8773 13.0884 17.2931C12.1253 17.7088 11.0964 17.9166 10.0015 17.9166ZM10 16.6666C11.8612 16.6666 13.4375 16.0208 14.7292 14.7291C16.0209 13.4375 16.6667 11.8611 16.6667 9.99998C16.6667 8.13887 16.0209 6.56248 14.7292 5.27081C13.4375 3.97915 11.8612 3.33331 10 3.33331C8.13893 3.33331 6.56254 3.97915 5.27087 5.27081C3.97921 6.56248 3.33337 8.13887 3.33337 9.99998C3.33337 11.8611 3.97921 13.4375 5.27087 14.7291C6.56254 16.0208 8.13893 16.6666 10 16.6666Z"
                                            fill="#E20181"
                                        />
                                    </g>
                                </svg>
                                <div className="text-center justify-start text-pink-600 text-base font-medium font-['Pretendard'] leading-snug">
                                    걱정하지마세요!
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />

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
                    <button
                        onClick={handleNextClick}
                        disabled={!personImage}
                        className={`flex-1 h-16 py-4 rounded-tl-xl rounded-tr-[100px] rounded-bl-xl rounded-br-[100px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden transition-colors ${
                            personImage
                                ? "bg-[#E20181] cursor-pointer"
                                : "bg-stone-400 cursor-not-allowed"
                        }`}
                    >
                        <div className="justify-start text-white text-base font-semibold font-['Pretendard'] leading-snug">
                            {personImage ? "다음" : "사진을 업로드해주세요"}
                        </div>
                    </button>
                </div>
            </div>
            {showPrivacyPopup && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm md:items-center"
                    onClick={() => setShowPrivacyPopup(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`relative w-full md:w-96 transform transition-transform duration-300 ${
                            showPrivacyPopup ? "translate-y-0" : "translate-y-full"
                        }`}
                    >
                        <div className="self-stretch  w-full p-2 inline-flex justify-start items-center gap-2.5 overflow-hidden">
                            <div className="flex-1 pt-2 bg-white rounded-3xl inline-flex flex-col justify-start items-start overflow-hidden">
                                <div className="self-stretch px-4 py-3 flex flex-col justify-center items-start gap-2.5">
                                    <div className="text-center justify-start text-stone-900 text-lg font-semibold font-['Pretendard'] leading-relaxed">
                                        LookThru는 사진을 저장하지 않아요.
                                    </div>
                                    <div className="self-stretch opacity-80 justify-start text-stone-900 text-base font-medium font-['Pretendard'] leading-relaxed">
                                        LookThru에 업로드된 사진들은 AI로
                                        가공된 뒤 <br /> 즉시 폐기되며 어떤
                                        형태로도 서버에 남지 않습니다.
                                    </div>
                                </div>
                                <div className="self-stretch p-3 bg-white rounded-tl-3xl rounded-tr-3xl inline-flex justify-start items-start gap-1">
                                    <div
                                        onClick={() =>
                                            setShowPrivacyPopup(false)
                                        }
                                        className="flex-1 h-16 py-4 bg-pink-600 rounded-3xl inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden cursor-pointer"
                                    >
                                        <div className="justify-start text-white text-base font-semibold font-['Pretendard'] leading-snug">
                                            확인
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
