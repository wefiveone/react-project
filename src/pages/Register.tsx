import { UserAddOutlined } from '@ant-design/icons'
import { Space, Typography, Form, Input, Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import React, { FC } from 'react'
import styles from './RegisterAndLogin.module.scss'
import { LOGIN_PATHNAME } from '../router'
import { useRequest } from 'ahooks'
import { registerUser } from '../service/user'

const { Title } = Typography

const Register: FC = () => {
  const nav = useNavigate()
  const { run: register } = useRequest(async (values) => {
    const { username, password, nickname } = values
    await registerUser(username, password, nickname)
  }, {
    manual: true,
    onSuccess() {
      message.success('注册成功')
      nav(LOGIN_PATHNAME)
    }
  })
  const onFinish = (values) => {
    register(values)
  }

  return (
    <div className={styles.container}>
      <div>
        <Space size={20}>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户注册</Title>
        </Space>
      </div>
      <div className={styles.form}>
        <Form
          size="large"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18, offset: 1 }}
          style={{ width: '320px' }}
          onFinish={onFinish}
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
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码！' },
              ({ getFieldValue }) => ({ validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                } else {
                  return Promise.reject(new Error('两次密码不一致')) 
                }
              } })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label="昵称" name="nickname">
            <Input></Input>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: '8' }}>
            <Button type="primary" htmlType="submit" style={{ width: '150px' }}>
              注册
            </Button>
            <div style={{ textAlign: 'right', marginTop: '10px' }}>
              <Link to={LOGIN_PATHNAME}>已有账号? 前往登录</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
