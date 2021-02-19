<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <!-- <p @click="goBacks">hhhhhh</p> -->
      <el-page-header @back="goBacks" content="Music-Detail"> </el-page-header>
    </div>
    <!-- 创建者图片背景 -->
    <div class="bg">
      <div class="user">
        <img :src="coverImgUrl" alt="" />
      </div>
      <div class="des">
        <div>{{ list.description }}</div>
      </div>
    </div>
    <!-- card -->
    <div class="card">
      <el-card
        :body-style="{ padding: '0px' }"
        v-for="(item, index) in musicLists"
        :key="index"
      >
        <img
          src="../assets/images/Blueocean01.png"
          v-lazy="item.al.picUrl"
          class="image"
        />
        <div style="padding: 14px">
          <div class="name">{{ item.name }}</div>
          <div class="bottom clearfix">
            <el-button
              type="warning"
              icon="el-icon-star-off"
              circle
              @click="musicplay(item.id)"
            ></el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMusicListDetail, getMusicUrl } from "@/api/api";
import { useStore } from "vuex";
export default defineComponent({
  name: "MusiclistDetail",
  setup() {
    // 获取路由元信息
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      list: "",
      coverImgUrl: "",
    });

    // 歌单详情
    const musicLists = ref();

    // 创建者详情
    const creator = ref();

    // 调用接口
    getMusicListDetail({ id: route.query.id }).then((res: any) => {
      state.list = res.playlist;
      state.coverImgUrl = res.playlist.coverImgUrl;
      musicLists.value = res.playlist.tracks;
      creator.value = res.playlist.creator;
    });

    // 退出
    const goBacks = (): void => {
      router.back();
    };

    // 获取音乐url
    const musicplay = (id): void => {
      getMusicUrl({ id: id }).then((res) => {
        const payload = res.data[0].url
        store.commit('changeUrl', payload)
      });
    };

    return {
      ...toRefs(state),
      musicLists,
      creator,
      goBacks,
      musicplay,
    };
  },
});
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 45px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  background-color: rgba(0, 133, 126, 0.4);
}

.bg {
  box-sizing: border-box;
  width: 100%;
  max-height: 300px;
  margin-top: 45px;
  display: flex;
  overflow: hidden;
  background-color: rgba(85, 80, 80, 0.5);
  padding: 5px;
  .user {
    width: 160px;
    height: 160px;
    padding: 5px;
    img {
      width: 145px;
      height: 145px;
    }
  }
  .des {
    text-overflow: ellipsis;
    padding: 10px;
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
</style>