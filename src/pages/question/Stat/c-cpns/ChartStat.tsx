import React, { FC } from 'react'
import { Typography } from 'antd'
// import PieDemo from './PieDemo'
// import BarDemo from './BarDemo'
import { useRequest } from 'ahooks'
import { getOneComponentStatData } from '@/service/stat'
import { useParams } from 'react-router-dom'
import { getComponentConfigByType } from '@/components/QuestionComponents'

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}


const { Title } = Typography

const ChartStat: FC<PropsType> = (props) => {

  const { selectedComponentId, selectedComponentType } = props

  const [stat, setStat] = React.useState([])

  const { id } = useParams()

  useRequest(async () => {
    const data = await getOneComponentStatData(id , selectedComponentId)
    return data
  }, {
    refreshDeps: [selectedComponentId, id],
    onSuccess(res) {
      setStat(res.stat)
    }
  })

  // 生成统计图表
  const genStatElem = () => {
    if (!selectedComponentId) return <div>未选中组件</div>
    const { StatComponent } = getComponentConfigByType(selectedComponentType)
    if (!StatComponent) return <div>该组件没有统计图表</div>
    return <StatComponent stat={stat} />
  }

  return (
    <>
      <Title level={4}>图标统计</Title>
      {genStatElem()}
    </>
  )
}

export default ChartStat