import { useAppSelector } from "@/store/hooks"


const useGetPageInfo = () => {
  const pageInfo = useAppSelector(state => state.pageInfo)
  return pageInfo
}

export default useGetPageInfo