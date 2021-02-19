<template>
  <div class="music-player">
    <audio :src="musicUrl" autoplay="autoplay"></audio>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MusicPlayer",
  props: {
    musicUrl: {
      type: String,
    },
  },
});
</script>

<style scoped lang="scss">
</style>