"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useClothesStore } from "../../stores/clothesStore";
import { useRouter } from "next/navigation";
import { Mixpanel } from "@/lib/mixpanel";

export default function SelectClothes() {
    const {
        topImage,
        bottomImage,
        hatImage,
        outerwearImage,
        shoesImage,
        setTopImage,
        setBottomImage,
        setHatImage,
        setOuterwearImage,
        setShoesImage,
        deleteTopImage,
        deleteBottomImage,
        deleteHatImage,
        deleteOuterwearImage,
        deleteShoesImage,
    } = useClothesStore();

    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [currentUploadType, setCurrentUploadType] = useState<string | null>(
        null,
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        Mixpanel.track("select-clothes 의상 업로드");
        const file = event.target.files?.[0];
        if (file && currentUploadType) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target?.result as string;
                if (currentUploadType === "상의") {
                    setTopImage(imageUrl);
                    Mixpanel.track("select-clothes 상의 업로드");
                } else if (currentUploadType === "하의") {
                    setBottomImage(imageUrl);
                    Mixpanel.track("select-clothes 하의 업로드");
                } else if (currentUploadType === "모자") {
                    setHatImage(imageUrl);
                    Mixpanel.track("select-clothes 모자 업로드");
                } else if (currentUploadType === "아우터") {
                    setOuterwearImage(imageUrl);
                    Mixpanel.track("select-clothes 아우터 업로드");
                } else if (currentUploadType === "신발") {
                    setShoesImage(imageUrl);
                    Mixpanel.track("select-clothes 신발 업로드");
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

    const handleDeleteCloth = (
        type: "상의" | "하의" | "모자" | "아우터" | "신발",
    ) => {
        if (type === "상의") {
            deleteTopImage();
            Mixpanel.track("상의 삭제");
        } else if (type === "하의") {
            deleteBottomImage();
            Mixpanel.track("하의 삭제");
        } else if (type === "모자") {
            deleteHatImage();
            Mixpanel.track("모자 삭제");
        } else if (type === "아우터") {
            deleteOuterwearImage();
            Mixpanel.track("아우터 삭제");
        } else if (type === "신발") {
            deleteShoesImage();
            Mixpanel.track("신발 삭제");
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const clothesTypes = [
        {
            name: "상의",
            emoji: (
                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_180_5793)">
                    <path d="M28.96 9.91981V4.08601C28.96 3.56851 28.5406 3.14911 28.0231 3.14911H24.6688C24.1513 3.14911 23.7319 3.56851 23.7319 4.08601V5.00671C23.7319 8.00911 21.4189 10.6263 18.4183 10.7172C15.3133 10.8108 12.7672 8.32141 12.7672 5.23711V4.08691C12.7672 3.56941 12.3478 3.15001 11.8303 3.15001H8.476C7.9585 3.15001 7.5391 3.56941 7.5391 4.08691V9.92071C7.5391 11.8134 7.0594 13.482 6.3304 14.4666C5.4025 15.7203 4.7977 17.181 4.7977 18.7407V30.9771C4.7977 32.0121 5.6365 32.85 6.6706 32.85H29.8267C30.8617 32.85 31.6996 32.0112 31.6996 30.9771V18.7407C31.6996 17.181 31.0948 15.7203 30.1669 14.4666C29.4379 13.4811 28.9582 11.8125 28.9582 9.92071L28.96 9.91981Z" fill="#93C9FF"/>
                    <path d="M28.96 9.87661V4.08601C28.96 3.56851 28.5406 3.14911 28.0231 3.14911H26.3527C24.6085 18.9216 15.6103 30.9762 4.79855 30.9762C4.79855 32.0103 5.63735 32.8491 6.67145 32.8491H12.8131C20.3407 29.241 26.3311 20.7018 28.96 9.87571V9.87661Z" fill="#4D9DFF"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_180_5793">
                    <rect width="36" height="36" fill="white" transform="translate(0.25)"/>
                    </clipPath>
                    </defs>
                </svg>
            ),
        },
        {
            name: "하의",
            emoji: (
                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_180_5800)">
<path d="M19.218 16.1919L20.6499 33.75H29.4618V3.0033C29.4618 2.5875 29.1243 2.25 28.7085 2.25H8.79236C8.37656 2.25 8.03906 2.5875 8.03906 3.0033V33.75H16.851L18.2829 16.1919H19.218Z" fill="#466CFB"/>
<path d="M8.03912 33.75H16.8501L17.2317 29.0763H8.03912V33.75Z" fill="#7D9DFF"/>
<path d="M29.4609 33.75H20.6499L20.2683 29.0763H29.4609V33.75Z" fill="#7D9DFF"/>
<path d="M8.79236 2.25H28.7076C29.1234 2.25 29.4609 2.5875 29.4609 3.0033V5.4234H8.03906V3.0033C8.03906 2.5875 8.37656 2.25 8.79236 2.25Z" fill="#3E5AF4"/>
<path d="M11.9964 5.42432V7.38542C11.9964 9.57152 10.2243 11.3436 8.03821 11.3436V5.42432H11.9964Z" fill="#5D7EFB"/>
<path d="M25.5036 5.42432V7.38542C25.5036 9.57152 27.2757 11.3436 29.4618 11.3436V5.42432H25.5036Z" fill="#5D7EFB"/>
<path d="M17.1804 5.42432H19.1766V14.4153C18.075 14.4153 17.1804 13.5207 17.1804 12.4191V5.42432Z" fill="#7D9DFF"/>
</g>
<defs>
<clipPath id="clip0_180_5800">
<rect width="36" height="36" fill="white" transform="translate(0.75)"/>
</clipPath>
</defs>
</svg>

            ),
        },
        {
            name: "모자",
            emoji: (
                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_180_5813)">
<path d="M18.1667 7.10639C19.6603 7.10639 20.8712 6.42219 20.8712 5.57819C20.8712 4.73419 19.6603 4.04999 18.1667 4.04999C16.673 4.04999 15.4622 4.73419 15.4622 5.57819C15.4622 6.42219 16.673 7.10639 18.1667 7.10639Z" fill="#104BE0"/>
<path d="M18.1666 5.42432C5.90324 5.42432 2.91524 15.4773 2.19074 20.061C1.98104 21.3894 2.42114 22.7349 3.38954 23.6691L18.1666 22.4226L32.9437 23.6691C33.9121 22.7358 34.3531 21.3903 34.1425 20.061C33.418 15.4773 30.4309 5.42432 18.1666 5.42432Z" fill="#2F81F9"/>
<path d="M4.69453 22.5234L4.18423 22.6548C3.60643 22.8033 3.20233 23.3244 3.20233 23.9211L3.65953 27.2016C4.12033 30.5028 7.38373 32.6412 10.594 31.7457L13.1509 31.032C16.4314 30.1167 19.9 30.1167 23.1814 31.032L25.7383 31.7457C28.9486 32.6412 32.2129 30.5028 32.6728 27.2016L33.13 23.9211C33.13 23.3244 32.7259 22.8033 32.1481 22.6548L31.6378 22.5234C22.7998 20.2536 13.5325 20.2536 4.69453 22.5234Z" fill="#1033E0"/>
</g>
<defs>
<clipPath id="clip0_180_5813">
<rect width="36" height="36" fill="white" transform="translate(0.166656)"/>
</clipPath>
</defs>
</svg>

            ),
        },
        {
            name: "아우터",
            emoji: (
                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_180_5821)">
<path d="M28.7978 9.7443C27.8177 6.6789 24.9692 4.599 21.7517 4.599H15.2483C12.0308 4.599 9.18233 6.6789 8.20223 9.7443L3.20363 30.9645C3.11183 31.3542 3.35753 31.743 3.74903 31.8276L7.66853 32.6727C8.05463 32.7555 8.43443 32.5107 8.51813 32.1246L11.5493 18.1152L12.5024 22.5522L10.7258 32.5692C10.6583 32.9499 10.9508 33.2991 11.3378 33.2991H25.6622C26.0492 33.2991 26.3417 32.9499 26.2742 32.5692L24.4976 22.5522L25.4507 18.1152L28.3244 32.1201C28.4036 32.508 28.7834 32.7573 29.1713 32.6763L33.2447 31.824C33.638 31.7421 33.8864 31.3515 33.7946 30.96L28.7969 9.7434L28.7978 9.7443Z" fill="#E6A400"/>
<path d="M22.4663 3.00961C22.2323 2.81881 21.9407 2.70001 21.6239 2.70001H15.3788C15.0611 2.70001 14.7695 2.81791 14.5364 3.00961L18.5018 11.3976L22.4672 3.00961H22.4663Z" fill="#DF9F00"/>
<path d="M18.501 11.3976L14.5356 3.00958C14.3358 3.17248 14.1774 3.38668 14.0973 3.64498L12.4602 8.93608C12.3846 9.18088 12.5673 9.42928 12.8238 9.42928H15.0522L13.0605 11.4156C12.8814 11.5938 12.9228 11.8935 13.1433 12.0168L17.1465 14.2623L18.501 11.3976Z" fill="#AD7800"/>
<path d="M24.5409 8.93523L22.9038 3.64413C22.8237 3.38583 22.6644 3.17163 22.4655 3.00873L18.5001 11.3967L17.1456 14.2614L16.1682 16.3296L23.8578 12.0159C24.0783 11.8926 24.1188 11.5929 23.9406 11.4147L21.9489 9.42843H24.1773C24.4338 9.42843 24.6165 9.18003 24.5409 8.93523Z" fill="#AD7800"/>
<path d="M15.809 19.9998C16.3106 19.9998 16.7171 19.5932 16.7171 19.0917C16.7171 18.5902 16.3106 18.1836 15.809 18.1836C15.3075 18.1836 14.9009 18.5902 14.9009 19.0917C14.9009 19.5932 15.3075 19.9998 15.809 19.9998Z" fill="#B87F00"/>
<path d="M21.5573 19.9998C22.0589 19.9998 22.4654 19.5932 22.4654 19.0917C22.4654 18.5902 22.0589 18.1836 21.5573 18.1836C21.0558 18.1836 20.6492 18.5902 20.6492 19.0917C20.6492 19.5932 21.0558 19.9998 21.5573 19.9998Z" fill="#B87F00"/>
<path d="M15.809 28.044C16.3106 28.044 16.7171 27.6375 16.7171 27.1359C16.7171 26.6344 16.3106 26.2278 15.809 26.2278C15.3075 26.2278 14.9009 26.6344 14.9009 27.1359C14.9009 27.6375 15.3075 28.044 15.809 28.044Z" fill="#B87F00"/>
<path d="M21.5573 28.044C22.0589 28.044 22.4654 27.6375 22.4654 27.1359C22.4654 26.6344 22.0589 26.2278 21.5573 26.2278C21.0558 26.2278 20.6492 26.6344 20.6492 27.1359C20.6492 27.6375 21.0558 28.044 21.5573 28.044Z" fill="#B87F00"/>
<path d="M18.501 11.3976L16.1682 13.7142L17.1465 14.2623L18.501 11.3976Z" fill="#875E00"/>
<path d="M24.6623 21.8538H12.353V23.4756H24.6623V21.8538Z" fill="#B87F00"/>
</g>
<defs>
<clipPath id="clip0_180_5821">
<rect width="36" height="36" fill="white" transform="translate(0.5)"/>
</clipPath>
</defs>
</svg>

            ),
        },
        {
            name: "신발",
            emoji: (
                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_180_5836)">
<path d="M4.42429 24.7293C3.44329 24.7293 2.68639 23.8644 2.81599 22.8924L4.52059 10.1331C4.66279 9.07111 5.93989 8.60401 6.73369 9.32311C13.2137 15.1974 17.8757 9.09181 17.8757 9.09181L33.0704 20.538C34.703 21.7674 35.6048 23.7375 35.4698 25.7769L35.468 25.8084L4.42429 24.7293Z" fill="#CCDFE3"/>
<path d="M17.8757 9.09811L14.7617 7.04431C14.7617 7.04431 12.9122 9.49501 14.2676 11.583C14.2676 11.583 15.8219 11.4174 17.8757 9.09811Z" fill="#4E7698"/>
<path d="M18.9395 16.155C19.6172 16.7436 20.6441 16.6707 21.2327 15.993L23.5142 13.3641L20.9537 11.4183L18.7766 13.8618C18.188 14.5395 18.2618 15.5664 18.9395 16.155Z" fill="#4E7698"/>
<path d="M23.7257 18.5049C24.4034 19.0935 25.4303 19.0206 26.0189 18.3429L27.6506 16.4628L25.0478 14.5017L23.5637 16.2117C22.9751 16.8894 23.048 17.9163 23.7257 18.5049Z" fill="#4E7698"/>
<path d="M3.95359 28.9557H32.4017C34.1657 28.9557 35.5103 27.4914 35.468 25.8084L2.84929 22.7592L2.19949 26.9514C2.05729 28.0125 2.88259 28.9557 3.95359 28.9557Z" fill="#4E7698"/>
<path d="M3.617 17.0092C3.617 17.0092 8.6552 18.8677 9.3023 23.3632L2.8493 22.7602L3.6179 17.0101L3.617 17.0092Z" fill="#7B9FC2"/>
</g>
<defs>
<clipPath id="clip0_180_5836">
<rect width="36" height="36" fill="white" transform="translate(0.833313)"/>
</clipPath>
</defs>
</svg>

            ),
        },
    ];

    const uploadedClothes = [];
    if (topImage) uploadedClothes.push({ type: "상의", image: topImage });
    if (bottomImage) uploadedClothes.push({ type: "하의", image: bottomImage });
    if (hatImage) uploadedClothes.push({ type: "모자", image: hatImage });
    if (outerwearImage)
        uploadedClothes.push({ type: "아우터", image: outerwearImage });
    if (shoesImage) uploadedClothes.push({ type: "신발", image: shoesImage });

    const hasTop = !!topImage;
    const hasBottom = !!bottomImage;
    const hasHat = !!hatImage;
    const hasOuterwear = !!outerwearImage;
    const hasShoes = !!shoesImage;

    const handleAddClick = () => {
        setShowPopup(true);
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
                {/* Header */}
                <div className="mt-20 px-4 py-2 flex flex-col justify-center items-center gap-1">
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
                    <div className="text-center justify-start text-black/50 text-base font-medium font-['Pretendard'] leading-snug">
                        되도록 옷만 있는 사진을 선택해주세요!
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-5 pt-8 flex flex-col justify-start items-center gap-6">
                    {uploadedClothes.length > 0 ? (
                        <>
                            {/* 옷 추가하기 버튼 */}
                            {uploadedClothes.length < 5 && (
                                <button
                                    onClick={handleAddClick}
                                    className="pl-4 pr-5 py-2.5 bg-white/70 rounded-[100px] outline-2 outline-offset-[-2px] outline-white inline-flex justify-center items-center gap-1.5 hover:bg-white/80 transition-colors"
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
                                                        | "하의"
                                                        | "모자"
                                                        | "아우터"
                                                        | "신발",
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
                            className="w-86 py-6 bg-white/50 rounded-2xl outline-4 outline-offset-[-4px] outline-white inline-flex flex-col justify-center items-center gap-4 overflow-hidden cursor-pointer"
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
                                Mixpanel.track("select-clothes 넘어감", {
                                    topImage: !!topImage,
                                    bottomImage: !!bottomImage,
                                });
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
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`relative w-full md:w-96 bg-white rounded-t-3xl md:rounded-3xl transform transition-transform duration-300 ${
                            showPopup ? "translate-y-0" : "translate-y-full"
                        }`}
                    >
                        <div className="w-full flex justify-center pt-3 pb-2 md:hidden">
                            <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
                        </div>

                        <div className="self-stretch px-4 py-3 inline-flex justify-start items-center gap-2.5">
                            <div className="text-center justify-start text-stone-900 text-lg font-semibold font-['Pretendard'] leading-relaxed">
                                종류 선택
                            </div>
                        </div>
                        <div className="w-full px-3 py-2 flex flex-col justify-center items-start gap-2">
                            <div className="self-stretch inline-flex justify-start items-start gap-2">
                                {clothesTypes.slice(0, 2).map((item) => {
                                    const isUploaded =
                                        (item.name === "상의" && hasTop) ||
                                        (item.name === "하의" && hasBottom);
                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => {
                                                if (isUploaded) return;
                                                if (uploadedClothes.length >= 3) {
                                                    toast.error(
                                                        "최대 3개까지만 함께 입어볼 수 있어요",
                                                    );
                                                    return;
                                                }
                                                setCurrentUploadType(item.name);
                                                fileInputRef.current?.click();
                                                setShowPopup(false);
                                            }}
                                            disabled={isUploaded}
                                            className={`flex-1 p-4 rounded-xl inline-flex flex-col justify-center items-center gap-1 transition-colors ${
                                                isUploaded
                                                    ? "bg-gray-200 cursor-not-allowed"
                                                    : "bg-zinc-100 hover:bg-pink-50"
                                            }`}
                                        >
                                            <div
                                                className={`w-9 h-9 relative overflow-hidden ${
                                                    isUploaded
                                                        ? "opacity-50"
                                                        : ""
                                                }`}
                                            >
                                                {item.emoji}
                                            </div>
                                            <div
                                                className={`justify-start text-base font-medium font-['Pretendard'] leading-snug ${
                                                    isUploaded
                                                        ? "text-gray-400"
                                                        : "text-stone-900"
                                                }`}
                                            >
                                                {item.name}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="self-stretch inline-flex justify-start items-start gap-2">
                                {clothesTypes.slice(2, 5).map((item) => {
                                    const isUploaded =
                                        (item.name === "모자" && hasHat) ||
                                        (item.name === "아우터" && hasOuterwear) ||
                                        (item.name === "신발" && hasShoes);
                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => {
                                                if (isUploaded) return;
                                                if (uploadedClothes.length >= 3) {
                                                    toast.error(
                                                        "최대 3개까지만 함께 입어볼 수 있어요",
                                                    );
                                                    return;
                                                }
                                                setCurrentUploadType(item.name);
                                                fileInputRef.current?.click();
                                                setShowPopup(false);
                                            }}
                                            disabled={isUploaded}
                                            className={`flex-1 p-4 rounded-xl inline-flex flex-col justify-center items-center gap-1 transition-colors ${
                                                isUploaded
                                                    ? "bg-gray-200 cursor-not-allowed"
                                                    : "bg-zinc-100 hover:bg-pink-50"
                                            }`}
                                        >
                                            <div
                                                className={`w-9 h-9 relative overflow-hidden ${
                                                    isUploaded
                                                        ? "opacity-50"
                                                        : ""
                                                }`}
                                            >
                                                {item.emoji}
                                            </div>
                                            <div
                                                className={`justify-start text-base font-medium font-['Pretendard'] leading-snug ${
                                                    isUploaded
                                                        ? "text-gray-400"
                                                        : "text-stone-900"
                                                }`}
                                            >
                                                {item.name}
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
