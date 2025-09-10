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
    title: "LookThru",
    description:
        "LookThru는 AI기반 가상 피팅 서비스입니다. 어울릴지 고민헀던 옷을 직접 가상으로 입어보고 눈으로 확인해보세요.",
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
