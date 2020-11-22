<template>
  <div class="home">
    <div class="bg">
      <img :src="bg" alt="" />
    </div>
    <div class="BlueOcean">
      <label for="input">
        <img src="../assets/images/Blueocean01.png" alt="" />
        <input
          type="file"
          name=""
          id="input"
          accept="image/*"
          ref="img"
          @change="imgUp"
        />
      </label>
    </div>
    <menu-bar :tabs="tabs"></menu-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import MenuBar from "@/components/MenuBar/index.vue";
import { IhomeState, Itabs } from "@/typings";
import { FileUp, Login } from "@/hooks/index.ts";
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
        icon: "icon-shouye2",
      },
      {
        tabIndex: 2,
        tabName: "Music",
        icon: "icon-yinle6",
      },
      {
        tabIndex: 3,
        tabName: "Center",
        icon: "icon-A",
      },
      {
        tabIndex: 4,
        tabName: "Contact",
        icon: "icon-lianxi",
      },
      {
        tabIndex: 5,
        tabName: "About",
        icon: "icon-iconset0142",
      },
    ];

    const state = reactive<IhomeState>({
      bg: require("../assets/images/鬼灭之刃蝴蝶忍4k高清电脑壁纸3840x2160_彼岸图网.jpg"),
      id: "1",
      fileID: "1",
    });

    const file = new FileUp(state);
    // const login = new Login();

    const img: any = ref(null);

    const imgUp = (): void => {
      file.fileUpdate(img.value.files[0]);
    };

    return {
      img,
      tabs,
      imgUp,
      ...toRefs(state),
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

  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .imgUp {
    width: 15%;
    height: 50px;
    background-color: #fff;
    position: absolute;
    bottom: 90px;
    border-radius: 10px;
    box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.3);
  }
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

    input[type="file"] {
      display: none;
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