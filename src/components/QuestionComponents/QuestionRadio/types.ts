export interface OptionType {
  value: string;
  text: string;
}

export interface QuestionRadioPropsType {
  title?: string;
  isVertical?: boolean;
  options?: OptionType[];
  value?: string;

  onChange?: (value: QuestionRadioPropsType) => void
  disabled?: boolean;
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选框',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项1' },
    { value: 'item2', text: '选项2' },
    { value: 'item3', text: '选项3' },
  ],
  value: '选项1'
}
