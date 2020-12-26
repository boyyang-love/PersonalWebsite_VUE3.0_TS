"use strict";
exports.__esModule = true;
var index_ts_1 = require("@/db/index.ts");
// 文件上传
var FileUp = /** @class */ (function () {
    function FileUp(state) {
        this.state = state;
        this.__init__();
    }
    FileUp.prototype.__init__ = function () {
        var _this = this;
        var id = localStorage.getItem('BG');
        index_ts_1.db.collection('usersBg').where({ _id: id }).get().then(function (res) {
            if (res.data.length != 0) {
                _this.state.bg = res.data[0].tempFileURL;
                _this.state.id = res.data[0]._id;
                _this.state.fileID = res.data[0].fileID;
            }
            else {
                return;
            }
        });
    };
    FileUp.prototype.fileUpdate = function (file) {
        var _this = this;
        index_ts_1.app.uploadFile({
            cloudPath: "bg/" + file.name,
            filePath: file
        }).then(function (res) {
            index_ts_1.app.getTempFileURL({
                fileList: [
                    {
                        fileID: res.fileID,
                        maxAge: 6000
                    }
                ]
            }).then(function (temp) {
                _this.state.bg = temp.fileList[0].tempFileURL;
                index_ts_1.db.collection('usersBg').add({
                    downloadUrl: temp.fileList[0].download_url,
                    fileID: temp.fileList[0].fileID,
                    fileid: temp.fileList[0].fileid,
                    tempFileURL: temp.fileList[0].tempFileURL
                }).then(function (res) {
                    localStorage.setItem('BG', res.id);
                });
            });
        });
    };
    return FileUp;
}());
exports.FileUp = FileUp;
// 登录注册
var Login = /** @class */ (function () {
    function Login() {
    }
    // 登录
    Login.prototype.singin = function (email, password) {
        return new Promise(function (resolve, reject) {
            index_ts_1.db.collection('users').where({ email: email }).get().then(function (res) {
                if (res.data.length == 0) {
                    resolve('不存在该用户,请注册');
                }
                else {
                    index_ts_1.auth.signInWithEmailAndPassword(email, password).then(function () {
                        resolve('登录成功');
                    })["catch"](function () {
                        reject('账号或密码错误');
                    });
                }
            });
        });
    };
    // 注册
    Login.prototype.singup = function (email, password) {
        return new Promise(function (resolve, reject) {
            index_ts_1.db.collection('users').where({ email: email }).get().then(function (res) {
                if (res.data.length == 0) {
                    index_ts_1.auth.signUpWithEmailAndPassword(email, password).then(function () {
                        index_ts_1.db.collection('users').add({
                            name: '',
                            age: '',
                            gender: '',
                            email: email,
                            backgroundImage: '',
                            phoneNumber: '',
                            qqNumber: '',
                            wechat: ''
                        }).then(function () {
                            resolve('注册成功');
                        });
                    })["catch"](function () {
                        reject('注册失败');
                    });
                }
                else {
                    resolve('该账号已经注册过');
                }
            });
        });
    };
    // 注销
    Login.prototype.signout = function () {
        return new Promise(function (resolve, reject) {
            index_ts_1.auth.signOut().then(function (res) {
                resolve(res);
            })["catch"](function (err) {
                reject(err);
            });
        });
    };
    // 登录状态判断
    Login.prototype.isLogin = function () {
        return new Promise(function (resolve, reject) {
            index_ts_1.auth.getLoginState().then(function (res) {
                var _a;
                resolve((_a = res) === null || _a === void 0 ? void 0 : _a.loginType);
            })["catch"](function () {
                reject('未登录');
            });
        });
    };
    return Login;
}());
exports.Login = Login;
// 获取背景图片
var Getbackground = /** @class */ (function () {
    function Getbackground() {
    }
    /**
     * 获取用户上传的所有背景图片
     */
    Getbackground.prototype.getbg = function () {
        return new Promise(function (resolve, reject) {
            index_ts_1.db.collection('usersBg').get().then(function (res) {
                if (res) {
                    resolve(res);
                }
            })["catch"](function (err) {
                reject(err);
            });
        });
    };
    /**
     * 图片下载
     * @url [字符串]
     * @return [promise<any>]
     */
    Getbackground.prototype.download = function (url) {
        return new Promise(function (resolve, resject) {
            index_ts_1.app.downloadFile({ fileID: url }).then(function (res) {
                resolve(res);
            })["catch"](function (err) {
                resject(err);
            });
        });
    };
    return Getbackground;
}());
exports.Getbackground = Getbackground;

//# sourceMappingURL=index.js.map
