<template>
  <div class="imgbox" v-for="(item, i) in images" :key="i" v-show="index == i">
    <img class="top" :src="item.tempFileURL" alt="" />
    <!-- <img class="bottom" :src="images[index -1].tempFileURL" alt="" /> -->
    <div class="prev" @click="prev" v-show="index != 0">
      <i class="iconfont icon-icon-prev"></i>
    </div>
    <div class="next" @click="next" v-show="index != images.length - 1">
      <i class="iconfont icon-zuoyoujiantou-copy-copy-copy1"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ImgBox",
  props: {
    images: Array,
  },
  setup(props) {
    const index = ref(0);
    const prev = (): void => {
      index.value--;
    };
    const next = (): void => {
      index.value++;
    };
    return {
      index,
      prev,
      next,
    };
  },
});
</script>

<style lang="scss" scoped>
.imgbox {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  perspective: 1500px;
  position: relative;

  img.top {
    height: 80vh;
    animation: topAnima 1s ease-in-out;
    transform: rotateY(30deg);
    -webkit-box-reflect: below 10px;
    position: relative;
    border: 2px solid rgb(77, 9, 20);
    border-radius: 4px;
  }

  img.bottom {
    height: 90vh;
    position: absolute;
    z-index: 1;
    opacity: 1;
    // animation: bottomAnima 2s ease-in-out;
  }

  @keyframes topAnima {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(-330deg);
    }
  }
  @keyframes bottomAnima {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
.prev {
  width: 30px;
  height: 30px;
  border: 1px solid rgb(233, 233, 54);
  border-radius: 100%;
  position: absolute;
  left: 5%;
  z-index: 99;
  //   flex
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    color: rgb(233, 233, 54);
  }
}
.next {
  width: 30px;
  height: 30px;
  border: 1px solid rgb(233, 233, 54);
  border-radius: 100%;
  position: absolute;
  right: 5%;
  z-index: 99;
  //   flex
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    color: rgb(233, 233, 54);
  }
}
img.top::before{
    content: '';
    width: 100%;
    height: 5px;
    background-color: blue;
    position: absolute;
    top: 0;
    
}
</style>