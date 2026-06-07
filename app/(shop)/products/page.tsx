import Link from "next/link";
import { Search } from "lucide-react";
import { getProductsApi } from "@/lib/api/products";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";

const CATEGORIES = ["全部", "绿茶", "乌龙", "红茶", "白茶", "普洱"];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; keyword?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "";
  const keyword = params.keyword || "";

  let products: Product[] = [];
  try {
    const result = await getProductsApi({
      category: category || undefined,
      keyword: keyword || undefined,
      pageSize: 50,
    });
    if (result.code === 0 && result.data) {
      products = result.data.list || [];
    }
  } catch {
    products = [];
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 to-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              云栖茗茶
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              源自山野的东方味道
            </p>
            <form action="/products" method="get" className="mt-8">
              <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
                <Search className="size-4 text-muted-foreground" />
                <input
                  type="text"
                  name="keyword"
                  defaultValue={keyword}
                  placeholder="搜索茶叶..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <input type="hidden" name="category" value={category} />
                <button
                  type="submit"
                  className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                >
                  搜索
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = cat === "全部" ? !category : category === cat;
            const href =
              cat === "全部"
                ? `/products${keyword ? `?keyword=${keyword}` : ""}`
                : `/products?category=${encodeURIComponent(cat)}${keyword ? `&keyword=${keyword}` : ""}`;
            return (
              <Link
                key={cat}
                href={href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg text-muted-foreground">暂无商品</p>
            <Link
              href="/products"
              className="mt-4 text-sm text-primary hover:underline"
            >
              查看全部商品
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
