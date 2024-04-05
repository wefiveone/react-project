import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './types'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }
  // 获取字体大小
  const getFontSize = (level: number) => {
    switch (level) {
      case 1:
        return '24px'
        break
      case 2:
        return '20px'
        break
      case 3:
        return '16px'
        break
      case 4:
        return '14px'
        break
      default:
        return '12px'
    }
  }
  return (
    <div className='question-title'>
      <Title
        level={level}
        style={{
          textAlign: isCenter ? 'center' : 'start',
          fontSize: getFontSize(level),
          marginBottom: 0
        }}
      >
        {text}
      </Title>
    </div>
  )
}

export default QuestionTitle
