import { useState } from 'react'
import {
  Button,
  Input,
  Card,
  List,
  Checkbox,
  Space,
  Typography,
  Divider,
} from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useCounterStore } from '../store/zustand/useCounterStore'
import { useTodoStore } from '../store/zustand/useTodoStore'
import CodeBlock from '../components/CodeBlock'

const { Title, Text } = Typography

export default function ZustandDemo() {
  const [inputValue, setInputValue] = useState('')

  // 使用 zustand store - 可以选择性订阅状态
  const count = useCounterStore((state) => state.count)
  const { increment, decrement, reset, incrementBy } = useCounterStore()

  const todos = useTodoStore((state) => state.todos)
  const { addTodo, toggleTodo, removeTodo, clearCompleted } = useTodoStore()

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      addTodo(inputValue.trim())
      setInputValue('')
    }
  }

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="p-6 max-w-4xl">
      <Title level={2}>Zustand 状态管理示例</Title>
      <Text type="secondary">
        Zustand 是一个轻量级的状态管理库，API 简洁，无需 Provider 包装。
      </Text>

      <Divider />

      {/* 计数器示例 */}
      <Card title="示例 1: 计数器" className="mb-6">
        <div className="text-center">
          <Title level={1} className="!mb-6">
            {count}
          </Title>
          <Space>
            <Button onClick={decrement}>-1</Button>
            <Button type="primary" onClick={increment}>
              +1
            </Button>
            <Button onClick={() => incrementBy(5)}>+5</Button>
            <Button danger onClick={reset}>
              重置
            </Button>
          </Space>
        </div>

        <Divider dashed />
        <Title level={5}>代码示例：</Title>
        <CodeBlock
          code={`// 创建 store
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))

// 使用 store
const count = useCounterStore((state) => state.count)
const { increment } = useCounterStore()`}
        ></CodeBlock>
      </Card>

      {/* Todo 示例 */}
      <Card title="示例 2: Todo 列表（带持久化）" className="mb-6">
        <Space.Compact className="w-full mb-4">
          <Input
            placeholder="添加新任务..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleAddTodo}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddTodo}
          >
            添加
          </Button>
        </Space.Compact>

        <List
          bordered
          dataSource={todos}
          locale={{ emptyText: '暂无任务' }}
          renderItem={(todo) => (
            <List.Item
              actions={[
                <Button
                  key="delete"
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeTodo(todo.id)}
                />,
              ]}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              >
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#999' : 'inherit',
                  }}
                >
                  {todo.text}
                </span>
              </Checkbox>
            </List.Item>
          )}
        />

        {todos.length > 0 && (
          <div className="mt-4 flex justify-between items-center">
            <Text type="secondary">
              已完成 {completedCount} / {todos.length}
            </Text>
            {completedCount > 0 && (
              <Button size="small" onClick={clearCompleted}>
                清除已完成
              </Button>
            )}
          </div>
        )}

        <Divider dashed />
        <Title level={5}>持久化代码示例：</Title>
        <CodeBlock
          code={`import { persist } from 'zustand/middleware'

const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text) => set((state) => ({
        todos: [...state.todos, { id: Date.now(), text, completed: false }]
      })),
    }),
    { name: 'todo-storage' } // localStorage key
  )
)`}
        />
      </Card>

      {/* Zustand vs Redux 对比 */}
      <Card title="Zustand vs Redux 对比">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">特性</th>
              <th className="text-left p-2">Zustand</th>
              <th className="text-left p-2">Redux Toolkit</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">包大小</td>
              <td className="p-2">~1KB</td>
              <td className="p-2">~10KB+</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Provider</td>
              <td className="p-2">不需要</td>
              <td className="p-2">需要</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">样板代码</td>
              <td className="p-2">极少</td>
              <td className="p-2">较多</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">DevTools</td>
              <td className="p-2">支持</td>
              <td className="p-2">支持</td>
            </tr>
            <tr>
              <td className="p-2">适用场景</td>
              <td className="p-2">中小型项目</td>
              <td className="p-2">大型复杂项目</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  )
}
