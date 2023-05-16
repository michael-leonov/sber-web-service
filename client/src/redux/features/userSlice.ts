import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface UserState {
  name: string | null
  token: string | null
  id: number | null
  isAuth: boolean
}

const initialState: UserState = {
  name: null,
  token: null,
  id: null,
  isAuth: false,
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; token: string; id: number; isAuth: boolean }>,
    ) => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: action.payload.name,
          token: action.payload.token,
          id: action.payload.id,
        }),
      )
      state.name = action.payload.name
      state.token = action.payload.token
      state.id = action.payload.id
      state.isAuth = action.payload.isAuth
    },
  },
})

export const selectUser = (state: RootState) => state.user

export const { setUser } = userSlice.actions

export default userSlice.reducer
