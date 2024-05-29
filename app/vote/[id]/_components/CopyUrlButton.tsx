"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CopyUrlButton = () => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }
    try {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2초 후에 다시 false로 설정
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div>
      <Button variant="link" onClick={copyToClipboard}>
        Copy URL
      </Button>
      {copied && <span>Copied!</span>}
    </div>
  );
};

export default CopyUrlButton;
