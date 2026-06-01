import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      console.error(`Failed to save ${key} to localStorage`)
    }
  }, [key, value])

  return [value, setValue] as const
}

// 使用示例： const [theme, setTheme] = useLocalStorage('theme', 'light')
// 在组件中，可以通过 setTheme('dark') 来改变主题，并且这个值会被保存在 localStorage 中，即使刷新页面也能保持。