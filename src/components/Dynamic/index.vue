<template>
  <div class="dynamic animated slideInLeft">
    <el-timeline>
      <el-timeline-item
        placement="top"
        v-for="(item, index) in images"
        :key="index"
        color="red"
        timestamp="背景图片集"
      >
        <img :src="item.tempFileURL" alt="" />
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import { Ibackground, IDynamicState } from "@/typings";
interface Istate {
  images: Array<Ibackground>;
}
export default defineComponent({
  name: "Dynamic",
  components: {},
  setup() {
    const state: Istate = reactive({
      images: [],
    });
    const getbackground = new Getbackground();

    getbackground.getbg().then((res: any) => {
      state.images = res.data;
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang='scss'>
.dynamic {
  width: 85vw;
  height: 90vh;
  padding: 25px;
  background-color: rgba(0, 255, 179, 0.5);
  box-shadow: 5px 6px 3px 1px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  overflow-y: auto;

  img {
    width: 100%;
  }

  @media screen and (max-width: 400px) {
    img {
      width: 100%;
    }
  }
}
</style>