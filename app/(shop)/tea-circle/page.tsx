'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Flame, Users, Hash } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ImageWithFallback } from '@/components/shared/image-with-fallback'
import { EmptyState } from '@/components/shared/empty-state'
import { PostCard } from '@/components/tea-circle/post-card'
import { PublishDialog } from '@/components/tea-circle/publish-dialog'
import { mockPosts, mockTopics, mockFollowingUsers } from '@/lib/mock/tea-circle'

export default function TeaCirclePage() {
  const [publishOpen, setPublishOpen] = useState(false)

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">茶友圈</h1>
        <p className="mt-1 text-sm text-muted-foreground">与万千茶友分享品茶日常</p>
      </div>

      <Tabs defaultValue="recommend">
        <TabsList variant="line" className="w-full">
          <TabsTrigger value="recommend" className="flex-1">推荐</TabsTrigger>
          <TabsTrigger value="following" className="flex-1">关注</TabsTrigger>
          <TabsTrigger value="topics" className="flex-1">话题</TabsTrigger>
        </TabsList>

        <TabsContent value="recommend" className="mt-4 space-y-4">
          {mockPosts.length > 0 ? (
            mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <EmptyState
              title="暂无动态"
              description="快来发布第一条动态吧"
            />
          )}
        </TabsContent>

        <TabsContent value="following" className="mt-4">
          <div className="mb-4 -mx-4 overflow-x-auto px-4">
            <div className="flex gap-3 pb-2">
              {mockFollowingUsers.map((user) => (
                <Link
                  key={user.id}
                  href={`/tea-circle/user/${user.id}`}
                  className="flex shrink-0 flex-col items-center gap-1.5"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={user.avatar}
                      alt={user.nickname}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-full ring-2 ring-primary/30"
                    />
                    {user.isOnline && (
                      <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500" />
                    )}
                  </div>
                  <span className="max-w-[64px] truncate text-xs text-muted-foreground">
                    {user.nickname}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {mockPosts
              .filter((p) => p.isFollowing)
              .map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            {mockPosts.filter((p) => p.isFollowing).length === 0 && (
              <EmptyState
                icon={<Users className="h-12 w-12" />}
                title="暂无关注动态"
                description="去推荐页关注更多茶友吧"
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="topics" className="mt-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {mockTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/tea-circle/topic/${topic.name}`}
                className="rounded-xl bg-card p-4 ring-1 ring-foreground/10 transition-all hover:shadow-md hover:ring-foreground/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-primary" />
                    <h3 className="font-medium">{topic.name}</h3>
                  </div>
                  {topic.isHot && (
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <Flame className="h-3 w-3 text-orange-500" />
                      热门
                    </Badge>
                  )}
                </div>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                  {topic.description}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{topic.postCount.toLocaleString()} 讨论</span>
                  <span>{topic.viewCount.toLocaleString()} 浏览</span>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Button
        onClick={() => setPublishOpen(true)}
        className="fixed right-6 bottom-6 z-40 h-14 w-14 rounded-full shadow-lg"
        size="icon-lg"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <PublishDialog open={publishOpen} onOpenChange={setPublishOpen} />
    </div>
  )
}
