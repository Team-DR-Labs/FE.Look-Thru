"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function SelectClothes() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0 md:p-8">
            {/* Desktop Frame - 모바일에서는 숨김 */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200">
                <div
                    className="absolute inset-0 opacity-50"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>
            </div>

            {/* Mobile Container */}
            <div className="w-full md:w-96 md:h-[800px] bg-white md:rounded-3xl md:shadow-2xl overflow-hidden relative z-10">
                {/* Mobile Screen Content */}
                <div className="min-h-screen md:min-h-full bg-gradient-to-b from-pink-200 via-pink-300 to-pink-400 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 pt-12 md:pt-8">
                        <button className="p-2">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M15 18L9 12L15 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <div className="text-center">
                            <div className="text-sm text-gray-600 mb-1">
                                착용 & 의상 보정
                            </div>
                            <div className="text-lg font-semibold text-gray-800">
                                어떤 옷을 입혀서 알려주세요
                            </div>
                        </div>
                        <div className="w-8"></div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col items-center justify-center px-8">
                        {/* Upload Area */}
                        <div className="w-full max-w-sm mb-8">
                            {selectedImage ? (
                                <div className="relative w-full aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
                                    <Image
                                        src={selectedImage || ""}
                                        alt="Selected clothing"
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M18 6L6 18M6 6L18 18"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full aspect-square bg-white bg-opacity-30 rounded-2xl border-2 border-dashed border-white border-opacity-60 flex flex-col items-center justify-center">
                                    <div className="text-6xl mb-4">👗</div>
                                    <div className="text-white text-center">
                                        <div className="text-lg font-medium mb-2">
                                            옷 이미지를 업로드하세요
                                        </div>
                                        <div className="text-sm opacity-80">
                                            JPG, PNG 파일을 선택해주세요
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Upload Button */}
                        <button
                            onClick={handleUploadClick}
                            className="w-full max-w-sm bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 px-6 rounded-full transition-colors duration-200 shadow-lg"
                        >
                            📷 이미지 업로드하기
                        </button>

                        {/* Hidden File Input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>

                    {/* Bottom Button */}
                    <div className="p-6">
                        <button
                            className={`w-full py-4 px-6 rounded-full font-semibold transition-all duration-200 ${
                                selectedImage
                                    ? "bg-pink-600 hover:bg-pink-700 text-white shadow-lg"
                                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                            }`}
                            disabled={!selectedImage}
                        >
                            다음 단계로 진행하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
