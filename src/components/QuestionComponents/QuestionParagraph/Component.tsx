import React, { FC } from 'react'
import { Typography } from 'antd'
import { type QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './types'

const { Paragraph } = Typography

const QuestionParagraph: FC<QuestionParagraphPropsType> = (props) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }
  // 文本换行、转换为数组以换行为间隔(不使用将'\n'替换为<br>加上antd的dangerouslySetInnerHTML的方法让段落框可以解析HTML，这不安全)
  const t = text.split('\n')
  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0px' }}>
      {t.map((item, index) => (
        <span key={index}>
          {index > 0 && <br/>}
          {item}
        </span>
      ))}
    </Paragraph>
  )
}

export default QuestionParagraph
