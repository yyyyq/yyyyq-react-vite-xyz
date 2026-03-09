import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// 使用类型化的 hooks 代替普通的 useDispatch 和 useSelector
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
