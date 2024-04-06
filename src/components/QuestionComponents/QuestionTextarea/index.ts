import { QuestionTextareaDefaultProps } from './types'
import Component from './Component'
import PropComponent from './PropComponent'

export * from './types'

// Input组件的配置
export default {
  title: '输入框',
  type: 'questionTextarea',
  Component,
  PropComponent,
  defaultProps: QuestionTextareaDefaultProps
}

