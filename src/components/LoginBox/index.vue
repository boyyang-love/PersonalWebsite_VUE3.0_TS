<template>
  <div class="loginbox">
    <div class="top">
      <div class="signIn" @click="loginStatus = !loginStatus">
        {{ loginStatus == true ? "登录" : "注册" }}
      </div>
    </div>
    <div class="account">
      <span>Account:</span>
      <input type="text" placeholder="邮箱账号" v-model="account" />
      <i class="iconfont icon-dui3" v-show="emailReg.test(account)"></i>
    </div>
    <div class="password">
      <span>Password:</span>
      <input type="password" placeholder="注册密码" v-model="password" />
      <i class="iconfont icon-dui3" v-show="passwordReg.test(password)"></i>
    </div>
    <div class="repasword" v-show="loginStatus == true">
      <span>Confirm:</span>
      <input type="password" placeholder="确认密码" v-model="repassword" />
      <i
        class="iconfont icon-dui3"
        v-show="password == repassword && repassword.trim().length != 0"
      ></i>
    </div>
    <div class="submit">
      <div class="exit" @click="$router.back(1)">退出</div>
      <div class="sure" @click="submit">
        {{ loginStatus == true ? "注册账号" : "登录" }}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { IloginState } from "@/typings";
import { defineComponent, reactive, toRefs } from "vue";
// import { Login } from "@/hooks/index.ts";
export default defineComponent({
  name: "LoginBox",
  setup(props, { emit }) {
    const state = reactive<IloginState>({
      account: "",
      password: "",
      repassword: "",
      loginStatus: false, //切换登录状态 true为注册 false 为登录
    });

    const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const passwordReg = /^.{6,16}$/;
    // const login = new Login();

    // 登录或注册事件
    const submit = (): void => {
      if (state.loginStatus) {
        //注册
        // 邮箱验证 密码验证 密码相同验证
        if (
          emailReg.test(state.account.trim()) &&
          passwordReg.test(state.password.trim()) &&
          state.password == state.repassword
        ) {
          emit("singup", state.account, state.password);
        }
      } else {
        //登录
        if (
          emailReg.test(state.account.trim()) &&
          passwordReg.test(state.password.trim())
        ) {
          emit("singin", state.account, state.password);
        }
      }
    };

    return {
      ...toRefs(state),
      submit,
      emailReg,
      passwordReg,
    };
  },
});
</script>

<style scoped lang='scss'>
.loginbox {
  width: 35%;
  height: 45%;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 20px 15px 3px 0px rgba(37, 36, 36, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  div {
    width: 75%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 5px 0;
    span {
      width: 80px;
      height: 45px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 10px;
      color: #003472;
    }

    input {
      height: 60%;
      border: none;
      outline: none;
      border-radius: 15px;
      padding-left: 15px;
      background-color: rgba(68, 206, 246, 0.5);
      color: rgb(116, 111, 111);
      font-weight: bold;
    }

    i {
      color: green;
      margin: 0 5px;
      position: absolute;
      right: 2px;
    }
  }
  .submit {
    position: absolute;
    bottom: 15px;
    div {
      height: 60%;
      background-color: rgba(255, 255, 255, 0.6);
      border-radius: 16px;
      margin: 0 5px;
      cursor: pointer;
      box-shadow: 2px 3px 1px 0 rgbaa(37, 36, 36, 0.4);
      &:hover {
        background-color: rgba(240, 0, 86, 0.5);
      }
    }
  }
  .top {
    height: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: 20px;
    div {
      width: 20%;
      height: 100%;
      cursor: pointer;
      background-color: rgba(255, 182, 30, 0.5);
      border-radius: 10px;
      color: white;
      box-shadow: 2px 2px 1px 0 rgba(37, 36, 36, 0.4);
      &:hover {
        background-color: #c93756;
      }
    }
  }
}
</style>