import axios from 'axios';
export function request(config) {
    const instance = axios.create({
        baseURL: '',
        timeout: 10000
    })
    // 请求拦截
    instance.interceptors.request.use(config => {
        return config
    }, error => {
        return Promise.error(error)
    }
    )
    // 响应拦截配置器
    instance.interceptors.response.use(response=>{
        return response.data
    },error=>{
        return Promise.reject(error)
    })
    return instance(config)
}
export default request