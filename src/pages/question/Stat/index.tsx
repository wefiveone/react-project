import React, { FC } from 'react'
import useLoadOneQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading } = useLoadOneQuestionData()
  return (
    <div className="statPage">
    </div>
  )
}

export default Stat
