<template>
  <div class="home">
    <div class="BlueOcean">
      <img src="../assets/images/Blueocean01.png" alt="" />
    </div>
    <menu-bar :tabs="tabs"></menu-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuBar from "@/components/MenuBar/index.vue";
import { Itabs } from "@/typings";
export default defineComponent({
  name: "Home",
  components: {
    MenuBar,
  },
  setup() {
    const tabs: Itabs[] = [
      {
        tabIndex: 1,
        tabName: "Home",
      },
      {
        tabIndex: 2,
        tabName: "Music",
      },
      {
        tabIndex: 3,
        tabName: "Center",
      },
      {
        tabIndex: 4,
        tabName: "Contact",
      },
      {
        tabIndex: 5,
        tabName: "About",
      },
    ];

    return {
      tabs,
    };
  },
});
</script>

<style scoped lang='scss'>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: url("../assets/images/2B尼尔机械纪元 厚涂画风 2B高清4k游戏壁纸_彼岸图网.jpg")
    no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  .BlueOcean {
    width: 100%;
    position: absolute;
    img {
      width: 20%;
      animation: FishMove 10s ease;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      cursor: pointer;
    }
  }
}

@keyframes FishMove {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(1000px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>