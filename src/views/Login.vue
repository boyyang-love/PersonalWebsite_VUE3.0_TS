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
import { defineComponent, ref, h } from "vue";
import { Login } from "@/hooks/index.ts";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import SignBox from "@/components/SignBox/index.vue";
export default defineComponent({
  name: "Login",
  components: {
    SignBox,
  },
  setup() {
    const { singin, singup } = new Login();
    const router = useRouter();
    // 登录
    const signIn = (account: string, password: string): void => {
      singin(account, password)
        .then((res) => {
          if (res == "登录成功") {
            ElMessage({
              message: h("p", null, [
                h("span", null, res),
                h("i", { style: "color: teal" }, "提示"),
              ]),
            });
            router.push({ name: "Center" });
          } else {
            ElMessage({
              message: h("p", null, [
                h("span", null, res),
                h("i", { style: "color: teal" }, "提示"),
              ]),
            });
          }
        })
        .catch((err) => {
          ElMessage({
            message: h("p", null, [
              h("span", null, err),
              h("i", { style: "color: teal" }, "提示"),
            ]),
          });
        });
    };
    // 注册
    const register = (account: string, password: string): void => {
      singup(account, password).then((res) => {
        if (res == "注册成功") {
          ElMessage({
            message: h("p", null, [
              h("span", null, res),
              h("i", { style: "color: teal" }, "提示"),
            ]),
          });
          router.push({ name: "Center" });
        } else {
          ElMessage({
            message: h("p", null, [
              h("span", null, res),
              h("i", { style: "color: teal" }, "提示"),
            ]),
          });
        }
      });
    };
    // 退出
    const signout = (): void => {
      router.push({ name: "Home" });
    };
    return {
      signIn,
      register,
      signout
    };
  },
});
</script>

<style scoped lang='scss'>
.login {
  width: 100%;
  height: 100vh;
  background: url("../assets/images/鬼灭之刃蝴蝶忍4k高清电脑壁纸3840x2160_彼岸图网.jpg")
    no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>