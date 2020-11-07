<template>
  <div>
    <Menu :tabs="tabs" />
  </div>
</template>

<script lang="ts">
import Menu from "@/components/Menu/index.vue";
import { defineComponent, toRefs } from "vue";
import { db } from "@/db";
import { Itabs } from "@/typings";
export default defineComponent({
  name: "Home",
  components: {
    Menu,
  },
  setup() {
    const tabs: Itabs[] = [
      { id: 1, tab: "Home" },
      { id: 2, tab: "Music" },
      { id: 3, tab: "Center" },
      { id: 4, tab: "Contact" },
      { id: 5, tab: "About" },
    ];

    return {
      tabs,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
