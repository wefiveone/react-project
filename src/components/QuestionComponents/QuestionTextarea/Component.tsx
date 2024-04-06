import React from 'react'
import type { FC } from 'react'
import { Typography, Input } from 'antd'
import { type QuestionTextareaPropsType, QuestionTextareaDefaultProps } from './types'

const { Paragraph } = Typography
const { TextArea } = Input

const QuestionInput: FC<QuestionTextareaPropsType> = (props) => {
  const { title = '', placeholder = '' } = { ...QuestionTextareaDefaultProps, ...props }
  return (
    <div className='question-input'>
      <Paragraph strong>{title}</Paragraph>
      <div className='input'>
        <TextArea placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionInput  