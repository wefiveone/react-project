import Component from './Component'
import { QuestionTitleDefaultProps } from './types'
import PropComponent from './PropComponent'

export * from './types'

//Title组件的配置 
export default {
  title: '标题',
  type: 'questionTitle',
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps
}