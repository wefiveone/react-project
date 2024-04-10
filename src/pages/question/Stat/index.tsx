import React, { FC } from 'react'
import { Spin, Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import useLoadOneQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import styles from './index.module.scss'
import StatHeader from './c-cpns/StatHeader'
import ComponentList from './c-cpns/ComponentList'
import PageStat from './c-cpns/PageStat'
import ChartStat from './c-cpns/ChartStat'

const Stat: FC = () => {
  const nav = useNavigate()

  const [selectedComponentId, setSelectedComponentId] = React.useState<string>('')
  const [selectedComponentType, setSelectedComponentType] = React.useState<string>('')

  const { loading } = useLoadOneQuestionData()

  const { isPublished, title } = useGetPageInfo()

  // 修改标题
  useTitle(`问卷统计-${title}`)

  const LoadingElem = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  )

  const getContentElem = () => {
    if (!isPublished)
      return (
        <div style={{ flex: 1 }}>
          <Result
            status="warning"
            title="该网页尚未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      )
    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles['content-wrapper']}>
        {loading ? LoadingElem : <div className={styles.content}>{getContentElem()}</div>}
      </div>
    </div>
  )
}

export default Stat
