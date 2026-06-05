import { useState } from 'react'
import { Button, Card, Typography, Divider, Table, Tag, Space, Spin, Alert } from 'antd'
import { ReloadOutlined, LinkOutlined } from '@ant-design/icons'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import CodeBlock from '../components/CodeBlock'

const { Title, Text, Paragraph } = Typography

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

const postFetcher = (url: string) => fetch(url).then((res) => res.json())

async function addPost(_url: string, { arg }: { arg: { title: string; body: string } }) {
  return fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((res) => res.json())
}

export default function SWRDemo() {
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')

  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
  } = useSWR<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=5', postFetcher)

  const { data: todo, error: todoError, isLoading: todoLoading } = useSWR<Todo>(
    'https://jsonplaceholder.typicode.com/todos/1',
    fetcher,
    { refreshInterval: 30000 },
  )

  const { trigger: createPost, isMutating } = useSWRMutation(
    'https://jsonplaceholder.typicode.com/posts',
    addPost,
  )

  const handleCreatePost = async () => {
    if (!postTitle.trim() || !postBody.trim()) return
    await createPost({ title: postTitle, body: postBody })
    setPostTitle('')
    setPostBody('')
  }

  const handleRefreshPosts = () => {
    mutate('https://jsonplaceholder.typicode.com/posts?_limit=5')
  }

  const postColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: '标题', dataIndex: 'title', key: 'title', ellipsis: true },
    { title: '内容', dataIndex: 'body', key: 'body', ellipsis: true },
  ]

  return (
    <div className="p-6 max-w-4xl">
      <Title level={2}>SWR 数据请求示例</Title>
      <Text type="secondary">
        SWR 是 Vercel 推出的 React Hooks 数据请求库，核心策略是
        "stale-while-revalidate"（优先返回缓存数据，再发起请求验证更新）。
      </Text>

      <Divider />

      {/* 核心概念 */}
      <Card title="SWR 核心概念" className="mb-6">
        <div className="space-y-4">
          <div>
            <Title level={5}>1. Stale-While-Revalidate 策略</Title>
            <Paragraph>
              先从缓存返回旧数据（stale），同时发起请求验证（revalidate），
              当新数据返回时自动更新 UI。用户永远看到的是即时响应，无需等待加载。
            </Paragraph>
          </div>
          <div>
            <Title level={5}>2. 自动重新验证</Title>
            <Paragraph>
              <ul className="list-disc pl-6">
                <li>窗口重新聚焦时自动重新请求</li>
                <li>轮询（设置 refreshInterval）</li>
                <li>网络重连时自动重新请求</li>
                <li>手动触发 mutate 更新</li>
              </ul>
            </Paragraph>
          </div>
          <div>
            <Title level={5}>3. 去重与缓存</Title>
            <Paragraph>
              同一时间对同一请求的多次调用会自动去重（deduplication），
              全局共享缓存，多个组件使用同一 key 时只发一次请求。
            </Paragraph>
          </div>
          <div>
            <Title level={5}>4. 突变（Mutation）</Title>
            <Paragraph>
              通过 useSWRMutation 或 mutate 实现乐观更新（Optimistic UI），
              先更新本地缓存让 UI 即时响应，再发送请求到服务端。
            </Paragraph>
          </div>
        </div>
      </Card>

      {/* 基础用法 */}
      <Card title="基础用法 — 获取单个资源" className="mb-6">
        {todoLoading ? (
          <Spin tip="加载中..." />
        ) : todoError ? (
          <Alert message="请求失败" type="error" showIcon />
        ) : todo ? (
          <div>
            <div className="mb-2">
              <Text strong>Todo #</Text>
              <Tag className="ml-2">{todo.id}</Tag>
            </div>
            <div className="mb-2">
              <Text strong>标题：</Text>
              <Text>{todo.title}</Text>
            </div>
            <div className="mb-2">
              <Text strong>状态：</Text>
              <Tag color={todo.completed ? 'green' : 'orange'}>
                {todo.completed ? '已完成' : '进行中'}
              </Tag>
            </div>
            <Text type="secondary" className="block mt-2">
              每 30 秒自动重新请求（refreshInterval=30000）
            </Text>
          </div>
        ) : null}

        <Divider dashed />
        <Title level={5}>代码示例：</Title>
        <CodeBlock
          code={`import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json())

function Todo() {
  const { data, error, isLoading } = useSWR(
    'https://jsonplaceholder.typicode.com/todos/1',
    fetcher,
    { refreshInterval: 30000 }
  )

  if (isLoading) return <Spin />
  if (error) return <Alert type="error" />
  return <div>{data.title}</div>
}`}
        />
      </Card>

      {/* 列表与 Mutation 示例 */}
      <Card
        title="列表获取 + 突变（Mutation）"
        className="mb-6"
        extra={
          <Button icon={<ReloadOutlined />} onClick={handleRefreshPosts} loading={postsLoading}>
            刷新
          </Button>
        }
      >
        {postsLoading ? (
          <Spin tip="加载中..." />
        ) : postsError ? (
          <Alert message="请求失败" type="error" showIcon />
        ) : (
          <Table
            dataSource={posts}
            columns={postColumns}
            rowKey="id"
            size="small"
            pagination={false}
          />
        )}

        <Divider dashed />

        <Title level={5}>添加新文章（POST 请求）：</Title>
        <Space.Compact className="w-full mb-2">
          <input
            className="border border-gray-300 rounded-l px-3 py-1.5 text-sm w-1/3 outline-none focus:border-blue-400"
            placeholder="标题"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <input
            className="border border-gray-300 px-3 py-1.5 text-sm flex-1 outline-none focus:border-blue-400"
            placeholder="内容"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
          <Button
            type="primary"
            onClick={handleCreatePost}
            loading={isMutating}
            className="rounded-l-none"
          >
            添加
          </Button>
        </Space.Compact>

        <Divider dashed />
        <Title level={5}>代码示例：</Title>
        <CodeBlock
          code={`import useSWR, { useSWRMutation } from 'swr'

// 获取列表
const { data, error, isLoading } = useSWR<Post[]>(
  '/api/posts?_limit=5',
  fetcher
)

// 突变（POST）
async function addPost(url, { arg }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((r) => r.json())
}

const { trigger, isMutating } = useSWRMutation('/api/posts', addPost)

// 手动刷新
const handleRefresh = () => {
  mutate('/api/posts?_limit=5') // 重新验证
}

// 乐观更新
mutate('/api/posts', newData, { optimisticData: newData, revalidate: false })`}
        />
      </Card>

      {/* 条件请求与依赖 */}
      <Card title="条件请求与预加载" className="mb-6">
        <Paragraph>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <Text strong>条件请求：</Text>
              当 data 为 null 或 undefined 时自动跳过请求
            </li>
            <li>
              <Text strong>依赖请求：</Text>
              第二个请求依赖第一个请求的结果作为参数
            </li>
            <li>
              <Text strong>预加载：</Text>
              使用 preload 在用户交互前预取数据
            </li>
          </ul>
        </Paragraph>

        <Title level={5}>代码示例：</Title>
        <CodeBlock
          language="typescript"
          code={`// 条件请求（data 为 falsy 时不发起请求）
const { data: user } = useSWR(userId ? '/api/user/' + userId : null)

// 依赖请求
const { data: user } = useSWR('/api/user/1', fetcher)
const { data: posts } = useSWR(
  user ? '/api/user/' + user.id + '/posts' : null,
  fetcher
)

// 预加载
const preload = (url) => mutate(url, fetcher(url))

// 在 hover 或 click 前预取
<Link onMouseEnter={() => preload('/api/posts')}>
  查看文章列表
</Link>`}
        />
      </Card>

      {/* 与其他方案对比 */}
      <Card title="SWR vs 其他数据请求方案">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">特性</th>
              <th className="text-left p-2">SWR</th>
              <th className="text-left p-2">RTK Query</th>
              <th className="text-left p-2">React Query</th>
              <th className="text-left p-2">useEffect</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">缓存策略</td>
              <td className="p-2">stale-while-revalidate</td>
              <td className="p-2">规范化缓存</td>
              <td className="p-2">LRU 缓存</td>
              <td className="p-2">无</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">自动重新验证</td>
              <td className="p-2">支持</td>
              <td className="p-2">支持</td>
              <td className="p-2">支持</td>
              <td className="p-2">需手动</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">去重</td>
              <td className="p-2">支持</td>
              <td className="p-2">支持</td>
              <td className="p-2">支持</td>
              <td className="p-2">不支持</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">乐观更新</td>
              <td className="p-2">支持</td>
              <td className="p-2">支持</td>
              <td className="p-2">支持</td>
              <td className="p-2">需手动</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">包大小</td>
              <td className="p-2">~4KB</td>
              <td className="p-2">~11KB+</td>
              <td className="p-2">~13KB</td>
              <td className="p-2">0</td>
            </tr>
            <tr>
              <td className="p-2">适用场景</td>
              <td className="p-2">轻量快速，与框架无关</td>
              <td className="p-2">Redux 生态</td>
              <td className="p-2">复杂缓存场景</td>
              <td className="p-2">简单请求</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <div className="mt-6 text-center">
        <Button
          type="link"
          icon={<LinkOutlined />}
          href="https://swr.vercel.app/zh-CN"
          target="_blank"
        >
          SWR 官方文档
        </Button>
      </div>
    </div>
  )
}
