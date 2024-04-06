import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInfoDefaultProps } from './types'

export * from './types'

export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
}