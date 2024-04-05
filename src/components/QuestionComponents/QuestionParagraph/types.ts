export interface QuestionParagraphPropsType {
  text?: string;
  isCenter?: boolean

  onChange?: (changeProps:QuestionParagraphPropsType) => void
  disabled?: boolean
}

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '一行段落',
  isCenter: false
}