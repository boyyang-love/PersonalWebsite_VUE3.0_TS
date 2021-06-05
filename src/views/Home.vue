<template>
    <div class="home">
        <div class="bg">
            <el-carousel
                indicator-position="outside"
                height="100vh"
                :interval="2000"
                :initial-index="1"
                :loop="true"
                arrow="hover"
            >
                <el-carousel-item v-for="item in images" :key="item._id">
                    <img :src="item.tempFileURL" alt />
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="content">
            <div class="title">
                <h1>BOYYANG.LOVE</h1>
                <label for="input">
                    <input type="file" name id="input" accept="image/*" ref="img" @change="imgUp" />
                    <el-tooltip class="item" effect="dark" content="背景图片上传" placement="top-start">
                        <i class="iconfont icon-dongtai"></i>
                    </el-tooltip>
                </label>
            </div>
            <div class="c-box">
                <div class="motto">
                    <i class="iconfont icon-xingxing"></i>
                    <span>boyyang & love & fei</span>
                    <i class="iconfont icon-xingxing"></i>
                </div>
                <div class="contact">
                    <i class="iconfont icon-icon-prev" @click="prev"></i>
                    <el-tooltip content="1761617270" placement="bottom" effect="light">
                        <i class="iconfont icon-qq1"></i>
                    </el-tooltip>
                    <el-tooltip content="boyyanglove" placement="bottom" effect="light">
                        <i class="iconfont icon-weixin"></i>
                    </el-tooltip>
                    <el-tooltip
                        content="https://www.cnblogs.com/boyyangD/"
                        placement="bottom"
                        effect="light"
                    >
                        <a
                            href="http://www.cnblogs.com/boyyangD/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i class="iconfont icon-boke1"></i>
                        </a>
                    </el-tooltip>

                    <el-tooltip
                        content="https://github.com/boyyang-love"
                        placement="bottom"
                        effect="light"
                    >
                        <a
                            href="https://github.com/boyyang-love"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i class="iconfont icon-GitHub"></i>
                        </a>
                    </el-tooltip>
                    <i class="iconfont icon-zuoyoujiantou-copy-copy-copy1" @click="next"></i>
                </div>
                <span class="line1"></span>
                <span class="line2"></span>
                <span class="line3"></span>
                <span class="line4"></span>
            </div>
            <!-- tab -->
            <div class="setting">
                <el-tooltip class="item" effect="dark" content="导航" placement="top-start">
                    <i class="el-icon-s-tools" @click="setting"></i>
                </el-tooltip>
            </div>
        </div>
        <el-drawer v-model="drawer" :with-header="false" size="100px">
            <menu-bar :tabs="tabs"></menu-bar>
            <div class="bottom">
                <div class="login">
                    <i class="iconfont icon-dongtai" @click="login"></i>
                </div>
                <div class="exit">
                    <i class="iconfont icon-tuichu1" @click="exit"></i>
                </div>
            </div>
        </el-drawer>
    </div>
    <div class="loading">
        <loading :isLoading="isloading"></loading>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, h } from "vue";
