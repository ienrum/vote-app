import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <h1>일정 투표 사이트</h1>
      <h3 className="mt-4">
        사용자가 간편하게 일정을 조율하고 투표할 수 있도록 돕는 서비스입니다.
      </h3>
      <Link href="/create-vote">
        <Button className="mt-4">투표 생성</Button>
      </Link>
    </>
  );
}
