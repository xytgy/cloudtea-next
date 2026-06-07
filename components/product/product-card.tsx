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
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Link href={`/products/${product.id}`} className="block h-full">
        <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
          <div className="relative aspect-square overflow-hidden">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <CardContent className="flex-1 p-3">
            <h3 className="mb-1 truncate text-sm font-medium">
              {product.name}
            </h3>
            <Badge variant="secondary" className="mb-2 text-xs">
              {product.category}
            </Badge>
            <PriceDisplay
              price={product.price}
              originalPrice={product.originalPrice}
              size="sm"
            />
          </CardContent>
          <CardFooter
            className="p-3 pt-0"
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
