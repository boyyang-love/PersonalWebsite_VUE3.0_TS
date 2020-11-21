<template>
  <div class="menuBar">
    <item
      v-for="tab of tabs"
      :key="tab.tabIndex"
      :tabindex="tab.tabIndex"
      :index="index"
      @click="tabChange(tab.tabIndex)"
      >{{ tab.tabName }}</item
    >
  </div>
</template>

<script lang='ts'>
import { Itabs } from "@/typings";
import { defineComponent, PropType, ref } from "vue";
import { Router, useRouter } from "vue-router";
import Item from "./components/item.vue";
import { Login } from "@/hooks/index.ts";
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
    // 登录状态
    const login = new Login();
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
          {
            login
              .isLogin()
              .then((res) => {
                if (res != "AnonymousAuth") {
                  router.push({
                    name: "Center",
                  });
                } else {
                  router.push({
                    name: "Login",
                  });
                }
              })
              .catch(() => {
                router.push({
                  name: "Login",
                });
              });
          }
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
  width: 80%;
  height: 10vh;
  background-color: rgba(23, 124, 176, 0.5);
  border-radius: 15px;
  box-shadow: 0 2px 3px 0 rgba(2, 2, 2, 0.5);
  margin-bottom: 25px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
}
</style>