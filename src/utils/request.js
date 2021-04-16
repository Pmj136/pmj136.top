import Msg from './message'
import Storage from "@/utils/localStorage"
import store from "@/store"

// const baseURL = process.env.NODE_ENV === "development"
//     ? "http://localhost:6891"
//     : "https://api.pmj136.top"

const baseURL =
    "https://api.pmj136.top"

const request = axios.create({
    baseURL,
    timeout: 20000,
    withCredentials: true
})
const requestHeaders = {
    "fd": "application/x-www-form-urlencoded",
    "file": "application/form-data"
}

// 添加请求拦截器
request.interceptors.request.use(
    function (config) {
        if (config.type) config.headers['Content-Type'] = requestHeaders[config.type]
        if (config.type === 'fd') config['data'] = Qs.stringify(config.data)
        return config;
    },
    function (error) {
        Msg.error(error.message)
        return Promise.reject(error);
    }
);
// 添加响应拦截器
request.interceptors.response.use(
    function (response) {
        const resp = response.data
        if (resp.code >= 500) {
            Msg.error(resp.msg)
            Storage.del("info")
            return Promise.reject(resp)
        }
        if (resp.code > 200) {
            if (resp.code === 401) store.dispatch("user/reset")
            Msg.warn(resp.msg)
            return Promise.reject(resp)
        }
        return response.data;
    },
    function (error) {
        Msg.error(error.message)
        return Promise.reject(error);
    }
);
export default request;
