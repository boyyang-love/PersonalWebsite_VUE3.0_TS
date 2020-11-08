<template>
  <div class="contentBox animated fadeInLeft">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentBox",
});
</script>

<style scoped lang='scss'>
.contentBox {
  width: 90vw;
  height: 80vh;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 1px 0 rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
</style>