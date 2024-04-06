import React, { FC } from 'react'
import { Form, Input } from 'antd'
import { QuestionInfoPropsType } from './types'

const { TextArea } = Input

const PropComponent: FC<QuestionInfoPropsType> = (props) => {
  const { title, desc, onChange, disabled } = props

  const handleChange = (changedValues) => {
    onChange(changedValues)
  }

  return (
    <Form
      layout='vertical'
      initialValues={{ title, desc }}
      onValuesChange={handleChange}
      disabled={disabled}
    >
      <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入问卷标题' }]}>
        <Input placeholder='请输入问卷标题' />
      </Form.Item>
      <Form.Item label='描述' name='desc'>
        <TextArea placeholder='请输入问卷描述' />
      </Form.Item>
    </Form>
  )
}

export default PropComponent