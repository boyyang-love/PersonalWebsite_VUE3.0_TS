<template>
    <router-view></router-view>
    <music-player :musicUrl="musicUrl" :musicPic="musicPic"></music-player>
</template>

<script lang="ts">
import Vue, { computed, defineComponent, ref } from "vue";
import MusicPlayer from "@/components/MusicPlayer/index.vue";
import { useStore } from "vuex";
export default defineComponent({
    components: {
        MusicPlayer,
    },
    setup() {
        const store = useStore();

        const musicUrl = computed(() => {
            return store.state.musicUrl;
        });

        const musicPic = computed(() => {
            return store.state.musicPic;
        });

        return {
            musicUrl,
            musicPic
        };
    },
});
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}
#app {
    width: 100%;
    height: 100vh;
    overflow: auto;
}

.el-message-box {
    max-height: 75vh;
    overflow: auto !important;
}

@media screen and (max-width: 400px) {
    .el-message-box__wrapper .el-message-box {
        width: 340px !important;
    }
}

::-webkit-scrollbar {
    width: 10px;
    height: 5px;
    background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(13, 179, 123, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(202, 12, 12, 0.3);
    background-color: #555;
}
</style>
