import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListData } from '../service/question'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_SEARCH_PAGE_PARAM_KEY,
  LIST_SEARCH_PAGE_SIZE_PARAM_KEY
} from '../constants'
type optionsType = {
  isStar: boolean
  isDeleted: boolean
}
function useLoadQuestionListData(options: Partial<optionsType> = {}) {
  const { isStar, isDeleted } = options
  const [searchParams] = useSearchParams()
  const { data, loading, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || undefined
      const page = parseInt(searchParams.get(LIST_SEARCH_PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(LIST_SEARCH_PAGE_SIZE_PARAM_KEY) || '') || 10
      const res = await getQuestionListData({ keyword, isDeleted, isStar, page, pageSize })
      return res
    },
    {
      refreshDeps: [searchParams]
    }
  )
  return { data, loading, refresh }
}
export default useLoadQuestionListData
