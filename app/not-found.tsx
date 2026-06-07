import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">页面不存在</p>
        <Link href="/" className="mt-6 inline-block">
          <Button size="lg">返回首页</Button>
        </Link>
      </div>
    </div>
  );
}
