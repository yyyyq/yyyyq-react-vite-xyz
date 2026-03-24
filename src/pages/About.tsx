import { Button, Input, type InputRef } from 'antd'
import Counter from '../components/Counter'
import UserList from '../components/UserList'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setName } from '../store/slices/userSlice'
import { useRef } from 'react'

export default function About() {
  const userStore = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const inputRef = useRef<InputRef>(null)
  const handleFocus = () => {
    inputRef.current?.focus()
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">About</h1>
      <p className="mb-4">This is the about page.</p>
      <p className="mb-4">name: {userStore.name}</p>
      <Button
        className="mb-4"
        type="primary"
        onClick={() => {
          dispatch(setName('yyyyq'))
        }}
      >
        setUser
      </Button>

      <Counter />

      <UserList />

      <div className="flex mt-[20px]">
        <Input
          style={{ width: 300 }}
          placeholder="Enter something"
          ref={inputRef}
        />
        <Button style={{ marginLeft: 10 }} type="default" onClick={handleFocus}>
          Focus
        </Button>
      </div>
    </div>
  )
}
