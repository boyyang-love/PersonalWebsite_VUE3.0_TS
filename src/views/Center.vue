<template>
  <div class="center">
    <div class="cars">
      <div class="header">
        <el-page-header @back="goBack" content="背景图片"></el-page-header>
        <i class="el-icon-mobile-phone" @click="changeCard"></i>
      </div>
      <el-carousel
        :interval="4000"
        :type="type"
        height="95vh"
        indicator-position="none"
        initial-index="0"
      >
        <el-carousel-item v-for="item in bgLists" :key="item._id">
          <div class="img">
            <img :src="item.tempFileURL" alt="" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import { Getbackground } from "@/hooks/index.ts";
import { IbgLists } from "@/typings/index.ts";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Center",
  setup() {
    // center 数据
    const centerState: IbgLists = reactive({
      bgLists: [],
      type: "card", //走马灯样式
    });
    // 实列化
    const bg = new Getbackground();
    const router = useRouter();
    // 获取背景图片
    bg.getbg()
      .then((res: any) => {
        centerState.bgLists = res.data;
      })
      .catch((err: any) => {
        console.log(err);
      });
    // 退出
    const goBack = (): void => {
      router.back();
    };
    // 改变轮播图样式
    const changeCard = (): void => {
      centerState.type = ""
    };

    // screenWidth: document.body.clientWidth,     // 屏幕宽
    //     screeHeight: document.body.clientHeight
    return {
      ...toRefs(centerState),
      goBack,
      changeCard,
    };
  },
});
</script>

<style scoped lang="scss">
.center {
  width: 100vw;
  height: 100vh;

  .cars {
    width: 100%;
    height: 100%;
    .header {
      display: flex;
      align-items: center;
      cursor: pointer;
      i:hover {
        color: rgb(53, 173, 173);
      }
    }
  }

  .img {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(26, 23, 23, 1);
    border-radius: 5px;
  }

  img {
    height: 100%;
  }
}
</style>