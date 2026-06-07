"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  content: string
  sender: "merchant" | "buyer"
  time: string
}

interface Conversation {
  id: string
  buyerName: string
  buyerAvatar: string
  lastMessage: string
  lastTime: string
  unread: number
  messages: ChatMessage[]
}

const mockConversations: Conversation[] = [
  {
    id: "c1",
    buyerName: "张三",
    buyerAvatar: "https://picsum.photos/seed/buyer1/100/100",
    lastMessage: "好的，谢谢老板！",
    lastTime: "10:30",
    unread: 0,
    messages: [
      { id: "m1", content: "你好，请问龙井还有货吗？", sender: "buyer", time: "10:25" },
      { id: "m2", content: "您好！有的，明前特级龙井现货充足", sender: "merchant", time: "10:26" },
      { id: "m3", content: "可以发顺丰吗？", sender: "buyer", time: "10:28" },
      { id: "m4", content: "可以的，我们默认发顺丰，江浙沪次日达", sender: "merchant", time: "10:29" },
      { id: "m5", content: "好的，谢谢老板！", sender: "buyer", time: "10:30" },
    ],
  },
  {
    id: "c2",
    buyerName: "李四",
    buyerAvatar: "https://picsum.photos/seed/buyer2/100/100",
    lastMessage: "碧螺春什么时候能到？",
    lastTime: "昨天",
    unread: 2,
    messages: [
      { id: "m6", content: "老板，我买的碧螺春发货了吗？", sender: "buyer", time: "昨天 14:00" },
      { id: "m7", content: "您好，已经发货了，单号SF1234567890", sender: "merchant", time: "昨天 14:30" },
      { id: "m8", content: "碧螺春什么时候能到？", sender: "buyer", time: "昨天 15:00" },
    ],
  },
  {
    id: "c3",
    buyerName: "王五",
    buyerAvatar: "https://picsum.photos/seed/buyer3/100/100",
    lastMessage: "铁观音质量不错",
    lastTime: "06-05",
    unread: 0,
    messages: [
      { id: "m9", content: "收到铁观音了，质量不错", sender: "buyer", time: "06-05 11:00" },
      { id: "m10", content: "谢谢您的认可！欢迎下次再来", sender: "merchant", time: "06-05 11:05" },
      { id: "m11", content: "有优惠活动记得通知我哈", sender: "buyer", time: "06-05 11:10" },
      { id: "m12", content: "好的，有活动第一时间通知您！", sender: "merchant", time: "06-05 11:12" },
    ],
  },
  {
    id: "c4",
    buyerName: "赵六",
    buyerAvatar: "https://picsum.photos/seed/buyer4/100/100",
    lastMessage: "金骏眉有礼盒装吗？",
    lastTime: "06-04",
    unread: 1,
    messages: [
      { id: "m13", content: "金骏眉有礼盒装吗？想送人", sender: "buyer", time: "06-04 09:00" },
      { id: "m14", content: "有的，我们有精美礼盒装，100g和250g两种规格", sender: "merchant", time: "06-04 09:05" },
      { id: "m15", content: "金骏眉有礼盒装吗？", sender: "buyer", time: "06-04 09:10" },
    ],
  },
]

const autoReplies = [
  "收到，我帮您查一下",
  "好的，稍等我确认下",
  "感谢您的咨询！",
  "这边马上为您处理",
  "好的，没有问题",
]

export default function MerchantChatPage() {
  const [conversations, setConversations] = useState(mockConversations)
  const [activeId, setActiveId] = useState<string | null>(mockConversations[0]?.id || null)
  const [inputValue, setInputValue] = useState("")
  const [mobileShowChat, setMobileShowChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeConversation = conversations.find((c) => c.id === activeId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeConversation?.messages.length])

  const handleSelectConversation = (id: string) => {
    setActiveId(id)
    setMobileShowChat(true)
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    )
  }

  const handleSend = () => {
    if (!inputValue.trim() || !activeId) return

    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      content: inputValue.trim(),
      sender: "merchant",
      time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
    }

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== activeId) return c
        return {
          ...c,
          messages: [...c.messages, newMsg],
          lastMessage: newMsg.content,
          lastTime: "刚刚",
        }
      })
    )
    setInputValue("")

    setTimeout(() => {
      const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)]
      const buyerMsg: ChatMessage = {
        id: `m${Date.now() + 1}`,
        content: reply,
        sender: "buyer",
        time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
      }
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== activeId) return c
          return {
            ...c,
            messages: [...c.messages, buyerMsg],
            lastMessage: buyerMsg.content,
            lastTime: "刚刚",
          }
        })
      )
    }, 1500)
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 text-white">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-900">消息中心</h1>
            <p className="text-sm text-stone-500">与买家沟通</p>
          </div>
        </div>

        <div className="flex h-[calc(100vh-240px)] min-h-[400px] overflow-hidden rounded-xl border ring-1 ring-foreground/10">
          <div
            className={cn(
              "w-full shrink-0 border-r bg-white sm:w-80",
              mobileShowChat ? "hidden sm:block" : "block"
            )}
          >
            <div className="border-b px-4 py-3">
              <p className="text-sm font-medium text-stone-900">会话列表</p>
            </div>
            <div className="overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-stone-50",
                    activeId === conv.id && "bg-stone-50"
                  )}
                  onClick={() => handleSelectConversation(conv.id)}
                >
                  <div className="relative shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={conv.buyerAvatar}
                      alt={conv.buyerName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    {conv.unread > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-stone-900">
                        {conv.buyerName}
                      </span>
                      <span className="text-xs text-stone-400">{conv.lastTime}</span>
                    </div>
                    <p className="truncate text-xs text-stone-500">
                      {conv.lastMessage}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "flex min-w-0 flex-1 flex-col bg-stone-50/50",
              !mobileShowChat ? "hidden sm:flex" : "flex"
            )}
          >
            {activeConversation ? (
              <>
                <div className="flex items-center gap-3 border-b bg-white px-4 py-3">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="sm:hidden"
                    onClick={() => setMobileShowChat(false)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeConversation.buyerAvatar}
                    alt={activeConversation.buyerName}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-stone-900">
                    {activeConversation.buyerName}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4">
                  <AnimatePresence initial={false}>
                    {activeConversation.messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "mb-3 flex",
                          msg.sender === "merchant"
                            ? "justify-end"
                            : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                            msg.sender === "merchant"
                              ? "bg-stone-900 text-white rounded-br-md"
                              : "bg-white text-stone-700 ring-1 ring-stone-200 rounded-bl-md"
                          )}
                        >
                          <p>{msg.content}</p>
                          <p
                            className={cn(
                              "mt-1 text-[10px]",
                              msg.sender === "merchant"
                                ? "text-stone-400"
                                : "text-stone-400"
                            )}
                          >
                            {msg.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t bg-white px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="输入消息..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      className="flex-1"
                    />
                    <Button
                      size="icon"
                      className="shrink-0 bg-stone-900 text-white hover:bg-stone-800"
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-stone-400">
                <p className="text-sm">选择一个会话开始聊天</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
