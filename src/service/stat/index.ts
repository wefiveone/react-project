import wyRequest from "..";

export function getStatListData(id: string, query: { [key: string]: any }) {
  return wyRequest.get({ url: `/stat/${id}`, params: query })
}

export function getOneComponentStatData(questionId: string, componentId: string) {
  return wyRequest.get({ url: `/stat/${questionId}/${componentId}` })
}