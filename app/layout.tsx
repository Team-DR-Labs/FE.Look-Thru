import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import MixpanelProvider from "@/components/MixpanelProvider";

const pretendard = localFont({
    src: "../public/fonts/Pretendard-Regular.woff2",
    display: "swap",
    weight: "45 920",
    variable: "--font-pretendard",
});

export const metadata: Metadata = {
    title: "Look-Thru",
    description:
        "Look-Thru는 당신의 옷으로 새로운 스타일을 찾아주는 AI 스타일리스트입니다.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={`${pretendard.variable}`}>
            <body>
                <MixpanelProvider>
                    <Toaster />
                    {children}
                </MixpanelProvider>
            </body>
        </html>
    );
}
