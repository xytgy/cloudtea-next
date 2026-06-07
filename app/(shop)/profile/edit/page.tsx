"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Loader2 } from "lucide-react"
import { mockUserProfile } from "@/lib/mock/user-center"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const profileSchema = z.object({
  nickname: z.string().min(1, "请输入昵称").max(20, "昵称不超过20个字符"),
  signature: z.string().max(50, "签名不超过50个字符").optional().or(z.literal("")),
  gender: z.enum(["1", "2", "0"]),
  phone: z
    .string()
    .min(1, "请输入手机号")
    .regex(/^1[3-9]\d{9}$/, "请输入正确的手机号"),
})

type ProfileFormData = z.infer<typeof profileSchema>

const genderOptions = [
  { value: "1" as const, label: "男" },
  { value: "2" as const, label: "女" },
  { value: "0" as const, label: "保密" },
]

export default function ProfileEditPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: mockUserProfile.nickname,
      signature: mockUserProfile.signature,
      gender: String(mockUserProfile.gender) as "1" | "2" | "0",
      phone: "13888888888",
    },
  })

  const selectedGender = watch("gender")

  const onSubmit = async (_data: ProfileFormData) => {
    setSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      toast.success("资料保存成功")
      router.back()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-6">
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-bold text-stone-800">编辑资料</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-stone-700">
                昵称
              </Label>
              <Input
                id="nickname"
                placeholder="请输入昵称"
                {...register("nickname")}
                className="border-stone-200"
              />
              {errors.nickname && (
                <p className="text-xs text-destructive">{errors.nickname.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="signature" className="text-stone-700">
                个性签名
              </Label>
              <Textarea
                id="signature"
                placeholder="写一句个性签名吧..."
                rows={3}
                {...register("signature")}
                className="resize-none border-stone-200"
              />
              {errors.signature && (
                <p className="text-xs text-destructive">{errors.signature.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-stone-700">性别</Label>
              <div className="flex gap-3">
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setValue("gender", option.value, { shouldValidate: true })}
                    className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-all ${
                      selectedGender === option.value
                        ? "border-stone-800 bg-stone-800 text-white"
                        : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {errors.gender && (
                <p className="text-xs text-destructive">{errors.gender.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-stone-700">
                手机号
              </Label>
              <Input
                id="phone"
                placeholder="请输入手机号"
                {...register("phone")}
                className="border-stone-200"
              />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                取消
              </Button>
              <Button type="submit" className="flex-1" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                保存
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
