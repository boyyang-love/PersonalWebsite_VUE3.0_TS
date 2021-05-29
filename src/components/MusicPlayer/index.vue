<template>
  <div class="music-player">
    <audio :src="musicUrl" autoplay="autoplay" ref="audio"></audio>
    <div class="player">
      <i class="iconfont icon-bofang5" @click="play"></i>
      <div class="music-img">
        <img :src="musicPic" alt="" class="music-img" v-if="musicPic !='' ">
      </div>
      <i class="iconfont icon-zanting" @click="stop"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MusicPlayer",
  props: {
    musicUrl: {
      type: String,
    },
    musicPic: {
      type: String
    }
  },
  setup() {
    // 播放器标签
    const audio = ref(null);

    // 播放
    const play = () => {
      console.log(audio);
      audio.value.play();
    };

    // 暂停
    const stop = () =>{
      audio.value.pause()
    }

    return {
      audio,
      play,
      stop
    };
  },
});
</script>

<style scoped lang="scss">
.music-player {
  z-index: 999;
  position: fixed;
  left: 35px;
  bottom: 35px;
}

.player {
  box-sizing: border-box;
  height: 65px;
  background-color: #fff;
  border-radius: 35px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  .icon-bofang5 {
    font-size: 25px;
    color: #3cc9aa;
    cursor: pointer;
    margin: 0 10px;

    &:hover {
      color: #49ffd8;
    }

    transition: all 1s ease-in;
  }

  .icon-zanting {
    font-size: 30px;
    color: #3cc9aa;
    cursor: pointer;
    margin: 0 10px;

    &:hover {
      color: #49ffd8;
    }

    transition: all 1s ease-in;
  }
}

.music-img {
  height: 55px;
  width: 55px;
  border-radius: 100%;
  background-color: #2edfa3;
  background-image: url('../../assets/images/立秋.png');
  background-position: center;
  background-size: cover;
}
</style>