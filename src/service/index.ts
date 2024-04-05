import { BASE_URL, TIME_OUT } from "./config";
import WYRequest from "./request";
const wyRequest = new WYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
});

export default wyRequest;