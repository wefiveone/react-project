export type resDataType = {
  [key: string]: any
} 

export type queryType = {
  keyword: string,
  isStar: boolean,
  isDeleted: boolean,
  pageSize: number,
  page: number
}