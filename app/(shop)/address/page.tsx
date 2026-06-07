"use client"

import { useEffect, useState, useCallback } from "react"
import { ArrowLeft, MapPin, Plus, Pencil, Trash2, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/auth-store"
import { AddressForm } from "@/components/order/address-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import {
  getAddressListApi,
  addAddressApi,
  updateAddressApi,
  deleteAddressApi,
} from "@/lib/api/addresses"
import type { Address, AddressFormParams } from "@/types/address"

export default function AddressPage() {
  const router = useRouter()
  const isLogin = useAuthStore((s) => s.isLogin)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Address | null>(null)

  const reloadAddresses = useCallback(async () => {
    try {
      const res = await getAddressListApi()
      if (res.code === 0 && res.data) {
        setAddresses(res.data)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isLogin()) {
      router.push("/login?redirect=/address")
      return
    }
    let cancelled = false
    setLoading(true)
    getAddressListApi()
      .then((res) => {
        if (!cancelled && res.code === 0 && res.data) {
          setAddresses(res.data)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [isLogin, router])

  const handleAdd = async (data: AddressFormParams) => {
    try {
      await addAddressApi(data)
      toast.success("地址添加成功")
      setDialogOpen(false)
      setEditingAddress(null)
      setLoading(true)
      await reloadAddresses()
    } catch {
      toast.error("添加地址失败")
    }
  }

  const handleUpdate = async (data: AddressFormParams) => {
    try {
      await updateAddressApi(data)
      toast.success("地址更新成功")
      setDialogOpen(false)
      setEditingAddress(null)
      setLoading(true)
      await reloadAddresses()
    } catch {
      toast.error("更新地址失败")
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteAddressApi(deleteTarget.id)
      toast.success("地址已删除")
      setDeleteTarget(null)
      setLoading(true)
      await reloadAddresses()
    } catch {
      toast.error("删除地址失败")
    }
  }

  const handleSetDefault = async (address: Address) => {
    try {
      await updateAddressApi({ ...address, isDefault: true })
      toast.success("已设为默认地址")
      setLoading(true)
      await reloadAddresses()
    } catch {
      toast.error("设置失败")
    }
  }

  const handleFormSubmit = async (data: AddressFormParams) => {
    if (editingAddress) {
      await handleUpdate(data)
    } else {
      await handleAdd(data)
    }
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-6">
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-bold text-stone-800">收货地址</h1>
      </div>

      <div className="mb-4 flex justify-end">
        <Button
          size="sm"
          onClick={() => {
            setEditingAddress(null)
            setDialogOpen(true)
          }}
        >
          <Plus className="mr-1 h-4 w-4" />
          新增地址
        </Button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-stone-400">
          加载中...
        </div>
      ) : addresses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="mb-3 h-10 w-10 text-stone-300" />
            <p className="text-sm text-stone-500">暂无收货地址</p>
            <Button
              variant="link"
              size="sm"
              className="mt-2"
              onClick={() => {
                setEditingAddress(null)
                setDialogOpen(true)
              }}
            >
              添加收货地址
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {addresses.map((address) => (
            <Card
              key={address.id}
              className="transition-shadow hover:shadow-md"
            >
              <CardContent className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-stone-800">
                      {address.name}
                    </span>
                    <span className="text-sm text-stone-500">
                      {address.phone}
                    </span>
                    {address.isDefault && (
                      <span className="rounded bg-stone-800 px-1.5 py-0.5 text-xs text-white">
                        默认
                      </span>
                    )}
                  </div>
                </div>
                <p className="mb-3 text-sm text-stone-500">
                  {address.province}
                  {address.city}
                  {address.district}
                  {address.detail}
                </p>
                <div className="flex items-center gap-2">
                  {!address.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-stone-500"
                      onClick={() => handleSetDefault(address)}
                    >
                      <Star className="mr-1 h-3 w-3" />
                      设为默认
                    </Button>
                  )}
                  <div className="ml-auto flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-stone-500"
                      onClick={() => {
                        setEditingAddress(address)
                        setDialogOpen(true)
                      }}
                    >
                      <Pencil className="mr-1 h-3 w-3" />
                      编辑
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-stone-500 hover:text-destructive"
                      onClick={() => setDeleteTarget(address)}
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      删除
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? "编辑地址" : "新增地址"}
            </DialogTitle>
            <DialogDescription>请填写收货地址信息</DialogDescription>
          </DialogHeader>
          <AddressForm
            defaultValues={editingAddress || undefined}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setDialogOpen(false)
              setEditingAddress(null)
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              确定要删除地址「{deleteTarget?.name}」吗？此操作不可撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
            >
              取消
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
