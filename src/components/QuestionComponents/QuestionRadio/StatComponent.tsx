import React, { FC, useMemo } from 'react'
import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { STAT_COLORS } from '@/constants'
import { QuestionRadioStatPropsType } from './types'

const format = (num: number) => {
  return (num * 100).toFixed(2)
}


const StatComponent: FC<QuestionRadioStatPropsType> = (props) => {
  const { stat = [] } = props

  const sum = useMemo(() => {
    return stat.reduce((prev, cur) => {
      return prev + cur.count
    }, 0)
  }, [stat])

  return (
    <div style={{ width: '370px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            data={stat}
            cx="45%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
            label={(i) => `${i.name}:${format(i.count / sum)}%`}
          >
            {stat.map((_, index) => (
              <Cell key={index} fill={STAT_COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
