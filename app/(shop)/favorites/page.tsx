"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingBag } from "lucide-react"
import { mockFavorites } from "@/lib/mock/user-center"
import { ProductCard } from "@/components/product/product-card"
import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>(mockFavorites)

  const handleRemove = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">我的收藏</h1>
        {favorites.length > 0 && (
          <span className="text-sm text-stone-500">{favorites.length} 件商品</span>
        )}
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon={<Heart className="h-12 w-12" />}
          title="暂无收藏"
          description="去发现心仪的茶叶吧"
        >
          <Link href="/products" className="mt-4">
            <Button>
              <ShoppingBag className="mr-2 h-4 w-4" />
              去逛逛
            </Button>
          </Link>
        </EmptyState>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {favorites.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <ProductCard product={product} />
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleRemove(product.id)
                  }}
                  className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-1.5 shadow-sm transition-colors hover:bg-white"
                >
                  <Heart className="h-4 w-4 fill-red-400 text-red-400" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
