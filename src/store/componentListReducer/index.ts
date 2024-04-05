import { ComponentsPropsType } from '@/components/QuestionComponents'
import { getOneQuestionData } from '@/service/question'
import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import cloneDeep from 'lodash/cloneDeep'
import type { PayloadAction } from '@reduxjs/toolkit'
import {  getNewSelectedId, insertNewComponent} from './utils'

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
export interface ComponentListStateType {
  componentList: ComponentInfoType[]
  selectedId: string,
  copiedComponent: ComponentInfoType | null
}

// 初始化组件列表数据
const INITIAL_STATE: ComponentListStateType = {
  componentList: [],
  selectedId: '',
  copiedComponent: null
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
      insertNewComponent(state, action.payload)
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
    },

    // 复制组件
    copySelectedComponent(state) {
      const { selectedId, componentList } = state
      const currentComponent = componentList.find((item) => item.fe_id === selectedId)
      if (currentComponent) {
        // 深拷贝当前选中组件 
        state.copiedComponent = cloneDeep(currentComponent)
      }
    },
    
    // 粘贴组件
    pasteCopiedComponent(state) {
      const { copiedComponent } = state
      // 粘贴组件时，复制的组件的fe_id需要重新生成
      copiedComponent.fe_id = nanoid()
      // 插入复制的组件到componentList中
      insertNewComponent(state, copiedComponent)
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
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent
} = componentListSlice.actions
export default componentListSlice.reducer
