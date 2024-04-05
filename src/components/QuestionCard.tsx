import React, { useState } from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Button, Space, Tag, Popconfirm, message, Modal } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons'
import styles from './QuestionCard.module.scss'
import { useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { duplicateQuestionCardData, updateQuestionCardData } from '../service/question'

type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const { confirm } = Modal

const QuestionCard: FC<PropsType> = (props) => {
  const nav = useNavigate()
  const { title, isPublished, isStar, answerCount, createdAt, _id } = props

  const [isStarState, setStarState] = useState(isStar)

  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionCardData(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setStarState(!isStarState)
      }
    }
  )

  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionCardData(_id)
      return data
    },
    {
      manual: true,
      onSuccess(data) {
        message.success('复制成功')
        nav(`/question/edit/${data.id}`)
      }
    }
  )

  const [isDeletedState, setIsDeletedState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => {
      const data = await updateQuestionCardData(_id, { isDeleted: true })
      return data
    },
    {
      manual: true,
      onSuccess() {
        setIsDeletedState(true)
        message.success('删除成功')
      }
    }
  )
  const confirmDelete = () => {
    confirm({
      title: '确认删除问卷？',
      icon: <ExclamationCircleFilled />,
      content: '删除后无法恢复，请谨慎操作',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        deleteQuestion()
      }
    })
  }

  // 已经删除的问卷，不要再渲染卡片了
  if (isDeletedState) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷:{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '10px 0' }} />
      <div className={styles['button-container']}>
        <div>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              size="small"
              icon={<LineChartOutlined />}
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确认复制问卷？"
              okText="确认"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button type="text" size="small" icon={<CopyOutlined />} disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => confirmDelete()}
              disabled={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
