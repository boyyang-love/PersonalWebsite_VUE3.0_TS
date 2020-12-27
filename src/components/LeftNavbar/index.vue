<template>
  <div class="leftNavBar animated fadeInRight">
    <item
      v-for="(item, i) in lists"
      :key="i"
      :id="item.id"
      :index="index"
      :icon="item.icon"
      @click="change(item.id)"
    >
      {{ item.name }}
    </item>
    <i class="iconfont"></i>

    <div class="setting">
      <img
        src="../../assets/images/齿轮.png"
        alt="齿轮"
        @click="$emit('alertshow')"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { Inavbar } from "@/typings";
import { defineComponent, PropType, ref } from "vue";
import Item from "./components/item.vue";
export default defineComponent({
  name: "LeftNavbar",
  components: {
    Item,
  },
  props: {
    lists: {
      type: Array as PropType<Inavbar[]>,
      default: [
        { name: "", id: 1, icon: "icon-dongtai" },
        { name: "", id: 2, icon: "icon-shangchuan" },
        { name: "", id: 3, icon: "icon-pengyouquan2" },
      ],
    },
  },
  setup(props, { emit }) {
    const index = ref<number>(1);
    const drawer = ref<boolean>(false);
    const change = (i: number): void => {
      index.value = i;
      emit("navchange", i);
    };

    const exitLogin = (): void => {
      // emit("alertshow");
      drawer.value = !drawer.value;
    };
    return {
      change,
      index,
      exitLogin,
      drawer,
    };
  },
});
</script>

<style scoped lang='scss'>
.leftNavBar {
  width: 45px;
  height: 50vh;
  background-color: rgba(192, 28, 96, 0.582);
  box-shadow: 2px 1px 1px 1px rgba(0, 0, 0, 0.7);
  overflow: hidden;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 30px;
  position: absolute;
  left: 0px;
  z-index: 9;

  .setting {
    position: absolute;
    top: 10px;
    right: 20px;
    img {
      width: 30px;
      animation: circle 3s ease-in-out;
      animation-iteration-count: infinite;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 400px) {
    margin-left: 0;
  }
}

@keyframes circle {
  0% {
    transform: rotateZ(0deg);
  }
  50% {
    transform: rotateZ(180deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

.container {
  width: 100%;
  height: 100%;
  .userinfo {
    width: 100%;
    height: 200px;
    position: relative;
    display: grid;
    grid-template-columns: 110px auto;
    align-items: center;
    .bg-img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      img {
        width: 100%;
        height: 100%;
        opacity: 0.6;
        z-index: 0;
      }
    }

    .header {
      width: 100px;
      height: 100px;
      background-color: #fff;
      border: 2px solid pink;
      border-radius: 100%;
      z-index: 9;
      margin-left: 5px;
    }

    .info {
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, 1fr);
      align-items: center;
    }
  }
}
</style>