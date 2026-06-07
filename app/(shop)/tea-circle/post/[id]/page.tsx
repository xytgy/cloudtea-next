'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Heart, MessageCircle, Share2, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ImageWithFallback } from '@/components/shared/image-with-fallback'
import { mockPostDetail, mockComments } from '@/lib/mock/tea-circle'
import type { Comment } from '@/types/tea-circle'

function formatTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHour = Math.floor(diffMs / 3600000)
  const diffDay = Math.floor(diffMs / 86400000)

  if (diffMin < 1) return '刚刚'
  if (diffMin < 60) return `${diffMin}分钟前`
  if (diffHour < 24) return `${diffHour}小时前`
  if (diffDay < 7) return `${diffDay}天前`
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [replyTo, setReplyTo] = useState<string | null>(null)

  return (
    <div className={cn('py-3', depth > 0 && 'ml-10 border-l-2 border-border pl-4')}>
      <div className="flex items-start gap-3">
        <Link href={`/tea-circle/user/${comment.author.id}`}>
          <ImageWithFallback
            src={comment.author.avatar}
            alt={comment.author.nickname}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{comment.author.nickname}</span>
            <span className="text-xs text-muted-foreground">{formatTime(comment.createdAt)}</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed">
            {comment.replyTo && (
              <span className="text-muted-foreground">
                回复 <span className="text-primary">@{comment.replyTo.nickname}</span>{' '}
              </span>
            )}
            {comment.content}
          </p>
          <button
            onClick={() => setReplyTo(replyTo ? null : comment.author.nickname)}
            className="mt-1 text-xs text-muted-foreground hover:text-primary"
          >
            回复
          </button>

          {replyTo === comment.author.nickname && (
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder={`回复 @${comment.author.nickname}...`}
                className="flex-1 rounded-lg border bg-transparent px-3 py-1.5 text-sm outline-none focus:border-primary"
              />
              <button className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/80">
                发送
              </button>
            </div>
          )}
        </div>
      </div>

      {comment.children && comment.children.length > 0 && (
        <div>
          {comment.children.map((child) => (
            <CommentItem key={child.id} comment={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function PostDetailPage() {
  const [liked, setLiked] = useState(mockPostDetail.isLiked)
  const [likeCount, setLikeCount] = useState(mockPostDetail.likeCount)
  const [following, setFollowing] = useState(mockPostDetail.isFollowing)
  const [commentText, setCommentText] = useState('')

  function handleLike() {
    setLiked(!liked)
    setLikeCount((c) => (liked ? c - 1 : c + 1))
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6">
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/tea-circle"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-lg font-semibold">动态详情</h1>
      </div>

      <article className="space-y-4">
        <div className="flex items-center gap-3">
          <Link href={`/tea-circle/user/${mockPostDetail.author.id}`}>
            <ImageWithFallback
              src={mockPostDetail.author.avatar}
              alt={mockPostDetail.author.nickname}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <p className="font-medium">{mockPostDetail.author.nickname}</p>
            <p className="text-xs text-muted-foreground">{formatTime(mockPostDetail.createdAt)}</p>
          </div>
          {!following && (
            <button
              onClick={() => setFollowing(true)}
              className="rounded-full border border-primary px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              关注
            </button>
          )}
        </div>

        <div>
          <p className="whitespace-pre-line text-sm leading-relaxed">
            {mockPostDetail.content}
          </p>
        </div>

        {mockPostDetail.images.length > 0 && (
          <div className="space-y-2">
            {mockPostDetail.images.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-xl">
                <ImageWithFallback
                  src={src}
                  alt=""
                  width={600}
                  height={400}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {mockPostDetail.topics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {mockPostDetail.topics.map((topic) => (
              <Link
                key={topic}
                href={`/tea-circle/topic/${topic}`}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
              >
                #{topic}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-6 border-t border-border pt-3">
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-rose-500"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={liked ? 'liked' : 'unliked'}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                <Heart
                  className={cn(
                    'h-5 w-5',
                    liked ? 'fill-rose-500 text-rose-500' : ''
                  )}
                />
              </motion.span>
            </AnimatePresence>
            <span>{likeCount}</span>
          </button>

          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MessageCircle className="h-5 w-5" />
            <span>{mockPostDetail.commentCount}</span>
          </span>

          <button className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
            <Share2 className="h-5 w-5" />
            <span>分享</span>
          </button>
        </div>
      </article>

      <div className="mt-6 border-t border-border pt-4">
        <h2 className="mb-2 text-sm font-medium">
          评论 ({mockComments.length})
        </h2>
        <div className="divide-y divide-border">
          {mockComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 -mx-4 mt-4 border-t border-border bg-background px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="写评论..."
            className="flex-1 rounded-full border bg-transparent px-4 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
              commentText.trim()
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            )}
            disabled={!commentText.trim()}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
