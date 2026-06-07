'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ImagePlus, X, Send } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { ImageWithFallback } from '@/components/shared/image-with-fallback'
import { cn } from '@/lib/utils'

const FEEDBACK_TYPES = [
  { value: 'feature', label: '功能建议' },
  { value: 'bug', label: '内容错误' },
  { value: 'design', label: '界面美化' },
  { value: 'other', label: '其他' },
]

export default function FeedbackPage() {
  const [type, setType] = useState('')
  const [content, setContent] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [contact, setContact] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleImageSelect() {
    if (images.length >= 3) {
      toast.warning('最多上传 3 张图片')
      return
    }
    const seed = `feedback-${Date.now()}`
    setImages([...images, `https://picsum.photos/seed/${seed}/600/400`])
  }

  function removeImage(index: number) {
    setImages(images.filter((_, i) => i !== index))
  }

  function handleSubmit() {
    if (!type) {
      toast.warning('请选择反馈类型')
      return
    }
    if (!content.trim()) {
      toast.warning('请输入反馈内容')
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      toast.success('感谢您的反馈！我们会认真查看每一条建议')
      setType('')
      setContent('')
      setImages([])
      setContact('')
    }, 1000)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-lg font-semibold">意见反馈</h1>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">反馈类型</label>
          <div className="flex flex-wrap gap-2">
            {FEEDBACK_TYPES.map((item) => (
              <button
                key={item.value}
                onClick={() => setType(item.value)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  type === item.value
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-muted-foreground hover:border-foreground/30'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">反馈内容</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="请详细描述您的意见或建议..."
            className="min-h-32 resize-none"
            maxLength={500}
          />
          <p className="mt-1 text-right text-xs text-muted-foreground">
            {content.length}/500
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">上传图片（可选）</label>
          <div className="flex flex-wrap gap-2">
            {images.map((src, i) => (
              <div key={i} className="relative h-20 w-20 overflow-hidden rounded-lg bg-muted">
                <ImageWithFallback
                  src={src}
                  alt=""
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/50 text-white"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </div>
            ))}
            {images.length < 3 && (
              <button
                onClick={handleImageSelect}
                className="flex h-20 w-20 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <ImagePlus className="h-5 w-5" />
                <span className="mt-1 text-[10px]">添加图片</span>
              </button>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">最多 3 张，支持 jpg/png 格式</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">联系方式（可选）</label>
          <Input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="手机号或邮箱，方便我们联系您"
            className="h-10"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={submitting || !type || !content.trim()}
          className="w-full"
          size="lg"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              提交中...
            </span>
          ) : (
            <>
              <Send className="h-4 w-4" />
              提交反馈
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
