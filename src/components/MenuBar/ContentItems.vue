<template>
  <div class="item">
    <slot />
  </div>
</template>

<script>
export default {
  name: "ContentItems",
};
</script>

<style scoped lang='scss'>
.item {
  width: 100%;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>