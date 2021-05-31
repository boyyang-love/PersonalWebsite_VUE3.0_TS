<template>
    <div class="center">
        <div class="header">
            <el-page-header @back="goBack" content="背景图片"></el-page-header>
        </div>
        <!-- PC -->
        <div class="waterfall-flow pc" ref="pc" v-if="true">
            <div class="img-box" v-for="(item, index) in images" :key="index">
                <div class="icon">
                    <i
                        class="iconfont icon-xiazai1"
                        @click="download(item.downloadUrl, item.fileid)"
                    ></i>
                    <i
                        class="iconfont icon-qingchu"
                        @click="del(item.tempFileURL, item._id, index)"
                    ></i>
                </div>
                <img src="../assets/images/Blueocean01.png" v-lazy="item.tempFileURL" />
            </div>
        </div>
        <!-- phone -->
        <el-timeline class="phone">
            <el-timeline-item
                v-for="(item, index) in images"
                :key="index"
                color="#ff461f"
                :reverse="true"
            >
                {{ item.name }}
                <div class="download">
                    <div class="icon">
                        <i
                            class="iconfont icon-xiazai1"
                            @click="download(item.downloadUrl, item.fileid)"
                        ></i>
                        <i
                            class="iconfont icon-qingchu"
                            @click="del(item.tempFileURL, item._id, index)"
                        ></i>
                    </div>
                    <img src="../assets/images/Blueocean01.png" v-lazy="item.tempFileURL" alt />
                </div>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, h, nextTick, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { DB, IMG } from "@/db/index";
// import { waterfallFlow } from "@/hooks/index";
import { ElLoading, ElMessageBox, ElMessage } from "element-plus";
export default defineComponent({
    name: "Center",
    components: {
    },
    setup() {
        // 图片集合
        const images = ref<any[]>();
        const router = useRouter();
        const pc = ref(null)
        // 布局数据
        const state = reactive({
            layoutData: [],
            layoutConfig: {
                height: 100, // 默认高度
                dialogVisible: false // 是否可拖拽或改变大小
            }

        })
        DB.findAll("usersBg").then((res: any) => {
            images.value = res.data.reverse();
            // setTimeout(() => {
            //     new waterfallFlow(pc.value)
            // }, 200)
        });

        // 返回上一页
        const goBack = (): void => {
            router.push({
                name: "Home",
            });
        };

        // 下载图片
        const download = (downloadid: string, fileid: string): void => {
            window.open(downloadid, "_black");
        };

        // 删除图片
        const del = (url: string, _id: string, index): void => {
            ElMessageBox({
                title: "是否删除当前图片",
                message: h("img", { src: url, style: "width: 100%" }, ""),
                showCancelButton: true,
                callback: function (action, instance) {
                    if (action == "confirm") {
                        const loading = ElLoading.service({
                            fullscreen: true,
                        });
                        DB.del("usersBg", _id).then((res: any) => {
                            loading.close();
                            ElMessage({
                                message: "删除成功！",
                                type: "success",
                                showClose: true,
                            });
                            images.value = []
                            DB.findAll("usersBg").then((res: any) => {
                                images.value = res.data.reverse();
                            });
                        });
                    }
                },
            });
        };


        return {
            images,
            goBack,
            download,
            del,
            pc,
            ...toRefs(state)
        };
    },
});
</script>

<style scoped lang="scss">
.center {
    box-sizing: border-box;
    margin: 60px 20px 25px 20px;
    .header {
        width: 100%;
        position: fixed;
        top: 0;
        height: 50px;
        display: flex;
        align-items: center;
        cursor: pointer;
        background-color: rgba(11, 143, 148, 0.6);
        z-index: 6;
    }

    img {
        width: 100%;
        border-radius: 10px;
        box-shadow: 8px 4px 8px 0px rgba(11, 143, 148, 0.6);
    }

    .el-timeline-item__content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .to-top {
        position: absolute;
        bottom: 0;
        z-index: 9;
    }

    .download {
        width: 50%;
        position: relative;
        .icon {
            position: absolute;
            right: 0;
            top: 5px;
            i {
                margin: 10px;
                font-size: 20px;
                color: black;
                font-weight: bolder;
                &:hover {
                    color: rgb(204, 46, 73);
                }
            }
        }
    }
}

.waterfall-flow {
    // display: grid;
    // grid-template-columns: repeat(5, 1fr);
    // justify-content: center;
    // align-items: center;
    -moz-column-count: 6;
    /* Firefox */
    -webkit-column-count: 6;
    /* Safari 和 Chrome */
    column-count: 6;
    -moz-column-gap: 20px;
    -webkit-column-gap: 20px;
    column-gap: 20px;
}

.img-box {
    display: block;
    position: relative;

    .icon {
        position: absolute;
        top: 5px;
        right: 5px;

        i {
            font-size: 18px;
            margin-right: 10px;
        }
    }
}

.phone {
    display: none;
}

@media screen and (max-width: 700px) {
    .download {
        width: 100% !important;
    }

    .phone {
        display: block;
    }

    .pc {
        display: none;
    }
}
</style>