import { app, db, auth } from '@/db/index.ts'
import { IhomeState } from '@/typings';


// 文件上传
class FileUp {
    state: IhomeState;
    constructor(state: IhomeState) {
        this.state = state
        this.__init__()
    }

    __init__() { //初始化操作获取背景图片以及当前数据_id,_id为后面更换背景用
        db.collection('userBg').get().then(res => {
            this.state.bg = res.data[0].bg
            this.state.id = res.data[0]._id
            this.state.fileID = res.data[0].fileID
        })
    }

    fileUpdate(file: any) { //图片文件上传
        app.uploadFile({
            cloudPath: `bg/${file.name}`,
            filePath: file,
        }).then((res) => {
            app.getTempFileURL({
                fileList: [
                    {
                        fileID: res.fileID,
                        maxAge: 600
                    }
                ]
            }).then((temp: any) => {
                this.state.bg = temp.fileList[0].tempFileURL
                db.collection("userBg").doc(this.state.id).update({
                    bg: temp.fileList[0].tempFileURL,
                    fileID: temp.fileList[0].fileID
                })
            })
        })
    }
}
// 登录注册
class Login {

    // 登录
    singin(email: string, password: string) {
        auth.signInWithEmailAndPassword(email, password).then((res) => {
            console.log(res)
        })
    }
    // 注册
    singup(email: string, password: string) {
        auth.signUpWithEmailAndPassword(email, password).then((res) => {
            console.log(res)
        })
    }
    // 注销
    signout() {
        auth.signOut()
    }
    // 登录状态判断
    async isLogin(): Promise<string | undefined> {
        const res = await auth.hasLoginState()
        if (res?.isAnonymousAuth) {
            return 'AnonymousAuth'
        }
        if (res?.isCustomAuth) {
            return 'CustomAuth'
        }
        if (res?.isUsernameAuth) {
            return 'UsernameAuth'
        }
        if (res?.isWeixinAuth) {
            return 'isWeixinAuth'
        }
        if (res) {
            return 'hasLogin'
        }

    }
}

export {
    FileUp,
    Login
}