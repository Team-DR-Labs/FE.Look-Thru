"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useClothesStore } from "../../stores/clothesStore";
import { useRouter } from "next/navigation";

export default function SelectClothes() {
    const {
        topImage,
        bottomImage,
        setTopImage,
        setBottomImage,
        deleteTopImage,
        deleteBottomImage,
    } = useClothesStore();

    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [currentUploadType, setCurrentUploadType] = useState<string | null>(
        null,
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && currentUploadType) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target?.result as string;
                if (currentUploadType === "상의") {
                    setTopImage(imageUrl);
                } else if (currentUploadType === "하의") {
                    setBottomImage(imageUrl);
                }
                setCurrentUploadType(null); // Reset after upload
            };
            reader.readAsDataURL(file);
        }
        // Clear the file input value to allow uploading the same file again
        if (event.target) {
            event.target.value = "";
        }
    };

    const handleTypeSelect = (type: string) => {
        setCurrentUploadType(type);
        setShowPopup(false);
        // Use a timeout to ensure state update and popup close animation starts before file dialog opens
        setTimeout(() => {
            fileInputRef.current?.click();
        }, 300); // Duration should be same as popup close animation
    };

    const handleDeleteCloth = (type: "상의" | "하의") => {
        if (type === "상의") {
            deleteTopImage();
        } else {
            deleteBottomImage();
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const clothesTypes = [
        { 
            name: "상의", 
            emoji: (
                <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_18_792)">
                        <path d="M28.71 10.4198V4.58601C28.71 4.06851 28.2906 3.64911 27.7731 3.64911H24.4188C23.9013 3.64911 23.4819 4.06851 23.4819 4.58601V5.50671C23.4819 8.50911 21.1689 11.1263 18.1683 11.2172C15.0633 11.3108 12.5172 8.82141 12.5172 5.73711V4.58691C12.5172 4.06941 12.0978 3.65001 11.5803 3.65001H8.22603C7.70853 3.65001 7.28913 4.06941 7.28913 4.58691V10.4207C7.28913 12.3134 6.80943 13.982 6.08043 14.9666C5.15253 16.2203 4.54773 17.681 4.54773 19.2407V31.4771C4.54773 32.5121 5.38653 33.35 6.42063 33.35H29.5767C30.6117 33.35 31.4496 32.5112 31.4496 31.4771V19.2407C31.4496 17.681 30.8448 16.2203 29.9169 14.9666C29.1879 13.9811 28.7082 12.3125 28.7082 10.4207L28.71 10.4198Z" fill="#93C9FF"/>
                        <path d="M28.71 10.3766V4.58601C28.71 4.06851 28.2906 3.64911 27.7731 3.64911H26.1027C24.3585 19.4216 15.3603 31.4762 4.54858 31.4762C4.54858 32.5103 5.38738 33.3491 6.42148 33.3491H12.5631C20.0907 29.741 26.0811 21.2018 28.71 10.3757V10.3766Z" fill="#4D9DFF"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_18_792">
                            <rect width="36" height="36" fill="white" transform="translate(0 0.5)"/>
                        </clipPath>
                    </defs>
                </svg>
            ), 
            desc: "반팔, 롱슬리브, 맨투맨, 후드티 등..." 
        },
        { 
            name: "하의", 
            emoji: (
                <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_18_801)">
                        <path d="M18.468 16.6919L19.8999 34.25H28.7118V3.5033C28.7118 3.0875 28.3743 2.75 27.9585 2.75H8.04236C7.62656 2.75 7.28906 3.0875 7.28906 3.5033V34.25H16.101L17.5329 16.6919H18.468Z" fill="#466CFB"/>
                        <path d="M7.28912 34.25H16.1001L16.4817 29.5763H7.28912V34.25Z" fill="#7D9DFF"/>
                        <path d="M28.7109 34.25H19.8999L19.5183 29.5763H28.7109V34.25Z" fill="#7D9DFF"/>
                        <path d="M8.04236 2.75H27.9576C28.3734 2.75 28.7109 3.0875 28.7109 3.5033V5.9234H7.28906V3.5033C7.28906 3.0875 7.62656 2.75 8.04236 2.75Z" fill="#3E5AF4"/>
                        <path d="M11.2464 5.92432V7.88542C11.2464 10.0715 9.47431 11.8436 7.28821 11.8436V5.92432H11.2464Z" fill="#5D7EFB"/>
                        <path d="M24.7536 5.92432V7.88542C24.7536 10.0715 26.5257 11.8436 28.7118 11.8436V5.92432H24.7536Z" fill="#5D7EFB"/>
                        <path d="M16.4304 5.92432H18.4266V14.9153C17.325 14.9153 16.4304 14.0207 16.4304 12.9191V5.92432Z" fill="#7D9DFF"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_18_801">
                            <rect width="36" height="36" fill="white" transform="translate(0 0.5)"/>
                        </clipPath>
                    </defs>
                </svg>
            ), 
            desc: "반바지, 긴바지, 스커트 등..." 
        },
    ];

    const uploadedClothes = [];
    if (topImage) uploadedClothes.push({ type: "상의", image: topImage });
    if (bottomImage) uploadedClothes.push({ type: "하의", image: bottomImage });

    const hasTop = !!topImage;
    const hasBottom = !!bottomImage;
    const isFull = hasTop && hasBottom;

    const handleAddClick = () => {
        if (isFull) {
            toast.error("상의, 하의 하나씩만 선택할 수 있어요");
        } else {
            setShowPopup(true);
        }
    };

    return (
        <div className="h-full bg-gray-100 flex items-center justify-center p-0 md:p-8">
            {/* Desktop Frame - 모바일에서는 숨김 */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200">
                <div
                    className="absolute inset-0 opacity-50"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>
            </div>

            {/* Mobile Container - Responsive Design */}
            <div className="w-full h-full md:w-96 md:h-[852px] bg-[radial-gradient(ellipse_100.00%_100.00%_at_50.00%_100.00%,_#FFC4E6_0%,_white_100%)] md:rounded-[56px] overflow-hidden relative z-10 flex flex-col">
                {/* Back Button */}
                <div className="px-4 py-4 pt-8 md:pt-4">
                    <button className="p-2">
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
                <div className="px-4 py-2 flex flex-col justify-center items-center gap-1">
                    <div className="inline-flex justify-center items-center gap-1">
                        <div className="opacity-70 text-center justify-start text-pink-600 text-base font-medium font-['Pretendard'] leading-snug">
                            입을 옷 선택
                        </div>
                        <svg
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <mask
                                id="mask0_18_309"
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
                            <g mask="url(#mask0_18_309)">
                                <path
                                    opacity="0.7"
                                    d="M5.91667 8.42791L4.7548 9.07041C4.57646 9.17083 4.39216 9.19729 4.20188 9.14979C4.01174 9.10229 3.86646 8.9893 3.76605 8.81083L2.42 6.45521C2.31959 6.27673 2.29313 6.09111 2.34063 5.89833C2.38813 5.70541 2.50112 5.55875 2.67959 5.45833L7.05459 2.91666H8.28855C8.42952 2.91666 8.54223 2.95889 8.62667 3.04333C8.71098 3.12778 8.75313 3.24048 8.75313 3.38146V3.67C8.75313 4.1443 8.9257 4.55402 9.27084 4.89916C9.61598 5.24416 10.0257 5.41666 10.5 5.41666C10.9743 5.41666 11.384 5.24416 11.7292 4.89916C12.0743 4.55402 12.2469 4.1443 12.2469 3.67V3.38146C12.2469 3.24048 12.289 3.12778 12.3733 3.04333C12.4578 2.95889 12.5705 2.91666 12.7115 2.91666H13.9454L18.3204 5.45833C18.4989 5.55875 18.6119 5.70541 18.6594 5.89833C18.7069 6.09111 18.6804 6.27673 18.58 6.45521L17.234 8.81083C17.1335 8.9893 16.9904 9.10014 16.8044 9.14333C16.6185 9.18666 16.4322 9.15812 16.2452 9.05771L15.0833 8.44062V16.346C15.0833 16.5555 15.0128 16.7307 14.8717 16.8717C14.7307 17.0128 14.5555 17.0833 14.346 17.0833H6.65396C6.44452 17.0833 6.26931 17.0128 6.12834 16.8717C5.98723 16.7307 5.91667 16.5555 5.91667 16.346V8.42791ZM7.16667 6.33333V15.8333H13.8333V6.33333L16.4006 7.74208L17.2596 6.29166L13.6844 4.19229H13.4198C13.2916 4.89534 12.9594 5.48347 12.4231 5.95666C11.8867 6.43 11.2457 6.66666 10.5 6.66666C9.75431 6.66666 9.11327 6.43 8.57688 5.95666C8.04063 5.48347 7.70841 4.89534 7.58021 4.19229H7.31563L3.74042 6.29166L4.59938 7.74208L7.16667 6.33333Z"
                                    fill="#E20181"
                                />
                            </g>
                        </svg>
                    </div>
                    <div className="text-center justify-start text-stone-900 text-2xl font-semibold font-['Pretendard'] leading-7">
                        어떤 옷을 입힐지 알려주세요
                    </div>
                    <div className="text-center justify-start text-black/70 text-base font-medium font-['Pretendard'] leading-snug">
                        되도록 옷만 있는 사진을 선택해주세요!
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-5 pt-8 flex flex-col justify-start items-center gap-6">
                    {uploadedClothes.length > 0 ? (
                        <>
                            {/* 옷 추가하기 버튼 */}
                            {!isFull && (
                                <button
                                    onClick={handleAddClick}
                                    className="pl-4 pr-5 py-2.5 bg-white/70 rounded-[100px] outline outline-2 outline-offset-[-2px] outline-white inline-flex justify-center items-center gap-1.5 hover:bg-white/80 transition-colors"
                                >
                                    <svg
                                        width="21"
                                        height="20"
                                        viewBox="0 0 21 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7.16667 6.33333V15.8333H13.8333V6.33333L16.4006 7.74208L17.2596 6.29166L13.6844 4.19229H13.4198C13.2916 4.89534 12.9594 5.48347 12.4231 5.95666C11.8867 6.43 11.2457 6.66666 10.5 6.66666C9.75431 6.66666 9.11327 6.43 8.57688 5.95666C8.04063 5.48347 7.70841 4.89534 7.58021 4.19229H7.31563L3.74042 6.29166L4.59938 7.74208L7.16667 6.33333Z"
                                            fill="black"
                                            fillOpacity="0.5"
                                        />
                                    </svg>

                                    <div className="text-center text-black/50 text-sm font-medium font-['Pretendard'] leading-tight">
                                        옷 추가하기
                                    </div>
                                </button>
                            )}

                            {/* 업로드된 옷 목록 */}
                            <div className="w-full grid grid-cols-2 gap-4">
                                {uploadedClothes.map((cloth) => (
                                    <div
                                        key={cloth.type}
                                        className="relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden"
                                    >
                                        <Image
                                            src={cloth.image}
                                            alt={cloth.type}
                                            fill
                                            className="object-cover"
                                        />
                                        {/* 종류 태그 */}
                                        <div className="absolute top-2 left-2 bg-gray-100 bg-opacity-80 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">
                                            {cloth.type}
                                        </div>
                                        {/* 삭제 버튼 */}
                                        <button
                                            onClick={() =>
                                                handleDeleteCloth(
                                                    cloth.type as
                                                        | "상의"
                                                        | "하의",
                                                )
                                            }
                                            className="absolute top-2 right-2 bg-red-500 bg-opacity-80 text-white rounded-full p-1.5"
                                        >
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                stroke="white"
                                                strokeWidth="2"
                                            >
                                                <path d="M3 6h18m-2 0v14c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V6m3 0V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        // 초기 업로드 화면
                        <div
                            onClick={() => setShowPopup(true)}
                            className="w-96 py-6 bg-white/50 rounded-2xl outline outline-4 outline-offset-[-4px] outline-white inline-flex flex-col justify-center items-center gap-4 overflow-hidden cursor-pointer"
                        >
                            <svg
                                width="49"
                                height="48"
                                viewBox="0 0 49 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <mask
                                    id="mask0_18_873"
                                    style={{ maskType: "alpha" }}
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="49"
                                    height="48"
                                >
                                    <rect
                                        x="0.5"
                                        width="48"
                                        height="48"
                                        fill="#D9D9D9"
                                    />
                                </mask>
                                <g mask="url(#mask0_18_873)">
                                    <path
                                        d="M6.99995 39C6.57495 39 6.21879 38.857 5.93145 38.571C5.64379 38.285 5.49995 37.9305 5.49995 37.5075C5.49995 37.2588 5.55062 37.0275 5.65195 36.8135C5.75329 36.5995 5.90529 36.4297 6.10795 36.304L23 23.731V20.1925C23 19.7675 23.1493 19.4112 23.448 19.1235C23.7466 18.8362 24.1076 18.6925 24.531 18.6925C25.454 18.6925 26.2405 18.3603 26.8905 17.696C27.5405 17.0313 27.8655 16.2377 27.8655 15.315C27.8655 14.3923 27.5401 13.6092 26.8895 12.9655C26.2388 12.3218 25.4486 12 24.519 12C23.596 12 22.8043 12.3235 22.144 12.9705C21.484 13.6172 21.154 14.4027 21.154 15.327H18.154C18.154 13.573 18.7731 12.08 20.0115 10.848C21.2501 9.616 22.7526 9 24.519 9C26.2856 9 27.7851 9.611 29.0175 10.833C30.2495 12.0547 30.8655 13.5488 30.8655 15.3155C30.8655 16.8052 30.4135 18.1187 29.5095 19.256C28.6058 20.393 27.436 21.1372 26 21.4885V23.731L42.9115 36.304C43.1141 36.4287 43.266 36.5972 43.367 36.8095C43.4683 37.0215 43.519 37.2523 43.519 37.502C43.519 37.9263 43.3753 38.282 43.088 38.569C42.8003 38.8563 42.444 39 42.019 39H6.99995ZM11.5385 36H37.481L24.5 26.3655L11.5385 36Z"
                                        fill="black"
                                        fillOpacity="0.5"
                                    />
                                </g>
                            </svg>
                            <div className="text-center justify-start text-black/50 text-base font-medium font-['Pretendard'] leading-snug">
                                여기를 클릭하여 <br />
                                입힐 옷들을 업로드해주세요
                            </div>
                        </div>
                    )}
                    {/* Hidden File Input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>

                {/* Bottom Navigation */}
                <div className="self-stretch p-4 bg-white rounded-tl-3xl rounded-tr-3xl inline-flex justify-start items-start gap-1">
                    <button
                        onClick={() => router.back()}
                        className="w-16 self-stretch bg-zinc-100 rounded-tl-[100px] rounded-tr-xl rounded-bl-[100px] rounded-br-xl flex justify-center items-center gap-2.5"
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
                    </button>
                    <button
                        onClick={() => {
                            if (uploadedClothes.length > 0) {
                                router.push("/select-photo");
                            }
                        }}
                        className={`flex-1 h-16 py-4 rounded-tl-xl rounded-tr-[100px] rounded-bl-xl rounded-br-[100px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden transition-colors ${
                            uploadedClothes.length > 0
                                ? "bg-[#E20181] cursor-pointer"
                                : "bg-[#AA8B9C] cursor-not-allowed"
                        }`}
                        disabled={uploadedClothes.length === 0}
                    >
                        <div className="justify-start text-white text-base font-semibold font-['Pretendard'] leading-snug">
                            {uploadedClothes.length > 0
                                ? "다음"
                                : "하나 이상 업로드해주세요"}
                        </div>
                    </button>
                </div>
            </div>

            {/* 종류 선택 팝업 */}
            {showPopup && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm md:items-center"
                    onClick={closePopup}
                >
                    {/* 팝업 컨텐츠 */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`relative w-full md:w-96 bg-white rounded-t-3xl md:rounded-3xl transform transition-transform duration-300 ${
                            showPopup ? "translate-y-0" : "translate-y-full"
                        }`}
                    >
                        {/* 핸들 바 (모바일용) */}
                        <div className="w-full flex justify-center pt-3 pb-2 md:hidden">
                            <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
                        </div>

                        {/* 팝업 헤더 */}
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 font-['Pretendard']">
                                종류 선택
                            </h3>
                        </div>

                        {/* 옷 종류 목록 */}
                        <div className="px-6 py-6">
                            <div className="space-y-4">
                                {clothesTypes.map((item) => {
                                    const isUploaded =
                                        (item.name === "상의" && hasTop) ||
                                        (item.name === "하의" && hasBottom);
                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() =>
                                                !isUploaded &&
                                                handleTypeSelect(item.name)
                                            }
                                            disabled={isUploaded}
                                            className={`w-full p-4 rounded-2xl border-2 transition-all ${
                                                isUploaded
                                                    ? "border-gray-200 bg-gray-100 cursor-not-allowed"
                                                    : "border-gray-200 bg-white hover:border-pink-200 hover:bg-pink-50"
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`text-3xl ${
                                                        isUploaded
                                                            ? "opacity-50"
                                                            : ""
                                                    }`}
                                                >
                                                    {item.emoji}
                                                </div>
                                                <div
                                                    className={`flex-1 text-left ${
                                                        isUploaded
                                                            ? "opacity-50"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="font-semibold text-gray-900 font-['Pretendard']">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 font-['Pretendard']">
                                                        {item.desc}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
