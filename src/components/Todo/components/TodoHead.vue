<template>
  <div class="todoHead">
    <div class="left">
      <slot></slot>
    </div>
    <div class="del">
      <i class="iconfont icon-chacha" @click="$emit('hidden', false)"></i>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TodoHead",
});
</script>

<style scoped lang='scss'>
.todoHead {
  width: 100%;
  height: 30px;
  background-color: #fff;
  border-radius: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .left {
    display: flex;
    justify-content: center;
    align-self: center;
    flex: 5;
    padding: 0px 0 0 26px;
    color: #c32136;
  }

  .del {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    i {
      padding: 0 10px;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
}
</style>