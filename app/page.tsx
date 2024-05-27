import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import Head from "next/head";
import Link from "next/link";
export default async function Home() {
  const { error } = await createClient().auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return (
    <>
      <Head>
        <title>간단한 투표 웹 애플리케이션</title>
        <meta
          name="description"
          content="간단하고 직관적인 투표 웹 애플리케이션입니다. 투표를 하고 실시간으로 결과를 확인하세요."
        />
        <meta
          name="keywords"
          content="투표, 설문조사, 웹 애플리케이션, 실시간, 간단한, 직관적인"
        />
        <meta name="author" content="Your Name or Company" />
        <meta property="og:title" content="간단한 투표 웹 애플리케이션" />
        <meta
          property="og:description"
          content="간단하고 직관적인 투표 웹 애플리케이션입니다. 투표를 하고 실시간으로 결과를 확인하세요."
        />
        <meta property="og:image" content="/kakao_login.png" />
        <meta property="og:url" content="/kakao_login.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="간단한 투표 웹 애플리케이션" />
        <meta
          name="twitter:description"
          content="간단하고 직관적인 투표 웹 애플리케이션입니다. 투표를 하고 실시간으로 결과를 확인하세요."
        />
        <meta
          name="twitter:image"
          content="https://www.example.com/path/to/your/image.jpg"
        />
      </Head>
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
