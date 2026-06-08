"use client"

import { Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ImageWithFallback } from "@/components/shared/image-with-fallback"
import { QuantitySelector } from "@/components/shared/quantity-selector"
import type { CartItem as CartItemType } from "@/types/cart"

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  onToggleCheck: (id: string) => void
}

export function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  onToggleCheck,
}: CartItemProps) {
  const subtotal = item.price * item.quantity

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group transition-all duration-200 hover:shadow-md">
        <CardContent className="flex items-center gap-4 p-4">
          <Checkbox
            checked={item.checked}
            onChange={() => onToggleCheck(item.id)}
            aria-label={`选择 ${item.name}`}
            className="transition-transform duration-200 hover:scale-110"
          />
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted/30">
            <ImageWithFallback
              src={item.image}
              alt={item.name}
              fill
              sizes="80px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
              {item.name}
            </h3>
            {item.spec && (
              <p className="mt-1 text-xs text-muted-foreground">{item.spec}</p>
            )}
            <p className="mt-2 text-sm font-bold text-primary">
              ¥{item.price.toFixed(2)}
            </p>
          </div>
          <QuantitySelector
            value={item.quantity}
            onChange={(quantity) => onUpdateQuantity(item.id, quantity)}
            min={1}
            max={item.stock}
          />
          <div className="text-right">
            <p className="text-base font-bold text-foreground">
              ¥{subtotal.toFixed(2)}
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onRemove(item.id)}
              aria-label={`删除 ${item.name}`}
              className="text-muted-foreground transition-colors hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
