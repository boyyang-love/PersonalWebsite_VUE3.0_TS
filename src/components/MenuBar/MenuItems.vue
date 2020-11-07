<template>
  <div
    :class="['menuitems', { active: tabindex == tab }]"
    :style="{ 'border-radius': borderRadius + 'px' }"
  >
    <slot />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MenuItems",
  props: {
    tabindex: {
      type: Number,
      default: 1,
    },
    active: {
      type: Boolean,
      default: true,
    },
    tab: {
      type: Number,
      default: 1,
    },
    borderRadius: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style scoped lang='scss'>
.menuitems {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
}

.menuitems:hover {
  background-color: #ff4777;
  color: rgb(1, 4, 7);
}

.active {
  background-color: #f36838;
  color: rgb(233, 233, 233);
}
</style>