export interface OptionType {
  value: string;
  text: string;
  checked: boolean;
}

export interface QuestionCheckboxPropsType {
  title?: string;
  isVertical?: boolean;
  list?: OptionType[];

  onChange?: (value: QuestionCheckboxPropsType) => void;
  disabled?: boolean;
}

export interface QuestionCheckboxStatPropsType {
  stat: Array<{ name: string, count: number }>
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选标题',
  isVertical: false,
  list: [
    { value: 'item1', text: '选项1', checked: false },
    { value: 'item2', text: '选项2', checked: false },
    { value: 'item3', text: '选项3', checked: false },
  ]
}