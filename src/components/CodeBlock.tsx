import { CopyOutlined } from '@ant-design/icons'
import { Button, message, Typography } from 'antd'
import SyntaxHighlighter, {
  type SyntaxHighlighterProps,
} from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const { Text } = Typography

type HighlighterProps = Omit<SyntaxHighlighterProps, 'children'>

interface CodeBlockProps extends HighlighterProps {
  readonly code: string
  readonly title?: string
}

export default function CodeBlock({
  code,
  title,
  language = 'typescript',
  style = a11yDark,
  showLineNumbers = true,
  customStyle,
  ...rest
}: CodeBlockProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    message.success('代码已复制')
  }

  return (
    <div style={{ position: 'relative', marginBottom: 16 }}>
      {title && (
        <Text strong style={{ display: 'block', marginBottom: 8 }}>
          {title}
        </Text>
      )}
      <Button
        icon={<CopyOutlined />}
        size="small"
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: title ? 32 : 8,
          right: 8,
          zIndex: 1,
        }}
      >
        复制
      </Button>
      <SyntaxHighlighter
        language={language}
        style={style}
        showLineNumbers={showLineNumbers}
        customStyle={{
          borderRadius: 8,
          padding: 16,
          margin: 0,
          ...customStyle,
        }}
        {...rest}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
