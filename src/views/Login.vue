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
import { defineComponent, h } from "vue";
import { AUTH } from "@/db/index";
import SignBox from "@/components/SignBox/index.vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "Login",
  components: {
    SignBox,
  },
  setup() {
    const router = useRouter();

    // 登录
    const signIn = (email, password) => {
      AUTH.singin(email, password)
        .then((res) => {
          console.log(res);
          if (res) {
            router.push({
              name: "Center",
            });
            ElMessage({
              message: h("p", null, [
                h("span", null, "登录提示"),
                h("i", { style: "color: teal" }, "成功！"),
              ]),
              type: "success",
            });
          }
        })
        .catch((err) => {
          ElMessage({
            message: h("p", null, [
              h("span", null, "登录提示"),
              h("i", { style: "color: teal" }, "失败！"),
            ]),
            type: "error",
          });
        });
    };

    // 注册
    const register = (email, password) => {
      AUTH.singup(email, password)
        .then((res: any) => {
          if (res) {
            ElMessage({
              message: h("p", null, [
                h("span", null, "注册成功提示！"),
                h("i", { style: "color: teal" }, "前往邮箱点击确认"),
              ]),
              type: "success",
            });
          }
        })
        .catch((err: any) => {
          ElMessage({
            message: h("p", null, [
              h("span", null, "注册失败提示！"),
              h("i", { style: "color: teal" }, "邮箱已经被注册！"),
            ]),
            type: "error",
          });
        });
    };

    // 退出
    const signout = (): void => {
      router.back();
    };
    return {
      signIn,
      register,
      signout,
    };
  },
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