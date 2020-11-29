/**
 * 'boyyang'
 * 图片懒加载
 * @lazyLoad
 */
import lazyLoad from "./lazyLoad/index"
const lazyPlugin: any = {}

lazyPlugin.install = (Vue: any) => {
    Vue.directive('lazy', lazyLoad)
}

export default lazyPlugin