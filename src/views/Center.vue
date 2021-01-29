<template>
  <div class="center">
    <div class="cars">
      <div class="header">
        <el-page-header @back="goBack" content="背景图片"></el-page-header>
      </div>
      <img-box :images="bgLists"></img-box>
      <!-- <el-carousel
        :interval="2000"
        :type="type"
        height="95vh"
        indicator-position="none"
        :initial-index="1"
        :autoplay="true"
        :loop="true"
      >
        <el-carousel-item v-for="item in bgLists" :key="item._id">
          <div class="img">
            <img :src="item.tempFileURL" alt="" class="el-img"/>
          </div>
        </el-carousel-item>
      </el-carousel> -->
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onUnmounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import ImgBox from "@/components/ImgBox/index.vue";
import { IbgLists } from "@/typings/index.ts";
import { useRouter } from "vue-router";
import { ElLoading } from "element-plus";
export default defineComponent({
  name: "Center",
  components: {
    ImgBox,
  },
  setup() {
    // center 数据
    const centerState: IbgLists = reactive({
      bgLists: [],
      type: "", //走马灯样式
    });

    return {
      ...toRefs(centerState),
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
    overflow: hidden;
    .header {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }

  .img {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(20, 19, 19, 1);
    border-radius: 5px;
  }

  .el-img {
    height: 100%;
  }
}
</style>