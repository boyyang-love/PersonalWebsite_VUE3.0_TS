import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'

/**
 * @auther boyyang-love 
 * @NODE_ENV 根据当前环境确定请求地址
 * @development 开发环境、
 * @production 生产环境
 * @debug  测试环境
 */

const server: AxiosInstance = axios.create({
    baseURL: process.env.NODE_ENV == 'development' ? 'https://autumnfish.cn': 'https://autumnfish.cn' ,
    timeout: 3000,
})

/**
 * axios请求拦截
 * @return 
 * @config
 */
server.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
        if (config.method == 'get') {
            config.headers.get['Content-Type'] =  'application/x-www-form-urlencoded;charset=utf-8' 
        }
        if (config.method == 'post') {
            config.headers.post['Content-Type'] =  'application/json;charset=utf-8' 
        }
        // const token = '1111111';        
        // token && (config.headers.Authorization = token);
        console.log(config)
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)
/**
 * 响应拦截
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

/**
 * 导出get请求方法
 * @url 请求地址
 * @params get请求参数
 */
export function get(url: string, params?: any): Promise<AxiosResponse> | Promise<AxiosResponse<any>> {
    return new Promise((resolve, reject) => {
        server.get(url, {
            params: params
        }).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}


/**
 * 导出post请求方法
 * @url 请求地址
 * @params post请求参数
 */

export function post(url: string, params: any): Promise<AxiosResponse> | Promise<AxiosResponse<any>> {
    return new Promise((resolve, reject) => {
        server.post(url, qs.stringify(params)).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}





