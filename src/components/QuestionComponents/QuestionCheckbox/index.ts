import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionCheckboxDefaultProps } from './types'

export * from './types'

export default {
  title: '多选',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps
}
