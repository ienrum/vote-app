import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
export default async function Home() {
  const { error } = await createClient().auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <>
      <CardTitle>투표 사이트</CardTitle>
      <CardDescription className="mt-4">
        사용자가 간편하게 투표할 수 있도록 돕는 서비스입니다.
      </CardDescription>
      <Link href="/create-vote">
        <Button className="mt-4">투표 생성</Button>
      </Link>
    </>
  );
}
