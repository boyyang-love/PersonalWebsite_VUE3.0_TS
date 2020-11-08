<template>
  <Menu :tabs="tabs" />
  <router-view />
</template>

<script lang="ts">
import Menu from "@/components/Menu/index.vue";
import { defineComponent } from "vue";
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
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: url("./assets/images/2B尼尔机械纪元 厚涂画风 2B高清4k游戏壁纸_彼岸图网.jpg");
  background-position: center;
  background-size: cover;
}
</style>
