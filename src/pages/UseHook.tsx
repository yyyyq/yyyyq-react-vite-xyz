import { Button, Card, Typography } from 'antd'
import CodeBlock from '../components/CodeBlock'
import { useCallback, useState } from 'react'

const { Title, Text } = Typography

function ExpensiveComponent({ onClick, ...rest }) {
  console.log('ExpensiveComponent rendered')
  return (
    <Button onClick={onClick} {...rest}>
      Click me
    </Button>
  )
}

const UseHook = () => {
  const useCallbackCode = `import React, { useState, useCallback } from 'react';

function ExpensiveComponent({ onClick }) {
  console.log('ExpensiveComponent rendered');
  return <button onClick={onClick}>Click me</button>;
}

function App() {
  const [count, setCount] = useState(0);

  // 使用 useCallback 来 memoize 函数
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // 依赖数组为空，函数只会创建一次


  return (
    <div>
      <p>Count: {count}</p>
      <ExpensiveComponent onClick={handleClick} />
      <ExpensiveComponent onClick={handleClick1} />
    </div>
  );
  // 在这个例子中，handleClick 函数通过 useCallback 被 memoize 了。
  // 因为依赖数组是空的，所以 handleClick 只会在组件第一次渲染时创建一次。
  // 即使 App 组件重新渲染，handleClick 的引用也不会改变，这样 ExpensiveComponent 就不会因为 onClick 函数的变化而重新渲染，从而优化了性能。
}
  `

  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => {
    console.log('Button clicked')
    setCount((prev) => prev + 1)
  }, [])

  return (
    <div className="p-4" style={{ maxWidth: '900px' }}>
      <Title level={2}>Hook 使用与示例</Title>
      {/* 概念介绍 */}
      <Card style={{ marginBottom: 16 }}>
        <Title level={3}>概念介绍</Title>
        <Text>
          React 的 Hook 本质是基于调用顺序的状态管理机制，React
          在内部通过链表或数组按顺序存储每个 Hook 的状态。 内置
          Hook提供基础能力，如状态和副作用管理，而自定义 Hook
          是对这些能力的组合封装，用于复用逻辑。 实现自定义 Hook 时需要遵守 Hook
          规则，比如只能在顶层调用、不能在条件中使用，并且要注意副作用清理和依赖管理。
        </Text>
        <br />
        <Text type="secondary">
          React 中多个 useState 是通过调用顺序来区分的，而不是通过变量名。React
          在 Fiber 节点上维护了一条 Hook
          链表，每次组件渲染时通过一个指针按顺序遍历这条链表。每个 useState
          调用都会对应链表中的一个节点，因此只要调用顺序保持一致，就可以正确获取到对应的
          state。如果顺序发生变化，就会导致状态错位。
        </Text>
      </Card>

      {/* 示例，useCallback */}
      <Card title="示例：useCallback" style={{ marginBottom: 16 }}>
        <Text>
          useCallback 用于 memoize
          函数，避免在依赖不变时函数重新创建。它接受一个函数和一个依赖数组，只有当依赖发生变化时才会返回新的函数引用。这对于优化子组件性能非常有用，尤其是当子组件通过
          props 接收函数时，可以避免不必要的重新渲染。
        </Text>
        <br />
        <p>Count: {count}</p>
        <ExpensiveComponent
          style={{ marginBottom: 16 }}
          onClick={handleClick}
        />
        <CodeBlock language="javascript" code={useCallbackCode} />
      </Card>
    </div>
  )
}
export default UseHook
