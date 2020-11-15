<template>
  <div class="login">
    <login-box class="animated rubberBand"></login-box>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import LoginBox from "@/components/LoginBox/index.vue";
export default defineComponent({
  name: "Login",
  components: {
    LoginBox,
  },
});
</script>

<style scoped lang='scss'>
.login {
  width: 100%;
  height: 100vh;
  background: url("../assets/images/长发美女居家写真4k壁纸3840x2160_彼岸图网.jpg")
    no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>