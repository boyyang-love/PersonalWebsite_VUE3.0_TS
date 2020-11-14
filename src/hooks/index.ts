import { db, app } from '@/db/index.ts'
import { IhomeState } from '@/typings';
class FileUp {
    state: IhomeState;
    constructor(state: IhomeState) {
        this.state = state
        this.__init__()
    }

    __init__() {
        db.collection('userBg').get().then(res => {
            console.log(res)
            this.state.bg = res.data[0].bg
        })
    }

    fileUpdate(file: any) {
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
                db.collection('userBg').add({
                    bg: temp.fileList[0].tempFileURL
                })
            })
        })
    }
}

export {
    FileUp
}