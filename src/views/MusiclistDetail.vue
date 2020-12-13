<template>
  <div class="musicdetail">
    <h1>this is musicdetail</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { getMusicListDetail } from "@/api/api";
export default defineComponent({
  name: "MusiclistDetail",
  setup() {
    const route = useRoute();
    console.log(route.params.id)
    getMusicListDetail({ id: 24381616 }).then((res: any) => {
      console.log(res);
    });
  },
});
</script>

<style>
</style>