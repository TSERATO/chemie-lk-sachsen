import type { MDXComponents } from 'mdx/types'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { LottieAnimation } from '@/components/lottie-animation'
import { Quiz } from '@/components/en-quiz'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    LottieAnimation,
    Quiz,
    ...components,
  }
}
