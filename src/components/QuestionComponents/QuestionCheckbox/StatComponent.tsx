import React, { FC } from 'react'
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { QuestionCheckboxStatPropsType } from './types'


const BarDemo: FC<QuestionCheckboxStatPropsType> = (props) => {

  const { stat } = props

  return (
    <div style={{ width: '370px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={370}
          height={400}
          data={stat}
          margin={{
            top: 60,
            right: 5,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarDemo
