import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = (props) => {
  console.log('bbb')
  return (
    <div style={{height: '100vh'}}>
      <Outlet />
    </div>
  )
}

export default QuestionLayout
