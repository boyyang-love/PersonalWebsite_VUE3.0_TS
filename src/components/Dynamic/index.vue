<template>
  <div class="dynamic animated slideInLeft">
    <img-box
      v-for="item in images"
      :key="item._id"
      :img="item.tempFileURL"
      :downLoadUrl="item.fileID"
      @download="download"
      ></img-box>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
import ImgBox from "./components/ImgBox.vue";
import { Getbackground } from "@/hooks/index.ts";
import { Ibackground, IDynamicState } from "@/typings";
interface Istate {
  images: Array<Ibackground>;
}
export default defineComponent({
  name: "Dynamic",
  components: {
    ImgBox,
  },
  setup() {
    const state: Istate = reactive({
      images: [],
    });
    const getbackground = new Getbackground();

    getbackground.getbg().then((res: any) => {
      state.images = res.data;
    });

    const download = (url: string): void => {
      console.log(url)
      getbackground.download(url).then((res) => {
        console.log(res);
      }).catch(err =>{
        console.log(err)
      });
    };

    return {
      ...toRefs(state),
      download,
    };
  },
});
</script>

<style scoped lang='scss'>
.dynamic {
  width: 85vw;
  height: 90vh;
  background-color: rgba(0, 255, 179, 0.5);
  box-shadow: 5px 6px 3px 1px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>