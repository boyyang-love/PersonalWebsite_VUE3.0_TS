import  {get, post}  from "./https"

export const getHome = (params?: any) => get('', params)
export const postHome = (params?: any) => post('', params)
