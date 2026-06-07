'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ImageWithFallback } from '@/components/shared/image-with-fallback'
import type { TeaPost } from '@/types/tea-circle'

interface PostCardProps {
  post: TeaPost
}

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

function ImageGrid({ images }: { images: string[] }) {
  const count = images.length

  if (count === 0) return null

  if (count === 1) {
    return (
      <div className="mt-3 overflow-hidden rounded-xl">
        <ImageWithFallback
          src={images[0]}
          alt=""
          width={600}
          height={400}
          className="h-64 w-full object-cover sm:h-80"
        />
      </div>
    )
  }

  if (count === 2) {
    return (
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        {images.map((src, i) => (
          <div key={i} className="aspect-square overflow-hidden rounded-lg">
            <ImageWithFallback
              src={src}
              alt=""
              width={300}
              height={300}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    )
  }

  const gridCols = count <= 4 ? 'grid-cols-2' : 'grid-cols-3'

  return (
    <div className={cn('mt-3 grid gap-1.5', gridCols)}>
      {images.slice(0, 9).map((src, i) => (
        <div key={i} className="aspect-square overflow-hidden rounded-lg">
          <ImageWithFallback
            src={src}
            alt=""
            width={200}
            height={200}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.isLiked)
  const [likeCount, setLikeCount] = useState(post.likeCount)
  const [expanded, setExpanded] = useState(false)
  const [following, setFollowing] = useState(post.isFollowing)

  const hasLongText = post.content.length > 80
  const displayText = hasLongText && !expanded
    ? post.content.slice(0, 80) + '...'
    : post.content

  function handleLike() {
    setLiked(!liked)
    setLikeCount((c) => (liked ? c - 1 : c + 1))
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="rounded-xl bg-card p-4 ring-1 ring-foreground/10 transition-shadow hover:shadow-md">
        <Link
          href={`/tea-circle/user/${post.author.id}`}
          className="flex items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative shrink-0">
            <ImageWithFallback
              src={post.author.avatar}
              alt={post.author.nickname}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
            {post.author.level && (
              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                Lv{post.author.level}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">{post.author.nickname}</p>
            <p className="text-xs text-muted-foreground">{formatTime(post.createdAt)}</p>
          </div>
          {!following && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setFollowing(true)
              }}
              className="shrink-0 rounded-full border border-primary px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              关注
            </button>
          )}
        </Link>

        <div className="mt-3">
          <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
            {displayText}
          </p>
          {hasLongText && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-xs text-primary hover:underline"
            >
              {expanded ? '收起' : '展开全文'}
            </button>
          )}
        </div>

        <ImageGrid images={post.images} />

        {post.topics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.topics.map((topic) => (
              <Link
                key={topic}
                href={`/tea-circle/topic/${topic}`}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                onClick={(e) => e.stopPropagation()}
              >
                #{topic}
              </Link>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-6 border-t border-border pt-3">
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
                    'h-4.5 w-4.5',
                    liked ? 'fill-rose-500 text-rose-500' : ''
                  )}
                />
              </motion.span>
            </AnimatePresence>
            <span>{likeCount}</span>
          </button>

          <Link
            href={`/tea-circle/post/${post.id}`}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <MessageCircle className="h-4.5 w-4.5" />
            <span>{post.commentCount}</span>
          </Link>

          <button className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
            <Share2 className="h-4.5 w-4.5" />
            <span>分享</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
