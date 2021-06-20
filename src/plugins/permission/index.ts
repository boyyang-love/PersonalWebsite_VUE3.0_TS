/**
 * @author yang
 * @time 2021/6/14
 * @description {权限指令}
 * */


import store from "@/store"
export default {
      mounted(el: Element, binding: any) {
            const { value } = binding
            const authLists = store.getters.authList
            if (authLists && authLists.includes(...value)) {
                  return
            } else {
                  el.parentNode && el.parentNode.removeChild(el)
            }
      }
}