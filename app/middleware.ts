import voteService from "@/services/vote";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const myId = voteService.getMyId();

  if (!myId) {
    await voteService.setMyId();
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/vote/:path*",
};
