<template>
  <div :class="['navitem', { active: index == id }]">
    <i :class="['iconfont', icon]"></i>
    <slot />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: Number,
    index: {
      type: Number,
      default: 1,
    },
    icon: String,
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
  flex-direction: column;
  cursor: pointer;
  color: white;
  i {
    font-size: 24px;
  }
  &:hover {
    background-color: rgba(78, 212, 212, 0.5);
    color: #161823;
    i {
      color: #161823;
    }
  }
}

.active {
  background: rgba(242, 12, 0, 0.4);
}
</style>