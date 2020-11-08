<template>
  <div class="about">
    <content-box></content-box>
  </div>
</template>

<script lang='ts'>
import ContentBox from "@/components/ContentBox/index.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "About",
  components: {
    ContentBox,
  },
});
</script>

<style>
</style>