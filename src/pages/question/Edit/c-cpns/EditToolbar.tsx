import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import { useAppDispatch } from '../../../../store/hooks'
import { deleteSelectedComponent,changeComponentHidden } from '../../../../store/componentListReducer'
import useGetComponentInfo from '../../../../hooks/useGetComponentInfo'
import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

const EditToolbar: FC = () => {
  const { selectedId } = useGetComponentInfo()

  const dispatch = useAppDispatch()

  // 删除组件
  const handleDelete = () => {
    dispatch(deleteSelectedComponent())
  }

  // 隐藏组件
  const handleHidden = () => {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
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
    </Space>
  )
}

export default EditToolbar
