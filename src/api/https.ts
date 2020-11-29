import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios'
import qs from 'qs'

const server: AxiosInstance = axios.create({
    baseURL: '',
    timeout: 3000,
})
/**
 * @axios 请求拦截
 * @return 
 * @config
 */
server.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
        config.data = JSON.stringify(config.data);
        config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)
/**
 * @axios
 * @return 
 * @response
 */

server.interceptors.response.use(
    (response: AxiosResponse<any>): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
        return response
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    console.log('错误请求')
                    break;
                case 401:
                    console.log('未授权，请重新登录')
                    break;
                case 403:
                    console.log('拒绝访问')
                    break;
                case 404:
                    console.log('请求错误,未找到该资源')
                    break;
                case 405:
                    console.log('请求方法未允许')
                    break;
                case 408:
                    console.log('请求超时')
                    break;
                case 500:
                    console.log('服务器端出错')
                    break;
                case 501:
                    console.log('网络未实现')
                    break;
                case 502:
                    console.log('网络错误')
                    break;
                case 503:
                    console.log('服务不可用')
                    break;
                case 504:
                    console.log('网络超时')
                    break;
                case 505:
                    console.log('http版本不支持该请求')
                    break;
                default:
                    console.log(`连接错误${error.response.status}`)
            }
        } else {
            console.log('服务未连接')
        }
        return Promise.resolve(error.response)
    }
)




