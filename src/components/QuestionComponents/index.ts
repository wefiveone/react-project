import type { FC } from "react";
import QuestionInputConfig, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConfig, { QuestionTitlePropsType } from "./QuestionTitle";

// 各组件props类型
export type ComponentsPropsType = QuestionInputPropsType | QuestionTitlePropsType

// 组件配置类型
export type ComponentConfigType = {
  title: string,
  type: string,
  Component: FC<ComponentsPropsType>
  PropComponent: FC<ComponentsPropsType>
  defaultProps: ComponentsPropsType
}

export type ComponentConfigGroupType = {
  groupId: string,
  groupName: string,
  components: ComponentConfigType[]
}

// 组件配置列表
const componentConfigList: ComponentConfigType[] = [QuestionInputConfig, QuestionTitleConfig]

// 组件配置分组数据
export const componentConfigGroup: ComponentConfigGroupType[] = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConfig]
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConfig]
  }
]

// 根据组件类型获取组件配置函数
export function getComponentConfigByType(type: string) {
  return componentConfigList.find(item => item.type === type)
}