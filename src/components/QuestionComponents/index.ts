import type { FC } from 'react'
import QuestionInputConfig, { type QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConfig, { type QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConfig, { type QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionInfoConfig, { type QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextareaConfig, { type QuestionTextareaPropsType } from './QuestionTextarea'
import QuestionRadioConfig, { type QuestionRadioPropsType } from './QuestionRadio'
import QuestionCheckboxConfig, { type QuestionCheckboxPropsType } from './QuestionCheckbox'

// 各组件props类型
export type ComponentsPropsType =
  | QuestionInputPropsType
  | QuestionTitlePropsType
  | QuestionParagraphPropsType
  | QuestionInfoPropsType
  | QuestionTextareaPropsType
  | QuestionRadioPropsType
  | QuestionCheckboxPropsType

// 组件配置类型
export type ComponentConfigType = {
  title: string
  type: string
  Component: FC<ComponentsPropsType>
  PropComponent: FC<ComponentsPropsType>
  defaultProps: ComponentsPropsType
}

export type ComponentConfigGroupType = {
  groupId: string
  groupName: string
  components: ComponentConfigType[]
}

// 组件配置列表，用于ComponentList组件渲染
const componentConfigList: ComponentConfigType[] = [
  QuestionInputConfig,
  QuestionTitleConfig,
  QuestionParagraphConfig,
  QuestionInfoConfig,
  QuestionTextareaConfig,
  QuestionRadioConfig,
  QuestionCheckboxConfig
]

// 组件配置分组数据
export const componentConfigGroup: ComponentConfigGroupType[] = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionInfoConfig, QuestionTitleConfig, QuestionParagraphConfig]
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConfig, QuestionTextareaConfig]
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConfig, QuestionCheckboxConfig]
  }
]

// 根据组件类型获取组件配置函数
export function getComponentConfigByType(type: string) {
  return componentConfigList.find((item) => item.type === type)
}
