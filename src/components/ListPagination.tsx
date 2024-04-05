import { Pagination } from 'antd'
import React, { FC } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PAGE_PARAM_KEY, LIST_SEARCH_PAGE_SIZE_PARAM_KEY } from '../constants'

type PropsType = {
  total: number
}

const ListPagination: FC<PropsType> = (props) => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const { total } = props
  const handleChange = (page, pageSize) => {
    searchParams.set(LIST_SEARCH_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_SEARCH_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }
  return (
    <>
      <Pagination total={total} onChange={handleChange} />
    </>
  )
}

export default ListPagination