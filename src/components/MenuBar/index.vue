<template>
  <div class="menuBar">
    <item
      v-for="tab of tabs"
      :key="tab.tabIndex"
      :tabindex="tab.tabIndex"
      :index="index"
      :icon="tab.icon"
      @click="tabChange(tab.tabIndex)"
      ></item
    >
  </div>
</template>

<script lang='ts'>
import { Itabs } from "@/typings";
import { defineComponent, PropType, ref } from "vue";
import { Router, useRouter } from "vue-router";
import Item from "./components/item.vue";
import { AUTH } from "@/db/index";
export default defineComponent({
  name: "MenuBar",
  components: {
    Item,
  },
  props: {
    tabs: Array as PropType<Itabs[]>,
  },
  setup() {
    const index = ref<number>(0);
    // 路由
    const router: Router = useRouter();
    // tab change
    const tabChange = (tabIndex: number): void => {
      index.value = tabIndex;
      switch (tabIndex) {
        case 1:
          router.push({
            name: "Home",
          });
          break;
        case 2:
          router.push({
            name: "Music",
          });
          break;
        case 3:
          // 判断是否是登录状态
          AUTH.isLogin().then((res: any) => {
            if (res != null) {
              router.push({
                name: 'Center'
              })
            }else{
              router.push({
                name: 'Login'
              })
            }
          });
          break;
        case 4:
          router.push({
            name: "Contact",
          });
          break;
        case 5:
          router.push({
            name: "About",
          });
          break;
      }
    };

    return {
      index,
      tabChange,
    };
  },
});
</script>

<style scoped lang='scss'>
.menuBar {
  width: 100%;
  height: 70%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  // position: absolute;
  // top: 15px;
  // left: 10px;
  z-index: 9;
  background-color: rgba(190, 55, 55, 0.5);

  @media screen and (max-width: 400px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>