import {
  copySelectedComponent,
  deleteSelectedComponent,
  pasteCopiedComponent,
  selectNextComponent,
  selectPrevComponent
} from '@/store/componentListReducer'
import { useAppDispatch } from '@/store/hooks'
import { useKeyPress } from 'ahooks'

const isActiveElementValid = () => {
  const activeElement = document.activeElement
  // 没添加拖拽功能之前
  // if (activeElement === document.body) return true

  //增加之后
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
}

export default useBindCanvasKeyPress
