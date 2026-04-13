import { defineDocs, defineConfig } from 'fumadocs-mdx/config'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export const { docs, meta } = defineDocs({
  dir: 'content/docs',
})

export default defineConfig({
  mdxOptions: {
    // remark-math muss im Remark-Schritt laufen
    remarkPlugins: (v) => [remarkMath, ...v],
    // rehype-katex VOR Shiki einfügen (Shiki würde sonst "math" als Sprache suchen)
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
})
