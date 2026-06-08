import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { getProductDetailApi } from "@/lib/api/products";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import type { ProductDetail } from "@/types/product";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product: ProductDetail | null = null;
  try {
    const result = await getProductDetailApi(id);
    if (result.code === 0 && result.data) {
      product = result.data;
    }
  } catch {
    // ignore
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">商品不存在</p>
          <Link
            href="/products"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            返回商品列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/products" className="transition-colors hover:text-foreground">
          全部商品
        </Link>
        <ChevronRight className="size-3.5" />
        <Link
          href={`/products?category=${product.category}`}
          className="transition-colors hover:text-foreground"
        >
          {product.category}
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="group relative aspect-square overflow-hidden rounded-2xl bg-muted/30">
            <Image
              src={product.images?.[0] || product.image || "/file.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-3">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-muted/30 ring-2 ring-transparent transition-all duration-200 hover:ring-primary/30"
                >
                  <Image
                    src={img}
                    alt={`${product.name} - ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="100px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="mb-2">
            <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary border-0">
              {product.category}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8 flex items-baseline gap-4">
            <span className="text-4xl font-bold text-primary">
              ¥{product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-lg text-muted-foreground line-through">
                ¥{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>库存: {product.stock}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-blue-500" />
              <span>已售: {product.sales}</span>
            </div>
          </div>

          {product.specs && product.specs.length > 0 && (
            <div className="mt-8 space-y-5">
              {product.specs.map((spec) => (
                <div key={spec.name}>
                  <p className="text-sm font-semibold text-foreground mb-3">
                    {spec.name}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {spec.values.map((val) => (
                      <span
                        key={val}
                        className="rounded-full border px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary cursor-pointer"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10">
            <AddToCartButton
              productId={product.id}
              productName={product.name}
              price={product.price}
              image={product.image}
              stock={product.stock}
            />
          </div>

          <div className="mt-12">
            <Tabs defaultValue="detail">
              <TabsList variant="line" className="w-full">
                <TabsTrigger value="detail" className="flex-1">商品详情</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">用户评价</TabsTrigger>
              </TabsList>
              <TabsContent value="detail" className="mt-6">
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  {product.detail ? (
                    <div dangerouslySetInnerHTML={{ __html: product.detail }} />
                  ) : (
                    <p>暂无详细信息</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <p className="text-sm text-muted-foreground">暂无评价</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
