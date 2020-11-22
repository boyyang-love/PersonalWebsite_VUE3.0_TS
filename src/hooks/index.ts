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
        db.collection('usersBg').get().then(res => {
            this.state.bg = res.data[0].tempFileURL
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
                        maxAge: 6000
                    }
                ]
            }).then((temp: any) => {
                this.state.bg = temp.fileList[0].tempFileURL
                console.log(temp)
                db.collection('usersBg').add({
                    downloadUrl: temp.fileList[0].download_url,
                    fileID: temp.fileList[0].fileID,
                    fileid: temp.fileList[0].fileid,
                    tempFileURL: temp.fileList[0].tempFileURL
                }).then(res => {
                    console.log(res)
                })
            })
        })
    }
}
// 登录注册
class Login {
    // 登录
    singin(email: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            db.collection('users').where({ email: email }).get().then((res) => {
                if (res.data.length == 0) {
                    resolve('不存在该用户,请注册')
                } else {
                    auth.signInWithEmailAndPassword(email, password).then(() => {
                        resolve('登录成功')
                    }).catch(() => {
                        reject('账号或密码错误')
                    })
                }
            })
        })
    }
    // 注册
    singup(email: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            db.collection('users').where({ email: email }).get().then((res) => {
                if (res.data.length == 0) {
                    auth.signUpWithEmailAndPassword(email, password).then(() => {
                        db.collection('users').add({
                            name: '',
                            age: '',
                            gender: '',
                            email: email,
                            backgroundImage: '',
                            phoneNumber: '',
                            qqNumber: '',
                            wechat: ''
                        }).then(() => {
                            resolve('注册成功')
                        })
                    }).catch(() => {
                        reject('注册失败')
                    })
                } else {
                    resolve('该账号已经注册过')
                }
            })

        })
    }
    // 注销
    signout() {
        return new Promise((resolve, reject) => {
            auth.signOut().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
    // 登录状态判断
    isLogin(): Promise<string> {
        return new Promise((resolve, reject) => {
            auth.getLoginState().then((res) => {
                resolve(res?.loginType)
            }).catch(() => {
                reject('未登录')
            })
        })

    }
}

export {
    FileUp,
    Login
}