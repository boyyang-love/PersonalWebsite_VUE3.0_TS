<template>
  <div class="alertbox animated wobble">
    <div class="header">
      <span>退出登录</span>
      <i class="iconfont icon-custom311" @click="$emit('exitlogin')"></i>
    </div>
    <div class="content">
      <div class="box1">上传动态</div>
      <div class="box2">上传图片</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AlertBox",
});
</script>

<style scoped lang="scss">
.alertbox {
  width: 300px;
  height: 50vh;
  background-color: #fff;
  box-shadow: 2px 2px 1px 0 rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  overflow: hidden;

  .header {
    width: 100%;
    height: 40px;
    background-color: #75878a;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
      font-size: 10px;
      color: white;
    }

    i {
      font-size: 25px;
      cursor: pointer;
      margin: 0 10px;
      &:hover {
        color: #bf242a;
      }
    }
  }

  .content {
    width: 100%;
    height: calc(100% - 40px);
    background-color: pink;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    div {
      width: 75%;
      height: 30%;
      background-color: #fff;
      box-shadow: 2px 2px 1px 0 rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 10px 0;
    }
  }
}
</style>