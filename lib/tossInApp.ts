/**
 * 토스 앱인토스 Bridge 유틸리티
 *
 * 토스 인앱 브라우저에서 네이티브 기능을 사용하기 위한 유틸리티 함수들입니다.
 */

import {
  share,
  generateHapticFeedback,
  type HapticFeedbackType,
  setClipboardText,
  getClipboardText,
  openCamera,
  getTossAppVersion,
  getPlatformOS,
} from '@apps-in-toss/web-bridge';

/**
 * 토스 인앱 브라우저에서 실행 중인지 확인
 */
export function isTossInApp(): boolean {
  if (typeof window === 'undefined') return false;

  const userAgent = window.navigator.userAgent.toLowerCase();
  return userAgent.includes('toss');
}

/**
 * 상태바 스타일 설정
 * Note: 실제 API가 제공되지 않으므로 placeholder 함수입니다.
 */
export async function setStatusBarStyle(style: 'light' | 'dark') {
  try {
    // 실제 API 구현 시 추가
    console.log('Setting status bar style:', style);
  } catch (error) {
    console.error('Failed to set status bar style:', error);
  }
}

/**
 * 클립보드에 텍스트 복사
 */
export async function copyToClipboard(text: string) {
  try {
    await setClipboardText(text);
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    // 폴백: 웹 API 사용
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  }
}

/**
 * 공유하기 기능
 */
export async function shareContent(title: string, text: string, url?: string) {
  try {
    const message = url ? `${text}\n${url}` : text;
    await share({ message });
  } catch (error) {
    console.error('Failed to share content:', error);
    // 폴백: 웹 Share API 사용
    if (navigator.share) {
      await navigator.share({ title, text, url });
    }
  }
}

/**
 * 햅틱 피드백 실행
 */
export async function triggerHaptic(type: 'light' | 'medium' | 'heavy' = 'medium') {
  try {
    const hapticType: HapticFeedbackType =
      type === 'light' ? 'tickWeak' :
      type === 'heavy' ? 'basicMedium' :
      'tap';

    await generateHapticFeedback({ type: hapticType });
  } catch (error) {
    console.error('Failed to trigger haptic:', error);
  }
}

/**
 * 앱 정보 가져오기
 */
export async function getAppInfo() {
  try {
    const version = await getTossAppVersion();
    const platform = await getPlatformOS();
    return { version, platform };
  } catch (error) {
    console.error('Failed to get app info:', error);
    return null;
  }
}

/**
 * 사진 선택하기
 */
export async function pickImage() {
  try {
    const result = await openCamera({});
    return result;
  } catch (error) {
    console.error('Failed to pick image:', error);
    return null;
  }
}

// 기본 export
export const TossInApp = {
  isTossInApp,
  setStatusBarStyle,
  copyToClipboard,
  shareContent,
  triggerHaptic,
  getAppInfo,
  pickImage,
};
