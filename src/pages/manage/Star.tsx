import React from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Spin, Pagination } from 'antd'
import styles from './common.module.scss'
import type { FC } from 'react'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPagination from '../../components/ListPagination'

const { Title } = Typography

const Star: FC = () => {
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data
  useTitle('小易问卷-星标问卷')
  return (
    <>
      <div className={styles.header}>
        <div className="left">
          <Title level={3}>星标问卷</Title>
        </div>
        <div className="right">
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty />}
        {!loading &&
          list.length > 0 &&
          list.map((item) => {
            const { _id } = item
            return <QuestionCard key={_id} {...item} />
          })}
      </div>
      <div className={styles.footer}>
        <ListPagination total={total}/>
      </div>
    </>
  )
}

export default Star
