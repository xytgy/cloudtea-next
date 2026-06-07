'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Flame, Eye, MessageSquare, PenLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PostCard } from '@/components/tea-circle/post-card'
import { PublishDialog } from '@/components/tea-circle/publish-dialog'
import { EmptyState } from '@/components/shared/empty-state'
import { mockPosts, mockTopics } from '@/lib/mock/tea-circle'

export default function TopicDetailPage() {
  const params = useParams()
  const topicName = decodeURIComponent(params.name as string)
  const [publishOpen, setPublishOpen] = useState(false)

  const topic = mockTopics.find((t) => t.name === topicName)
  const topicPosts = mockPosts.filter((p) => p.topics.includes(topicName))

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6">
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/tea-circle"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-lg font-semibold">话题详情</h1>
      </div>

      {topic && (
        <div className="mb-6 rounded-xl bg-card p-5 ring-1 ring-foreground/10">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">#{topic.name}</h2>
            {topic.isHot && (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-xs font-medium text-orange-600">
                <Flame className="h-3 w-3" />
                热门
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{topic.description}</p>
          <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              {topic.postCount.toLocaleString()} 讨论
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {topic.viewCount.toLocaleString()} 浏览
            </span>
          </div>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">相关动态</h3>
        <Button
          size="sm"
          onClick={() => setPublishOpen(true)}
        >
          <PenLine className="h-4 w-4" />
          发布动态
        </Button>
      </div>

      <div className="space-y-4">
        {topicPosts.length > 0 ? (
          topicPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <EmptyState
            title="暂无相关动态"
            description="成为第一个在此话题下发帖的人"
          />
        )}
      </div>

      <PublishDialog
        open={publishOpen}
        onOpenChange={setPublishOpen}
        defaultTopic={topicName}
      />
    </div>
  )
}
