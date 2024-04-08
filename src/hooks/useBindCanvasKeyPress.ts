import {
  copySelectedComponent,
  deleteSelectedComponent,
  pasteCopiedComponent,
  selectNextComponent,
  selectPrevComponent
} from '@/store/componentListReducer'
import { useAppDispatch } from '@/store/hooks'
import { useKeyPress } from 'ahooks'
import { ActionCreators } from 'redux-undo'

// 删除、复制、粘贴、撤销、选中上一个、选中下一个，应该要active问卷中组件时快捷键触发才有效,因为他们需要selectedId
const isActiveElementValid = () => {
  const activeElement = document.activeElement
  // 没添加拖拽功能之前
  // if (activeElement === document.body) return true

  //增加之后
  if (activeElement.matches('div[role="button"]')) return true

  return false
}

// 撤消、重做，不仅active问卷中组件时有效, activeElement为document.body时也可以有效,因为它不需要selectedId
const isURdoActiveElementValid = () => {
  const activeElement = document.activeElement

  if (activeElement === document.body) return true
  if (activeElement.matches('div[role="button"]')) return true

  return false
} 

// 绑定canvas的按键事件
const useBindCanvasKeyPress = () => {
  const dispatch = useAppDispatch()

  // 删除
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(deleteSelectedComponent())
  })

  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })

  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })

  // 选中上一个
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })

  // 选中下一个
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })

  // 撤销
  useKeyPress(['ctrl.z', 'meta.z'], () => {
    if (!isURdoActiveElementValid()) return
    dispatch(ActionCreators.undo())
  }, {
    exactMatch: true
  })

  // 重做
  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    if (!isURdoActiveElementValid()) return
    dispatch(ActionCreators.redo())
  })
}

export default useBindCanvasKeyPress
