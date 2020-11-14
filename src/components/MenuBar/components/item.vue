<template>
  <div :class="['item', { active: tabindex == index }]">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Item",
  props: {
    tabindex: Number,
    index: {
      type: Number,
      default: 1,
    },
  },
});
</script>

<style scoped lang='scss'>
.item {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  &:hover {
    background-color: rgba(255, 192, 203, 0.5);
    color: #f7f7f7;
    font-weight: bold;
  }
}

.active {
  background-color: rgba(61, 59, 79, 0.5);
  color: white;
}
</style>