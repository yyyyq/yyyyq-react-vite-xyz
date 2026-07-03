import { useState } from 'react'
import Markdown from '@/components/Markdown'
import GC from './md/GC.md?raw'
import EventLoop from './md/EventLoop.md?raw'
import Promise from './md/Promise.md?raw'
import JWTaRBAC from './md/JWT&RBAC.md?raw'
import URLaRender from './md/URL&Render.md?raw'

// ========== 配置区：新增 MD 内容时在这里添加即可 ==========
const MD_LIST: { key: string; label: string; content: string }[] = [
  { key: 'gc', label: '垃圾回收', content: GC },
  { key: 'eventLoop', label: '事件循环', content: EventLoop },
  { key: 'promise', label: 'Promise', content: Promise },
  { key: 'JWT&RBAC', label: 'JWT&RBAC', content: JWTaRBAC },
  { key: 'URL&Render', label: 'URL&Render', content: URLaRender },
  // 新增示例：
  // { key: 'closure', label: '闭包', content: ClosureMD },
  // { key: 'promise', label: 'Promise', content: PromiseMD },
]

const JSInterview = () => {
  const [active, setActive] = useState(MD_LIST[0].key)
  const activeItem = MD_LIST.find((item) => item.key === active)!

  return (
    <div className="flex h-full">
      {/* 左侧内容区 */}
      <div className="flex-1 overflow-y-auto">
        <Markdown content={activeItem.content} />
      </div>

      {/* 右侧边栏导航 */}
      <nav className="w-48 shrink-0 border-l border-gray-200 bg-white p-4 overflow-y-auto">
        <ul className="space-y-1">
          {MD_LIST.map((item) => (
            <li
              key={item.key}
              className={`
                px-3 py-2 rounded-md cursor-pointer text-sm transition-colors
                ${
                  active === item.key
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
              onClick={() => setActive(item.key)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
export default JSInterview
