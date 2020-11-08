<template>
  <div
    :class="['menuitems', { active: tab == tabindex }]"
    @click="$emit('tabchange', tab)"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MenuItems",
  props: {
    tab: {
      type: Number,
      default: 1,
    },
    tabindex: {
      type: Number,
      default: 1,
    },
  },
});
</script>

<style scoped lang='scss'>
.menuitems {
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
}

.menuitems:hover {
  background-color: rgba(24, 21, 21, 0.6);
  color: white;
}

.active {
  background-color: rgba(185, 31, 31, 0.6);
}
</style>