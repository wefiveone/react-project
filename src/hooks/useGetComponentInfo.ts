import { useAppSelector } from '@/store/hooks'
const useGetComponentList = () => {
  const { componentList, selectedId } = useAppSelector((state) => state.componentList)
  const selectedComponent = componentList.find(item => item.fe_id === selectedId)
  return { componentList, selectedId, selectedComponent}
}

export default useGetComponentList