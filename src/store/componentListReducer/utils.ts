import { ComponentInfoType } from ".";

function getNewSelectedId(selectedId: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(item => item.isHidden === false)
  const index = visibleComponentList.findIndex(item => item.fe_id === selectedId)
  let newSelectedId = ''
  // 如果当前没有选中组件
  if (index === -1) return newSelectedId

  // 如果当前选中组件
  // visibleComponentList只有一个组件，则新选中组件id为空
  if (visibleComponentList.length === 1) {
    return newSelectedId
  } else {
    // componentList有多个组件，且当前选中最后一个组件, 则新组件前一个组件id
    if (index + 1 === visibleComponentList.length) {
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      // 当前选中不是最后一个组件，则新选中下一个组件
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
    return newSelectedId
  }
}

export default getNewSelectedId