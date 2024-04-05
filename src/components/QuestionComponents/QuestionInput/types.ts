/**
 * @description: input组件props类型定义
 */ 
export interface QuestionInputPropsType {
  title?: string;
  placeholder?: string;
  onChange?: (changeProps: QuestionInputPropsType) => void
}

/**
 * @default: input组件默认props
 */
export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: '输入框标题',
  placeholder: '请输入内容'
}