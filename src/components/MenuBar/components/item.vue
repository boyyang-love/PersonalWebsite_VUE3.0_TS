<template>
  <div :class="['item', 'iconfont', { active: tabindex == index }]">
    <i :class="['iconfont', icon]"></i>
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
    icon: {
      type: String,
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
  color: #3eede7;

  i {
    font-size: 28px;
    margin: 5px;
    color: #3eede7;
  }
  &:hover {
    background-color: rgba(255, 192, 203, 0.5);
    color: #f7f7f7;
    font-weight: bold;

    i {
      color: #f7f7f7;
    }
  }
}

.active {
  background-color: rgba(61, 59, 79, 0.5);
  color: white;
}
</style>