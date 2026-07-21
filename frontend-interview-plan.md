# 前端面试准备计划（2026）

> 目标：覆盖前端面试核心考点 + 大厂高频深挖方向，总周期 6-8 周，每天 2-3 小时。

---

## 第一阶段：核心基础（第 1-3 周）

### 1.1 JavaScript 深层机制

#### 执行机制
- [ ] EventLoop：宏任务/微任务执行顺序、浏览器 vs Node 差异
- [ ] 闭包：词法作用域、闭包内存模型、经典循环陷阱（var + setTimeout）
- [ ] 作用域链：变量查找规则、块级作用域原理
- [ ] 原型链：`__proto__` vs `prototype`、属性查找链、`instanceof` 原理
- [ ] this 绑定：4 种规则（默认/隐式/显式/new）、箭头函数的 this

#### 异步编程
- [ ] Promise：状态机、链式调用原理、错误穿透
- [ ] async/await：语法糖本质、错误处理方式
- [ ] 并发控制：Promise.all / allSettled / race / any 的区别与实现
- [ ] 手写题：
  - Promise（含 then 链式调用）
  - Promise.all / Promise.race
  - async/await 用 generator 实现
  - 并发请求限制（最多 N 个同时执行）

#### 手写高频题
- [ ] 防抖（debounce）+ 节流（throttle）+ 区别
- [ ] 柯里化（curry）
- [ ] 深拷贝（处理循环引用、特殊对象）
- [ ] 发布订阅模式（EventEmitter）
- [ ] call / apply / bind
- [ ] new 操作符
- [ ] instanceof
- [ ] 模板引擎（简易版）
- [ ] 数组扁平化、去重
- [ ] 对象深比较（isEqual）

---

### 1.2 TypeScript

#### 类型系统
- [ ] 基础类型 vs 高级类型：Union / Intersection / Literal / Enum
- [ ] 泛型：约束（extends）、默认值、多泛型参数
- [ ] 类型推导：typeof / keyof / infer / 条件类型（Conditional Types）
- [ ] 映射类型（Mapped Types）+ 模板字面量类型
- [ ] 协变与逆变：函数参数的严格模式

#### 手写 Utility Types
- [ ] `Partial` / `Required` / `Readonly` / `Pick` / `Omit`
- [ ] `Record` / `Exclude` / `Extract` / `ReturnType`
- [ ] `DeepPartial` / `DeepReadonly`（递归版本）

#### 实战场景
- [ ] 组件 Props 类型推导
- [ ] API 响应类型安全（泛型请求函数）
- [ ] 类型守卫（is / in / typeof / instanceof）
- [ ] 声明文件编写（.d.ts）

---

### 1.3 CSS

#### 布局与渲染
- [ ] BFC：触发条件、解决的问题（高度塌陷、margin 合并）
- [ ] 层叠上下文：z-index 生效规则、Stacking Context 层级
- [ ] Flex 布局：主轴/交叉轴、flex-grow/shrink/basis 计算、常见居中方案
- [ ] Grid 布局：fr 单位、grid-template-areas、隐式网格
- [ ] 容器查询（Container Queries）：@container 用法与场景
- [ ] CSS Subgrid：嵌套网格对齐

#### 响应式与适配
- [ ] 媒体查询 + 移动端适配方案（rem / vw / viewport meta）
- [ ] 安全区域适配（env(safe-area-inset-*)）
- [ ] 暗色模式实现（prefers-color-scheme）

---

## 第二阶段：框架生态（第 4-5 周）

### 2.1 React

#### 核心原理
- [ ] Fiber 架构：链表结构、时间切片、可中断渲染
- [ ] 调度原理：优先级车道模型、lane 机制、expirationTime
- [ ] Diff 算法：单节点/多节点比较、key 的作用与常见误区
- [ ] Hooks 实现机制：链表结构、mount vs update 阶段
- [ ] 合成事件：事件委托机制、与原生事件执行顺序

