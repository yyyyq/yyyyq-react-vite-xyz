import { Typography, Button, message } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { curry } from '../utils/currying'

const { Title } = Typography

const codeExample = `// 柯里化示例
// 参数够了自动执行，支持每次传任意个参数
// fn.length 获取函数参数个数 function a(a, b, c) {}  a.length === 3
export function curry<T extends (...args: any[]) => any>(fn: T, arity = fn.length) {
  function createCurried(prevArgs: any[]) {
    return function (this: any, ...nextArgs: any[]) {
      const args = [...prevArgs, ...nextArgs]

      // 参数够了，执行
      if (args.length >= arity) {
        return fn.apply(this, args)
      }

      // 参数不够，继续收集
      return createCurried(args).bind(this)
    }
  }

  return createCurried([])
}`

export default function Currying() {
  const add = (a: number, b: number, c: number) => a + b + c
  const curriedAdd = curry(add)

  console.log(curriedAdd(1, 2)(3))

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample)
    message.success('代码已复制')
  }

  return (
    <div className="p-4">
      <Title level={3}>Currying 柯里化</Title>

      <div style={{ position: 'relative' }}>
        <Button
          icon={<CopyOutlined />}
          size="small"
          onClick={handleCopy}
          style={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
        >
          复制
        </Button>
        <SyntaxHighlighter
          language="typescript"
          style={vscDarkPlus}
          showLineNumbers
          customStyle={{ borderRadius: 8, padding: 16 }}
        >
          {codeExample}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
