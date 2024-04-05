import wyRequest from '..'
import { resDataType, queryType } from '../types'


// 获取单个问卷数据 edit stat
export function getOneQuestionData(id: string) {
  return wyRequest.get<resDataType>({ url: `/question/${id}` })
}

// 创建一个问卷 manageLayout
export function createOneQuestion() {
  return wyRequest.post<resDataType>({ url: '/question' })
}

// 获取问卷列表 list star trash ListSearch
export function getQuestionListData(query?: Partial<queryType>) {
  return wyRequest.get<resDataType>({ url: '/question', params: query })
}

export function updateQuestionCardData(id: string, data: { [key: string]: any }) {
  return wyRequest.patch<resDataType>({ url: `/question/${id}`, data})
}

export function duplicateQuestionCardData(id: string) {
  return wyRequest.post<resDataType>({ url: `/question/duplicate/${id}` })
}

export function deleteQuestionCardData(ids: string[]) {
  return wyRequest.delete<resDataType>({ url: `/question` , data: { ids }})
}