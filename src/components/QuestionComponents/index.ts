import type { FC } from 'react'
import QuestionInputConfig, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConfig, { QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConfig, { QuestionParagraphPropsType } from './QuestionParagraph'

// 各组件props类型
export type ComponentsPropsType =
  | QuestionInputPropsType
  | QuestionTitlePropsType
  | QuestionParagraphPropsType

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
  QuestionParagraphConfig
]

// 组件配置分组数据
export const componentConfigGroup: ComponentConfigGroupType[] = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConfig, QuestionParagraphConfig]
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConfig]
  }
]

// 根据组件类型获取组件配置函数
export function getComponentConfigByType(type: string) {
  return componentConfigList.find((item) => item.type === type)
}
