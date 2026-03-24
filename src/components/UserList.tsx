import { Button, Spin } from 'antd'
import { useGetUsersQuery } from '../store/api'

export default function UserList() {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery()

  if (isLoading) return <Spin />
  if (error) return <div>请求失败，请确保 Node 服务已启动</div>

  return (
    <div className="p-4 border rounded-lg mt-4">
      <h2 className="text-lg font-bold mb-4">RTK Query 示例</h2>

      <Button onClick={() => refetch()} className="mb-4">
        刷新
      </Button>

      <ul className="border rounded border-gray-400">
        {users?.map((user) => (
          <li
            key={user.id}
            className="p-2 border-b last:border-b-0 border-gray-400"
          >
            {user.id} - {user.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
