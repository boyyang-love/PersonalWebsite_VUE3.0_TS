<template>
    <div class="blog-wrapper">
        <div class="page-header">
            <el-page-header @back="goBack" content="个人动态"></el-page-header>
        </div>
        <div class="blog-content-wrapper">
            <div class="blog-content" v-for="(item, i) in centerMes" :key="i">
                <div class="header">
                    <div class="header-img">
                        <img src="../../src/assets/images/Blueocean01.png" v-lazy="item.avatar" alt />
                    </div>
                    <div class="header-right">
                        <span class="name">{{item.nickName}}</span>
                        <!-- <span class="emmail">{{item.email}}/span> -->
                        <span class="position">{{ item.country + item.province + item.city}}</span>
                        <span class="time">{{item.time}}</span>
                    </div>
                </div>
                <div class="blog-mes">
                    <div class="blog-img-wrapper">
                        <div class="blog-img" v-for="(img, i) in item.imgs" :key="i">
                            <img src="../../src/assets/images/Blueocean01.png" v-lazy="img" alt />
                        </div>
                    </div>
                    <div class="blog-text">
                        <span>{{item.text}}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 上传按钮 -->
        <div class="add">
            <i class="iconfont icon-jia1" @click="add"></i>
        </div>
        <!-- 上传弹框 -->
        <div :class="['alert-box-wrapper', 'animated', animate]" v-if="isShow">
            <div class="alert-box">
                <div class="img-up">
                    <el-upload
                        :limit="5"
                        action="#"
                        list-type="picture-card"
                        :auto-upload="false"
                        :on-change="onChange"
                        :file-list="filesList"
                    >
                        <template #default>
                            <i class="el-icon-plus"></i>
                        </template>
                        <template #file="{file}">
                            <div>
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                                <span class="el-upload-list__item-actions">
                                    <!-- <span
                                        class="el-upload-list__item-preview"
                                        @click="handlePictureCardPreview(file)"
                                    >
                                        <i class="el-icon-zoom-in"></i>
                                    </span>-->
                                    <!-- <span
                                        class="el-upload-list__item-delete"
                                        @click="handleDownload(file)"
                                    >
                                        <i class="el-icon-download"></i>
                                    </span>-->
                                    <span
                                        class="el-upload-list__item-delete"
                                        @click="handleRemove(file, filesList)"
                                    >
                                        <i class="el-icon-delete"></i>
                                    </span>
                                </span>
                            </div>
                        </template>
                    </el-upload>
                </div>
                <div class="text-up">
                    <textarea class="text-area" v-model="text"></textarea>
                </div>
                <div class="upload">
                    <i class="iconfont icon-dongtai" @click="uploadCenter"></i>
                </div>
            </div>
        </div>

        <!-- loading -->
        <loading :isLoading="isLoading"></loading>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue"
import { IMG, DB, AUTH } from "@/db/index"
import { ElMessage, ElMessageBox } from "element-plus";
import loading from "@/components/LoadingBox/index.vue";
import router from "@/router"
export default defineComponent({
    name: "Blog",
    components: {
        loading
    },
    setup() {
        // 路由
        const goBack = (): void => {
            router.back()
        }

        // ------------state---------------------
        const isShow = ref<boolean>(false)  //是否显示弹框
        const isLoading = ref<boolean>(false) //是否加载loading
        const animate = ref<string>('bounceInLeft') //随机动画
        const imgList = ref<string[]>([])  //图片列表
        const text = ref<string>()  //文字
        const state = reactive({
            centerMes: [],  //中心动态
            filesList: []
        })

        // ------------state---------------------

        const init = () => {
            // 获取动态
            DB.findAll('usersCenter').then((res: any) => {
                state.centerMes = res.data.reverse()
            })
        }

        init()


        // 添加动态
        const add = (): void => {
            const amis = ['bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp']
            animate.value = amis[Math.floor((Math.random() * amis.length))]
            isShow.value = !isShow.value
        }

        // 圖片上傳
        const onChange = (e): void => {
            state.filesList.push(e)
        }

        // 上傳中心
        const uploadCenter = async () => {
            isLoading.value = true
            // 上传图片获取图片id
            const upLen = state.filesList.length
            for (let j = 0; j < upLen; j++) {
                const file = state.filesList[j].raw
                const imgFile: any = await IMG.picUpload(file, 'userBlogImg', 'blog')
                imgList.value.push(imgFile.id)
            }


            // 通过上边id 获取图片链接
            const len = imgList.value.length
            const lists = []
            for (let i = 0; i < len; i++) {
                const res: any = await DB.findOne('userBlogImg', imgList.value[i])
                lists.push(res.data[0].tempFileURL)
            }

            // 获取用户信息 写入数据库
            AUTH.userInfo().then((res) => {
                const info: any = res
                DB.addNew('usersCenter', {
                    text: text.value,
                    avatar: info.avatarUrl,
                    email: info.email,
                    gender: info.gender,
                    city: info.location.city,
                    country: info.location.country,
                    province: info.location.province,
                    nickName: info.nickName,
                    imgs: lists,
                    time: new Date()
                }).then((res) => {
                    ElMessage({
                        type: "success",
                        message: "上传成功"
                    })

                    init()
                    isShow.value = false
                    isLoading.value = false
                }).catch((err) => {
                    ElMessage({
                        type: 'error',
                        message: err
                    })

                    isLoading.value = false
                })
            })


        }

        // 删除图片
        const handleRemove = (file, filesList) => {
            state.filesList = filesList.filter((item) => {
                return file.uid != item.uid
            })
        }



        return {
            goBack,
            isShow,
            animate,
            text,
            add,
            onChange,
            uploadCenter,
            isLoading,
            handleRemove,
            ...toRefs(state)
        }
    }
})
</script>

