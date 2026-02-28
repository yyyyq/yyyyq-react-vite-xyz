import { Link, Outlet } from 'react-router-dom'
import './App.css'
import { Layout, Menu } from 'antd'
import { AppstoreOutlined, InfoCircleOutlined } from '@ant-design/icons'
import Sider from 'antd/es/layout/Sider'

function App() {
  const menuItems = [
    { key: '/', label: <Link to="/">fabric</Link>, icon: <AppstoreOutlined /> },
    {
      key: '/about',
      label: <Link to="/about">About</Link>,
      icon: <InfoCircleOutlined />,
    },
  ]

  return (
    <Layout className="w-full flex">
      <Sider width={300} collapsible theme="light">
        <Menu
          mode="inline"
          style={{ height: '100vh' }}
          defaultSelectedKeys={['/']}
          items={menuItems}
        />
      </Sider>
      <div className="flex-1 p-[20px] h-full">
        <Outlet />
      </div>
    </Layout>
  )
}

export default App
