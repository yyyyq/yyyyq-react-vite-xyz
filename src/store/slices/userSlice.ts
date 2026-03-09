import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: { name: '' },
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    }       
  }
})

export const { setName } = userSlice.actions
export default userSlice.reducer