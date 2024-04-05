import React from 'react'
import type { FC } from 'react'
import { Typography, Input } from 'antd'
import { QuestionInputPropsType, QuestionInputDefaultProps } from './types'

const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (props) => {
  const { title = '', placeholder = '' } = { ...QuestionInputDefaultProps, ...props }
  return (
    <div className='question-input'>
      <Paragraph strong>{title}</Paragraph>
      <div className='input'>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionInput  