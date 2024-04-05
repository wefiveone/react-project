import React, { FC } from 'react'
import { Checkbox, Form, Input, Select } from 'antd'
import { QuestionTitlePropsType } from './types'
const PropComponent: FC<QuestionTitlePropsType> = (props) => {
  const { isCenter, level, text, disabled, onChange } = props

  const handleValuesChange = (changedValues) => {
    onChange(changedValues)
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题内容" name="text">
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 }
          ]}
        />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