#### Hooks 深入
- [ ] useState：批量更新机制、函数式更新
- [ ] useEffect：执行时机、依赖比较方式、cleanup 执行顺序
- [ ] useLayoutEffect vs useEffect：同步 vs 异步绘制
- [ ] useMemo / useCallback：性能优化场景与过度使用的反模式
- [ ] useRef：持久引用、DOM 引用、闭包陷阱解决方案
- [ ] useTransition / useDeferredValue：并发特性、低优先级更新
- [ ] 自定义 Hook 设计模式

#### 新特性
- [ ] Server Components：服务端组件的数据流、零客户端 JS
- [ ] Suspense：数据获取模式、与 React Loading 的结合
- [ ] React 19 新特性：use() Hook、Actions、表单改进

#### 性能优化
- [ ] React.memo：浅比较策略、合适的使用场景
- [ ] 代码分割：React.lazy + Suspense
- [ ] 虚拟列表：react-window / react-virtuoso 原理
- [ ] 避免不必要重渲染：状态下放、组件组合模式

---

### 2.2 状态管理

- [ ] Redux：单向数据流、中间件机制（redux-thunk / redux-saga）
- [ ] Zustand：极简设计思路、subscribe selector 优化
- [ ] Jotai / Recoil：原子化状态、依赖图
- [ ] Signals 趋势：响应式原语、与 Hooks 的对比
- [ ] 选型标准：项目规模、团队熟悉度、性能需求

---

### 2.3 构建工具

- [ ] Vite 原理：ESBuild 预构建 + 原生 ESM 开发服务器 + HMR 实现
- [ ] Vite vs Webpack：开发体验差异、生产构建对比
- [ ] Turbopack：Rust 构建、增量计算
- [ ] Bun：运行时 + 包管理器 + 打包器一体化
- [ ] Module Federation：微前端模块共享

---

## 第三阶段：性能与工程化（第 5-6 周）

### 3.1 性能优化

#### 指标体系
- [ ] Core Web Vitals：LCP / FID / CLS / INP 优化策略
- [ ] 性能度量：Navigation Timing API、Performance Observer
- [ ] 性能预算（Performance Budget）设定

#### 加载优化
- [ ] 代码分割：路由级 + 组件级懒加载
- [ ] Tree Shaking：ESM 静态分析原理、sideEffects 配置
- [ ] 图片优化：WebP/AVIF、响应式图片（srcset）、懒加载
- [ ] 资源预加载：preload / prefetch / preconnect / modulepreload
- [ ] HTTP 缓存：强缓存 vs 协商缓存策略、Cache-Control 配置
- [ ] CDN 策略：静态资源分发、缓存命中率优化

#### 运行时优化
- [ ] Long Task 拆分：requestIdleCallback / scheduler.yield()
- [ ] 防抖节流：scroll/resize/input 场景
- [ ] Web Worker：CPU 密集任务卸载、通信方式
- [ ] 渲染优化：避免强制同步布局（Layout Thrashing）、GPU 加速

---

### 3.2 工程化

- [ ] Monorepo：pnpm workspace + Turborepo 配置、依赖提升问题
- [ ] CI/CD：GitHub Actions / GitLab CI 配置、自动化测试 + 部署
- [ ] 代码规范：ESLint + Prettier + Husky + lint-staged
- [ ] 微前端：qiankun / Module Federation / single-spa 方案对比与选型
- [ ] 版本管理：Semantic Versioning、Changesets、自动化 Changelog

---

### 3.3 监控体系

- [ ] 性能埋点：关键指标采集、上报策略
- [ ] 错误监控：JS 错误 / 资源加载失败 / 接口异常捕获
- [ ] Sourcemap 还原：线上代码定位、安全策略（不暴露 map 文件）
- [ ] 用户行为追踪：PV/UV、点击流、页面停留

---

## 第四阶段：全栈与新兴方向（第 7 周）

### 4.1 SSR / SSG

- [ ] Next.js App Router：Server Components + Streaming SSR
- [ ] SSR vs SSG vs ISR：适用场景对比
- [ ] Streaming SSR：分块传输、Suspense 边界
- [ ] RSC 数据流：服务端获取 → 客户端水合
- [ ] SEO 优化：meta 标签、结构化数据、SSR 的 SEO 优势

