"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getOrderDetailApi } from "@/lib/api/orders"
import { axiosInstance } from "@/lib/api/client"
import type { Order } from "@/types/order"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

type PaymentMethod = "alipay" | "wechat"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("orderId")

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [method, setMethod] = useState<PaymentMethod>("alipay")

  useEffect(() => {
    if (!orderId) {
      router.push("/orders")
      return
    }

    const fetchOrder = async () => {
      try {
        const res = await getOrderDetailApi(orderId)
        if (res.code === 0 && res.data) {
          setOrder(res.data)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, router])

  const pollOrderStatus = async (orderId: string) => {
    const maxAttempts = 30
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const res = await getOrderDetailApi(orderId)
      if (res.code === 0 && res.data && res.data.status !== 0) {
        return true
      }
    }
    return false
  }

  const handlePay = async () => {
    if (!orderId || !order) return

    setPaying(true)
    try {
      if (method === "alipay") {
        const { data } = await axiosInstance.post("/api/proxy/payment/alipay/pay", { orderId })
        if (data.code === 0 && data.data) {
          const div = document.createElement("div")
          div.innerHTML = data.data
          document.body.appendChild(div)
          const form = div.querySelector("form")
          if (form) {
            form.submit()
          }
        }
      } else {
        const { data } = await axiosInstance.post("/api/proxy/order/pay", { orderId })
        if (data.code === 0) {
          const success = await pollOrderStatus(orderId)
          if (success) {
            router.push("/orders")
          }
        }
      }
    } finally {
      setPaying(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!order) {
    return null
  }

  return (
    <div className="container max-w-lg mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-8">收银台</h1>

      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground mb-2">订单金额</p>
        <p className="text-4xl font-bold text-destructive">
          ¥{order.payAmount.toFixed(2)}
        </p>
      </div>

      <div className="space-y-3 mb-8">
        <p className="text-sm font-medium">选择支付方式</p>
        <div className="grid grid-cols-2 gap-3">
          <Card
            className={cn(
              "cursor-pointer transition-all hover:ring-2 hover:ring-primary",
              method === "alipay" && "ring-2 ring-primary"
            )}
            onClick={() => setMethod("alipay")}
          >
            <CardContent className="flex items-center justify-center p-4">
              <div className="text-center">
                <div className="text-2xl mb-1">💙</div>
                <p className="text-sm font-medium">支付宝</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "cursor-pointer transition-all hover:ring-2 hover:ring-primary",
              method === "wechat" && "ring-2 ring-primary"
            )}
            onClick={() => setMethod("wechat")}
          >
            <CardContent className="flex items-center justify-center p-4">
              <div className="text-center">
                <div className="text-2xl mb-1">💚</div>
                <p className="text-sm font-medium">微信支付</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={handlePay}
        disabled={paying}
      >
        {paying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            支付中...
          </>
        ) : (
          "确认支付"
        )}
      </Button>
    </div>
  )
}
