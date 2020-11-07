import cloudbase from "@cloudbase/js-sdk";

const app = cloudbase.init({
    env: "boyyang-8gwh66lj98a5fa60",
});

const auth = app.auth({
    persistence: "local",
});

auth.anonymousAuthProvider().signIn();

const db = app.database();

export { db }