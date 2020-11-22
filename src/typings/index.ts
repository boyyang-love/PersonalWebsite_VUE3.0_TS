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

export {
    Itabs,
    IhomeState,
    IloginState,
    Inavbar
}