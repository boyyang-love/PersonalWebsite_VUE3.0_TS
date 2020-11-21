<template>
  <div class="center">
    <left-navbar></left-navbar>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import LeftNavbar from "@/components/LeftNavbar/index.vue";
export default defineComponent({
  name: "center",
  components: {
    LeftNavbar,
  },
});
</script>

<style scoped lang='scss'>
@mixin center($direction) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}
.center {
  width: 100vw;
  height: 100vh;
  background-color: #f9906f;
  display: flex;
  align-items: center;
}
</style>