"use client";

import { signInWithKakao } from "@/app/apis/auth";
import { CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import kakoImage from "@/public/kakao_login.png";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <CardTitle>일정 투표 사이트</CardTitle>
      <CardDescription className="mt-4">
        사용자가 간편하게 일정을 조율하고 투표할 수 있도록 돕는 서비스입니다.
      </CardDescription>
      <Image
        src={kakoImage}
        alt="plus"
        className=" cursor-pointer"
        onClick={() => {
          signInWithKakao();
        }}
      />
    </div>
  );
}
