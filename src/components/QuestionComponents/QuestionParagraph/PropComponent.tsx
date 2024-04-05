import React, { FC } from 'react'
import { Form, Input, Checkbox } from 'antd'
import { QuestionParagraphPropsType } from './types'

const { TextArea } = Input

const PropComponent: FC<QuestionParagraphPropsType> = (props) => {
  const { text, isCenter, disabled, onChange } = props

  const handleValuesChange = (changedValues) => {
    onChange(changedValues)
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="段落内容" name="text" rules={[{ required: true, message: '请输入段落内容' }]}>
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
