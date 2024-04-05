import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import { useAppDispatch } from '../../../../store/hooks'
import {
  deleteSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent
} from '../../../../store/componentListReducer'
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined
} from '@ant-design/icons'

const EditToolbar: FC = () => {
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo()
  console.log(copiedComponent)
  const { isLocked } = selectedComponent || {}

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
    dispatch(toggleComponentLocked())
  }

  // 复制组件
  const handleCopy = () => {
    dispatch(copySelectedComponent())
  }

  // 粘贴组件
  const handlePaste = () => {
    dispatch(pasteCopiedComponent())
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
    </Space>
  )
}

export default EditToolbar
