<template>
  <div class="about">
    <el-page-header @back="goBack" content="关于"> </el-page-header>
    <el-empty description="开发中"></el-empty>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "About",
  setup() {
    // 实列化路由
    const router = useRouter();
    // 退回上一页
    const goBack = (): void => {
      router.back();
    };
    return {
      goBack,
    };
  },
});
</script>

<style>
</style>