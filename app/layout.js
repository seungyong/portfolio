import "@/styles/globals.css";
import { notosansRegular } from "@/styles/_font";

export const metadata = {
  title: "백엔드 개발자 김승용",
  description: "백엔드 개발자 김승용을 소개하는 포트폴리오 사이트입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css"
        />
      </head>
      <body className={`${notosansRegular.className}`}>{children}</body>
    </html>
  );
}
