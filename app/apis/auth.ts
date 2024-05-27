import { createClient } from "@/lib/supabase/client";

export const signInWithKakao = async () => {
  const { data, error } = await createClient().auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
