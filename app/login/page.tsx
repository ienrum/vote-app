"use client";

import { signInWithKakao } from "@/app/apis/auth";
import { Card } from "@/components/ui/card";
import kakoImage from "@/public/kakao_login.png";
import Image from "next/image";

export default function Home() {
  return (
    <Card className="mt-8">
      <h1>일정 투표 사이트</h1>
      <h3 className="mt-4">
        사용자가 간편하게 일정을 조율하고 투표할 수 있도록 돕는 서비스입니다.
      </h3>
      <Image
        src={kakoImage}
        alt="plus"
        className=" cursor-pointer"
        onClick={() => {
          signInWithKakao();
        }}
      />
    </Card>
  );
}
