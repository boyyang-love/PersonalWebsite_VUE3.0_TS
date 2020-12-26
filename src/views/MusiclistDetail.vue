<template>
  <div class="musicdetail">
    <div class="top">
      {{list}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { getMusicListDetail } from "@/api/api";
import { ImusicDetail } from "@/typings";
export default defineComponent({
  name: "MusiclistDetail",
  setup() {
    const stateRes: ImusicDetail = {
       list: {}
    }
    // 获取路由元信息
    const route = useRoute();
    // 调用接口
    getMusicListDetail({ id: route.params.id }).then((res: any) => {
      return stateRes.list = res.playlist

    });

    console.log(stateRes.list)
    
    return {
      ...stateRes
    };
  },
});
</script>

<style scoped lang="scss">

img {
  width: 100%;
  height: 200px;
}
</style>