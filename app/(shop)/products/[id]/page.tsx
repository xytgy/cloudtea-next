import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { getProductDetailApi } from "@/lib/api/products";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
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
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/products" className="hover:text-foreground">
          全部商品
        </Link>
        <ChevronRight className="size-3" />
        <Link
          href={`/products?category=${product.category}`}
          className="hover:text-foreground"
        >
          {product.category}
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100">
            <Image
              src={product.images?.[0] || product.image || "/file.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-lg bg-stone-100"
                >
                  <Image
                    src={img}
                    alt={`${product.name} - ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">
              ¥{product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-lg text-muted-foreground line-through">
                ¥{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span>库存: {product.stock}</span>
            <span>已售: {product.sales}</span>
          </div>

          {product.specs && product.specs.length > 0 && (
            <div className="mt-6 space-y-4">
              {product.specs.map((spec) => (
                <div key={spec.name}>
                  <p className="text-sm font-medium text-foreground">
                    {spec.name}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {spec.values.map((val) => (
                      <span
                        key={val}
                        className="rounded-full border px-3 py-1 text-sm text-muted-foreground"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8">
            <AddToCartButton
              productId={product.id}
              productName={product.name}
              price={product.price}
              image={product.image}
              stock={product.stock}
            />
          </div>

          <div className="mt-10">
            <Tabs defaultValue="detail">
              <TabsList variant="line">
                <TabsTrigger value="detail">商品详情</TabsTrigger>
                <TabsTrigger value="reviews">用户评价</TabsTrigger>
              </TabsList>
              <TabsContent value="detail" className="mt-4">
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  {product.detail ? (
                    <div dangerouslySetInnerHTML={{ __html: product.detail }} />
                  ) : (
                    <p>暂无详细信息</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <p className="text-sm text-muted-foreground">暂无评价</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
