import React, { FC } from 'react'
import { Form, Input, Checkbox, Space, Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { QuestionCheckboxPropsType } from './types'

const PropComponent: FC<QuestionCheckboxPropsType> = (props) => {
  const { title, isVertical, list, onChange, disabled } = props

  const handleClick = (_, allValues) => {

    const { list=[] } = allValues

    // 给list中没有值的value赋值
    list.forEach((item, index) => {
      if (item.value) return
      item.value = `item${index}`
    })

    onChange(allValues)
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      onValuesChange={handleClick}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 是否选中 */}
                    <Form.Item name={[name, 'checked']} valuePropName='checked'>
                      <Checkbox/>
                    </Form.Item>
                    {/* 输入框 */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        // 验证选项是否重复
                        ({ getFieldsValue }) => ({
                          validator(_, value) {
                            const { list = [] } = getFieldsValue()
                            let num = 0
                            list.forEach((item) => {
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
                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ value: '', text: '', checked: false })}
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
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
