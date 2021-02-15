<template>
  <router-view></router-view>
  <music-player :musicUrl="musicUrl"></music-player>
</template>

<script lang="ts">
import Vue, { computed, defineComponent, ref } from "vue";
import MusicPlayer from "@/components/MusicPlayer/index.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    MusicPlayer,
  },
  setup() {
    const store = useStore();

    const musicUrl = computed(() => {
      return store.state.musicUrl;
    });

    return {
      musicUrl,
    };
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100vh;
  overflow: auto;
}

.el-message-box {
  max-height: 75vh;
  overflow: auto !important;
}

@media screen and (max-width: 400px) {
  .el-message-box__wrapper .el-message-box {
    width: 340px !important;
  }
}
</style>
