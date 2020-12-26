import { app, db, auth } from '@/db/index.ts'

class UserInfo {
    app: any;
    db: any;
    auth: any;
    constructor(app: any, db: any, auth: any) {
        this.app = app
        this.db = db
        this.auth = auth
    }
}

export default new UserInfo(app, db, auth)