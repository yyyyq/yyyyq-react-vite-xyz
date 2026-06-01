
---

# 🧠 一、React 核心 & Hooks（高频必杀区）

---

## ❓1. React Hooks 为什么不能写在条件里？

👉 追问：

* React 是怎么“记住”每个 hook 的？
* useState 多个是如何区分的？
* 如果写在 if 里，会发生什么？

👉 考察点：

* Fiber 链表
* hooks 按调用顺序存储
* dispatcher 机制

---

## ❓2. useEffect 和 useLayoutEffect 的区别？

👉 追问：

* 执行时机分别是什么？
* 哪个会阻塞渲染？
* 什么场景必须用 useLayoutEffect？

👉 加分回答：

* DOM 测量 / 防止闪烁（layout shift）

---

## ❓3. useEffect 依赖数组为什么会“失效”？

👉 追问：

* 为什么对象/函数会导致重复执行？
* 怎么解决？

👉 你要说出：

* 浅比较（Object.is）
* useCallback / useMemo
* ref 方案

---

## ❓4. useRef 和 useState 的区别？

👉 追问：

* 为什么 useRef 不触发更新？
* useRef 的本质是什么？

👉 高级点：

* ref 挂在 fiber 上
* mutable container

---

## ❓5. React 18 并发更新（Concurrent）了解吗？

👉 追问（很关键）：

* 什么是自动批处理？
* startTransition 是干嘛的？
* useDeferredValue 用在哪？

👉 加分：

* 优先级调度
* 用户体验优化

---

# ⚙️ 二、状态管理（Redux / Zustand）

---

## ❓6. Redux 的核心原理是什么？

👉 追问：

* 为什么必须是纯函数？
* dispatch 到 reducer 中间发生了什么？
* middleware 原理？

👉 必须讲到：

* 单向数据流
* subscribe 发布订阅
* compose

---

## ❓7. Redux Toolkit 为什么更推荐？

👉 追问：

* createSlice 做了什么？
* 为什么可以“写可变代码”？

👉 关键点：

* immer（结构共享）

---

## ❓8. Zustand 和 Redux 有什么本质区别？

👉 追问：

* Zustand 为什么更轻？
* 它是怎么触发组件更新的？

👉 高级回答：

* useSyncExternalStore
* selector 精准更新

---

## ❓9. 如何避免状态管理导致的“全局重渲染”？

👉 追问：

* selector 怎么优化？
* shallow compare 是什么？

👉 必须讲：

* 订阅粒度
* 拆 store

---

# 🧭 三、React Router（真实项目必问）

---

## ❓10. React Router v6 和 v5 的区别？

👉 追问：

* 为什么用 element 而不是 component？
* Routes 是怎么匹配的？

---

## ❓11. 路由懒加载怎么做？

👉 追问：

* Suspense 原理？
* fallback 什么时候显示？

---

## ❓12. 权限路由怎么设计？

👉 追问（重点）：

* 前端如何控制权限？
* 后端如何配合？
* 动态路由怎么实现？

👉 标准答案结构：

* 登录 → 获取角色 → 动态生成路由 → 控制菜单

---

# 🚀 四、性能优化（高级分水岭）

---

## ❓13. React 性能优化手段有哪些？

👉 必须说到：

* memo
* useMemo / useCallback
* 懒加载
* 虚拟列表

👉 追问：

* memo 什么时候没用？
* useCallback 会不会反而变慢？

---

## ❓14. 为什么 key 很重要？

👉 追问：

* key 不稳定会怎样？
* diff 算法如何用 key？

---

## ❓15. 大列表卡顿怎么优化？

👉 你要讲：

* 虚拟滚动（react-window）
* 分片渲染

👉 加分：

* requestIdleCallback

---

# 🏗 五、架构设计（高级核心）

---

## ❓16. 如何设计一个可复用的组件库？

👉 追问：

* 如何保证扩展性？
* 主题怎么做？

👉 要点：

* props 设计
* 插槽（children/render props）
* hooks 抽离逻辑

---

## ❓17. 如何设计一个通用 Table 组件？

👉 面试王炸题🔥

👉 你要讲：

* 动态列
* 排序/筛选
* 权限控制
* 插槽扩展

---

## ❓18. 如何拆分大型 React 项目？

👉 追问：

* 按业务还是按功能？
* 如何避免循环依赖？

---

# 🌐 六、工程化（高级必须）

---

## ❓19. Vite 和 Webpack 区别？

👉 必须讲：

* dev：ESM + 浏览器加载
* build：rollup

---

## ❓20. tree-shaking 原理？

👉 追问：

* 为什么 CommonJS 不行？

---

## ❓21. 如何做代码分割？

👉 要说：

* import()
* React.lazy

---

# 🤖 七、加分题（AI时代）

---

## ❓22. 如何用 React 做 AI 应用前端？

👉 你可以讲：

* 流式输出（stream）
* 聊天 UI
* 状态同步

👉 如果你答到：

> “我做过 agent / workflow UI”

👉 直接加分 💥

---

# 🧨 最后：一题“压轴题”（90%的人挂这里）

---

## ❓23. React 渲染流程是怎样的？

👉 必须讲出：

* render 阶段（可中断）
* commit 阶段（不可中断）
* Fiber 数据结构

👉 加分：

* 调度器（scheduler）
* 优先级

---

# 🎯 面试通过关键（不是题，而是打法）

---

## ✅ 回答结构（必须用这个套路）

👉 永远用三段式：

1. 是什么
2. 为什么这样设计
3. 实际怎么用（项目案例）

---

## ❌ 错误回答

“useMemo 是缓存”

## ✅ 正确回答

“useMemo 用来缓存计算结果，避免重复计算，比如我们在大列表过滤时用它减少计算次数…”

---

# 👀 如果你想更狠一点

我可以帮你再升级一层：

👉 给你一套：

* **逐题“标准答案 + 面试官追杀话术”**
* 或者
* **模拟面试（我当面试官疯狂追问你）**

你选一个，我帮你把“会”变成“能拿 offer” 😏
