import { ComponentsPropsType } from '@/components/QuestionComponents'
import { getOneQuestionData } from '@/service/question'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import getNewSelectedId from './utils'

// 每个组件的信息数据类型
export interface ComponentInfoType {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentsPropsType
}

// 组件列表数据类型
interface ComponentListStateType {
  componentList: ComponentInfoType[]
  selectedId: string
}

// 初始化组件列表数据
const INITIAL_STATE: ComponentListStateType = {
  componentList: [],
  selectedId: ''
}

// 异步action creator, 请求一个问卷的组件列表数据
export const fetchComponentList = createAsyncThunk(
  'componentList/fetchComponentList',
  async (id: string, { dispatch, getState }) => {
    const data = await getOneQuestionData(id)
    const { componentList } = data
    return componentList as ComponentInfoType[]
  }
)

const componentListSlice = createSlice({
  name: 'components',
  initialState: INITIAL_STATE,
  reducers: {
    resetComponentList(state, action: PayloadAction<ComponentListStateType>) {
      return action.payload
    },
    changeSelectedId(state, action: PayloadAction<string>) {
      state.selectedId = action.payload
    },
    addComponentToComponentList(state, action: PayloadAction<ComponentInfoType>) {
      const { selectedId, componentList } = state
      // 获取当前选中的组件id在componentList中的索引值，如果componentList中没有当前选中组件，则返回-1
      const index = componentList.findIndex((item) => item.fe_id === selectedId)
      // 没有选中组件，则直接添加到componentList的末尾
      if (index < 0) {
        state.componentList.push(action.payload)
      } else {
        // 有选中的组件，则将新增组件插入到当前选中组件的后面
        state.componentList.splice(index + 1, 0, action.payload)
      }
      // 更新选中组件的id
      state.selectedId = action.payload.fe_id
    },

    // 修改组件props
    changeComponentProps(
      state,
      action: PayloadAction<{ fe_id: string; changedProps: ComponentsPropsType }>
    ) {
      // 获取要修改的组件的id，和要修改的props值
      const { fe_id, changedProps } = action.payload
      // 根据fe_id找到要修改的组件数据
      const currentComponent = state.componentList.find((item) => item.fe_id === fe_id)
      // 修改组件的props
      if (currentComponent) {
        currentComponent.props = {
          ...currentComponent.props,
          ...changedProps
        }
      }
    },

    // 删除选中组件
    deleteSelectedComponent(state) {
      const { selectedId: willDeleteId, componentList } = state

      // 删除选中组件之后, selectedId找不到相同的fe_id。所以需要重新设置selectedId
      state.selectedId = getNewSelectedId(willDeleteId, componentList)

      // 删除选中组件
      const index = componentList.findIndex((item) => item.fe_id === willDeleteId)
      componentList.splice(index, 1)
    },

    // 隐藏/显示组件
    changeComponentHidden(state, action: PayloadAction<{ fe_id: string, isHidden: boolean }>) {
      const { componentList } = state
      const { fe_id, isHidden } = action.payload
      const currentComponent = componentList.find((item) => item.fe_id === fe_id)

      // 隐藏当前选中的组件后(EditCanvas组件渲染时，过滤掉了要隐藏的组件)，selectedId找不到相同的fe_id。所以需要重新设置selectedId
      // 显示组件后，selectedId为要显示的组件的fe_id
      if (isHidden) {
        // 如果要隐藏
        state.selectedId = getNewSelectedId(fe_id, componentList)
      } else {
        // 如果要显示
        state.selectedId = fe_id 
      }

      // 隐藏/显示当前选中的组件
      if (currentComponent) {
        currentComponent.isHidden = isHidden
      }
    },

    // 锁定/解锁组件
    toggleComponentLocked(state) {
      const {selectedId, componentList} = state
      const currentComponent = componentList.find((item) => item.fe_id === selectedId)
      if (currentComponent) {
        currentComponent.isLocked = !currentComponent.isLocked
      }
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchComponentList.fulfilled, (state, { payload }) => {
      state.componentList = payload
    })
  }
})

export const {
  resetComponentList,
  changeSelectedId,
  addComponentToComponentList,
  changeComponentProps,
  deleteSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked
} = componentListSlice.actions
export default componentListSlice.reducer
