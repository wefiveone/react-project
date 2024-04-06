import React, { FC } from 'react'
import { Typography, Radio, Space } from 'antd'
import { QuestionRadioDefaultProps, type QuestionRadioPropsType } from './types'

const { Paragraph } = Typography

const QuestionRadio: FC<QuestionRadioPropsType> = (props) => {
  const { title, isVertical, options = [], value } = { ...QuestionRadioDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {
            options.map((item) => {
              const { text, value } = item
              return (
                <Radio value={value} key={value}>{text}</Radio>
              )
            })
          }
        </Space>
      </Radio.Group>
    </div>
  )
}

export default QuestionRadio
