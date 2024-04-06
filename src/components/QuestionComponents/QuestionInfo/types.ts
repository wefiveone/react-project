export interface QuestionInfoPropsType {
  title?: string;
  desc?: string;

  onChange?: (value: QuestionInfoPropsType) => void;
  disabled?: boolean;
}

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: '问卷标题',
  desc: '问卷描述',
}