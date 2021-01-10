<template>
  <div class="home">
    <div class="bg">
      <img :src="bg" alt="" />
    </div>
    <div class="content">
      <div class="title">
        <h1>BOYYANG.LOVE</h1>
        <label for="input">
          <input
            type="file"
            name=""
            id="input"
            accept="image/*"
            ref="img"
            @change="imgUp"
          />
          <i class="iconfont icon-dongtai"></i>
        </label>
      </div>
      <div class="c-box">
        <div class="motto">
          <i class="iconfont icon-xingxing"></i>
          <span>boyyang & love & fei</span>
          <i class="iconfont icon-xingxing"></i>
        </div>
        <div class="contact">
          <i class="iconfont icon-icon-prev" @click="prev"></i>
          <el-tooltip content="1761617270" placement="bottom" effect="light">
            <i class="iconfont icon-qq1"></i>
          </el-tooltip>
          <el-tooltip content="boyyanglove" placement="bottom" effect="light">
            <i class="iconfont icon-weixin"></i>
          </el-tooltip>
          <el-tooltip
            content="https://www.cnblogs.com/boyyangD/"
            placement="bottom"
            effect="light"
          >
            <a
              href="http://www.cnblogs.com/boyyangD/"
              target="_blank"
              rel="noopener noreferrer"
              ><i class="iconfont icon-boke1"></i
            ></a>
          </el-tooltip>

          <el-tooltip
            content="https://github.com/boyyang-love"
            placement="bottom"
            effect="light"
          >
            <a
              href="https://github.com/boyyang-love"
              target="_blank"
              rel="noopener noreferrer"
              ><i class="iconfont icon-GitHub"></i
            ></a>
          </el-tooltip>
          <i
            class="iconfont icon-zuoyoujiantou-copy-copy-copy1"
            @click="next"
          ></i>
        </div>
        <span class="line1"></span>
        <span class="line2"></span>
        <span class="line3"></span>
        <span class="line4"></span>
      </div>
    </div>
    <menu-bar :tabs="tabs"></menu-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import MenuBar from "@/components/MenuBar/index.vue";
import { IhomeState, Itabs } from "@/typings";
import { FileUp, Getbackground } from "@/hooks/index.ts";
export default defineComponent({
  name: "Home",
  components: {
    MenuBar,
  },
  setup() {
    const tabs: Itabs[] = [
      {
        tabIndex: 1,
        tabName: "Home",
        icon: "icon-shouye2",
      },
      {
        tabIndex: 2,
        tabName: "Music",
        icon: "icon-yinle6",
      },
      {
        tabIndex: 3,
        tabName: "Center",
        icon: "icon-A",
      },
      {
        tabIndex: 4,
        tabName: "Contact",
        icon: "icon-lianxi",
      },
      {
        tabIndex: 5,
        tabName: "About",
        icon: "icon-iconset0142",
      },
    ];

    const state = reactive<IhomeState>({
      bg: require("../assets/images/鬼灭之刃蝴蝶忍4k高清电脑壁纸3840x2160_彼岸图网.jpg"),
      id: "1",
      fileID: "1",
    });

    const bgs = reactive({
      bglists: [],
      index: JSON.parse(localStorage.getItem("bgIndex")) || 0,
    });
   
    // 实列化文件上传函数
    const file = new FileUp(state, '');
    // 获取背景图片
    const getbg = new Getbackground();
    getbg.getbg().then((res: any) => {
      if (res.data.length != 0) {
        bgs.bglists = res.data;
        state.bg = res.data[bgs.index].tempFileURL;
      } else {
        return;
      }
    });
    const img = ref<any>(null);

    const imgUp = (): void => {
      file.fileUpdate(img.value.files[0]);
    };

    // 上一背景
    const prev = (): void => {
      if (bgs.bglists.length != 0) {
        if (bgs.index == 1) {
          bgs.index = bgs.bglists.length;
          state.bg = bgs.bglists[0].tempFileURL;
          localStorage.setItem("bgIndex", JSON.stringify(bgs.index));
        } else {
          bgs.index--;
          state.bg = bgs.bglists[bgs.index].tempFileURL;
          localStorage.setItem("bgIndex", JSON.stringify(bgs.index));
        }
      } else {
        return;
      }
    };

    // 下一背景
    const next = (): void => {
      if (bgs.bglists.length != 0) {
        if (bgs.index == bgs.bglists.length - 1) {
          bgs.index = 0;
          state.bg = bgs.bglists[bgs.index].tempFileURL;
          localStorage.setItem("bgIndex", JSON.stringify(bgs.index));
        } else {
          bgs.index++;
          state.bg = bgs.bglists[bgs.index].tempFileURL;
          localStorage.setItem("bgIndex", JSON.stringify(bgs.index));
        }
      } else {
        return;
      }
    };

    return {
      img,
      tabs,
      imgUp,
      prev,
      next,
      ...toRefs(bgs),
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang='scss'>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 1;
    }
  }
  .imgUp {
    width: 15%;
    height: 50px;
    background-color: #fff;
    position: absolute;
    bottom: 90px;
    border-radius: 10px;
    box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.3);
  }
  .content {
    z-index: 9;

    .title {
      color: whitesmoke;
      position: relative;
      .iconfont {
        position: absolute;
        right: -51px;
        top: -25px;
        font-size: 45px;
        color: red;
        cursor: pointer;
      }

      input {
        display: none;
      }
    }

    .c-box {
      width: 100%;
      height: 100px;
      background: rgba(0, 0, 0, 0.6);
      margin-top: 25px;
      position: relative;
      border-radius: 4px;
      // grid
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, 1fr);
      justify-content: center;
      align-items: center;

      .contact {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        i {
          color: #3eede7;
          font-size: 20px;
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
      }

      .motto {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        i {
          color: rgb(221, 24, 24);
          margin: 0 5px;
        }
      }

      &::before {
        content: "";
        width: 0;
        height: 0;
        display: block;
        border-style: solid;
        border-width: 15px;
        border-color: transparent transparent rgba(0, 0, 0, 0.6) transparent;
        position: absolute;
        top: -30px;
        left: 20px;
      }

      .line1 {
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

      .line2 {
        width: 1px;
        height: 100%;
        position: absolute;
        background: linear-gradient(
          to bottom,
          transparent,
          rgb(255, 255, 255),
          rgb(224, 25, 25)
        );
        right: 0;
        animation: line2 1s linear infinite;
      }

      .line3 {
        width: 100%;
        height: 1px;
        position: absolute;
        background: linear-gradient(
          to left,
          transparent,
          rgb(224, 25, 25),
          rgb(255, 255, 255)
        );
        bottom: 0;
        animation: line3 1s linear infinite;
      }

      .line4 {
        width: 1px;
        height: 100%;
        position: absolute;
        background: linear-gradient(
          to top,
          transparent,
          rgb(255, 255, 255),
          rgb(224, 25, 25)
        );
        left: 0;
        animation: line4 1s linear infinite;
      }
    }
  }
}

a{
  text-decoration: none;
}

@keyframes FishMove {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(1000px);
  }

  100% {
    transform: translateX(0);
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
</style>