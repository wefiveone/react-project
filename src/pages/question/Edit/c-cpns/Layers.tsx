import React, { type FC, type ChangeEvent, useState } from 'react'
import { Button, Space, message, Input } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import useGetComponentList from '@/hooks/useGetComponentInfo'
import styles from './Layers.module.scss'
import { useAppDispatch } from '@/store/hooks'
import { changeComponentHidden, changeComponentTitle, changeSelectedId, toggleComponentLocked } from '@/store/componentListReducer'

const titleDefaultClassName = styles.title
const titleSelectedClassName = styles.selected

const Layers: FC = () => {
  const dispatch = useAppDispatch()
  const { componentList, selectedId, selectedComponent } = useGetComponentList()

  // 记录当前正在修改标题的组件,用于判断标题是否显示输入框
  const [changingTitleId, SetChangingTitleId] = useState('')

  const handleTitleClick = (fe_id: string) => {
    // 如果组件是隐藏的，则不能选中
    if (selectedComponent && selectedComponent.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }
    // 如果选中组件不与当前选中组件相同，则切换选中 （第一次点击标题,激活）
    if (selectedId !== fe_id) {
      dispatch(changeSelectedId(fe_id))
      SetChangingTitleId('')
      return
    }
    // 如果选中组件与当前选中组件相同，则修改changingTitleId状态，表示要修改组件标题，并显示输入框  (再次点击激活标题)
    SetChangingTitleId(fe_id)
  }

  // 修改标题
  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changeComponentTitle({ fe_id: changingTitleId, title: newTitle }))
  }

  const handleHiddenClick = (fe_id: string, isHidden: boolean) => {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  const handleLockClick = (fe_id: string) => {
    dispatch(toggleComponentLocked({fe_id}))
  }

  return (
    <>
      {componentList.map((item) => {
        const { fe_id, title, isHidden, isLocked } = item

        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [titleSelectedClassName]: selectedId === fe_id
        })

        return (
          <div key={fe_id} className={styles['layers-item']}>
            <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
              {/* 如果正在修改标题id等于fe_id，则说明要修改标题，显示输入框 */}
              {changingTitleId === fe_id && (
                <Input
                  value={title}
                  onChange={changeTitle}
                  // 回车
                  onPressEnter={() => SetChangingTitleId('')}
                  // 失去焦点
                  onBlur={() => SetChangingTitleId('')}
                />
              )}
              {/* 如果正在修改标题id不等于fe_id, 则显示标题 */}
              {changingTitleId !== fe_id && title}
            </div>
            <div className={styles.handle}>
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  type={isHidden ? 'primary' : 'default'}
                  className={!isHidden ? styles.btn : ''}
                  icon={<EyeInvisibleOutlined />}
                  onClick={() => handleHiddenClick(fe_id, !isHidden) }
                />
                <Button
                  size="small"
                  shape="circle"
                  type={isLocked ? 'primary' : 'default'}
                  className={!isLocked ? styles.btn : ''}
                  icon={<LockOutlined />}
                  onClick={() => handleLockClick(fe_id)}
                />
              </Space>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
