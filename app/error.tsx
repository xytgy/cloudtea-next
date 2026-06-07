"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground">出错了</h1>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          {error.message || "发生了未知错误，请稍后重试"}
        </p>
        <Button onClick={reset} size="lg" className="mt-6">
          重试
        </Button>
      </div>
    </div>
  );
}
