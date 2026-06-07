"use client"

import { useRouter } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/hooks/use-cart"
import { CartItem } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { EmptyState } from "@/components/shared/empty-state"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, toggleCheck, toggleAllCheck, checkedItems, checkedTotal } = useCart()
  const allChecked = items.length > 0 && items.every((item) => item.checked)

  const handleRemove = async (id: string) => {
    try {
      await removeItem(id)
      toast.success("已移除商品")
    } catch {
      toast.error("移除失败")
    }
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <EmptyState
          icon={<ShoppingCart className="h-16 w-16" />}
          title="购物车是空的"
          description="快去挑选心仪的商品吧"
        />
        <div className="mt-4 text-center">
          <Button onClick={() => router.push("/products")}>
            去逛逛
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          购物车
          <span className="ml-2 text-base font-normal text-muted-foreground">
            ({items.length} 件商品)
          </span>
        </h1>
      </div>

      <div className="mb-4 flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
        <Checkbox
          checked={allChecked}
          onChange={() => toggleAllCheck(!allChecked)}
          aria-label="全选"
        />
        <span className="text-sm font-medium">全选</span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={handleRemove}
            onToggleCheck={toggleCheck}
          />
        ))}
      </div>

      <CartSummary
        checkedItems={checkedItems()}
        checkedTotal={checkedTotal()}
        onCheckout={handleCheckout}
        className="mt-6"
      />
    </div>
  )
}
