import React, { useState } from 'react'
import { useTitle, useRequest } from 'ahooks'
import { Typography, Empty, Table, Tag, Space, Button, Modal, message, Spin } from 'antd'
import type { FC } from 'react'
import styles from './common.module.scss'
import { ExclamationCircleFilled } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import { deleteQuestionCardData, getQuestionListData, updateQuestionCardData } from '../../service/question'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

const columns = [
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '发布状态',
    dataIndex: 'isPublished',
    render: (state) => {
      if (state) return <Tag color="processing">已发布</Tag>
      else return <Tag>未发布</Tag>
    }
  },
  {
    title: '星标状态',
    dataIndex: 'isStar',
    render: (state) => {
      if (state) return <Tag color="purple">已星标</Tag>
      else return <Tag>未星标</Tag>
    }
  },
  {
    title: '回答人数',
    dataIndex: 'answerCount'
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt'
  }
]

const { Title } = Typography
const { confirm } = Modal

const Star: FC = () => {
  // 加载数据
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data
  // 选中卡片
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 恢复请求及恢复成功后的操作
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionCardData(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500,  //防抖
      onSuccess() {
        message.success('恢复成功')
        refresh() // 重新加载页面数据，让恢复的问卷不显示在回收站中
        setSelectedIds([]) // 恢复成功后，清空已选中的问卷
      }
    }
  )
  // 彻底删除请求及彻底删除成功后的操作
  const { run: deleteQuestion } = useRequest(
    async () => {
      await deleteQuestionCardData(selectedIds)
    },
    {
      manual: true,
      debounceWait: 500,  //防抖
      onSuccess() {
        message.success('彻底删除成功')
        refresh() // 重新加载页面数据，让彻底删除的问卷不显示在回收站中
        setSelectedIds([]) // 彻底删除成功后，清空已选中的问卷
      }
    }
  )

  // 确认彻底删除
  const confirmDel = () => {
    confirm({
      title: '确定要彻底删除吗？',
      icon: <ExclamationCircleFilled />,
      content: '删除后将无法恢复，请谨慎操作',
      okText: '确认',
      cancelText: '取消',
      onOk: deleteQuestion
    })
  }

  // 修改标题
  useTitle('小易问卷-回收站')

  return (
    <>
      <div className={styles.header}>
        <div className="left">
          <Title level={3}>回收站</Title>
        </div>
        <div className="right">
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        <div style={{ marginBottom: '10px' }}>
          <Space>
            <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
              恢复
            </Button>
            <Button type="primary" danger disabled={selectedIds.length === 0} onClick={confirmDel}>
              彻底删除
            </Button>
          </Space>
        </div>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty />}
        {!loading && list.length > 0 && (
          <Table
            rowSelection={{
              type: 'checkbox',
              onChange: (selectedRowkeys) => {
                setSelectedIds(selectedRowkeys as string[])
              }
            }}
            columns={columns}
            dataSource={list}
            pagination={false}
            rowKey="_id"
          />
        )}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
