import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
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
    url: "https://vote-app-six.vercel.app/",
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
