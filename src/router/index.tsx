import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { lazy, Suspense } from 'react'
import Currying from '../pages/Currying'
import ZustandDemo from '../pages/ZustandDemo'

const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))
const CanvasBasics = lazy(() => import('../pages/CanvasBasics'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'Currying',
        element: <Currying />,
      },
      {
        path: 'zustand',
        element: <ZustandDemo />,
      },
      {
        path: 'canvas-basics',
        element: <CanvasBasics />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">404</h1>
        <p>页面不存在</p>
        <a href="/">返回首页</a>
      </div>
    ),
  },
])
