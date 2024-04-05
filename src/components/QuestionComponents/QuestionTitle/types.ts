/**
 * @description: 标题组件类型定义
 */ 
export interface QuestionTitlePropsType {
  text?: string;
  level?: 1 | 2 |3 | 4 | 5;
  isCenter?: boolean;
  disabled?: boolean;
  onChange?: (changedProps: QuestionTitlePropsType) => void
}

/**
 * @default: 标题组件默认属性
 */
export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '一级标题',
  level: 1,
  isCenter: false,
}