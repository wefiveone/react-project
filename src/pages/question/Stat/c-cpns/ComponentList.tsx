import React, { FC } from 'react'
import classnames from 'classnames'
import useGetComponentList from '@/hooks/useGetComponentInfo'
import { ComponentInfoType } from '@/store/componentListReducer'
import { generateComponent } from '../../Edit/c-cpns/EditCanvas'
import styles from './ComponentList.module.scss'

const ComponentWrapperClassnames = styles['component-wrapper']
const selectedClassnames = styles['selected']

type PropsType ={
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}


const componentList: FC<PropsType> = (props) => {

  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

  const { componentList } = useGetComponentList()

  return (
    <div className={styles.container}>
      {componentList
        .filter((item) => item.isHidden === false)
        .map((item: ComponentInfoType) => {
          const { fe_id, type } = item
          const ComponentWrapper = classnames({
            [ComponentWrapperClassnames]: true,
            [selectedClassnames]: item.fe_id === selectedComponentId,
          })
          return (
            <div key={fe_id} className={ComponentWrapper} onClick={() => {
              setSelectedComponentId(fe_id)
              setSelectedComponentType(type)
            } }>
              <div className={styles.component}>{generateComponent(item)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default componentList
