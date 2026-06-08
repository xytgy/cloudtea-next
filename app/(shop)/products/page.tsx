import Link from "next/link"
import { Search } from "lucide-react"
import { getProductsApi } from "@/lib/api/products"
import { ProductCard } from "@/components/product/product-card"
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/shared/animate-on-scroll"
import type { Product } from "@/types/product"

export const dynamic = "force-dynamic"

const CATEGORIES = ["全部", "绿茶", "乌龙", "红茶", "白茶", "普洱"]

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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 sm:py-28">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-24 -right-24 size-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll type="fade-up" className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              云栖茗茶
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              源自山野的东方味道
            </p>
            <form action="/products" method="get" className="mt-10">
              <div className="mx-auto flex max-w-lg items-center gap-2 rounded-full border bg-background/80 px-5 py-3 shadow-sm backdrop-blur-sm transition-all duration-200 focus-within:shadow-md focus-within:ring-2 focus-within:ring-primary/20">
                <Search className="size-5 text-muted-foreground" />
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
                  className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  搜索
                </button>
              </div>
            </form>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <AnimateOnScroll type="fade-up" delay={0.1}>
          <div className="mb-10 flex flex-wrap items-center gap-3">
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
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </AnimateOnScroll>

        {products.length > 0 ? (
          <StaggerContainer staggerDelay={0.05} className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
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
