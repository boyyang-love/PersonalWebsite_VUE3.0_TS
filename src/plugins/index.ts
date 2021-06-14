/**
 * 'boyyang'
 * 图片懒加载
 * @lazyLoad
 */
import lazyLoad from "./lazyLoad/index"
import permission from "./permission/index"
const lazyPlugin: any = {}

lazyPlugin.install = (Vue: any) => {
    Vue.directive('lazy', lazyLoad),
    Vue.directive('permission', permission)
}

export default lazyPlugin