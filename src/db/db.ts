/**
 * @auth boyyang
 * @time 2021/1/25
 * @param cloudbase 云开发
 */

import cloudbase from "@cloudbase/js-sdk";

// cloudbase实列
const app = cloudbase.init({
    env: ''
})

// 用户
const auth = app.auth({
    persistence: 'local'
})

// 数据库实例
const db = app.database()

// 查询指令
const _ = db.command

/**
 * @name 集合名称
 * @param _id 查询id
 * @param options 配置
 */

// 数据库相关操作
class CloudBase {
    constructor() {

    }

    // 通过_id查询一条数据
    findOne(name: string, _id: string) {
        return new Promise((resolve, reject) => {
            db.collection(name)
                .doc(_id)
                .get()
                .then((res: any) => {
                    resolve(res)
                })
                .catch((err: any) => {
                    reject(err)
                })
        })
    }

    // 查询一个集合所有数据
    findAll(name: string) {
        return new Promise((resolve, reject) => {
            db.collection(name)
                .get()
                .then((res: any) => {
                    resolve(res)
                }).catch((err: any) => {
                    reject(err)
                })
        })
    }

    // 通过条件查询
    findWhere(name: string, options: object) {
        return new Promise((resolve, reject) => {
            db.collection(name)
                .where(options)
                .get()
                .then((res: any) => {
                    resolve(res)
                })
                .catch((err: any) => {
                    reject(err)
                })
        })
    }

    // 向集合插入一条数据
    addNew(name: string, options: object) {
        return new Promise((resolve, reject) => {
            db.collection(name)
                .add(options)
                .then((res: any) => {
                    resolve(res)
                }).catch((err: any) => {
                    reject(err)
                })
        })
    }

    // 更新数据
    update(name: string, _id: string, options: object) {
        return new Promise((resolve, reject) => {
            db.collection(name)
                .doc(_id)
                .update(options)
                .then((res: any) => {
                    resolve(res)
                }).catch((err: any) => {
                    reject(err)
                })
        })
    }

    // 删除数据
    del(name: string, _id: string) {
        return new Promise((resolve, reject) => {
            db.collection(name)
                .doc(_id).remove()
                .then((res: any) => {
                    resolve(res)
                }).catch((err: any) => {
                    reject(err)
                })
        })
    }

}

/**
 * @param name 集合名字
 * @param path 云端路径
 * @param file 上传文件
 */

// 图片的相关操作
class ImageUpload {
    constructor() {

    }

    // 图片上传
    picUpload(file: any, path: string = '/images/upload', name: string) {
        return new Promise((resolve, reject) => {
            app.uploadFile({
                cloudPath: path,
                filePath: file
            }).then((res: any) => {
                app.getTempFileURL({
                    fileList: [
                        {
                            fileID: res.fileID,
                            maxAge: 6000
                        }
                    ]
                }).then((temp: any) => {
                    db.collection(name).add({
                        name: file.name,
                        downloadUrl: temp.fileList[0].download_url,
                        fileid: temp.fileList[0].fileid,
                        tempFileURL: temp.fileList[0].tempFileURL,
                        cloudPath: path,
                        time: new Date()
                    }).then((res: any) => {
                        resolve(res)
                    }).catch((err: any) => {
                        reject(err)
                    })
                }).catch((err: any) => {
                    reject(err)
                })
            }).catch((err: any) => {
                reject(err)
            })
        })
    }

    // 图片下载
    picDownload(file_id: string) {
        return new Promise((resolve, reject) => {
            app.downloadFile({
                fileID: file_id
            }).then((res: any) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    // 图片删除
    picDelete(path: string) {
        return new Promise((resolve, reject) => {
            app.deleteFile({
                fileList: [
                    path
                ]
            }).then((res: any) => {
                resolve(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }

}

/**
 * @param account 账号
 * @param password 密码
 */
// 用户登录注册相关操作
class Auth {
    constructor() { }

    // 登录
    singin(email: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    resolve('登录成功')
                }).catch(() => {
                    reject('账号或密码错误')
                })
        })
    }

    // 注册
    singup(email: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            auth.signUpWithEmailAndPassword(email, password)
                .then(() => {
                    resolve('邮件发送成功请前往邮箱点击确认')
                }).catch(() => {
                    reject('注册失败,请确定账号未被注册过')
                })
        })
    }

    // 注销
    signout(): Promise<void> {
        return new Promise((resolve, reject) => {
            auth.signOut().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }

    // 登录状态判断
    isLogin():Promise< any | null> {
        return new Promise((resolve, reject) => {
            auth.getLoginState().then((res: any) => {
                resolve(res?.loginType)
            }).catch(() => {
                reject('未登录')
            })
        })

    }

    // 获取当前用户信息
    userInfo() {
        return new Promise((resolve, reject) => {
            const user = auth.currentUser
            if (user) {//当前用户已经登录
                resolve(user)
            } else { //
                reject(false)
            }
        })
    }

    // 更新当前用户信息
    updateUserinfo(nickName: string, gender: string, avatarUrl: string) {
        return new Promise((resolve, reject) => {
            const user = auth.currentUser
            if (user) {
                user.update({
                    nickName: nickName,
                    gender: gender,
                    avatarUrl: avatarUrl
                }).then((res: any) => {
                    resolve(res)
                }).catch((err: any) => {
                    reject(err)
                })
            } else {
                reject('用户未登录')
            }
        })
    }
}

const DB = new CloudBase()
const IMG = new ImageUpload()
const AUTH = new Auth()


export {
    DB,
    IMG,
    AUTH
}