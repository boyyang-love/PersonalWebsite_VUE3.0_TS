<template>
  <div class="login">
    <login-box
      class="animated rubberBand"
      @singup="singup"
      @singin="singin"
    ></login-box>
  </div>
  <loading :isLoading="isLoading" />
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import LoginBox from "@/components/LoginBox/index.vue";
import { Login } from "@/hooks/index.ts";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Login",
  components: {
    LoginBox,
  },
  setup() {
    const isLoading = ref<boolean>(false);
    // 实例化登录
    const LOGIN = new Login();
    // 路由
    const router = useRouter();
    // 注册
    const singup = (account: string, password: string): void => {
      isLoading.value = true;
      LOGIN.singup(account, password).then((res) => {
        if (res == "注册成功") {
          isLoading.value = false;
          alert("账号注册成功，请前往邮箱确认");
        } else {
          isLoading.value = false;
          alert(res);
        }
      });
    };
    // 登录
    const singin = (account: string, password: string): void => {
      isLoading.value = true;
      LOGIN.singin(account, password)
        .then((res) => {
          if (res == "登录成功") {
            isLoading.value = false;
            router.push({
              name: "Center",
            });
          } else {
            isLoading.value = false;
            alert(res);
          }
        })
        .catch((err) => {
          isLoading.value = false;
          alert(err);
        });
    };

    return {
      singup,
      singin,
      isLoading,
    };
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