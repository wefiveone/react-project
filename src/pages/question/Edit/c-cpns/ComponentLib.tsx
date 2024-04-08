import React, { FC } from 'react'
import { Typography } from 'antd'
import { nanoid } from 'nanoid'
import {
  componentConfigGroup,
  type ComponentConfigType
} from '../../../../components/QuestionComponents'
import styles from './ComponentLib.module.scss'
import { useAppDispatch } from '../../../../store/hooks'
import { addComponentToComponentList } from '../../../../store/componentListReducer'

const { Title } = Typography

const generateComponent = (componentConfig: ComponentConfigType) => {
  const { type, title, Component, defaultProps } = componentConfig
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(
      addComponentToComponentList({
        fe_id: nanoid(),
        type,
        title,
        isHidden: false,
        isLocked: false,
        props: defaultProps
      })
    )
  }

  return (
    <div className={styles['component-wrapper']} key={type} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <div className={styles.componentLib}>
      {componentConfigGroup.map((group, index) => {
        const { groupId, groupName, components } = group
        return (
          <div key={groupId} className="component">
            <Title level={4} style={{ fontSize: '16px', marginTop: index === 0 ? '0px' : '20px' }}>
              {groupName}
            </Title>
            {components.map((item) => generateComponent(item))}
          </div>
        )
      })}
    </div>
  )
}

export default ComponentLib
