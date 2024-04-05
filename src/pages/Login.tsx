import React, { FC, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Space, Typography, Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../router'
import { useAppDispatch } from '../store/hooks'
import { fetchUserInfo } from '../store/userReducer'
import { loginUser } from '../service/user'
import { setUserToken } from '../utils/user-token-cache'
import {
  getUsrLoginInfoFromStorage,
  rememberUserLoginInfo,
  deleteUserLoginInfoFromStorage
} from '../utils/user-login-info-cache'
import styles from './RegisterAndLogin.module.scss'

const { Title } = Typography

const Register: FC = () => {
  const nav = useNavigate()
  const dispatch = useAppDispatch()
  const [isChecked, setIsChecked] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  // 登录请求
  const { run: login } = useRequest(
    async (values) => {
      const { username, password } = values
      const data = loginUser(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(res) {
        message.success('登录成功！！！')
        // 派发action，请求用户信息数据(username, nickname)，保存到store中
        dispatch(fetchUserInfo())
        // 跳转到列表页
        nav(MANAGE_INDEX_PATHNAME)
        // 保存token到本地
        setUserToken(res.token)
      }
    }
  )

  // 登录表单提交
  const onFinish = (values) => {
    // 发送登录请求
    login(values)
  }

  const [form] = Form.useForm()

  // 第一个渲染时，从本地缓存中获取用户名和密码，并设置到form中
  useEffect(() => {
    const { username, password } = getUsrLoginInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  // 根据isCheked状态，记住或者删除用户名和密码
  useEffect(() => {
    if (isChecked) {
      rememberUserLoginInfo(username, password)
    } else {
      deleteUserLoginInfoFromStorage()
    }
  }, [isChecked])

  return (
    <div className={styles.container}>
      <div>
        <Space size={20}>
          <Title level={2}>
            <UserOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div className={styles.form}>
        <Form
          size="large"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18, offset: 1 }}
          style={{ width: '320px' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              { type: 'string', min: 6, max: 16, message: '用户名长度在 6 到 16 个字符' },
              { pattern: /^[A-Za-z0-9_]+$/, message: '只能输入字母数字下划线 ' }
            ]}
          >
            <Input value={username} onChange={e => setUsername(e.target.value)}/>
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: '6px' }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox checked={isChecked} onChange={e => setIsChecked(e.target.checked)}>记住我</Checkbox>
            </Form.Item>
            <div style={{ float: 'right' }}>
              <Link to={REGISTER_PATHNAME}>没有账号? 前往注册</Link>
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: '8' }}>
            <Button type="primary" htmlType="submit" style={{ width: '150px' }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
