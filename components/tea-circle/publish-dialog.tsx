'use client'

import { useState } from 'react'
import { ImagePlus, X, Hash } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ImageWithFallback } from '@/components/shared/image-with-fallback'

interface PublishDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultTopic?: string
}

export function PublishDialog({ open, onOpenChange, defaultTopic }: PublishDialogProps) {
  const [content, setContent] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [topics, setTopics] = useState<string[]>(defaultTopic ? [defaultTopic] : [])
  const [topicInput, setTopicInput] = useState('')
  const [showTopicSuggest, setShowTopicSuggest] = useState(false)

  const SUGGEST_TOPICS = ['春茶季', '茶道入门', '普洱收藏', '武夷岩茶', '白茶品鉴']

  const filteredSuggestions = SUGGEST_TOPICS.filter(
    (t) => t.includes(topicInput) && !topics.includes(t)
  )

  function handleImageSelect() {
    if (images.length >= 9) {
      toast.warning('最多上传 9 张图片')
      return
    }
    const seed = `mock-upload-${Date.now()}`
    setImages([...images, `https://picsum.photos/seed/${seed}/600/400`])
  }

  function removeImage(index: number) {
    setImages(images.filter((_, i) => i !== index))
  }

  function handleTopicSelect(topic: string) {
    if (!topics.includes(topic)) {
      setTopics([...topics, topic])
    }
    setTopicInput('')
    setShowTopicSuggest(false)
  }

  function removeTopic(index: number) {
    setTopics(topics.filter((_, i) => i !== index))
  }

  function handleSubmit() {
    if (!content.trim()) {
      toast.warning('请输入动态内容')
      return
    }
    toast.success('动态发布成功！')
    setContent('')
    setImages([])
    setTopics([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>发布动态</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="分享你的茶生活..."
            className="min-h-32 resize-none"
            maxLength={500}
          />
          <p className="text-right text-xs text-muted-foreground">
            {content.length}/500
          </p>

          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {images.map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                  <ImageWithFallback
                    src={src}
                    alt=""
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleImageSelect}
              disabled={images.length >= 9}
            >
              <ImagePlus className="h-4 w-4" />
              <span>选择图片 ({images.length}/9)</span>
            </Button>
          </div>

          <div className="relative">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <Input
                value={topicInput}
                onChange={(e) => {
                  setTopicInput(e.target.value)
                  setShowTopicSuggest(e.target.value.length > 0)
                }}
                onFocus={() => topicInput.length > 0 && setShowTopicSuggest(true)}
                onBlur={() => setTimeout(() => setShowTopicSuggest(false), 200)}
                placeholder="添加话题标签..."
                className="h-8 text-sm"
              />
            </div>

            {showTopicSuggest && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-6 z-10 mt-1 w-48 rounded-lg border bg-popover p-1 shadow-md">
                {filteredSuggestions.map((topic) => (
                  <button
                    key={topic}
                    onMouseDown={() => handleTopicSelect(topic)}
                    className="w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent"
                  >
                    #{topic}
                  </button>
                ))}
              </div>
            )}
          </div>

          {topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {topics.map((topic, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                >
                  #{topic}
                  <button onClick={() => removeTopic(i)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={!content.trim()}>
            发布
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
