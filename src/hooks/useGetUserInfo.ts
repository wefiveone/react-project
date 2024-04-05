import { useAppSelector } from "../store/hooks";

function useGetUserInfo() {
  const { username, nickname } = useAppSelector((state) => state.user)
  return { username, nickname }
}

export default useGetUserInfo