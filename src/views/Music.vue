<template>
  <div class="music">
    <content-box></content-box>
  </div>
</template>

<script lang='ts'>
import ContentBox from "@/components/ContentBox/index.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Music",
  components: {
    ContentBox,
  },
});
</script>

<style>
</style>