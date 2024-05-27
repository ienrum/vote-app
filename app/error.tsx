"use client"; // Error components must be Client Components

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    if (
      (error && error.message === "User not found") ||
      error.message === "Auth session missing!"
    ) {
      // Redirect to the login page if the user is not found
      window.location.href = "/login";
    }
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      <button onClick={() => router.push("/")}>go to home</button>
    </div>
  );
}
