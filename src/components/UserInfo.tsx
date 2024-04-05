import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Space, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { HOME_PATHNAME, LOGIN_PATHNAME } from '../router'
import { removeUserTokenFromStorage } from '../utils/user-token-cache'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { useAppDispatch } from '../store/hooks'
import { logoutReducer } from '../store/userReducer'
import { removeUserInfoFromStorage } from '../utils/user-info-cache'

const UserInfo: FC = () => {
  const nav = useNavigate()
  // 从redux中获取用户信息
  const { username, nickname } = useGetUserInfo()
  const dispatch = useAppDispatch()

  const logOut = () => {
    // 清除redux store中的用户信息
    dispatch(logoutReducer())
    // 删除Storage中用户token
    removeUserTokenFromStorage()
    // 删除Storage用户信息
    removeUserInfoFromStorage()
    // 提示
    message.success('退出成功')
    // 跳转到登录页
    nav(HOME_PATHNAME)
  }

  // 登录成功显示用户信息
  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <Space>
          <UserOutlined />
          {nickname}
        </Space>
      </span>
      <Button type="link" onClick={logOut}>
        退出
      </Button>
    </>
  )

  // 未登录显示登录
  const Login = (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  )

  return <>{username ? UserInfo : Login}</>
}

export default UserInfo
