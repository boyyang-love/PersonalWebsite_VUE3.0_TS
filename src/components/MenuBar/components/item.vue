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
  color: rgb(0, 0, 0);

  i {
    font-size: 16px;
    margin: 5px;
    color: rgb(0, 0, 0);
  }
  &:hover {
    // background-color: rgba(52, 160, 93, 0.5);
    color: #f7f7f7;
    font-weight: bold;
    i {
      color: #f7f7f7;
    }
  }
}

.active {
  color: rgb(0, 0, 0);
}
</style>