"use client"

import { cn } from "@/lib/utils"

interface PriceDisplayProps {
  price: number
  originalPrice?: number
  className?: string
  size?: "sm" | "md" | "lg"
}

export function PriceDisplay({
  price,
  originalPrice,
  className,
  size = "md",
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  const originalSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className={cn("flex items-baseline gap-1.5", className)}>
      <span
        className={cn(
          "font-semibold text-destructive",
          sizeClasses[size]
        )}
      >
        ¥{price.toFixed(2)}
      </span>
      {originalPrice && originalPrice > price && (
        <span
          className={cn(
            "text-muted-foreground line-through",
            originalSizeClasses[size]
          )}
        >
          ¥{originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  )
}
