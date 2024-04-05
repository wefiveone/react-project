import React, { FC } from 'react'
import { FileTextOutlined,  SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentProp from './ComponentProp'


const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />
    },
    {
      key: '页面设置',
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <div>页面设置</div>
    }
  ]

  return <Tabs items={tabsItems}/>
}

export default RightPanel