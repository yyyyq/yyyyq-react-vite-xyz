import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// StrictMode 是一个用于在开发阶段帮助开发者发现潜在问题的‌开发工具‌。
// 它会在开发环境中启用额外的检查和警告，以帮助开发者识别和修复潜在的错误和不良实践。
// StrictMode 不会影响生产环境中的应用程序性能，因为它只在开发阶段启用。
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
