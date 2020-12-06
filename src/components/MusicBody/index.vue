<template>
  <!-- <div class="musicheader">
    <i class="iconfont icon-tuichu1" @click="$router.back(1)"></i>
  </div> -->
  <div class="musicbody">
    <div class="musicheader" v-show="isScroll">
      <i class="iconfont icon-tuichu1" @click="$router.back(1)"></i>
    </div>
    <div class="music" v-for="(item, i) in musiclist" :key="i">
      <div class="img">
        <img
          src="../../assets/images/鬼灭之刃蝴蝶忍4k高清电脑壁纸3840x2160_彼岸图网.jpg"
          alt=""
          v-lazy="item.coverImgUrl"
        />
        <div class="head">{{ item.name }}</div>
        <div class="play">
          <i class="iconfont icon-bofang5" @click="$emit('handledetail', item.id)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";

export default defineComponent({
  name: "MusicBody",
  props: {
    musiclist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props, {emit}) {
    // 菜单栏是否显示
    const isScroll = ref<boolean>(false);

    // 滚动事件
    const handleScroll = (): void => {
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop > 0) {
        isScroll.value = true;
      } else {
        isScroll.value = false;
      }
    };


    // 开始监听
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });
    // 取消监听
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll, true);
    });

    return {
      isScroll
    };
  },
});
</script>

<style lang="scss" scoped>
.musicheader {
  width: 100%;
  height: 65px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(22, 24, 35, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  i {
    font-size: 45px;
    cursor: pointer;
    color: wheat;
    &:hover {
      color: red;
    }
  }
}
.musicbody {
  width: 100%;
  height: 100%;
  padding-top: 65px;
  background-color: rgb(182, 72, 72);
  display: grid;
  grid-template-columns: repeat(auto-fill, 210px);
  grid-template-rows: repeat (auto, 400px);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  justify-content: center;
  justify-items: center;
  align-items: center;
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;

  .music {
    .img {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover .head {
        top: 10px;
        transition: top 1s ease;
      }

      &:hover .play {
        display: block;
      }
      .head {
        width: 100%;
        height: 25px;
        background-color: rgba(0, 0, 0, 0.6);
        position: absolute;
        top: 0px;
        left: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.6);
        border-radius: 5px;
        padding-left: 2px;
        color: white;
      }
      .play {
        position: absolute;
        display: none;
        i {
          font-size: 24px;
          color: white;
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.6);
        cursor: pointer;
        &:hover {
          transform: scale(1.2);
          transition: all 1s ease;
        }
      }
    }
  }
}
</style>