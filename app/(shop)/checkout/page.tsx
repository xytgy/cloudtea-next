"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react"
import { useCartStore } from "@/lib/store/cart-store"
import { useAuthStore } from "@/lib/store/auth-store"
import { getAddressListApi, addAddressApi, updateAddressApi, deleteAddressApi } from "@/lib/api/addresses"
import { createOrderApi } from "@/lib/api/orders"
import { AddressForm } from "@/components/order/address-form"
import { ImageWithFallback } from "@/components/shared/image-with-fallback"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { toast } from "sonner"
import type { Address, AddressFormParams } from "@/types/address"

function applyAddresses(result: Address[]) {
  const defaultAddr = result.find((a) => a.isDefault)
  return {
    addresses: result,
    selectedId: defaultAddr?.id || result[0]?.id || "",
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const checkedItems = useCartStore((s) => s.checkedItems())
  const checkedTotal = useCartStore((s) => s.checkedTotal())
  const isLogin = useAuthStore((s) => s.isLogin)

  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string>("")
  const [remark, setRemark] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [loadingAddresses, setLoadingAddresses] = useState(true)
  const mountedRef = useRef(true)

  const loadAddresses = useCallback(async () => {
    setLoadingAddresses(true)
    try {
      const result = await getAddressListApi()
      if (!mountedRef.current) return
      const { addresses: addrs, selectedId } = applyAddresses(result.data)
      setAddresses(addrs)
      setSelectedAddressId(selectedId)
    } catch {
      if (mountedRef.current) toast.error("获取地址列表失败")
    } finally {
      if (mountedRef.current) setLoadingAddresses(false)
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true
    if (!isLogin()) {
      router.push("/login?redirect=/checkout")
      return
    }
    if (checkedItems.length === 0) {
      router.push("/cart")
      return
    }

    let cancelled = false
    getAddressListApi()
      .then((result) => {
        if (cancelled) return
        const { addresses: addrs, selectedId } = applyAddresses(result.data)
        setAddresses(addrs)
        setSelectedAddressId(selectedId)
      })
      .catch(() => {
        if (!cancelled) toast.error("获取地址列表失败")
      })
      .finally(() => {
        if (!cancelled) setLoadingAddresses(false)
      })

    return () => {
      cancelled = true
      mountedRef.current = false
    }
  }, [isLogin, router, checkedItems.length])

  const handleAddAddress = async (data: AddressFormParams) => {
    try {
      await addAddressApi(data)
      toast.success("地址添加成功")
      setDialogOpen(false)
      setEditingAddress(null)
      await loadAddresses()
    } catch {
      toast.error("添加地址失败")
    }
  }

  const handleUpdateAddress = async (data: AddressFormParams) => {
    try {
      await updateAddressApi(data)
      toast.success("地址更新成功")
      setDialogOpen(false)
      setEditingAddress(null)
      await loadAddresses()
    } catch {
      toast.error("更新地址失败")
    }
  }

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteAddressApi(id)
      toast.success("地址已删除")
      if (selectedAddressId === id) {
        setSelectedAddressId("")
      }
      await loadAddresses()
    } catch {
      toast.error("删除地址失败")
    }
  }

  const handleFormSubmit = async (data: AddressFormParams) => {
    if (editingAddress) {
      await handleUpdateAddress(data)
    } else {
      await handleAddAddress(data)
    }
  }

  const handleOpenAddDialog = () => {
    setEditingAddress(null)
    setDialogOpen(true)
  }

  const handleOpenEditDialog = (address: Address) => {
    setEditingAddress(address)
    setDialogOpen(true)
  }

  const handleSubmitOrder = async () => {
    if (!selectedAddressId) {
      toast.error("请选择收货地址")
      return
    }
    setSubmitting(true)
    try {
      const result = await createOrderApi({
        addressId: selectedAddressId,
        cartItemIds: checkedItems.map((item) => item.id),
        remark: remark || undefined,
      })
      toast.success("订单创建成功")
      router.push(`/payment?orderId=${result.data.id}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "创建订单失败")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">确认订单</h1>

      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <MapPin className="h-5 w-5" />
            收货地址
          </h2>
          <Button variant="outline" size="sm" onClick={handleOpenAddDialog}>
            <Plus className="mr-1 h-4 w-4" />
            添加新地址
          </Button>
        </div>

        {loadingAddresses ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            加载地址中...
          </div>
        ) : addresses.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <MapPin className="mb-2 h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">暂无收货地址</p>
              <Button
                variant="link"
                size="sm"
                className="mt-1"
                onClick={handleOpenAddDialog}
              >
                添加收货地址
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {addresses.map((address) => (
              <Card
                key={address.id}
                className={`cursor-pointer transition-all ${
                  selectedAddressId === address.id
                    ? "ring-2 ring-primary"
                    : "hover:ring-1 hover:ring-border"
                }`}
                onClick={() => setSelectedAddressId(address.id)}
              >
                <CardContent className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{address.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {address.phone}
                      </span>
                      {address.isDefault && (
                        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                          默认
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenEditDialog(address)
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteAddress(address.id)
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {address.province}
                    {address.city}
                    {address.district}
                    {address.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Separator className="mb-8" />

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">
          商品清单
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({checkedItems.length} 件)
          </span>
        </h2>
        <Card>
          <CardContent className="divide-y p-0">
            {checkedItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4">
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
                  <p className="text-sm text-destructive">
                    ¥{item.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                  <p className="text-sm font-semibold">
                    ¥{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">订单备注</h2>
        <Textarea
          placeholder="选填，请输入备注信息"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="resize-none"
        />
      </section>

      <Separator className="mb-6" />

      <section className="mb-24 md:mb-8">
        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">商品总额</span>
              <span>¥{checkedTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">运费</span>
              <span className="text-primary">免运费</span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-semibold">
              <span>合计</span>
              <span className="text-destructive">¥{checkedTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4 md:sticky md:bottom-auto md:left-auto md:right-auto md:border-0 md:p-0">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="text-lg font-semibold">
            合计：
            <span className="text-destructive">¥{checkedTotal.toFixed(2)}</span>
          </div>
          <Button
            size="lg"
            disabled={submitting || !selectedAddressId}
            onClick={handleSubmitOrder}
          >
            {submitting ? "提交中..." : "提交订单"}
          </Button>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? "编辑地址" : "添加新地址"}
            </DialogTitle>
            <DialogDescription>
              请填写收货地址信息
            </DialogDescription>
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
    </div>
  )
}
