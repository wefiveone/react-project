import React, { ChangeEvent, FC, useState } from 'react'
import { Button, Typography, Space, Input, message } from 'antd'
import styles from './EditHeader.module.scss'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { useAppDispatch } from '@/store/hooks'
import { changePageInfoTitle } from '@/store/pageInfoReducer'
import useGetComponentList from '@/hooks/useGetComponentInfo'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionCardData } from '@/service/question'

const { Title } = Typography

// 左侧标题组件
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const dispatch = useAppDispatch()

  const [editState, setEditState] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.trim()
    if (!newValue) return
    dispatch(changePageInfoTitle(newValue))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onChange={handleInputChange}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
      />
    )
  }

  return (
    <Space>
      <Title style={{ fontSize: '16px', marginBottom: '0' }}>{title}</Title>
      <Button type="text" icon={<EditOutlined />} onClick={() => setEditState(true)}></Button>
    </Space>
  )
}

// 右侧工具栏发布保存按钮组件
const SaveButton: FC = () => {
  const { id } = useParams()
  const { componentList } = useGetComponentList()
  const pageInfo = useGetPageInfo()

  // 保存问卷请求
  const { run: save, loading } = useRequest(
    async () => await updateQuestionCardData(id, { ...pageInfo, componentList }),
    {
      manual: true
    }
  )

  // 添加快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
    e.preventDefault()
    if (!loading) save()
  })

  // 自动保存（不是定期保存）,防抖
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    { wait: 1000 }
  )

  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}

// 发布按钮
const PublishButton: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { componentList } = useGetComponentList()
  const pageInfo = useGetPageInfo()

  const { run: publish, loading } = useRequest(
    async () => await updateQuestionCardData(id, { ...pageInfo, componentList, isPublished: true }), //标志问卷已发布
    {
      manual: true,
      onSuccess() {
        message.success('发布成功') // 发布成功后跳转到统计页面
        nav(`/question/stat/${id}`)
      }
    }
  )

  return (
    <Button type="primary" onClick={publish} disabled={loading}>
      发布
    </Button>
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}></Button>
            {/* <Title style={{fontSize: '16px', marginBottom: '0px'}}>问卷标题</Title> */}
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
