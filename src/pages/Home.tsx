import React, { FC } from 'react'
import { Typography, Button } from 'antd'
import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom'
import { MANAGE_INDEX_PATHNAME } from '../router'
const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title level={2}>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份, 发布问卷90份, 收到问卷980份</Paragraph>
        <Button type="primary" size="large" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>创建问卷</Button>
      </div>
    </div>
  )
}

export default Home
