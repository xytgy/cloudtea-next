"use client"

import { PackageOpen } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: React.ReactNode
  title?: string
  description?: string
  className?: string
}

export function EmptyState({
  icon,
  title = "暂无数据",
  description,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
        className="mb-6 flex size-20 items-center justify-center rounded-full bg-muted/50 text-muted-foreground"
      >
        {icon || <PackageOpen className="h-10 w-10" />}
      </motion.div>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mb-2 text-lg font-semibold text-foreground"
      >
        {title}
      </motion.h3>
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-sm text-muted-foreground"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
