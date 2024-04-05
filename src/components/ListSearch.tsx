import React, { FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constants'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const [value, setValue] = useState('')
  const handleSearch = (value, _, type) => {
    if (type.source === 'clear') {
      return
    }
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }

  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [])
  
  return (
    <Search
      placeholder="请输入关键字"
      allowClear
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={(value, event, type) => handleSearch(value, event, type)}
    ></Search>
  )
}

export default ListSearch
