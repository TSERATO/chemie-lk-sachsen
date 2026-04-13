'use client'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface LottieAnimationProps {
  src: string
  loop?: boolean
  autoplay?: boolean
  className?: string
  width?: number | string
  height?: number | string
}

/**
 * Bettet eine LottieFiles-Animation in eine MDX-Seite ein.
 *
 * Verwendung in MDX:
 *   <LottieAnimation src="/animations/meine-animation.lottie" />
 *
 * Animationen herunterladen unter lottiefiles.com (kostenlos)
 * → als .lottie-Datei speichern → in /public/animations/ ablegen.
 */
export function LottieAnimation({
  src,
  loop = true,
  autoplay = true,
  className = 'w-full max-w-sm mx-auto my-6',
  width,
  height,
}: LottieAnimationProps) {
  return (
    <div className={className} style={width || height ? { width, height } : undefined}>
      <DotLottieReact src={src} loop={loop} autoplay={autoplay} />
    </div>
  )
}
