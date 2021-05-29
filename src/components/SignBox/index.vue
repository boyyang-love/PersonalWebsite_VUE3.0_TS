<template>
  <div class="signbox">
    <div class="status">
      <div class="title">{{ type }}</div>
      <i class="iconfont icon-qiehuangongsi" @click="change"></i>
    </div>
    <div class="account input-box">
      <input type="text" maxlength="18" v-model="account" />
      <label for="" class="label">Account</label>
      <i class="iconfont icon-qingchu" @click="clear(1)"></i>
    </div>
    <div class="password input-box">
      <input type="password" maxlength="20" v-model="password" />
      <label for="" class="label">PassWord</label>
      <i class="iconfont icon-qingchu" @click="clear(2)"></i>
    </div>
    <div class="repassword input-box" v-show="isRepasswordShow">
      <input type="password" maxlength="20" v-model="repassword" />
      <label for="" class="label">Repeat PassWord</label>
      <i class="iconfont icon-qingchu" @click="clear(3)"></i>
    </div>
    <div class="btns">
      <div class="btn" @click="signOut">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Sign out
      </div>
      <div class="btn" @click="signIn">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {{ type }}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, h } from "vue";
import { ElMessage } from "element-plus";
interface IaccountInfo {
  account: string;
  password: string;
  repassword: string;
  title: string;
  type: string;
  isAlertShow: boolean;
  isRepasswordShow: boolean;
}
export default defineComponent({
  name: "SignBox",
  setup(porps, { emit }) {
    // 输入
    const accountInfo = reactive<IaccountInfo>({
      account: "",
      password: "",
      repassword: "",
      title: "",
      type: "Sign in",
      isAlertShow: false,
      isRepasswordShow: false,
    });
    // 登录
    const signIn = (): void => {
      if (accountInfo.isRepasswordShow == true) {
        //注册状态
        if (
          accountInfo.account.trim() != "" &&
          accountInfo.password.trim() != "" &&
          accountInfo.repassword.trim() != ""
        ) {
          if (accountInfo.password != accountInfo.repassword) {
            ElMessage({
              message: h("p", null, [
                h("span", null, "密码不一致"),
                h("i", { style: "color: teal" }, "提示"),
              ]),
            });
          } else {
            emit("register", accountInfo.account, accountInfo.password);
          }
        } else {
          ElMessage({
            message: h("p", null, [
              h("span", null, "输入不能为空"),
              h("i", { style: "color: teal" }, "提示"),
            ]),
          });
        }
      } else {
        // 登录状态
        if (
          accountInfo.account.trim() != "" &&
          accountInfo.password.trim() != ""
        ) {
          emit("signin", accountInfo.account, accountInfo.password);
        } else {
          ElMessage({
            message: h("p", null, [
              h("span", null, "输入不能为空"),
              h("i", { style: "color: teal" }, "提示"),
            ]),
          });
        }
      }
    };
    // 退出
    const signOut = (): void => {
      emit("signout");
    };
    // 清除
    const clear = (index: number): void => {
      switch (index) {
        case 1:
          accountInfo.account = "";
          break;
        case 2:
          accountInfo.password = "";
          break;
        case 3:
          accountInfo.repassword = "";
          break;
      }
    };
    // 改变 == 登录 == 注册
    const change = (): void => {
      if (accountInfo.isRepasswordShow) {
        accountInfo.type = "Sign in";
      } else {
        accountInfo.type = "register";
      }
      accountInfo.isRepasswordShow = !accountInfo.isRepasswordShow;
    };
    return {
      signIn,
      signOut,
      clear,
      change,
      ...toRefs(accountInfo),
    };
  },
});
</script>

<style lang="scss" scoped>
.signbox {
  box-sizing: border-box;
  width: 450px;
  height: 350px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  // grid
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(5, 1fr);
  justify-content: center;
  align-items: center;
  // box-shadow
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 1);
  @media screen and (max-width: 400px){
    width: 345px;
    height: 360px;
  }

  .status {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: whitesmoke;
    font-weight: bolder;
    position: relative;

    .iconfont {
      position: absolute;
      right: 20px;
      font-size: 20px;
      color: rgb(32, 148, 41);
      cursor: pointer;
      animation: circle 3s linear infinite;
      &:hover {
        color: white;
      }
    }
  }

  .input-box {
    box-sizing: border-box;
    width: calc(100% - 40px);
    height: 100%;
    margin: 0 20px;
    border-bottom: 1px solid white;
    position: relative;

    .label {
      color: #00ffd5;
      position: absolute;
      font-size: 13px;
      font-family: Arial, Helvetica, sans-serif;
      bottom: 0;
      transition: all 1s linear;
    }

    .iconfont {
      position: absolute;
      color: rgb(32, 148, 41);
      bottom: 0;
      right: 0;
      font-size: 23px;
      opacity: 1;
      transition: all 0.5s linear;
      cursor: pointer;

      &:hover {
        color: rgb(255, 0, 0);
      }
    }

    input {
      box-sizing: border-box;
      width: 100%;
      height: 40%;
      outline: none;
      border: none;
      background: transparent;
      position: absolute;
      bottom: 0;
      padding-left: 160px;
      color: white;

      &:focus + .label {
        bottom: 20px;
        color: white;
      }

      @media screen and (max-width: 400px){
        padding-left: 10px;
      }
    }
  }

  .btns {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
      width: 100px;
      height: 32px;
      background-color: rgba(209, 100, 100, 0.5);
      color: rgb(3, 3, 3);
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 25px;
      box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      cursor: pointer;
      position: relative;
      &:hover {
        background: radial-gradient(
          circle,
          rgb(0, 255, 179),
          rgb(255, 255, 255)
        );
      }

      span:nth-child(1) {
        width: 100%;
        height: 1px;
        position: absolute;
        background: linear-gradient(
          to right,
          transparent,
          rgb(224, 25, 25),
          rgb(255, 255, 255)
        );
        top: 0;
        animation: line1 1s linear infinite;
      }

      span:nth-child(2) {
        height: 100%;
        width: 1px;
        background: linear-gradient(
          to bottom,
          transparent,
          rgb(224, 25, 25),
          rgb(255, 255, 255)
        );
        position: absolute;
        right: 0;
        animation: line2 1s linear infinite;
      }

      span:nth-child(3) {
        height: 1px;
        width: 100%;
        background: linear-gradient(
          to left,
          transparent,
          rgb(224, 25, 25),
          rgb(255, 255, 255)
        );
        position: absolute;
        bottom: 0;
        animation: line3 1s linear infinite;
      }

      span:nth-child(4) {
        height: 100%;
        width: 1px;
        background: linear-gradient(
          to top,
          transparent,
          rgb(224, 25, 25),
          rgb(255, 255, 255)
        );
        position: absolute;
        left: 0;
        animation: line4 1s linear infinite;
      }
    }
  }
}

@keyframes line1 {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

@keyframes line2 {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(100%);
  }
}

@keyframes line3 {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

@keyframes line4 {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(-100%);
  }
}

@keyframes circle {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}


@media screen and (max-width: 700px) {
     .signbox .input-box .label {
       font-size: 10px;
     }
}
</style>