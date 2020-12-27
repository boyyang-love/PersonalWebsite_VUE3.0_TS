<template>
  <div class="center">
    <left-navbar @navchange="navchange" @alertshow="alertshow"></left-navbar>
    <dynamic v-show="navIndex == 1"></dynamic>
    <upload-news v-show="navIndex == 2"></upload-news>
    <circle-friends v-show="navIndex == 3"></circle-friends>
    <div class="exit">
      <i class="iconfont icon-custom311" @click="$router.push('/')"></i>
    </div>
    <div class="alert-box" v-show="isAlert">
      <alert-box @exitlogin="exitlogin"></alert-box>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import LeftNavbar from "@/components/LeftNavbar/index.vue";
import Dynamic from "@/components/Dynamic/index.vue";
import UploadNews from "@/components/UploadNews/index.vue";
import CircleFriends from "@/components/CircleFriends/index.vue";
import AlertBox from "@/components/AlertBox/index.vue";
import { Login } from "@/hooks/index.ts";
import { useRouter } from "vue-router";
import { auth } from "@/db/index.ts";
export default defineComponent({
  name: "center",
  components: {
    LeftNavbar,
    Dynamic,
    UploadNews,
    CircleFriends,
    AlertBox,
  },
  setup() {
    const navIndex = ref<number>(1);
    const isAlert = ref<boolean>(false);
    const router = useRouter();
    const login = new Login();
    const navchange = (i: number): void => {
      navIndex.value = i;
    };
    // 隐藏alertbox
    const alertshow = (): void => {
      isAlert.value = !isAlert.value;
    };
    // 退出登录
    const exitlogin = (): void => {
      login.signout().then((res) => {
        auth
          .anonymousAuthProvider()
          .signIn()
          .then(() => {
            router.push("/");
          });
      });
    };

    return {
      navchange,
      navIndex,
      alertshow,
      isAlert,
      exitlogin,
    };
  },
});
</script>

<style scoped lang='scss'>
@mixin center($direction) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}
.center {
  width: 100vw;
  height: 100vh;
  background-color: #f9906f;
  display: flex;
  @include center(cloum);

  .exit {
    position: absolute;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
    i {
      font-size: 35px;
      cursor: pointer;
      &:hover {
        color: #be002f;
      }
    }

    @media screen and (max-width: 400px) {
      right: 0;
    }
  }

  .alert-box {
    position: absolute;
    left: 80px;
    @include center(cloum);
  }
}
</style>