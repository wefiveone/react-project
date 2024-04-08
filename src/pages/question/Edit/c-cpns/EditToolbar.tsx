import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import { useAppDispatch } from '../../../../store/hooks'
import {
  deleteSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent
} from '../../../../store/componentListReducer'
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UpOutlined
} from '@ant-design/icons'

const EditToolbar: FC = () => {
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}

  // 上移下移判断
  const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId)
  const isFirst = selectedIndex <= 0  //当前选中组件是否是第一个
  const isLast = selectedIndex >= componentList.length - 1 //当前选中组件是否是最后一个

  const dispatch = useAppDispatch()

  // 删除组件
  const handleDelete = () => {
    dispatch(deleteSelectedComponent())
  }

  // 隐藏组件
  const handleHidden = () => {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }

  // 锁定/解锁组件
  const handleLock = () => {
    dispatch(toggleComponentLocked({ fe_id: selectedId}))
  }

  // 复制组件
  const handleCopy = () => {
    dispatch(copySelectedComponent())
  }

  // 粘贴组件
  const handlePaste = () => {
    dispatch(pasteCopiedComponent())
  }

  // 组件上移
  const handleMoveUp = () => {
    if (isFirst) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }

  const handleMoveDown = () => {
    if (isLast) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
          disabled={selectedId === '' ? true : false}
        ></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
          disabled={selectedId === '' ? true : false}
        ></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          disabled={selectedId === '' ? true : false}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          onClick={handleCopy}
          disabled={selectedId === '' ? true : false}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={ copiedComponent === null}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          onClick={handleMoveUp}
          disabled={ isFirst }
        ></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={handleMoveDown}
          disabled={ isLast }
        ></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
