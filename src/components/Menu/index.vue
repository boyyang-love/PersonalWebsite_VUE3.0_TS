<template>
  <div class="menu">
    <menu-items
      v-for="item of tabs"
      :key="item.id"
      :tab="item.id"
      @click="tabChange(item.id)"
      :tabindex="tabindex"
      >{{ item.tab }}</menu-items
    >
  </div>
  <div>
    {{ tabindex }}
  </div>
</template>

<script lang='ts'>
import MenuItems from "./components/MenuItems.vue";
import { defineComponent, PropType, reactive, ref, toRefs } from "vue";
interface Istate {
  tabindex: number;
  id: number;
}

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
    const tabChange = (id: number): void => {
      tabindex.value = id;
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
  width: 100%;
  height: 70px;
  background: rgba(133, 86, 86, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  overflow: hidden;
}
</style>