---

### 4.2 AI 集成

- [ ] 前端调用 LLM API：REST / SSE 流式响应
- [ ] Streaming UI：逐字输出效果、Vercel AI SDK 使用
- [ ] Prompt Engineering 基础：角色设定、Few-shot、输出格式控制
- [ ] 前端 AI 工具链：Copilot、Cursor、AI 辅助代码审查

---

### 4.3 跨端

- [ ] React Native New Architecture：Fabric + TurboModule + JSI
- [ ] Tauri：Rust 后端 + Web 前端、与 Electron 对比
- [ ] Electron：进程模型、性能优化、安全策略
- [ ] 跨端统一方案：uni-app / Taro 选型考量

---

## 第五阶段：算法与设计题（持续进行）

### 5.1 高频算法

每天 1-2 道，重点是思路和代码实现速度。

| 类别 | 题型 | 典型题目 |
|------|------|---------|
| 链表 | 反转、合并、环检测 | 206.反转链表、141.环形链表、21.合并有序链表 |
| 树 | 遍历、路径、LCA | 104.最大深度、226.翻转、236.最近公共祖先 |
| 双指针 | 对撞指针、滑动窗口 | 3.无重复最长子串、11.盛水容器 |
| 哈希 | 计数、映射 | 1.两数之和、49.字母异位词分组 |
| 栈/队列 | 括号匹配、单调栈 | 20.有效括号、155.最小栈 |
| DFS/BFS | 网格搜索、回溯 | 200.岛屿数量、46.全排列 |
| 动态规划 | 背包、子序列 | 70.爬楼梯、53.最大子数组和、322.零钱兑换 |

---

### 5.2 场景设计题

- [ ] 虚拟列表：固定高度/动态高度方案、滚动性能
- [ ] 瀑布流布局：绝对定位计算 vs CSS Grid 方案
- [ ] 拖拽排序：drag API 实现、状态同步、性能优化
- [ ] 富文本编辑器：contentEditable / ProseMirror / Slate 架构选型
- [ ] 大文件上传：分片、断点续传、秒传、并发控制
- [ ] 权限系统：RBAC 模型、路由守卫、按钮级权限
- [ ] 国际化（i18n）：方案选型、按需加载语言包

---

## 第六阶段：面试实战

### 6.1 项目描述（STAR 法则）

每个项目准备以下结构：

```
Situation — 项目背景、业务痛点
Task — 你负责的部分、技术挑战
Action — 你的技术方案、选型理由、解决过程
Result — 量化成果（性能提升 X%、包体积减少 Y%、开发效率提升 Z%）
```

准备 2-3 个项目，每个提炼 2-3 个有深度的技术点（踩坑→排查→方案→效果）。

---

### 6.2 高频开放题

- [ ] "说说你对 React Fiber 的理解"
- [ ] "Promise 和 async/await 的区别和底层原理"
- [ ] "从输入 URL 到页面渲染的完整过程"
- [ ] "前端性能优化你做过哪些"
- [ ] "React 状态管理怎么选型"
- [ ] "TypeScript 泛型在项目中怎么用的"
- [ ] "如何设计一个组件库"

---

### 6.3 反问面试官

- 团队的技术栈和工程化程度
- 前端团队的人数和分工模式
- 业务的核心挑战和近期规划
- 代码审查和技术分享文化

---

## 时间安排总览

| 阶段 | 周期 | 每日投入 |
|------|------|---------|
| 核心基础（JS + TS + CSS） | 第 1-3 周 | 2-3h |
| 框架生态（React + 状态管理 + 构建） | 第 4-5 周 | 2-3h |
| 性能与工程化 | 第 5-6 周 | 2-3h |
| 全栈与新兴方向 | 第 7 周 | 2h |
| 算法与设计题 | 全程穿插 | 每天 1h |
| 面试实战 | 第 7-8 周 | 模拟面试 + 查漏补缺 |

---

> 提示：用 `- [ ]` 打勾追踪进度，完成后改为 `- [x]`
