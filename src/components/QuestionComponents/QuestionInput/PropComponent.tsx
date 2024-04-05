import React, { FC } from 'react'
import { Form, Input } from 'antd'
import { QuestionInputPropsType } from './types'

const PropComponent: FC<QuestionInputPropsType> = (props) => {
  const { placeholder, title, onChange } = props

  const handleValuesChange = (changedValues) => {
    onChange(changedValues)
  }

  return (
    <Form layout='vertical' initialValues={{title, placeholder}} onValuesChange={handleValuesChange}>
      <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='Placeholder' name='placeholder'>
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent