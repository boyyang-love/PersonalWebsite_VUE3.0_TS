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
  box-sizing: border-box;
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: rgb(0, 0, 0);

  i {
    font-size: 26px;
    margin: 5px;
    color: rgb(0, 0, 0);
  }
  &:hover {
    background-color: rgba(10, 0, 100, 0.5);
    color: #f7f7f7;
    font-weight: bold;
    i {
      color: #f7f7f7;
    }
  }

  @media screen and (max-width: 400px){
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

.active {
  color: rgb(0, 0, 0);
}
</style>