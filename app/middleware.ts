import voteService from "@/services/vote";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log(request);
  let myId = voteService.getMyId();

  if (!myId) {
    myId = (await voteService.setMyId()).id;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
