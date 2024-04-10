import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface PageInfoType {
  title?: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
}

const INITIAL_STATE: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
  isPublished: false
}

const PageInfoReducer = createSlice({
  name: 'pageInfo',
  initialState: INITIAL_STATE,
  reducers: {
    resetPageInfo(state: PageInfoType, action: PayloadAction<PageInfoType>) {
      return {
        ...state,
        ...action.payload
      }
    },
    changePageInfoTitle(state: PageInfoType, action: PayloadAction<string>) {
      state.title = action.payload
    }
  }
})

export const { resetPageInfo, changePageInfoTitle } = PageInfoReducer.actions
export default PageInfoReducer.reducer
