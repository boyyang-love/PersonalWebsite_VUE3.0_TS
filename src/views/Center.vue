<template>
  <div class="center">
    <div class="header">
      <el-page-header @back="goBack" content="背景图片"></el-page-header>
    </div>
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in images"
        :key="index"
        color="blue"
      >
        {{ item.name }}
        <div class="download">
          <i
            class="iconfont icon-shuju-zhichi-01"
            @click="download(item.downloadUrl, item.fileid)"
          ></i>
          <img
            src="../assets/images/Blueocean01.png"
            v-lazy="item.tempFileURL"
            alt=""
          />
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { DB, IMG } from "@/db/index";
import { ElLoading } from "element-plus";
export default defineComponent({
  name: "Center",
  components: {},
  setup() {
    // 图片集合
    const images = ref<any[]>();
    const router = useRouter();

    DB.findAll("usersBg").then((res: any) => {
      console.log(res);
      images.value = res.data;
    });

    // 返回上一页
    const goBack = (): void => {
      router.push({
        name: "Home",
      });
    };

    // 下载图片
    const download = (downloadid: string, fileid: string): void => {
      window.open(downloadid, "_black");
      // const flag = navigator.userAgent.match(
      //   /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      // );
      // if (flag) {
      //   IMG.picDownload(fileid).then((res: any) => {
      //     console.log(res);
      //   });
      // }else{
      //   window.open(downloadid, '_black')
      // }
    };

    return {
      images,
      goBack,
      download,
    };
  },
});
</script>

<style scoped lang="scss">
.center {
  box-sizing: border-box;
  margin: 60px 20px 25px 20px;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    height: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: rgba(11, 143, 148, 0.6);
    z-index: 6;
  }

  // .imgbox {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }

  img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 8px 4px 8px 0px rgba(11, 143, 148, 0.6);
  }

  .el-timeline-item__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .to-top {
    position: absolute;
    bottom: 0;
    z-index: 9;
  }

  .download {
    i {
      font-size: 25px;
      color: black;
      position: absolute;
      bottom: 5%;
      right: 5%;
      &:hover {
        color: rgb(204, 46, 73);
      }
    }
  }
}
</style>