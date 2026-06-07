'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, Users, UserPlus, PenLine } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ImageWithFallback } from '@/components/shared/image-with-fallback'
import { EmptyState } from '@/components/shared/empty-state'
import { PostCard } from '@/components/tea-circle/post-card'
import { mockUserProfile, mockPosts } from '@/lib/mock/tea-circle'

function formatCount(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + '万'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return String(n)
}

export default function UserProfilePage() {
  const [following, setFollowing] = useState(mockUserProfile.isFollowing)

  const userPosts = mockPosts.filter((p) => p.author.id === mockUserProfile.id)

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6">
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/tea-circle"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-lg font-semibold">个人主页</h1>
      </div>

      <div className="rounded-xl bg-card p-6 ring-1 ring-foreground/10">
        <div className="flex items-center gap-4">
          <ImageWithFallback
            src={mockUserProfile.avatar}
            alt={mockUserProfile.nickname}
            width={72}
            height={72}
            className="h-18 w-18 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold">{mockUserProfile.nickname}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{mockUserProfile.signature}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-8">
          <div className="text-center">
            <p className="text-lg font-bold">{formatCount(mockUserProfile.followingCount)}</p>
            <p className="text-xs text-muted-foreground">关注</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{formatCount(mockUserProfile.followerCount)}</p>
            <p className="text-xs text-muted-foreground">粉丝</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{formatCount(mockUserProfile.likeCount)}</p>
            <p className="text-xs text-muted-foreground">获赞</p>
          </div>
        </div>

        <div className="mt-5">
          {following ? (
            <Button variant="outline" className="w-full" onClick={() => setFollowing(false)}>
              已关注
            </Button>
          ) : (
            <Button className="w-full" onClick={() => setFollowing(true)}>
              <UserPlus className="h-4 w-4" />
              关注
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Tabs defaultValue="posts">
          <TabsList variant="line" className="w-full">
            <TabsTrigger value="posts" className="flex-1">
              动态 ({mockUserProfile.postCount})
            </TabsTrigger>
            <TabsTrigger value="followers" className="flex-1">
              粉丝 ({mockUserProfile.followerCount})
            </TabsTrigger>
            <TabsTrigger value="following" className="flex-1">
              关注 ({mockUserProfile.followingCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-4 space-y-4">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <EmptyState
                icon={<PenLine className="h-12 w-12" />}
                title="暂无动态"
                description="该用户还没有发布任何动态"
              />
            )}
          </TabsContent>

          <TabsContent value="followers" className="mt-4">
            <EmptyState
              icon={<Users className="h-12 w-12" />}
              title="粉丝列表"
              description="暂无粉丝数据"
            />
          </TabsContent>

          <TabsContent value="following" className="mt-4">
            <EmptyState
              icon={<Heart className="h-12 w-12" />}
              title="关注列表"
              description="暂无关注数据"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
