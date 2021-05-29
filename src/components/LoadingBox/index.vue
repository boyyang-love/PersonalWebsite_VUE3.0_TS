<template>
  <div class="loading" v-show="isLoading">
    <div class="circle">
      <div class="circle1">
        <div class="circle2"></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingBox",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang='scss'>
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  background-color: rgba(255, 255, 255, 0.7);
  @include center;
  .circle {
    width: 150px;
    height: 150px;
    border: 2px solid red;
    border-radius: 100%;
    background: url("../../assets/images/小满.png") no-repeat center;
    @include center;
    animation: circle 4s ease-in-out;
    animation-iteration-count: infinite;
    .circle1 {
      width: 100px;
      height: 100px;
      border: 2px solid blue;
      border-radius: 100%;
      animation: circle 4s ease-in-out;
      animation-iteration-count: infinite;
      background: url("../../assets/images/立秋.png") no-repeat center;
      @include center();
      .circle2 {
        width: 80px;
        height: 80px;
        border: 2px solid green;
        border-radius: 100%;
        background: url("../../assets/images/雨水.png") no-repeat right;
        @include center();
        animation: circle 4s ease-in-out;
        animation-iteration-count: infinite;
      }
    }
  }
}

@keyframes circle {
  0% {
    transform: translateX(0px);
  }

  25% {
    transform: translateX(200px);
  }

  50% {
    transform: translateX(0px);
  }

  75% {
    transform: translateX(-200px);
  }

  100% {
    transform: translateX(0px);
  }
}

@keyframes circle1 {
  0% {
    transform: translateY(0px);
  }

  25% {
    transform: translateY(200px);
  }

  50% {
    transform: translateY(0px);
  }

  75% {
    transform: translateY(-200px);
  }

  100% {
    transform: translateX(0px);
  }
}
</style>