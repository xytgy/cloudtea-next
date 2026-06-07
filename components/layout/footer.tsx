import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-stone-50 dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">云栖茗茶</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              源自山野的东方味道
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">商品分类</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/products?category=绿茶"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  绿茶
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=乌龙"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  乌龙茶
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=红茶"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  红茶
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=白茶"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  白茶
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=普洱"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  普洱
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">帮助中心</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="text-sm text-muted-foreground">
                  关于我们
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  配送说明
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  售后服务
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">联系我们</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="text-sm text-muted-foreground">
                  客服电话：400-888-8888
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  工作时间：9:00 - 21:00
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} 云栖茗茶. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
