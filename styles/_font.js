import { Black_Han_Sans, Noto_Sans_Mono } from "next/font/google";

export const notosansRegular = Noto_Sans_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export const notosansMedium = Noto_Sans_Mono({
  subsets: ["latin"],
  weight: ["500"],
});

export const notosansBold = Noto_Sans_Mono({
  subsets: ["latin"],
  weight: ["700"],
});

export const blackHanSans = Black_Han_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-black-han-sans",
});
