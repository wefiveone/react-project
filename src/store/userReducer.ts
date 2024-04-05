import { getUserInfo } from '@/service/user'
import { setUserInfo } from '@/utils/user-info-cache'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getUserInfoFromStorage } from '../utils/user-info-cache'

interface userStateType {
  username: string
  nickname: string
}

const INITIAL_STATE: userStateType = getUserInfoFromStorage() || { username: '', nickname: '' }

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (extra, { getState, dispatch }) => {
    const res = await getUserInfo()
    // 缓存用户信息
    setUserInfo(res)
    return res
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    loginReducer(state, action: PayloadAction<userStateType>) {
      return action.payload
    },
    logoutReducer() {
      return INITIAL_STATE
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
      const { username, nickname } = payload
      state.username = username
      state.nickname = nickname
    })
  }
})

export const { loginReducer ,logoutReducer } = userSlice.actions
export default userSlice.reducer