import MenuBar from "@/components/MenuBar/index.vue";
import loading from "@/components/LoadingBox/index.vue";
import { Itabs } from "@/typings";
import { DB, IMG, AUTH } from "@/db/index";
import { ElMessage, ElMessageBox } from "element-plus";
import router from "@/router";
export default defineComponent({
    name: "Home",
    components: {
        MenuBar,
        loading
    },
    setup() {
        // tab配置
        const tabs: Itabs[] = [
            {
                tabIndex: 1,
                tabName: "Home",
                icon: "icon-shouye2",
            },
            {
                tabIndex: 2,
                tabName: "Music",
                icon: "icon-yinle6",
            },
            {
                tabIndex: 3,
                tabName: "Center",
                icon: "icon-dongtai1",
            },
            {
                tabIndex: 4,
                tabName: "Contact",
                icon: "icon-B",
            },
            {
                tabIndex: 5,
                tabName: "About",
                icon: "icon-iconset0142",
            },
        ];

        // loading
        const isloading = ref<boolean>(false)

        // 图片集合
        const images = ref<any[]>();

        // 图片文件信息
        const img = ref<any>(null);

        // 右侧弹框
        const drawer = ref<boolean>(false);

        // 获取图片
        DB.findAll("usersBg").then((res: any) => {
            if (res.code == "PERMISSION_DENIED" || res.data.length == 0) {
                images.value = [
                    {
                        tempFileURL: require("../assets/images/长发美女居家写真4k壁纸3840x2160_彼岸图网.jpg"),
                    },
                    {
                        tempFileURL: require("../assets/images/鬼灭之刃蝴蝶忍4k高清电脑壁纸3840x2160_彼岸图网.jpg"),
                    },
                ];
            } else {
                images.value = res.data;
            }
        });

        // 图片上传
        const imgUp = (): void => {
            AUTH.isLogin().then((res) => {
                if (res == undefined) {
                    ElMessage({
                        type: 'warning',
                        message: '还未登录,前往登录'
                    })

                    router.push({
                        name: 'Login'
                    })

                    return
                }
                const file = img.value.files[0];
                console.log(file)
                isloading.value = true
                IMG.picUpload(file, "usersBg").then((res: any) => {
                    if (res) {
                        isloading.value = false
                        ElMessage({
                            message: h("p", null, [
                                h("i", { style: "color: teal" }, "图片上传成功"),
                            ]),
                            type: 'success',
                        });
                        DB.findOne('usersBg', res.id).then((res: any) => {
                            ElMessageBox({
                                title: '背景图片上传成功,是否前往查看？',
                                message: h('img', { src: res.data[0].tempFileURL, style: 'width: 393px' },),
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
                });
            }).catch((err) => {
                ElMessage({
                    type: 'warning',
                    message: err
                })
            })

        };

        // 上一张图片
        const prev = (): void => {
            const len = images.value.length - 1;
        };

        //  下一张图片
        const next = (): void => {
            const len = images.value.length;
        };

        // setting
        const setting = (): void => {
            drawer.value = !drawer.value;
        };

        // 登录
        const login = (): void => {
            AUTH.isLogin()
                .then((res: any) => {
                    if (res != null) {
                        router.push({
                            name: "UserInfo"
                        })
                    } else {
                        router.push({
                            name: "Login",
                        });
                    }
                })
                .catch((err) => {
                    ElMessage({
                        message: h("p", null, [
                            h("span", null, err),
                            h("i", { style: "color: teal" }, ""),
                        ]),
                    });
                });
        };

        // 退出登录
        const exit = (): void => {
            AUTH.signout().then((res: any) => {
                ElMessage({
                    message: h("p", null, [
                        h("span", null, "退出登录"),
                        h("i", { style: "color: teal" }, "成功！"),
                    ]),
                });
                drawer.value = false;
            });
        };

        return {
            tabs,
            img,
            imgUp,
            images,
            prev,
            next,
            drawer,
            setting,
            exit,
            login,
            isloading
        };
    },
});
</script>

<style scoped lang='scss'>
.home {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-image: url("../assets/images/鬼灭之刃蝴蝶忍4k高清电脑壁纸3840x2160_彼岸图网.jpg");
    background-position: center;
    background-size: cover;
    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 1;
        }
    }
    .imgUp {
        width: 15%;
        height: 50px;
        background-color: #fff;
        position: absolute;
        bottom: 90px;
        border-radius: 10px;
        box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.3);
    }
    .content {
        z-index: 9;
        position: relative;

        .title {
            color: whitesmoke;
            position: relative;
            .iconfont {
                position: absolute;
                right: -51px;
                top: -25px;
                font-size: 45px;
                color: red;
                cursor: pointer;
            }

            input {
                display: none;
            }
        }

        .c-box {
            width: 100%;
            height: 100px;
            background: rgba(0, 0, 0, 0.6);
            margin-top: 25px;
            position: relative;
            border-radius: 4px;
            // grid
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: repeat(2, 1fr);
            justify-content: center;
            align-items: center;

            .contact {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;

                i {
                    color: #3eede7;
                    font-size: 20px;
                    cursor: pointer;
                    &:hover {
                        color: red;
                    }
                }
            }

            .motto {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                i {
                    color: rgb(221, 24, 24);
                    margin: 0 5px;
                }
            }

            &::before {
                content: "";
                width: 0;
                height: 0;
                display: block;
                border-style: solid;
                border-width: 15px;
                border-color: transparent transparent rgba(0, 0, 0, 0.6)
                    transparent;
                position: absolute;
                top: -30px;
                left: 20px;
            }

            .line1 {
                width: 100%;
                height: 1px;
                position: absolute;
                background: linear-gradient(
                    to right,
                    transparent,
                    rgb(224, 25, 25),
                    rgb(255, 255, 255)
                );
                top: 0;
                animation: line1 1s linear infinite;
            }

            .line2 {
                width: 1px;
                height: 100%;
                position: absolute;
                background: linear-gradient(
                    to bottom,
                    transparent,
                    rgb(255, 255, 255),
                    rgb(224, 25, 25)
                );
                right: 0;
                animation: line2 1s linear infinite;
            }

            .line3 {
                width: 100%;
                height: 1px;
                position: absolute;
                background: linear-gradient(
                    to left,
                    transparent,
                    rgb(224, 25, 25),
                    rgb(255, 255, 255)
                );
                bottom: 0;
                animation: line3 1s linear infinite;
            }

            .line4 {
                width: 1px;
                height: 100%;
                position: absolute;
                background: linear-gradient(
                    to top,
                    transparent,
                    rgb(255, 255, 255),
                    rgb(224, 25, 25)
                );
                left: 0;
                animation: line4 1s linear infinite;
            }
        }
    }
    .setting {
        position: absolute;
        z-index: 9;
        top: 0;
        left: -35px;
        i {
            font-size: 35px;
            color: rgb(217, 255, 192);
            cursor: pointer;
            &:hover {
                color: rgb(105, 61, 61);
            }
            animation: circle 2s linear infinite;
        }
    }
    .bottom {
        height: 30%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(2, 1fr);
        justify-content: center;
        align-items: center;
    }
    .login {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
            font-size: 35px;
            &:hover {
                color: rgb(126, 52, 52);
            }
        }
    }
    .exit {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
            font-size: 55px;
            color: pink;
            &:hover {
                color: rgb(61, 105, 92);
            }
        }
    }

    @keyframes circle {
        0% {
            transform: rotateZ(0deg);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }
}

a {
    text-decoration: none;
}

.loading {
    // position: absolute;
    z-index: 9999;
}

@keyframes FishMove {
    0% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(1000px);
    }

    100% {
        transform: translateX(0);
    }
}

@keyframes line1 {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

@keyframes line2 {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(100%);
    }
}

@keyframes line3 {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
}

@keyframes line4 {
    0% {
        transform: translateY(100%);
    }

    100% {
        transform: translateY(-100%);
    }
}

@media screen and (max-width: 700px) {
    .title {
        h1 {
            font-size: 26px;
        }

        .iconfont {
            font-size: 25px !important;
            right: -30px;
        }
    }

    .setting {
        .el-icon-s-tools {
            font-size: 25px !important;
        }
    }
}
</style>