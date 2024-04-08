import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction } from 'redux-undo'
import userReducer from './userReducer'
import ComponentListReducer from './componentListReducer'
import pageInfoReducer from './pageInfoReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    // 添加undo 、redo功能
    components: undoable(ComponentListReducer, {
      limit: 20,  //限制最多20个历史记录
      filter: excludeAction([
        'components/resetComponentList',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent'
      ]) //排除不记录的action
    }),
    pageInfo: pageInfoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
