/**
 * markdown 渲染组件
 */
import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'
import { useMemo } from 'react'
import hljs from 'highlight.js'
import markdownItHighlight from 'markdown-it-highlightjs'
import '@/styles/markdown.css'
import 'highlight.js/styles/github.css'

const md = new MarkdownIt()
md.use(markdownItHighlight, { hljs })

const Markdown = ({ content }: { content?: string }) => {
  const html = useMemo(() => {
    // 使用 DOMPurify 清理 HTML 内容，过滤掉潜在的潜在恶意脚本
    return DOMPurify.sanitize(md.render(content || ''))
  }, [content])

  return <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
}
export default Markdown
