"use client"

import { Trash2 } from "lucide-react"
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
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        <Checkbox
          checked={item.checked}
          onChange={() => onToggleCheck(item.id)}
          aria-label={`选择 ${item.name}`}
        />
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            fill
            sizes="64px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium">{item.name}</h3>
          {item.spec && (
            <p className="text-xs text-muted-foreground">{item.spec}</p>
          )}
          <p className="text-sm font-semibold text-destructive">
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
          <p className="text-sm font-semibold">¥{subtotal.toFixed(2)}</p>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onRemove(item.id)}
          aria-label={`删除 ${item.name}`}
        >
          <Trash2 className="h-4 w-4 text-muted-foreground" />
        </Button>
      </CardContent>
    </Card>
  )
}
