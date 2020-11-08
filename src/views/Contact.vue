<template>
  <div class="contact">
    <content-box></content-box>
  </div>
</template>

<script lang='ts'>
import ContentBox from "@/components/ContentBox/index.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Contact",
  components: {
    ContentBox,
  },
});
</script>

<style>
</style>