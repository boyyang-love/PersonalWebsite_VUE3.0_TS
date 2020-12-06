<template>
  <div class="items">
    <img
      src="../../../assets/images/鬼灭之刃蝴蝶忍4k高清电脑壁纸3840x2160_彼岸图网.jpg"
      alt=""
      v-lazy="img"
    />
    <div class="downLoad">
      <i class="iconfont icon-xiazai1" @click="$emit('download', downLoadUrl)"></i>
    </div>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ImgBox",
  props: {
    img: String,
    downLoadUrl: String
  },
});
</script>

<style scoped lang='scss'>
.items {
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 10px;
  border: 5px solid pink;
  background-color: pink;
  border-radius: 15px;
  box-shadow: 2px 2px 1px 0px rgba(0, 0, 0, 0.5);
  position: relative;
  img {
    width: 100%;
    border-radius: 15px;
  }

  .downLoad {
    position: absolute;
    bottom: 25px;
    right: 25px;

    i {
      font-size: 26px;
      color: #fff;
      cursor: pointer;
      &:hover {
        color: rgb(219, 23, 98);
      }
    }
  }
}
</style>