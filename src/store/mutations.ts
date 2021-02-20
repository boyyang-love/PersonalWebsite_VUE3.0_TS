export default {
    changeUrl(state, payload) {
        // console.log(state, payload)
        state.musicUrl = payload.musicurl
        state.musicPic = payload.musicpic
    }
}