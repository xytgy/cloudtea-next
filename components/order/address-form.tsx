"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { AddressFormParams } from "@/types/address"

const addressSchema = z.object({
  receiverName: z.string().min(1, "请输入收货人姓名"),
  receiverPhone: z
    .string()
    .min(1, "请输入手机号")
    .regex(/^1[3-9]\d{9}$/, "请输入正确的手机号"),
  province: z.string().min(1, "请输入省份"),
  city: z.string().min(1, "请输入城市"),
  district: z.string().min(1, "请输入区/县"),
  detailAddress: z.string().min(1, "请输入详细地址"),
  isDefault: z.boolean().optional(),
})

type AddressFormData = z.infer<typeof addressSchema>

interface AddressFormProps {
  defaultValues?: Partial<AddressFormParams>
  onSubmit: (data: AddressFormParams) => void | Promise<void>
  onCancel?: () => void
}

export function AddressForm({ defaultValues, onSubmit, onCancel }: AddressFormProps) {
  const [isDefaultChecked, setIsDefaultChecked] = useState(defaultValues?.isDefault || false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      receiverName: defaultValues?.name || "",
      receiverPhone: defaultValues?.phone || "",
      province: defaultValues?.province || "",
      city: defaultValues?.city || "",
      district: defaultValues?.district || "",
      detailAddress: defaultValues?.detail || "",
      isDefault: defaultValues?.isDefault || false,
    },
  })

  const handleFormSubmit = async (data: AddressFormData) => {
    await onSubmit({
      id: defaultValues?.id,
      name: data.receiverName,
      phone: data.receiverPhone,
      province: data.province,
      city: data.city,
      district: data.district,
      detail: data.detailAddress,
      isDefault: isDefaultChecked,
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="receiverName">收货人姓名</Label>
        <Input
          id="receiverName"
          placeholder="请输入收货人姓名"
          {...register("receiverName")}
        />
        {errors.receiverName && (
          <p className="text-xs text-destructive">{errors.receiverName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="receiverPhone">手机号</Label>
        <Input
          id="receiverPhone"
          placeholder="请输入手机号"
          {...register("receiverPhone")}
        />
        {errors.receiverPhone && (
          <p className="text-xs text-destructive">{errors.receiverPhone.message}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-2">
          <Label htmlFor="province">省份</Label>
          <Input
            id="province"
            placeholder="省份"
            {...register("province")}
          />
          {errors.province && (
            <p className="text-xs text-destructive">{errors.province.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">城市</Label>
          <Input
            id="city"
            placeholder="城市"
            {...register("city")}
          />
          {errors.city && (
            <p className="text-xs text-destructive">{errors.city.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="district">区/县</Label>
          <Input
            id="district"
            placeholder="区/县"
            {...register("district")}
          />
          {errors.district && (
            <p className="text-xs text-destructive">{errors.district.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="detailAddress">详细地址</Label>
        <Input
          id="detailAddress"
          placeholder="请输入详细地址（街道、门牌号等）"
          {...register("detailAddress")}
        />
        {errors.detailAddress && (
          <p className="text-xs text-destructive">{errors.detailAddress.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="isDefault"
          checked={isDefaultChecked}
          onChange={() => setIsDefaultChecked(!isDefaultChecked)}
        />
        <Label htmlFor="isDefault" className="font-normal">
          设为默认地址
        </Label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            取消
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "保存中..." : "保存"}
        </Button>
      </div>
    </form>
  )
}
