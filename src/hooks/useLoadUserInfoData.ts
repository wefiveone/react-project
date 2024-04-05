import { getUserInfo } from "@/service/user";
import { useAppDispatch } from "@/store/hooks";
import { loginReducer } from "@/store/userReducer";
import { useRequest } from "ahooks";

function useLoadUserInfoData() {
  const dispatch = useAppDispatch()
  // 加载用户信息
  const { loading } = useRequest(getUserInfo, {
    onSuccess(res) {
      const { username, nickname} = res
      // 将用户信息保存到redux中
      dispatch(loginReducer({ username, nickname }))
    }
  })
  return { loading }
}

export default useLoadUserInfoData;