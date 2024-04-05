import React, { FC } from 'react'
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo'
import { ComponentsPropsType, getComponentConfigByType } from '../../../../components/QuestionComponents'
import { useAppDispatch } from '../../../../store/hooks'
import { changeComponentProps } from '../../../../store/componentListReducer'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}


const ComponentProp: FC = () => {
  const dispatch = useAppDispatch()

  // 获取选中组件
  const { selectedComponent } = useGetComponentInfo()
  if (!selectedComponent) return <NoProp />
  const { type, props, isLocked, isHidden } = selectedComponent

  // 根据选中组件的类型获取组件配置，从组件配置中获取组件的prop组件
  const componentConfig = getComponentConfigByType(type)
  if (!componentConfig) return <NoProp />
  const { PropComponent } = componentConfig

  // 修改组件的props事件处理函数
  const changeProps = (changedProps: ComponentsPropsType) => {
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, changedProps }))
  }

  return <PropComponent {...props} onChange={changeProps} disabled={ isLocked || isHidden }/>
}

export default ComponentProp
