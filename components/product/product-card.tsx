"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageWithFallback } from "@/components/shared/image-with-fallback"
import { PriceDisplay } from "@/components/shared/price-display"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full"
    >
      <Link href={`/products/${product.id}`} className="group block h-full">
        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="relative aspect-square overflow-hidden bg-muted/30">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <CardContent className="flex-1 p-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                {product.name}
              </h3>
            </div>
            <Badge
              variant="secondary"
              className="mb-3 border-0 bg-primary/10 text-xs font-medium text-primary"
            >
              {product.category}
            </Badge>
            <PriceDisplay
              price={product.price}
              originalPrice={product.originalPrice}
              size="sm"
            />
          </CardContent>
          <CardFooter
            className="p-4 pt-0"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <AddToCartButton
              productId={product.id}
              productName={product.name}
              price={product.price}
              image={product.image}
              className="w-full"
            />
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
