import React, { FC, useState } from 'react'
import { Table, Typography, Spin, Pagination } from 'antd'
import { useRequest } from 'ahooks'
import { getStatListData } from '@/service/stat'
import { useParams } from 'react-router-dom'
import useGetComponentList from '@/hooks/useGetComponentInfo'
import { STAT_PAGE_SIZE } from '@/constants'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const { Title } = Typography

const PageStat: FC<PropsType> = (props) => {
  const { id } = useParams()

  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { componentList } = useGetComponentList()

  const [total, setTotal] = useState(0)
  // 答卷列表
  const [list, setList] = useState([])

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)

  const { loading } = useRequest(
    async () => {
      const data = await getStatListData(id, { page, pageSize })
      return data
    },
    {
      refreshDeps: [page, pageSize, id],
      onSuccess(res) {
        const { total, list } = res
        setTotal(total)
        setList(list)
      }
    }
  )

  const columns = componentList.map((item) => {
    const { fe_id, title, props, type } = item as any

    const colTitle = props!.title || title

    return {
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : '' }}>{colTitle}</span>
        </div>
      ),
      dataIndex: fe_id
    }
  })
  
  // 给dataSource添加key
  const dataSource = list.map((item) => ({ ...item, key: item._id }))

  const handlePageChange = (page, pageSize) => {
    setPage(page)
    setPageSize(pageSize)
  }
  const TableElem = (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <Pagination
          total={total}
          onChange={handlePageChange}
          pageSizeOptions={[9]}
          defaultPageSize={STAT_PAGE_SIZE}
        />
      </div>
    </>
  )

  return (
    <div>
      <Title level={4}>答卷数量: {!loading && total}</Title>
      {!loading ? (
        TableElem
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
    </div>
  )
}

export default PageStat
