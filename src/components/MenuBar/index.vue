<template>
  <div
    class="menubar"
    :style="{
      'background-color': backgroundColor,
      height: height + 'px',
      'border-radius': borderRadius + 'px',
      color: color,
    }"
  >
    <menu-items
      v-for="item of tabs"
      :key="item.id"
      :tabindex="item.id"
      :tab="tab"
      :borderRadius="borderRadius"
      @click="tabChange(item.id)"
      :active="active"
      >{{ item.tab }}
    </menu-items>
  </div>
  <content-items v-for="item of tabs" :key="item.id" v-show="item.id === tab">
    {{ item }}
  </content-items>
</template>

<script lang='ts'>
import { defineComponent, PropType, reactive, toRefs } from "vue";
import { Imenustate, Itabs } from "@/typings";
import MenuItems from "./MenuItems.vue";
import ContentItems from "./ContentItems.vue";
// interface Istate {
//   active: boolean;
//   id: number;
// }
export default defineComponent({
  name: "MenuBar",
  components: {
    MenuItems,
    ContentItems,
  },
  props: {
    tabs: Array as PropType<Itabs[]>,
    backgroundColor: {
      type: String,
      default: "#44cef6",
    },
    height: {
      type: Number,
      default: 60,
    },
    borderRadius: Number,
    color: String,
  },
  setup() {
    const MenuState: Imenustate = reactive({
      active: false,
      id: 1,
      tab: 1,
    });
    const tabChange = (id: number): void => {
      console.log(id);
      MenuState.tab = id;
    };

    return {
      tabChange,
      ...toRefs(MenuState),
    };
  },
});
</script>

<style scoped lang='scss'>
.menubar {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}
</style>