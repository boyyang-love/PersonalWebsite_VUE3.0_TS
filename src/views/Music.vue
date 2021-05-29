<template>
  <!-- 头部 -->
  <div class="header">
    <el-page-header @back="goBack" content="Music"> </el-page-header>
    <el-switch
      class="switch"
      v-model="sValue"
      active-color="#13ce66"
      inactive-color="#ff4949"
      @change="onchange"
    >
    </el-switch>
  </div>
  <!-- pc端轮播 -->
  <div class="banner" v-if="sValue">
    <el-carousel :interval="4000" trigger="hover" type="card">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <!-- 手机端轮播 -->
  <div class="banner-phone" v-if="sValue">
    <el-carousel :interval="4000" trigger="hover" indicator-position="none">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <!-- card -->
  <div class="card">
    <el-card
      :body-style="{ padding: '0px' }"
      v-for="(item, index) in lists"
      :key="index"
    >
      <img
        src="../assets/images/Blueocean01.png"
        v-lazy="item.coverImgUrl"
        class="image"
      />
      <div style="padding: 14px">
        <div class="name">{{ item.name }}</div>
        <div class="bottom clearfix">
          <el-button
            type="warning"
            icon="el-icon-star-off"
            circle
            @click="todetail(item.id)"
          ></el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getBanner, getMusicList } from "@/api/api";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Music",
  components: {},
  setup() {
    // switch
    const sValue = ref<boolean>(true);

    // 轮播图
    const banner = ref<any[]>();

    // 音乐列表
    const lists = ref<any[]>();

    // 路由
    const router = useRouter();

    onMounted(() => {
      // 获取首页banner图片
      getBanner({ type: "pc" })
        .then((res: any) => {
          banner.value = res.banners;
        })
        .catch((err: any) => {
          console.log(err);
        });

      // 获取音乐歌单
      getMusicList().then((res: any) => {
        lists.value = res.playlists;
      });
    });

    // 获取歌单详情
    const todetail = (id: number | string) => {
      router.push({
        name: "MusiclistDetail",
        query: {
          id: id,
        },
      });
    };

    // switch change
    const onchange = (e: boolean): void => {
      sValue.value = e;
    };

    // back
    const goBack = (): void => {
      router.back();
    };

    return {
      sValue,
      banner,
      lists,
      onchange,
      todetail,
      goBack,
    };
  },
});
</script>

<style scoped lang="scss">
el-carousel {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header {
  width: 100%;
  height: 45px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  background-color: rgba(0, 133, 126, 0.4);

  .switch {
    margin: 0 25px;
  }
}

.banner {
  margin-top: 45px;
  img {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 400px) {
    display: none;
  }
}

.banner-phone {
  margin-top: 45px;
  background-color: rgba(121, 64, 64, 0.6);
  img {
    width: 100%;
    margin: 80px 0 0 0;
  }

  @media screen and (min-width: 400px) {
    display: none;
  }
}

.card {
  box-sizing: border-box;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  align-items: center;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  margin-top: 45px;
  .name {
    width: 100%;
    height: 24px;
    overflow: hidden;
  }
  @media screen and (max-width: 400px) {
    padding: 0 5px;
    grid-template-columns: repeat(1, 1fr);
  }
  img {
    width: 100%;
    height: 100%;
  }
}


@media screen and (max-width: 700px) {
  .banner-phone {
    display: none;
  }
}
</style>