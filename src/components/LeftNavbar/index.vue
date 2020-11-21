<template>
  <div class="leftNavBar animated fadeInRight">
    <item
      v-for="(item, i) in lists"
      :key="i"
      :id="item.id"
      :index="index"
      @click="change(item.id)"
      >{{ item.name }}</item
    >
  </div>
</template>

<script lang='ts'>
import { Inavbar } from "@/typings";
import { defineComponent, PropType, ref } from "vue";
import Item from "./components/item.vue";
export default defineComponent({
  name: "LeftNavbar",
  components: {
    Item,
  },
  props: {
    lists: {
      type: Array as PropType<Inavbar[]>,
      default: [
        { name: "动态", id: 1 },
        { name: "上传", id: 2 },
        { name: "圈子", id: 3 },
      ],
    },
  },
  setup() {
    const index = ref<number>(0);
    const change = (i: number): void => {
      index.value = i;
    };
    return {
      change,
      index,
    };
  },
});
</script>

<style scoped lang='scss'>
.leftNavBar {
  width: 45px;
  height: 50vh;
  background-color: rgba(22, 169, 81, 0.5);
  box-shadow: 2px 1px 1px 1px rgba(0, 0, 0, 0.7);
  overflow: hidden;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 30px;
}
</style>