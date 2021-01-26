import cloudbase from "@cloudbase/js-sdk";

const app = cloudbase.init({
    env: "boyyang-8gwh66lj98a5fa60",
});


const auth = app.auth({
    persistence: "local",
});

const loginstate = auth.hasLoginState()

if (!loginstate) {
    auth.anonymousAuthProvider().signIn().then((res) =>{
        console.log(res)
    });
} else {
    console.log('已登录')
}


const db = app.database();

export { app, auth, db }