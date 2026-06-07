"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = [
  { value: "all", label: "全部" },
  { value: "绿茶", label: "绿茶" },
  { value: "乌龙", label: "乌龙" },
  { value: "红茶", label: "红茶" },
  { value: "白茶", label: "白茶" },
  { value: "普洱", label: "普洱" },
]

interface CategoryFilterProps {
  currentCategory: string | undefined
  onCategoryChange: (category: string | undefined) => void
}

export function CategoryFilter({
  currentCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const currentValue = currentCategory || "all"

  const handleValueChange = (value: string | number | undefined) => {
    const stringValue = String(value)
    onCategoryChange(stringValue === "all" ? undefined : stringValue)
  }

  return (
    <Tabs
      value={currentValue}
      onValueChange={handleValueChange}
    >
      <TabsList variant="line" className="w-full overflow-x-auto">
        {categories.map((category) => (
          <TabsTrigger
            key={category.value}
            value={category.value}
            className="flex-shrink-0"
          >
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
