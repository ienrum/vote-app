import VoteForm from "@/app/_components/VoteForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://vote-app-six.vercel.app/"),
  title: "Simple Voting Web Application",
  description:
    "A simple and intuitive voting web application. Vote and check the results in real-time.",
  keywords: "voting, survey, web application, real-time, simple, intuitive",
  openGraph: {
    title: "Simple Voting Web Application",
    description:
      "A simple and intuitive voting web application. Vote and check the results in real-time.",
    images: [
      {
        url: "/rectangle_og.png",
        alt: "Simple Voting Web Application",
      },
    ],
    url: "https://vote-app-six.vercel.app/",
  },
  twitter: {
    card: "summary",
    title: "Simple Voting Web Application",
    description:
      "A simple and intuitive voting web application. Vote and check the results in real-time.",
    images: [
      {
        url: "/rectangle_og.png",
        alt: "Simple Voting Web Application",
      },
    ],
  },
};

export default async function Home() {
  return <VoteForm />;
}
