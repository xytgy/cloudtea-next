"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/hooks/use-cart"
import { useAuthStore } from "@/lib/store/auth-store"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface AddToCartButtonProps {
  productId: string
  productName: string
  price?: number
  image?: string
  stock?: number
  className?: string
}

export function AddToCartButton({
  productId,
  productName,
  price,
  image,
  stock,
  className,
}: AddToCartButtonProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const isLogin = useAuthStore((state) => state.isLogin)
  const [isAdded, setIsAdded] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const isOutOfStock = stock === 0

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isOutOfStock) return

    if (!isLogin()) {
      toast.error("请先登录")
      router.push("/login")
      return
    }

    setIsLoading(true)
    try {
      await addToCart({
        productId,
        name: productName,
        price: price || 0,
        image: image || "",
        quantity: 1,
        spec: "",
        stock: stock || 999,
      })
      setIsAdded(true)
      toast.success(`${productName} 已加入购物车`)
      setTimeout(() => setIsAdded(false), 2000)
    } catch {
      toast.error("加入购物车失败")
    } finally {
      setIsLoading(false)
    }
  }

  if (isOutOfStock) {
    return (
      <Button
        disabled
        variant="outline"
        className={cn("cursor-not-allowed", className)}
      >
        已售罄
      </Button>
    )
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={cn("relative overflow-hidden", className)}
    >
      <AnimatePresence mode="wait">
        {isAdded ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-1"
          >
            <Check className="h-4 w-4" />
            ✓ 已添加
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-1"
          >
            <ShoppingCart className="h-4 w-4" />
            加入购物车
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}
