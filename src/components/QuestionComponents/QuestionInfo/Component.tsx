import React, { FC } from 'react'
import { Typography } from 'antd'
import { type QuestionInfoPropsType, QuestionInfoDefaultProps } from './types'

const { Title, Paragraph } = Typography

const QuestionInfo: FC<QuestionInfoPropsType> = (props) => {
  const { title, desc } = { ...QuestionInfoDefaultProps, ...props }

  // 保证文本可以换行
  const desTextList = desc.split('\n')

  return (
    <div style={{textAlign: 'center'}}>
      <Title style={{ fontSize: '24px' }}>{title}</Title>
      <Paragraph>
        {
          desTextList.map((item, index) => {
            return (
              <span key={index}>
                {index > 0 && <br />}
                {item}
              </span>
            )
          })
        }
      </Paragraph>
    </div>
  )
}

export default QuestionInfo
