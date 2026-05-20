'use client'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface LottieAnimationProps {
  src?: string
  srcLight?: string
  srcDark?: string
  loop?: boolean
  autoplay?: boolean
  className?: string
  width?: number | string
  height?: number | string
}

export function LottieAnimation({
  src,
  srcLight,
  srcDark,
  loop = true,
  autoplay = true,
  className = 'w-full max-w-sm mx-auto my-6',
  width,
  height,
}: LottieAnimationProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const source =
    srcLight && srcDark
      ? resolvedTheme === 'dark'
        ? srcDark
        : srcLight
      : src

  if (!source) return null

  return (
    <div className={className} style={width || height ? { width, height } : undefined}>
      <DotLottieReact src={source} loop={loop} autoplay={autoplay} />
    </div>
  )
}
