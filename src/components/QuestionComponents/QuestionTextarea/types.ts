/**
 * @description: input组件props类型定义
 */ 
export interface QuestionTextareaPropsType {
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (changeProps: QuestionTextareaPropsType) => void
}

/**
 * @default: input组件默认props
 */
export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: '输入框标题',
  placeholder: '请输入内容'
}