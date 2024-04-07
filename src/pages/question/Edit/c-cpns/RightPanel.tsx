import React, { FC, useEffect, useState } from 'react'
import { FileTextOutlined,  SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import useGetComponentList from '@/hooks/useGetComponentInfo'

enum TabsKey {
  prop = 'prop',
  pageSetting = 'pageSetting'
}

const RightPanel: FC = () => {
  const { selectedId } = useGetComponentList()
  const [activeKey, setActiveKey] = useState('')

  useEffect(() => {
    if (selectedId) {
      setActiveKey(TabsKey.prop)
    } else {
      setActiveKey(TabsKey.pageSetting)
    }
  }, [selectedId])

  const tabsItems = [
    {
      key: TabsKey.prop,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />
    },
    {
      key: TabsKey.pageSetting,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />
    }
  ]

  return <Tabs activeKey={activeKey} items={tabsItems} onTabClick={(key) => setActiveKey(key)}/>
}

export default RightPanel