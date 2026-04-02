import { Link, Outlet, useLocation } from 'react-router-dom'
import './App.css'
import { Layout, Menu } from 'antd'
import {
  HomeOutlined,
  InfoCircleOutlined,
  CodeOutlined,
  DatabaseOutlined,
  ExperimentOutlined,
} from '@ant-design/icons'
import Sider from 'antd/es/layout/Sider'

function App() {
  const location = useLocation()

  const menuItems = [
    { key: '/', label: <Link to="/">fabric</Link>, icon: <HomeOutlined /> },
    {
      key: '/about',
      label: <Link to="/about">About</Link>,
      icon: <InfoCircleOutlined />,
    },
    {
      key: '/Currying',
      label: <Link to="/Currying">Currying</Link>,
      icon: <CodeOutlined />,
    },
    {
      key: '/zustand',
      label: <Link to="/zustand">Zustand</Link>,
      icon: <DatabaseOutlined />,
    },
    {
      key: '/canvas-basics',
      label: <Link to="/canvas-basics">canvas基础</Link>,
      icon: <ExperimentOutlined />,
    },
  ]

  return (
    <Layout className="w-full h-screen">
      <Sider width={300} collapsible theme="light">
        <Menu
          mode="inline"
          style={{ height: '100vh' }}
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      <div className="flex-1 p-[20px] h-screen overflow-y-auto">
        <Outlet />
      </div>
    </Layout>
  )
}

export default App
