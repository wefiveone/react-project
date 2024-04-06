import React, { FC } from 'react'
import { Form, Input } from 'antd'
import { QuestionTextareaPropsType } from './types'

const PropComponent: FC<QuestionTextareaPropsType> = (props) => {
  const { placeholder, title, disabled, onChange } = props

  const handleValuesChange = (changedValues) => {
    onChange(changedValues)
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
