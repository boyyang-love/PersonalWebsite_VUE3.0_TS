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
export {
    Itabs,
    IhomeState,
    IloginState,
    Inavbar,
    Ibackground,
    IDynamicState
}