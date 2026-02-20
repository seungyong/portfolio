import "@/styles/globals.css";
import { notosansRegular } from "@/styles/_font";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "lucide-react";

import Main from "./Main.js";
import TroubleShooting from "./TroubleShooting.js";

export const metadata = {
  title: "백엔드 개발자 김승용",
  description: "백엔드 개발자 김승용을 소개하는 포트폴리오 사이트입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="dark">
      <body className={`${notosansRegular.className}`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/trouble-shooting" element={<TroubleShooting />} />
          </Routes>
        </BrowserRouter>
      </body>
    </html>
  );
}
