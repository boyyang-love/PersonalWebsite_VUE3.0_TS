<template>
  <div class="dynamic animated slideInLeft">
    <item></item>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, reactive, ref, toRefs } from "vue";
import Item from "./components/item.vue";
import { Getbackground } from "@/hooks/index.ts";
import { IDynamicState } from '@/typings';
export default defineComponent({
  name: "Dynamic",
  components: {
    Item,
  },
  setup() {
    const getbackground = new Getbackground();
    
    getbackground.getbg().then((res) => {
       console.log(res)
    });

    return {
      
    };
  },
});
</script>

<style scoped lang='scss'>
.dynamic {
  width: 85vw;
  height: 90vh;
  background-color: rgba(0, 255, 179, 0.5);
  box-shadow: 5px 6px 3px 1px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
</style>