<style lang="scss" scoped>
@mixin center($row: center, $column: center, $pos: row) {
    display: flex;
    justify-content: $row;
    align-items: $column;
    flex-direction: $pos;
}
.blog-wrapper {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: rgba(0, 188, 18, 0.3);
    // padding: 0 10px;
    position: relative;
}

.page-header {
    width: 100%;
    height: 50px;
    background-color: rgba(233, 231, 239, 0.5);
    padding-left: 10px;
    @include center(flex-start);
}

.add {
    width: 100%;
    position: absolute;
    bottom: 25px;
    @include center();
    z-index: 10;

    i {
        font-size: 35px;
        cursor: pointer;

        &:hover {
            color: red;
        }
    }
}

.alert-box-wrapper {
    width: 100%;
    height: 100vh;
    position: fixed;
    bottom: 50px;
    @include center();
    // background-color: rgba(78, 67, 67, 0.5);
}

.alert-box {
    width: 42%;
    min-height: 60%;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.187);
    display: grid;
    grid-template-rows: repeat(1fr, 1fr);
    padding-bottom: 30px;
    position: relative;
}

.text-up {
    padding: 10px;
}

.img-up {
    padding: 10px;
}

.img-up-box {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
}

.text-area {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px;
}

.upload {
    width: 100%;
    position: absolute;
    bottom: 5px;
    @include center();

    i {
        font-size: 25px;
        cursor: pointer;
        &:hover {
            color: rgba(0, 255, 0, 0.787);
        }
    }
}

.header-img {
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;
    margin-left: 20px;
    margin-top: 20px;
    border: 1px solid #8f2449;
    box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.187);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
        transform: scale(3);
    }
}

.header {
    display: flex;
    margin-bottom: 20px;
    .header-right {
        padding-left: 30px;
        display: flex;
        justify-content: center;
        flex-direction: column;

        span {
            margin-bottom: 5px;
        }
    }
}

.blog-content-wrapper {
    width: 100%;
    height: 85%;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
    padding-top: 20px;
}

.blog-content {
    min-width: 65%;
    margin-bottom: 20px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 2px 3px 1px 2px rgba(0, 0, 0, 0.187);
    border-radius: 10px;
}

.blog-mes {
    display: flex;
    // align-items: center;
    flex-direction: column;
}

.blog-img-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 20px;
    justify-items: center;
}

.blog-img {
    width: 320px;

    img {
        width: 100%;
    }
}

.blog-text {
    margin-top: 20px;
    margin-left: 40px;
    font-size: 17px;
    margin-bottom: 20px;
    color: #3d3b4f;
}

.name {
    font-size: 16px;
    color: #ff461f;
}

.position {
    font-size: 14px;
    color: salmon;
}

.time {
    font-size: 12px;
    color: #a1afc9;
}

.el-upload-list,
.el-upload-list--picture-card {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
}

@media screen and (max-width: 400px) {
    .blog-content {
        width: 100%;
    }

    .header-img {
        width: 100px;
        height: 100px;
    }

    .header-right {
        padding-left: 10px !important;
    }

    .name {
        font-size: 15px !important;
    }

    .position {
        font-size: 13px !important;
    }

    .time {
        font-size: 10px !important;
    }

    .blog-img-wrapper {
        grid-template-columns: 1fr;
    }

    .blog-text {
        span {
            font-size: 15px;
        }
    }

    .alert-box-wrapper {
        bottom: 15px;
    }

    .alert-box {
        height: 80%;
        width: 100%;
    }
}
</style>