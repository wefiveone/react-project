import React, { FC } from 'react'
import { Spin } from 'antd'
import classnames from 'classnames'
import styles from './EditCanvas.module.scss'
import useGetComponentList from '../../../../hooks/useGetComponentInfo'
import { changeSelectedId, type ComponentInfoType } from '../../../../store/componentListReducer'
import { useAppDispatch } from '../../../../store/hooks'
import { getComponentConfigByType } from '../../../../components/QuestionComponents'
import useBindCanvasKeyPress from '@/hooks/useBindCanvasKeyPress'

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

  return (
    <div className={styles.canvas}>
      {/* 遍历组件列表，生成对应组件 */}
      {/* 先过滤需要隐藏的组件 */}
      {componentList.filter(item => item.isHidden === false).map((item: ComponentInfoType) => {
        const { fe_id } = item
        const ComponentWrapper = classnames({
          [ComponentWrapperClassnames]: true,
          [selectedClassnames]: selectedId === fe_id,
          [lockedClassnames]: item.isLocked
        })
        return (
          <div key={fe_id} className={ComponentWrapper} onClick={(e) => handleClick(e, fe_id)}>
            <div className={styles.component}>{generateComponent(item)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default EditCanvas
