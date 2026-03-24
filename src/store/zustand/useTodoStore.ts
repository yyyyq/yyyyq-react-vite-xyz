import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoState {
  todos: Todo[]
  loading: boolean
  error: string | null
  // 同步 actions
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  removeTodo: (id: number) => void
  clearCompleted: () => void
  // 异步 actions
  fetchTodos: () => Promise<void>
  addTodoAsync: (text: string) => Promise<void>
}

// 模拟 API 请求
const fakeFetch = <T>(data: T, delay = 1000): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay))

// 进阶示例：Todo store（带持久化 + 异步操作）
export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      loading: false,
      error: null,

      // 同步 action
      addTodo: (text) =>
        set((state) => ({
          todos: [...state.todos, { id: Date.now(), text, completed: false }],
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),

      // 异步 action：获取远程 todos
      fetchTodos: async () => {
        set({ loading: true, error: null })
        try {
          // 模拟 API 请求
          const data = await fakeFetch<Todo[]>([
            { id: 1, text: '学习 Zustand', completed: true },
            { id: 2, text: '学习异步操作', completed: false },
            { id: 3, text: '构建项目', completed: false },
          ])
          set({ todos: data, loading: false })
        } catch {
          set({ error: '获取数据失败', loading: false })
        }
      },

      // 异步 action：异步添加 todo（模拟提交到服务器）
      addTodoAsync: async (text) => {
        set({ loading: true, error: null })
        try {
          // 模拟 API 提交
          const newTodo = await fakeFetch<Todo>({
            id: Date.now(),
            text,
            completed: false,
          }, 500)
          // 使用 get() 获取当前状态
          set({ todos: [...get().todos, newTodo], loading: false })
        } catch {
          set({ error: '添加失败', loading: false })
        }
      },
    }),
    {
      name: 'todo-storage',
      // 只持久化 todos，不持久化 loading 和 error
      partialize: (state) => ({ todos: state.todos }),
    }
  )
)
