import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// 定义响应类型（根据你的接口调整）
interface User {
  id: number
  name: string
  email?: string
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    // GET /users
    getUsers: builder.query<User[], void>({
      query: () => '/users',
    }),
  }),
})

// 导出自动生成的 hooks
export const { useGetUsersQuery } = api
