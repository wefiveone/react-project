import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className="left">
          <Logo></Logo>
        </div>
        <div className="right">
          <UserInfo></UserInfo>
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>小易问卷 &copy; 2023 -present, Created by wef1ve0ne</Footer>
    </Layout>
  )
}

export default MainLayout
