<template>
  <div class="login">
    <sign-box
      @signin="signIn"
      @register="register"
      @signout="signout"
    ></sign-box>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import SignBox from "@/components/SignBox/index.vue";
export default defineComponent({
  name: "Login",
  components: {
    SignBox,
  }
});
</script>

<style scoped lang='scss'>
.login {
  width: 100vw;
  height: 100vh;
  background: url("../assets/images/鬼灭之刃蝴蝶忍4k高清电脑壁纸3840x2160_彼岸图网.jpg")
    no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>