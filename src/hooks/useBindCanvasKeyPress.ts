import { copySelectedComponent, deleteSelectedComponent, pasteCopiedComponent } from "@/store/componentListReducer"
import { useAppDispatch } from "@/store/hooks"
import { useKeyPress } from "ahooks"

const isActiveElementValid = () => {
  const activeElement = document.activeElement
  if (activeElement === document.body) return true
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
}

export default useBindCanvasKeyPress