import { useState, useEffect, useRef, useCallback, useMemo, useReducer, memo } from 'react'
import { Button, Card, Typography, Input, Space, Divider, Tag, Alert } from 'antd'
import CodeBlock from '../components/CodeBlock'
import { useLocalStorage } from '../hooks/useLocalStorage'

const { Title, Text, Paragraph } = Typography

const MemoizedButton = memo(function MemoizedButton({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) {
  console.log('MemoizedButton rendered')
  return <Button onClick={onClick}>{children}</Button>
})

const UseHook = () => {
  // useReducer
  type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' } | { type: 'set'; value: number }
  const counterReducer = (state: number, action: Action): number => {
    switch (action.type) {
      case 'increment':
        return state + 1
      case 'decrement':
        return state - 1
      case 'reset':
        return 0
      case 'set':
        return action.value
      default:
        return state
    }
  }
  const [reducerCount, dispatch] = useReducer(counterReducer, 0)

  // useState
  const [name, setName] = useState('')

  // useEffect
  const [effectCount, setEffectCount] = useState(0)
  useEffect(() => {
    document.title = `Clicked ${effectCount} times`
    return () => {
      document.title = 'React App'
    }
  }, [effectCount])

  // useRef
  const inputRef = useRef<HTMLInputElement>(null)
  const renderCount = useRef(1)
  const [refTrigger, setRefTrigger] = useState(0)

  renderCount.current += 1

  // useCallback
  const [cbCount, setCbCount] = useState(0)
  const [cbToggle, setCbToggle] = useState(false)

  const handleIncrement = useCallback(() => {
    setCbCount((c) => c + 1)
  }, [])

  // useMemo
  const [fibInput, setFibInput] = useState(10)
  const [memoToggle, setMemoToggle] = useState(0)

  const fibResult = useMemo(() => {
    console.log('Computing Fibonacci...')
    const fib = (n: number): number => {
      if (n <= 1) return n
      return fib(n - 1) + fib(n - 2)
    }
    return fib(fibInput)
  }, [fibInput])

  // Custom Hook
  const [storedName, setStoredName] = useLocalStorage('demo-name', '')
  const [theme, setTheme] = useLocalStorage('demo-theme', 'light')

  const useReducerCode = `type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set'; value: number }

const counterReducer = (state: number, action: Action): number => {
  switch (action.type) {
    case 'increment': return state + 1
    case 'decrement':  return state - 1
    case 'reset':      return 0
    case 'set':        return action.value
    default:           return state
  }
}

const [count, dispatch] = useReducer(counterReducer, 0)

// 使用
dispatch({ type: 'increment' })
dispatch({ type: 'set', value: 10 })`

  const useStateCode = `const [name, setName] = useState('')

// name  —— 当前状态值
// setName —— 更新函数
// ''   —— 初始值

// 更新
<input value={name} onChange={e => setName(e.target.value)} />`

  const useEffectCode = `useEffect(() => {
  document.title = \`Clicked \${count} times\`

  return () => {
    // cleanup: 组件卸载或依赖变化前执行
    document.title = 'React App'
  }
}, [count]) // 仅 count 变化时重新执行`

  const useRefCode = `// DOM 引用
const inputRef = useRef<HTMLInputElement>(null)
inputRef.current?.focus()

// 可变值（修改不会触发重渲染）
const renderCount = useRef(0)
renderCount.current += 1`

  const useCallbackCode = `const handleClick = useCallback(() => {
  setCount(c => c + 1)
}, []) // 空依赖 → 函数引用永不改变

const MemoizedBtn = memo(function MemoizedBtn({ onClick }) {
  return <button onClick={onClick}>+1</button>
})

// 父组件重渲染时，只要 handleClick 引用不变，
// MemoizedBtn 就不会重新渲染`

  const useMemoCode = `const result = useMemo(() => {
  // 只在 fibInput 变化时重新计算
  return expensiveComputation(fibInput)
}, [fibInput])`

  const customHookCode = `// useLocalStorage 实现
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

// 使用示例
const [name, setName] = useLocalStorage('name', '')
// 刷新页面后值仍然保留`

  return (
    <div className="p-4" style={{ maxWidth: '960px' }}>
      <Title level={2}>Hook 使用与示例</Title>
      <Paragraph type="secondary">
        React 16.8 引入的 Hook 特性，让你在不编写 class 的情况下使用 state 和其他 React 特性。
      </Paragraph>

      {/* 概念介绍 */}
      <Card style={{ marginBottom: 16 }}>
        <Title level={4}>概念介绍</Title>
        <Paragraph>
          React Hook 本质是基于调用顺序的状态管理机制。React 在内部通过链表按顺序存储每个 Hook 的状态。
          内置 Hook 提供基础能力（状态管理、副作用处理、性能优化等），自定义 Hook 则是对这些能力的组合封装，用于复用逻辑。
        </Paragraph>
        <Paragraph>
          <Text strong>核心规则：</Text>Hook 必须在组件的顶层调用，不能在条件语句或循环中使用。
          React 依赖调用顺序来关联每次渲染中的同一个 Hook，顺序一旦变化就会导致状态错位。
        </Paragraph>
      </Card>

      {/* useState */}
      <Card title="useState — 状态管理" style={{ marginBottom: 16 }}>
        <Paragraph>useState 是最基础的 Hook，用于在函数组件中声明和管理状态。</Paragraph>
        <Space direction="vertical" className="w-full">
          <div>
            <Text>输入内容：</Text>
            <Input
              style={{ width: 300, marginLeft: 8 }}
              placeholder="输入一些文字..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Text>
            当前值：<Text strong>{name || '（空）'}</Text>
          </Text>
        </Space>
        <Divider />
        <CodeBlock code={useStateCode} title="基本用法" />
      </Card>

      {/* useReducer */}
      <Card title="useReducer — 复杂状态逻辑" style={{ marginBottom: 16 }}>
        <Paragraph>
          useReducer 是 useState 的替代方案，适用于状态逻辑复杂、包含多个子值或下一状态依赖于前一状态的场景。
          它通过 <Text code>reducer</Text> 函数集中管理状态变更，使状态更新可预测且易于测试。
        </Paragraph>
        <Space>
          <Button onClick={() => dispatch({ type: 'decrement' })}>-1</Button>
          <Text style={{ fontSize: 24, fontWeight: 'bold', minWidth: 40, textAlign: 'center' }}>
            {reducerCount}
          </Text>
          <Button onClick={() => dispatch({ type: 'increment' })}>+1</Button>
          <Button onClick={() => dispatch({ type: 'reset' })}>重置</Button>
          <Button onClick={() => dispatch({ type: 'set', value: 100 })}>设为 100</Button>
        </Space>
        <Divider />
        <CodeBlock code={useReducerCode} title="基本用法" />
      </Card>

      {/* useEffect */}
      <Card title="useEffect — 副作用处理" style={{ marginBottom: 16 }}>
        <Paragraph>
          useEffect 用于处理副作用（数据请求、订阅、DOM 操作等）。接受一个回调函数和依赖数组，
          当依赖变化时重新执行。返回的清理函数会在组件卸载或依赖变化前执行。
        </Paragraph>
        <Space>
          <Button onClick={() => setEffectCount((c) => c + 1)}>
            Clicked {effectCount} times
          </Button>
          <Button onClick={() => setEffectCount(0)}>Reset</Button>
        </Space>
        <br />
        <Text type="secondary">观察浏览器标签页标题的变化</Text>
        <Divider />
        <CodeBlock code={useEffectCode} title="基本用法" />
        <Alert
          type="info"
          showIcon
          message="依赖数组模式：[] 仅挂载/卸载时执行 | [dep] dep 变化时执行 | 不传 每次渲染都执行"
          style={{ marginTop: 8 }}
        />
      </Card>

      {/* useRef */}
      <Card title="useRef — DOM 引用与可变值" style={{ marginBottom: 16 }}>
        <Paragraph>
          useRef 返回一个可变的 ref 对象，其 <Text code>.current</Text> 属性可存放任何值。
          与 state 不同，修改 ref 不会触发重新渲染。常用于访问 DOM 元素或保存跨渲染周期的可变数据。
        </Paragraph>
        <Space>
          <Input ref={inputRef} style={{ width: 200 }} placeholder="聚焦目标" />
          <Button onClick={() => inputRef.current?.focus()}>聚焦输入框</Button>
          <Button onClick={() => setRefTrigger((c) => c + 1)}>
            Re-render ({refTrigger})
          </Button>
        </Space>
        <br />
        <Text type="secondary">
          组件已渲染 <Text strong>{renderCount.current}</Text> 次（不依赖 state，纯 ref 计数）
        </Text>
        <Divider />
        <CodeBlock code={useRefCode} title="基本用法" />
      </Card>

      {/* useCallback */}
      <Card title="useCallback — 函数引用稳定化" style={{ marginBottom: 16 }}>
        <Paragraph>
          useCallback 用于缓存函数引用，只有当依赖变化时才返回新函数。
          配合 <Text code>React.memo</Text> 使用，可以避免子组件因父组件重渲染而进行不必要的更新。
        </Paragraph>
        <Paragraph type="secondary">打开控制台观察 MemoizedButton 的渲染日志：</Paragraph>
        <Space>
          <MemoizedButton onClick={handleIncrement}>
            Count: {cbCount}
          </MemoizedButton>
          <Button onClick={() => setCbToggle((c) => !c)}>
            Toggle (re-render parent): {String(cbToggle)}
          </Button>
        </Space>
        <br />
        <Text type="secondary">
          点击 Toggle 时，MemoizedButton 不会重渲染（控制台无新日志）
        </Text>
        <Divider />
        <CodeBlock code={useCallbackCode} title="基本用法" />
      </Card>

      {/* useMemo */}
      <Card title="useMemo — 计算优化" style={{ marginBottom: 16 }}>
        <Paragraph>
          useMemo 用于缓存计算结果，只在依赖变化时重新计算。适用于开销较大的计算场景。
        </Paragraph>
        <Space>
          <Input
            type="number"
            style={{ width: 100 }}
            value={fibInput}
            onChange={(e) => setFibInput(Number(e.target.value))}
          />
          <Text>
            Fibonacci({fibInput}) = <Text strong>{fibResult}</Text>
          </Text>
          <Button onClick={() => setMemoToggle((c) => c + 1)}>
            Re-render ({memoToggle})
          </Button>
        </Space>
        <br />
        <Text type="secondary">
          点击 Re-render 时不会重新计算 Fibonacci（控制台无日志）
        </Text>
        <Divider />
        <CodeBlock code={useMemoCode} title="基本用法" />
      </Card>

      {/* 自定义 Hook */}
      <Card title="自定义 Hook — 逻辑复用" style={{ marginBottom: 16 }}>
        <Paragraph>
          自定义 Hook 将组件逻辑提取为可复用的函数，命名必须以 <Text code>use</Text> 开头。
          以下演示 <Text code>useLocalStorage</Text>——数据持久化到 localStorage，刷新后依然保持。
        </Paragraph>
        <Space direction="vertical" className="w-full">
          <div>
            <Text>输入内容（刷新页面后仍保留）：</Text>
            <Input
              style={{ width: 300, marginLeft: 8 }}
              placeholder="输入一些文字..."
              value={storedName}
              onChange={(e) => setStoredName(e.target.value)}
            />
          </div>
          <div>
            <Text>当前主题：</Text>
            <Tag
              color={theme === 'dark' ? 'purple' : 'gold'}
              className="cursor-pointer"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme}
            </Tag>
            <Text type="secondary" style={{ marginLeft: 8 }}>
              （点击切换，刷新后不变）
            </Text>
          </div>
        </Space>
        <Divider />
        <CodeBlock code={customHookCode} title="useLocalStorage 实现" />
      </Card>

      {/* Hook 规则 */}
      <Card title="Hook 使用规则">
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li style={{ marginBottom: 8 }}>
            <Text>只在最顶层使用 Hook，不要在循环、条件或嵌套函数中调用</Text>
          </li>
          <li style={{ marginBottom: 8 }}>
            <Text>只在 React 函数组件或自定义 Hook 中调用 Hook</Text>
          </li>
          <li style={{ marginBottom: 8 }}>
            <Text>useEffect 的依赖数组必须包含所有外部依赖</Text>
          </li>
          <li style={{ marginBottom: 8 }}>
            <Text>自定义 Hook 必须以 <Text code>use</Text> 开头</Text>
          </li>
          <li>
            <Text>多个 Hook 通过调用顺序区分，因此调用顺序必须稳定</Text>
          </li>
        </ul>
      </Card>
    </div>
  )
}
export default UseHook
