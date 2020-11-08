<template>
  <div class="menu">
    <menu-items
      v-for="item of tabs"
      :key="item.id"
      :tab="item.id"
      @tabchange="tabChange"
      :tabindex="tabindex"
      >{{ item.tab }}</menu-items
    >
  </div>
</template>

<script lang='ts'>
import MenuItems from "./components/MenuItems.vue";
import { defineComponent, PropType, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Menu",
  components: {
    MenuItems,
  },
  props: {
    tabs: Array as PropType<string[]>,
  },

  setup() {
    const tabindex = ref<number>(1);
    const router = useRouter();
    const tabChange = (id: number): void => {
      tabindex.value = id;
      switch (id) {
        case 1:
          router.push({
            path: "/",
          });
          break;
        case 2:
          router.push({
            path: "/music",
          });
          break;
        case 3:
          router.push({
            path: "/center",
          });
          break;
        case 4:
          router.push({
            path: "/contact",
          });
          break;
        case 5:
          router.push({
            path: "/about",
          });
          break;
      }
    };
    return {
      tabindex,
      tabChange,
    };
  },
});
</script>

<style scoped lang='scss'>
.menu {
  width: 90%;
  height: 75px;
  background: rgba(133, 86, 86, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.5);
  margin: 10px 0;
}
</style>