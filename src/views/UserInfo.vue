<template>
    <div class="user-info">
        <div class="user-info-box animated fadeInLeftBig">
            <div class="box-top">
                <i class="iconfont icon-qingchu animated fadeInUpBig" @click="exit"></i>
            </div>
            <div class="header">
                <label for="input">
                    <input
                        type="file"
                        class="header-img"
                        id="input"
                        accept="image/*"
                        ref="img"
                        @change="choiceHeader"
                    />
                    <div class="user-info-header">
                        <i class="iconfont icon-yinle2" v-show="userinfo.avatarUrl == '' "></i>
                        <img
                            class="avatar"
                            :src="userinfo.avatarUrl"
                            v-show="userinfo.avatarUrl != '' "
                        />
                    </div>
                </label>

                <div class="user-info-name">
                    <input type="text" v-model="userinfo.nickName" placeholder="昵称" />
                    <input type="text" v-model="userinfo.gender" placeholder="性别" />
                </div>
                <div class="user-info-pos">
                    <input type="text" v-model="location.city" placeholder="城市" />
                    <input type="text" v-model="location.province" placeholder="省份" />
                    <input type="text" v-model="location.country" placeholder="国家" />
                </div>
                <div class="save">
                    <el-button type="success" round @click="save" :loading="isLoading">保存</el-button>
                    <el-button type="success" round @click="toCenter" :loading="isLoading">个人中心</el-button>
                    <el-button type="success" round @click="toBlog">个人博客</el-button>
                </div>
            </div>
        </div>
        <img :src="userinfo.avatarUrl" alt class="bg" v-if="userinfo.avatarUrl !=''  " />
    </div>
    <loading :isLoading="isShowLoading"></loading>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import loading from "@/components/LoadingBox/index.vue";
import { AUTH, DB, IMG } from "@/db/db";
import router from "@/router";
export default defineComponent({
    name: 'UserInfo',
    components: {
        loading
    },
    setup() {

        const state = reactive<any>({
            isLoading: false,
            isShowLoading: false,
            location: '',
            userinfo: {}
        })

        const img = ref(null)

        // 获取用户信息
        AUTH.userInfo().then((res: any) => {
            state.userinfo = res
            state.location = res.location
        })

        // 退出
        const exit = (): void => {
            router.push({
                name: 'Home'
            })
        }

        // 保存
        const save = (): void => {
            state.isLoading = true
            const params = {
                nickName: state.userinfo.nickName, // 昵称，不超过 45 个字符
                gender: state.userinfo.gender.trim() == "男"
                    || state.userinfo.gender.trim() == "MALE" ? "MALE"
                    : state.userinfo.gender.trim() == "女"
                        || state.userinfo.gender.trim() == "FEMALE" ? "FEMALE" : "UNKNOWN", // 性别，取值仅限于 MALE、FEMALE、UNKNOWN
                avatarUrl: state.userinfo.avatarUrl, // 头像地址，不超过 255 个字符
                country: state.location.country, // 不超过 45 个字符
                province: state.location.province, // 不超过 45 个字符
                city: state.location.city // 不超过 45 个字符
            }
            AUTH.updateUserinfo(params).then(() => {
                ElMessage({
                    type: 'success',
                    message: '修改成功'
                })
                state.isLoading = false

                ElMessageBox({
                    title: '信息更改成功,是否前往个人中心？',
                    showCancelButton: true,
                    beforeClose(action, instance, done) {
                        if (action == 'confirm') {
                            router.push({
                                name: 'Center'
                            })
                            done()
                        } else {
                            done()
                        }
                    }
                })
            })
        }

        // 选择头像
        const choiceHeader = (): void => {
            const file = img.value.files[0]
            state.isShowLoading = true
            IMG.picUpload(file, 'usersAvatar', 'Avatar').then((res: any) => {
                const id = res.id
                DB.findOne('usersAvatar', id).then((res: any) => {
                    const url = res.data[0].tempFileURL
                    state.userinfo.avatarUrl = url
                    state.isShowLoading = false
                })
            })
        }

        // 个人中心
        const toCenter = (): void => {
            router.push({
                name: 'Center'
            })
        }

        // 个人博客
        const toBlog = (): void =>{
            router.push({
                name: 'Blog'
            })
        }

        return {
            exit,
            save,
            toCenter,
            choiceHeader,
            toBlog,
            img,
            ...toRefs(state)
        }

    }
})
</script>

<style lang="scss" scoped>
.user-info {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    background-image: url("../../src/assets/images/长发美女居家写真4k壁纸3840x2160_彼岸图网.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.user-info-box {
    box-sizing: border-box;
    width: 35%;
    height: 70%;
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 1px 2px 3px 2px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    z-index: 10;
}

.box-top {
    padding: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    i {
        font-size: 25px;
        color: #21a675;
        cursor: pointer;

        &:hover {
            color: rgb(255, 33, 33);
        }
    }
}

.header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.user-info-header {
    box-sizing: border-box;
    width: 125px;
    height: 125px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 2px solid #f9906f;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    i {
        font-size: 50px;
        color: violet;
    }
}

.user-info-name {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 20px;
    margin-top: 20px;
    color: #161823;
}

.user-info-pos {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column-reverse;
}

.save {
    position: absolute;
    bottom: 25px;
}

.header-img {
    display: none;
}

.avatar {
    height: 125px;
}

.bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
}

input {
    outline-style: none;
    outline-color: transparent;
    background-color: none;
    border: none;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 40px;
}

input::-webkit-input-placeholder {
    color: #be002f;
}

@media screen and (max-width: 700px) {
    .user-info {
        align-items: start;
        padding-top: 30px;
    }

    .user-info-box {
        width: 85%;
        height: 365px;
        overflow: hidden;
    }

    .user-info-pos {
        flex-direction: row-reverse;
    }

    .box-top {
        padding: 10px;

        i {
            font-size: 20px;
        }
    }

    .avatar {
           width: 100px;
        // height: 100px;
    }

    .user-info-header {
        width: 100px;
        height: 100px;
    }

    input {
        width: 80px;
        height: 30px;
    }
}
</style>