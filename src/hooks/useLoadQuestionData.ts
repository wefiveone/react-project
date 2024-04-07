import { getOneQuestionData } from '../service/question'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useAppDispatch } from '@/store/hooks'
import { resetComponentList } from '@/store/componentListReducer'
import { resetPageInfo } from '@/store/pageInfoReducer'

function useLoadOneQuestionData() {
  // 获取路由参数
  const { id = '' } = useParams()
  // 获取dispatch
  const dispatch = useAppDispatch()
  // 请求问卷数据异步函数
  const fetchQuestionData = async () => {
    const data = await getOneQuestionData(id)
    return data
  }
  // 请求数据
  const { loading } = useRequest(fetchQuestionData, {
    refreshDeps: [id],
    onSuccess(data) {
      const { componentList, title, desc, js, css } = data
      let selectedId = ''
      // 如果componentList有数据，则默认选中高亮第一个组件border
      if (componentList.length > 0) {
        selectedId = componentList[0].fe_id
      }
      // 将问卷列表保存到redux中
      dispatch(resetComponentList({ componentList, selectedId, copiedComponent: null }))

      // 将pageInfo保存到redux中
      dispatch(resetPageInfo({ title, desc, js, css }))
    }
  })

  return { loading }
}

export default useLoadOneQuestionData
