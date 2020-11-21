<template>
  <div :class="['navitem', { active: index == id }]">
    <slot />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: Number,
    index: Number,
  },
});
</script>

<style scoped lang='scss'>
.navitem {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(78, 212, 212, 0.5);
  }
}

.active {
  background: rgba(242, 12, 0, 0.4);
}
</style>