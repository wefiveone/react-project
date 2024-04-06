import React, { FC } from 'react'
import { Checkbox, Space, Typography } from 'antd'
import { type QuestionCheckboxPropsType, QuestionCheckboxDefaultProps } from './types'

const { Paragraph } = Typography

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (props) => {
  const { title, isVertical, list  } = { ...QuestionCheckboxDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={ isVertical ? 'vertical' : 'horizontal' }>
        {
          list.map((item) => {
            const { value, text, checked } = item
            return (
              <Checkbox key={value} checked={checked} value={value}>{text}</Checkbox>
            )
          })
        }
      </Space>
    </div>
  )
}

export default QuestionCheckbox