import React, { FC } from 'react'
import { QuestionRadioPropsType } from './types'
import { Checkbox, Form, Input, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

const PropComponent: FC<QuestionRadioPropsType> = (props) => {
  const { title, isVertical, options = [], value, onChange, disabled } = props

  const handleChange = (_, allValues) => {
    // 给options中没值的value添加上值 
    const { options = [] } = allValues
    options.forEach((item, index) => {
      if (item.value) return
      item.value = `item${index + 1}`
    })

    onChange(allValues)
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, options, value }}
      onValuesChange={handleChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                console.log(name)
                return (
                  <Space key={key} align="baseline">
                    {/* 输入框 */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        // 验证选项是否重复
                        ({ getFieldsValue }) => ({
                          validator(_, value) {
                            const { options = [] } = getFieldsValue()
                            let num = 0
                            options.forEach((item) => {
                              if (item.text === value) {
                                num++
                              }
                            })
                            if (num === 1) return Promise.resolve()
                            return Promise.reject(new Error('选项重复'))
                          }
                        })
                      ]}
                    >
                      <Input placeholder="输入选项文字..." />
                    </Form.Item>

                    {/* 删除按钮 */}
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ value: '', text: '' })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select options={options.map(({ value, text }) => ({ value, label: text }))}></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
