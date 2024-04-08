import React, { FC } from 'react'
import { Spin } from 'antd'
import classnames from 'classnames'
import styles from './EditCanvas.module.scss'
import useGetComponentList from '../../../../hooks/useGetComponentInfo'
import {
  changeSelectedId,
  moveComponent,
  type ComponentInfoType
} from '../../../../store/componentListReducer'
import { useAppDispatch } from '../../../../store/hooks'
import { getComponentConfigByType } from '../../../../components/QuestionComponents'
import useBindCanvasKeyPress from '@/hooks/useBindCanvasKeyPress'
import SortableContainer from '@/components/DragSortable/SortableContainer'
import SortableItem from '@/components/DragSortable/SortableItem'

interface EditCanvasPropsType {
  loading?: boolean
}
// 根据服务器返回当前问卷的组件信息，生成对应组件
const generateComponent = (componentInfo: ComponentInfoType) => {
  // 获取要生成组件的类型和要传入的props
  const { type, props } = componentInfo
  // 根据组件类型，获取组件配置信息(里面包含该组件)
  const componentConfig = getComponentConfigByType(type)
  if (!componentConfig) return
  // 解构出组件
  const { Component } = componentConfig
  // 生成组件并返回
  return <Component {...props} />
}

const EditCanvas: FC<EditCanvasPropsType> = ({ loading }) => {
  // 从redux store中获取组件列表数据
  const { componentList, selectedId } = useGetComponentList()

  const dispatch = useAppDispatch()

  const handleClick = (event, id) => {
    // 阻止事件冒泡
    event.stopPropagation()
    // 派发action修改redux store中的selectedId
    dispatch(changeSelectedId(id))
  }

  // 绑定canvas的键盘事件
  useBindCanvasKeyPress()

  const ComponentWrapperClassnames = styles['component-wrapper']
  const selectedClassnames = styles['selected']
  const lockedClassnames = styles['locked']

  // 加载中
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Spin></Spin>
      </div>
    )
  }

  // 添加id属性，方便拖拽
  const componentListWithId = componentList.map((item) => ({ ...item, id: item.fe_id }))

  // 拖拽结束事件
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <div className={styles.canvas}>
      {/* 遍历组件列表，生成对应组件 */}
      {/* 先过滤需要隐藏的组件 */}
      <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        {componentListWithId
          .filter((item) => item.isHidden === false)
          .map((item: ComponentInfoType) => {
            const { fe_id } = item
            const ComponentWrapper = classnames({
              [ComponentWrapperClassnames]: true,
              [selectedClassnames]: selectedId === fe_id,
              [lockedClassnames]: item.isLocked
            })
            return (
              <SortableItem id={fe_id} key={fe_id}>
                <div
                  className={ComponentWrapper}
                  onClick={(e) => handleClick(e, fe_id)}
                >
                  <div className={styles.component}>{generateComponent(item)}</div>
                </div>
              </SortableItem>
            )
          })}
      </SortableContainer>
    </div>
  )
}

export default EditCanvas
