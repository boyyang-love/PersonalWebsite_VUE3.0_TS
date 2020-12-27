import { app, db, auth } from '@/db/index.ts'
import { IhomeState } from '@/typings';

// 文件上传
class FileUp {
    state: IhomeState;
    constructor(state: IhomeState) {
        this.state = state
        // this.__init__()
    }

    __init__() { //初始化操作获取背景图片以及当前数据_id,_id为后面更换背景用
        const id = localStorage.getItem('BG')
        db.collection('usersBg').where({ _id: id }).get().then((res: any) => {
            if (res.data.length != 0) {
                this.state.bg = res.data[0].tempFileURL
                this.state.id = res.data[0]._id
                this.state.fileID = res.data[0].fileID
            } else {
                return
            }

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
                db.collection('usersBg').add({
                    downloadUrl: temp.fileList[0].download_url,
                    fileID: temp.fileList[0].fileID,
                    fileid: temp.fileList[0].fileid,
                    tempFileURL: temp.fileList[0].tempFileURL,
                    time: new Date()
                }).then((res: any) => {
                    localStorage.setItem('BG', res.id)
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
            auth.getLoginState().then((res: any) => {
                resolve(res?.loginType)
            }).catch(() => {
                reject('未登录')
            })
        })

    }
}

// 获取背景图片
class Getbackground {
    /**
     * 获取用户上传的所有背景图片
     */
    getbg() {
        return new Promise((resolve, reject) => {
            db.collection('usersBg').get().then((res) => {
                if (res) {
                    resolve(res)
                }
            }).catch((err) => {
                reject(err)
            })
        })

    }
    /**
     * 图片下载
     * @url [字符串]
     * @return [promise<any>]
     */
    download(url: string): Promise<any> {
        return new Promise((resolve, resject) => {
            app.downloadFile({fileID: url}).then(res => {
                resolve(res)
            }).catch(err => {
                resject(err)
            })
        })
    }
}

export {
    FileUp,
    Login,
    Getbackground
}