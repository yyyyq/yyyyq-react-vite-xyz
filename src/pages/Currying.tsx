import { Typography, Card, Divider } from 'antd'
import { curry } from '../utils/currying'
import CodeBlock from '../components/CodeBlock'

const { Title, Paragraph, Text } = Typography

const codeExample = `// 柯里化实现
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

const usageExample = `// 使用示例
const add = (a, b, c) => a + b + c
const curriedAdd = curry(add)

// 以下调用方式都等价，结果都是 6
curriedAdd(1)(2)(3)      // 每次传一个
curriedAdd(1, 2)(3)      // 先传两个，再传一个
curriedAdd(1)(2, 3)      // 先传一个，再传两个
curriedAdd(1, 2, 3)      // 一次传完`

const realWorldExample = `// 实际应用：日志函数
const log = (level, module, message) =>
  console.log(\`[\${level}] [\${module}] \${message}\`)

const curriedLog = curry(log)

// 创建特定级别的日志函数
const errorLog = curriedLog('ERROR')
const warnLog = curriedLog('WARN')

// 创建特定模块的日志函数
const authError = errorLog('Auth')
const dbError = errorLog('Database')

// 使用
authError('Login failed')      // [ERROR] [Auth] Login failed
dbError('Connection timeout')  // [ERROR] [Database] Connection timeout`

export default function Currying() {
  const add = (a: number, b: number, c: number) => a + b + c
  const curriedAdd = curry(add)

  console.log(curriedAdd(1, 2)(3))

  return (
    <div className="p-4" style={{ maxWidth: 900 }}>
      <Title level={2}>Currying 柯里化</Title>

      {/* 概念介绍 */}
      <Card style={{ marginBottom: 16 }}>
        <Title level={4}>什么是柯里化？</Title>
        <Paragraph>
          <Text strong>柯里化（Currying）</Text>
          是一种将接受多个参数的函数转换为一系列接受单个参数的函数的技术。
          它以数学家 Haskell Curry 的名字命名。
        </Paragraph>
        <Paragraph>
          简单来说：<Text code>f(a, b, c)</Text> 转换为{' '}
          <Text code>f(a)(b)(c)</Text>
        </Paragraph>
      </Card>

      {/* 核心特点 */}
      <Card style={{ marginBottom: 16 }}>
        <Title level={4}>核心特点</Title>
        <Paragraph>
          <ul>
            <li>
              <Text strong>延迟执行</Text>：参数不够时返回新函数，够了才执行
            </li>
            <li>
              <Text strong>参数复用</Text>：可以固定部分参数，生成特定功能的函数
            </li>
            <li>
              <Text strong>灵活调用</Text>：支持一次传一个或多个参数
            </li>
          </ul>
        </Paragraph>
      </Card>

      {/* 使用示例 */}
      <Card style={{ marginBottom: 16 }}>
        <Title level={4}>基本用法</Title>
        <CodeBlock code={usageExample} />
      </Card>

      {/* 实际应用 */}
      <Card style={{ marginBottom: 16 }}>
        <Title level={4}>实际应用场景</Title>
        <Paragraph>柯里化在以下场景特别有用：</Paragraph>
        <Paragraph>
          <ul>
            <li>
              <Text strong>参数复用</Text>：创建预设部分参数的工具函数
            </li>
            <li>
              <Text strong>延迟计算</Text>：收集参数后再统一执行
            </li>
            <li>
              <Text strong>函数组合</Text>：配合 compose/pipe 进行函数式编程
            </li>
          </ul>
        </Paragraph>
        <CodeBlock code={realWorldExample} title="示例：日志函数" />
      </Card>

      <Divider />

      {/* 实现代码 */}
      <Title level={4}>柯里化函数实现</Title>
      <CodeBlock code={codeExample} />

      {/* 执行流程 */}
      <Card>
        <Title level={4}>执行流程图解</Title>
        <Paragraph>
          以 <Text code>curriedAdd(1, 2)(3)</Text> 为例：
        </Paragraph>
        <pre
          style={{
            background: '#f5f5f5',
            padding: 16,
            borderRadius: 8,
            overflow: 'auto',
          }}
        >
          {`curry(add)           → 返回函数 f，闭包中 prevArgs = []
    ↓
f(1, 2)              → prevArgs=[], nextArgs=[1,2]
                     → args = [1,2], 长度 2 < 3
                     → 返回新函数 g，闭包中 prevArgs = [1,2]
    ↓
g(3)                 → prevArgs=[1,2], nextArgs=[3]
                     → args = [1,2,3], 长度 3 >= 3
                     → 执行 add(1,2,3) = 6`}
        </pre>
      </Card>
    </div>
  )
}
