"use client";

import { useEffect } from "react";
import { isTossInApp, setStatusBarStyle, getAppInfo } from "@/lib/tossInApp";

interface TossInAppProviderProps {
    children: React.ReactNode;
}

/**
 * 토스 앱인토스 Provider
 *
 * 토스 인앱 브라우저에서 실행 시 필요한 초기 설정을 수행합니다.
 */
export default function TossInAppProvider({
    children,
}: TossInAppProviderProps) {
    useEffect(() => {
        // 토스 인앱 브라우저에서만 실행
        if (!isTossInApp()) {
            console.log("Not running in Toss in-app browser");
            return;
        }

        console.log("Running in Toss in-app browser");

        // 초기 설정
        const initializeTossInApp = async () => {
            try {
                // 앱 정보 가져오기
                const appInfo = await getAppInfo();
                console.log("Toss App Info:", appInfo);

                // 상태바 스타일 설정 (다크 모드)
                await setStatusBarStyle("dark");

                // 추가 초기화 작업이 필요한 경우 여기에 추가
            } catch (error) {
                console.error("Failed to initialize Toss in-app:", error);
            }
        };

        initializeTossInApp();
    }, []);

    return <>{children}</>;
}
