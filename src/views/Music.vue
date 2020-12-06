<template>
  <div class="music">
    <keep-alive>
      <music-body
        :musiclist="musicList"
        @handledetail="handledetail"
      ></music-body>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import MusicBody from "@/components/MusicBody/index.vue";
import { IMusicState } from "@/typings/index.ts";
import { getMusicList } from "@/api/api.ts";
import { Router, useRouter } from "vue-router";
export default defineComponent({
  name: "Music",
  components: {
    MusicBody,
  },
  setup() {
    const musicState: IMusicState = reactive({
      musicList: [],
    });

    const router: Router = useRouter();
    // 歌单详情页
    const handledetail = (id: number): void => {
      console.log(id);
      router.push({
        name: "MusiclistDetail",
        params: {
          id: id,
        },
      });
    };

    onMounted(() => {
      // 获取音乐列表
      getMusicList().then((res: any) => {
        musicState.musicList = res.playlists;
      });
    });

    return {
      ...toRefs(musicState),
      handledetail,
    };
  },
});
</script>

<style>
</style>