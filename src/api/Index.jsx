import axios from "axios";
import store from "../redux/store/Index.jsx"
import {SIGN_OUT} from "../redux/action/Types.jsx";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  timeout: 10000
})

api.interceptors.request.use(
  (request) => {
    request.headers["Authorization"] = "Bearer " + store.getState().token
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    if (response) {
      return response
    }
  },
  (error) => {
    if (
      error?.response?.status === 401 ||
      error?.response?.status === 403
    ) {
      store.dispatch({type: SIGN_OUT})
    }
    return Promise.reject(error)
  }
)
export default api