import { useState } from 'react'
import { Button, InputNumber, Space } from 'antd'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { increment, decrement, incrementByAmount, reset } from '../store/slices/counterSlice'

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [incrementAmount, setIncrementAmount] = useState(5)

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-4">Redux Counter 示例</h2>

      <div className="text-2xl font-bold mb-4">Count: {count}</div>

      <Space wrap>
        <Button onClick={() => dispatch(decrement())}>-1</Button>
        <Button onClick={() => dispatch(increment())}>+1</Button>
        <Button onClick={() => dispatch(reset())}>重置</Button>
      </Space>

      <div className="mt-4 flex items-center gap-2">
        <InputNumber
          value={incrementAmount}
          onChange={(value) => setIncrementAmount(value || 0)}
          min={1}
        />
        <Button
          type="primary"
          onClick={() => dispatch(incrementByAmount(incrementAmount))}
        >
          增加 {incrementAmount}
        </Button>
      </div>
    </div>
  )
}
