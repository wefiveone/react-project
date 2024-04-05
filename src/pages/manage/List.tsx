import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import styles from './common.module.scss'
import type { FC } from 'react'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListData } from '../../service/question'
import { LIST_SEARCH_PAGE_SIZE } from '../../constants'

const { Title } = Typography

const List: FC = () => {
  const [page, setPage] = useState(1)
  const [list, setList] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const haveMoreData = list.length < total

  const [searchParams] = useSearchParams()
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const keyword = searchParams.get('keyword') || undefined

  // 真正加载数据
  const { run: loadData, loading } = useRequest(
    async () => {
      const data = await getQuestionListData({
        page,
        pageSize: LIST_SEARCH_PAGE_SIZE,
        keyword
      })
      return data
    },
    {
      manual: true,
      onSuccess(data) {
        const { list: l, total } = data
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      }
    }
  )

  // 尝试加载数据, 里面判断距离可视区域还有500px时就真正加载数据，使用useDebounceFn防抖
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      // 获取loadMore元素
      const loadMoreEl = loadMoreRef.current
      if (!loadMoreEl) return
      // 获取loadMore元素距离文档顶部的高度
      const domRect = loadMoreEl.getBoundingClientRect()
      const { bottom } = domRect
      // 判断loadMore元素是否在可视区域内，如果在可视区域内才真正加载更多数据
      if (bottom <= document.documentElement.clientHeight + 500) {
        loadData()
      }
    },
    {
      wait: 500
    }
  )
  // 每次搜索时，即keyword变化时都是新的请求，所以需要初始化list、page、total
  useEffect(() => {
    setList([])
    setPage(1)
    setTotal(0)
  }, [keyword])

  // 监听滚动条，当滚动条距离底部小于100px时，加载更多数据
  useEffect(() => {
    window.addEventListener('scroll', tryLoadMore)

    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [])

  // 第一次渲染完成以及每次searchParams变化时(搜索框搜索，添加查询参数keyword)，加载一次数据
  useEffect(() => {
    // 保证搜索框搜索时，不是在原来的list后拼接，而是搜索条件得到的新的list
    // setList([])
    // 不使用tryLoadMore，因为tryLoadMore里会判断loadMore元素是否在可视区域内，如果不在可视区域内，则不会加载数据
    // 如果使用tryLoadMore, 那么在搜索框搜索时，loadMore元素不在可视区域内，会导致loadMore元素永远不会加载数据
    // loadData()
    // 采用上面注释的代码的方式，保证搜索时是新的一次的加载而不是在list后拼接不太好，因为page没有重置回1，可以在前面新增一个useEffect，在每次searchParams变化时，统一初始化list、page、total

    tryLoadMore()
  }, [searchParams])

  // useMemo包裹loadMoreContent，当loading、total、haveMoreData变化时才创建新函数重新执行得到结果
  const loadMoreContent = useMemo(() => {
    if (loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了</span>
    return <span>下拉加载更多...</span>
  }, [loading, total, haveMoreData])

  useTitle('小易问卷-我的问卷')
  return (
    <>
      <div className={styles.header}>
        <div className="left">
          <Title level={3}>我的问卷</Title>
        </div>
        <div className="right">
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((item) => {
            const { _id } = item
            return <QuestionCard key={_id} {...item} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={loadMoreRef}>{loadMoreContent}</div>
      </div>
    </>
  )
}

export default List
