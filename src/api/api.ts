import  {get, post}  from "./https"

// export const getHome = (params?: any) => get('/api/home', params)
// export const postHome = (params: any) => post('/api/home', params)


// 获取精品歌单
export const getMusicList = (params?: any) => get('/top/playlist/', params)

// 获取精品歌单详情
export const getMusicListDetail = (params?: any) => get('/playlist/detail/', params)
