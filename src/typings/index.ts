interface Itabs {
    tabIndex: number;
    tabName: string;
    icon: string;
}

interface IhomeState {
    bg: any;
    id: string;
    fileID: string;
}

interface IloginState {
    account: string;
    password: string;
    repassword: string;
    loginStatus: boolean;
}

// left-navbar

interface Inavbar {
    name: string;
    id: number;
    icon: string;
}

interface IDynamicState {
    lists: Ibackground
}


interface Ibackground {
    downloadUrl: string;
    fileID: string;
    fileid: string;
    tempFileURL: string;
    _id: string;
    _openid: string;
}

// 音乐数据
interface IMusicState {
    musicList: []
}

//  音乐详情列表
interface ImusicDetail {
    list: object
}
// 背景图片列表
interface IbgLists {
    bgLists: [];
    type: string;
}
export {
    Itabs,
    IhomeState,
    IloginState,
    Inavbar,
    Ibackground,
    IDynamicState,
    IMusicState,
    ImusicDetail,
    IbgLists
}