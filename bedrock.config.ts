import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "look-thru",

  // 브랜드 설정
  brand: {
    displayName: "Look Thru",
    primaryColor: "#3182F6",
    icon: "https://via.placeholder.com/512",
    bridgeColorMode: "basic",
  },

  // 웹 번들러 설정
  web: {
    host: "localhost",
    port: 3000,
    commands: {
      dev: "npm run dev",
      build: "npm run build",
    },
  },

  // WebView 속성 설정
  webViewProps: {
    type: "partner",
    bounces: true,
    pullToRefreshEnabled: false,
    allowsInlineMediaPlayback: true,
    overScrollMode: "never",
  },

  // 앱 권한 설정 (필요시 추가)
  permissions: [],

  // 빌드 출력 디렉토리
  outdir: ".next",
});
