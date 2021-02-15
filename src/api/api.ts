/**
 * @auth boyyang
 * @time 2021/1/31
 */
import { get, post } from "./https"

// 首页banner
const getBanner = (params?: any) => get('/banner', params)

// 获取精品歌单
const getMusicList = (params?: any) => get('/top/playlist', params)

// 获取精品歌单详情
const getMusicListDetail = (params?: any) => get('/playlist/detail', params)

// 获取音乐url
const getMusicUrl = (params?: any) => get('/song/url', params)

export {
    getBanner,
    getMusicList,
    getMusicListDetail,
    getMusicUrl
}
