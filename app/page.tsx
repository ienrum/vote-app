import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
export const metaData: Metadata = {
  metadataBase: new URL("https://vote-app-six.vercel.app/"),
  title: "간단한 투표 웹 애플리케이션",
  description:
    "간단하고 직관적인 투표 웹 애플리케이션입니다. 투표를 하고 실시간으로 결과를 확인하세요.",
  keywords: "투표, 설문조사, 웹 애플리케이션, 실시간, 간단한, 직관적인",
  openGraph: {
    title: "간단한 투표 웹 애플리케이션",
    description:
      "간단하고 직관적인 투표 웹 애플리케이션입니다. 투표를 하고 실시간으로 결과를 확인하세요.",
    images: [
      {
        url: "/rectangle_og.png",
        alt: "간단한 투표 웹 애플리케이션",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "간단한 투표 웹 사이트",
    description:
      "간단하고 직관적인 투표 웹 애플리케이션입니다. 투표를 하고 실시간으로 결과를 확인하세요.",
    images: [
      {
        url: "/rectangle_og.png",
        alt: "간단한 투표 웹 애플리케이션",
      },
    ],
  },
};

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
        <meta property="og:image" content="/rectangle_og.png" />
        <meta property="og:title" content="간단한 투표 웹 사이트" />
        <meta property="og:url" content="https://vote-app-six.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="/rectangle_og.png" />
        <meta name="twitter:title" content="간단한 투표 웹 사이트" />
        <meta
          name="twitter:description"
          content="간단하고 직관적인 투표 웹 애플리케이션입니다. 투표를 하고 실시간으로 결과를 확인하세요."
        />
        <meta name="twitter:image" content="/rectangle_og.png" />
        <meta name="google-adsense-account" content="ca-pub-8930752195122705" />
      </Head>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8930752195122705"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
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
