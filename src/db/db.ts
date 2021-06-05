/**
 * @auth boyyang
 * @time 2021/1/25
 * @param cloudbase 云开发
 */

import cloudbase from "@cloudbase/js-sdk";

// cloudbase实列
const app = cloudbase.init({
    env: 'boyyang-8gwh66lj98a5fa60'
})

// 用户
const auth = app.auth({
    persistence: 'local'
})

// 数据库实例
const db = app.database()


/**
 * @name 集合名称
 * @param _id 查询id
 * @param options 配置
 */

// 数据库相关操作
class CloudBase {
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
    findWhere(name: string, options: any) {
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
    addNew(name: string, options: any) {
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
    update(name: string, _id: string, options: any) {
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
    uid: string
    constructor() {
        this.init()
    }

    async init() {
        const user = await auth.getCurrenUser()
        if (user) {
            this.uid = user.uid
        }

    }
    // 图片上传
    picUpload(file: any, name: string, pos='bg') {
        return new Promise((resolve, reject) => {
            app.uploadFile({
                cloudPath: `${this.uid}/${pos}/${file.name}`,
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
                        cloudPath: `${this.uid}/${pos}/${file.name}`,
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
    picDownload(fileId: string) {
        return new Promise((resolve, reject) => {
            app.downloadFile({
                fileID: fileId
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
    // 登录
    singin(email: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    resolve(true)
                }).catch(() => {
                    reject(false)
                })
        })
    }

    // 注册
    singup(email: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            auth.signUpWithEmailAndPassword(email, password)
                .then(() => {
                    resolve(true)
                }).catch(() => {
                    reject(false)
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
    isLogin(): Promise<any | null> {
        return new Promise((resolve, reject) => {
            auth.getLoginState().then((res: any) => {
                resolve(res)
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
    updateUserinfo(params: any) {
        return new Promise((resolve, reject) => {
            const user = auth.currentUser
            if (user) {
                user.update(params).then((res: any) => {
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